# OFI — Orderflow Indicator v1.0

OFI is a separate Pine Script v6 indicator for standard **1-minute NQ candles**. Paste `indicators/ofi.pine` into TradingView's Pine Editor. It draws prior-session profile zones, RTH VWAP/bands, and confirmed long/short markers. Optional alerts should use **Once Per Bar Close**. Native TradingView compilation, real-time rollback and broker/feed behavior still require verification; offline execution uses PineTS 0.11.1.

The [initial study and Monte Carlo report](../research/ofi/v1/run-2026-10-29/REPORT.md) contains five trades (two wins, three losses) and no trades in the later 20-session evaluation. These observations do not establish a reliable edge. All five belong to the FA setup; BV is verified on synthetic fixtures but has no observed market trades in this run.

## The two setups

**Failed auction (FA):** the first 30 minutes of RTH supply a deterministic opening-balance proxy. It qualifies when absolute open-to-close displacement / full high-low range is at most 0.35. An excursion reaches a prior-session profile zone wholly beyond that opening range, reclaims it, and obtains follow-through. This is a deliberately specified opening-balance failed excursion; it does not automate every discretionary prior-balance/POC failed-auction setup in the ORDERFLOW lessons.

**Balanced VWAP (BV):** a prior-session profile zone overlaps the RTH VWAP's outer 2-deviation band, allowing a gap of at most 0.25 ATR. VWAP must be flat: its absolute 10-minute change divided by RTH Wilder ATR(14) is at most 0.35. VWAP, variance, slope and ATR are taken from the preceding completed candle when the zone is tested. These are context filters, not proven reversal probabilities.

Both require price to approach from the inside/favorable side, touch the zone, close back through its near edge within 3 minutes, then **on a later candle** close past the reclaim candle's high (long) or low (short) within another 3 minutes. Confirmation is timestamped at that later close. A marker is not a fill. If both setups qualify, there is one event marked as both.

## Profile and zone lifecycle

The prior observed RTH must contain all 390 consecutive minutes from 09:30 through 15:59 in `America/New_York`, including DST. An incomplete preceding session produces no profile. Holidays with short sessions are intentionally excluded; no holiday calendar is inferred. A completely absent trading day cannot be detected from the file alone.

Volume is allocated uniformly over each 1-minute candle's high-low overlap with 2-point rows; a flat candle contributes to its one row. This is **estimated volume-at-price**, not exchange footprint data. A dense row must contain at least 20% of peak-row volume. Its neighbor must either have at most 35% of that dense row's volume (ledge), or fall below the 20%-of-peak threshold (distribution/shelf boundary). This shelf is an explicit density-contour approximation, not a claim to reproduce a discretionary drawing. Lower distribution edges become support, upper edges resistance. Candidate edges are ranked by absolute volume drop. At most 12 zones are retained, each +/-2 points wide, with overlapping/touching zones suppressed. More than 2,000 required profile rows disables publication rather than truncating the profile.

Zones appear when the new RTH begins and remain at their original prices. Their labels progress through candidate, tested, reclaimed, confirmed or expired/invalid. Two consecutive closes beyond the outer edge invalidate an unconfirmed zone. One qualifying test is allowed per zone per day. A failed attempt is not recycled. After confirmation the box ends and remains as a historical confirmation record; it is not a claim of continuing support/resistance. New zones use the next session's completed profile. At most 180 drawing objects are retained; this cap does not filter signals.

Signals are allowed from 10:00 until 15:30 NY. A missing RTH minute disables signals for the remainder of that session. Simultaneous confirmations emit one research event using the stable profile-quality order. All prices/inputs are configurable; the frozen research baseline uses source defaults.

## Measuring a win rate

The indicator alone has no intrinsic win rate. The separate study applies this explicit trade model:

- Enter the next consecutive minute's open after a confirmed signal, with 1 tick adverse entry slippage. One NQ contract and one position at a time; no pyramiding.
- Stop beyond the observed excursion by 1 point. Entry-to-stop risk must be 2–60 points after entry slippage; otherwise skip the trade.
- Fixed target at 2 times that risk, rounded outward to the tick. This is a comparison convention, not a VWAP/POC destination target.
- Stop/target first; otherwise exit after 60 one-minute candles including the entry bar, or at 15:59 close. Positions are flat overnight.
- $4.50 round-trip commission; $20 per point; 1 tick adverse slippage on every exit, including target exits as a conservative convention. Actual fees/slippage may differ.
- If a candle opens beyond a bracket, the open determines the first outcome. A stop gap fills at the worse open; target gaps receive no favorable improvement. If both boundaries are reached from an open inside the bracket, report ambiguity and use **stop-first** as primary, **target-first** as sensitivity. No intrabar path is invented.
- A win means net P&L strictly greater than zero. Target-hit rate, time exits, expectancy, profit factor and realized drawdown are reported separately. Drawdown excludes open-trade adverse excursion.

`tools/ofi-replay.mjs` executes the actual production Pine and reads its hidden numeric plots. It does not maintain a second JavaScript signal engine. `tools/ofi-study.mjs` then applies the independent execution and cost model to those outputs. The report records the exact source/data hashes, effective inputs and every signal/trade/exclusion.

## Reproduce the preliminary public-data study

Install locked dependencies with `npm ci --ignore-scripts --no-audit --no-fund`, then:

```sh
node tests/ofi.test.mjs
node tools/ofi-study.mjs --data /path/to/NQ_1min_20260120_20260415.csv --public-archive --out /tmp/ofi-new-run --paths 10000
```

The immutable source URL and required SHA-256 are in `research/ofi/v1/protocol.json`. The original `datetime` field is interpreted as UTC only for that exact checksum. Raw data stays outside Git; it is not redistributed. An existing output directory is rejected so one run cannot overwrite another.

For an actual TradingView NQ1! export, use columns `time,open,high,low,close,volume`, with Unix seconds/milliseconds or an explicitly zoned ISO timestamp:

```sh
node tools/ofi-study.mjs --data /path/to/NQ1-1m.csv --source-label 'TradingView CME_MINI:NQ1!; standard 1m; record adjustment and session settings' --out /tmp/ofi-tv-run
```

Supply enough history for prior-session initialization. User-declared export identity is recorded, not independently authenticated. The CSV transport uses neutral/public NQ metadata for offline calculations and does not authenticate a TradingView feed. The existing split boundary is 2026-03-18; change/freeze a new protocol before evaluating a different study period rather than interpreting an empty split as validation.

## Monte Carlo interpretation

After historical trades exist, the study samples moving blocks of **five consecutive trading days**, with replacement. Intraday trade order and zero-trade eligible days are preserved. Complete days without a usable preceding profile are initialization exclusions, not empty bootstrap days. Each of 10,000 paths has the same number of days as the corresponding split, at fixed 1-contract exposure. The seed is 20261029. Reports contain empirical 2.5th/50th/97.5th percentiles for win rate, total net P&L and realized drawdown, plus the fraction of paths losing money.

This estimates uncertainty conditional on the observed sample/cost model. It does not produce new independent evidence, predict future regimes, or repair unknown contract rolls. A small sample remains small after 10,000 resamples. Merely shuffling a fixed trade list would leave its win rate unchanged; this study resamples with replacement instead.

The last 20 dates from the vault's pre-existing split are used as OFI's later chronological evaluation. The first cliff-only implementation produced zero signals and is retained under `research/ofi/v1/feasibility-cliffs/`. That exposed a mismatch between the abrupt-ledge definition and smooth minute-based profiles. The planned distribution/shelf boundaries were then added using the existing density threshold, before any winning/losing trades were observed. Because feasibility was already inspected across both splits, the later split is **exploratory chronological validation, not a pristine untouched holdout**. No performance optimization follows this revision. Further tuning requires new validation data. The earlier Ethereal study is a separate experiment.

## Deliberate v1 limits

No DOM, exchange aggressor delta/CVD, GEX, TPO, shelf smoothing, five-day composite, multi-timeframe chart engine or automated trading orders are implemented. No candle-direction volume is mislabelled as actual order flow. Later versions can add a feature only after data access and incremental value are verified. Existing INDI and Ethereal behavior is unchanged.

Before relying on chart output: compile natively, inspect both setup types in Bar Replay, compare signal timestamps with the exported ledger on identical candles, test a live closing minute, check DST/session boundaries, and verify profile history coverage. The public archive's provider claim and undocumented roll/back-adjustment method do not establish equivalence to TradingView NQ1!.
