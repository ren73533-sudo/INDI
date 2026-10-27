// Causal reaction scoring for Ethereal's actual pre-contact visible zone frames.
// This module never simulates an order, a fill, fees, P&L or a trade win rate.
const MINUTE = 60_000;
const DAY = 86_400_000;
const nyClock = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit',
  hourCycle: 'h23', weekday: 'short',
});
const dateOf = time => new Date(time).toISOString().slice(0, 10);
const iso = time => Number.isFinite(time) ? new Date(time).toISOString() : null;
const finite = Number.isFinite;
const average = values => values.length ? values.reduce((a, b) => a + b, 0) / values.length : null;
const median = values => {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b), middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};
const fraction = (value, total) => total ? value / total : null;

export function etherealSession(time) {
  const parts = Object.fromEntries(nyClock.formatToParts(time).map(part => [part.type, part.value]));
  const nyMinute = Number(parts.hour) * 60 + Number(parts.minute);
  const day = new Date(time).getUTCDay(), utcMinute = Math.floor((time % DAY) / MINUTE);
  const ny = !['Sat', 'Sun'].includes(parts.weekday) && nyMinute >= 570 && nyMinute < 960;
  const london = day !== 0 && day !== 6 && utcMinute >= 450 && utcMinute < 810;
  return ny ? 'ny' : london ? 'london' : null;
}

function conceptLabels(text) {
  const labels = [];
  if (/\bSTDV\b/.test(text)) labels.push('Fib STDV');
  if (/\bVWAP\b/.test(text)) labels.push('VWAP');
  if (/\bVAH\b|\bVAL\b/.test(text)) labels.push('VAH/VAL');
  if (/\bRB\b/.test(text)) labels.push('RB');
  return labels;
}

function validateInput(bars, frames) {
  if (!Array.isArray(bars) || !Array.isArray(frames) || bars.length !== frames.length)
    throw new Error('Candle / Ethereal frame count mismatch');
  let previous = -Infinity;
  for (let index = 0; index < bars.length; index++) {
    const bar = bars[index], frame = frames[index];
    if (!finite(bar.openTime) || bar.openTime % MINUTE || bar.openTime <= previous || bar.closeTime !== bar.openTime + MINUTE)
      throw new Error(`Invalid one-minute candle timestamp at row ${index}`);
    if (![bar.open, bar.high, bar.low, bar.close, bar.volume].every(finite) || bar.volume < 0 || bar.low > Math.min(bar.open, bar.close) || bar.high < Math.max(bar.open, bar.close) || bar.low > bar.high)
      throw new Error(`Invalid OHLCV at row ${index}`);
    if (!frame || frame.time !== bar.openTime || !Array.isArray(frame.zones))
      throw new Error(`Ethereal pre-contact frame alignment failed at row ${index}`);
    if (frame.available !== false) {
      if (!finite(frame.asOf) || frame.asOf > bar.openTime)
        throw new Error(`Future or missing source clock at row ${index}`);
      if (!Number.isInteger(frame.fibSets) || frame.fibSets < 0)
        throw new Error(`Invalid published Fib-set count at row ${index}`);
    } else if (frame.zones.length) throw new Error(`Unavailable frame has visible zones at row ${index}`);
    previous = bar.openTime;
  }
}

function normalizeDates(scoreDates) {
  if (scoreDates === undefined || scoreDates === null) return null;
  if (!Array.isArray(scoreDates)) throw new Error('scoreDates must be an array of UTC YYYY-MM-DD dates');
  for (const date of scoreDates) {
    if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !finite(Date.parse(date)) || dateOf(Date.parse(date)) !== date)
      throw new Error(`Invalid scoring date: ${date}`);
  }
  return new Set(scoreDates);
}

function ledgerFrom(options) {
  const entries = options.contactLedger instanceof Map ? [...options.contactLedger] : Object.entries(options.contactLedger ?? {});
  const ledger = new Map(entries.map(([key, value]) => [key, { ...value }]));
  for (const key of options.seenZoneKeys ?? [])
    if (!ledger.has(key)) ledger.set(key, { firstTouchOpenTime: null, firstTouchCloseTime: null, evidence: 'caller-provided seen zone key' });
  return ledger;
}

function contactDiagnostics(bar, zone) {
  const support = zone.side === -1;
  const threshold = support ? zone.killLo : zone.killHi;
  return {
    openBeyondBand: support ? bar.open < zone.lo : bar.open > zone.hi,
    penetrationBeyondBandPoints: Math.max(0, support ? zone.lo - bar.low : bar.high - zone.hi),
    invalidationThreshold: finite(threshold) ? threshold : null,
    invalidationThresholdReachedOnContact: finite(threshold) ? (support ? bar.low <= threshold : bar.high >= threshold) : null,
    openBeyondInvalidationThreshold: finite(threshold) ? (support ? bar.open <= threshold : bar.open >= threshold) : null,
    temporalResolution: 'contact-candle OHLC; intrabar order and any resting-limit fill are unsequenced',
  };
}

function observe(bars, contactIndex, direction, horizon, threshold, dateSet, restrictOutcomes) {
  const contact = bars[contactIndex], reference = contact.close;
  let mfe = 0, mae = 0, benchmark = 'neither', firstHitObservationMinute = null;
  let firstHitBarOpenUtc = null, firstHitBarCloseUtc = null, terminal = null;
  for (let step = 1; step <= horizon; step++) {
    const expected = contact.openTime + step * MINUTE;
    const future = bars[contactIndex + step];
    let reason = null;
    if (!future || future.openTime !== expected) reason = 'missing-follow-up-minute';
    else if (restrictOutcomes && dateSet && !dateSet.has(dateOf(future.openTime))) reason = 'follow-up-outside-scoring-dates';
    if (reason) return { complete: false, observedMinutes: step - 1, reason,
      firstUnavailableMinuteUtc: iso(expected),
      unscoredPartialObservation: { favorableExcursion: mfe, adverseExcursion: mae, benchmarkObserved: benchmark } };
    const favorable = direction === 1 ? future.high - reference : reference - future.low;
    const adverse = direction === 1 ? reference - future.low : future.high - reference;
    mfe = Math.max(mfe, favorable); mae = Math.max(mae, adverse);
    if (benchmark === 'neither' && (favorable >= threshold || adverse >= threshold)) {
      // The observed open precedes either intrabar extreme. A gap that opens
      // at/beyond one boundary establishes that boundary first; when the open
      // is inside both boundaries, OHLC cannot order a two-boundary candle.
      const directionalOpen = (future.open - reference) * direction;
      benchmark = directionalOpen >= threshold ? 'favorable-first'
        : directionalOpen <= -threshold ? 'adverse-first'
          : favorable >= threshold && adverse >= threshold ? 'ambiguous'
            : favorable >= threshold ? 'favorable-first' : 'adverse-first';
      firstHitObservationMinute = step;
      firstHitBarOpenUtc = iso(future.openTime); firstHitBarCloseUtc = iso(future.closeTime);
    }
    terminal = future.close;
  }
  return { complete: true, favorableExcursion: mfe, adverseExcursion: mae,
    directionalCloseChange: (terminal - reference) * direction, benchmark,
    firstHitObservationMinute, firstHitBarOpenUtc, firstHitBarCloseUtc };
}

export function summarizeEtherealEvents(events, horizons = [5, 15, 30]) {
  const summaries = {};
  for (const horizon of horizons) {
    const valid = events.map(event => event.outcomes[horizon]).filter(outcome => outcome?.complete);
    const benchmarks = Object.fromEntries(['favorable-first', 'adverse-first', 'ambiguous', 'neither'].map(name => [name, valid.filter(outcome => outcome.benchmark === name).length]));
    const resolved = benchmarks['favorable-first'] + benchmarks['adverse-first'];
    summaries[horizon] = {
      totalEvents: events.length, completeEvents: valid.length, incompleteEvents: events.length - valid.length,
      meanFavorableExcursion: average(valid.map(outcome => outcome.favorableExcursion)),
      medianFavorableExcursion: median(valid.map(outcome => outcome.favorableExcursion)),
      meanAdverseExcursion: average(valid.map(outcome => outcome.adverseExcursion)),
      medianAdverseExcursion: median(valid.map(outcome => outcome.adverseExcursion)),
      meanDirectionalCloseChange: average(valid.map(outcome => outcome.directionalCloseChange)),
      benchmarks, resolvedBenchmarkEvents: resolved,
      favorableFirstShareResolved: fraction(benchmarks['favorable-first'], resolved),
      favorableFirstShareAllComplete: fraction(benchmarks['favorable-first'], valid.length),
      adverseFirstShareAllComplete: fraction(benchmarks['adverse-first'], valid.length),
      ambiguousShareAllComplete: fraction(benchmarks.ambiguous, valid.length),
      neitherShareAllComplete: fraction(benchmarks.neither, valid.length),
      rateMeaning: 'descriptive post-close reaction benchmark shares, not trade win rate; overlapping events are not independent',
    };
  }
  return summaries;
}

function grouped(events, horizons, keyOf) {
  const groups = new Map();
  for (const event of events) {
    const key = keyOf(event);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(event);
  }
  return Object.fromEntries([...groups].sort(([a], [b]) => a.localeCompare(b)).map(([key, rows]) => [key, {
    events: rows.length, summaries: summarizeEtherealEvents(rows, horizons),
  }]));
}

/**
 * frames[i] must be state available at bars[i].openTime, before that candle
 * enters Ethereal. The scorer does not reconstruct strategy confluences.
 */
export function studyEthereal(bars, frames, options = {}) {
  validateInput(bars, frames);
  const session = options.session ?? 'ny';
  const horizons = options.horizons ?? [5, 15, 30];
  const threshold = options.threshold ?? 15;
  const minimumFibSets = options.minimumFibSets ?? 2;
  if (!['ny', 'london', 'both'].includes(session)) throw new Error('Session must be ny, london or both');
  if (!Array.isArray(horizons) || !horizons.length || new Set(horizons).size !== horizons.length || horizons.some(value => !Number.isInteger(value) || value <= 0))
    throw new Error('Horizons must be unique positive integer minutes');
  if (!finite(threshold) || threshold <= 0) throw new Error('Reaction threshold must be a positive number');
  if (!Number.isInteger(minimumFibSets) || minimumFibSets < 1) throw new Error('minimumFibSets must be a positive integer');
  const dateSet = normalizeDates(options.scoreDates);
  const restrictOutcomes = options.restrictOutcomesToScoreDates ?? true;
  const ledger = ledgerFrom(options), scoredKeys = new Set();
  const events = [], retestCandidates = [];
  const coverage = { bars: bars.length, scoredDateBars: 0, inRequestedSessionBars: 0, eligibleBars: 0, staleSourceFrames: 0, visibleZoneStates: 0, eligibleZoneStates: 0, touchingZoneStates: 0 };
  const exclusions = { outsideScoringDatesBars: 0, outsideRequestedSessionBars: 0, unavailableSourceBars: 0,
    insufficientFibSetsBars: 0, noConsecutivePriorMinuteBars: 0,
    invalidatedZoneStates: 0, outsideVisibleProjectionZoneStates: 0, futureFormationZoneStates: 0,
    priorTouchesKnownFromEngine: 0, firstTouchOutsideScoringDates: 0, firstTouchOutsideRequestedSession: 0,
    firstTouchUnavailableWarmupOrPrior: 0, firstTouchAlreadyInside: 0, firstTouchWrongSide: 0,
    repeatTouchingBars: 0, overlapContactCopies: 0, repeatedApproachCandidates: 0 };

  for (let index = 0; index < bars.length; index++) {
    const bar = bars[index], prior = bars[index - 1], frame = frames[index];
    const date = dateOf(bar.openTime), inDates = !dateSet || dateSet.has(date);
    const currentSession = etherealSession(bar.openTime);
    const inRequestedSession = currentSession !== null && (session === 'both' || session === currentSession);
    const available = frame.available !== false;
    const consecutivePrior = !!prior && prior.closeTime === bar.openTime;
    if (inDates) coverage.scoredDateBars++;
    if (inDates && inRequestedSession) coverage.inRequestedSessionBars++;
    if (available && frame.asOf < bar.openTime) coverage.staleSourceFrames++;
    let gate = null;
    if (!inDates) { gate = 'date'; exclusions.outsideScoringDatesBars++; }
    else if (!inRequestedSession) { gate = 'session'; exclusions.outsideRequestedSessionBars++; }
    else if (!available) { gate = 'unavailable'; exclusions.unavailableSourceBars++; }
    else if (frame.fibSets < minimumFibSets) { gate = 'warmup'; exclusions.insufficientFibSetsBars++; }
    else if (!consecutivePrior) { gate = 'prior'; exclusions.noConsecutivePriorMinuteBars++; }
    else coverage.eligibleBars++;
    if (!available) continue;
    const frameKeys = new Set();
    for (const zone of frame.zones) {
      coverage.visibleZoneStates++;
      if (typeof zone.key !== 'string' || !zone.key || frameKeys.has(zone.key))
        throw new Error(`Missing or duplicate resting-zone key at row ${index}`);
      frameKeys.add(zone.key);
      if (![zone.start, zone.lo, zone.hi].every(finite) || zone.lo > zone.hi || ![-1, 1].includes(zone.side))
        throw new Error(`Invalid Ethereal zone at row ${index}`);
      if (zone.live === false) { exclusions.invalidatedZoneStates++; continue; }
      if (zone.start > bar.openTime || zone.start > frame.asOf) { exclusions.futureFormationZoneStates++; continue; }
      if (zone.eligibleAtOpen === false || (finite(zone.right) && zone.right < bar.openTime)) {
        exclusions.outsideVisibleProjectionZoneStates++; continue;
      }
      if (zone.yellow && (!finite(zone.yellowAt) || zone.yellowAt > frame.asOf))
        throw new Error(`Future or missing yellow qualification timestamp at row ${index}`);
      if (zone.touchedAt != null && finite(zone.touchedAt)) {
        if (zone.touchedAt > frame.asOf || zone.touchedAt <= zone.start)
          throw new Error(`Invalid first-return timestamp at row ${index}`);
        if (!ledger.has(zone.key)) {
          ledger.set(zone.key, { firstTouchOpenTime: zone.touchedAt - MINUTE,
            firstTouchCloseTime: zone.touchedAt, evidence: 'engine touchedAt; may have occurred while hidden or before scoring' });
          exclusions.priorTouchesKnownFromEngine++;
        } else {
          const known = ledger.get(zone.key);
          if (finite(known.firstTouchCloseTime) && zone.touchedAt < known.firstTouchCloseTime) {
            if (scoredKeys.has(zone.key)) throw new Error('Engine first-touch evidence predates an already scored first contact');
            ledger.set(zone.key, { firstTouchOpenTime: zone.touchedAt - MINUTE, firstTouchCloseTime: zone.touchedAt, evidence: 'earlier engine touchedAt' });
          }
        }
      }
      coverage.eligibleZoneStates++;
      if (bar.high < zone.lo || bar.low > zone.hi) continue;
      coverage.touchingZoneStates++;
      const existing = ledger.get(zone.key);
      if (existing && finite(existing.firstTouchOpenTime) && bar.openTime < existing.firstTouchOpenTime)
        throw new Error('Contact ledger is inconsistent with chronological replay history');
      const isFirst = !existing;
      const approachedFromAbove = consecutivePrior && prior.close > zone.hi;
      const approachedFromBelow = consecutivePrior && prior.close < zone.lo;
      const direction = zone.side === -1 ? 1 : -1;
      const validApproach = zone.side === -1 ? approachedFromAbove : approachedFromBelow;
      const alreadyInside = consecutivePrior && !approachedFromAbove && !approachedFromBelow;
      if (isFirst) ledger.set(zone.key, { firstTouchOpenTime: bar.openTime, firstTouchCloseTime: bar.closeTime,
        evidence: 'observed overlap while zone was visible and eligible at candle open',
        validApproach, gate, firstTouchGrade: zone.yellow ? 'yellow' : 'green' });
      else {
        exclusions.repeatTouchingBars++;
        if (existing.firstTouchOpenTime === bar.openTime) { exclusions.overlapContactCopies++; continue; }
      }
      if (isFirst && gate === 'date') exclusions.firstTouchOutsideScoringDates++;
      else if (isFirst && gate === 'session') exclusions.firstTouchOutsideRequestedSession++;
      else if (isFirst && gate) exclusions.firstTouchUnavailableWarmupOrPrior++;
      if (isFirst && alreadyInside) exclusions.firstTouchAlreadyInside++;
      else if (isFirst && consecutivePrior && !validApproach) exclusions.firstTouchWrongSide++;
      if (gate || !validApproach) continue;

      const grade = zone.yellow ? 'yellow' : 'green';
      const details = zone.details ?? (zone.yellow ? zone.yellowText : zone.sourceText) ?? '';
      const concepts = conceptLabels(details);
      const event = {
        id: `${zone.key}@${bar.openTime}`, zoneKey: zone.key,
        cohort: isFirst ? 'first-contact' : 'retest-candidate',
        contactBarOpenTime: bar.openTime, contactBarCloseTime: bar.closeTime,
        contactBarOpenUtc: iso(bar.openTime), contactBarCloseUtc: iso(bar.closeTime),
        sourceAsOfUtc: iso(frame.asOf), sourceAgeMinutes: (bar.openTime - frame.asOf) / MINUTE,
        date, session: currentSession, side: zone.side,
        direction: zone.side === -1 ? 'beta / support / buy-reversal area' : 'rho / resistance / sell-reversal area',
        zoneStartUtc: iso(zone.start), zoneAgeMinutes: (bar.openTime - zone.start) / MINUTE, zoneLo: zone.lo, zoneHi: zone.hi,
        grade, yellowAtUtc: zone.yellow ? iso(zone.yellowAt) : null,
        maxKindsObserved: zone.kinds ?? null, conceptTypes: concepts,
        confluenceCombination: concepts.length ? concepts.join(' + ') : 'unknown contributor text',
        contributingText: details, referenceClose: bar.close,
        contactDiagnostics: contactDiagnostics(bar, zone),
        tradeFillStatus: 'not simulated', outcomes: {},
      };
      for (const horizon of horizons)
        event.outcomes[horizon] = observe(bars, index, direction, horizon, threshold, dateSet, restrictOutcomes);
      if (isFirst) { events.push(event); scoredKeys.add(zone.key); }
      else { retestCandidates.push(event); exclusions.repeatedApproachCandidates++; }
    }
  }
  const by = keyOf => grouped(events, horizons, keyOf);
  return {
    kind: 'Ethereal causal post-contact reaction study; not a trade or profitability backtest',
    configuration: { session, horizons: [...horizons], thresholdPoints: threshold, minimumFibSets,
      scoreDates: dateSet ? [...dateSet].sort() : null, restrictOutcomesToScoreDates: restrictOutcomes,
      timing: 'same-index snapshot known at contact candle open; contact candle cannot create its own tested zone',
      reference: 'contact candle close; observation begins with the following candle',
      deduplication: 'first overlap per stable resting-zone key across all available visible history, plus transported touchedAt evidence; no daily reset',
      repeatedContacts: 'separate completed-minute approach candidates, not independent trades or tick-resolved visits',
      contactInvalidationPolicy: 'retain causal reaction event and flag unsequenced on-contact invalidation; no assumed fill or trading success',
      benchmarkMeaning: 'symmetric descriptive reaction benchmark, not approved entry/SL/TP',
      benchmarkOrdering: 'observed open at/beyond a boundary precedes intrabar extremes; two-boundary candles opening strictly inside remain ambiguous',
      yellowGrade: 'grade known at contact; never upgrade past green events with future information',
    },
    coverage, exclusions, events: events.length, eventDetails: events,
    summaries: summarizeEtherealEvents(events, horizons),
    groups: { byGrade: by(event => event.grade), bySide: by(event => event.side === -1 ? 'support' : 'resistance'),
      byConfluence: by(event => event.confluenceCombination), bySession: by(event => event.session),
      byContactInvalidation: by(event => event.contactDiagnostics.invalidationThresholdReachedOnContact === true ? 'threshold-reached-on-contact' : event.contactDiagnostics.invalidationThresholdReachedOnContact === false ? 'threshold-not-reached-on-contact' : 'threshold-unavailable'),
      byOpeningBeyondBand: by(event => event.contactDiagnostics.openBeyondBand ? 'adverse-open-beyond-band' : 'open-not-beyond-adverse-edge') },
    retestCandidates: { count: retestCandidates.length, eventDetails: retestCandidates,
      summaries: summarizeEtherealEvents(retestCandidates, horizons) },
    contactLedger: Object.fromEntries([...ledger].sort(([a], [b]) => a.localeCompare(b))),
    seenZoneKeys: [...ledger.keys()].sort(),
    limitations: [
      'One-minute OHLCV does not establish exact entry ticks, fill order or queue priority.',
      'A contact candle can cross invalidation and later close favorably; diagnostics are not an inferred intrabar fill sequence.',
      'Overlapping horizons and zones are dependent observations; benchmark shares are not a trade win rate.',
      'Source-provider and rollover equivalence to TradingView NQ1! remain unverified.',
    ],
  };
}
