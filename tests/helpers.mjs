import { readFileSync } from 'node:fs';
import { Indicator, PineTS } from 'pinets';
import { configuredSource } from '../tools/pine-inputs.mjs';

export const source = readFileSync(new URL('../indicators/nq_key_levels.pine', import.meta.url), 'utf8');
export const DAY = 86_400_000;
export const MINUTE = 60_000;
export const SEPT23 = Date.UTC(2026, 8, 23);

export function candle(time, open, close = open, high = Math.max(open, close) + 1, low = Math.min(open, close) - 1, volume = 100) {
  return { openTime: time, closeTime: time + MINUTE, open, high, low, close, volume,
    quoteAssetVolume: 0, numberOfTrades: 1, takerBuyBaseAssetVolume: 0,
    takerBuyQuoteAssetVolume: 0, ignore: 0 };
}

// Synthetic OHLC, NOT downloaded NQ prices. The anchors reproduce the handoff's
// numerical test vector; exaggerated wicks prove the engine uses bodies.
export function handoffDay(day, bullish = true, minutes = 456) {
  const bars = [];
  for (let m = 0; m < minutes; m++) {
    let price = bullish ? 31040 : 30830;
    if (bullish && m >= 195 && m < 200) price = 30996.75;
    if (bullish && m >= 395 && m < 400) price = 31090.50;
    if (!bullish && m >= 60 && m < 65) price = 30900;
    if (!bullish && m >= 445 && m < 450) price = 30768.75;
    const wick = m < 450 && m % 11 === 0 ? 180 : 1;
    bars.push(candle(day + m * MINUTE, price, price, price + wick, price - wick));
  }
  return bars;
}

export function state(context, name) {
  for (const scope of [context.let, context.var]) {
    const key = Object.keys(scope).find(key => key.endsWith('_' + name));
    if (key) return scope[key].get(0);
  }
  throw new Error(`Missing state: ${name}`);
}

export const levels = (context, name) => state(context, name).array;

export class OfflineProvider {
  constructor(bars) { this.bars = bars; }
  configure() {}
  async getSymbolInfo() {
    return { tickerid: 'CME_MINI:NQ1!', ticker: 'NQ1!', root: 'NQ', prefix: 'CME_MINI',
      main_tickerid: 'CME_MINI:NQ1!', type: 'futures', timezone: 'America/Chicago',
      mintick: 0.25, minmove: 1, pricescale: 4, pointvalue: 20,
      session: '24x7', currency: 'USD', basecurrency: 'USD' };
  }
  async getMarketData(_ticker, timeframe, limit, start, end) {
    const duration = Number(timeframe) * MINUTE;
    const grouped = new Map();
    for (const bar of this.bars) {
      const time = Math.floor(bar.openTime / duration) * duration;
      const current = grouped.get(time);
      if (current) {
        current.high = Math.max(current.high, bar.high);
        current.low = Math.min(current.low, bar.low);
        current.close = bar.close;
        current.volume += bar.volume;
      } else grouped.set(time, { ...bar, openTime: time, closeTime: time + duration });
    }
    let data = [...grouped.values()];
    if (start !== undefined) data = data.filter(bar => bar.openTime >= start);
    if (end !== undefined) data = data.filter(bar => bar.openTime <= end);
    return limit ? data.slice(-limit) : data;
  }
}

export async function run(bars, inputs = {}, extra = '', chartTimeframe = '1', productionDefaults = false) {
  // v0.3 exports the state BEFORE the currently forming source minute. Add a
  // flat, zero-volume observation minute so the snapshot includes the final
  // fixture candle. No production code or calculation is patched in this test.
  const last = bars.at(-1);
  const observation = candle(last.closeTime, last.close, last.close, last.close, last.close, 0);
  const feed = [...bars, observation];
  const runtimeSource = (productionDefaults ? source : configuredSource(source, { 'Anchor': 'Daily UTC', ...inputs })) + extra;
  const indicator = new Indicator(runtimeSource);
  const provider = new OfflineProvider(feed);
  const engine = new PineTS(provider, 'CME_MINI:NQ1!', chartTimeframe, feed.length);
  const context = await engine.run(indicator);
  if (context.warnings.length) throw new Error(JSON.stringify(context.warnings));
  const chartBars = await provider.getMarketData('CME_MINI:NQ1!', chartTimeframe);
  if (context.idx + 1 !== chartBars.length) throw new Error('Not all fixture chart bars executed');
  return context;
}

export function closeTo(actual, expected, tolerance = 1e-7) {
  if (!Number.isFinite(actual) || Math.abs(actual - expected) > tolerance)
    throw new Error(`Expected ${expected} ± ${tolerance}; got ${actual}`);
}
