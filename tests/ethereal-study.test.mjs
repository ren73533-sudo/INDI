import test from 'node:test';
import assert from 'node:assert/strict';
import { etherealSession, studyEthereal, summarizeEtherealEvents } from '../tools/ethereal-study.mjs';

const MINUTE = 60_000;
const START = Date.UTC(2026, 8, 23, 13, 30);
const candle = (openTime, open, close = open, high = Math.max(open, close) + 1, low = Math.min(open, close) - 1) => ({ openTime, closeTime: openTime + MINUTE, open, close, high, low, volume: 100 });
function fixture(start = START) {
  const bars = [candle(start, 105), candle(start + MINUTE, 105, 101, 106, 100),
    candle(start + 2 * MINUTE, 101, 104, 106, 100), candle(start + 3 * MINUTE, 104, 106, 107, 103)];
  const zone = { key: 'known-support', start: start - 10 * MINUTE, lo: 99, hi: 101,
    side: -1, live: true, eligibleAtOpen: true, kinds: 2, yellow: false,
    touchedAt: null, killLo: 84, killHi: 116, sourceText: 'STDV | VWAP', yellowText: '' };
  const frames = bars.map(bar => ({ time: bar.openTime, asOf: bar.openTime, available: true,
    fibSets: 2, referencePrice: 105, zones: [{ ...zone }] }));
  return { bars, frames, zone };
}

const run = (bars, frames, options = {}) => studyEthereal(bars, frames, { horizons: [2], threshold: 5, ...options });

test('uses same-index PRE-CONTACT state and the frozen support side; measures only after the touch close', () => {
  const { bars, frames } = fixture();
  frames[0].zones = [];
  const report = run(bars, frames);
  assert.equal(report.events, 1, 'shifting to prior frame would wrongly miss this known-at-open zone');
  const event = report.eventDetails[0];
  assert.equal(event.contactBarOpenTime, bars[1].openTime);
  assert.equal(event.referenceClose, 101);
  assert.equal(event.grade, 'green');
  assert.equal(event.zoneAgeMinutes, 11);
  assert.deepEqual(event.conceptTypes, ['Fib STDV', 'VWAP']);
  assert.equal(event.outcomes[2].favorableExcursion, 6);
  assert.equal(event.outcomes[2].adverseExcursion, 1);
  assert.equal(event.outcomes[2].directionalCloseChange, 5);
  assert.equal(event.outcomes[2].benchmark, 'favorable-first');
  assert.equal(event.outcomes[2].firstHitObservationMinute, 1);
  assert.equal(event.outcomes[2].firstHitBarOpenUtc, new Date(bars[2].openTime).toISOString());
  assert.equal(event.tradeFillStatus, 'not simulated');
});

test('a touch cannot create its own zone, invalidated/history boxes are not entries, and future clocks fail loudly', () => {
  const { bars, frames } = fixture();
  const future = frames.map(frame => ({ ...frame, zones: frame.zones.map(zone => ({ ...zone, start: bars[1].closeTime })) }));
  assert.equal(run(bars, future).events, 0);
  assert.ok(run(bars, future).exclusions.futureFormationZoneStates > 0);
  assert.equal(run(bars, frames.map(frame => ({ ...frame, zones: frame.zones.map(zone => ({ ...zone, live: false })) }))).events, 0);
  assert.equal(run(bars, frames.map(frame => ({ ...frame, zones: frame.zones.map(zone => ({ ...zone, eligibleAtOpen: false })) }))).events, 0);
  const bad = frames.map(frame => ({ ...frame })); bad[1].asOf = bars[1].closeTime;
  assert.throws(() => run(bars, bad), /Future or missing source clock/);
  const wrongIndex = frames.map(frame => ({ ...frame })); wrongIndex[1].time += MINUTE;
  assert.throws(() => run(bars, wrongIndex), /frame alignment/);
});

test('resistance scoring is symmetric and an approach contrary to the frozen side cannot become a first trade', () => {
  const start = START;
  const bars = [candle(start, 95), candle(start + MINUTE, 95, 99, 100, 94),
    candle(start + 2 * MINUTE, 99, 96, 100, 94), candle(start + 3 * MINUTE, 96, 94, 97, 93)];
  const { frames } = fixture();
  const resistance = frames.map(frame => ({ ...frame, zones: frame.zones.map(zone => ({ ...zone, side: 1 })) }));
  const report = run(bars, resistance);
  assert.equal(report.events, 1);
  assert.equal(report.eventDetails[0].outcomes[2].favorableExcursion, 6);
  assert.equal(report.eventDetails[0].outcomes[2].adverseExcursion, 1);
  assert.equal(report.eventDetails[0].outcomes[2].directionalCloseChange, 5);
  const wrong = run(bars, frames);
  assert.equal(wrong.events, 0);
  assert.equal(wrong.exclusions.firstTouchWrongSide, 1);
});

test('later yellow qualification and historical maximum kinds cannot recolor a green contact or invent contributors', () => {
  const { bars, frames } = fixture();
  frames[1].zones[0].kinds = 4;
  for (let index = 2; index < frames.length; index++) frames[index].zones = frames[index].zones.map(zone => ({ ...zone, yellow: true,
    yellowAt: bars[2].openTime, kinds: 4, yellowText: 'STDV | VWAP | VAH | RB 10m' }));
  const report = run(bars, frames);
  assert.equal(report.events, 1);
  const event = report.eventDetails[0];
  assert.equal(event.grade, 'green');
  assert.equal(event.maxKindsObserved, 4);
  assert.equal(event.contributingText, 'STDV | VWAP');
  assert.deepEqual(event.conceptTypes, ['Fib STDV', 'VWAP']);
  assert.ok(!report.groups.byGrade.yellow);
  const leaked = fixture(); leaked.frames[1].zones[0] = { ...leaked.zone, yellow: true, yellowAt: leaked.bars[2].openTime };
  assert.throws(() => run(leaked.bars, leaked.frames), /Future or missing yellow/);
});

test('same-minute threshold hits remain ambiguous and missing follow-up excludes the incomplete horizon', () => {
  const { bars, frames } = fixture();
  bars[2] = candle(bars[2].openTime, 101, 101, 107, 95);
  const report = run(bars, frames, { horizons: [1, 5] });
  assert.equal(report.eventDetails[0].outcomes[1].benchmark, 'ambiguous');
  assert.equal(report.summaries[1].resolvedBenchmarkEvents, 0);
  assert.equal(report.summaries[1].favorableFirstShareResolved, null);
  assert.equal(report.summaries[1].ambiguousShareAllComplete, 1);
  assert.equal(report.eventDetails[0].outcomes[5].complete, false);
  assert.equal(report.eventDetails[0].outcomes[5].reason, 'missing-follow-up-minute');
  assert.equal(report.summaries[5].completeEvents, 0);
  assert.equal(report.summaries[5].incompleteEvents, 1);
  const gap = run([bars[0], bars[1], bars[3]], [frames[0], frames[1], frames[3]], { horizons: [1] });
  assert.equal(gap.eventDetails[0].outcomes[1].complete, false);
  assert.equal(gap.eventDetails[0].outcomes[1].observedMinutes, 0);
});

test('an observed open at or beyond a reaction boundary orders a two-boundary candle for either direction', () => {
  for (const side of [-1, 1]) {
    for (const open of [80, 85, 115, 120]) {
      const { bars, frames } = fixture();
      if (side === 1) {
        bars[0] = candle(START, 95);
        bars[1] = candle(START + MINUTE, 95, 100, 100, 94);
        for (const frame of frames) frame.zones[0].side = 1;
      } else bars[1] = candle(START + MINUTE, 105, 100, 106, 100);
      bars[2] = candle(START + 2 * MINUTE, open, 100, 125, 75);
      const report = run(bars, frames, { horizons: [1], threshold: 15 });
      const outcome = report.eventDetails[0].outcomes[1];
      const expected = (open - 100) * (side === -1 ? 1 : -1) > 0 ? 'favorable-first' : 'adverse-first';
      assert.equal(outcome.benchmark, expected, `side=${side}, open=${open}`);
      assert.equal(outcome.firstHitObservationMinute, 1);
      assert.equal(outcome.favorableExcursion, 25);
      assert.equal(outcome.adverseExcursion, 25);
    }
  }
});

test('opens strictly inside both reaction boundaries preserve intrabar ambiguity', () => {
  for (const open of [85.25, 100, 114.75]) {
    const { bars, frames } = fixture();
    bars[1] = candle(START + MINUTE, 105, 100, 106, 100);
    bars[2] = candle(START + 2 * MINUTE, open, 100, 125, 75);
    const outcome = run(bars, frames, { horizons: [1], threshold: 15 }).eventDetails[0].outcomes[1];
    assert.equal(outcome.benchmark, 'ambiguous', `open=${open}`);
  }
});

test('a later observed opening boundary hit cannot overwrite an earlier resolved reaction', () => {
  const { bars, frames } = fixture();
  bars[1] = candle(START + MINUTE, 105, 100, 106, 100);
  bars[2] = candle(START + 2 * MINUTE, 100, 115, 116, 95);
  bars[3] = candle(START + 3 * MINUTE, 80, 100, 125, 75);
  const outcome = run(bars, frames, { horizons: [2], threshold: 15 }).eventDetails[0].outcomes[2];
  assert.equal(outcome.benchmark, 'favorable-first');
  assert.equal(outcome.firstHitObservationMinute, 1);
});

test('engine touchedAt excludes a first contact that occurred while the area was hidden', () => {
  const { bars, frames } = fixture();
  frames[0].zones = [];
  for (let index = 1; index < frames.length; index++) frames[index].zones[0].touchedAt = START;
  const report = run(bars, frames);
  assert.equal(report.events, 0);
  assert.equal(report.exclusions.priorTouchesKnownFromEngine, 1);
  assert.equal(report.retestCandidates.count, 1);
  assert.equal(report.retestCandidates.eventDetails[0].cohort, 'retest-candidate');
  assert.equal(report.contactLedger['known-support'].firstTouchCloseTime, START);
});

test('warmup and outside-session contacts consume first-contact identity rather than promoting later retests', () => {
  const original = fixture();
  const bars = [original.bars[0], original.bars[1], candle(START + 2 * MINUTE, 105), candle(START + 3 * MINUTE, 105, 101, 106, 100)];
  const frames = original.frames.map(frame => ({ ...frame, zones: frame.zones.map(zone => ({ ...zone })) }));
  frames[1].fibSets = 1;
  const warm = run(bars, frames, { horizons: [1] });
  assert.equal(warm.events, 0);
  assert.equal(warm.exclusions.firstTouchUnavailableWarmupOrPrior, 1);
  assert.equal(warm.retestCandidates.count, 1);
  const beforeLondon = Date.UTC(2026, 8, 23, 7, 28);
  const shiftedBars = bars.map(bar => ({ ...bar, openTime: bar.openTime - START + beforeLondon, closeTime: bar.closeTime - START + beforeLondon }));
  const shiftedFrames = original.frames.map((frame, index) => ({ ...frame,
    time: shiftedBars[index].openTime, asOf: shiftedBars[index].openTime,
    zones: frame.zones.map(zone => ({ ...zone, start: beforeLondon - 10 * MINUTE })) }));
  const london = run(shiftedBars, shiftedFrames, { session: 'london', horizons: [1] });
  assert.equal(london.events, 0);
  assert.equal(london.exclusions.firstTouchOutsideRequestedSession, 1);
  assert.equal(london.retestCandidates.count, 1);
});

test('first contact is deduplicated across UTC days and overlapping batches with an explicit ledger', () => {
  const { bars, frames } = fixture();
  const first = run(bars, frames);
  const repeated = run(bars, frames, { contactLedger: first.contactLedger });
  assert.equal(repeated.events, 0);
  assert.equal(repeated.exclusions.overlapContactCopies, 1);
  const seenOnly = run(bars, frames, { seenZoneKeys: first.seenZoneKeys });
  assert.equal(seenOnly.events, 0);
  const following = bars.map(bar => ({ ...bar, openTime: bar.openTime + 86_400_000, closeTime: bar.closeTime + 86_400_000 }));
  const laterFrames = frames.map((frame, index) => ({ ...frame, time: following[index].openTime, asOf: following[index].openTime }));
  assert.equal(run(following, laterFrames, { contactLedger: first.contactLedger }).events, 0, 'UTC midnight does not reset resting-area identity');
});

test('date filtering isolates calibration and cannot inspect follow-up prices on a withheld date', () => {
  const { bars, frames } = fixture();
  const excluded = run(bars, frames, { scoreDates: ['2026-09-24'] });
  assert.equal(excluded.events, 0);
  assert.equal(excluded.coverage.eligibleBars, 0);
  assert.equal(excluded.exclusions.outsideScoringDatesBars, bars.length);
  const start = Date.UTC(2026, 11, 7, 20, 58);
  const longBars = Array.from({ length: 184 }, (_, index) => candle(start + index * MINUTE, 101, 101, 102, 100));
  longBars[0] = candle(start, 105); longBars[1] = candle(start + MINUTE, 105, 101, 106, 100);
  for (const bar of longBars) if (new Date(bar.openTime).getUTCDate() === 8) { bar.high = 1000; bar.low = 0; }
  const zone = { ...fixture().zone, start: start - 10 * MINUTE };
  const longFrames = longBars.map(bar => ({ time: bar.openTime, asOf: bar.openTime, available: true, fibSets: 2, zones: [{ ...zone }] }));
  const report = run(longBars, longFrames, { horizons: [181], scoreDates: ['2026-12-07'] });
  assert.equal(report.events, 1);
  const observation = report.eventDetails[0].outcomes[181];
  assert.equal(observation.complete, false);
  assert.equal(observation.reason, 'follow-up-outside-scoring-dates');
  assert.equal(observation.observedMinutes, 180);
  assert.equal(observation.unscoredPartialObservation.favorableExcursion, 1, 'withheld-day high must not enter the observation');
  assert.throws(() => run(bars, frames, { scoreDates: ['2026-02-30'] }), /Invalid scoring date/);
});

test('on-contact invalidation and opening beyond the band are recorded without claiming a fill or trading win', () => {
  const { bars, frames } = fixture();
  bars[1] = candle(bars[1].openTime, 97, 101, 106, 95);
  for (const frame of frames) frame.zones[0].killLo = 98;
  const report = run(bars, frames);
  const event = report.eventDetails[0];
  assert.equal(event.contactDiagnostics.openBeyondBand, true);
  assert.equal(event.contactDiagnostics.penetrationBeyondBandPoints, 4);
  assert.equal(event.contactDiagnostics.invalidationThresholdReachedOnContact, true);
  assert.equal(event.contactDiagnostics.openBeyondInvalidationThreshold, true);
  assert.equal(event.outcomes[2].benchmark, 'favorable-first', 'post-close reaction is distinct from the invalidated contact candle');
  assert.equal(report.groups.byContactInvalidation['threshold-reached-on-contact'].events, 1);
  assert.equal(event.tradeFillStatus, 'not simulated');
});

test('benchmark shares expose resolved and all-complete denominators, with ambiguous/neither/incomplete counts', () => {
  const make = (benchmark, complete = true) => ({ outcomes: { 5: complete ? { complete, benchmark, favorableExcursion: 10, adverseExcursion: 5, directionalCloseChange: 2 } : { complete: false } } });
  const report = summarizeEtherealEvents([make('favorable-first'), make('adverse-first'), make('ambiguous'), make('neither'), make('neither'), make(null, false)], [5])[5];
  assert.equal(report.totalEvents, 6);
  assert.equal(report.completeEvents, 5);
  assert.equal(report.incompleteEvents, 1);
  assert.equal(report.resolvedBenchmarkEvents, 2);
  assert.equal(report.favorableFirstShareResolved, 0.5);
  assert.equal(report.favorableFirstShareAllComplete, 0.2);
  assert.equal(report.ambiguousShareAllComplete, 0.2);
  assert.equal(report.neitherShareAllComplete, 0.4);
  assert.ok(!('winRate' in report));
});

test('NY follows DST, London remains fixed UTC and weekend bars are outside both sessions', () => {
  assert.equal(etherealSession(Date.UTC(2026, 6, 6, 13, 30)), 'ny');
  assert.equal(etherealSession(Date.UTC(2026, 11, 7, 13, 30)), null);
  assert.equal(etherealSession(Date.UTC(2026, 11, 7, 14, 30)), 'ny');
  assert.equal(etherealSession(Date.UTC(2026, 11, 7, 7, 30)), 'london');
  assert.equal(etherealSession(Date.UTC(2026, 6, 6, 7, 30)), 'london');
  assert.equal(etherealSession(Date.UTC(2026, 8, 26, 13, 30)), null);
});
