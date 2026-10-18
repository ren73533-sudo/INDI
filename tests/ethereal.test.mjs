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
const records = context => state(context, 'snapshot').zones.array;
const recordSummary = r => ({ start: r.start, finish: r.finish, lo: r.lo, hi: r.hi, kinds: r.kinds, yellow: r.yellow, live: r.live, lastSeen: r.lastSeen });
const boxes = context => context.plots.__boxes__?.data.at(-1).value ?? [];

async function run(bars, inputs = {}, extra = '', timeframe = '1') {
  const last = bars.at(-1);
  const feed = [...bars, candle(last.closeTime, last.close, last.close, last.close, last.close, 0)];
  // Unmodified production code with default settings unless explicit calibration
  // is requested. Input literals only are configured for the PineTS limitation.
  const runtime = (Object.keys(inputs).length ? configuredSource(source, inputs) : source) + extra;
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
  assert.match(source, /indicator\("幽玄", "幽玄"/);
  assert.doesNotMatch(source, /\b(?:line|label|table)\.new\s*\(|\bplot\s*\(|\bplotshape\s*\(|\balertcondition\s*\(|strategy\.(?:entry|order)/);
  assert.doesNotMatch(source, /chart\.(?:left|right)_visible_bar_time|xloc\.bar_index|extend\.right/);
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

test('production defaults draw text-free green and yellow boxes with identical time/price anchors on every display', async () => {
  let baseline;
  for (const tf of displays) {
    const result = await run(fullStack(), {}, '', tf);
    const summary = records(result).map(recordSummary);
    assert.ok(summary.some(r => !r.yellow && r.kinds >= 2), `no green stack on ${tf}`);
    assert.ok(summary.some(r => r.yellow && r.kinds === 4), `no actual yellow full stack on ${tf}`);
    assert.equal(boxes(result).length, summary.length);
    for (const record of summary) {
      const box = boxes(result).find(b => b.left === record.start && b.right === record.finish && b.bottom === record.lo && b.top === record.hi && b.border_color.toLowerCase() === (record.yellow ? '#f1c40f' : '#27ae60'));
      assert.ok(box, `record not drawn on ${tf}`);
      assert.equal(box.text, '', tf);
      assert.equal(box.left, record.start);
      assert.equal(box.right, record.finish);
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

test('a later VAH rejection begins yellow at confirmation time and preserves the earlier green rectangle', async () => {
  const feed = fullStack();
  const before = await run(feed.slice(0, -1));
  const after = await run(feed);
  assert.ok(records(before).some(r => r.live && r.kinds === 4 && !r.yellow));
  assert.ok(records(before).every(r => !r.yellow));
  const gold = records(after).find(r => r.yellow);
  assert.equal(gold.start, SEPT23 + 480 * MINUTE);
  const preserved = records(after).find(r => !r.yellow && !r.live && r.finish === gold.start && records(before).some(b => b.live && b.kinds === 4 && b.start === r.start && b.lo === r.lo && b.hi === r.hi));
  assert.ok(preserved, 'the previous green box should end where yellow begins');
  const earlier = records(before).find(r => r.start === preserved.start && r.lo === preserved.lo && r.hi === preserved.hi);
  assert.equal(preserved.yellow, false);
  assert.equal(preserved.lo, earlier.lo);
  assert.equal(preserved.hi, earlier.hi);
  assert.equal(preserved.finish, gold.start);
});

test('box height, padding, duration and both colors are configurable in point/time coordinates', async () => {
  const result = await run(fullStack(), {
    'Minimum box height (points)': 20, 'Box padding per side (points)': 2,
    'Maximum box duration (minutes)': 45, 'Standard alignment color (green)': '#123456', 'Full qualification color (yellow)': '#abcdef',
    'Fill transparency (0 = opaque)': 50, 'Border width': 3,
  }, '', '240');
  assert.ok(records(result).some(r => r.yellow));
  for (const box of boxes(result)) {
    assert.ok(box.top - box.bottom >= 24);
    assert.ok(box.right - box.left <= 45 * MINUTE);
    assert.ok(['#123456','#abcdef'].includes(box.border_color.toLowerCase()));
    assert.equal(box.border_width, 3);
    assert.equal(box.text, '');
  }
});

test('new box presentation preserves the original Fib, VWAP, profile and RB calculations', async () => {
  const bars = fullStack();
  const current = state(await run(bars), 'snapshot');
  const previous = state(await runLegacy(bars, {}, '', '1', true), 'snapshot');
  for (const field of ['asOf','day','today0','today1','mean','m2','weight','profileVolume','baseRow'])
    assert.equal(current[field], previous[field], field);
  for (const family of ['fibs','vwapLevels','vpLevels','rbs']) {
    const summarize = level => ({ lo: level.lo, hi: level.hi, kind: level.kind, caption: level.caption, born: level.born, epoch: level.epoch, active: level.active, dead: level.dead });
    assert.deepEqual(current[family].array.map(summarize), previous[family].array.map(summarize), family);
  }
  assert.deepEqual(current.profile.array, previous.profile.array);
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
