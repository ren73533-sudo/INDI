# Current implementation decisions — v0.3.1

The original specification is unchanged in [GPT-HANDOFF.md](GPT-HANDOFF.md). Historical v0.2 reasoning is in `REPORT.md`; this document describes the current implementation.

## Preserved strategy

Candle bodies define Fib anchors; 0 is the earlier extreme. Multipliers follow the leg, not chart direction. ±2 / ±2.25 / ±2.5 are primary, ±3 / ±3.5 / ±4 require arming, and geometry is context only. VWAP ±2 / ±3 can contribute; center / ±1 cannot. RBs are return zones after confirmation. Invalidation is a price penetration, not a close rule. No directional bias, BOS prerequisite or trade signals.

The trader explicitly chose **at least two distinct concept types**, not all four, for v0.3 POIs. Today's and the prior set's Fib levels share one type; RBs across source timeframes share one type.

## Configurable conventions

| Choice | Default |
| --- | --- |
| Fib construction | 5m bodies; selectable 1m / 5m / 10m / 15m |
| Fib range | 00:00–07:30 UTC, configurable within one day with aligned boundaries |
| POI tolerance | 15 points, adjustable 5–50 |
| Minimum | Two distinct types; optional loose level-count mode |
| Expansion arming | Both signs on a close beyond either ±2.5 threshold; optional by-sign mode |
| Close / invalidation sampling | Completed 1m data on every display chart |
| Fib retention | Two latest published sets, so Friday survives Monday; optional previous UTC calendar day |
| VWAP anchor | Fixed 22:00 UTC; options CME 18:00 New York, RTH, daily UTC, custom UTC time |
| RTH | 09:30–16:00 America/New_York, following DST; accumulation outside RTH off |
| Moving-level invalidation | Compare against the prior known price, remain dead until reset; configurable |
| Warmup | VWAP 5 minutes, profile 15 minutes |
| POC in POIs | Off; context / absorption reference by default |
| RB wick | At least 2× body and 60% of range, both configurable |
| RB prior move | Net close change over two prior source candles, configurable |
| RB confirmation | Immediate next source candle reverses color and closes past the rejection body; optional extreme threshold |
| RB retention | 40-level capacity, optional expiry off; bounded by available 1m history |

These are working calibration defaults. DRW equivalence, discretionary RB matching and the best tolerance still need trader validation.

## Timing and data

A single 1m engine builds UTC-aligned construction / RB candles. Fib construction requires complete buckets. RB construction aggregates available data, restoring v0.2 source-bar behavior: sparse minutes do not disqualify the candle, and an absent final minute is finalized at the next available bar. The Fib range requires its complete sequence of source candles, and equal extremes keep the first occurrence. If both extremes belong to the same candle or the range is flat, no anchor order is invented.

The engine exports a deep copy of the state **before the forming minute is updated**. This gives the same completed-minute levels and reference price across 1m / 5m / 10m / 15m / 30m / 1h / 4h, with up to one minute of delay. A completed range can become available at its boundary, e.g. 07:30 UTC; the v0.2 report's claimed mandatory extra 5-minute delay does not apply.

New Fib levels and RBs cannot be invalidated by wicks preceding their birth. Expansion is not invalidated retroactively on its arming candle. Rejection and confirmation must be consecutive available source candles, as in v0.2. The extra v0.3 wall-clock adjacency restriction was removed; the next available candle can follow a session gap.

Source history defaults to 20,000 1m candles, configurable within plan/feed limits. The panel reports the actual snapshot time. Identical data and input settings are required to compare charts. VWAP history is sampled at the display timeframe; current references come from the shared engine.

## Profile, clusters and rendering

The daily UTC profile distributes each candle's volume by price-range overlap on a fixed tick grid. Flat candles allocate to one row. POC ties choose the lowest row. Value area expands toward the larger neighboring volume; equal neighbors are both included. VAH / VAL are external row edges. Capacity overflow disables the profile rather than truncating it.

For point levels, cluster width is at most tolerance. For wick intervals, use their common overlap / gap: `max(lower edges) - min(upper edges) <= tolerance`. No transitive chaining. One broad RB can participate in multiple separate groups. Subsets are suppressed; nearest groups are retained up to the display cap. Colors and nearest-zone ranking use the engine reference price.

Historical primary Fib traces are static anchor references only and continue through invalidation. Their maximum is 75 sets × 6 = 450 lines, with pruning before allocation and capacity reserved for live references. They are not an eligibility or trade history. Use Bar Replay for historical confluence.

The trader explicitly requires the full original display. Keep RB wick boxes, individual Fib / VWAP / profile references, historical VWAP curves, labels, calibration and color controls. Reference display is independent of confluence qualification; a lone RB is still drawn. Only a POI mark requires the configured minimum (two distinct types by default).

## Outstanding external checks

TradingView compilation, live rollback behavior, plan-dependent memory / runtime / 1m availability, annotated session comparisons, DRW source, holidays and NQ rollover remain to be verified. The actual-market POI study still requires a CSV export; synthetic software tests do not establish reversal performance.
