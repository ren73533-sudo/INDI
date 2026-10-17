# INDI handoff for Claude Code — v0.3.1

The trader wants an iterative NQ key-level and reversal-zone display, with configurable calibration and colors. All indicator text and new documentation must be in English. Sessions coordinate through this repository and trader feedback; there is no automatic Claude Code / Codex messaging channel.

## Read first

1. `docs/GPT-HANDOFF.md`: unchanged original strategy.
2. `docs/DECISIONS.md`: current conventions and open choices.
3. `docs/TIMEFRAMES.md`: architecture, snapshot timing and offline-runtime limits.
4. `docs/TRADINGVIEW-CHECKLIST.md`: real-chart checks.
5. `indicators/nq_key_levels.pine`: standalone source.

`REPORT.md` is historical v0.2 feedback. v0.3 no longer uses chart-candle calculations or nested HTF requests. Completed construction ranges become available at their actual completion boundary.

## Invariants

Preserve candle-body Fib extremes, chronological 0 / 1 anchors, no trend filter or BOS prerequisite, at least two concepts, distance-based high / low invalidation, and confirmed RBs for return taps. No orders, trade alerts or entry arrows. Strategy changes require the trader's instruction.

The trader explicitly retained **two distinct types minimum** with the multi-timeframe update. Do not require all four families. Optional 4H structure context is not implemented and must not become a direction filter.

The trader explicitly rejected reducing or redesigning the indicator. Preserve the full v0.2 visual feature set and existing calibration / color controls. RB wick boxes and individual references must remain visible independently of POI qualification. Make targeted corrections; do not replace the full display with POI-only output. Keep the original input order and IDs; append future controls after the original 71 declarations.

## Architecture

- Standard 1m / 5m / 10m / 15m / 30m / 1h / 4h display charts.
- One `request.security` transports a shared 1m engine; no nested requests.
- `f_aggregate` requires complete candles for Fib construction, but aggregates available data for RBs, matching the original native-candle behavior. `f_range` requires the full range window. `f_updateRbs` checks the next available source candle, without an extra wall-clock adjacency filter. Missing trailing minutes are finalized at the next available source bar, once only.
- `f_engine` deep-copies state **before updating the current minute**. The display uses completed data, with up to a one-minute delay, without relying on `barstate.isconfirmed` inside a request.
- Collections are exported only on the last source bar; scalar returns retain historical VWAP and anchor data.
- Rendering uses `snapshot.referencePrice`, UTC day and timestamp, not chart-candle prices.
- Historical lines reserve capacity for live levels. Missing source data is flagged, not replaced with larger candles.

## Validation

Use the existing checkout; cloud tasks are already isolated. Do not create worktrees without the user's request.

```sh
npm ci --ignore-scripts --no-audit --no-fund --cache /tmp/indi-npm-cache
npm test
```

The default cross-timeframe test runs unmodified production code with nonempty POIs. Other fixtures use `tools/pine-inputs.mjs` to materialize input defaults because PineTS 0.11.1 drops runtime overrides in secondary request contexts. This changes input literals only, not calculation expressions. The original source is separately transpiled.

A flat zero-volume observation minute exposes the state after the last fixture candle; it is never scored. The CSV study also exports each historical snapshot; profile calculations remain unchanged. It checks timestamps and historical-prefix consistency.

PineTS is not TradingView. Do not claim official compilation, live behavior, DRW equivalence, actual volume-at-price or profitability without evidence.

Next: compile v0.3.1, compare 1m / 10m / 4h at matching engine timestamps, inspect live minute boundaries, market gaps, source availability and execution limits. Real NQ CSV for the requested POI reaction study is still missing.
