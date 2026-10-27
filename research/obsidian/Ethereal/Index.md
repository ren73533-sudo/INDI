---
project: Ethereal
type: research-index
status: session-started
created: 2026-10-27
---

# Ethereal research

The research objective is to reproduce the trader's defined reversal areas more faithfully and measure their subsequent price reactions. The current work has acquired and validated a historical dataset. Session S01 is now implementing and verifying the actual-Ethereal replay and trade model. No market outcomes have been produced at this checkpoint.

## Active session

- [[Ethereal/Runs/2026-10-27-S01/Report|S01 report]]
- [[Ethereal/Runs/2026-10-27-S01/Progress|S01 progress log]]

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
| Current market-reaction runner | Actual-Ethereal adapter/scorers under implementation |
| Market-reaction study | Session S01 started; pilot not executed yet |
| Trade model | Midpoint / planned SL20 / BE60 / TP130 defined; outcomes not measured yet |

The 20 latest complete dates are reserved for validation before any strategy-result inspection. Their exact list is in `Evidence/study-design.json`. Data coverage checks do not measure trading performance.
