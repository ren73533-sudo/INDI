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

## Separate Ethereal indicator — requested October 18, 2026

The trader subsequently explicitly requested a **new box-based indicator**, named in Japanese: `indicators/ethereal.pine` (幽玄 / Yūgen). This new request applies to that separate file; keep the original full-display indicator intact. Read `docs/ETHEREAL.md` for exact rules and defaults.

- Green: any two distinct concept types, in any order. Yellow: all four plus a qualifying RB and the configurable VAH/VAL reversal.
- The trader explicitly selected **reference timeframe, default 5m**, for the same/higher RB rule. Do not silently use the display timeframe.
- The trader initially requested no text, then explicitly requested optional in-box confluence text and β / ρ side symbols. v1.3 defaults both text toggles ON, with configurable color and size. Show actual formation contributors and RB timeframes; no OTE is implemented. β is the frozen support/buy side; ρ is the frozen resistance/sell side. Preserve original green text when a later yellow segment records its own contributors. Keep separate labels, individual levels, curves and dashboard out of the new indicator. Price/time anchors must stay fixed; use absolute timestamps, point-based height and minute-based right projection, never viewport coordinates.
- Build the standalone source with `node tools/build-ethereal.mjs`; templates are in `tools/ethereal/`, and calculation code is sourced from the original indicator. Update templates, then regenerate. `--check` detects drift.
- The trader rejected the v1.0 stair-step fragments and supplied examples of long horizontal resting price areas. In v1.1, confluence establishes an area once. Do not retire or recreate it when VWAP/profile drift or alignment disappears. Keep it for return taps until its frozen source-anchor price invalidation, optional expiry or retention limits. Hide broken zones by default. Consume anchor identities to prevent instant respawning; merge nearby anchors without moving existing bounds.
- Preserve past green history when yellow qualifies later. Keep the same resting area and price bounds, with its yellow portion beginning at the confirmation timestamp. Never relocate it or downgrade its earned grade as the moving references change.
- The trader reported missing zones in Bar Replay. Ethereal v1.2 removes both last-bar-only gates: compact immutable zone state is exported on every source bar, and rendering processes every available chart bar. Cache the transport until visible/structural zone state changes, and rebuild drawing objects only when the selected view changes. Quiet steps only advance active right edges. Do not reintroduce `barstate.islast` as a prerequisite for Ethereal export or drawing.
- The trader clarified that some reversals happen beyond an RB wick tip. v1.3 adds optional **Beyond wick confluence** placement: choose an existing eligible non-RB level outside an aligned wick, within tolerance, minimum sweep distance and before its invalidation threshold. Skip an RB stack with no eligible outer level. Do not add arbitrary sweep offsets or backdate a box to an eventual extreme. Original anchor is the default, non-RB pairs still qualify, and all bounds remain frozen.
- Optional **Hide zones after first return** filters after a completed 1m overlap following creation and skips creation on a candle that already reaches the band. `touchedAt` is transported historically; the engine record is retained. Default is OFF. This is an optional selection change, not evidence of improved accuracy.
- Pine declaration remains v6. New behavior has synthetic checks but has not been validated against the trader's dated NQ examples. No perfect-tick or profitability claim is justified.
- The VAH/VAL reaction's explicit working definition is documented and adjustable; do not imply measured reversal probability or a real NQ backtest.

## Architecture

- Standard 1m / 5m / 10m / 15m / 30m / 1h / 4h display charts.
- One `request.security` transports a shared 1m engine; no nested requests.
- `f_aggregate` requires complete candles for Fib construction, but aggregates available data for RBs, matching the original native-candle behavior. `f_range` requires the full range window. `f_updateRbs` checks the next available source candle, without an extra wall-clock adjacency filter. Missing trailing minutes are finalized at the next available source bar, once only.
- Both engines snapshot state **before updating the current minute**. The display uses completed data, with up to a one-minute delay, without relying on `barstate.isconfirmed` inside a request.
- In the original full-display indicator, collections are exported only on the last source bar; scalar returns retain historical VWAP and anchor data. Ethereal v1.2 instead exports scalars and a cached compact zone string on every source bar, leaving calculation collections inside the engine. Its optional `f_engine(true)` argument exports raw collections for numerical audits only; the production request calls `f_engine()`.
- Rendering uses `snapshot.referencePrice`, UTC day and timestamp, not chart-candle prices.
- Historical lines reserve capacity for live levels. Missing source data is flagged, not replaced with larger candles.

## Validation

Use the existing checkout; cloud tasks are already isolated. Do not create worktrees without the user's request.

```sh
npm ci --ignore-scripts --no-audit --no-fund --cache /tmp/indi-npm-cache
npm test
```

The default cross-timeframe test runs unmodified production code with nonempty POIs. Other fixtures use `tools/pine-inputs.mjs` to materialize input defaults because PineTS 0.11.1 drops runtime overrides in secondary request contexts. This changes input literals only, not calculation expressions. The original source is separately transpiled.

Ethereal replay regressions inspect historical cursor snapshots and drawing counts across all seven timeframes, compare with independent prefix-only runs, and ensure later invalidations cannot erase an earlier cursor's areas. The raw calculation parity check enables the optional audit argument; production replay tests retain the compact transport. PineTS drawing output only retains its final object snapshot, so historical checks also use test-only numeric drawing probes and immutable zone signatures.

A flat zero-volume observation minute exposes the state after the last fixture candle; it is never scored. The CSV study also exports each historical snapshot; profile calculations remain unchanged. It checks timestamps and historical-prefix consistency.

PineTS is not TradingView. Do not claim official compilation, live behavior, DRW equivalence, actual volume-at-price or profitability without evidence.

Next: compile v0.3.1, compare 1m / 10m / 4h at matching engine timestamps, inspect live minute boundaries, market gaps, source availability and execution limits. Real NQ CSV for the requested POI reaction study is still missing.
