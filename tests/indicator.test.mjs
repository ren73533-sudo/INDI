import test from 'node:test';
import assert from 'node:assert/strict';
import { Indicator } from 'pinets';
import { source, run, state, levels, handoffDay, candle, closeTo, DAY, MINUTE, SEPT23 } from './helpers.mjs';

test('unmodified Pine v6 source transpiles and exposes calibration/color controls', () => {
  const indicator = new Indicator(source);
  indicator.prepare();
  const inputs = indicator.getInputsMeta();
  assert.ok(inputs.length >= 60);
  assert.match(source, /\/\/@version=6/);
  assert.doesNotMatch(source, /strategy\.(entry|order)|alertcondition\s*\(|ta\.pivot(high|low)/);
});

test('handoff anchors and bullish/bearish signs, from bodies despite oversized wicks', async () => {
  const result = await run([...handoffDay(SEPT23 - DAY, false), ...handoffDay(SEPT23)]);
  closeTo(state(result, 'today0'), 30996.75);
  closeTo(state(result, 'today1'), 31090.50);
  const fib = levels(result, 'fibs');
  assert.equal(fib.length, 24);
  const at = (day, m) => fib.find(level => level.epoch === day && level.multiplier === m);
  closeTo(at(SEPT23, 2).lo, 31184.25);
  closeTo(at(SEPT23, 2.5).lo, 31231.125);
  closeTo(at(SEPT23, -2).lo, 30809.25);
  closeTo(at(SEPT23, -2.5).lo, 30762.375);
  closeTo(at(SEPT23 - DAY, 2).lo, 30637.50);
  closeTo(at(SEPT23 - DAY, -2).lo, 31162.50);
  assert.equal(fib.filter(level => Math.abs(level.multiplier) > 2.5 && level.active).length, 0);
});

test('incomplete window and same-bar extreme ordering never invent anchors', async () => {
  const partial = await run(handoffDay(SEPT23).slice(5));
  assert.equal(levels(partial, 'fibs').length, 0);
  const flat = Array.from({ length: 456 }, (_, m) => candle(SEPT23 + m * MINUTE, 100));
  flat[0] = candle(SEPT23, 90, 110, 115, 85);
  const ambiguous = await run(flat);
  assert.equal(levels(ambiguous, 'fibs').length, 0);
});

test('no Fib exists before completion; both expansion modes arm only after a close', async () => {
  const before = await run(handoffDay(SEPT23, true, 449));
  assert.equal(levels(before, 'fibs').length, 0);
  const bars = handoffDay(SEPT23, true, 451);
  bars.push(candle(SEPT23 + 451 * MINUTE, 31040, 31240, 31245, 31039));
  for (const mode of ['Both sides', 'By multiplier sign']) {
    const result = await run(bars, { 'Arm ±3 / ±3.5 / ±4 expansion': mode });
    const expansion = levels(result, 'fibs').filter(level => Math.abs(level.multiplier) > 2.5);
    assert.equal(expansion.filter(level => level.active).length, mode === 'Both sides' ? 6 : 3);
    if (mode === 'By multiplier sign') assert.ok(expansion.filter(level => level.active).every(level => level.multiplier > 0));
  }
});

test('a wick invalidates at the distance boundary, even if the candle closes back inside', async () => {
  const bars = handoffDay(SEPT23, true, 451);
  bars.push(candle(SEPT23 + 451 * MINUTE, 31040, 31040, 31184.25 + 15, 31039));
  const result = await run(bars);
  assert.equal(levels(result, 'fibs').find(level => level.multiplier === 2).dead, true);
  assert.equal(levels(result, 'fibs').find(level => level.multiplier === 2.25).dead, false);
  assert.equal(levels(result, 'fibs').filter(level => Math.abs(level.multiplier) > 2.5 && level.active).length, 0);
});

test('a two-calendar-day gap removes old Fib sets', async () => {
  const old = handoffDay(SEPT23 - 2 * DAY, false);
  const today = handoffDay(SEPT23, true, 5);
  const result = await run([...old, ...today], { 'Fib retention': 'Previous calendar day' });
  assert.equal(levels(result, 'fibs').length, 0);
});

test('weighted VWAP and SD match an independent batch calculation', async () => {
  const bars = Array.from({ length: 20 }, (_, i) => candle(SEPT23 + i * MINUTE, 30000 + i, 30001 + i, 30004 + i, 29998 + i, 10 + i));
  const total = bars.reduce((sum, b) => sum + b.volume, 0);
  const expected = bars.reduce((sum, b) => sum + (b.high + b.low + b.close) / 3 * b.volume, 0) / total;
  const variance = bars.reduce((sum, b) => sum + b.volume * ((b.high + b.low + b.close) / 3 - expected) ** 2, 0) / total;
  const result = await run(bars);
  closeTo(state(result, 'mean'), expected);
  closeTo(state(result, 'm2') / state(result, 'weight'), variance, 1e-6);
});

test('volume buckets conserve volume including flat bars; 70% value area expands around POC', async () => {
  const bars = Array.from({ length: 16 }, (_, i) => candle(SEPT23 + i * MINUTE, 100, 100, 100, 100, 10));
  bars[5] = candle(SEPT23 + 5 * MINUTE, 100, 110, 110, 100, 20);
  const result = await run(bars);
  const bins = state(result, 'profile').array;
  closeTo(bins.reduce((a, b) => a + b, 0), 170);
  closeTo(state(result, 'profileVolume'), 170);
  const vp = levels(result, 'vpLevels');
  closeTo(vp.find(x => x.caption === 'POC ~').lo, 102.5);
  closeTo(vp.find(x => x.caption === 'VAH ~').lo, 105);
  closeTo(vp.find(x => x.caption === 'VAL ~').lo, 100);
});

test('bucket overflow and absent volume disable the profile rather than fabricate levels', async () => {
  const broad = Array.from({ length: 16 }, (_, i) => candle(SEPT23 + i * MINUTE, 100, 100, 500, 0));
  const overflow = await run(broad, { 'Maximum profile rows (performance limit)': 50 });
  assert.equal(state(overflow, 'vpOverflow'), true);
  assert.equal(levels(overflow, 'vpLevels').length, 0);
  const empty = await run(broad.map(b => ({ ...b, volume: 0 })));
  assert.equal(levels(empty, 'vpLevels').length, 0);
  assert.equal(levels(empty, 'vwapLevels').length, 0);
});

test('RTH anchors shift with New York DST; fixed UTC futures anchor does not', async () => {
  for (const [date, hour] of [[Date.UTC(2026, 6, 6), 13], [Date.UTC(2026, 11, 7), 14]]) {
    const start = date + (hour * 60 + 29) * MINUTE;
    const bars = Array.from({ length: 8 }, (_, i) => candle(start + i * MINUTE, 100 + i));
    const rth = await run(bars, { 'Anchor': 'RTH New York' });
    assert.equal(state(rth, 'vwapEpoch'), date + (hour * 60 + 30) * MINUTE);
    assert.equal(state(rth, 'vwapComplete'), true);
    const fixed = await run(bars, { 'Anchor': 'Futures 22:00 UTC' });
    assert.equal(state(fixed, 'vwapEpoch'), date - DAY + 22 * 60 * MINUTE);
  }
});

test('an anchor in the CME maintenance gap is complete when preceding history is loaded', async () => {
  const day = Date.UTC(2026, 11, 7);
  const bars = [candle(day + (21 * 60 + 59) * MINUTE, 100, 100, 101, 99, 10),
    candle(day + 23 * 60 * MINUTE, 105, 105, 106, 104, 10),
    candle(day + (23 * 60 + 1) * MINUTE, 107, 107, 108, 106, 10)];
  const result = await run(bars, { 'Anchor': 'Futures 22:00 UTC' });
  assert.equal(state(result, 'vwapEpoch'), day + 22 * 60 * MINUTE);
  assert.equal(state(result, 'vwapComplete'), true);
  closeTo(state(result, 'weight'), 20);
  closeTo(state(result, 'mean'), 106);
});

function poiProbe(items) {
  return `
array<Level> fixtureLevels = array.new<Level>()
${items.map(([lo, hi, kind], i) => `array.push(fixtureLevels, f_level(${lo}, ${hi}, ${kind}, "fixture ${i}", time, time, 1))`).join('\n')}
array<Poi> fixtureZones = f_findPois(fixtureLevels, close)
int largestFixture = 0
for fixtureZone in fixtureZones
    largestFixture := math.max(largestFixture, fixtureZone.members)
plot(array.size(fixtureZones), "TEST zones")
plot(largestFixture, "TEST largest")
plot(array.size(fixtureZones) > 0 ? array.get(fixtureZones, 0).lo : na, "TEST first low")
`;
}
const plotValue = (result, name) => result.plots[name].data.at(-1).value;
const shortBars = () => [candle(SEPT23, 100), candle(SEPT23 + MINUTE, 100)];

test('strict concepts reject Fib + Fib; loose mode accepts the same two levels', async () => {
  const probe = poiProbe([[100, 100, 1], [105, 105, 1]]);
  const strict = await run(shortBars(), {}, probe);
  assert.equal(plotValue(strict, 'TEST zones'), 0);
  const loose = await run(shortBars(), { 'Require distinct concept types': false }, probe);
  assert.equal(plotValue(loose, 'TEST zones'), 1);
});

test('each pair of distinct concept types qualifies without requiring the other families', async () => {
  for (const [first, second] of [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]) {
    const result = await run(shortBars(), {}, poiProbe([[100, 100, first], [105, 105, second]]));
    assert.equal(plotValue(result, 'TEST zones'), 1, `types ${first} + ${second}`);
    assert.equal(plotValue(result, 'TEST largest'), 2);
  }
});

test('POI tolerance constrains the entire cluster, without chaining distant points', async () => {
  const result = await run(shortBars(), {}, poiProbe([[100, 100, 1], [110, 110, 2], [120, 120, 3]]));
  assert.equal(plotValue(result, 'TEST zones'), 2);
  assert.equal(plotValue(result, 'TEST largest'), 2);
  const boundary = await run(shortBars(), {}, poiProbe([[100, 100, 1], [115, 115, 2]]));
  assert.equal(plotValue(boundary, 'TEST zones'), 1);
});

test('an earlier same-type group cannot hide a later valid confluence', async () => {
  const result = await run(shortBars(), { 'POI tolerance (points)': 10 }, poiProbe([[100, 100, 1], [105, 105, 1], [115, 115, 2]]));
  assert.equal(plotValue(result, 'TEST zones'), 1);
  assert.equal(plotValue(result, 'TEST first low'), 105);
});

test('one wide rejection wick contributes to two separate POIs without merging them', async () => {
  const result = await run(shortBars(), {}, poiProbe([[100, 200, 4], [110, 110, 1], [150, 150, 2]]));
  assert.equal(plotValue(result, 'TEST zones'), 2);
  assert.equal(plotValue(result, 'TEST largest'), 2);
});

function rbFixture(minutes = 30) {
  const sourceBars = [[100, 101, 102, 99], [101, 102, 103, 100], [102, 103, 104, 101],
    [104, 105, 115, 103], [105, 102, 106, 101], [102, 102, 103, 101]];
  return Array.from({ length: minutes }, (_, m) => candle(SEPT23 + m * MINUTE, ...sourceBars[Math.floor(m / 5)]));
}

test('5m RB appears only after the next candle confirms and is not duplicated each minute', async () => {
  const inputs = { '10 min': false, '15 min': false };
  const before = await run(rbFixture(24), inputs);
  assert.equal(levels(before, 'rbs').length, 0);
  const after = await run(rbFixture(), inputs);
  const rb = levels(after, 'rbs');
  assert.equal(rb.length, 1);
  assert.equal(rb[0].lo, 105);
  assert.equal(rb[0].hi, 115);
  assert.equal(rb[0].side, 1);
  assert.equal(rb[0].born, SEPT23 + 25 * MINUTE);
});

test('a confirmed RB remains a return zone until a wick exceeds its invalidation distance', async () => {
  const bars = rbFixture();
  bars[29] = candle(SEPT23 + 29 * MINUTE, 102, 102, 130, 101);
  const result = await run(bars, { '10 min': false, '15 min': false, 'Show invalidated levels in gray': true });
  const rb = levels(result, 'rbs');
  assert.equal(rb.length, 1);
  assert.equal(rb[0].dead, true);
});
