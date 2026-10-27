---
project: Ethereal
type: pilot-report
status: complete
created: 2026-10-27
---

# range — S01 calibration pilot

Scored UTC dates: 2026-01-22, 2026-01-23, 2026-01-26, 2026-01-27, 2026-01-28, 2026-01-29, 2026-01-30, 2026-02-02, 2026-02-03, 2026-02-04, 2026-02-06, 2026-02-09, 2026-02-10, 2026-02-11, 2026-02-12, 2026-02-13, 2026-02-17, 2026-02-18, 2026-02-19, 2026-02-20, 2026-02-23, 2026-02-24, 2026-02-25, 2026-02-26, 2026-02-27, 2026-03-02, 2026-03-03, 2026-03-04, 2026-03-05, 2026-03-06, 2026-03-09, 2026-03-10, 2026-03-11, 2026-03-12, 2026-03-13, 2026-03-16, 2026-03-17. Continuous replay: 2026-01-20T15:56:00.000Z through 2026-03-17T23:59:00.000Z (55439 one-minute bars). Reserved validation data was not replayed.

## Trade results

- Entered: 42; resolved: 40; ambiguous: 2; incomplete: 0.
- TP130: 5; initial stops: 28; break-even stops: 4.
- TP130 rate among resolved trades: 12.5% (5/40). Positive-exit rate: 20.0%.
- Extreme TP rate bounds across entered trades: 11.9%–16.7%. These are outcome bounds, not confidence intervals or a complete account path.
- Gross points on resolved trades: 199.75; planned-risk violations due to stop gaps: 0.

| Trade | Date UTC / entry minute | Side | NQ fill | Grade | Gross points | Status / exit |
|---|---|---|---:|---|---:|---|
| trade-00001 | 2026-01-26T14:45:00.000Z | sell | 25833.75 | green | -20 | closed / stop-loss |
| trade-00002 | 2026-01-26T15:19:00.000Z | sell | 25868 | green | -20 | closed / stop-loss |
| trade-00003 | 2026-01-27T15:38:00.000Z | sell | 26090.25 | green | -20 | closed / stop-loss |
| trade-00004 | 2026-01-29T15:14:00.000Z | buy | 25730.75 | green | 0 | closed / break-even-stop |
| trade-00005 | 2026-01-29T15:40:00.000Z | buy | 25645 | green | -20 | closed / stop-loss |
| trade-00006 | 2026-01-29T15:50:00.000Z | buy | 25583.5 | green | -20 | closed / stop-loss |
| trade-00007 | 2026-02-03T15:13:00.000Z | buy | 25537.5 | green | 0 | closed / break-even-stop |
| trade-00008 | 2026-02-04T15:00:00.000Z | buy | 25154.5 | green | -20 | closed / stop-loss |
| trade-00009 | 2026-02-04T16:40:00.000Z | buy | 25011.75 | green | -20 | closed / stop-loss |
| trade-00010 | 2026-02-06T14:45:00.000Z | sell | 24934.25 | green | -20 | closed / stop-loss |
| trade-00011 | 2026-02-06T16:21:00.000Z | sell | 25017.75 | green | -20 | closed / stop-loss |
| trade-00012 | 2026-02-10T15:06:00.000Z | sell | 25434.25 | green | 0 | closed / break-even-stop |
| trade-00013 | 2026-02-10T20:55:00.000Z | buy | 25211.5 | green | 8 | closed / session-close |
| trade-00014 | 2026-02-11T15:24:00.000Z | buy | 25066.5 | green | 130 | closed / take-profit |
| trade-00015 | 2026-02-12T15:55:00.000Z | buy | 25041 | green | -20 | closed / stop-loss |
| trade-00016 | 2026-02-12T16:02:00.000Z | buy | 24998 | green | -20 | closed / stop-loss |
| trade-00017 | 2026-02-12T16:07:00.000Z | buy | 24952 | green | -20 | closed / stop-loss |
| trade-00018 | 2026-02-12T16:16:00.000Z | buy | 24904.5 | green | -20 | closed / stop-loss |
| trade-00019 | 2026-02-12T16:25:00.000Z | buy | 24857.25 | green | -20 | closed / stop-loss |
| trade-00020 | 2026-02-18T15:04:00.000Z | sell | 25007.25 | green | -20 | closed / stop-loss |
| trade-00021 | 2026-02-18T16:05:00.000Z | sell | 25105.75 | green | -20 | closed / stop-loss |
| trade-00022 | 2026-02-20T14:30:00.000Z | buy | 24692.5 | green | 130 | closed / take-profit |
| trade-00023 | 2026-02-20T15:01:00.000Z | sell | 25041.25 | green | unresolved | ambiguous / entry-minute-critical-threshold-order-unknown |
| trade-00024 | 2026-02-25T14:30:00.000Z | sell | 25186.75 | green | -20 | closed / stop-loss |
| trade-00025 | 2026-02-25T14:31:00.000Z | sell | 25231 | green | -20 | closed / stop-loss |
| trade-00026 | 2026-02-25T14:46:00.000Z | sell | 25312 | green | -20 | closed / stop-loss |
| trade-00027 | 2026-02-25T14:58:00.000Z | sell | 25352.5 | green | 0 | closed / break-even-stop |
| trade-00028 | 2026-02-26T15:12:00.000Z | buy | 25126.25 | green | -20 | closed / stop-loss |
| trade-00029 | 2026-02-26T15:15:00.000Z | buy | 25052.5 | green | -20 | closed / stop-loss |
| trade-00030 | 2026-02-26T15:16:00.000Z | buy | 25015.5 | green | -20 | closed / stop-loss |
| trade-00031 | 2026-02-26T15:18:00.000Z | buy | 24978.75 | green | -20 | closed / stop-loss |
| trade-00032 | 2026-02-26T15:34:00.000Z | buy | 24866.5 | green | 130 | closed / take-profit |
| trade-00033 | 2026-02-27T14:43:00.000Z | buy | 24785.5 | green | 130 | closed / take-profit |
| trade-00034 | 2026-03-09T16:03:00.000Z | sell | 24677 | green | -20 | closed / stop-loss |
| trade-00035 | 2026-03-09T19:38:00.000Z | sell | 25048.75 | green | 56.5 | closed / session-close |
| trade-00036 | 2026-03-10T17:28:00.000Z | sell | 25214 | green | 130 | closed / take-profit |
| trade-00037 | 2026-03-12T13:55:00.000Z | buy | 24652.5 | green | -20 | closed / stop-loss |
| trade-00038 | 2026-03-13T19:40:00.000Z | buy | 24352.75 | green | 45.25 | closed / session-close |
| trade-00039 | 2026-03-16T13:33:00.000Z | sell | 24921 | green | -20 | closed / stop-loss |
| trade-00040 | 2026-03-16T13:58:00.000Z | sell | 24955 | green | -20 | closed / stop-loss |
| trade-00041 | 2026-03-16T19:09:00.000Z | sell | 24988.75 | green | unresolved | ambiguous / entry-minute-critical-threshold-order-unknown |
| trade-00042 | 2026-03-17T13:32:00.000Z | sell | 25056.25 | green | -20 | closed / stop-loss |

The exact entry prices, stops, targets, break-even state, exits, frozen contributor evidence, mechanical narrative and review opinion are in Trades.csv and Trades.json. Contributor text records formation/upgrade evidence; it does not prove ongoing alignment at entry. Stops are planned at 20 points; observed gaps are reported without falsely capping realized losses. No costs have been supplied, so all results are gross points. A zero-point exit is gross break-even only. Ambiguous paths block further entries that NY session.

## Independent reaction benchmark

- 5 minutes: 84/84 complete events; favorable-first 37, adverse-first 35, ambiguous 5, neither 7.
- 15 minutes: 84/84 complete events; favorable-first 41, adverse-first 38, ambiguous 5, neither 0.
- 30 minutes: 84/84 complete events; favorable-first 41, adverse-first 38, ambiguous 5, neither 0.

This is a separate ±15-point benchmark measured after the contact candle close; it is not the trade win rate. Overlapping zones and horizons are dependent observations.

## Readiness and anchoring

- 2026-01-22: 390/390 RTH minutes ready; 2 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-01-23: 390/390 RTH minutes ready; 4 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-01-26: 390/390 RTH minutes ready; 14 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-01-27: 390/390 RTH minutes ready; 12 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-01-28: 390/390 RTH minutes ready; 8 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-01-29: 390/390 RTH minutes ready; 16 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-01-30: 390/390 RTH minutes ready; 12 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-02: 390/390 RTH minutes ready; 12 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-03: 390/390 RTH minutes ready; 17 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-04: 390/390 RTH minutes ready; 18 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-06: 390/390 RTH minutes ready; 12 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-09: 390/390 RTH minutes ready; 10 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-10: 390/390 RTH minutes ready; 13 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-11: 390/390 RTH minutes ready; 21 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-12: 390/390 RTH minutes ready; 20 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-13: 390/390 RTH minutes ready; 8 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-17: 390/390 RTH minutes ready; 8 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-18: 390/390 RTH minutes ready; 16 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-19: 390/390 RTH minutes ready; 8 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-20: 390/390 RTH minutes ready; 20 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-23: 390/390 RTH minutes ready; 16 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-24: 390/390 RTH minutes ready; 15 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-25: 390/390 RTH minutes ready; 18 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-26: 390/390 RTH minutes ready; 23 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-02-27: 390/390 RTH minutes ready; 10 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-02: 390/390 RTH minutes ready; 10 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-03: 390/390 RTH minutes ready; 8 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-04: 390/390 RTH minutes ready; 9 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-05: 390/390 RTH minutes ready; 9 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-06: 390/390 RTH minutes ready; 9 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-09: 390/390 RTH minutes ready; 13 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-10: 390/390 RTH minutes ready; 9 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-11: 390/390 RTH minutes ready; 11 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-12: 390/390 RTH minutes ready; 12 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-13: 390/390 RTH minutes ready; 9 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-16: 390/390 RTH minutes ready; 12 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.
- 2026-03-17: 390/390 RTH minutes ready; 10 distinct visible RTH zones; 0 distinct visible yellow RTH zones; visible yellow on 0 minutes, retained yellow on 0 minutes.

Days.json preserves the observed anchors and leg size, readiness at RTH open, and visible versus retained zone counts. Visibility counts are not trade signals or independent samples.

## Runtime and limits

Replay: 303.87 seconds. Total replay/scoring: 305.28 seconds. Peak process RSS: 5286.0 MiB. Runtime: PineTS 0.11.1; third-party runtime, not TradingView. This does not certify compilation or execution in TradingView.

The public NQ archive claims TopstepX/ProjectX origin. Exact per-bar contracts, rollover and TradingView NQ1! equivalence remain unverified. The finite archive prefix cannot reconstruct earlier persistent zones. This small calibration pilot cannot establish a reliable win rate, a best timeframe or an optimal calibration. No settings were tuned from these outcomes. Summary.json records hashes, tool identities and effective settings; raw market data is not redistributed here.
