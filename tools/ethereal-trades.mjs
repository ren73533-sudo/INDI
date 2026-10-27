// Causal, deliberately conservative 1m execution model for Ethereal resting zones.
// This is a gross-point model, not exchange/tick/queue simulation.
const MINUTE = 60_000;
const EPS = 1e-8;
const nyClock = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', weekday: 'short', hourCycle: 'h23',
});
const iso = time => new Date(time).toISOString();
const ratio = (numerator, denominator) => denominator ? numerator / denominator : null;
const finite = Number.isFinite;

function nySession(time) {
  const p = Object.fromEntries(nyClock.formatToParts(new Date(time)).map(part => [part.type, part.value]));
  const minute = Number(p.hour) * 60 + Number(p.minute);
  return { date: `${p.year}-${p.month}-${p.day}`, minute,
    open: !['Sat', 'Sun'].includes(p.weekday) && minute >= 570 && minute < 960,
    closeTime: time + (960 - minute) * MINUTE };
}

function withinDates(time, dates) {
  return !dates || dates.has(iso(time).slice(0, 10));
}

function validZone(zone, bar, frame) {
  if (!zone || !finite(zone.lo) || !finite(zone.hi) || zone.lo > zone.hi || ![-1, 1].includes(zone.side) || typeof zone.key !== 'string')
    throw new Error('Invalid visible zone supplied to trade model');
  if (!finite(zone.start) || zone.start > bar.openTime)
    throw new Error('A future zone cannot enter the trade model');
  if (zone.yellow && (!finite(zone.yellowAt) || zone.yellowAt > frame.asOf))
    throw new Error('A future yellow upgrade cannot enter the trade model');
  if (finite(zone.touchedAt) && zone.touchedAt > frame.asOf)
    throw new Error('Future touchedAt metadata supplied to trade model');
  return zone.live === true && zone.eligibleAtOpen === true;
}

function onCorrectSide(priorClose, zone) {
  return zone.side === -1 ? priorClose > zone.hi + EPS : priorClose < zone.lo - EPS;
}

function midpointLimit(zone, tickSize) {
  const middle = (zone.lo + zone.hi) / 2;
  return zone.side === -1
    ? Math.floor((middle + EPS) / tickSize) * tickSize
    : Math.ceil((middle - EPS) / tickSize) * tickSize;
}

function intersects(bar, zone) {
  return bar.high >= zone.lo - EPS && bar.low <= zone.hi + EPS;
}

function openingGapContact(bar, prior, zone) {
  return !!prior && onCorrectSide(prior.close, zone)
    && (zone.side === -1 ? bar.open < zone.lo - EPS : bar.open > zone.hi + EPS);
}

function countRun(trades, predicate) {
  let longest = 0, current = 0;
  for (const trade of trades) {
    // Unknown outcomes interrupt evidence of a confirmed sequence.
    current = trade.status === 'closed' && predicate(trade) ? current + 1 : 0;
    longest = Math.max(longest, current);
  }
  return longest;
}

/**
 * frames[i] must contain only the visible state known at bars[i].openTime.
 * One midpoint order is selected before bar high/low: nearest proper-side fresh
 * visible zone; ties yellow, older formation, then stable key. The first band
 * contact is the sole attempt; an unfilled midpoint is not traded on a retest.
 */
export function studyEtherealTrades(bars, frames, options = {}) {
  const { session = 'ny', stopPoints = 20, breakEvenPoints = 60, targetPoints = 130,
    tickSize = 0.25, scoreDates, minimumFibSets = 2 } = options;
  if (session !== 'ny') throw new Error('This frozen trade baseline supports NY RTH only');
  if (![stopPoints, breakEvenPoints, targetPoints, tickSize].every(x => finite(x) && x > 0)
      || stopPoints > 20 || targetPoints <= breakEvenPoints || !Number.isInteger(minimumFibSets) || minimumFibSets < 1)
    throw new Error('Invalid trade risk/target configuration');
  for (const value of [stopPoints, breakEvenPoints, targetPoints])
    if (Math.abs(value / tickSize - Math.round(value / tickSize)) > EPS) throw new Error('Order distances must align with the NQ tick grid');
  if (!Array.isArray(bars) || !Array.isArray(frames) || bars.length !== frames.length)
    throw new Error('Trade candle/frame count mismatch');
  const dates = scoreDates == null ? null : new Set(scoreDates);
  if (dates && [...dates].some(date => typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)))
    throw new Error('scoreDates must contain ISO UTC dates');

  const trades = [], seen = new Set(), exclusions = {
    unavailableFrames: 0, staleOrMissingPriorMinuteBars: 0, firstBandContacts: 0,
    repeatedBandContacts: 0, previouslyTouchedInSourceContacts: 0,
    firstContactsOutsideScoreDates: 0, firstContactsOutsideNyRth: 0,
    firstContactsBeforeWarmup: 0, firstContactsWithoutContiguousPrior: 0,
    firstContactsWhileBusy: 0, firstContactsBlockedByAmbiguity: 0,
    firstContactsFromWrongSide: 0, firstContactsNotSelectedByPrebarPriority: 0,
    unfilledFirstContactAttempts: 0,
  };
  let active = null, blockedSession = null;
  let eligibleFlatBars = 0;

  function updateKnownExcursion(trade, points) {
    trade.confirmedMfeLowerBoundPoints = Math.max(trade.confirmedMfeLowerBoundPoints, points, 0);
    trade.confirmedMaeLowerBoundPoints = Math.max(trade.confirmedMaeLowerBoundPoints, -points, 0);
  }
  function fullHeldBar(trade, bar) {
    const favorable = trade.direction === 1 ? bar.high - trade.entry.price : trade.entry.price - bar.low;
    const adverse = trade.direction === 1 ? trade.entry.price - bar.low : bar.high - trade.entry.price;
    trade.confirmedMfeLowerBoundPoints = Math.max(trade.confirmedMfeLowerBoundPoints, favorable, 0);
    trade.confirmedMaeLowerBoundPoints = Math.max(trade.confirmedMaeLowerBoundPoints, adverse, 0);
  }
  function close(trade, bar, index, reason, price, atOpen = false) {
    const points = (price - trade.entry.price) * trade.direction;
    trade.status = 'closed';
    trade.exit = { reason, barIndex: index, barOpenTime: bar.openTime, barCloseTime: bar.closeTime,
      barOpenUtc: iso(bar.openTime), barCloseUtc: iso(bar.closeTime), price,
      timePrecision: atOpen ? 'modeled bar-open execution' : reason === 'session-close' ? 'bar close' : 'within minute; exact time unknown',
      observedOpenGap: atOpen && Math.abs(price - trade.stop.currentPrice) > EPS && reason !== 'take-profit' };
    trade.pointsGross = points;
    trade.plannedRiskExceeded = points < -stopPoints - EPS;
    updateKnownExcursion(trade, points);
    active = null;
  }
  function ambiguous(trade, bar, index, reason) {
    trade.status = 'ambiguous';
    trade.exit = { reason, barIndex: index, barOpenTime: bar.openTime, barCloseTime: bar.closeTime,
      barOpenUtc: iso(bar.openTime), barCloseUtc: iso(bar.closeTime), price: null,
      timePrecision: 'unresolved from 1m OHLC' };
    trade.pointsGross = null;
    trade.ambiguity = { reason, evidence: { open: bar.open, high: bar.high, low: bar.low, close: bar.close },
      policy: 'outcome excluded from resolved rate; block new entries for the remainder of this NY session' };
    blockedSession = trade.sessionDate;
    active = null;
  }
  function activateBe(trade, bar, index, atOpen = false) {
    trade.breakEven.activated = true;
    trade.breakEven.activationBarIndex = index;
    trade.breakEven.activationBarOpenUtc = iso(bar.openTime);
    trade.breakEven.activationTiming = atOpen ? 'known at modeled bar open' : 'within minute; exact time unknown';
    trade.stop.currentPrice = trade.entry.price;
  }
  function manage(trade, bar, index, entryCandle = false) {
    const gainAtOpen = (bar.open - trade.entry.price) * trade.direction;
    const adverseAtOpen = (bar.open - trade.stop.currentPrice) * trade.direction <= EPS;
    const targetAtOpen = gainAtOpen >= targetPoints - EPS;
    if (!entryCandle) {
      if (adverseAtOpen) {
        close(trade, bar, index, trade.breakEven.activated ? 'break-even-stop' : 'stop-loss', bar.open, true);
        return;
      }
      if (targetAtOpen) {
        if (!trade.breakEven.activated) activateBe(trade, bar, index, true);
        close(trade, bar, index, 'take-profit', trade.targetPrice, true);
        return;
      }
      if (!trade.breakEven.activated && gainAtOpen >= breakEvenPoints - EPS) activateBe(trade, bar, index, true);
    }
    const stopHit = trade.direction === 1 ? bar.low <= trade.stop.currentPrice + EPS : bar.high >= trade.stop.currentPrice - EPS;
    const targetHit = trade.direction === 1 ? bar.high >= trade.targetPrice - EPS : bar.low <= trade.targetPrice + EPS;
    const beTriggerHit = trade.direction === 1 ? bar.high >= trade.breakEven.triggerPrice - EPS : bar.low <= trade.breakEven.triggerPrice + EPS;
    const returnToEntry = trade.direction === 1 ? bar.low <= trade.entry.price + EPS : bar.high >= trade.entry.price - EPS;

    // From a proper-side resting limit, reaching the initial stop necessarily
    // crosses the entry first. A stop-only entry candle is therefore a known
    // loss. Favorable extrema can occur before the limit fills, so their order
    // remains unresolved without ticks; never exclude known stop-only losses.
    if (entryCandle && !trade.entry.atOpen && (targetHit || beTriggerHit)) {
      ambiguous(trade, bar, index, 'entry-minute-critical-threshold-order-unknown');
      return;
    }
    if (trade.breakEven.activated) {
      if (stopHit && targetHit) ambiguous(trade, bar, index, 'active-be-stop-and-target-same-minute');
      else if (stopHit) close(trade, bar, index, 'break-even-stop', trade.stop.currentPrice);
      else if (targetHit) close(trade, bar, index, 'take-profit', trade.targetPrice);
      else fullHeldBar(trade, bar);
    } else {
      if (stopHit && (targetHit || beTriggerHit)) ambiguous(trade, bar, index, 'initial-stop-and-favorable-threshold-same-minute');
      else if (beTriggerHit && returnToEntry) ambiguous(trade, bar, index, 'be-activation-and-return-to-entry-same-minute');
      else if (targetHit) {
        // A resolved target necessarily satisfies the lower BE threshold. Keep
        // the risk-state audit accurate even when both first occur this minute.
        activateBe(trade, bar, index);
        close(trade, bar, index, 'take-profit', trade.targetPrice);
      }
      else if (stopHit) close(trade, bar, index, 'stop-loss', trade.stop.currentPrice);
      else {
        if (beTriggerHit) activateBe(trade, bar, index);
        if (entryCandle && !trade.entry.atOpen) updateKnownExcursion(trade, (bar.close - trade.entry.price) * trade.direction);
        else fullHeldBar(trade, bar);
      }
    }
    if (active === trade && bar.closeTime === trade.sessionCloseTime)
      close(trade, bar, index, 'session-close', bar.close);
  }

  for (let index = 0; index < bars.length; index++) {
    const bar = bars[index], frame = frames[index], prior = bars[index - 1];
    if (!bar || ![bar.openTime, bar.closeTime, bar.open, bar.high, bar.low, bar.close].every(finite)
        || bar.closeTime !== bar.openTime + MINUTE || bar.low > Math.min(bar.open, bar.close) || bar.high < Math.max(bar.open, bar.close)
        || (prior && bar.openTime <= prior.openTime)) throw new Error(`Invalid trade candle at row ${index}`);
    if (!frame || frame.time !== bar.openTime) throw new Error(`Trade frame alignment failed at row ${index}`);
    if (frame.available && (!finite(frame.asOf) || frame.asOf > bar.openTime)) throw new Error(`Future/unclocked trade frame at row ${index}`);
    const sessionInfo = nySession(bar.openTime);
    const contiguous = !!prior && prior.closeTime === bar.openTime;
    const available = frame.available === true;
    const ready = available && frame.fibSets >= minimumFibSets;
    const inDates = withinDates(bar.openTime, dates);
    const wasBusy = active !== null;

    if (active && (!contiguous || bar.openTime >= active.sessionCloseTime)) {
      ambiguous(active, bar, index, !contiguous ? 'missing-candles-while-position-open' : 'missing-session-close-execution');
    } else if (active) {
      manage(active, bar, index);
    }

    if (!available) exclusions.unavailableFrames++;
    if (!contiguous) exclusions.staleOrMissingPriorMinuteBars++;
    const visible = (frame.zones ?? []).filter(zone => validZone(zone, bar, frame));
    const prebar = visible.map(zone => ({ zone,
      tested: seen.has(zone.key) || (finite(zone.touchedAt) && zone.touchedAt <= bar.openTime),
      correctSide: !!prior && onCorrectSide(prior.close, zone),
      limit: midpointLimit(zone, tickSize) }));
    const canPlace = available && ready && contiguous && sessionInfo.open && inDates && !wasBusy && blockedSession !== sessionInfo.date;
    let selected = null;
    if (canPlace) {
      eligibleFlatBars++;
      selected = prebar.filter(item => !item.tested && item.correctSide)
        .sort((a, b) => Math.abs(a.limit - prior.close) - Math.abs(b.limit - prior.close)
          || Number(b.zone.yellow) - Number(a.zone.yellow) || a.zone.start - b.zone.start || a.zone.key.localeCompare(b.zone.key))[0] ?? null;
    }

    for (const item of prebar) {
      const { zone } = item;
      const gapContact = openingGapContact(bar, prior, zone);
      if (!intersects(bar, zone) && !gapContact) continue;
      if (item.tested) {
        exclusions.repeatedBandContacts++;
        if (!seen.has(zone.key) && finite(zone.touchedAt) && zone.touchedAt <= bar.openTime) exclusions.previouslyTouchedInSourceContacts++;
        seen.add(zone.key);
        continue;
      }
      seen.add(zone.key);
      exclusions.firstBandContacts++;
      if (!inDates) { exclusions.firstContactsOutsideScoreDates++; continue; }
      if (!sessionInfo.open) { exclusions.firstContactsOutsideNyRth++; continue; }
      if (!ready) { exclusions.firstContactsBeforeWarmup++; continue; }
      if (!contiguous) { exclusions.firstContactsWithoutContiguousPrior++; continue; }
      if (wasBusy) { exclusions.firstContactsWhileBusy++; continue; }
      if (blockedSession === sessionInfo.date) { exclusions.firstContactsBlockedByAmbiguity++; continue; }
      if (!item.correctSide) { exclusions.firstContactsFromWrongSide++; continue; }
      if (item !== selected) { exclusions.firstContactsNotSelectedByPrebarPriority++; continue; }
      const atOpen = zone.side === -1 ? bar.open <= item.limit + EPS : bar.open >= item.limit - EPS;
      const filled = atOpen || (zone.side === -1 ? bar.low <= item.limit + EPS : bar.high >= item.limit - EPS);
      if (!filled) { exclusions.unfilledFirstContactAttempts++; continue; }
      const direction = zone.side === -1 ? 1 : -1;
      const price = atOpen ? bar.open : item.limit;
      const details = zone.yellow ? (zone.yellowText || zone.details || '') : (zone.sourceText || zone.details || '');
      const trade = {
        id: `trade-${String(trades.length + 1).padStart(5, '0')}`, status: 'open',
        zoneKey: zone.key, zoneLo: zone.lo, zoneHi: zone.hi, formationTime: zone.start, formationUtc: iso(zone.start),
        side: direction === 1 ? 'buy' : 'sell', symbol: direction === 1 ? 'β' : 'ρ', direction,
        gradeAtEntry: zone.yellow ? 'yellow' : 'green', contributorsAtEntry: details,
        confluences: details ? details.split(' | ') : [], maximumKindsObserved: zone.kinds ?? null,
        ageAtEntryMinutes: (bar.openTime - zone.start) / MINUTE,
        sessionDate: sessionInfo.date, sessionCloseTime: sessionInfo.closeTime,
        entry: { barIndex: index, barOpenTime: bar.openTime, barCloseTime: bar.closeTime,
          barOpenUtc: iso(bar.openTime), barCloseUtc: iso(bar.closeTime), limitPrice: item.limit, price, atOpen,
          timePrecision: atOpen ? 'modeled bar-open fill' : 'within minute; exact fill time unknown',
          openingPriceImprovementPoints: (item.limit - price) * direction,
          openingGapBeyondBand: gapContact,
          openingGapBeyondAnchorInvalidation: atOpen && (zone.side === -1 ? finite(zone.killLo) && bar.open <= zone.killLo : finite(zone.killHi) && bar.open >= zone.killHi),
          previousClose: prior.close },
        stop: { initialPrice: price - direction * stopPoints, currentPrice: price - direction * stopPoints, plannedPoints: stopPoints },
        targetPrice: price + direction * targetPoints,
        breakEven: { triggerPrice: price + direction * breakEvenPoints, activated: false, activationBarIndex: null },
        exit: null, pointsGross: null, plannedRiskExceeded: false, ambiguity: null,
        confirmedMfeLowerBoundPoints: 0, confirmedMaeLowerBoundPoints: 0,
        contactCandleEvidence: { open: bar.open, high: bar.high, low: bar.low, close: bar.close,
          penetrationBeyondBandPoints: direction === 1 ? Math.max(zone.lo - bar.low, 0) : Math.max(bar.high - zone.hi, 0),
          ordering: 'unsequenced OHLC; not an assumed fill path' },
        narrativeMechanical: `${zone.yellow ? 'Yellow' : 'Green'} ${direction === 1 ? 'support / buy-reversal' : 'resistance / sell-reversal'} area known before contact, formed from ${details || 'recorded source concepts'}; midpoint limit, planned ${stopPoints}-point risk, ${breakEvenPoints}-point BE trigger, ${targetPoints}-point target.`,
      };
      trades.push(trade);active = trade;
      manage(trade, bar, index, true);
    }
  }
  if (active) {
    active.status = 'incomplete';
    active.exit = { reason: 'position-open-at-data-end', price: null };
  }

  const resolved = trades.filter(trade => trade.status === 'closed');
  const ambiguousTrades = trades.filter(trade => trade.status === 'ambiguous');
  const incomplete = trades.filter(trade => trade.status === 'incomplete');
  const targets = resolved.filter(trade => trade.exit.reason === 'take-profit');
  const positive = resolved.filter(trade => trade.pointsGross > EPS);
  const initialStops = resolved.filter(trade => trade.exit.reason === 'stop-loss');
  const beStops = resolved.filter(trade => trade.exit.reason === 'break-even-stop');
  const sessionExits = resolved.filter(trade => trade.exit.reason === 'session-close');
  const unknown = ambiguousTrades.length + incomplete.length;
  const summary = {
    enteredTrades: trades.length, resolvedTrades: resolved.length, ambiguousTrades: ambiguousTrades.length, incompleteTrades: incomplete.length,
    targetWins: targets.length, initialStopExits: initialStops.length, breakEvenStopExits: beStops.length,
    positiveSessionExitsBelowTarget: sessionExits.filter(trade => trade.pointsGross > EPS).length,
    negativeSessionExits: sessionExits.filter(trade => trade.pointsGross < -EPS).length,
    flatSessionExits: sessionExits.filter(trade => Math.abs(trade.pointsGross) <= EPS).length,
    targetWinRateResolved: { numerator: targets.length, denominator: resolved.length, rate: ratio(targets.length, resolved.length) },
    positiveExitRateResolved: { numerator: positive.length, denominator: resolved.length, rate: ratio(positive.length, resolved.length) },
    targetWinRateBoundsAllEntered: { denominator: trades.length, unknownOutcomes: unknown,
      lower: ratio(targets.length, trades.length), upper: ratio(targets.length + unknown, trades.length),
      meaning: 'extreme outcome bounds for entered trades; not confidence intervals or a complete account path' },
    grossPointsOnResolvedTrades: resolved.reduce((sum, trade) => sum + trade.pointsGross, 0),
    meanGrossTargetWinPoints: targets.length ? targets.reduce((sum, trade) => sum + trade.pointsGross, 0) / targets.length : null,
    plannedRiskExceededByGapTrades: resolved.filter(trade => trade.plannedRiskExceeded).length,
    worstResolvedGrossPoints: resolved.length ? Math.min(...resolved.map(trade => trade.pointsGross)) : null,
    maximumConfirmedConsecutiveInitialStops: countRun(trades, trade => trade.exit.reason === 'stop-loss'),
    maximumConfirmedConsecutiveNegativeExits: countRun(trades, trade => trade.pointsGross < -EPS),
  };
  return {
    kind: 'Causal Ethereal NY midpoint-limit trade model; gross points, unresolved intrabar order explicitly ambiguous',
    configuration: { session, stopPoints, breakEvenPoints, targetPoints, tickSize, minimumFibSets,
      scoreDates: dates ? [...dates].sort() : null,
      entry: 'one pre-bar nearest correct-side fresh visible zone; midpoint rounded buy down/sell up to NQ tick; opening-price improvement modeled',
      priority: 'distance from previous close, yellow on ties, older formation, stable key',
      firstTouch: 'first band-contact candle only; unfilled midpoint consumes the first attempt; no retest trades',
      side: 'frozen beta support/buy or rho resistance/sell',
      positionLimit: 'one position; no same-minute re-entry after an exit',
      ambiguousPolicy: 'mark unresolved and block new entries for rest of that NY session',
      sessionExit: 'flatten at final NY RTH candle close; positive sub-target exits remain distinct from 130-point TP wins',
      stopExecution: 'stop crossing fills at level; observed opening gaps through stop fill at opening price and can exceed planned risk',
      costs: 'unspecified; no fees/slippage invented; results are gross points only',
      excursions: 'confirmed lower bounds only; unsequenced entry/exit-bar extrema are not claimed as exact held-trade MFE/MAE' },
    summary, trades, exclusions, diagnostics: { bars: bars.length, eligibleFlatBars, distinctSeenZoneKeys: seen.size },
  };
}
