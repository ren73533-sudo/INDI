# INDI — NQ Key Levels & Reversal Zones v0.3.1

**New: [OFI — Orderflow Indicator v1](indicators/ofi.pine)** is an independent Pine v6, 1-minute indicator combining prior-RTH profile edges with failed-excursion and balanced-VWAP rejection setups. [OFI rules and use](docs/OFI.md) · [Frozen backtest/Monte Carlo protocol](research/ofi/v1/protocol.json). Its estimated profile is not DOM or exchange delta. Offline execution is tested; native TradingView verification remains outstanding.

[Initial OFI research results](research/ofi/v1/run-2026-10-29/REPORT.md): the public NQ archive produced five trades (two wins, three losses) under the specified execution model. The later 20-session split had no trades. This is insufficient to establish an edge or a TradingView NQ1! win rate; the report includes all exclusions, source limitations and 10,000 bootstrap paths.

A customizable **TradingView Pine Script v6** indicator for the trader's key levels and confluence zones. Original requirements: [docs/GPT-HANDOFF.md](docs/GPT-HANDOFF.md). No orders, entry arrows, trade alerts or directional bias filter.

**New separate indicator: [幽玄 — Ethereal](indicators/ethereal.pine)** draws green boxes for active Fib STDV inside the band plus another distinct confluence by default and yellow boxes for full qualification, with optional confluence text and β (buy-reversal) / ρ (sell-reversal) symbols. Resting horizontal price areas wait for a return tap, stay fixed while moving references drift, and project right until price invalidation. Version 1.4 adds selectable UTC midnight-open / first-body-swing Fib anchoring, requires in-box Fib by default, uses the DST-aware CME VWAP anchor and fixes the display cap suppressing zone formation. Beyond-wick placement, first-return filtering and Bar Replay are retained. These controls do not establish reversal accuracy. Zone size, tolerance, projection and colors are configurable. [Rules and setup](docs/ETHEREAL.md) · [Download folder](https://github.com/ren73533-sudo/INDI/raw/refs/heads/main/downloads/Ethereal-v1.4.0.zip). The full-display indicator below remains available.

**Full download: [INDI-v0.3.1.zip](https://github.com/ren73533-sudo/INDI/blob/main/downloads/INDI-v0.3.1.zip).** Open the ZIP on GitHub and use its download button. After extraction, read `START_HERE.md`. The source and tests are also available directly in this repository.

## Use in TradingView

1. Open NQ1! with **standard candles**, on **1m, 5m, 10m, 15m, 30m, 1h or 4h**.
2. Paste the complete [indicators/nq_key_levels.pine](indicators/nq_key_levels.pine) into a new Pine Editor indicator. Save and add it to the chart.
3. Load enough 1-minute history for the overnight range, VWAP anchor and prior sessions. Check **1m engine as of** in the panel.
4. Keep historical Fib traces OFF initially. Customize calibration and colors in Settings.

TradingView compilation and real-chart behavior still need external verification. Offline checks use PineTS, a third-party runtime.

The full display is retained: **RB wick boxes, individual Fib levels, VWAP references and curves, VAH / VAL / POC, price labels, colors and calibration**. RB boxes remain visible even when no POI qualifies. The original 71 input IDs, defaults, types, titles and groups are preserved. v0.3.1 removes the extra missing-minute and wall-clock adjacency restrictions added to RB detection in v0.3, restoring the original next-available-source-candle rule.

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
- Missing minutes in the Fib construction window prevent Fib publication. RB candles aggregate available data; an absent minute does not itself disqualify a rejection. Incomplete VWAP / profile initialization is flagged.
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

The older [POI reaction study](docs/POI-STUDY.md) replays the original full-display indicator. The actual-Ethereal research runner is `node tools/run-ethereal-session.mjs --data /path/to/frozen-NQ.csv --mode range` (or `midnight`); it defaults to the January 22–23 pilot and writes derived outputs outside Git. It verifies the frozen data/source hashes, uses continuous initialization and refuses calibration replay entering reserved validation dates. The archive itself is not bundled. Public NQ provider/rollover equivalence to TradingView NQ1! remains unverified.

The [Obsidian notes and local-vault handoff](research/obsidian/README.md) contain the S01 protocol, progress, audit and measured records. The separate trade model is midpoint / planned SL20 / BE60 / TP130; results are gross points and explicit OHLC ambiguity remains unresolved. [CLAUDE.md](CLAUDE.md) describes the handoff. `REPORT.md` is the historical v0.2 review; its chart-timeframe and nested-request assumptions are superseded.
