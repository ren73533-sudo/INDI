# INDI — NQ Key Levels & Reversal Zones v0.3

A customizable **TradingView Pine Script v6** indicator for the trader's key levels and confluence zones. Original requirements: [docs/GPT-HANDOFF.md](docs/GPT-HANDOFF.md). No orders, entry arrows, trade alerts or directional bias filter.

**Full download: [INDI-v0.3.0.zip](https://github.com/ren73533-sudo/INDI/blob/main/downloads/INDI-v0.3.0.zip).** Open the ZIP on GitHub and use its download button. After extraction, read `START_HERE.md`. The source and tests are also available directly in this repository.

## Use in TradingView

1. Open NQ1! with **standard candles**, on **1m, 5m, 10m, 15m, 30m, 1h or 4h**.
2. Paste the complete [indicators/nq_key_levels.pine](indicators/nq_key_levels.pine) into a new Pine Editor indicator. Save and add it to the chart.
3. Load enough 1-minute history for the overnight range, VWAP anchor and prior sessions. Check **1m engine as of** in the panel.
4. Keep historical Fib traces OFF initially. Customize calibration and colors in Settings.

TradingView compilation and real-chart behavior still need external verification. Offline checks use PineTS, a third-party runtime.

## Same POIs across chart timeframes

All calculations run in a **shared 1-minute engine**. Fib construction and confirmed RB candles are built from that stream. The feed, settings and loaded history must match when comparing charts. The display uses the state before the forming minute, with **up to a one-minute delay**, and updates without waiting for a 1h or 4h chart candle to close.

The panel shows the actual source timestamp. Missing 1m data is reported, never silently replaced with chart candles. Historical VWAP curves are sampled at the display timeframe, so their visual resolution changes with the chart.

POIs still require **at least two distinct concept types by default**. All four types need not overlap. Fib + Fib or RB + RB remains one type unless the distinct-types setting is disabled.

## Calculations and customization

| Component | Default behavior |
| --- | --- |
| Fib | 5m candle bodies, 00:00–07:30 UTC; first extreme = 0, second = 1 |
| Primary deviations | ±2 / ±2.25 / ±2.5; two most recently published sets |
| Expansion | ±3 / ±3.5 / ±4 after a completed 1m close crosses ±2.5 |
| VWAP | Volume-weighted 1m hlc3 and variance; ±2 / ±3 eligible for POIs |
| Volume profile | Estimated daily UTC VAH / VAL / POC |
| RBs | Completed 5m / 10m / 15m rejection and immediate next-candle confirmation |
| POIs | 15-point full-span tolerance; two distinct types minimum |
| Invalidation | Default 15-point high / low penetration on the 1m stream |

Fib construction can be **1m, 5m, 10m or 15m**, independently of the chart. Range hours stay in fixed UTC; New York RTH anchors follow US DST. Geometry and VWAP ±1 are context only.

Settings cover concept participation, tolerance, minimum concepts, invalidation, retention, moving-level lifecycle, source history, Fib window, VWAP anchor, profile rows, RB thresholds, confirmation, capacity, colors, labels, line styles, text size, projection, transparency and historical traces. Display toggles hide references; separate Include toggles control participation in POIs. POI tooltips list members and prices.

## Limits

- DRW equivalence is unverified without its source. The profile estimates volume distribution; bar volume is not actual volume-at-price.
- Forming-minute changes appear in the next snapshot, including invalidations and expansion.
- Source history defaults to 20,000 1m candles, adjustable from 3,000 to 100,000 and subject to plan/feed availability. Price adjustments and session settings must match between charts.
- Incomplete source candles or missing minutes in the Fib window prevent publication. Incomplete VWAP / profile initialization is flagged.
- Historical Fib traces show static anchors, continue through invalidations, and are not a trade or eligibility record. Use Bar Replay for past confluence.
- RB retention is limited by configured capacity and available source history. Optional 4H structure context remains unimplemented and is not a filter.

See [decisions](docs/DECISIONS.md), [timeframe architecture](docs/TIMEFRAMES.md) and [TradingView checks](docs/TRADINGVIEW-CHECKLIST.md).

## Develop and study reactions

Node.js **22+** is needed only for offline checks. No server or API key is required for the TradingView indicator. From the repository root:

```sh
npm ci --ignore-scripts --no-audit --no-fund --cache /tmp/indi-npm-cache
npm test
```

Tests cover numerical examples, VWAP, profile volume conservation, RBs, clustering, timeframe consistency and snapshot timing. Synthetic checks do not establish profitability or validate actual NQ rollover behavior.

The [POI reaction study](docs/POI-STUDY.md) accepts real NQ1! 1m OHLCV CSV data. No real-market study has run yet; an export is still required. [CLAUDE.md](CLAUDE.md) describes the current handoff. `REPORT.md` is the historical v0.2 review; its chart-timeframe and nested-request assumptions are superseded.
