---
project: Ethereal
type: data-validation
status: completed
date: 2026-10-27
---

# Data validation — 2026-10-27

The downloaded archive was checked and its normalized file was accepted by the existing CSV parser. This is a data-quality result; no indicator reaction study has run.

| Check | Result |
| --- | --- |
| Parsed 1m rows | 83,919 |
| Invalid OHLCV rows | 0 |
| Duplicate/backward timestamps | 0 |
| Prices outside the 0.25-point grid | 0 |
| Zero-volume rows | 0 |
| Gaps exceeding one minute | 71; includes scheduled closures and weekends; do not treat all as data faults |
| UTC dates represented | 74, including partial/non-session dates |
| Complete 00:00–07:30 UTC windows | 59 |
| Dates with that window and all 390 NY RTH minutes | 58 |

The exact latest 20 complete dates were frozen as the proposed validation set before viewing strategy outcomes. The evidence file `Evidence/study-design.json` preserves their list.

Data and source identity: [[Ethereal/Data/NQ 2026 provenance]]. Future per-event horizon checks must still reject missing or insufficient follow-up candles.
