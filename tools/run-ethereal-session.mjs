import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { parseBars } from './poi-study.mjs';
import { planEtherealReplay, replayEthereal } from './ethereal-replay.mjs';
import { studyEthereal } from './ethereal-study.mjs';
import { studyEtherealTrades } from './ethereal-trades.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sessionRoot = resolve(root, 'research/obsidian/Ethereal/Runs/2026-10-27-S01');
const hash = value => createHash('sha256').update(value).digest('hex');
const json = value => JSON.stringify(value, null, 2) + '\n';
const iso = value => new Date(value).toISOString();
const percent = value => value == null ? 'n/a' : `${(100 * value).toFixed(1)}%`;
const nyClock = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York',
  year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
function inRth(time) {
  const p = Object.fromEntries(nyClock.formatToParts(time).map(part => [part.type, part.value]));
  const minute = +p.hour * 60 + +p.minute;
  return minute >= 570 && minute < 960;
}
export function csv(rows, fields) {
  const cell = value => '"' + (value == null ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value)).replaceAll('"', '""') + '"';
  return [fields.map(cell).join(','), ...rows.map(row => fields.map(field => cell(row[field])).join(','))].join('\n') + '\n';
}
function args(argv) {
  const values = {};
  for (let i = 0; i < argv.length; i += 2) {
    if (!argv[i].startsWith('--') || argv[i + 1] == null) throw new Error('Expected --option value pairs');
    const key = argv[i].slice(2);
    if (!['data', 'mode', 'end', 'dates', 'output'].includes(key)) throw new Error(`Unknown option: ${key}`);
    values[key] = argv[i + 1];
  }
  return values;
}

export function validateSessionScope(design, dates, endExclusive) {
  if (!Number.isFinite(endExclusive)) throw new Error('Invalid replay cutoff');
  if (!Array.isArray(design.validationDates) || !design.validationDates.length ||
    design.validationDates.some(date => !/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(`${date}T00:00:00Z`))))
    throw new Error('Invalid reserved validation date design');
  const holdoutStart = Math.min(...design.validationDates.map(date => Date.parse(`${date}T00:00:00Z`)));
  if (endExclusive > holdoutStart) throw new Error('Reserved validation data must not be replayed by this calibration runner');
  const allowed = new Set(design.calibrationCandidateDatesBeforeInitializationExclusions);
  if (!dates.length || dates.some(date => !allowed.has(date) || Date.parse(`${date}T00:00:00Z`) >= endExclusive))
    throw new Error('Score dates must belong to declared calibration dates before replay cutoff');
}

export async function runEtherealSession(options) {
  const mode = options.mode ?? 'range';
  if (!['range', 'midnight'].includes(mode)) throw new Error('Mode must be range or midnight');
  const dates = [...new Set((options.dates ?? '2026-01-22,2026-01-23').split(','))].sort();
  const end = options.end ?? '2026-01-24';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(end)) throw new Error('--end must be exclusive UTC YYYY-MM-DD');
  const endExclusive = Date.parse(`${end}T00:00:00Z`);
  const design = JSON.parse(readFileSync(resolve(root, 'research/obsidian/Ethereal/Evidence/study-design.json'), 'utf8'));
  validateSessionScope(design, dates, endExclusive);
  const dataPath = resolve(options.data ?? '/workspace/indi-data-work/NQ_1min_20260120_20260415_topstepx_utc.csv');
  const output = resolve(options.output ?? `/workspace/indi-data-work/sessions/S01/pilot-${mode}`);
  const sourceText = readFileSync(dataPath, 'utf8');
  const dataSha256 = hash(sourceText);
  if (dataSha256 !== design.dataSha256) throw new Error('Data identity differs from frozen session archive');
  const bars = parseBars(sourceText).filter(bar => bar.openTime < endExclusive);
  const inputs = JSON.parse(readFileSync(resolve(sessionRoot, `Settings-${mode}.json`), 'utf8'));
  const plan = planEtherealReplay(bars.length, inputs);
  if (plan.sourceSha256 !== design.sourceSha256) throw new Error('Indicator source differs from frozen baseline');
  const toolHashes = Object.fromEntries(['ethereal-replay.mjs', 'ethereal-study.mjs', 'ethereal-trades.mjs', 'run-ethereal-session.mjs']
    .map(name => [name, hash(readFileSync(resolve(root, 'tools', name)))]));
  const provenance = { mode, scoreDates: dates, endExclusiveUtc: iso(endExclusive), dataSha256,
    sliceSha256: hash(JSON.stringify(bars)), sliceHashEncoding: 'JSON.stringify(parsed chronological bars)',
    sourceSha256: plan.sourceSha256, toolHashes, continuousInitialization: true,
    firstInputUtc: iso(bars[0].openTime), lastInputUtc: iso(bars.at(-1).openTime), bars: bars.length,
    holdoutReplayed: false, startedUtc: new Date().toISOString(), history: plan.history };
  mkdirSync(output, { recursive: true });
  const save = (name, value) => writeFileSync(resolve(output, name), json(value));
  save('Progress.json', { status: 'replaying', ...provenance });
  save('Settings.json', plan.effectiveInputs);
  console.log(json({ status: 'replaying', ...provenance }));
  const started = performance.now();
  let replay;
  try { replay = await replayEthereal(bars, inputs); }
  catch (error) { save('Progress.json', { status: 'failed', ...provenance, error: String(error), elapsedSeconds: (performance.now() - started) / 1000 }); throw error; }
  const replaySeconds = (performance.now() - started) / 1000;
  save('Progress.json', { status: 'scoring', ...provenance, replaySeconds });
  const reactions = studyEthereal(bars, replay.frames, { session: 'ny', horizons: [5, 15, 30], threshold: 15, minimumFibSets: 2, scoreDates: dates });
  const trades = studyEtherealTrades(bars, replay.frames, { session: 'ny', stopPoints: 20, breakEvenPoints: 60, targetPoints: 130, minimumFibSets: 2, scoreDates: dates });
  const dayMap = new Map();
  for (let i = 0; i < bars.length; i++) {
    const bar = bars[i], frame = replay.frames[i], date = iso(bar.openTime).slice(0, 10);
    if (!dates.includes(date)) continue;
    if (!dayMap.has(date)) dayMap.set(date, { date, observedMinutes: 0, rthMinutes: 0, readyRthMinutes: 0,
      rthWithVisibleZone: 0, rthWithVisibleYellow: 0, rthWithRetainedYellow: 0,
      uniqueVisibleKeys: new Set(), uniqueRthKeys: new Set(), uniqueRthYellowKeys: new Set(), anchors: [], firstRthSnapshot: null });
    const day = dayMap.get(date), rth = inRth(bar.openTime);
    day.observedMinutes++;
    for (const zone of frame.zones) if (zone.live && zone.eligibleAtOpen) day.uniqueVisibleKeys.add(zone.key);
    const anchor = { today0: frame.today0, today1: frame.today1, publishedDay: frame.publishedDay };
    const previous = day.anchors.at(-1);
    if (frame.available && (!previous || JSON.stringify(anchor) !== JSON.stringify(previous.values)))
      day.anchors.push({ observedUtc: iso(bar.openTime), values: anchor, absoluteLegPoints: anchor.today0 != null && anchor.today1 != null ? Math.abs(anchor.today1 - anchor.today0) : null });
    if (!rth) continue;
    day.rthMinutes++;
    if (frame.available && frame.fibSets >= 2) day.readyRthMinutes++;
    const live = frame.zones.filter(zone => zone.live && zone.eligibleAtOpen);
    if (live.length) day.rthWithVisibleZone++;
    if (live.some(zone => zone.yellow)) day.rthWithVisibleYellow++;
    if (frame.retainedYellowLiveCount) day.rthWithRetainedYellow++;
    for (const zone of live) { day.uniqueRthKeys.add(zone.key); if (zone.yellow) day.uniqueRthYellowKeys.add(zone.key); }
    if (!day.firstRthSnapshot) day.firstRthSnapshot = { timeUtc: iso(bar.openTime), fibSets: frame.fibSets,
      today0: frame.today0, today1: frame.today1, publishedDay: frame.publishedDay, readiness: frame.readiness,
      visibleLive: live.length, retainedLive: frame.retainedLiveCount, retainedYellowLive: frame.retainedYellowLiveCount };
  }
  const days = [...dayMap.values()].map(day => ({ ...day, uniqueVisibleKeys: day.uniqueVisibleKeys.size,
    uniqueRthKeys: day.uniqueRthKeys.size, uniqueRthYellowKeys: day.uniqueRthYellowKeys.size,
    enteredTrades: trades.trades.filter(trade => dates.includes(trade.sessionDate) && trade.sessionDate === day.date).length,
    reactionEvents: reactions.eventDetails.filter(event => event.date === day.date).length }));
  const completedUtc = new Date().toISOString();
  const runtime = { replaySeconds, totalSeconds: (performance.now() - started) / 1000,
    peakRssMiB: process.resourceUsage().maxRSS / 1024, runtime: replay.runtime };
  save('Reactions.json', reactions); save('Trades.json', trades); save('Days.json', days);
  const summary = { status: 'complete', ...provenance, completedUtc, runtime, coverage: replay.coverage,
    identity: replay.identity, timing: replay.timing, effectiveInputs: replay.effectiveInputs,
    runtimeSourceSha256: replay.runtimeSourceSha256, reactionConfiguration: reactions.configuration,
    reactionSummary: reactions.summaries, reactionGroups: reactions.groups, reactionExclusions: reactions.exclusions,
    tradeConfiguration: trades.configuration, tradeSummary: trades.summary, tradeExclusions: trades.exclusions, days };
  save('Summary.json', summary);
  const rows = trades.trades.map(trade => ({ id: trade.id, sessionDate: trade.sessionDate, side: trade.side,
    grade: trade.gradeAtEntry, entryUtc: trade.entry.barOpenUtc, nqEntryPrice: trade.entry.price,
    limitPrice: trade.entry.limitPrice, initialStop: trade.stop.initialPrice, target: trade.targetPrice,
    breakEvenActivated: trade.breakEven.activated, exit: trade.exit, grossPoints: trade.pointsGross,
    status: trade.status, plannedRiskExceeded: trade.plannedRiskExceeded, zoneLo: trade.zoneLo, zoneHi: trade.zoneHi,
    zoneAgeMinutes: trade.ageAtEntryMinutes, confluences: trade.contributorsAtEntry, narrative: trade.narrativeMechanical,
    ambiguity: trade.ambiguity, opinion: trade.status !== 'closed' ? 'Outcome unresolved with one-minute OHLC; no invented winner.' :
      trade.exit.reason === 'take-profit' ? 'Reference target reached in this model; isolated outcome does not establish an edge.' :
      trade.exit.reason === 'stop-loss' ? 'The resting zone failed the declared trade risk model on this attempt.' :
      'Review the exact exit; do not classify as a 130-point target win.' }));
  const tradeFields = ['id', 'sessionDate', 'side', 'grade', 'entryUtc', 'nqEntryPrice', 'limitPrice', 'initialStop', 'target',
    'breakEvenActivated', 'exit', 'grossPoints', 'status', 'plannedRiskExceeded', 'zoneLo', 'zoneHi', 'zoneAgeMinutes', 'confluences', 'narrative', 'ambiguity', 'opinion'];
  writeFileSync(resolve(output, 'Trades.csv'), csv(rows, tradeFields));
  writeFileSync(resolve(output, 'Events.csv'), csv(reactions.eventDetails, ['id', 'contactBarOpenUtc', 'date', 'session', 'direction', 'zoneLo', 'zoneHi', 'grade', 'zoneAgeMinutes', 'contributingText', 'referenceClose', 'contactDiagnostics', 'outcomes']));
  const t = trades.summary;
  const table = rows.length ? '| Trade | Date UTC / entry minute | Side | NQ fill | Grade | Gross points | Status / exit |\n|---|---|---|---:|---|---:|---|\n' + rows.map(row => `| ${row.id} | ${row.entryUtc} | ${row.side} | ${row.nqEntryPrice} | ${row.grade} | ${row.grossPoints ?? 'unresolved'} | ${row.status} / ${row.exit?.reason ?? ''} |`).join('\n') : 'No trades entered under the declared model.';
  const report = `---\nproject: Ethereal\ntype: pilot-report\nstatus: complete\ncreated: 2026-10-27\n---\n\n# ${mode} — S01 calibration pilot\n\nScored UTC dates: ${dates.join(', ')}. Continuous replay: ${provenance.firstInputUtc} through ${provenance.lastInputUtc} (${bars.length} one-minute bars). Reserved validation data was not replayed.\n\n## Trade results\n\n- Entered: ${t.enteredTrades}; resolved: ${t.resolvedTrades}; ambiguous: ${t.ambiguousTrades}; incomplete: ${t.incompleteTrades}.\n- TP130: ${t.targetWins}; initial stops: ${t.initialStopExits}; break-even stops: ${t.breakEvenStopExits}.\n- TP130 rate among resolved trades: ${percent(t.targetWinRateResolved.rate)} (${t.targetWinRateResolved.numerator}/${t.targetWinRateResolved.denominator}). Positive-exit rate: ${percent(t.positiveExitRateResolved.rate)}.\n- Extreme TP rate bounds across entered trades: ${percent(t.targetWinRateBoundsAllEntered.lower)}–${percent(t.targetWinRateBoundsAllEntered.upper)}. These are outcome bounds, not confidence intervals or a complete account path.\n- Gross points on resolved trades: ${t.grossPointsOnResolvedTrades}; planned-risk violations due to stop gaps: ${t.plannedRiskExceededByGapTrades}.\n\n${table}\n\nThe exact entry prices, stops, targets, break-even state, exits, frozen contributor evidence, mechanical narrative and review opinion are in Trades.csv and Trades.json. Contributor text records formation/upgrade evidence; it does not prove ongoing alignment at entry. Stops are planned at 20 points; observed gaps are reported without falsely capping realized losses. No costs have been supplied, so all results are gross points. A zero-point exit is gross break-even only. Ambiguous paths block further entries that NY session.\n\n## Independent reaction benchmark\n\n${[5, 15, 30].map(horizon => { const s = reactions.summaries[horizon]; return `- ${horizon} minutes: ${s.completeEvents}/${s.totalEvents} complete events; favorable-first ${s.benchmarks['favorable-first']}, adverse-first ${s.benchmarks['adverse-first']}, ambiguous ${s.benchmarks.ambiguous}, neither ${s.benchmarks.neither}.`; }).join('\n')}\n\nThis is a separate ±15-point benchmark measured after the contact candle close; it is not the trade win rate. Overlapping zones and horizons are dependent observations.\n\n## Readiness and anchoring\n\n${days.map(day => `- ${day.date}: ${day.readyRthMinutes}/${day.rthMinutes} RTH minutes ready; ${day.uniqueRthKeys} distinct visible RTH zones; ${day.uniqueRthYellowKeys} distinct visible yellow RTH zones; visible yellow on ${day.rthWithVisibleYellow} minutes, retained yellow on ${day.rthWithRetainedYellow} minutes.`).join('\n')}\n\nDays.json preserves the observed anchors and leg size, readiness at RTH open, and visible versus retained zone counts. Visibility counts are not trade signals or independent samples.\n\n## Runtime and limits\n\nReplay: ${runtime.replaySeconds.toFixed(2)} seconds. Total replay/scoring: ${runtime.totalSeconds.toFixed(2)} seconds. Peak process RSS: ${runtime.peakRssMiB.toFixed(1)} MiB. Runtime: ${replay.runtime}. This does not certify compilation or execution in TradingView.\n\nThe public NQ archive claims TopstepX/ProjectX origin. Exact per-bar contracts, rollover and TradingView NQ1! equivalence remain unverified. The finite archive prefix cannot reconstruct earlier persistent zones. This small calibration pilot cannot establish a reliable win rate, a best timeframe or an optimal calibration. No settings were tuned from these outcomes. Summary.json records hashes, tool identities and effective settings; raw market data is not redistributed here.\n`;
  writeFileSync(resolve(output, 'Report.md'), report);
  save('Progress.json', { status: 'complete', ...provenance, completedUtc, runtime });
  console.log(json({ status: 'complete', output, runtime, tradeSummary: t, reactionEvents: reactions.events, days }));
  return summary;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runEtherealSession(args(process.argv.slice(2))).catch(error => { console.error(error); process.exitCode = 1; });
}
