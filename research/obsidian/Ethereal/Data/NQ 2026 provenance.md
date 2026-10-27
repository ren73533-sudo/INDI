---
project: Ethereal
type: data-provenance
status: downloaded-and-validated
created: 2026-10-27
---

# NQ 2026 provenance

The input is a public third-party NQ 1-minute OHLCV archive from [cme-futures-ohlc](https://github.com/axb0306/cme-futures-ohlc). Its README identifies TopstepX/ProjectX as the provider and UTC as the timestamp timezone. The repository separates NQ and MNQ. These provider claims have not been independently authenticated against exchange records.

[Immutable source CSV](https://raw.githubusercontent.com/axb0306/cme-futures-ohlc/60abd3fb6369c6ce0b6a4a65b0f2562fc96b1264/NQ/NQ_1min_20260120_20260415.csv)

| Property | Value |
| --- | --- |
| Source commit | `60abd3fb6369c6ce0b6a4a65b0f2562fc96b1264` |
| Interval | 1 minute |
| Rows | 83,919 |
| First minute open | 2026-01-20 15:56 UTC |
| Last minute open | 2026-04-15 23:29 UTC |
| Raw SHA-256 | `583cd788b035c4b5ca612f8bb0e3e366d627348851c04d68bca295a5db116f61` |
| Normalized SHA-256 | `1c8e870334e2aec4eb0f1d14020b44ec22c2094ececac3d28b711b25ab9eb069` |

Normalization changed only the `datetime` column name to `time` and added an explicit `Z` timezone suffix using the source's UTC declaration. Numerical strings, row order and candle values were preserved. No missing candles were synthesized.

The updater references the NQM26 contract and appends data. Per-bar historical contract identity, rollover stitching and back adjustment are undocumented. The series must not be described as equivalent to TradingView NQ1!. No independent DRW VWAP equivalence or exact tick-entry result follows from this archive.

No explicit data redistribution license was found. The raw CSV is kept in the research workspace and is not included in this notes bundle or uploaded into INDI. The linked public source and checksums support later integrity checks.

See [[Ethereal/Results/2026-10-27 Data validation]] for measured coverage.
