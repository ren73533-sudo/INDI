import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { replayEthereal, planEtherealReplay, decodeEtherealZones, EtherealCsvProvider } from '../tools/ethereal-replay.mjs';
import { candle, MINUTE, SEPT23 } from './helpers.mjs';

function midnightFixture(minutes = 40) {
  const groups = [[100, 102], [102, 105], [105, 103]];
  return Array.from({ length: minutes }, (_, index) => {
    const pair = groups[Math.floor(index / 5)] ?? [103, 103];
    const open = index % 5 === 0 ? pair[0] : pair[1];
    return candle(SEPT23 + index * MINUTE, open, pair[1], Math.max(open, pair[1]) + 0.25, Math.min(open, pair[1]) - 0.25);
  });
}

const settings = { 'Fib anchoring': 'Midnight open / first body swing', 'Anchor': 'Daily UTC' };

test('Ethereal history expansion is explicit, keeps user settings, and does not mislabel the data source', async () => {
  const plan = planEtherealReplay(83_919, { 'Zone height (points)': 2 });
  assert.equal(plan.history.requestedBars, 6000);
  assert.equal(plan.history.effectiveBars, 83_919);
  assert.equal(plan.history.overridden, true);
  assert.equal(plan.effectiveInputs['Zone height (points)'], 2);
  assert.equal(plan.effectiveInputs['Require active Fib STDV inside box'], true);
  assert.equal(planEtherealReplay(8000, { 'Engine history (1-minute candles)': 10000 }).history.effectiveBars, 10000);
  assert.throws(() => planEtherealReplay(100001), /100,000/);
  assert.throws(() => planEtherealReplay(5, { 'Engine history (1-minute candles)': 2 }), /Invalid numeric/);
  const provider = new EtherealCsvProvider(midnightFixture());
  const info = await provider.getSymbolInfo();
  assert.equal(info.tickerid, 'PUBLIC_TOPSTEPX:NQ');
  assert.notEqual(info.tickerid, 'CME_MINI:NQ1!');
  await assert.rejects(provider.getMarketData('CME_MINI:NQ1!', '1'), /Unexpected/);
});

test('adapter frames are pre-contact, preserve midnight confirmation timing and honor the actual visible cap', async () => {
  const bars = midnightFixture();
  const result = await replayEthereal(bars, { ...settings, 'Maximum displayed active zones': 1 });
  assert.equal(result.frames.length, bars.length);
  assert.equal(result.frames[0].available, false);
  for (let index = 1; index < bars.length; index++) {
    const frame = result.frames[index];
    assert.equal(frame.time, bars[index].openTime);
    assert.equal(frame.asOf, bars[index].openTime);
    assert.equal(frame.referencePrice, bars[index - 1].close);
    assert.ok(frame.zones.filter(zone => zone.live).length <= 1);
    for (const zone of frame.zones) {
      assert.ok(zone.start <= frame.asOf);
      assert.equal(zone.key, `${zone.start}|${zone.lo}|${zone.hi}|${zone.side}`);
      assert.equal(zone.eligibleAtOpen, true);
      assert.ok(zone.sourceText.includes('STDV'), 'mandatory Fib must belong to the formation');
      assert.match(zone.text, /^[βρ]  /);
      assert.ok(zone.right > frame.time);
    }
  }
  assert.equal(result.frames[14].fibSets, 0);
  assert.equal(result.frames[15].fibSets, 1, 'the third completed 5m body candle confirms at 00:15 UTC');
  assert.equal(result.frames[14].today0, null);
  assert.equal(result.frames[15].today0, 100);
  assert.equal(result.frames[15].today1, 105);
  assert.equal(result.frames[15].publishedDay, SEPT23);
  assert.ok(result.frames[15].zones.length > 0);
  assert.ok(result.frames.some(frame => frame.retainedCount > frame.zones.length), 'hidden retained zones must remain distinguishable');
  assert.equal(result.sourceSha256, createHash('sha256').update(readFileSync(new URL('../indicators/ethereal.pine', import.meta.url))).digest('hex'));
});

test('future invalidation and a forming contact candle cannot rewrite the earlier visible zone history', async () => {
  const past = midnightFixture(26);
  const touchIndex = 25;
  const altered = past.map((bar, index) => index === touchIndex ? { ...bar, high: 200, low: 0 } : bar);
  const future = Array.from({ length: 4 }, (_, index) => candle(SEPT23 + (26 + index) * MINUTE, 103));
  const prefix = await replayEthereal(past, settings);
  const full = await replayEthereal([...altered, ...future], settings);
  assert.deepEqual(full.frames.slice(0, past.length), prefix.frames, 'the changed candle is excluded from its own pre-contact frame');
  assert.ok(prefix.frames[touchIndex].zones.length > 0);
  assert.equal(full.frames[touchIndex + 1].zones.length, 0, 'the completed wick breach must become visible at the next source minute');
  assert.ok(Object.isFrozen(full.frames[touchIndex].zones));
});

test('compact replay transport decodes frozen sides, yellow upgrade time and absent optional fields', () => {
  const records = decodeEtherealZones('1000;1000;100;105;4;1;1;1;85;120;2000;NaN;STDV | VWAP;STDV | VWAP | VAH | RB 10m\n');
  assert.equal(records.length, 1);
  assert.equal(records[0].key, '1000|100|105|1');
  assert.equal(records[0].grade, 'yellow');
  assert.equal(records[0].yellowAt, 2000);
  assert.equal(records[0].touchedAt, null);
  assert.equal(records[0].killHi, 120);
  assert.ok(Object.isFrozen(records[0]));
  assert.throws(() => decodeEtherealZones('wrong;schema'), /schema/);
});

function yellowFixture() {
  const groups = [[100,102,102.25,99.75], [102,105,105.25,101.75], [105,103,105.25,102.75],
    [103,104,104.25,102.75], [104,105,105.25,103.75], [105,106,114,104], [106,103,107,102]];
  const bars = groups.flatMap(([open, close, high, low], index) => Array.from({ length: 5 }, (_, minute) =>
    candle(SEPT23 + (index * 5 + minute) * MINUTE, minute === 0 ? open : close, close, high, low)));
  bars.push(candle(SEPT23 + 35 * MINUTE, 110, 108, 111, 107));
  bars.push(candle(SEPT23 + 36 * MINUTE, 108));
  return bars;
}

test('actual yellow upgrades preserve earlier green frames and first-return hiding remains visible in diagnostics', async () => {
  const bars = yellowFixture();
  const full = await replayEthereal(bars, settings);
  const prefix = await replayEthereal(bars.slice(0, 35), settings);
  assert.deepEqual(full.frames.slice(0, 35), prefix.frames);
  assert.ok(full.frames[34].zones.every(zone => !zone.yellow));
  const yellow = full.frames[35].zones.find(zone => zone.yellow);
  assert.ok(yellow);
  assert.equal(yellow.yellowAt, SEPT23 + 35 * MINUTE);
  assert.ok(full.frames[34].zones.some(zone => zone.key === yellow.key && zone.grade === 'green'));
  assert.ok(yellow.yellowText.includes('RB 5m'));
  assert.equal(full.frames[35].visibleYellowLiveCount, 1);
  const fresh = await replayEthereal(bars, { ...settings, 'Hide zones after first return': true });
  assert.equal(fresh.frames[35].visibleYellowLiveCount, 0, 'visited areas are not drawn under the actual first-return policy');
  assert.equal(fresh.frames[35].retainedYellowLiveCount, 1, 'a retained yellow qualification can be hidden by display policy');
});

test('gapped source history is explicit and not padded with artificial bars', async () => {
  const bars = midnightFixture(25).map((bar, index) => index < 20 ? bar : {
    ...bar, openTime: bar.openTime + 10 * MINUTE, closeTime: bar.closeTime + 10 * MINUTE });
  const result = await replayEthereal(bars, settings);
  assert.equal(result.frames.length, 25);
  assert.equal(result.frames[20].asOf, bars[19].closeTime);
  assert.equal(result.frames[20].sourceAgeMinutes, 10);
  assert.equal(result.frames[21].asOf, bars[21].openTime);
});
