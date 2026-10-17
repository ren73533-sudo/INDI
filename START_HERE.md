# INDI v0.1.0 — Download bundle

## Use the indicator

Open `indicators/nq_key_levels.pine`, copy the entire file into a new TradingView Pine Editor indicator, save, and add it to a standard NQ1! 1-minute chart. No local installation is needed for TradingView.

This is the first iteration. TradingView compilation and real-chart validation remain outstanding. The volume profile is an estimate; the VWAP has not been compared with DRW.

## Continue with Claude Code

Open this folder in Claude Code and read `CLAUDE.md`. Original requirements, implementation decisions and a chart-validation checklist are in `docs/`.

## Run offline tests

Node.js 22+ is required only for development tests. Open a terminal in this extracted folder, then run:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm test
```

On macOS/Linux, `bash INSTALL.sh` performs both steps. Dependency installation needs access to registry.npmjs.org. The 17 offline checks passed in the cloud using PineTS 0.11.1; this is not an official TradingView compilation.

The complete source and dependency lockfile are included. Generated dependencies and Git metadata are excluded. `SHA256SUMS` contains the checksums of the packaged files.
