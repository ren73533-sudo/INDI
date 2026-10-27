---
project: Ethereal
type: research-index
status: calibration-complete-validation-pending
created: 2026-10-27
---

# Ethereal research

The research objective is to reproduce the trader's defined reversal areas more faithfully and measure their subsequent price reactions. Session S01 completed its first 37-date baseline calibration audit. Range reached TP130 in 5/40 resolved trades (12.5%), Midnight in 2/32 (6.25%). Confirmed initial-stop streaks reached seven and eight. These are gross, calibration-only model results; the 20 validation dates remain untouched.

## Active session

- [[Ethereal/Runs/2026-10-27-S01/Report|S01 report]]
- [[Ethereal/Runs/2026-10-27-S01/Progress|S01 progress log]]
- [[Ethereal/Runs/2026-10-27-S01/Calibration-range/Trade journal|Range individual trade journal]]
- [[Ethereal/Runs/2026-10-27-S01/Calibration-midnight/Trade journal|Midnight individual trade journal]]

## Research record

- [[Ethereal/Protocol|Study protocol]]
- [[Ethereal/Data/NQ 2026 provenance|Data provenance and limitations]]
- [[Ethereal/Results/2026-10-27 Data validation|Completed data-validation record]]
- [[Ethereal/Tests/Software checks|Software verification history]]
- [[Ethereal/Baseline configuration|Frozen source and configuration snapshots]]
- [[Ethereal/Decisions|Research decisions and outstanding implementation work]]
- [[Ethereal/Templates/Run report|Run report template]]

## Current evidence

| Item | Status |
| --- | --- |
| Public NQ 1m OHLCV | Downloaded: 83,919 rows, 2026-01-20 through 2026-04-15 |
| Complete overnight and NY RTH dates | 58 |
| Indicator | Ethereal v1.4.0; source identity recorded |
| Software checks | 62 previously reported passing; retained execution log unavailable in the current restored workspace |
| Current market-reaction runner | Actual-Ethereal replay, reaction and trade scorers implemented and independently reviewed |
| Fresh research checks | 52 passed; retained execution log under S01 |
| Market-reaction study | 37-date baseline complete: 84 Range / 74 Midnight first-contact events |
| Trade model | Midpoint / planned SL20 / BE60 / TP130; full journals, CSV and JSON published |
| Yellow areas | Zero visible or retained live yellow RTH minutes in both tested modes; efficacy unassessed |
| Best construction timeframe | Not established; both measured modes use 5m construction |

The 20 latest complete dates are reserved for validation before any strategy-result inspection. Their exact list is in `Evidence/study-design.json`. Data coverage checks do not measure trading performance.
