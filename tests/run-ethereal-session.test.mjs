import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateSessionScope } from '../tools/run-ethereal-session.mjs';

const design = JSON.parse(readFileSync(new URL('../research/obsidian/Ethereal/Evidence/study-design.json', import.meta.url), 'utf8'));
const utc = date => Date.parse(`${date}T00:00:00Z`);

test('the frozen two-day pilot is permitted without replaying reserved validation', () => {
  assert.doesNotThrow(() => validateSessionScope(design, ['2026-01-22', '2026-01-23'], utc('2026-01-24')));
});

test('continuous calibration replay may finish exactly before the first reserved candle', () => {
  assert.doesNotThrow(() => validateSessionScope(design, ['2026-03-17'], utc('2026-03-18')));
});

test('a long unscored replay prefix cannot enter validation even when scored dates are only the pilot', () => {
  for (const cutoff of [utc('2026-03-18') + 1, utc('2026-03-19'), utc('2026-04-16')]) {
    assert.throws(() => validateSessionScope(design, ['2026-01-22', '2026-01-23'], cutoff), /Reserved validation data/);
  }
});

test('reserved validation dates cannot be scored under an otherwise permitted replay cutoff', () => {
  for (const date of design.validationDates) {
    assert.throws(() => validateSessionScope(design, ['2026-01-22', date], utc('2026-03-18')), /Score dates must belong/);
  }
});

test('only explicitly declared calibration dates are accepted, including complete-looking unknown weekdays', () => {
  for (const date of ['2026-01-20', '2026-01-24', '2026-02-05', '2025-01-22', 'not-a-date']) {
    assert.throws(() => validateSessionScope(design, ['2026-01-22', date], utc('2026-03-18')), /Score dates must belong/);
  }
  assert.throws(() => validateSessionScope(design, [], utc('2026-01-24')), /Score dates must belong/);
});

test('even approved calibration dates cannot be scored at or after the exclusive replay cutoff', () => {
  assert.throws(() => validateSessionScope(design, ['2026-01-23'], utc('2026-01-23')), /Score dates must belong/);
  assert.throws(() => validateSessionScope(design, ['2026-01-23'], utc('2026-01-22')), /Score dates must belong/);
});

test('nonfinite cutoffs fail closed rather than bypassing holdout comparisons', () => {
  for (const cutoff of [NaN, Infinity, -Infinity, undefined, '2026-01-24']) {
    assert.throws(() => validateSessionScope(design, ['2026-01-22'], cutoff), /Invalid replay cutoff/);
  }
});

test('reserved date protection fails closed for missing or malformed designs', () => {
  for (const validationDates of [[], undefined, ['bad-date']]) {
    assert.throws(() => validateSessionScope({ ...design, validationDates }, ['2026-01-22'], utc('2026-04-16')), /Invalid reserved validation/);
  }
});

test('unsorted reserved dates cannot move the true first holdout boundary', () => {
  const unsorted = { ...design, validationDates: [...design.validationDates].reverse() };
  assert.throws(() => validateSessionScope(unsorted, ['2026-01-22'], utc('2026-03-19')), /Reserved validation data/);
});
