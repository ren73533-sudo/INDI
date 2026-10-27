import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { Indicator, PineTS } from 'pinets';
import { configuredSource } from './pine-inputs.mjs';

const MINUTE = 60_000;
const HISTORY_TITLE = 'Engine history (1-minute candles)';
const SOURCE_PATH = new URL('../indicators/ethereal.pine', import.meta.url);
const TICKER = 'PUBLIC_TOPSTEPX:NQ';

// The source archive's origin is a provider claim, not an authenticated exchange
// feed. In particular this provider must not impersonate TradingView NQ1!.
export const ETHEREAL_DATA_IDENTITY = Object.freeze({
  ticker: TICKER,
  instrument: 'NQ futures, public third-party OHLCV archive',
  declaredProvider: 'TopstepX / ProjectX (source repository claim)',
  tradingViewNQ1Equivalent: 'unverified',
  contractAndRollover: 'per-bar contracts, stitching and back-adjustment unverified',
  timezone: 'UTC timestamps; America/Chicago instrument metadata',
});

export class EtherealCsvProvider {
  constructor(bars) { this.bars = bars; this.cache = new Map(); }
  configure() {}
  async getSymbolInfo() {
    return { tickerid: TICKER, ticker: 'NQ', root: 'NQ', prefix: 'PUBLIC_TOPSTEPX',
      main_tickerid: TICKER, description: ETHEREAL_DATA_IDENTITY.instrument,
      type: 'futures', timezone: 'America/Chicago', mintick: 0.25,
      minmove: 1, pricescale: 4, pointvalue: 20, session: '24x7',
      currency: 'USD', basecurrency: 'USD' };
  }
  async getMarketData(ticker, timeframe, limit, start, end) {
    if (ticker !== TICKER) throw new Error(`Unexpected requested ticker: ${ticker}`);
    const duration = Number(timeframe) * MINUTE;
    if (!Number.isFinite(duration) || duration < MINUTE) throw new Error(`Unsupported timeframe: ${timeframe}`);
    if (!this.cache.has(timeframe)) {
      const groups = new Map();
      for (const bar of this.bars) {
        const time = Math.floor(bar.openTime / duration) * duration;
        const current = groups.get(time);
        if (current) {
          current.high = Math.max(current.high, bar.high);
          current.low = Math.min(current.low, bar.low);
          current.close = bar.close;
          current.volume += bar.volume;
        } else groups.set(time, { ...bar, openTime: time, closeTime: time + duration });
      }
      this.cache.set(timeframe, [...groups.values()]);
    }
    let rows = this.cache.get(timeframe);
    if (start !== undefined) rows = rows.filter(bar => bar.openTime >= start);
    if (end !== undefined) rows = rows.filter(bar => bar.openTime <= end);
    return limit ? rows.slice(-limit) : rows;
  }
}

function validateBars(bars) {
  if (!Array.isArray(bars) || bars.length < 2 || bars.length > 100_000)
    throw new Error('Ethereal replay needs 2–100,000 chronological 1-minute candles');
  let previous = -Infinity;
  for (const [index, bar] of bars.entries()) {
    if (!Number.isFinite(bar.openTime) || bar.openTime % MINUTE || bar.openTime <= previous || bar.closeTime !== bar.openTime + MINUTE)
      throw new Error(`Invalid 1-minute timestamp at row ${index}`);
    const { open, high, low, close, volume } = bar;
    if (![open, high, low, close, volume].every(Number.isFinite) || volume < 0 || low > Math.min(open, close) || high < Math.max(open, close) || low > high)
      throw new Error(`Invalid OHLCV at row ${index}`);
    previous = bar.openTime;
  }
}

function historicalSeries(context, name) {
  for (const scope of [context.let, context.var]) {
    const key = Object.keys(scope).find(key => key.endsWith('_' + name));
    if (key) return scope[key].data;
  }
  throw new Error(`Missing historical Ethereal series: ${name}`);
}

const nullableNumber = value => {
  const number = Number(value);
  return value == null || value === '' || !Number.isFinite(number) ? null : number;
};

function configuration(original, barsCount, inputs) {
  if (!Number.isInteger(barsCount) || barsCount < 2 || barsCount > 100_000)
    throw new Error('Ethereal replay needs 2–100,000 chronological 1-minute candles');
  if (!inputs || typeof inputs !== 'object' || Array.isArray(inputs)) throw new Error('Indicator inputs must be a JSON object');
  const definitions = new Indicator(original).getInputsMeta();
  const defaults = Object.fromEntries(definitions.map(item => [item.title, item.defval]));
  configuredSource(original, inputs);
  const requestedInputs = { ...defaults, ...inputs };
  const requestedHistory = requestedInputs[HISTORY_TITLE];
  const effectiveHistory = Math.max(requestedHistory, barsCount);
  const effectiveInputs = { ...requestedInputs, [HISTORY_TITLE]: effectiveHistory };
  return { requestedInputs, effectiveInputs,
    history: { requestedBars: requestedHistory, effectiveBars: effectiveHistory,
      policy: 'include every supplied historical candle; expand the requested study history explicitly when needed',
      overridden: effectiveHistory !== requestedHistory } };
}

// Allows the orchestrator to record the complete history/configuration plan
// before starting a potentially expensive replay.
export function planEtherealReplay(barsCount, inputs = {}) {
  const original = readFileSync(SOURCE_PATH, 'utf8');
  return { ...configuration(original, barsCount, inputs),
    sourceSha256: createHash('sha256').update(original).digest('hex') };
}

// Decode the production transport, not a second implementation of the strategy.
// This is the string the actual renderer uses to choose its objects. Frozen
// primitive records avoid historical references to mutable Pine arrays/UDTs.
export function decodeEtherealZones(packed) {
  if (typeof packed !== 'string' || packed === '') return Object.freeze([]);
  const records = packed.split('\n').filter(Boolean).map(row => {
    const f = row.split(';');
    if (f.length !== 14) throw new Error('Unsupported Ethereal compact transport schema');
    const start = nullableNumber(f[0]), finish = nullableNumber(f[1]);
    const lo = nullableNumber(f[2]), hi = nullableNumber(f[3]);
    const kinds = nullableNumber(f[4]), side = nullableNumber(f[7]);
    const killLo = nullableNumber(f[8]), killHi = nullableNumber(f[9]);
    const yellowAt = nullableNumber(f[10]), touchedAt = nullableNumber(f[11]);
    if (![start, finish, lo, hi, kinds, side, killLo, killHi].every(Number.isFinite) || lo > hi || ![-1, 1].includes(side) || !['0', '1'].includes(f[5]) || !['0', '1'].includes(f[6]))
      throw new Error('Invalid Ethereal compact zone record');
    const yellow = f[5] === '1';
    if (yellow && yellowAt === null) throw new Error('Yellow record has no qualification timestamp');
    return Object.freeze({ key: `${start}|${lo}|${hi}|${side}`, start, finish,
      lo, hi, kinds, side, yellow, grade: yellow ? 'yellow' : 'green',
      live: f[6] === '1', killLo, killHi, yellowAt, touchedAt,
      sourceText: f[12], yellowText: f[13] });
  });
  return Object.freeze(records);
}

/**
 * Frames[i] is state available at bars[i].openTime, BEFORE that candle is read
 * into the strategy. Do not shift to frames[i-1]: that adds an unnecessary minute
 * of lag. No observation candle or raw calculation-array export is added.
 */
export async function replayEthereal(bars, inputs = {}) {
  validateBars(bars);
  const original = readFileSync(SOURCE_PATH, 'utf8');
  const { requestedInputs, effectiveInputs, history } = configuration(original, bars.length, inputs);
  const runtimeSource = configuredSource(original, effectiveInputs);
  const context = await new PineTS(new EtherealCsvProvider(bars), TICKER, '1', bars.length).run(new Indicator(runtimeSource));
  if (context.warnings.length) throw new Error(`PineTS warnings: ${JSON.stringify(context.warnings)}`);
  if (context.idx + 1 !== bars.length) throw new Error('Ethereal replay did not execute every input candle');
  const snapshots = historicalSeries(context, 'snapshot');
  const views = historicalSeries(context, 'drawingSignature');
  // Historical frames already own their frozen visible records. Keep only the
  // most recent decoded transport in each path: retaining every distinct packed
  // state would duplicate up to 150 retained records per changed source minute.
  // This changes no Pine state or historical frame; a revisited signature is
  // simply decoded again with the same immutable values.
  const lastDecodedState = () => {
    let previousPacked, previousRecords;
    return packed => {
      if (packed !== previousPacked || previousRecords === undefined) {
        previousPacked = packed;
        previousRecords = decodeEtherealZones(packed);
      }
      return previousRecords;
    };
  };
  const retainedState = lastDecodedState(), visibleState = lastDecodedState();
  const frames = bars.map((bar, index) => {
    const snapshot = snapshots[index];
    if (!snapshot || !Number.isFinite(snapshot.asOf)) {
      if (index !== 0) throw new Error(`Unexpected unavailable source frame at row ${index}`);
      return Object.freeze({ time: bar.openTime, asOf: null, available: false,
        fibSets: 0, referencePrice: null, zones: Object.freeze([]), retainedCount: 0,
        today0: null, today1: null, publishedDay: null,
        retainedLiveCount: 0, retainedYellowLiveCount: 0, visibleYellowLiveCount: 0,
        readiness: null });
    }
    if (snapshot.asOf > bar.openTime || snapshot.asOf !== bars[index - 1].closeTime)
      throw new Error(`Pre-contact source alignment failed at row ${index}`);
    const retained = retainedState(snapshot.zoneData);
    const visible = visibleState(views[index]);
    const zones = visible.map(record => {
      if (record.start > snapshot.asOf || (record.yellow && record.yellowAt > snapshot.asOf) || (record.touchedAt !== null && record.touchedAt > snapshot.asOf))
        throw new Error(`Future zone state leaked into row ${index}`);
      const right = record.live ? snapshot.asOf + effectiveInputs['Right projection (minutes)'] * MINUTE : record.finish;
      const segmentStart = record.yellow ? record.yellowAt : record.start;
      const sources = record.yellow ? record.yellowText : record.sourceText;
      const symbol = effectiveInputs['Show reversal side symbol (β / ρ)'] ? (record.side === 1 ? 'ρ' : 'β') : '';
      const text = symbol + (effectiveInputs['Show confluence text'] && sources ? (symbol ? '  ' : '') + sources : '');
      return Object.freeze({ ...record, right, segmentStart,
        eligibleAtOpen: record.live && segmentStart <= bar.openTime && right >= bar.openTime,
        text, details: sources });
    });
    return Object.freeze({ time: bar.openTime, asOf: snapshot.asOf, available: true,
      fibSets: snapshot.fibSets, referencePrice: snapshot.referencePrice,
      today0: nullableNumber(snapshot.today0), today1: nullableNumber(snapshot.today1),
      publishedDay: nullableNumber(snapshot.publishedDay),
      sourceAgeMinutes: (bar.openTime - snapshot.asOf) / MINUTE,
      zones: Object.freeze(zones), retainedCount: retained.length,
      retainedLiveCount: retained.filter(zone => zone.live).length,
      retainedYellowLiveCount: retained.filter(zone => zone.live && zone.yellow).length,
      visibleYellowLiveCount: zones.filter(zone => zone.live && zone.yellow).length,
      readiness: Object.freeze({ vwapReady: snapshot.vwapReady, vpReady: snapshot.vpReady,
        vwapComplete: snapshot.vwapComplete, vpComplete: snapshot.vpComplete,
        vpOverflow: snapshot.vpOverflow, rbEvictions: snapshot.evictedRb }) });
  });
  return {
    frames, sourceSha256: createHash('sha256').update(original).digest('hex'),
    runtimeSourceSha256: createHash('sha256').update(runtimeSource).digest('hex'),
    requestedInputs, effectiveInputs, inputs: effectiveInputs,
    history,
    coverage: { bars: bars.length, availableFrames: frames.filter(frame => frame.available).length,
      firstInputUtc: new Date(bars[0].openTime).toISOString(),
      lastInputUtc: new Date(bars.at(-1).openTime).toISOString(),
      firstAvailableUtc: new Date(frames.find(frame => frame.available).time).toISOString() },
    identity: ETHEREAL_DATA_IDENTITY,
    timing: 'frames[i] is pre-contact state at bars[i].openTime; snapshot excludes bars[i]',
    zoneKindsMeaning: 'maximum distinct types previously seen on the resting record; formation/upgrade text is frozen separately',
    runtime: 'PineTS 0.11.1; third-party runtime, not TradingView',
  };
}
