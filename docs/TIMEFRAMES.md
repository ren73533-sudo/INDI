# Shared timeframe engine — v0.3

## Display versus calculation

Supported display charts are standard **1m, 5m, 10m, 15m, 30m, 1h and 4h**. The chart only renders results and determines projection width / historical plot sampling. Levels, invalidation, VWAP, daily profile and POI ranking use a common 1m stream.

Fib construction is independently selectable as 1m / 5m / 10m / 15m. RBs use 5m / 10m / 15m. Changing the display timeframe does not change those choices or the requirement of two distinct concept types.

## Data flow

`request.security(symbol, "1", f_engine(), lookahead_off)` is the sole request. Inside it, `f_aggregate` combines complete 1m buckets into source candles. `f_range`, `f_updateRbs`, weighted VWAP and the estimated profile update their own persistent state. No nested request and no chart-candle fallback is used.

At the beginning of each source minute, the engine deep-copies the state left by the previous minute. It exports that snapshot only on the last source bar. The forming minute is then processed internally but cannot change the exported levels. At the next minute boundary, its final data becomes observable. The panel reports `snapshot.asOf`; all calculations and memberships should be compared at that timestamp.

This avoids reliance on `barstate.isconfirmed` inside a request. It deliberately delays forming-minute changes by up to a minute. When the market is closed, the timestamp can be older; the engine does not invent additional bars.

Collections are exported only for the latest snapshot to avoid a deep-copy history on every chart bar. Scalars preserve historical VWAP samples and completed anchor pairs. Historical anchor lines are rendered outside the request and bounded separately from live drawings.

## Availability and chart comparison

The requested history defaults to 20,000 1m candles, adjustable 3,000–100,000. Actual coverage depends on TradingView plan, symbol history, session and data feed. The chart needs the overnight range and earlier sessions even when viewed on 4h. Missing source history or incomplete initialization is reported. Incomplete construction candles and Fib windows are not used.

POI prices and membership use the engine's price, UTC day and timestamps. Projection width changes with chart units. Historical curves are sampled at that chart's bars and need not have the same visual granularity. No need to wait for a 4h display candle to close during live updates.

## Offline verification and limitations

Tests compare full source state, profiles and **nonempty POIs** across all seven displays. The production-default test runs the source without input or code shims. Additional checks exercise custom calibration, minute-level invalidation on a 4h display, source candle construction, confirmed RBs, missing-minute rejection, snapshot freezing and historical line limits.

PineTS 0.11.1 drops runtime input overrides in secondary request contexts. For custom offline fixtures, `tools/pine-inputs.mjs` replaces only the declared input default literals with the requested values. Formulas and conditions are not rewritten; production Pine remains unchanged. A zero-volume observation minute exposes the state after the final supplied fixture candle.

The CSV reaction study additionally exports every historical snapshot and uses the same production daily-profile calculations. Snapshot `asOf` is checked against the real candle's close; the observation minute is never scored. Prefix tests check that later candles do not change earlier frames.

None of these tests is an official TradingView compilation. Live source-context rollback, real-time lower-timeframe updates, account limits and actual NQ data still require TradingView checks. No real-market backtest result is claimed.
