---
project: Ethereal
type: pilot-report
status: complete
created: 2026-10-27
---

# midnight — S01 calibration pilot

Scored UTC dates: 2026-01-22, 2026-01-23, 2026-01-26, 2026-01-27, 2026-01-28, 2026-01-29, 2026-01-30, 2026-02-02, 2026-02-03, 2026-02-04, 2026-02-06, 2026-02-09, 2026-02-10, 2026-02-11, 2026-02-12, 2026-02-13, 2026-02-17, 2026-02-18, 2026-02-19, 2026-02-20, 2026-02-23, 2026-02-24, 2026-02-25, 2026-02-26, 2026-02-27, 2026-03-02, 2026-03-03, 2026-03-04, 2026-03-05, 2026-03-06, 2026-03-09, 2026-03-10, 2026-03-11, 2026-03-12, 2026-03-13, 2026-03-16, 2026-03-17. Continuous replay: 2026-01-20T15:56:00.000Z through 2026-03-17T23:59:00.000Z (55439 one-minute bars). Reserved validation data was not replayed.

## Trade results

- Entered: 33; resolved: 32; ambiguous: 1; incomplete: 0.
- TP130: 2; initial stops: 27; break-even stops: 2.
- TP130 rate among resolved trades: 6.3% (2/32). Positive-exit rate: 9.4%.
- Extreme TP rate bounds across entered trades: 6.1%–9.1%. These are outcome bounds, not confidence intervals or a complete account path.
- Gross points on resolved trades: -173.75; planned-risk violations due to stop gaps: 0.

| Trade | Date UTC / entry minute | Side | NQ fill | Grade | Gross points | Status / exit |
|---|---|---|---:|---|---:|---|
| trade-00001 | 2026-01-29T14:35:00.000Z | buy | 26076 | green | -20 | closed / stop-loss |
| trade-00002 | 2026-01-29T14:59:00.000Z | buy | 25874.5 | green | -20 | closed / stop-loss |
| trade-00003 | 2026-02-02T14:36:00.000Z | sell | 25700.5 | green | -20 | closed / stop-loss |
| trade-00004 | 2026-02-02T14:50:00.000Z | sell | 25784.5 | green | -20 | closed / stop-loss |
| trade-00005 | 2026-02-04T16:40:00.000Z | buy | 25026.25 | green | -20 | closed / stop-loss |
| trade-00006 | 2026-02-06T20:50:00.000Z | sell | 25173.25 | green | -20 | closed / stop-loss |
| trade-00007 | 2026-02-09T16:46:00.000Z | sell | 25386 | green | -20 | closed / stop-loss |
| trade-00008 | 2026-02-09T17:11:00.000Z | sell | 25413.75 | green | 0 | closed / break-even-stop |
| trade-00009 | 2026-02-10T15:06:00.000Z | sell | 25425.75 | green | -20 | closed / stop-loss |
| trade-00010 | 2026-02-12T15:36:00.000Z | buy | 25158.25 | green | -20 | closed / stop-loss |
| trade-00011 | 2026-02-12T15:40:00.000Z | buy | 25120.75 | green | -20 | closed / stop-loss |
| trade-00012 | 2026-02-13T15:33:00.000Z | sell | 24902.5 | green | -20 | closed / stop-loss |
| trade-00013 | 2026-02-13T16:56:00.000Z | sell | 24923.25 | green | -20 | closed / stop-loss |
| trade-00014 | 2026-02-17T18:40:00.000Z | sell | 24845.25 | green | -20 | closed / stop-loss |
| trade-00015 | 2026-02-18T15:03:00.000Z | sell | 24985 | green | -20 | closed / stop-loss |
| trade-00016 | 2026-02-19T14:35:00.000Z | buy | 24806.5 | green | -20 | closed / stop-loss |
| trade-00017 | 2026-02-20T15:01:00.000Z | sell | 25063.25 | green | unresolved | ambiguous / entry-minute-critical-threshold-order-unknown |
| trade-00018 | 2026-02-24T14:33:00.000Z | buy | 24739 | green | -20 | closed / stop-loss |
| trade-00019 | 2026-02-24T14:44:00.000Z | sell | 24889 | green | -20 | closed / stop-loss |
| trade-00020 | 2026-02-24T16:13:00.000Z | sell | 25046.5 | green | 0 | closed / break-even-stop |
| trade-00021 | 2026-02-24T17:10:00.000Z | sell | 25056.25 | green | -20 | closed / stop-loss |
| trade-00022 | 2026-03-04T15:20:00.000Z | sell | 25044.5 | green | -20 | closed / stop-loss |
| trade-00023 | 2026-03-04T15:22:00.000Z | sell | 25080.5 | green | -20 | closed / stop-loss |
| trade-00024 | 2026-03-05T15:31:00.000Z | buy | 24940 | green | 130 | closed / take-profit |
| trade-00025 | 2026-03-09T13:31:00.000Z | sell | 24517.5 | green | 130 | closed / take-profit |
| trade-00026 | 2026-03-10T15:00:00.000Z | sell | 25157.25 | green | -20 | closed / stop-loss |
| trade-00027 | 2026-03-10T17:17:00.000Z | sell | 25189.75 | green | -20 | closed / stop-loss |
| trade-00028 | 2026-03-11T17:38:00.000Z | buy | 24877.5 | green | 106.25 | closed / session-close |
| trade-00029 | 2026-03-12T13:55:00.000Z | buy | 24657 | green | -20 | closed / stop-loss |
| trade-00030 | 2026-03-13T13:43:00.000Z | sell | 24746 | green | -20 | closed / stop-loss |
| trade-00031 | 2026-03-16T13:35:00.000Z | sell | 24930.5 | green | -20 | closed / stop-loss |
| trade-00032 | 2026-03-17T13:32:00.000Z | sell | 25040.75 | green | -20 | closed / stop-loss |
| trade-00033 | 2026-03-17T13:46:00.000Z | sell | 25094.25 | green | -20 | closed / stop-loss |

The exact entry prices, stops, targets, break-even state, exits, frozen contributor evidence, mechanical narrative and review opinion are in Trades.csv and Trades.json. Contributor text records formation/upgrade evidence; it does not prove ongoing alignment at entry. Stops are planned at 20 points; observed gaps are reported without falsely capping realized losses. No costs have been supplied, so all results are gross points. A zero-point exit is gross break-even only. Ambiguous paths block further entries that NY session.

## Independent reaction benchmark

- 5 minutes: 74/74 complete events; favorable-first 29, adverse-first 34, ambiguous 1, neither 10.
- 15 minutes: 74/74 complete events; favorable-first 36, adverse-first 37, ambiguous 1, neither 0.
- 30 minutes: 74/74 complete events; favorable-first 36, adverse-first 37, ambiguous 1, neither 0.

This is a separate ±15-point benchmark measured after the contact candle close; it is not the trade win rate. Overlapping zones and horizons are dependent observations.

## Readiness and anchoring

- 2026-01-22: 390/390 RTH minutes ready; 4 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-01-23: 390/390 RTH minutes ready; 4 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-01-26: 390/390 RTH minutes ready; 8 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-01-27: 390/390 RTH minutes ready; 8 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-01-28: 390/390 RTH minutes ready; 8 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-01-29: 390/390 RTH minutes ready; 18 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-01-30: 390/390 RTH minutes ready; 12 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-02: 390/390 RTH minutes ready; 16 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-03: 390/390 RTH minutes ready; 10 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-04: 390/390 RTH minutes ready; 10 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-06: 390/390 RTH minutes ready; 13 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-09: 390/390 RTH minutes ready; 12 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-10: 390/390 RTH minutes ready; 16 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-11: 390/390 RTH minutes ready; 13 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-12: 390/390 RTH minutes ready; 19 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-13: 390/390 RTH minutes ready; 14 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-17: 390/390 RTH minutes ready; 17 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-18: 390/390 RTH minutes ready; 13 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-19: 390/390 RTH minutes ready; 13 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-20: 390/390 RTH minutes ready; 16 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-23: 390/390 RTH minutes ready; 13 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-24: 390/390 RTH minutes ready; 20 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-25: 390/390 RTH minutes ready; 11 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-26: 390/390 RTH minutes ready; 11 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-27: 390/390 RTH minutes ready; 9 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-02: 390/390 RTH minutes ready; 11 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-03: 390/390 RTH minutes ready; 12 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-04: 390/390 RTH minutes ready; 20 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-05: 390/390 RTH minutes ready; 13 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-06: 390/390 RTH minutes ready; 15 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-09: 390/390 RTH minutes ready; 12 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-10: 390/390 RTH minutes ready; 18 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-11: 390/390 RTH minutes ready; 14 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-12: 390/390 RTH minutes ready; 11 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-13: 390/390 RTH minutes ready; 12 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-16: 390/390 RTH minutes ready; 14 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-17: 390/390 RTH minutes ready; 14 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.

Days.json preserves the observed anchors and leg size, readiness at RTH open, and visible versus retained zone counts. Visibility counts are not trade signals or independent samples.

## Runtime and limits

Replay: 280.43 seconds. Total replay/scoring: 282.00 seconds. Peak process RSS: 5136.5 MiB. Runtime: PineTS 0.11.1; third-party runtime, not TradingView. This does not certify compilation or execution in TradingView.

The public NQ archive claims TopstepX/ProjectX origin. Exact per-bar contracts, rollover and TradingView NQ1! equivalence remain unverified. The finite archive prefix cannot reconstruct earlier persistent zones. This small calibration pilot cannot establish a reliable win rate, a best timeframe or an optimal calibration. No settings were tuned from these outcomes. Summary.json records hashes, tool identities and effective settings; raw market data is not redistributed here.
