import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const between = (source, start, end) => {
  const a = source.indexOf(start), b = source.indexOf(end, a + start.length);
  if (a < 0 || b < 0) throw new Error(`Shared engine markers missing: ${start} / ${end}`);
  return source.slice(a, b);
};
const replaceOnce = (source, marker, value) => {
  if (source.split(marker).length !== 2) throw new Error(`Expected exactly one shared-engine marker: ${marker}`);
  return source.replace(marker, value);
};

export function buildEthereal() {
  const legacy = read('../indicators/nq_key_levels.pine');
  let types = between(legacy, 'type Level\n', 'f_font() =>');
  types = replaceOnce(types, 'type EngineState\n', `type ZoneRecord
    int start
    int finish
    float lo
    float hi
    int kinds
    bool yellow
    bool live
    int lastSeen
    int side
    string anchors
    float killLo
    float killHi
    int yellowAt
    int touchedAt = na
    string sourceText = ""
    string yellowText = ""

type Reaction
    int day
    int upperAt
    float upperPrice
    int lowerAt
    float lowerPrice

type EngineState
`);
  types = replaceOnce(types, '    int evictedRb\n', '    int evictedRb\n    array<ZoneRecord> zones\n    string zoneData\n');
  const calculations = between(legacy, 'int rangeStart =', 'f_engine() =>')
    .replace('V0.3: use standard', 'Use standard')
    .replace('// inside request.security(). Collections are exported only on the last source\n// bar, keeping historical request memory bounded. Scalars retain VWAP history.', '// inside request.security(). A compact immutable zone snapshot is available\n// on every source bar, including historical replay bars.');
  let clusters = between(legacy, 'f_countKinds(', '\nif barstate.islast');
  const details = between(clusters, '                string details = ""', '                array.push(zones, Poi.new');
  clusters = replaceOnce(clusters, details, '                string details = ""\n');
  let engine = between(legacy, 'f_engine() =>', '\n[snapshot, curveMean,');
  engine = replaceOnce(engine, 'f_engine() =>', 'f_engine(bool audit = false) =>');
  engine = replaceOnce(engine, between(engine, '    float closedMean = mean', '    bool exportSnapshot'), '');
  engine = replaceOnce(engine, '    var int asOf = na', '    var array<ZoneRecord> records = array.new<ZoneRecord>()\n    var Reaction reaction = Reaction.new(na, na, na, na, na)\n    var string zoneData = ""\n    var int asOf = na');
  engine = replaceOnce(engine, '    bool exportSnapshot = barstate.islast', '    bool exportSnapshot = true');
  for (const name of ['fibs', 'vwapLevels', 'vpLevels', 'rbs'])
    engine = replaceOnce(engine, `f_copyLevels(${name})`, `audit ? f_copyLevels(${name}) : na`);
  engine = replaceOnce(engine, 'array.copy(profile)', 'audit ? array.copy(profile) : na');
  engine = replaceOnce(engine, 'vpReady, evictedRb)', 'vpReady, evictedRb, audit ? f_copyZones(records) : na, zoneData)');
  engine = replaceOnce(engine, '    float rowSize =', '    f_updateReaction(reaction, vpLevels, utcDay)\n\n    float rowSize =');
  engine = replaceOnce(engine, '    asOf := time_close', `    array<Level> candidates = array.new<Level>()
    f_candidates(fibs, candidates, useFib)
    f_candidates(vwapLevels, candidates, useVwap and vwapReady)
    f_candidates(vpLevels, candidates, useVp and vpReady)
    f_candidates(rbs, candidates, useRb)
    bool changed = f_updateZones(records, candidates, reaction, time_close, close)
    if changed
        zoneData := f_packZones(records)
    asOf := time_close`);
  engine = replaceOnce(engine, '    [snapshot, closedMean, closedSd, closedComplete, closedAccumulating, closedEpoch, closed0, closed1, closedPublished, closedDay]', '    snapshot');
  return [read('./ethereal/inputs.pine'), types, calculations, clusters, read('./ethereal/zones.pine'), read('./ethereal/transport.pine'), engine, read('./ethereal/render.pine')].map(part => part.trimEnd()).join('\n\n') + '\n';
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const target = new URL('../indicators/ethereal.pine', import.meta.url);
  const source = buildEthereal();
  if (process.argv.includes('--check')) {
    if (readFileSync(target, 'utf8') !== source) throw new Error('Run node tools/build-ethereal.mjs to refresh the standalone indicator');
    console.log('Standalone Ethereal indicator matches its shared engine and templates.');
  } else {
    writeFileSync(target, source);
    console.log('Built indicators/ethereal.pine');
  }
}
