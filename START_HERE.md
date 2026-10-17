# INDI v0.3.0 — Start here

Copy the entire `indicators/nq_key_levels.pine` file into a new TradingView Pine Editor indicator, save and add it to NQ1! using standard candles.

Supported charts: **1m, 5m, 10m, 15m, 30m, 1h, 4h**. A shared 1m engine keeps the same levels and POI rules across them. Its source timestamp appears in the panel. Forming-minute changes are excluded, with up to a one-minute delay. Keep historical Fib traces OFF for the first test.

All indicator text is English. POIs require at least **two distinct concept types** by default. Settings customize calibration, participation, colors, labels and display.

TradingView compilation and real-market validation remain outstanding. The profile is estimated; the VWAP has not been matched against DRW's source.

Read `README.md`, `docs/TIMEFRAMES.md` and `docs/TRADINGVIEW-CHECKLIST.md`. `CLAUDE.md` contains the current developer handoff. Original handoff/review documents are historical; current conventions are in `docs/DECISIONS.md`.

Node.js 22+ is needed only for offline development checks. From this extracted folder:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm test
```

On macOS/Linux, `bash INSTALL.sh` performs both steps. The POI reaction-study workflow is in `docs/POI-STUDY.md`; real NQ1! 1m CSV data is still needed. No trading profitability is implied by software tests.
