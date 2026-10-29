import test from 'node:test';
import assert from 'node:assert/strict';
import { replayOfi } from '../tools/ofi-replay.mjs';
import { simulate, exitOnBar, summary, monteCarlo, coverage, session } from '../tools/ofi-study.mjs';
import { candle } from './helpers.mjs';

const M = 60000, DAY = 86400000, start = Date.UTC(2026, 0, 21, 14, 30);
function fixture(length = 390, reverse = false) {
  const bars = Array.from({ length: 390 }, (_, i) => candle(start + i*M, 102, 102, 114, 90));
  const next = start + DAY;
  bars.push(...Array.from({ length }, (_, i) => candle(next + i*M, 102, 102, 104, 100)));
  if (length > 32) {
    bars[420] = candle(next + 30*M, 102, 109, 109.5, 102);
    bars[421] = candle(next + 31*M, 109, 111, 115, 109);
    bars[422] = candle(next + 32*M, 111, 108, 112, 107);
  }
  return reverse ? bars.map(b => ({ ...b, open: 204-b.open, close: 204-b.close, high: 204-b.low, low: 204-b.high })) : bars;
}
const invisible = { 'Draw zones': false };

test('OFI actual Pine conserves prior profile volume and confirms only after a later follow-through close', async () => {
  const bars = fixture(40), r = await replayOfi(bars, invisible);
  assert.equal(r.frames[389]['profile ready'], 0);
  assert.equal(r.frames[390]['profile ready'], 1);
  assert.ok(Math.abs(r.frames[390]['profile volume'] - 39000) < 1e-5);
  assert.equal(r.frames[390]['zone count'], 2);
  assert.equal(r.frames[421].direction, 0, 'rejection alone is not confirmation');
  assert.equal(r.frames[422].direction, -1);
  assert.equal(r.frames[422].stop, 116);
  assert.equal(r.frames[422].setup, 1);
  assert.equal(r.frames[422].availableAt, bars[422].closeTime);
  assert.equal(r.frames.filter(f => f.direction).length, 1);
  const mirrored = await replayOfi(fixture(40, true), invisible);
  assert.equal(mirrored.frames[422].direction, 1);
  assert.equal(mirrored.frames[422].stop, 88);
});

test('OFI Balanced VWAP setup executes with production defaults and a profile/band overlap', async () => {
  const bars = fixture(40);
  for (let j = 0; j < 30; j++) bars[390+j] = j % 2 === 0
    ? candle(start+DAY+j*M, 102, 102, 122, 97) : candle(start+DAY+j*M, 102, 102, 107, 82);
  bars[420] = candle(start+DAY+30*M, 109, 111, 115, 109);
  bars[421] = candle(start+DAY+31*M, 111, 108, 112, 107);
  const r = await replayOfi(bars, invisible);
  assert.equal(r.frames[421].direction, -1);
  assert.equal(r.frames[421].setup, 2, 'zone is inside opening range; only VWAP model qualifies');
  const faOnly = await replayOfi(bars, { ...invisible, Setups: 'Failed auction' });
  assert.equal(faOnly.frames.filter(f => f.direction).length, 0);
});

test('future candles and display controls cannot rewrite already confirmed Pine signals', async () => {
  const bars = fixture(50), prefix = bars.slice(0, 423);
  const before = await replayOfi(prefix, invisible);
  const changed = bars.map((b, i) => i < 423 ? b : { ...b, high: 200, low: 50 });
  const after = await replayOfi(changed, invisible);
  assert.deepEqual(after.frames.slice(0, 423), before.frames);
  const drawn = await replayOfi(prefix, { 'Draw zones': true });
  assert.deepEqual(drawn.frames, before.frames);
});

test('incomplete prior profile, source gaps and two-close acceptance suppress signals', async () => {
  const partial = fixture(40).slice(1);
  const p = await replayOfi(partial, invisible);
  assert.equal(p.frames.at(-1)['profile ready'], 0);
  assert.ok(p.frames.every(f => f.direction === 0));
  const gapped = fixture(40).filter((_, i) => i !== 410);
  assert.ok((await replayOfi(gapped, invisible)).frames.every(f => f.direction === 0));
  const accepted = fixture(40);
  accepted[420] = candle(start+DAY+30*M, 110, 118, 119, 109);
  accepted[421] = candle(start+DAY+31*M, 118, 119, 120, 117);
  assert.ok((await replayOfi(accepted, invisible)).frames.every(f => f.direction === 0));
});

test('NY RTH boundaries follow DST and incomplete days are excluded', () => {
  assert.equal(session(Date.UTC(2026, 2, 6, 14, 30)).minute, 570);
  assert.equal(session(Date.UTC(2026, 2, 9, 13, 30)).minute, 570);
  assert.equal(session(Date.UTC(2026, 2, 9, 13, 29)).rth, false);
  assert.equal(session(Date.UTC(2026, 2, 9, 20)).rth, false);
  assert.equal(coverage(fixture(40))[1].complete, false);
});

function emptyFrames(bars) { return bars.map(b => ({ time: b.openTime, availableAt: b.closeTime, direction: 0, stop: null, setup: 0, 'profile ready': 1 })); }
function tradeFixture() {
  const bars = Array.from({ length: 390 }, (_, i) => candle(start+i*M, 100, 100, 100.5, 99.5));
  const frames = emptyFrames(bars);
  frames[30] = { ...frames[30], direction: 1, stop: 95, setup: 1 };
  return { bars, frames };
}

test('entries use next open with costs, gap stops exceed planned risk, and future frames are rejected', () => {
  const { bars, frames } = tradeFixture();
  bars[31] = candle(start+31*M, 102, 103, 104, 101);
  bars[32] = candle(start+32*M, 90, 91, 92, 89);
  const t = simulate(bars, frames).trades[0];
  assert.equal(t.entryTime, bars[31].openTime);
  assert.equal(t.entry, 102.25);
  assert.equal(t.stop, 95);
  assert.equal(t.target, 116.75);
  assert.equal(t.exit, 89.75);
  assert.equal(t.netUsd, -254.5);
  assert.equal(t.reason, 'stop-gap');
  assert.ok(t.netR < -1);
  assert.throws(() => simulate(bars, frames.map((f, i) => i === 30 ? { ...f, availableAt: f.availableAt+M } : f)), /timestamp/);
});

test('initialization days are excluded from bootstrap eligibility, not mistaken for zero-trade days', () => {
  const { bars, frames } = tradeFixture();
  const r = simulate(bars, frames.map(f => ({ ...f, 'profile ready': 0 })));
  assert.equal(r.trades.length, 0);
  assert.equal(r.days[0].complete, true);
  assert.equal(r.days[0].eligible, false);
  assert.equal(r.days[0].exclusion, 'prior-profile-unavailable');
});

test('OHLC ambiguity is flagged with pessimistic and optimistic outcomes, including entry-bar ambiguity', () => {
  const { bars, frames } = tradeFixture();
  bars[31] = candle(start+31*M, 100, 100, 112, 94);
  const t = simulate(bars, frames).trades[0];
  assert.equal(t.ambiguous, true);
  assert.equal(t.netUsd, -114.5);
  assert.equal(t.alternativeNetUsd, 200.5);
  assert.equal(summary([t]).netWinRate, 0);
  assert.equal(summary([t]).targetFirstSensitivity.netWinRate, 1);
  const atOpen = exitOnBar({ side: -1, stop: 105, target: 90 }, { open: 106, high: 110, low: 88 });
  assert.equal(atOpen.reason, 'stop-gap');
  assert.equal(atOpen.ambiguous, false);
});

test('one position, exact time exit, risk filter and session close are enforced', () => {
  const { bars, frames } = tradeFixture();
  frames[32] = { ...frames[32], direction: 1, stop: 95, setup: 2 };
  frames[100] = { ...frames[100], direction: 1, stop: 99.5, setup: 2 };
  const r = simulate(bars, frames);
  assert.equal(r.trades.length, 1);
  assert.equal(r.trades[0].reason, 'time-exit');
  assert.equal(r.trades[0].exitObservedBy, bars[90].closeTime);
  assert.equal(r.events.filter(e => e.outcome === 'position-already-open').length, 1);
  assert.equal(r.events.filter(e => e.outcome === 'risk-or-time-filter').length, 1);
  const late = emptyFrames(bars);
  late[359] = { ...late[359], direction: -1, stop: 105, setup: 1 };
  const last = simulate(bars, late).trades[0];
  assert.equal(last.reason, 'session-close');
  assert.equal(last.exitObservedBy, bars[389].closeTime);
});

test('bootstrap resamples day blocks with replacement, includes empty days, is seeded and changes win rates', () => {
  const dates = ['2026-01-01','2026-01-02','2026-01-05','2026-01-06','2026-01-07','2026-01-08'];
  const trades = [{ date: dates[0], netUsd: 100 }, { date: dates[1], netUsd: -50 }, { date: dates[3], netUsd: 75 }];
  const options = { paths: 500, seed: 77, blockDays: 2 };
  const a = monteCarlo(trades, dates, options), b = monteCarlo(trades, dates, options);
  assert.deepEqual(a, b);
  assert.equal(a.days, 6);
  assert.ok(a.tradesPerPath.p025 < a.tradesPerPath.p975);
  assert.ok(a.netWinRate.p025 < a.netWinRate.p975, 'simple shuffling would leave win rate fixed');
  assert.ok(a.realizedMaxDrawdownUsd.p975 >= 50);
  assert.equal(monteCarlo([], dates).status, 'no-trades');
  assert.throws(() => monteCarlo(trades, dates.slice(2)), /outside/);
});
