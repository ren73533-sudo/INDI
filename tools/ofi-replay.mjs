import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { Indicator, PineTS } from 'pinets';
import { configuredSource } from './pine-inputs.mjs';
import { EtherealCsvProvider } from './ethereal-replay.mjs';

export const ofiPath = new URL('../indicators/ofi.pine', import.meta.url);
export const sha256 = value => createHash('sha256').update(value).digest('hex');

// Reuse the offline OHLCV transport, not Ethereal signal logic. Identity remains
// PUBLIC_TOPSTEPX:NQ; this provider never presents the archive as TradingView NQ1!.
export async function replayOfi(bars, inputs = {}) {
  if (!Array.isArray(bars) || bars.length < 2) throw new Error('OFI requires at least two bars');
  let previous = -Infinity;
  for (const [i, b] of bars.entries()) {
    if (!Number.isFinite(b.openTime) || b.openTime % 60000 || b.openTime <= previous || b.closeTime !== b.openTime + 60000 ||
      ![b.open, b.high, b.low, b.close, b.volume].every(Number.isFinite) || b.volume < 0 ||
      b.low > Math.min(b.open, b.close) || b.high < Math.max(b.open, b.close)) throw new Error(`Invalid OHLCV row ${i}`);
    previous = b.openTime;
  }
  const source = readFileSync(ofiPath, 'utf8');
  const definitions = new Indicator(source).getInputsMeta();
  const defaults = Object.fromEntries(definitions.map(item => [item.title, item.defval]));
  const configured = configuredSource(source, inputs);
  const runtime = new PineTS(new EtherealCsvProvider(bars), 'PUBLIC_TOPSTEPX:NQ', '1', bars.length);
  const context = await runtime.run(new Indicator(configured));
  if (context.warnings.length) throw new Error(JSON.stringify(context.warnings));
  if (context.idx + 1 !== bars.length) throw new Error('Pine replay did not execute every bar');
  const series = title => {
    const values = context.plots[title]?.data;
    if (values?.length !== bars.length) throw new Error(`Incomplete output: ${title}`);
    return values;
  };
  const names = ['direction', 'stop', 'setup', 'zone low', 'zone high', 'zone ID', 'profile ready', 'profile volume', 'zone count'];
  const outputs = Object.fromEntries(names.map(name => [name, series('OFI ' + name)]));
  const frames = bars.map((bar, i) => {
    const frame = { time: bar.openTime, availableAt: bar.closeTime };
    for (const name of names) {
      const point = outputs[name][i];
      if (point.time !== bar.openTime) throw new Error('Pine plot timestamp mismatch');
      frame[name] = Number.isFinite(point.value) ? point.value : null;
    }
    return Object.freeze(frame);
  });
  return { frames, sourceSha256: sha256(source), configuredSha256: sha256(configured), inputs: { ...defaults, ...inputs } };
}
