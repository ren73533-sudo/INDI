import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Indicator, PineTS } from 'pinets';
import { buildEthereal } from '../tools/build-ethereal.mjs';
import { configuredSource } from '../tools/pine-inputs.mjs';
import { candle, MINUTE, DAY, SEPT23, OfflineProvider, state, run as runLegacy } from './helpers.mjs';

const source = readFileSync(new URL('../indicators/ethereal.pine', import.meta.url), 'utf8');
const displays = ['1', '5', '10', '15', '30', '60', '240'];
const short = () => [candle(SEPT23, 100), candle(SEPT23 + MINUTE, 100)];
const plot = (context, title) => context.plots[title].data.at(-1).value;
const records = context => state(context, 'zoneState').array;
const recordSummary = r => ({ start: r.start, finish: r.finish, lo: r.lo, hi: r.hi, kinds: r.kinds, yellow: r.yellow, live: r.live, lastSeen: r.lastSeen, side: r.side, anchors: r.anchors, killLo: r.killLo, killHi: r.killHi, yellowAt: r.yellowAt, touchedAt: r.touchedAt, sourceText: r.sourceText, yellowText: r.yellowText });
const caption = (record, yellow = record.yellow) => `${record.side === 1 ? 'ρ' : 'β'}  ${yellow ? record.yellowText : record.sourceText}`;
const boxes = context => context.plots.__boxes__?.data.at(-1).value ?? [];

async function run(bars, inputs = {}, extra = '', timeframe = '1', audit = false) {
  const last = bars.at(-1);
  const feed = [...bars, candle(last.closeTime, last.close, last.close, last.close, last.close, 0)];
  // Unmodified production code with default settings unless explicit calibration
  // is requested. Input literals only are configured for the PineTS limitation.
  let runtime = Object.keys(inputs).length ? configuredSource(source, inputs) : source;
  // The optional engine argument exports raw calculation collections for this
  // numerical audit only. Production exports compact view history instead.
  if (audit) runtime = runtime.replace('[f_engine()]', '[f_engine(true)]');
  runtime += extra;
  const context = await new PineTS(new OfflineProvider(feed), 'CME_MINI:NQ1!', timeframe, feed.length).run(new Indicator(runtime));
  assert.deepEqual(context.warnings, []);
  return context;
}

function fullStack() {
  // Fully synthetic. A prior bar before 22:00 establishes anchor coverage.
  const prior = candle(SEPT23 - DAY + (21 * 60 + 59) * MINUTE, 98, 98, 98.25, 97.75);
  const range = Array.from({ length: 450 }, (_, i) => {
    const price = i >= 195 && i < 200 ? 95 : i >= 395 && i < 400 ? 100 : 98;
    return candle(SEPT23 + i * MINUTE, price, price, price + 0.25, price - 0.25);
  });
  const groups = [[100, 101, 102, 99], [101, 102, 103, 100], [102, 103, 104, 101],
    [104, 105, 112, 103], [105, 102, 106, 101], [102, 102, 103, 101]];
  const rb = Array.from({ length: 30 }, (_, i) => candle(SEPT23 + (450 + i) * MINUTE, ...groups[Math.floor(i / 5)]));
  // VAH is known before this candle. A bearish close back inside upgrades the
  // existing four-family green stack, without recoloring its earlier history.
  rb[29] = candle(SEPT23 + 479 * MINUTE, 102, 99, 103, 98.75);
  return [prior, ...range, ...rb];
}

const yellowProbe = `
f_probe(bool reverseOrder, int omitted, string rbName, int reactionAge, float rejectedPrice) =>
    array<Level> candidates = array.new<Level>()
    if omitted != 1
        array.push(candidates, f_level(100, 100, 1, "+2.5", time, f_day(time), 1))
    if omitted != 2
        array.push(candidates, f_level(102, 102, 2, "VWAP +2 SD", time, f_day(time), 1))
    if omitted != 3
        array.push(candidates, f_level(101, 101, 3, "VAH ~", time, f_day(time), 1))
    if omitted != 4
        array.push(candidates, f_level(100, 105, 4, rbName, time, time, 1))
    if reverseOrder
        array.reverse(candidates)
    array<Poi> found = f_findPois(candidates, close)
    Reaction reaction = Reaction.new(f_day(time), time_close - reactionAge * 60000, rejectedPrice, na, na)
    array.size(found) > 0 ? f_yellow(array.get(found, 0), candidates, reaction, time_close) : false
plot(f_probe(false, 0, "RB 10m", 0, 101) ? 1 : 0, "full")
plot(f_probe(true, 0, "RB 10m", 0, 101) ? 1 : 0, "reversed")
plot(f_probe(false, 1, "RB 10m", 0, 101) ? 1 : 0, "without Fib")
plot(f_probe(false, 2, "RB 10m", 0, 101) ? 1 : 0, "without VWAP")
plot(f_probe(false, 3, "RB 10m", 0, 101) ? 1 : 0, "without VP")
plot(f_probe(false, 4, "RB 10m", 0, 101) ? 1 : 0, "without RB")
plot(f_probe(false, 0, "RB 5m", 0, 101) ? 1 : 0, "RB 5m")
plot(f_probe(false, 0, "RB 10m", 16, 101) ? 1 : 0, "stale reaction")
plot(f_probe(false, 0, "RB 10m", 0, 150) ? 1 : 0, "unrelated reaction")
`;

test('Japanese standalone build stays synchronized and contains only box rendering', () => {
  assert.equal(source, buildEthereal());
  assert.match(source, /^\/\/@version=6\n/);
  assert.match(source, /indicator\("幽玄", "幽玄"/);
  assert.doesNotMatch(source, /\b(?:line|label|table)\.new\s*\(|\bplot\s*\(|\bplotshape\s*\(|\balertcondition\s*\(|strategy\.(?:entry|order)/);
  assert.doesNotMatch(source, /chart\.(?:left|right)_visible_bar_time|xloc\.bar_index|extend\.right/);
  assert.doesNotMatch(source, /barstate\.islast/);
  new Indicator(source).prepare();
});

test('all six pairs of distinct types qualify, in either order; a single type does not', async () => {
  const probe = `
f_pair(int first, int second, bool reversed) =>
    array<Level> candidates = array.new<Level>()
    array.push(candidates, f_level(100, 100, first, "first", time, time, 1))
    array.push(candidates, f_level(105, 105, second, "second", time, time, 1))
    if reversed
        array.reverse(candidates)
    array.size(f_findPois(candidates, close))
${[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4],[1,1],[4,4]].flatMap(([a,b]) => [false,true].map(reverse => `plot(f_pair(${a}, ${b}, ${reverse}), "${a}:${b}:${reverse}")`)).join('\n')}
`;
  const result = await run(short(), {}, probe);
  for (const [a,b] of [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4],[1,1],[4,4]])
    for (const reversed of [false,true]) assert.equal(plot(result, `${a}:${b}:${reversed}`), a === b ? 0 : 1);
  const narrow = await run(short(), { 'Confluence tolerance (points)': 4 }, probe);
  assert.equal(plot(narrow, '1:2:false'), 0);
});

test('yellow needs all four types, a matching recent reaction and an RB at or above the chosen reference', async () => {
  const result = await run(short(), { 'Yellow RB reference timeframe': '10' }, yellowProbe);
  assert.equal(plot(result, 'full'), 1);
  assert.equal(plot(result, 'reversed'), 1, 'confluence order must not matter');
  for (const title of ['without Fib','without VWAP','without VP','without RB','RB 5m','stale reaction','unrelated reaction'])
    assert.equal(plot(result, title), 0, title);
  const relaxed = await run(short(), { 'Yellow requires a VAH / VAL reversal': false }, yellowProbe);
  assert.equal(plot(relaxed, 'stale reaction'), 1);
  assert.equal(plot(relaxed, 'without RB'), 0);
});

test('production defaults draw annotated green and yellow boxes with identical time/price anchors on every display', async () => {
  let baseline;
  for (const tf of displays) {
    const result = await run(fullStack(), {}, '', tf);
    const summary = records(result).map(recordSummary);
    assert.ok(summary.some(r => !r.yellow && r.kinds >= 2), `no green stack on ${tf}`);
    assert.ok(summary.some(r => r.yellow && r.kinds === 4), `no actual yellow full stack on ${tf}`);
    const visible = summary.filter(r => r.live);
    const asOf = state(result, 'snapshot').asOf;
    assert.equal(boxes(result).length, visible.reduce((count, r) => count + (r.yellow && r.yellowAt > r.start ? 2 : 1), 0));
    for (const record of visible) {
      const left = record.yellow ? record.yellowAt : record.start;
      const right = asOf + 240 * MINUTE;
      const box = boxes(result).find(b => b.left === left && b.right === right && b.bottom === record.lo && b.top === record.hi && b.border_color.toLowerCase() === (record.yellow ? '#f1c40f' : '#27ae60'));
      assert.ok(box, `record not drawn on ${tf}`);
      assert.equal(box.text, caption(record), tf);
      assert.ok(box.text.length > 0, tf);
      assert.equal(box.left, left);
      assert.equal(box.right, right);
      assert.ok(box.right - box.left >= 240 * MINUTE, 'resting zones must be long horizontal bands, not minute fragments');
      assert.equal(box.bottom, record.lo);
      assert.equal(box.top, record.hi);
      assert.equal(box.border_color.toLowerCase(), record.yellow ? '#f1c40f' : '#27ae60');
      assert.equal(box.extend, 'none');
    }
    const colors = boxes(result).map(box => box.border_color.toLowerCase());
    assert.ok(colors.lastIndexOf('#27ae60') < colors.indexOf('#f1c40f'), 'yellow boxes should be drawn above green');
    assert.equal(result.plots.__lines__?.data.at(-1).value.length ?? 0, 0);
    assert.equal(result.plots.__labels__?.data.at(-1).value.length ?? 0, 0);
    if (!baseline) baseline = summary;
    else assert.deepEqual(summary, baseline, `chart timeframe altered anchored history on ${tf}`);
  }
});

test('a later VAH rejection upgrades the same resting area without moving it or recoloring earlier green history', async () => {
  const feed = fullStack();
  const before = await run(feed.slice(0, -1));
  const after = await run(feed);
  assert.ok(records(before).some(r => r.live && r.kinds === 4 && !r.yellow));
  assert.ok(records(before).every(r => !r.yellow));
  const gold = records(after).find(r => r.yellow && records(before).some(b => !b.yellow && b.start === r.start && b.lo === r.lo && b.hi === r.hi));
  assert.ok(gold);
  assert.equal(gold.yellowAt, SEPT23 + 480 * MINUTE);
  assert.ok(gold.start < gold.yellowAt);
  assert.ok(boxes(after).some(b => b.left === gold.start && b.right === gold.yellowAt && b.bottom === gold.lo && b.top === gold.hi && b.border_color === '#27ae60'));
  assert.ok(boxes(after).some(b => b.left === gold.yellowAt && b.right > gold.yellowAt && b.bottom === gold.lo && b.top === gold.hi && b.border_color === '#f1c40f'));
});

test('zone height, padding, forward projection and both colors are configurable in point/time coordinates', async () => {
  const result = await run(fullStack(), {
    'Zone height (points)': 20, 'Box padding per side (points)': 2,
    'Right projection (minutes)': 45, 'Standard alignment color (green)': '#123456', 'Full qualification color (yellow)': '#abcdef',
    'Fill transparency (0 = opaque)': 50, 'Border width': 3,
  }, '', '240');
  assert.ok(records(result).some(r => r.yellow));
  for (const box of boxes(result)) {
    assert.equal(box.top - box.bottom, 24, 'fixed point height must be independent of confluence tolerance');
    assert.ok(box.right <= state(result, 'snapshot').asOf + 45 * MINUTE);
    assert.ok(['#123456','#abcdef'].includes(box.border_color.toLowerCase()));
    assert.equal(box.border_width, 3);
    assert.ok(box.text.length > 0);
  }
  assert.ok(boxes(result).some(b => b.right === state(result, 'snapshot').asOf + 45 * MINUTE));
});

test('new box presentation preserves the original Fib, VWAP, profile and RB calculations', async () => {
  const bars = fullStack();
  const current = state(await run(bars, {}, '', '1', true), 'snapshot');
  const previous = state(await runLegacy(bars, {}, '', '1', true), 'snapshot');
  for (const field of ['asOf','day','today0','today1','mean','m2','weight','profileVolume','baseRow'])
    assert.equal(current[field], previous[field], field);
  for (const family of ['fibs','vwapLevels','vpLevels','rbs']) {
    const summarize = level => ({ lo: level.lo, hi: level.hi, kind: level.kind, caption: level.caption, born: level.born, epoch: level.epoch, active: level.active, dead: level.dead });
    assert.deepEqual(current[family].array.map(summarize), previous[family].array.map(summarize), family);
  }
  assert.deepEqual(current.profile.array, previous.profile.array);
});

test('cover-span sizing can contain a wider confluence without changing which strategy levels qualify', async () => {
  const result = await run(fullStack(), { 'Zone sizing': 'Cover confluence span', 'Zone height (points)': 1 });
  assert.ok(records(result).some(r => r.live && r.hi - r.lo > 2), 'cover mode must be able to exceed the requested minimum');
  assert.ok(records(result).some(r => r.live && r.yellow && r.kinds === 4));
});

test('VAL reversal is symmetric to VAH and reaction memory resets at the UTC day boundary', async () => {
  const extra = `
var Reaction probeReaction = Reaction.new(na, na, na, na, na)
array<Level> edges = array.from(f_level(110, 110, 3, "VAH ~", time, f_day(time), 1), f_level(90, 90, 3, "VAL ~", time, f_day(time), -1))
f_updateReaction(probeReaction, edges, f_day(time))
`;
  const bars = [candle(SEPT23, 91, 89, 92, 88), candle(SEPT23 + MINUTE, 89, 91, 92, 88),
    candle(SEPT23 + 2 * MINUTE, 109, 111, 112, 109)];
  const result = state(await run(bars, {}, extra), 'probeReaction');
  assert.equal(result.lowerAt, SEPT23 + 2 * MINUTE);
  assert.equal(result.lowerPrice, 90);
  assert.ok(Number.isNaN(result.upperAt) || result.upperAt == null, 'a close outside VAH is not a reversal');
  const nextDay = state(await run([...bars, candle(SEPT23 + DAY, 100)], {}, extra), 'probeReaction');
  assert.equal(nextDay.day, SEPT23 + DAY);
  assert.ok(Number.isNaN(nextDay.lowerAt) || nextDay.lowerAt == null);
});

test('forming-minute moves cannot change boxes and later candles cannot move existing start/price anchors', async () => {
  const feed = fullStack(), now = feed.at(-1).closeTime;
  const observe = async bars => new PineTS(new OfflineProvider(bars), 'CME_MINI:NQ1!', '240', bars.length).run(new Indicator(source));
  const stable = await observe([...feed, candle(now, 99, 99, 99, 99, 0)]);
  const forming = await observe([...feed, candle(now, 99, 130, 140, 98)]);
  assert.deepEqual(records(forming).map(recordSummary), records(stable).map(recordSummary));
  const confirmed = await observe([...feed, candle(now, 99, 130, 140, 98), candle(now + MINUTE, 130)]);
  for (const old of records(stable))
    assert.ok(records(confirmed).some(record => record.start === old.start && record.lo === old.lo && record.hi === old.hi && record.yellow === old.yellow));
});

const restingProbe = `
var array<ZoneRecord> probeRecords = array.new<ZoneRecord>()
var Reaction probeMemory = Reaction.new(na, na, na, na, na)
array<Level> probeCandidates = array.new<Level>()
if bar_index < 5 or bar_index >= 32
    array.push(probeCandidates, f_level(100, 100, 1, "+2", time, f_day(time), 1))
    array.push(probeCandidates, f_level(101, 101, 2, "VWAP +2 SD", time, f_day(time), 1))
f_updateZones(probeRecords, probeCandidates, probeMemory, time_close, close)
`;

test('a resting zone survives lost alignment and a return tap, then dies on the configured wick breach without respawning', async () => {
  const feed = Array.from({ length: 31 }, (_, i) => candle(SEPT23 + i * MINUTE, 90));
  feed[20] = candle(SEPT23 + 20 * MINUTE, 99, 100, 102, 98);
  const result = await run(feed, { 'Right projection (minutes)': 15 }, restingProbe);
  const areas = state(result, 'probeRecords').array;
  assert.equal(areas.length, 1, 'no repeated boxes after alignment moves away');
  assert.equal(areas[0].start, SEPT23 + MINUTE);
  assert.equal(areas[0].live, true, 'a tap does not invalidate the resting area');
  assert.equal(areas[0].killHi, 115);
  const after = await run([...feed, candle(SEPT23 + 31 * MINUTE, 90, 90, 115, 89)], {}, restingProbe);
  const retired = state(after, 'probeRecords').array;
  assert.equal(retired.length, 1, 'reappearing same confluence must not resurrect its broken anchor');
  assert.equal(retired[0].live, false);
  assert.equal(retired[0].finish, SEPT23 + 32 * MINUTE, 'wick invalidation does not need a close beyond the zone');
});

test('moving VWAP / profile alignment creates one frozen area instead of a descending staircase', async () => {
  const feed = Array.from({ length: 40 }, (_, i) => candle(SEPT23 + i * MINUTE, 90));
  const extra = `
var array<ZoneRecord> probeRecords = array.new<ZoneRecord>()
var Reaction probeMemory = Reaction.new(na, na, na, na, na)
float edge = 100 + bar_index * 0.5
array<Level> probeCandidates = array.from(f_level(edge, edge, 3, "VAH ~", time, f_day(time), 1), f_level(edge + 1, edge + 1, 2, "VWAP +2 SD", time, f_day(time), 1))
f_updateZones(probeRecords, probeCandidates, probeMemory, time_close, close)
`;
  const result = await run(feed, {}, extra);
  const areas = state(result, 'probeRecords').array;
  assert.equal(areas.length, 1);
  assert.equal(areas[0].start, SEPT23 + MINUTE);
  assert.equal(areas[0].lo, 97);
  assert.equal(areas[0].hi, 103);
  assert.equal(areas[0].live, true);
});

test('nearby different static anchors share one resting band without enlarging its price bounds', async () => {
  const feed = Array.from({ length: 12 }, (_, i) => candle(SEPT23 + i * MINUTE, 90));
  const extra = `
var array<ZoneRecord> probeRecords = array.new<ZoneRecord>()
var Reaction probeMemory = Reaction.new(na, na, na, na, na)
float step = math.min(2, math.floor(bar_index / 4))
float price = 100 + step * 0.5
string name = step == 0 ? "+2" : step == 1 ? "+2.25" : "+2.5"
array<Level> probeCandidates = array.from(f_level(price, price, 1, name, time, f_day(time), 1), f_level(price + 1, price + 1, 2, "VWAP +2 SD", time, f_day(time), 1))
f_updateZones(probeRecords, probeCandidates, probeMemory, time_close, close)
`;
  const areas = state(await run(feed, {}, extra), 'probeRecords').array;
  assert.equal(areas.length, 1);
  assert.equal(areas[0].lo, 97);
  assert.equal(areas[0].hi, 103);
  assert.ok(areas[0].anchors.includes('+2.25') && areas[0].anchors.includes('+2.5'));
});

test('display limits select resting areas and invalidated areas are hidden unless explicitly requested', async () => {
  const feed = fullStack();
  const limited = await run(feed, { 'Maximum displayed active zones': 1 });
  assert.ok(records(limited).filter(r => r.live).length > 1, 'other resting areas should remain in engine storage');
  assert.equal(new Set(boxes(limited).map(b => `${b.bottom}:${b.top}`)).size, 1);
  const broken = [...feed, candle(feed.at(-1).closeTime, 99, 99, 200, 0)];
  const hidden = await run(broken);
  assert.ok(records(hidden).length > 0);
  assert.ok(records(hidden).every(r => !r.live));
  assert.equal(boxes(hidden).length, 0);
  const history = await run(broken, { 'Show invalidated / expired zones': true });
  assert.ok(boxes(history).length > 0);
  assert.ok(boxes(history).every(b => b.right <= state(history, 'snapshot').asOf));
});

function atBar(context, name, index) {
  for (const scope of [context.let, context.var]) {
    const key = Object.keys(scope).find(key => key.endsWith('_' + name));
    if (key) return scope[key].data[index];
  }
  throw new Error(`Missing historical state: ${name}`);
}

const replayProbe = `
plot(array.size(drawnBoxes), "replay count")
plot(not na(snapshot) ? snapshot.asOf : na, "replay clock")
plot(array.size(projectedBoxes) > 0 ? box.get_right(array.get(projectedBoxes, 0)) : na, "replay right")
`;

async function rawReplay(feed, timeframe = '1') {
  // A historical cursor ends at a completed chart bar, without the extra
  // observation minute used by other fixtures. Later data remains loaded in
  // the full run; a separate prefix run reproduces the cursor independently.
  const context = await new PineTS(new OfflineProvider(feed), 'CME_MINI:NQ1!', timeframe, feed.length).run(new Indicator(source + replayProbe));
  assert.deepEqual(context.warnings, []);
  return context;
}

test('historical replay cursors draw their own zones on all seven timeframes despite later invalidations', async () => {
  const past = fullStack();
  const future = Array.from({ length: 60 }, (_, i) => candle(SEPT23 + (480 + i) * MINUTE, 130, 130, 200, 0));
  const feed = [...past, ...future];
  for (const tf of displays) {
    const full = await rawReplay(feed, tf);
    const prefix = await rawReplay(past, tf);
    const frames = full.plots['replay count'].data;
    const cursor = frames.findIndex(frame => frame.time === SEPT23 + (480 - Number(tf)) * MINUTE);
    assert.ok(cursor >= 0 && cursor < frames.length - 1, `cursor must have future bars on ${tf}`);
    assert.ok(frames[cursor].value > 0, `historical zones missing on ${tf}`);
    assert.equal(frames[cursor].value, plot(prefix, 'replay count'), tf);
    assert.equal(full.plots['replay clock'].data[cursor].value, SEPT23 + 479 * MINUTE, tf);
    assert.equal(atBar(full, 'drawingSignature', cursor), state(prefix, 'drawingSignature'), `future data changed the earlier view on ${tf}`);
    const historical = atBar(full, 'snapshot', cursor);
    assert.equal(historical.zoneData, state(prefix, 'snapshot').zoneData, tf);
    assert.ok(!historical.profile?.array && !historical.fibs?.array, 'production replay must not copy raw calculation collections on every bar');
    assert.equal(plot(full, 'replay count'), 0, `later wick breach should remove the current zones on ${tf}`);
    assert.ok(plot(prefix, 'replay count') > 0, `earlier replay prefix should still show them on ${tf}`);
  }
});

test('compact replay transport round-trips 150 zones without copying anchor ledgers', async () => {
  const extra = `
array<ZoneRecord> originals = array.new<ZoneRecord>()
string ledger = "${'anchor-private:'.repeat(300)}"
for id = 0 to 149
    bool yellow = id % 2 == 0
    int stamp = time + id * 60000
    array.push(originals, ZoneRecord.new(stamp, stamp + 60000, 100 + id * 0.0625, 105 + id * 0.0625, yellow ? 4 : 2, yellow, true, time_close, 1, ledger, 85 + id * 0.0625, 120 + id * 0.0625, yellow ? stamp : na, stamp + 30000, "STDV | VWAP | VAH/VAL | RB 5m/10m/15m", yellow ? "STDV | VWAP | VAH/VAL | RB 5m/10m/15m" : ""))
string packed = f_packZones(originals)
array<ZoneRecord> restored = f_unpackZones(packed)
int errors = 0
for id = 0 to array.size(restored) - 1
    ZoneRecord a = array.get(originals, id)
    ZoneRecord b = array.get(restored, id)
    if a.start != b.start or a.finish != b.finish or a.lo != b.lo or a.hi != b.hi or a.kinds != b.kinds or a.yellow != b.yellow or a.live != b.live or a.side != b.side or a.killLo != b.killLo or a.killHi != b.killHi or a.touchedAt != b.touchedAt or a.sourceText != b.sourceText or a.yellowText != b.yellowText
        errors += 1
    if a.yellow and a.yellowAt != b.yellowAt
        errors += 1
plot(array.size(restored), "transport count")
plot(str.length(packed), "transport length")
plot(str.contains(packed, "anchor-private") ? 1 : 0, "transport ledger")
plot(errors, "transport errors")
`;
  const context = await run(short(), {}, extra);
  assert.equal(plot(context, 'transport count'), 150);
  assert.equal(plot(context, 'transport errors'), 0);
  assert.equal(plot(context, 'transport ledger'), 0);
  assert.ok(plot(context, 'transport length') < 40960);
});

test('quiet replay steps advance the right edge while keeping the cached zone history and start/price anchors unchanged', async () => {
  const feed = fullStack().filter(bar => bar.openTime < SEPT23 + 330 * MINUTE);
  const context = await rawReplay(feed);
  const frames = context.plots['replay clock'].data;
  let payload, view;
  for (const minute of [300, 305, 310, 315, 320]) {
    const index = frames.findIndex(frame => frame.time === SEPT23 + minute * MINUTE);
    assert.ok(context.plots['replay count'].data[index].value > 0);
    const snapshot = atBar(context, 'snapshot', index);
    const signature = atBar(context, 'drawingSignature', index);
    assert.equal(context.plots['replay right'].data[index].value, snapshot.asOf + 240 * MINUTE);
    if (payload === undefined) { payload = snapshot.zoneData; view = signature; }
    else {
      assert.equal(snapshot.zoneData, payload, 'quiet steps should reuse the compact zone data');
      assert.equal(signature, view, 'advancing replay must not move the resting price areas');
    }
  }
});

const sweepProbe = `
f_sweepCase(int side, float pointPrice, bool rbEnabled) =>
    array<Level> members = array.new<Level>()
    if rbEnabled
        array.push(members, f_level(side == 1 ? 100 : 95, side == 1 ? 105 : 100, 4, "RB 10m", time, f_day(time), side))
    else
        array.push(members, f_level(100, 100, 1, "+2.5", time, f_day(time), side))
    array.push(members, f_level(pointPrice, pointPrice, 2, "VWAP +2 SD", time, f_day(time), side))
    array<Poi> found = f_findPois(members, close)
    float result = na
    if array.size(found) > 0
        [anchor, price, valid] = f_zoneAnchor(array.get(found, 0), members)
        result := valid ? price : na
    result
plot(f_sweepCase(1, 110, true), "upper")
plot(f_sweepCase(-1, 90, true), "lower")
plot(f_sweepCase(1, 102, true), "inside")
plot(f_sweepCase(1, 121, true), "too far")
plot(f_sweepCase(1, 120, true), "invalidated price")
plot(f_sweepCase(1, 106, true), "small sweep")
plot(f_sweepCase(1, 101, false), "without RB")
`;

test('beyond-wick placement uses an aligned outside level, symmetrically, and rejects invented sweep prices', async () => {
  const original = await run(short(), {}, sweepProbe);
  assert.equal(plot(original, 'upper'), 105);
  assert.equal(plot(original, 'lower'), 95);
  const current = await run(short(), { 'RB zone placement': 'Beyond wick confluence' }, sweepProbe);
  assert.equal(plot(current, 'upper'), 110);
  assert.equal(plot(current, 'lower'), 90);
  assert.equal(plot(current, 'without RB'), 100, 'a valid non-RB pair must remain eligible');
  for (const title of ['inside', 'too far', 'invalidated price']) assert.ok(Number.isNaN(plot(current, title)), title);
  const minimum = await run(short(), { 'RB zone placement': 'Beyond wick confluence', 'Minimum distance beyond RB wick (points)': 2 }, sweepProbe);
  assert.ok(Number.isNaN(plot(minimum, 'small sweep')));
});

const sweepAreaProbe = `
var array<ZoneRecord> sweepRecords = array.new<ZoneRecord>()
var Reaction sweepMemory = Reaction.new(na, na, na, na, na)
array<Level> sweepMembers = array.from(f_level(100, 105, 4, "RB 10m", time, f_day(time), 1), f_level(110 + bar_index, 110 + bar_index, 2, "VWAP +2 SD", time, f_day(time), 1))
f_updateZones(sweepRecords, sweepMembers, sweepMemory, time_close, close)
`;

test('a beyond-wick resting band freezes the known outside price instead of drifting or covering the old wick', async () => {
  const feed = Array.from({ length: 4 }, (_, i) => candle(SEPT23 + i * MINUTE, 90));
  const settings = { 'RB zone placement': 'Beyond wick confluence' };
  for (const sizing of ['Fixed height', 'Cover confluence span']) {
    const result = await run(feed, { ...settings, 'Zone sizing': sizing }, sweepAreaProbe);
    const areas = state(result, 'sweepRecords').array;
    assert.equal(areas.length, 1);
    assert.equal(areas[0].lo, 107);
    assert.equal(areas[0].hi, 113);
    assert.equal(areas[0].start, SEPT23 + MINUTE);
    assert.equal(areas[0].killHi, 120, 'wick-based invalidation stays independently configured');
    assert.equal(areas[0].sourceText, 'VWAP | RB 10m');
  }
});

test('optional box text shows actual contributors, preserves green history and supports color, size and hiding', async () => {
  const result = await run(fullStack(), { 'Confluence text color': '#aabbcc', 'Confluence text size': 'Tiny' });
  for (const box of boxes(result)) {
    assert.ok(box.text.includes(' | '));
    assert.ok(!box.text.includes('OTE'));
    assert.equal(box.text_color.toLowerCase(), '#aabbcc');
    assert.equal(box.text_size, 'tiny');
  }
  const upgraded = records(result).find(record => record.yellow && record.yellowAt > record.start);
  assert.ok(upgraded);
  assert.ok(upgraded.yellowText.includes('STDV') && upgraded.yellowText.includes('VWAP') && /VAH|VAL/.test(upgraded.yellowText) && upgraded.yellowText.includes('RB '));
  const before = records(await run(fullStack().slice(0, -1))).find(record => record.start === upgraded.start && record.lo === upgraded.lo);
  assert.equal(upgraded.sourceText, before.sourceText);
  assert.ok(boxes(result).some(box => box.left === upgraded.start && box.right === upgraded.yellowAt && box.text === caption(before, false)));
  const hidden = await run(fullStack(), { 'Show confluence text': false, 'Show reversal side symbol (β / ρ)': false });
  assert.ok(boxes(hidden).length > 0);
  assert.ok(boxes(hidden).every(box => box.text === ''));
  assert.deepEqual(records(hidden).map(recordSummary), records(await run(fullStack())).map(recordSummary), 'text settings cannot change qualification');
});

test('first-return filtering hides a touched area only after the completed source minute and preserves the earlier replay view', async () => {
  const settings = { 'Hide zones after first return': true };
  const past = fullStack();
  const before = await run(past, settings);
  const target = records(before).find(record => record.live && (record.touchedAt == null || Number.isNaN(record.touchedAt)) && boxes(before).some(box => box.bottom === record.lo && box.top === record.hi));
  assert.ok(target, 'fixture must have an untouched visible resting zone');
  const price = (target.lo + target.hi) / 2;
  const last = past.at(-1);
  const touch = candle(last.closeTime, last.close, last.close, Math.max(last.close, price), Math.min(last.close, price));
  const runtime = configuredSource(source, settings);
  const forming = await new PineTS(new OfflineProvider([...past, touch]), 'CME_MINI:NQ1!', '1', past.length + 1).run(new Indicator(runtime));
  assert.ok(boxes(forming).some(box => box.bottom === target.lo && box.top === target.hi), 'forming touch cannot hide a known area');
  const after = await run([...past, touch], settings);
  const touched = records(after).find(record => record.start === target.start && record.lo === target.lo);
  assert.equal(touched.touchedAt, touch.closeTime);
  assert.ok(!boxes(after).some(box => box.left === target.start && box.bottom === target.lo && box.top === target.hi));
  const prefix = await run(past, settings);
  const geometry = box => Object.fromEntries(Object.entries(box).filter(([key]) => key !== 'id'));
  assert.deepEqual(boxes(prefix).map(geometry), boxes(before).map(geometry), 'later contact cannot change an earlier replay prefix');
  const probe = await run([candle(SEPT23, 100, 100, 102, 98)], settings, restingProbe);
  assert.equal(state(probe, 'probeRecords').array.length, 0, 'do not introduce a fresh zone after its creation candle already hit it');
});


test('beta and rho use the frozen buy/sell side and can be shown independently of confluence text', async () => {
  const extra = `
ZoneRecord buy = ZoneRecord.new(time, time_close, 90, 95, 2, false, true, time, -1, "", 75, 110, na, na, "STDV | RB 5m", "STDV | VWAP | VAL | RB 5m")
ZoneRecord sell = ZoneRecord.new(time, time_close, 105, 110, 2, false, true, time, 1, "", 90, 125, na, na, "VWAP | RB 10m", "STDV | VWAP | VAH | RB 10m")
string buyCaption = f_boxCaption(buy, false)
string sellCaption = f_boxCaption(sell, false)
string yellowCaption = f_boxCaption(buy, true)
`;
  const both = await run(short(), {}, extra);
  assert.equal(state(both, 'buyCaption'), 'β  STDV | RB 5m');
  assert.equal(state(both, 'sellCaption'), 'ρ  VWAP | RB 10m');
  assert.equal(state(both, 'yellowCaption'), 'β  STDV | VWAP | VAL | RB 5m');
  const symbols = await run(short(), { 'Show confluence text': false }, extra);
  assert.equal(state(symbols, 'buyCaption'), 'β');
  assert.equal(state(symbols, 'sellCaption'), 'ρ');
  const names = await run(short(), { 'Show reversal side symbol (β / ρ)': false }, extra);
  assert.equal(state(names, 'buyCaption'), 'STDV | RB 5m');
  assert.equal(state(names, 'sellCaption'), 'VWAP | RB 10m');
  const neither = await run(short(), { 'Show confluence text': false, 'Show reversal side symbol (β / ρ)': false }, extra);
  assert.equal(state(neither, 'buyCaption'), '');
  assert.equal(state(neither, 'sellCaption'), '');
});
