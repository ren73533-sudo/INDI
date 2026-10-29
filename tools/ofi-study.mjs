import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseBars } from './poi-study.mjs';
import { replayOfi, sha256 } from './ofi-replay.mjs';

export const MODEL = Object.freeze({ tick: 0.25, pointValue: 20, commission: 4.5, slippageTicks: 1,
  minRisk: 2, maxRisk: 60, rewardRisk: 2, maxBars: 60 });
const clock = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit',
  day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23', weekday: 'short' });
export function session(time) {
  const p = Object.fromEntries(clock.formatToParts(time).map(x => [x.type, x.value]));
  const minute = +p.hour * 60 + +p.minute;
  return { date: `${p.year}-${p.month}-${p.day}`, minute,
    rth: !['Sat', 'Sun'].includes(p.weekday) && minute >= 570 && minute < 960 };
}
export function coverage(bars) {
  const days = new Map();
  for (let i = 0; i < bars.length; i++) {
    const s = session(bars[i].openTime);
    if (!s.rth) continue;
    if (!days.has(s.date)) days.set(s.date, []);
    days.get(s.date).push(i);
  }
  return [...days].map(([date, indices]) => ({ date, indices, minutes: indices.length,
    complete: indices.length === 390 && session(bars[indices[0]].openTime).minute === 570 &&
      session(bars[indices.at(-1)].openTime).minute === 959 &&
      indices.every((idx, j) => j === 0 || bars[idx].openTime === bars[indices[j - 1]].openTime + 60000) }));
}

export function exitOnBar(position, bar) {
  const { side, stop, target } = position;
  if (side * (bar.open - stop) <= 0) return { price: bar.open, reason: 'stop-gap', ambiguous: false };
  if (side * (bar.open - target) >= 0) return { price: target, reason: 'target-gap', ambiguous: false };
  const stopHit = side === 1 ? bar.low <= stop : bar.high >= stop;
  const targetHit = side === 1 ? bar.high >= target : bar.low <= target;
  if (stopHit) return { price: stop, reason: 'stop', ambiguous: targetHit, alternativePrice: targetHit ? target : null };
  if (targetHit) return { price: target, reason: 'target', ambiguous: false };
  return null;
}

export function simulate(bars, frames, model = MODEL) {
  if (frames.length !== bars.length) throw new Error('Candle/frame alignment mismatch');
  for (let i = 0; i < bars.length; i++) {
    if (frames[i].time !== bars[i].openTime || frames[i].availableAt !== bars[i].closeTime)
      throw new Error('Signal timestamp mismatch or future signal');
    if (![0, 1, -1].includes(frames[i].direction)) throw new Error('Invalid signal direction');
    if (frames[i].direction && (!Number.isFinite(frames[i].stop) || ![1, 2, 3].includes(frames[i].setup)))
      throw new Error('Signal lacks a finite stop or setup');
  }
  const days = coverage(bars), trades = [], events = [];
  const slippage = model.tick * model.slippageTicks;
  for (const day of days) {
    day.profileReady = frames[day.indices[0]]['profile ready'] === 1;
    day.eligible = day.complete && day.profileReady;
    day.exclusion = !day.complete ? 'incomplete-session' : !day.profileReady ? 'prior-profile-unavailable' : null;
    if (!day.eligible) {
      for (const i of day.indices) if (frames[i].direction) events.push({ date: day.date, time: bars[i].closeTime, outcome: day.exclusion });
      continue;
    }
    let position = null, pending = null;
    for (const i of day.indices) {
      const bar = bars[i], frame = frames[i], s = session(bar.openTime);
      if (pending) {
        if (bar.openTime !== pending.availableAt) throw new Error('Missing next entry candle');
        const entry = bar.open + pending.direction * slippage;
        const risk = pending.direction * (entry - pending.stop);
        if (risk >= model.minRisk && risk <= model.maxRisk && s.minute <= 930) {
          const rawTarget = entry + pending.direction * model.rewardRisk * risk;
          const target = (pending.direction === 1 ? Math.ceil(rawTarget / model.tick) : Math.floor(rawTarget / model.tick)) * model.tick;
          position = { date: day.date, side: pending.direction, setup: pending.setup, signalTime: pending.availableAt,
            entryTime: bar.openTime, entry, stop: pending.stop, target, risk, entryIndex: i, zoneId: pending['zone ID'] };
          events.push({ date: day.date, time: pending.availableAt, outcome: 'entered', risk, setup: pending.setup });
        } else events.push({ date: day.date, time: pending.availableAt, outcome: 'risk-or-time-filter', risk, setup: pending.setup });
        pending = null;
      }
      if (position) {
        let exit = exitOnBar(position, bar);
        if (!exit && (i - position.entryIndex + 1 >= model.maxBars || s.minute === 959))
          exit = { price: bar.close, reason: s.minute === 959 ? 'session-close' : 'time-exit', ambiguous: false };
        if (exit) {
          const fill = exit.price - position.side * slippage;
          const grossPoints = position.side * (fill - position.entry);
          const netUsd = grossPoints * model.pointValue - model.commission;
          const alternativeFill = (exit.alternativePrice ?? exit.price) - position.side * slippage;
          trades.push({ ...position, exitBarOpenTime: bar.openTime, exitObservedBy: bar.closeTime,
            exit: fill, reason: exit.reason, ambiguous: exit.ambiguous, grossPoints, netUsd,
            netR: netUsd / (position.risk * model.pointValue),
            alternativeNetUsd: position.side * (alternativeFill - position.entry) * model.pointValue - model.commission });
          position = null;
        }
      }
      if (frame.direction) {
        if (position) events.push({ date: day.date, time: bar.closeTime, outcome: 'position-already-open', setup: frame.setup });
        else if (s.minute < 930) pending = frame;
        else events.push({ date: day.date, time: bar.closeTime, outcome: 'entry-window-ended', setup: frame.setup });
      }
    }
    if (position || pending) throw new Error('Unresolved position or entry at session boundary');
  }
  return { trades, events, days: days.map(({ indices, ...d }) => d) };
}

export function summary(trades) {
  const n = trades.length, wins = trades.filter(t => t.netUsd > 0).length;
  const positive = trades.reduce((s, t) => s + Math.max(0, t.netUsd), 0);
  const negative = trades.reduce((s, t) => s + Math.max(0, -t.netUsd), 0);
  let equity = 0, peak = 0, drawdown = 0;
  for (const t of trades) { equity += t.netUsd; peak = Math.max(peak, equity); drawdown = Math.max(drawdown, peak - equity); }
  return { trades: n, wins, losses: trades.filter(t => t.netUsd < 0).length,
    breakeven: trades.filter(t => t.netUsd === 0).length, netWinRate: n ? wins / n : null,
    targetHitRate: n ? trades.filter(t => t.reason.startsWith('target')).length / n : null,
    ambiguousTrades: trades.filter(t => t.ambiguous).length, netUsd: equity,
    expectancyUsd: n ? equity / n : null, meanNetR: n ? trades.reduce((s, t) => s + t.netR, 0) / n : null,
    profitFactor: negative > 0 ? positive / negative : null, realizedMaxDrawdownUsd: drawdown,
    targetFirstSensitivity: { netUsd: trades.reduce((s, t) => s + t.alternativeNetUsd, 0),
      netWinRate: n ? trades.filter(t => t.alternativeNetUsd > 0).length / n : null } };
}

export function seededRandom(seed) {
  let a = seed >>> 0;
  return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
export function percentiles(values) {
  const a = values.filter(Number.isFinite).sort((x, y) => x - y);
  const q = p => { const x = (a.length - 1) * p, i = Math.floor(x); return a.length ? a[i] + (a[Math.ceil(x)] - a[i]) * (x - i) : null; };
  return { p025: q(.025), median: q(.5), p975: q(.975) };
}
export function monteCarlo(trades, dates, { paths = 10000, seed = 20261029, blockDays = 5 } = {}) {
  if (!Number.isInteger(paths) || paths < 1 || !Number.isInteger(blockDays) || blockDays < 1) throw new Error('Invalid simulation settings');
  if (new Set(dates).size !== dates.length || dates.some((x, i) => i && x <= dates[i - 1])) throw new Error('Dates must be unique and sorted');
  if (trades.some(t => !dates.includes(t.date))) throw new Error('Trade outside bootstrap dates');
  if (!trades.length || !dates.length) return { status: 'no-trades', paths: 0, days: dates.length };
  const byDay = dates.map(date => trades.filter(t => t.date === date));
  const random = seededRandom(seed), size = Math.min(blockDays, dates.length);
  const totals = [], drawdowns = [], winRates = [], counts = [];
  for (let path = 0; path < paths; path++) {
    let equity = 0, peak = 0, maxDD = 0, wins = 0, n = 0, sampled = 0;
    while (sampled < dates.length) {
      const start = Math.floor(random() * (dates.length - size + 1));
      for (let j = 0; j < size && sampled < dates.length; j++, sampled++) {
        for (const t of byDay[start + j]) {
          equity += t.netUsd; peak = Math.max(peak, equity); maxDD = Math.max(maxDD, peak - equity);
          wins += t.netUsd > 0 ? 1 : 0; n++;
        }
      }
    }
    totals.push(equity); drawdowns.push(maxDD); counts.push(n);
    if (n) winRates.push(wins / n);
  }
  return { status: 'completed', paths, seed, days: dates.length, blockDays: size,
    method: 'moving-day-block bootstrap, with replacement; fixed 1 NQ contract; realized trade-close drawdown',
    netWinRate: percentiles(winRates), netUsd: percentiles(totals), realizedMaxDrawdownUsd: percentiles(drawdowns),
    tradesPerPath: percentiles(counts), zeroTradePaths: paths - winRates.length,
    probabilityNetLoss: totals.filter(x => x < 0).length / paths,
    limitedSample: trades.length < 100 || dates.length < 60 };
}

function csv(records) {
  if (!records.length) return '';
  const keys = [...new Set(records.flatMap(Object.keys))];
  const escape = x => JSON.stringify(x == null ? '' : String(x));
  return keys.map(escape).join(',') + '\n' + records.map(row => keys.map(k => escape(row[k])).join(',')).join('\n') + '\n';
}
export async function runStudy({ data, out, publicArchive = false, sourceLabel, paths = 10000 }) {
  if (!data || !out) throw new Error('Usage: --data file.csv --out directory [--public-archive | --source-label label]');
  if (!publicArchive && !sourceLabel) throw new Error('Supply --source-label for your own export; its provenance is your declaration');
  if (existsSync(out)) throw new Error('Output directory already exists; use a fresh run directory');
  const protocol = JSON.parse(readFileSync(new URL('../research/ofi/v1/protocol.json', import.meta.url)));
  const raw = readFileSync(data), dataHash = sha256(raw);
  let text = raw.toString('utf8');
  if (publicArchive) {
    if (dataHash !== protocol.dataSha256) throw new Error('Public archive checksum mismatch');
    text = text.replace(/^datetime,/, 'time,').replace(/^(\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d),/gm, '$1Z,');
  }
  const bars = parseBars(text);
  mkdirSync(out, { recursive: true });
  const source = readFileSync(new URL('../indicators/ofi.pine', import.meta.url));
  const provenance = { runStartedAt: new Date().toISOString(), dataSha256: dataHash, sourceSha256: sha256(source),
    sourceLabel: publicArchive ? 'Public TopstepX/ProjectX NQ archive (provider claim)' : sourceLabel,
    tradingViewNQ1Equivalent: publicArchive ? 'unverified' : 'user-declared export, not independently authenticated',
    rows: bars.length, firstUtc: new Date(bars[0].openTime).toISOString(), lastUtc: new Date(bars.at(-1).openTime).toISOString(),
    runtime: 'PineTS 0.11.1; not native TradingView', protocol, model: MODEL };
  writeFileSync(resolve(out, 'manifest.json'), JSON.stringify(provenance, null, 2) + '\n');
  process.stdout.write(`Frozen source ${provenance.sourceSha256}; replaying ${bars.length} bars.\n`);
  const replay = await replayOfi(bars, protocol.settings);
  const study = simulate(bars, replay.frames);
  const signals = replay.frames.filter(f => f.direction);
  const reports = {};
  for (const split of ['development', 'holdout', 'all']) {
    const matches = date => split === 'all' || (split === 'holdout' ? date >= protocol.holdoutStart : date < protocol.holdoutStart);
    const dates = study.days.filter(d => d.eligible && matches(d.date)).map(d => d.date);
    const trades = study.trades.filter(t => matches(t.date));
    reports[split] = { days: dates.length, ...summary(trades), monteCarlo: monteCarlo(trades, dates, { paths }),
      bySetup: Object.fromEntries([[1, 'failedAuction'], [2, 'balancedVwap'], [3, 'both']].map(([id, name]) => [name, summary(trades.filter(t => t.setup === id))])) };
  }
  const report = { completedAt: new Date().toISOString(), ...provenance, effectiveInputs: replay.inputs,
    configuredSourceSha256: replay.configuredSha256, signals: signals.length, reports,
    eventCounts: Object.fromEntries([...new Set(study.events.map(e => e.outcome))].map(k => [k, study.events.filter(e => e.outcome === k).length])) };
  writeFileSync(resolve(out, 'results.json'), JSON.stringify(report, null, 2) + '\n');
  writeFileSync(resolve(out, 'trades.csv'), csv(study.trades));
  writeFileSync(resolve(out, 'signals.csv'), csv(signals));
  writeFileSync(resolve(out, 'events.csv'), csv(study.events));
  writeFileSync(resolve(out, 'coverage.json'), JSON.stringify(study.days, null, 2) + '\n');
  const fmt = (n, percent = false) => n === null ? 'n/a' : percent ? `${(n * 100).toFixed(1)}%` : n.toFixed(2);
  const table = Object.entries(reports).map(([k, r]) => `| ${k} | ${r.days} | ${r.trades} | ${fmt(r.netWinRate, true)} | ${fmt(r.netUsd)} | ${fmt(r.profitFactor)} | ${r.ambiguousTrades} |`).join('\n');
  const h = reports.holdout.monteCarlo;
  const mc = h.status === 'completed' ? `Holdout Monte Carlo: ${h.paths} paths, blocks of ${h.blockDays} trading days including zero-trade days. Net win-rate percentile interval ${fmt(h.netWinRate.p025, true)}–${fmt(h.netWinRate.p975, true)}; net USD interval ${fmt(h.netUsd.p025)} to ${fmt(h.netUsd.p975)}; realized max drawdown 97.5th percentile $${fmt(h.realizedMaxDrawdownUsd.p975)}; fraction of paths losing money ${fmt(h.probabilityNetLoss, true)}.` : 'Holdout Monte Carlo not estimated: no trades.';
  const fullMC = reports.all.monteCarlo;
  const fullText = fullMC.status === 'completed' ? `Full-sample exploratory Monte Carlo: ${fullMC.paths} paths over ${fullMC.days} eligible days from only ${reports.all.trades} observed trades. Net-win-rate 95% empirical interval ${fmt(fullMC.netWinRate.p025, true)}–${fmt(fullMC.netWinRate.p975, true)}, conditional on paths with trades (${fullMC.zeroTradePaths} zero-trade paths have undefined win rate). Net P&L 2.5th/median/97.5th percentiles: $${fmt(fullMC.netUsd.p025)} / $${fmt(fullMC.netUsd.median)} / $${fmt(fullMC.netUsd.p975)}. Fraction of paths losing money: ${fmt(fullMC.probabilityNetLoss, true)}. Realized drawdown 97.5th percentile: $${fmt(fullMC.realizedMaxDrawdownUsd.p975)}. These are conditional diagnostics from a small sample, not evidence of an edge.` : 'No full-sample Monte Carlo estimate: no trades.';
  writeFileSync(resolve(out, 'REPORT.md'), `# OFI v1 preliminary NQ study\n\nSource: ${provenance.sourceLabel}. TradingView NQ1! equivalence: ${provenance.tradingViewNQ1Equivalent}. Native Pine compilation is unverified.\n\nThe shelf revision was frozen before observing any trade outcomes. An initial cliff-only feasibility run produced zero signals and is preserved separately. The later split is exploratory chronological validation, not a pristine untouched holdout. No performance optimization followed. Full original history was replayed through the production Pine source.\n\n| Split | Eligible RTH days | Trades | Net win rate | Net USD | Profit factor | Ambiguous |\n|---|---:|---:|---:|---:|---:|---:|\n${table}\n\n${mc}\n\n${fullText}\n\nWin = net P&L > 0 for the stated 2R/stop/60-minute model, one NQ contract, $4.50 round-trip fees and 1 tick adverse slippage on each side. Two-boundary candles use stop-first; target-first sensitivity is in results.json. Drawdowns use closed-trade equity and exclude intratrade excursion. Bootstrap percentiles are conditional uncertainty estimates, not a forecast or additional observed trades. Complete days lacking a usable preceding profile are initialization exclusions, not zero-trade bootstrap days; see coverage.json.\n\nThe limited data window and undocumented historical contracts/rolls prevent a robust NQ1! performance claim. Holdout dates are now consumed for this OFI baseline; subsequent tuning needs new validation data. No DOM, true delta, GEX, TPO or five-day composite is modeled.\n\nSee manifest.json for frozen methodology and hashes, coverage.json for exclusions, signals.csv for actual Pine signals and trades.csv for the complete derived ledger. Raw market data is not redistributed.\n`);
  process.stdout.write(JSON.stringify({ out, reports }, null, 2) + '\n');
  return report;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const a = process.argv.slice(2), value = name => { const i = a.indexOf(name); return i >= 0 ? a[i + 1] : undefined; };
  try { await runStudy({ data: value('--data'), out: value('--out'), publicArchive: a.includes('--public-archive'),
    sourceLabel: value('--source-label'), paths: value('--paths') ? Number(value('--paths')) : 10000 }); }
  catch (error) { console.error(error.stack); process.exitCode = 1; }
}
