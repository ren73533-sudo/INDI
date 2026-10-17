import test from 'node:test';
import assert from 'node:assert/strict';
import { parseBars, replay, study, inSession } from '../tools/poi-study.mjs';
import { candle, handoffDay, DAY, MINUTE, SEPT23 } from './helpers.mjs';

test('CSV accepts TradingView Unix seconds, quoted fields and explicit UTC times', () => {
  const bars = parseBars('time,open,high,low,close,Volume,extra\n"2026-09-23T13:30:00Z",100,102,99,101,10,"a,b"\n1790170260,101,103,100,102,20,x\n');
  assert.equal(bars.length, 2);
  assert.equal(bars[0].openTime, Date.UTC(2026, 8, 23, 13, 30));
  assert.equal(bars[1].openTime - bars[0].openTime, MINUTE);
  assert.equal(bars[1].volume, 20);
});

test('CSV rejects missing volume, naive timezones, duplicate timestamps and invalid candles', () => {
  const header = 'time,open,high,low,close,volume\n';
  assert.throws(() => parseBars('time,open,high,low,close\n1,1,1,1,1\n2,1,1,1,1'), /Missing CSV column: volume/);
  assert.throws(() => parseBars(header + '2026-09-23T13:30:00,100,101,99,100,10\n2026-09-23T13:31:00,100,101,99,100,10'), /explicit timezone/);
  assert.throws(() => parseBars(header + '1790170200,100,101,99,100,10\n1790170200,100,101,99,100,10'), /unique and increasing/);
  assert.throws(() => parseBars(header + '1790170200,100,99,99,100,10\n1790170260,100,101,99,100,10'), /invalid OHLCV/);
  assert.throws(() => parseBars(header + '1790170200,100,101,99,100,10\n1790170500,100,101,99,100,10'), /export timeframe/);
});

function contactFixture() {
  const start = Date.UTC(2026, 8, 23, 13, 30);
  const bars = [candle(start, 105), candle(start + MINUTE, 105, 101, 106, 100),
    candle(start + 2 * MINUTE, 101, 104, 106, 100), candle(start + 3 * MINUTE, 104, 106, 107, 103)];
  const zones = [{ lo: 99, hi: 101, kinds: 2, members: 2, key: 'fib:vwap', details: 'fixture' }];
  const frames = bars.map(bar => ({ time: bar.openTime, sets: 2, zones }));
  return { bars, frames };
}

test('study uses a zone known before contact and measures from the touch close', () => {
  const { bars, frames } = contactFixture();
  const report = study(bars, frames, { horizons: [2], threshold: 5 });
  assert.equal(report.events, 1);
  assert.equal(report.eventDetails[0].referenceClose, 101);
  assert.deepEqual(report.eventDetails[0].outcomes[2], { complete: true,
    favorableExcursion: 6, adverseExcursion: 1, directionalCloseChange: 5, benchmark: 'favorable-first' });
  const noPriorZone = frames.map((frame, i) => ({ ...frame, zones: i === 0 ? [] : frame.zones }));
  assert.equal(study(bars, noPriorZone, { horizons: [2] }).events, 0);
});

test('same-bar threshold hits stay ambiguous; missing horizon bars stay incomplete', () => {
  const { bars, frames } = contactFixture();
  bars[2] = candle(bars[2].openTime, 101, 101, 107, 95);
  const report = study(bars, frames, { horizons: [1, 5], threshold: 5 });
  assert.equal(report.eventDetails[0].outcomes[1].benchmark, 'ambiguous');
  assert.deepEqual(report.eventDetails[0].outcomes[5], { complete: false });
  assert.equal(report.summaries[5].completeEvents, 0);
  assert.equal(report.summaries[5].incompleteEvents, 1);
});

test('deduplication and warmup exclude repeated first touches and uninitialized history', () => {
  const { bars, frames } = contactFixture();
  bars.push(candle(bars.at(-1).openTime + MINUTE, 106, 101, 107, 100));
  frames.push({ ...frames[0], time: bars.at(-1).openTime });
  assert.equal(study(bars, frames, { horizons: [1] }).events, 1);
  assert.equal(study(bars, frames.map(f => ({ ...f, sets: 1 })), { horizons: [1] }).events, 0);
});

test('NY study follows DST while the London window stays fixed in UTC', () => {
  assert.equal(inSession(Date.UTC(2026, 6, 6, 13, 30), 'ny'), true);
  assert.equal(inSession(Date.UTC(2026, 11, 7, 13, 30), 'ny'), false);
  assert.equal(inSession(Date.UTC(2026, 11, 7, 14, 30), 'ny'), true);
  assert.equal(inSession(Date.UTC(2026, 11, 7, 7, 30), 'london'), true);
  assert.equal(inSession(Date.UTC(2026, 6, 6, 7, 30), 'london'), true);
});

test('actual Pine replay returns nonempty POIs and prefix-stable historical frames', async () => {
  const bars = [...handoffDay(SEPT23 - DAY, false), ...handoffDay(SEPT23)];
  const settings = { 'Require distinct concept types': false, 'POI tolerance (points)': 50,
    'Include VWAP ±2 / ±3 in confluence': false, 'Include VAH / VAL in confluence': false,
    'Include RBs in confluence': false };
  const complete = await replay(bars, settings);
  assert.equal(complete.frames.length, bars.length);
  assert.equal(complete.frames.at(-1).sets, 2);
  assert.ok(complete.frames.at(-1).zones.length > 0);
  assert.ok(complete.frames.at(-1).zones.every(z => z.key && Number.isFinite(z.lo) && Number.isFinite(z.hi)));
  const prefixLength = bars.length - 5;
  const prefix = await replay(bars.slice(0, prefixLength), settings);
  assert.deepEqual(complete.frames.slice(0, prefixLength), prefix.frames);
  await assert.rejects(() => replay(bars, { 'Unknown setting': 1 }), /Unknown indicator setting/);
  await assert.rejects(() => replay(bars, { 'POI tolerance (points)': -1 }), /Invalid numeric/);
  await assert.rejects(() => replay(bars, { 'Fib retention': 'Wrong mode' }), /Invalid option/);
});
