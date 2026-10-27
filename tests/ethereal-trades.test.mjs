import test from 'node:test';
import assert from 'node:assert/strict';
import { studyEtherealTrades } from '../tools/ethereal-trades.mjs';

const MINUTE = 60_000;
const START = Date.UTC(2026, 0, 22, 14, 29); // 09:29 New York, before RTH.
const candle = (time, open, high, low, close) => ({ openTime: time, closeTime: time + MINUTE, open, high, low, close, volume: 100 });
const support = (overrides = {}) => ({ key: 'support', start: START - 10 * MINUTE,
  lo: 99, hi: 101, side: -1, live: true, eligibleAtOpen: true, kinds: 2,
  yellow: false, touchedAt: null, killLo: 84, killHi: 116,
  sourceText: 'STDV | VWAP', yellowText: '', ...overrides });
function fixture(rows, zones = support(), start = START) {
  const bars = rows.map((row, index) => candle(start + index * MINUTE, ...row));
  const frames = bars.map(bar => ({ time: bar.openTime, asOf: bar.openTime, available: true,
    fibSets: 2, referencePrice: bar.open, zones: (Array.isArray(zones) ? zones : [zones]).map(zone => ({ ...zone })) }));
  return { bars, frames };
}
const run = ({ bars, frames }, options = {}) => studyEtherealTrades(bars, frames, options);

test('known pre-contact midpoint entry reaches the fixed 130-point target without future-selected pricing', () => {
  const data = fixture([[110, 112, 109, 110], [110, 112, 100, 105], [105, 150, 101, 140], [140, 235, 125, 220]]);
  data.frames[0].zones = []; // An extra one-bar shift would miss the actual eligible state.
  const report = run(data);
  assert.equal(report.trades.length, 1);
  const trade = report.trades[0];
  assert.equal(trade.entry.barIndex, 1);
  assert.equal(trade.entry.price, 100);
  assert.equal(trade.entry.atOpen, false);
  assert.equal(trade.stop.initialPrice, 80);
  assert.equal(trade.targetPrice, 230);
  assert.equal(trade.breakEven.triggerPrice, 160);
  assert.equal(trade.exit.reason, 'take-profit');
  assert.equal(trade.pointsGross, 130);
  assert.equal(trade.breakEven.activated, true);
  assert.equal(trade.breakEven.activationBarIndex, 3);
  assert.equal(trade.breakEven.activationTiming, 'within minute; exact time unknown');
  assert.equal(trade.stop.currentPrice, trade.entry.price);
  assert.equal(report.summary.targetWinRateResolved.rate, 1);
  assert.equal(report.summary.meanGrossTargetWinPoints, 130);
  assert.equal(trade.symbol, 'β');
  assert.deepEqual(trade.confluences, ['STDV', 'VWAP']);
});

test('a stop-only entry candle necessarily fills before stopping and counts as a loss, not ambiguity', () => {
  const report = run(fixture([[110, 112, 109, 110], [110, 115, 79, 85]]));
  assert.equal(report.trades[0].entry.atOpen, false);
  assert.equal(report.trades[0].status, 'closed');
  assert.equal(report.trades[0].exit.reason, 'stop-loss');
  assert.equal(report.trades[0].pointsGross, -20);
  assert.equal(report.summary.ambiguousTrades, 0);
  assert.equal(report.summary.targetWinRateResolved.rate, 0);
});

test('sell direction is symmetric, uses rho, and rounds midpoint up to the NQ tick', () => {
  const resistance = support({ key: 'resistance', lo: 99, hi: 101.25, side: 1 });
  const report = run(fixture([[90, 91, 89, 90], [90, 101, 85, 95], [95, 99, -31, -20]], resistance));
  const trade = report.trades[0];
  assert.equal(trade.entry.price, 100.25);
  assert.equal(trade.side, 'sell');
  assert.equal(trade.symbol, 'ρ');
  assert.equal(trade.stop.initialPrice, 120.25);
  assert.equal(trade.exit.reason, 'take-profit');
  assert.equal(trade.pointsGross, 130);
  const buy = run(fixture([[110, 111, 109, 110], [110, 111, 100, 105]], support({ hi: 101.25 })));
  assert.equal(buy.trades[0].entry.limitPrice, 100);
});

test('a sell stop-only entry candle also remains a known 20-point loss', () => {
  const report = run(fixture([[90, 91, 89, 90], [90, 121, 85, 115]], support({ side: 1 })));
  assert.equal(report.trades[0].exit.reason, 'stop-loss');
  assert.equal(report.trades[0].pointsGross, -20);
});

test('a clean +60 trigger activates BE and a later return exits at gross break-even', () => {
  const report = run(fixture([[110, 111, 109, 110], [100, 110, 99, 105], [120, 165, 110, 160], [150, 155, 95, 100]]));
  const trade = report.trades[0];
  assert.equal(trade.breakEven.activated, true);
  assert.equal(trade.breakEven.activationBarIndex, 2);
  assert.equal(trade.stop.currentPrice, 100);
  assert.equal(trade.exit.reason, 'break-even-stop');
  assert.equal(trade.pointsGross, 0);
  assert.equal(report.summary.breakEvenStopExits, 1);
  assert.equal(report.summary.targetWins, 0);
});

test('same-minute favorable threshold and return are ambiguous, and block the remaining NY session', () => {
  const other = support({ key: 'second', lo: 49, hi: 51 });
  const data = fixture([[110, 111, 109, 110], [100, 165, 99, 110], [110, 112, 49, 55]], [support(), other]);
  const report = run(data);
  assert.equal(report.trades.length, 1);
  assert.equal(report.trades[0].status, 'ambiguous');
  assert.equal(report.trades[0].exit.reason, 'be-activation-and-return-to-entry-same-minute');
  assert.equal(report.exclusions.firstContactsBlockedByAmbiguity, 1);
  assert.equal(report.summary.targetWinRateResolved.rate, null);
  assert.equal(report.summary.targetWinRateBoundsAllEntered.lower, 0);
  assert.equal(report.summary.targetWinRateBoundsAllEntered.upper, 1);
});

test('intrabar entry-minute favorable extrema do not prove they occurred after the fill', () => {
  const report = run(fixture([[110, 111, 109, 110], [110, 235, 100, 105]]));
  assert.equal(report.trades[0].status, 'ambiguous');
  assert.equal(report.trades[0].exit.reason, 'entry-minute-critical-threshold-order-unknown');
  assert.equal(report.summary.targetWins, 0);
});

test('initial stop and favorable threshold in the same held minute cannot be assigned a favorable path', () => {
  const report = run(fixture([[110, 111, 109, 110], [100, 110, 99, 105], [105, 165, 79, 110]]));
  assert.equal(report.trades[0].status, 'ambiguous');
  assert.equal(report.trades[0].exit.reason, 'initial-stop-and-favorable-threshold-same-minute');
});

test('a stop opening gap executes at the observed open and flags the risk breach', () => {
  const report = run(fixture([[110, 111, 109, 110], [100, 110, 99, 105], [70, 75, 65, 70]]));
  const trade = report.trades[0];
  assert.equal(trade.exit.price, 70);
  assert.equal(trade.exit.observedOpenGap, true);
  assert.equal(trade.pointsGross, -30);
  assert.equal(trade.plannedRiskExceeded, true);
  assert.equal(report.summary.plannedRiskExceededByGapTrades, 1);
});

test('opening entry improvement and gap beyond the anchored band are retained as audit evidence', () => {
  const report = run(fixture([[110, 111, 109, 110], [80, 90, 75, 85]]));
  const trade = report.trades[0];
  assert.equal(trade.entry.limitPrice, 100);
  assert.equal(trade.entry.price, 80);
  assert.equal(trade.entry.openingPriceImprovementPoints, 20);
  assert.equal(trade.entry.openingGapBeyondBand, true);
  assert.equal(trade.entry.openingGapBeyondAnchorInvalidation, true);
  assert.equal(trade.stop.initialPrice, 60);
});

test('an opening gap beyond the profit limit fills the fixed limit, not an invented windfall', () => {
  const report = run(fixture([[110, 111, 109, 110], [100, 110, 99, 105], [240, 245, 235, 240]]));
  assert.equal(report.trades[0].exit.reason, 'take-profit');
  assert.equal(report.trades[0].exit.price, 230);
  assert.equal(report.trades[0].pointsGross, 130);
  assert.equal(report.trades[0].breakEven.activated, true);
  assert.equal(report.trades[0].breakEven.activationBarIndex, 2);
  assert.equal(report.trades[0].breakEven.activationTiming, 'known at modeled bar open');
});

test('a first band contact that misses the midpoint consumes the attempt, so a retest is never filled', () => {
  const report = run(fixture([[110, 111, 109, 110], [110, 111, 100.5, 105], [105, 106, 99, 100]]));
  assert.equal(report.trades.length, 0);
  assert.equal(report.exclusions.unfilledFirstContactAttempts, 1);
  assert.equal(report.exclusions.repeatedBandContacts, 1);
});

test('a hidden previous contact excludes a zone even when its current contact is the first locally visible', () => {
  const zone = support({ touchedAt: START - MINUTE });
  const report = run(fixture([[110, 111, 109, 110], [110, 111, 100, 105]], zone));
  assert.equal(report.trades.length, 0);
  assert.equal(report.exclusions.previouslyTouchedInSourceContacts, 1);
});

test('a pre-RTH touch cannot reappear as a fresh first attempt during RTH', () => {
  const report = run(fixture([[110, 111, 109, 110], [110, 111, 100.5, 105], [105, 106, 99, 100]], support(), START - MINUTE));
  assert.equal(report.trades.length, 0);
  assert.equal(report.exclusions.firstContactsOutsideNyRth, 1);
  assert.equal(report.exclusions.repeatedBandContacts, 1);
});

test('priority is selected before the bar: an untouched nearest zone prevents a hindsight switch to the touched far zone', () => {
  const farResistance = support({ key: 'far', side: 1, lo: 129, hi: 131 });
  const report = run(fixture([[110, 111, 109, 110], [110, 131, 108, 125]], [support(), farResistance]));
  assert.equal(report.trades.length, 0);
  assert.equal(report.exclusions.firstContactsNotSelectedByPrebarPriority, 1);
});

test('prebar distance ties favor yellow, then older formation, without using current candle outcomes', () => {
  const green = support();
  const yellow = support({ key: 'yellow', yellow: true, yellowAt: START - MINUTE,
    yellowText: 'STDV | VWAP | VAH | RB 10m' });
  const report = run(fixture([[110, 111, 109, 110], [100, 110, 99, 105]], [green, yellow]));
  assert.equal(report.trades.length, 1);
  assert.equal(report.trades[0].zoneKey, 'yellow');
  assert.equal(report.trades[0].gradeAtEntry, 'yellow');
  assert.equal(report.trades[0].contributorsAtEntry, yellow.yellowText);
  const older = support({ key: 'older', start: START - 20 * MINUTE });
  assert.equal(run(fixture([[110, 111, 109, 110], [100, 110, 99, 105]], [green, older])).trades[0].zoneKey, 'older');
});

test('a positive session-close exit below 130 is distinct from a target win', () => {
  const report = run(fixture([[110, 111, 109, 110], [100, 155, 99, 150]], support(), Date.UTC(2026, 0, 22, 20, 58)));
  const trade = report.trades[0];
  assert.equal(trade.exit.reason, 'session-close');
  assert.equal(trade.pointsGross, 50);
  assert.equal(report.summary.positiveSessionExitsBelowTarget, 1);
  assert.equal(report.summary.targetWins, 0);
  assert.equal(report.summary.positiveExitRateResolved.rate, 1);
  assert.equal(report.summary.targetWinRateResolved.rate, 0);
});

test('an exit candle cannot also enter a second position; its first contact remains consumed', () => {
  const lower = support({ key: 'lower', lo: 69, hi: 71 });
  const report = run(fixture([[110, 111, 109, 110], [100, 110, 99, 105],
    [105, 110, 69, 75], [75, 80, 69, 75]], [support(), lower]));
  assert.equal(report.trades.length, 1);
  assert.equal(report.trades[0].exit.reason, 'stop-loss');
  assert.equal(report.exclusions.firstContactsWhileBusy, 1);
  assert.ok(report.exclusions.repeatedBandContacts > 0);
});

test('evaluation dates and warmup filter entries, while first contacts still consume zone freshness', () => {
  const data = fixture([[110, 111, 109, 110], [110, 111, 100.5, 105], [105, 106, 99, 100]]);
  data.frames[1].fibSets = 1;
  const warmup = run(data);
  assert.equal(warmup.trades.length, 0);
  assert.equal(warmup.exclusions.firstContactsBeforeWarmup, 1);
  const excluded = run(fixture([[110, 111, 109, 110], [100, 110, 99, 105]]), { scoreDates: ['2026-01-23'] });
  assert.equal(excluded.trades.length, 0);
  assert.equal(excluded.exclusions.firstContactsOutsideScoreDates, 1);
});

test('later grade upgrades do not rewrite entry confluences or the historical green setup', () => {
  const data = fixture([[110, 111, 109, 110], [100, 110, 99, 105], [105, 110, 79, 85]]);
  data.frames[2].zones[0] = { ...support(), yellow: true, yellowAt: data.bars[2].openTime,
    kinds: 4, yellowText: 'STDV | VWAP | VAH | RB 10m' };
  const trade = run(data).trades[0];
  assert.equal(trade.gradeAtEntry, 'green');
  assert.equal(trade.contributorsAtEntry, 'STDV | VWAP');
  assert.equal(trade.maximumKindsObserved, 2);
});

test('missing candles while a position is open make the path unknown; data-end positions are incomplete', () => {
  const data = fixture([[110, 111, 109, 110], [100, 110, 99, 105], [105, 110, 100, 105]]);
  data.bars[2].openTime += MINUTE; data.bars[2].closeTime += MINUTE;
  data.frames[2].time += MINUTE; data.frames[2].asOf += MINUTE;
  const gap = run(data);
  assert.equal(gap.trades[0].status, 'ambiguous');
  assert.equal(gap.trades[0].exit.reason, 'missing-candles-while-position-open');
  const end = run(fixture([[110, 111, 109, 110], [100, 110, 99, 105]]));
  assert.equal(end.trades[0].status, 'incomplete');
  assert.equal(end.summary.incompleteTrades, 1);
});

test('future state and malformed clock/risk inputs fail rather than silently entering the backtest', () => {
  const data = fixture([[110, 111, 109, 110], [100, 110, 99, 105]]);
  data.frames[1].asOf += MINUTE;
  assert.throws(() => run(data), /Future\/unclocked/);
  assert.throws(() => run(fixture([[110, 111, 109, 110]]), { stopPoints: 21 }), /Invalid trade risk/);
  assert.throws(() => run(fixture([[110, 111, 109, 110]]), { stopPoints: 19.9 }), /tick grid/);
  const yellow = support({ yellow: true, yellowAt: START + 3 * MINUTE });
  assert.throws(() => run(fixture([[110, 111, 109, 110]], yellow)), /future yellow/);
});
