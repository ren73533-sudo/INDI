import test from 'node:test';
import assert from 'node:assert/strict';
import { Indicator, PineTS } from 'pinets';
import { run, state, levels, source, OfflineProvider, handoffDay, candle, DAY, MINUTE, SEPT23 } from './helpers.mjs';

const timeframes = ['1', '5', '10', '15', '30', '60', '240'];
const levelSummary = level => ({ lo: level.lo, hi: level.hi, kind: level.kind,
  caption: level.caption, born: level.born, epoch: level.epoch, side: level.side,
  active: level.active, dead: level.dead, multiplier: level.multiplier, p0: level.p0, leg: level.leg });
function snapshotSummary(context) {
  const snapshot = state(context, 'snapshot');
  return { asOf: snapshot.asOf, day: snapshot.day, referencePrice: snapshot.referencePrice,
    today0: snapshot.today0, today1: snapshot.today1, mean: snapshot.mean, weight: snapshot.weight, m2: snapshot.m2,
    fibSets: snapshot.fibSets, vwapReady: snapshot.vwapReady, vpReady: snapshot.vpReady,
    fibs: snapshot.fibs.array.map(levelSummary), vwap: snapshot.vwapLevels.array.map(levelSummary),
    vp: snapshot.vpLevels.array.map(levelSummary), rbs: snapshot.rbs.array.map(levelSummary),
    profile: [...snapshot.profile.array],
    zones: state(context, 'zones').array.map(z => ({ lo: z.lo, hi: z.hi, kinds: z.kinds, members: z.members, details: z.details })) };
}

test('1m / 5m / 10m / 15m / 30m / 1h / 4h share identical source state and nonempty POIs', async () => {
  const makeDay = (day, bullish) => Array.from({ length: 456 }, (_, i) => {
    let price = 100;
    if (bullish && i >= 195 && i < 200) price = 98;
    if (bullish && i >= 395 && i < 400) price = 102;
    if (!bullish && i >= 60 && i < 65) price = 102;
    if (!bullish && i >= 445 && i < 450) price = 98;
    return candle(day + i * MINUTE, price, price, price + 0.25, price - 0.25);
  });
  const bars = [...makeDay(SEPT23 - DAY, false), ...makeDay(SEPT23, true)];
  let baseline;
  for (const tf of timeframes) {
    // Exact production source and defaults, no runtime/input/source shims.
    const result = await run(bars, {}, '', tf, true);
    const snapshot = snapshotSummary(result);
    assert.equal(snapshot.asOf, bars.at(-1).closeTime, `timestamp on ${tf}`);
    assert.ok(snapshot.zones.length > 0, `expected actual confluence on ${tf}`);
    assert.ok(snapshot.zones.every(z => z.kinds >= 2));
    const boxes = result.plots.__boxes__.data.at(-1).value;
    for (const zone of snapshot.zones)
      assert.ok(boxes.some(box => box.left === snapshot.asOf && box.top === zone.hi + 0.5 && box.bottom === zone.lo - 0.5), `POI box not drawn on ${tf}`);
    if (!baseline) baseline = snapshot;
    else assert.deepEqual(snapshot, baseline, `source state / POIs changed on ${tf}`);
  }
});

test('custom confluence calibration and moving-level settings stay identical on 1m / 10m / 4h', async () => {
  const bars = [...handoffDay(SEPT23 - DAY, false), ...handoffDay(SEPT23)];
  const settings = { 'Also invalidate VWAP / profile until the next reset': false, 'POI tolerance (points)': 20 };
  let baseline;
  for (const tf of ['1', '10', '240']) {
    const snapshot = snapshotSummary(await run(bars, settings, '', tf));
    assert.ok(snapshot.zones.length > 0, tf);
    assert.ok(snapshot.vwap.every(level => !level.dead));
    if (!baseline) baseline = snapshot;
    else assert.deepEqual(snapshot, baseline, tf);
  }
});

test('minute-level invalidation on 4h ignores wicks preceding the level birth', async () => {
  const bars = handoffDay(SEPT23, true, 452);
  bars[451] = candle(SEPT23 + 451 * MINUTE, 31040, 31040, 31199.25, 31039);
  for (const tf of ['1', '10', '240']) {
    const result = await run(bars, {}, '', tf);
    const fibs = levels(result, 'fibs');
    assert.equal(fibs.find(l => l.multiplier === 2).dead, true, tf);
    assert.equal(fibs.find(l => l.multiplier === 2.25).dead, false, tf);
  }
});

test('10-minute Fib construction works on a 4h display without changing chronological anchors', async () => {
  const result = await run(handoffDay(SEPT23), { 'Construction timeframe': '10' }, '', '240');
  assert.equal(state(result, 'today0'), 30996.75);
  assert.equal(state(result, 'today1'), 31090.5);
});

test('an interior missing source minute prevents publication of an incomplete Fib range', async () => {
  const bars = handoffDay(SEPT23).filter(bar => bar.openTime !== SEPT23 + 197 * MINUTE);
  const result = await run(bars, {}, '', '30');
  assert.equal(levels(result, 'fibs').length, 0);
});

test('confirmed 5m / 10m / 15m RBs survive chart-timeframe changes', async () => {
  // Blocks of 15 minutes also produce distinct 5m / 10m rejection candidates;
  // compare the complete retained RB set, not only a count.
  const groups = [[100, 101, 102, 99], [101, 102, 103, 100], [102, 103, 104, 101],
    [104, 105, 115, 103], [105, 102, 106, 101], [102, 102, 103, 101]];
  const bars = Array.from({ length: 90 }, (_, i) => candle(SEPT23 + i * MINUTE, ...groups[Math.floor(i / 15)]));
  let baseline;
  for (const tf of ['1', '10', '240']) {
    const result = await run(bars, {}, '', tf);
    const rbs = levels(result, 'rbs').map(levelSummary);
    assert.ok(rbs.some(l => l.caption === 'RB 15m'), tf);
    if (!baseline) baseline = rbs;
    else assert.deepEqual(rbs, baseline, tf);
  }
});

test('a forming source minute cannot change the exported snapshot until the next minute', async () => {
  const closed = handoffDay(SEPT23, true, 451);
  const time = closed.at(-1).closeTime;
  const flat = candle(time, 31040, 31040, 31040, 31040, 0);
  const spike = candle(time, 31040, 31500, 31500, 31039);
  const observe = async feed => new PineTS(new OfflineProvider(feed), 'CME_MINI:NQ1!', '240', feed.length).run(new Indicator(source));
  const stable = snapshotSummary(await observe([...closed, flat]));
  const forming = snapshotSummary(await observe([...closed, spike]));
  assert.deepEqual(forming, stable);
  assert.equal(forming.asOf, time);
  const after = snapshotSummary(await observe([...closed, spike, candle(time + MINUTE, 31500)]));
  assert.equal(after.asOf, time + MINUTE);
  assert.equal(after.fibs.find(l => l.multiplier === 2).dead, true);
  assert.equal(stable.fibs.find(l => l.multiplier === 2).dead, false);
});

test('historical Fib traces are capped separately from live-level drawings', async () => {
  const bars = [...handoffDay(SEPT23 - 2 * DAY), ...handoffDay(SEPT23 - DAY), ...handoffDay(SEPT23)];
  const result = await run(bars, { 'Show historical primary Fib traces': true, 'Historical Fib days to retain': 2 });
  const lines = state(result, 'staticLines').array;
  assert.equal(lines.length, 12);
  assert.ok(lines.every(line => line.x1 >= SEPT23 - DAY));
  assert.ok(lines.every(line => !line._deleted));
});
