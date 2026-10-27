---
project: Ethereal
type: research-index
status: prepared
created: 2026-10-27
---

# Ethereal research

The research objective is to reproduce the trader's defined reversal areas more faithfully and measure their subsequent price reactions. The current work has acquired and validated a historical dataset. No Ethereal market-reaction results have been produced yet.

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
| Current market-reaction runner | Needs adaptation from the original full-display indicator to Ethereal |
| Market-reaction study | Not run |
| Trade P&L / win rate | Not defined or measured |

The 20 latest complete dates are reserved for validation before any strategy-result inspection. Their exact list is in `Evidence/study-design.json`. Data coverage checks do not measure trading performance.
