---
project: Ethereal
type: implementation-audit
status: corrected-before-publication
created: 2026-10-27
---

# S01 implementation audit

The actual Ethereal v1.4 source remains unchanged. The research adapter overrides declared input defaults and consumes the production renderer's immutable zone transport; it does not recreate the confluence calculations. The source SHA-256 remains `1304c756d9b725701181c3f3dd8722387157b47d82fe7f3817cf9e5d482f2709`.

## Review corrections

- Count a certain stop-only loss after an intraminute midpoint entry as a loss. Do not exclude known losses as ambiguous.
- Record the +60-point break-even activation when a resolved TP130 occurs later in that same held candle, including observed opening-gap triggers. This corrects metadata without changing financial outcomes.
- For the separate reaction benchmark, an observed opening price at or beyond one ±15-point boundary establishes the first observed threshold. Two-boundary candles opening inside the boundaries remain ambiguous.
- Encode nested CSV evidence using standard doubled quotes; JSON string escaping is not valid CSV escaping.
- Keep only the latest decoded packed state in adapter caches. Historical immutable frames remain unchanged; this avoids an unnecessary growing decode cache.
- Reject calibration replay entering any reserved validation date, even if the requested scored dates are earlier. Fail closed on empty/malformed validation designs and use the earliest reserved date regardless of ordering.

An exploratory extended process started before the last metadata/benchmark corrections was stopped without publishing its outcomes. The clean extended runs record the final tool hashes. The preliminary pilots are runtime/readiness measurements; the extended clean runs are the auditable performance records.

## Confirmed methodology

Same-index frames contain only previous completed-minute state. Contact cannot create its own tested zone. Hidden prior touches consume freshness. Contributor text and grades are frozen formation/upgrade evidence, not proof of current alignment. Order selection uses prior close before the contact candle's range is observed. Ambiguous trades block the rest of that NY session. Stop gaps remain uncapped and flagged.

## Remaining limits

PineTS is a third-party runtime, not TradingView certification. One-minute OHLC cannot resolve all fills, paths or queue priority. The public archive's exact contracts, roll process and NQ1! equivalence remain unverified. The finite initialization prefix cannot reconstruct earlier persistent zones. No fees or slippage model was supplied. Overlapping zones, dates and candidate modes are dependent samples; extreme outcome bounds are not confidence intervals or a complete account path. Untouched validation and a best-timeframe claim remain pending.

## Completed extended artifact review

A second read-only internal review checked both final 55,439-bar runs. It verified current source/tool/data/slice hashes, 37×390 ready RTH minutes, standard strict CSV parsing and nested JSON, entry session timing, planned SL20/BE60/TP130 levels, BE activation timestamps on target/BE exits, no overlapping re-entry, and no further entries after an ambiguous outcome in the same NY session. Reserved validation candles were not replayed.

Independent arithmetic matches Range 650−560+109.75=+199.75 and Midnight 260−540+106.25=−173.75 gross resolved points. The report preserves partial session exits, ambiguous outcomes, small-sample limits and the distinction between zero retained yellow and renderer filtering. No remaining implementation blocker was identified by this internal review; this is not external certification of a trading edge.
