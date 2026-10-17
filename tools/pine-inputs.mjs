import { Indicator } from 'pinets';

// PineTS 0.11.1 does not pass runtime input overrides to a secondary security
// context (security.ts calls runPretranspiled(slice) without its inputs argument).
// In offline runs only, apply settings to the input DEFAULT LITERALS so every
// context receives identical configuration. Production Pine remains unchanged.
// No expressions, conditions, assertions or calculation bodies are rewritten.
export function configuredSource(source, inputs) {
  if (!inputs || typeof inputs !== 'object' || Array.isArray(inputs)) throw new Error('Indicator inputs must be a JSON object');
  const metadata = new Indicator(source).getInputsMeta();
  let result = source;
  for (const [title, value] of Object.entries(inputs)) {
    const setting = metadata.find(item => item.title === title);
    if (!setting) throw new Error(`Unknown indicator setting: ${title}`);
    if (setting.options && !setting.options.includes(value)) throw new Error(`Invalid option for ${title}`);
    if (setting.type === 'bool' && typeof value !== 'boolean') throw new Error(`Expected boolean for ${title}`);
    if (['int', 'float'].includes(setting.type) && (typeof value !== 'number' || !Number.isFinite(value)
        || (setting.type === 'int' && !Number.isInteger(value))
        || (setting.minval !== undefined && value < setting.minval)
        || (setting.maxval !== undefined && value > setting.maxval))) throw new Error(`Invalid numeric value for ${title}`);
    let literal = typeof value === 'string' ? JSON.stringify(value) : String(value);
    if (setting.type === 'color') {
      if (typeof value !== 'string' || !/^#[\da-f]{6}([\da-f]{2})?$/i.test(value)) throw new Error(`Expected hex color for ${title}`);
      literal = value;
    }
    const pattern = new RegExp(`(\\b${setting.varId}\\s*=\\s*input\\.\\w+\\()\\s*(?:"(?:\\\\.|[^"\\\\])*"|#[\\da-fA-F]{6,8}|true|false|-?\\d+(?:\\.\\d+)?)`);
    if (!pattern.test(result)) throw new Error(`Cannot configure input literal: ${title}`);
    result = result.replace(pattern, (_match, prefix) => prefix + literal);
  }
  return result;
}
