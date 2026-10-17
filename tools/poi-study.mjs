import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { Indicator, PineTS } from 'pinets';

const MINUTE = 60_000;
const DAY = 86_400_000;
const sourcePath = new URL('../indicators/nq_key_levels.pine', import.meta.url);

function csvRows(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (quoted && text[i + 1] === '"') { field += '"'; i++; }
      else quoted = !quoted;
    } else if (!quoted && (ch === ',' || ch === '\n')) {
      row.push(field.replace(/\r$/, '')); field = '';
      if (ch === '\n') { if (row.some(x => x.trim())) rows.push(row); row = []; }
    } else field += ch;
  }
  if (quoted) throw new Error('Unclosed quoted CSV field');
  row.push(field.replace(/\r$/, ''));
  if (row.some(x => x.trim())) rows.push(row);
  return rows;
}

export function parseBars(text) {
  const rows = csvRows(text.replace(/^\uFEFF/, ''));
  if (rows.length < 3) throw new Error('CSV needs a header and at least two 1-minute candles');
  const header = rows.shift().map(x => x.trim().toLowerCase());
  const columns = ['time', 'open', 'high', 'low', 'close', 'volume'].map(name => {
    const index = header.indexOf(name);
    if (index < 0) throw new Error(`Missing CSV column: ${name}`);
    return index;
  });
  let previous = -Infinity;
  const bars = rows.map((row, index) => {
    const raw = row[columns[0]]?.trim();
    let openTime;
    if (/^\d+(\.\d+)?$/.test(raw ?? '')) {
      const epoch = Number(raw);
      openTime = epoch < 1e12 ? epoch * 1000 : epoch;
    } else {
      if (!raw || !/(Z|[+-]\d{2}:?\d{2})$/i.test(raw))
        throw new Error(`Row ${index + 2}: time must be Unix seconds/ms or ISO with an explicit timezone`);
      openTime = Date.parse(raw);
    }
    if (!Number.isFinite(openTime) || openTime % MINUTE !== 0 || openTime <= previous)
      throw new Error(`Row ${index + 2}: times must be minute-aligned, unique and increasing`);
    const values = columns.slice(1).map(column => row[column]?.trim());
    if (values.some(x => !x)) throw new Error(`Row ${index + 2}: blank OHLCV value`);
    const [open, high, low, close, volume] = values.map(Number);
    if (![open, high, low, close, volume].every(Number.isFinite) || volume < 0 || low > Math.min(open, close) || high < Math.max(open, close) || low > high)
      throw new Error(`Row ${index + 2}: invalid OHLCV`);
    previous = openTime;
    return { openTime, closeTime: openTime + MINUTE, open, high, low, close, volume,
      quoteAssetVolume: 0, numberOfTrades: 0, takerBuyBaseAssetVolume: 0,
      takerBuyQuoteAssetVolume: 0, ignore: 0 };
  });
  if (!bars.some((bar, index) => index > 0 && bar.openTime - bars[index - 1].openTime === MINUTE))
    throw new Error('No consecutive 1-minute candles found; check the export timeframe');
  return bars;
}

class NqCsvProvider {
  constructor(bars) { this.bars = bars; this.cache = new Map(); }
  configure() {}
  async getSymbolInfo() {
    return { tickerid: 'CME_MINI:NQ1!', ticker: 'NQ1!', root: 'NQ', prefix: 'CME_MINI',
      main_tickerid: 'CME_MINI:NQ1!', type: 'futures', timezone: 'America/Chicago',
      mintick: 0.25, minmove: 1, pricescale: 4, pointvalue: 20, session: '24x7', currency: 'USD', basecurrency: 'USD' };
  }
  async getMarketData(_ticker, timeframe, limit, start, end) {
    if (!this.cache.has(timeframe)) {
      const duration = Number(timeframe) * MINUTE;
      if (!Number.isFinite(duration) || duration <= 0) throw new Error(`Unsupported timeframe: ${timeframe}`);
      const groups = new Map();
      for (const bar of this.bars) {
        const time = Math.floor(bar.openTime / duration) * duration;
        const current = groups.get(time);
        if (!current) groups.set(time, { ...bar, openTime: time, closeTime: time + duration });
        else {
          current.high = Math.max(current.high, bar.high);
          current.low = Math.min(current.low, bar.low);
          current.close = bar.close;
          current.volume += bar.volume;
        }
      }
      this.cache.set(timeframe, [...groups.values()]);
    }
    let rows = this.cache.get(timeframe);
    if (start !== undefined) rows = rows.filter(b => b.openTime >= start);
    if (end !== undefined) rows = rows.filter(b => b.openTime <= end);
    return limit ? rows.slice(-limit) : rows;
  }
}

export async function replay(bars, inputs = {}) {
  if (!inputs || typeof inputs !== 'object' || Array.isArray(inputs)) throw new Error('Indicator inputs must be a JSON object');
  const original = readFileSync(sourcePath, 'utf8');
  // In-memory instrumentation only. The indicator itself is never rewritten.
  // 1) PineTS needs the same secondary-context chart-guard shim as unit tests.
  // 2) Compute each historical day's profile, as a replay would, instead of
  //    restricting it to last_bar_time. Calculation formulas remain unchanged.
  const guard = 'if barstate.isfirst\n';
  const profile = 'bool profileDay = utcDay == f_day(last_bar_time)';
  if (!original.includes(guard) || !original.includes(profile)) throw new Error('Indicator changed: review replay instrumentation before proceeding');
  const instrumented = original.replace(guard, 'if false\n').replace(profile, 'bool profileDay = true') + `
array<Level> auditCandidates = array.new<Level>()
int auditN = f_collect(fibs, auditCandidates, useFib, false, time_close, 0)
auditN := f_collect(vwapLevels, auditCandidates, useVwap and vwapReady, false, time_close, auditN)
auditN := f_collect(vpLevels, auditCandidates, useVp and vpReady, false, time_close, auditN)
auditN := f_collect(rbs, auditCandidates, useRb, false, time_close, auditN)
array<Poi> auditZones = f_findPois(auditCandidates)
array<string> auditKeys = array.new_string()
for auditZone in auditZones
    string auditKey = ""
    for auditId in auditZone.memberIds
        Level auditMember = array.get(auditCandidates, auditId)
        auditKey += str.tostring(auditMember.kind) + ":" + str.tostring(auditMember.epoch) + ":" + auditMember.caption + ";"
    array.push(auditKeys, auditKey)
int auditTime = time
int auditSets = array.size(fibEpochs)
`;
  const engine = new PineTS(new NqCsvProvider(bars), 'CME_MINI:NQ1!', '1', bars.length);
  const indicator = new Indicator(instrumented, {
    ...inputs, 'Show labels with prices': false, 'Show status panel': false,
    'Show individual Fib levels': false, 'Show VWAP references': false,
    'Show VAH / VAL / POC': false, 'Show rejection wick zones': false,
    'Show historical primary Fib traces': false,
  });
  const metadata = indicator.getInputsMeta();
  for (const [title, value] of Object.entries(inputs)) {
    const setting = metadata.find(item => item.title === title);
    if (!setting) throw new Error(`Unknown indicator setting: ${title}`);
    if (setting.options && !setting.options.includes(value)) throw new Error(`Invalid option for ${title}`);
    if (setting.type === 'bool' && typeof value !== 'boolean') throw new Error(`Expected boolean for ${title}`);
    if (['int', 'float'].includes(setting.type) && (typeof value !== 'number' || !Number.isFinite(value)
        || (setting.type === 'int' && !Number.isInteger(value))
        || (setting.minval !== undefined && value < setting.minval)
        || (setting.maxval !== undefined && value > setting.maxval))) throw new Error(`Invalid numeric value for ${title}`);
  }
  const context = await engine.run(indicator);
  if (context.warnings.length) throw new Error(`PineTS warnings: ${JSON.stringify(context.warnings)}`);
  if (context.idx + 1 !== bars.length) throw new Error('Replay did not execute every input candle');
  const series = name => {
    const key = Object.keys(context.let).find(k => k.endsWith('_' + name));
    if (!key) throw new Error(`Missing replay series: ${name}`);
    return context.let[key].data;
  };
  const times = series('auditTime'), zones = series('auditZones'), keys = series('auditKeys'), sets = series('auditSets');
  const frames = bars.map((bar, i) => {
    if (times[i] !== bar.openTime) throw new Error(`Replay frame alignment failed at row ${i}`);
    return { time: times[i], sets: sets[i], zones: zones[i].array.map((z, j) => ({
      lo: z.lo, hi: z.hi, kinds: z.kinds, members: z.members, key: keys[i].array[j], details: z.details,
    })) };
  });
  return { frames, sourceSha256: createHash('sha256').update(original).digest('hex') };
}

const nyClock = new Intl.DateTimeFormat('en-GB', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hourCycle: 'h23', weekday: 'short' });
export function inSession(time, session) {
  const parts = Object.fromEntries(nyClock.formatToParts(time).map(p => [p.type, p.value]));
  const minute = Number(parts.hour) * 60 + Number(parts.minute);
  const ny = !['Sat', 'Sun'].includes(parts.weekday) && minute >= 570 && minute < 960;
  const date = new Date(time), utcMinute = date.getUTCHours() * 60 + date.getUTCMinutes();
  const london = ![0, 6].includes(date.getUTCDay()) && utcMinute >= 450 && utcMinute < 810;
  return session === 'ny' ? ny : session === 'london' ? london : ny || london;
}

export function study(bars, frames, { session = 'ny', horizons = [5, 15, 30], threshold = 15 } = {}) {
  if (!['ny', 'london', 'both'].includes(session)) throw new Error('Session must be ny, london or both');
  if (!(threshold > 0) || !horizons.length || horizons.some(h => !Number.isInteger(h) || h <= 0)) throw new Error('Invalid horizon / threshold');
  if (frames.length !== bars.length) throw new Error('Candle / replay-frame count mismatch');
  const events = [], seen = new Set();
  let eligibleBars = 0;
  for (let i = 1; i < bars.length; i++) {
    const bar = bars[i], prior = bars[i - 1], frame = frames[i - 1];
    if (frame.time !== prior.openTime || prior.closeTime !== bar.openTime || frame.sets < 2 || !inSession(bar.openTime, session)) continue;
    eligibleBars++;
    for (const zone of frame.zones) {
      // Classify from the PREVIOUS close. The touch candle cannot create its
      // own signal. Already-straddled zones have no unambiguous approach side.
      const direction = prior.close > zone.hi ? 1 : prior.close < zone.lo ? -1 : 0;
      if (!direction || bar.high < zone.lo || bar.low > zone.hi) continue;
      const key = `${Math.floor(bar.openTime / DAY)}|${zone.key}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const event = { time: new Date(bar.closeTime).toISOString(), zoneLo: zone.lo, zoneHi: zone.hi,
        approach: direction === 1 ? 'from above / support' : 'from below / resistance',
        referenceClose: bar.close, kinds: zone.kinds, members: zone.members, details: zone.details, outcomes: {} };
      for (const horizon of horizons) {
        let complete = true, mfe = 0, mae = 0, outcome = 'neither', terminal = null;
        for (let step = 1; step <= horizon; step++) {
          const future = bars[i + step];
          if (!future || future.openTime !== bar.openTime + step * MINUTE) { complete = false; break; }
          const favorable = direction === 1 ? future.high - bar.close : bar.close - future.low;
          const adverse = direction === 1 ? bar.close - future.low : future.high - bar.close;
          mfe = Math.max(mfe, favorable); mae = Math.max(mae, adverse);
          if (outcome === 'neither') {
            if (favorable >= threshold && adverse >= threshold) outcome = 'ambiguous';
            else if (favorable >= threshold) outcome = 'favorable-first';
            else if (adverse >= threshold) outcome = 'adverse-first';
          }
          terminal = future.close;
        }
        event.outcomes[horizon] = complete ? { complete: true, favorableExcursion: mfe, adverseExcursion: mae,
          directionalCloseChange: (terminal - bar.close) * direction, benchmark: outcome } : { complete: false };
      }
      events.push(event);
    }
  }
  const average = values => values.length ? values.reduce((a, b) => a + b, 0) / values.length : null;
  const summaries = {};
  for (const horizon of horizons) {
    const valid = events.map(e => e.outcomes[horizon]).filter(o => o.complete);
    summaries[horizon] = { completeEvents: valid.length, incompleteEvents: events.length - valid.length,
      meanFavorableExcursion: average(valid.map(o => o.favorableExcursion)),
      meanAdverseExcursion: average(valid.map(o => o.adverseExcursion)),
      meanDirectionalCloseChange: average(valid.map(o => o.directionalCloseChange)),
      benchmarks: Object.fromEntries(['favorable-first', 'adverse-first', 'ambiguous', 'neither'].map(name => [name, valid.filter(o => o.benchmark === name).length])) };
  }
  return { kind: 'POI post-touch reaction study; not a trade or profitability backtest',
    configuration: { session, horizons, thresholdPoints: threshold, reference: 'touch candle close; observation begins on the following candle',
      deduplication: 'first touch per concept-membership group per UTC day', warmup: 'two published Fib sets required' },
    bars: bars.length, eligibleBars, events: events.length, summaries, eventDetails: events };
}

async function main() {
  const args = process.argv.slice(2);
  if (!args.length || args.includes('--help')) {
    console.log('Usage: npm run study -- NQ_1m.csv [--out /tmp/indi-study] [--session ny|london|both] [--threshold 15] [--inputs settings.json]');
    console.log('CSV columns: time,open,high,low,close,volume. Time: Unix seconds/ms or ISO with timezone. Include at least two complete UTC range windows before the evaluation period.');
    return;
  }
  const file = args.shift(), options = {};
  while (args.length) {
    const flag = args.shift(), value = args.shift();
    if (!['--out', '--session', '--threshold', '--inputs'].includes(flag) || !value) throw new Error(`Invalid option: ${flag}`);
    options[flag.slice(2)] = value;
  }
  const text = readFileSync(file, 'utf8'), bars = parseBars(text);
  if (bars.length > 100_000) throw new Error('Limit this replay to 100,000 candles or fewer; process longer datasets in windows with overlapping warmup history');
  const inputs = options.inputs ? JSON.parse(readFileSync(options.inputs, 'utf8')) : {};
  console.log(`Replaying ${bars.length} historical candles; no trading orders are simulated.`);
  const { frames, sourceSha256 } = await replay(bars, inputs);
  const report = study(bars, frames, { session: options.session ?? 'ny', threshold: options.threshold === undefined ? 15 : Number(options.threshold) });
  report.provenance = { dataFile: resolve(file), dataSha256: createHash('sha256').update(text).digest('hex'),
    indicatorSha256: sourceSha256, runtime: 'PineTS 0.11.1 (third-party; not TradingView)', inputs,
    firstBarUtc: new Date(bars[0].openTime).toISOString(), lastBarUtc: new Date(bars.at(-1).openTime).toISOString() };
  const output = resolve(options.out ?? '/tmp/indi-poi-study');
  mkdirSync(output, { recursive: true });
  writeFileSync(resolve(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  const { eventDetails, ...summary } = report;
  console.log(JSON.stringify(summary, null, 2));
  console.log(`Full report: ${resolve(output, 'report.json')}`);
  if (!report.events) console.log('No eligible touch events. Check data coverage, session, warmup and indicator settings. Zero events are not evidence of profitability.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href)
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
