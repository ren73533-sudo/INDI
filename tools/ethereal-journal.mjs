import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const finite = Number.isFinite;
const number = value => finite(value) ? value.toFixed(2) : 'Unknown';
const signed = value => finite(value) ? `${value > 0 ? '+' : ''}${value.toFixed(2)}` : 'Unresolved';
const escape = value => String(value ?? 'Not recorded').replaceAll('|', '\\|').replaceAll('\n', ' ');
const yes = value => value ? 'Yes' : 'No';
const utc = value => finite(value) ? new Date(value).toISOString() : 'Not recorded';
const percent = value => finite(value) ? `${(value * 100).toFixed(2)}%` : 'Unavailable (no resolved denominator)';

function opinion(trade) {
  if (trade.status === 'ambiguous') return 'Unresolved: the minute candles cannot establish the required execution order. No win or loss is assigned. This observation cannot support a precision-entry claim.';
  if (trade.status !== 'closed') return 'Incomplete: the available data do not contain a confirmed exit. Exclude this position from resolved win rates and profit totals.';
  if (trade.exit?.reason === 'take-profit') return 'The frozen 130-point target was reached under this execution model. This isolated outcome does not establish an edge or repeatable tick precision.';
  if (trade.pointsGross < 0) return 'This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.';
  if (trade.pointsGross > 0) return 'The session exit retained a positive gross result below the reference target. Count it separately from a 130-point target win; it does not demonstrate the requested full move.';
  return 'The position exited flat in gross points. Commissions and execution costs could make the net result negative; this is not a target win.';
}

function renderTrade(trade) {
  if (!trade.entry || !trade.stop || !trade.breakEven) throw new Error(`Incomplete trade schema for ${trade.id ?? 'unknown trade'}`);
  const { entry, stop, breakEven: be, exit } = trade;
  const entryMinute = `${entry.barOpenUtc ?? utc(entry.barOpenTime)} to ${entry.barCloseUtc ?? utc(entry.barCloseTime)}`;
  const exitMinute = finite(exit?.barOpenTime)
    ? `${exit.barOpenUtc ?? utc(exit.barOpenTime)} to ${exit.barCloseUtc ?? utc(exit.barCloseTime)}` : 'No confirmed exit minute';
  const activation = be.activated
    ? `${be.activationBarOpenUtc ?? 'Not recorded'}; ${be.activationTiming ?? 'within minute; exact time unknown'}`
    : 'No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched';
  const contributors = trade.contributorsAtEntry || (trade.confluences ?? []).join(' | ') || 'Not recorded';
  const grade = trade.gradeAtEntry ?? 'unrecorded';
  const direction = trade.side === 'buy' ? 'support / buy reversal' : 'resistance / sell reversal';
  const narrative = `${grade[0].toUpperCase()}${grade.slice(1)} ${direction} zone ${number(trade.zoneLo)}–${number(trade.zoneHi)} was visible before this contact. Its frozen contributor labels were ${contributors}. The prior candle closed at ${number(entry.previousClose)}; a midpoint limit at ${number(entry.limitPrice)} was selected before the contact candle high and low were known. The modeled fill was ${number(entry.price)}, with ${number(stop.plannedPoints)} points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.`;
  const rows = [
    ['Status / exit reason', `${trade.status} / ${exit?.reason ?? 'No exit recorded'}`],
    ['Position', `${trade.side} ${trade.symbol ?? (trade.side === 'buy' ? 'β' : 'ρ')} (${grade} at entry)`],
    ['New York session date', trade.sessionDate],
    ['Entry UTC minute', entryMinute],
    ['Entry precision', entry.timePrecision],
    ['NQ modeled fill / limit', `${number(entry.price)} / ${number(entry.limitPrice)}`],
    ['Previous close / visible box', `${number(entry.previousClose)} / ${number(trade.zoneLo)}–${number(trade.zoneHi)}`],
    ['Initial stop', `${number(stop.initialPrice)}; ${number(stop.plannedPoints)} points from fill; placed with modeled entry (same timing precision)`],
    ['Reference take-profit', `${number(trade.targetPrice)}; active from modeled entry (same timing precision)`],
    ['Break-even trigger / stop', `${number(be.triggerPrice)} / ${number(entry.price)} (gross fill-price stop once activated)`],
    ['Break-even activation UTC', activation],
    ['Last confirmed stop state', number(stop.currentPrice)],
    ['Exit UTC minute', exitMinute],
    ['Exit precision / price', `${exit?.timePrecision ?? 'Unresolved or incomplete'} / ${number(exit?.price)}`],
    ['Realized gross points', signed(trade.pointsGross)],
    ['Zone formation UTC / age at entry', `${trade.formationUtc ?? utc(trade.formationTime)} / ${number(trade.ageAtEntryMinutes)} minutes (entry-minute approximation)`],
    ['Frozen contributor labels', contributors],
    ['Maximum historical family count', `${trade.maximumKindsObserved ?? 'Not recorded'}; not a current-at-entry alignment count`],
    ['Opening fill improvement', `${number(entry.openingPriceImprovementPoints)} points versus resting limit`],
    ['Opening gap beyond zone / anchor invalidation', `${yes(entry.openingGapBeyondBand)} / ${yes(entry.openingGapBeyondAnchorInvalidation)}`],
    ['Exit opening gap / planned risk exceeded', `${yes(exit?.observedOpenGap)} / ${yes(trade.plannedRiskExceeded)}`],
    ['Confirmed excursion lower bounds', `Favorable ${number(trade.confirmedMfeLowerBoundPoints)} / adverse ${number(trade.confirmedMaeLowerBoundPoints)} points; not exact held-trade MFE/MAE`],
    ['Zone identifier', trade.zoneKey],
  ];
  const parts = [`## ${escape(trade.id)} — ${escape(trade.side)} ${trade.symbol ?? (trade.side === 'buy' ? 'β' : 'ρ')}`, '',
    '| Detail | Recorded value |', '| --- | --- |', ...rows.map(([label, value]) => `| ${label} | ${escape(value)} |`), '',
    `**Setup narrative:** ${narrative}`, '', `**Opinion:** ${opinion(trade)}`, ''];
  if (trade.contactCandleEvidence) {
    const evidence = trade.contactCandleEvidence;
    parts.push(`**Contact candle evidence:** O ${number(evidence.open)}, H ${number(evidence.high)}, L ${number(evidence.low)}, C ${number(evidence.close)}. Penetration beyond the far box edge: ${number(evidence.penetrationBeyondBandPoints)} points. These extrema are unsequenced and are not an assumed fill path.`, '');
  }
  if (trade.ambiguity) {
    const evidence = trade.ambiguity.evidence ?? {};
    parts.push(`**Unresolved ordering:** ${trade.ambiguity.reason}. Evidence: O ${number(evidence.open)}, H ${number(evidence.high)}, L ${number(evidence.low)}, C ${number(evidence.close)}. ${trade.ambiguity.policy ?? 'No resolved outcome is assigned.'}`, '');
  }
  return parts.join('\n');
}

/** Write an auditable, English, Obsidian-compatible journal from the trade scorer. */
export async function writeEtherealJournal(tradeStudy, outputFile, { mode = 'unspecified' } = {}) {
  if (!tradeStudy || !Array.isArray(tradeStudy.trades) || !tradeStudy.configuration || !tradeStudy.summary)
    throw new Error('Expected the full studyEtherealTrades result with configuration, summary and trades');
  if (typeof outputFile !== 'string' || !outputFile) throw new Error('A journal output path is required');
  const { configuration: config, summary } = tradeStudy;
  const content = [
    '# Ethereal trade journal', '',
    `Fib mode: **${escape(mode)}**. Session: **NY RTH, 09:30–16:00 America/New_York**. Instrument prices are NQ index points.`, '',
    `Frozen reference model: midpoint resting limit, one position at a time, initial stop **${number(config.stopPoints)} points**, move stop to modeled fill after **+${number(config.breakEvenPoints)} points**, target **+${number(config.targetPoints)} points**, flatten at session close. First band contact is the sole attempt; a missed midpoint consumes it.`, '',
    'All results are gross points. Costs are unspecified. A planned 20-point stop cannot guarantee a 20-point realized maximum during a gap; observed breaches remain visible. One-minute OHLC cannot determine every intrabar path. Ambiguous trades block further entries for that NY session and remain outside resolved win rates.', '',
    'Contributor text is frozen at zone formation or its recorded yellow upgrade. It is carried into entry for attribution and does not prove every family was still aligned at contact. No news, macro trend or discretionary narrative is inferred from these labels.', '',
    '| Measure | Value |', '| --- | --- |',
    `| Entered / resolved / ambiguous / incomplete | ${summary.enteredTrades} / ${summary.resolvedTrades} / ${summary.ambiguousTrades} / ${summary.incompleteTrades} |`,
    `| 130-point target win rate among resolved trades | ${percent(summary.targetWinRateResolved?.rate)} (${summary.targetWinRateResolved?.numerator ?? 0}/${summary.targetWinRateResolved?.denominator ?? 0}) |`,
    `| Positive gross exit rate among resolved trades | ${percent(summary.positiveExitRateResolved?.rate)} (${summary.positiveExitRateResolved?.numerator ?? 0}/${summary.positiveExitRateResolved?.denominator ?? 0}) |`,
    `| Gross points on resolved trades | ${signed(summary.grossPointsOnResolvedTrades)} |`,
    `| Planned risk breaches | ${summary.plannedRiskExceededByGapTrades ?? 0} |`, '',
    'The two rates use resolved trades only. Unknown outcomes can materially change the result; this selected sample is not a complete simulated account path. Positive session exits below the reference target are distinct from target wins.', '',
    ...(tradeStudy.trades.length ? tradeStudy.trades.map(renderTrade) : ['No positions were entered under the frozen rules in this scored sample.', '']),
  ].join('\n');
  await mkdir(dirname(resolve(outputFile)), { recursive: true });
  await writeFile(outputFile, content, 'utf8');
  return { outputFile: resolve(outputFile), trades: tradeStudy.trades.length, bytes: Buffer.byteLength(content) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const [inputFile, outputFile, mode = 'unspecified'] = process.argv.slice(2);
  if (!inputFile || !outputFile) {
    console.error('Usage: node tools/ethereal-journal.mjs Trades.json "Trade journal.md" [mode]');
    process.exitCode = 1;
  } else {
    const tradeStudy = JSON.parse(await readFile(inputFile, 'utf8'));
    console.log(JSON.stringify(await writeEtherealJournal(tradeStudy, outputFile, { mode })));
  }
}
