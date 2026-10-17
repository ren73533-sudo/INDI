# POI reversal study

This is a historical **price-reaction study**, not a strategy or profitability backtest. It does not place orders or calculate trade win rate, P&L, fees or slippage. Those require the trader's execution and exit rules.

## Status

No real-market study has been run yet: no historical NQ dataset is available in the cloud workspace. The checked free-data endpoint was denied by the network proxy. Synthetic software checks do not establish reversal performance.

## Data required

Export **NQ1! standard 1-minute OHLCV** from TradingView, with columns:

```csv
time,open,high,low,close,volume
2026-09-23T13:30:00Z,31000,31002,30999,31001,100
2026-09-23T13:31:00Z,31001,31003,31000,31002,120
```

The example above is a format illustration, not historical NQ data. Unix timestamps in seconds or milliseconds also work. ISO timestamps need an explicit timezone. Data must be chronological, unique and minute-aligned, with valid OHLC and nonnegative volume. Extra indicator columns are ignored. Export all available overnight candles; RTH-only history cannot construct the 00:00–07:30 UTC range. Include several preceding sessions to initialize VWAP and two published Fib sets. The first usable scoring day depends on that history.

Use the exact chart feed, rollover/back-adjustment setting and indicator inputs you intend to test. A feed labelled NQ futures elsewhere is not necessarily equivalent to TradingView NQ1!. The command assumes the file is NQ; it cannot verify its market-data provenance.

## Run

From the repository root after `npm ci --ignore-scripts --no-audit --no-fund`:

```sh
npm run study -- /path/to/NQ_1m.csv --out /tmp/indi-study
```

Optional settings:

```sh
npm run study -- /path/to/NQ_1m.csv --session both --threshold 15 --inputs /path/to/settings.json --out /tmp/indi-study
```

`--session ny` is the default: 09:30–16:00 America/New_York, following US DST. `london` uses the strategy's fixed 07:30–13:30 UTC window. `both` includes either window; no Asian session is scored. `--threshold` sets a symmetric price-movement benchmark in points, not an approved stop or profit target. `--inputs` is a JSON object keyed by the indicator's English setting titles; omitted settings use the indicator defaults. Display-only options are disabled for replay efficiency.

## Measurement

- Replays the **actual Pine source** through PineTS 0.11.1. No separate reimplementation of the trading calculations.
- Evaluates each zone from the preceding completed candle. A contact candle cannot create its own eligible POI.
- Scores the first range contact with each concept-membership group per UTC day. The prior close determines whether it is approached as support or resistance. Zones already containing that close have no approach side and are excluded.
- Requires two published Fib sets before scoring. Empty or incomplete warmup is not counted as evidence of a weak or strong strategy.
- Measures favorable/adverse excursion and directional close change over **5, 15 and 30 elapsed minutes**, beginning on the candle **after** contact, using the **contact candle's close as the reference**. This deliberately avoids claiming an intrabar limit-order fill. It does not measure how far price moved within the contact candle itself.
- Records whether a favorable or adverse benchmark is reached first after that reference. If both occur in the same one-minute candle, the outcome is **ambiguous**, not assigned an assumed order. If neither occurs, it is **neither**. Missing candles / insufficient follow-up make that horizon **incomplete**, not a win or loss.
- Different groups can share levels or contact times; events are not statistically independent. Counts and descriptive averages are exploratory and do not imply a trading edge.

## Replay instrumentation and limits

The production indicator is left unchanged. Its in-memory study copy exports every completed-minute engine snapshot instead of only the latest one, and uses the production engine’s daily profile. It materializes custom input default literals to work around PineTS 0.11.1 dropping secondary-request overrides; calculation expressions are unchanged. A flat zero-volume observation minute exposes the state after the final supplied candle, but is never scored. Each snapshot timestamp is checked against the actual candle close. A prefix-consistency test verifies that later data does not change earlier zones. See `TIMEFRAMES.md` for the engine architecture.

PineTS is a third-party runtime. These results, once data is supplied, will still need spot checks against TradingView Bar Replay. The estimated volume profile and unverified DRW match remain limitations. This is not tick replay and cannot establish within-minute execution or exchange queue priority.

The initial CLI limit is 100,000 candles. Longer studies need overlapping initialization history when processed in windows, and event deduplication at the window boundaries; do not simply add overlapping-window totals. Outputs contain source/data SHA-256 hashes, the exact date range, settings and event details for auditability. Reports are written to `/tmp` by default; no market data or results are automatically committed or uploaded.
