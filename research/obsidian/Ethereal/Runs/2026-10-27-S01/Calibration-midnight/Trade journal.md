# Ethereal trade journal

Fib mode: **midnight**. Session: **NY RTH, 09:30–16:00 America/New_York**. Instrument prices are NQ index points.

Frozen reference model: midpoint resting limit, one position at a time, initial stop **20.00 points**, move stop to modeled fill after **+60.00 points**, target **+130.00 points**, flatten at session close. First band contact is the sole attempt; a missed midpoint consumes it.

All results are gross points. Costs are unspecified. A planned 20-point stop cannot guarantee a 20-point realized maximum during a gap; observed breaches remain visible. One-minute OHLC cannot determine every intrabar path. Ambiguous trades block further entries for that NY session and remain outside resolved win rates.

Contributor text is frozen at zone formation or its recorded yellow upgrade. It is carried into entry for attribution and does not prove every family was still aligned at contact. No news, macro trend or discretionary narrative is inferred from these labels.

| Measure | Value |
| --- | --- |
| Entered / resolved / ambiguous / incomplete | 33 / 32 / 1 / 0 |
| 130-point target win rate among resolved trades | 6.25% (2/32) |
| Positive gross exit rate among resolved trades | 9.38% (3/32) |
| Gross points on resolved trades | -173.75 |
| Planned risk breaches | 0 |

The two rates use resolved trades only. Unknown outcomes can materially change the result; this selected sample is not a complete simulated account path. Positive session exits below the reference target are distinct from target wins.

## trade-00001 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | buy β (green at entry) |
| New York session date | 2026-01-29 |
| Entry UTC minute | 2026-01-29T14:35:00.000Z to 2026-01-29T14:36:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 26076.00 / 26076.00 |
| Previous close / visible box | 26097.25 / 26073.00–26079.25 |
| Initial stop | 26056.00; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 26206.00; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 26136.00 / 26076.00 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 26056.00 |
| Exit UTC minute | 2026-01-29T14:36:00.000Z to 2026-01-29T14:37:00.000Z |
| Exit precision / price | within minute; exact time unknown / 26056.00 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-01-29T01:26:00.000Z / 789.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 10m/15m |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1769649960000\|26073\|26079.25\|-1 |

**Setup narrative:** Green support / buy reversal zone 26073.00–26079.25 was visible before this contact. Its frozen contributor labels were STDV | RB 10m/15m. The prior candle closed at 26097.25; a midpoint limit at 26076.00 was selected before the contact candle high and low were known. The modeled fill was 26076.00, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 26098.00, H 26100.75, L 26057.75, C 26062.50. Penetration beyond the far box edge: 15.25 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00002 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | buy β (green at entry) |
| New York session date | 2026-01-29 |
| Entry UTC minute | 2026-01-29T14:59:00.000Z to 2026-01-29T15:00:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25874.50 / 25874.50 |
| Previous close / visible box | 25885.25 / 25871.50–25877.50 |
| Initial stop | 25854.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 26004.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25934.50 / 25874.50 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25854.50 |
| Exit UTC minute | 2026-01-29T15:00:00.000Z to 2026-01-29T15:01:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25854.50 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-01-27T00:45:00.000Z / 3734.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VAL \| RB 10m |
| Maximum historical family count | 3; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1769474700000\|25871.5\|25877.5\|-1 |

**Setup narrative:** Green support / buy reversal zone 25871.50–25877.50 was visible before this contact. Its frozen contributor labels were STDV | VAL | RB 10m. The prior candle closed at 25885.25; a midpoint limit at 25874.50 was selected before the contact candle high and low were known. The modeled fill was 25874.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25884.00, H 25889.00, L 25858.00, C 25864.50. Penetration beyond the far box edge: 13.50 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00003 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-02 |
| Entry UTC minute | 2026-02-02T14:36:00.000Z to 2026-02-02T14:37:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25700.50 / 25700.50 |
| Previous close / visible box | 25671.25 / 25697.50–25703.50 |
| Initial stop | 25720.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25570.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25640.50 / 25700.50 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25720.50 |
| Exit UTC minute | 2026-02-02T14:37:00.000Z to 2026-02-02T14:38:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25720.50 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-02T01:31:00.000Z / 785.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1769995860000\|25697.5\|25703.5\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25697.50–25703.50 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25671.25; a midpoint limit at 25700.50 was selected before the contact candle high and low were known. The modeled fill was 25700.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25671.50, H 25713.25, L 25669.00, C 25702.25. Penetration beyond the far box edge: 9.75 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00004 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-02 |
| Entry UTC minute | 2026-02-02T14:50:00.000Z to 2026-02-02T14:51:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25784.50 / 25784.50 |
| Previous close / visible box | 25745.25 / 25781.50–25787.50 |
| Initial stop | 25804.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25654.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25724.50 / 25784.50 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25804.50 |
| Exit UTC minute | 2026-02-02T15:05:00.000Z to 2026-02-02T15:06:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25804.50 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-02T03:35:00.000Z / 675.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 5m/15m |
| Maximum historical family count | 3; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 56.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1770003300000\|25781.5\|25787.5\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25781.50–25787.50 was visible before this contact. Its frozen contributor labels were STDV | RB 5m/15m. The prior candle closed at 25745.25; a midpoint limit at 25784.50 was selected before the contact candle high and low were known. The modeled fill was 25784.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25745.00, H 25796.00, L 25743.50, C 25795.25. Penetration beyond the far box edge: 8.50 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00005 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | buy β (green at entry) |
| New York session date | 2026-02-04 |
| Entry UTC minute | 2026-02-04T16:40:00.000Z to 2026-02-04T16:41:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25026.25 / 25026.25 |
| Previous close / visible box | 25038.50 / 25023.25–25029.25 |
| Initial stop | 25006.25; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25156.25; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25086.25 / 25026.25 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25006.25 |
| Exit UTC minute | 2026-02-04T16:40:00.000Z to 2026-02-04T16:41:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25006.25 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-01-21T12:10:00.000Z / 20430.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 5m |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1768997400000\|25023.25\|25029.25\|-1 |

**Setup narrative:** Green support / buy reversal zone 25023.25–25029.25 was visible before this contact. Its frozen contributor labels were STDV | RB 5m. The prior candle closed at 25038.50; a midpoint limit at 25026.25 was selected before the contact candle high and low were known. The modeled fill was 25026.25, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25037.25, H 25042.25, L 25005.50, C 25006.25. Penetration beyond the far box edge: 17.75 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00006 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-06 |
| Entry UTC minute | 2026-02-06T20:50:00.000Z to 2026-02-06T20:51:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25173.25 / 25173.25 |
| Previous close / visible box | 25163.00 / 25170.25–25176.25 |
| Initial stop | 25193.25; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25043.25; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25113.25 / 25173.25 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25193.25 |
| Exit UTC minute | 2026-02-06T20:51:00.000Z to 2026-02-06T20:52:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25193.25 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-05T01:10:00.000Z / 2620.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 3; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1770253800000\|25170.25\|25176.25\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25170.25–25176.25 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25163.00; a midpoint limit at 25173.25 was selected before the contact candle high and low were known. The modeled fill was 25173.25, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25164.25, H 25191.25, L 25158.75, C 25189.25. Penetration beyond the far box edge: 15.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00007 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-09 |
| Entry UTC minute | 2026-02-09T16:46:00.000Z to 2026-02-09T16:47:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25386.00 / 25386.00 |
| Previous close / visible box | 25380.00 / 25383.00–25389.00 |
| Initial stop | 25406.00; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25256.00; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25326.00 / 25386.00 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25406.00 |
| Exit UTC minute | 2026-02-09T17:04:00.000Z to 2026-02-09T17:05:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25406.00 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-09T00:15:00.000Z / 991.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 8.75 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1770596100000\|25383\|25389\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25383.00–25389.00 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25380.00; a midpoint limit at 25386.00 was selected before the contact candle high and low were known. The modeled fill was 25386.00, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25380.00, H 25387.25, L 25378.00, C 25385.25. Penetration beyond the far box edge: 0.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00008 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / break-even-stop |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-09 |
| Entry UTC minute | 2026-02-09T17:11:00.000Z to 2026-02-09T17:12:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25413.75 / 25413.75 |
| Previous close / visible box | 25404.00 / 25410.75–25416.75 |
| Initial stop | 25433.75; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25283.75; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25353.75 / 25413.75 (gross fill-price stop once activated) |
| Break-even activation UTC | 2026-02-09T17:58:00.000Z; within minute; exact time unknown |
| Last confirmed stop state | 25413.75 |
| Exit UTC minute | 2026-02-09T19:24:00.000Z to 2026-02-09T19:25:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25413.75 |
| Realized gross points | 0.00 |
| Zone formation UTC / age at entry | 2026-02-09T10:35:00.000Z / 396.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 101.75 / adverse 2.75 points; not exact held-trade MFE/MAE |
| Zone identifier | 1770633300000\|25410.75\|25416.75\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25410.75–25416.75 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25404.00; a midpoint limit at 25413.75 was selected before the contact candle high and low were known. The modeled fill was 25413.75, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** The position exited flat in gross points. Commissions and execution costs could make the net result negative; this is not a target win.

**Contact candle evidence:** O 25404.50, H 25414.75, L 25404.50, C 25410.75. Penetration beyond the far box edge: 0.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00009 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-10 |
| Entry UTC minute | 2026-02-10T15:06:00.000Z to 2026-02-10T15:07:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25425.75 / 25425.75 |
| Previous close / visible box | 25401.00 / 25422.75–25428.75 |
| Initial stop | 25445.75; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25295.75; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25365.75 / 25425.75 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25445.75 |
| Exit UTC minute | 2026-02-10T15:07:00.000Z to 2026-02-10T15:08:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25445.75 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-10T12:30:00.000Z / 156.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 15m |
| Maximum historical family count | 3; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1770726600000\|25422.75\|25428.75\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25422.75–25428.75 was visible before this contact. Its frozen contributor labels were STDV | RB 15m. The prior candle closed at 25401.00; a midpoint limit at 25425.75 was selected before the contact candle high and low were known. The modeled fill was 25425.75, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25402.25, H 25443.50, L 25391.50, C 25436.25. Penetration beyond the far box edge: 14.75 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00010 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | buy β (green at entry) |
| New York session date | 2026-02-12 |
| Entry UTC minute | 2026-02-12T15:36:00.000Z to 2026-02-12T15:37:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25158.25 / 25158.25 |
| Previous close / visible box | 25175.50 / 25155.25–25161.25 |
| Initial stop | 25138.25; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25288.25; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25218.25 / 25158.25 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25138.25 |
| Exit UTC minute | 2026-02-12T15:38:00.000Z to 2026-02-12T15:39:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25138.25 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-12T05:43:00.000Z / 593.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 5.75 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1770874980000\|25155.25\|25161.25\|-1 |

**Setup narrative:** Green support / buy reversal zone 25155.25–25161.25 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25175.50; a midpoint limit at 25158.25 was selected before the contact candle high and low were known. The modeled fill was 25158.25, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25175.25, H 25175.25, L 25155.25, C 25159.50. Penetration beyond the far box edge: 0.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00011 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | buy β (green at entry) |
| New York session date | 2026-02-12 |
| Entry UTC minute | 2026-02-12T15:40:00.000Z to 2026-02-12T15:41:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25120.75 / 25120.75 |
| Previous close / visible box | 25134.00 / 25117.75–25123.75 |
| Initial stop | 25100.75; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25250.75; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25180.75 / 25120.75 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25100.75 |
| Exit UTC minute | 2026-02-12T15:41:00.000Z to 2026-02-12T15:42:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25100.75 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-12T15:09:00.000Z / 31.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1770908940000\|25117.75\|25123.75\|-1 |

**Setup narrative:** Green support / buy reversal zone 25117.75–25123.75 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25134.00; a midpoint limit at 25120.75 was selected before the contact candle high and low were known. The modeled fill was 25120.75, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25134.00, H 25141.50, L 25110.50, C 25110.50. Penetration beyond the far box edge: 7.25 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00012 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-13 |
| Entry UTC minute | 2026-02-13T15:33:00.000Z to 2026-02-13T15:34:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24902.50 / 24902.50 |
| Previous close / visible box | 24892.50 / 24899.50–24905.50 |
| Initial stop | 24922.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24772.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24842.50 / 24902.50 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 24922.50 |
| Exit UTC minute | 2026-02-13T15:33:00.000Z to 2026-02-13T15:34:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24922.50 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-13T00:40:00.000Z / 893.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1770943200000\|24899.5\|24905.5\|1 |

**Setup narrative:** Green resistance / sell reversal zone 24899.50–24905.50 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 24892.50; a midpoint limit at 24902.50 was selected before the contact candle high and low were known. The modeled fill was 24902.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 24892.75, H 24928.50, L 24892.25, C 24925.25. Penetration beyond the far box edge: 23.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00013 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-13 |
| Entry UTC minute | 2026-02-13T16:56:00.000Z to 2026-02-13T16:57:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24923.25 / 24923.25 |
| Previous close / visible box | 24904.00 / 24920.00–24926.25 |
| Initial stop | 24943.25; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24793.25; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24863.25 / 24923.25 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 24943.25 |
| Exit UTC minute | 2026-02-13T17:13:00.000Z to 2026-02-13T17:14:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24943.25 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-13T15:50:00.000Z / 66.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 10m |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 39.75 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1770997800000\|24920\|24926.25\|1 |

**Setup narrative:** Green resistance / sell reversal zone 24920.00–24926.25 was visible before this contact. Its frozen contributor labels were STDV | RB 10m. The prior candle closed at 24904.00; a midpoint limit at 24923.25 was selected before the contact candle high and low were known. The modeled fill was 24923.25, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 24905.00, H 24934.50, L 24905.00, C 24926.00. Penetration beyond the far box edge: 8.25 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00014 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-17 |
| Entry UTC minute | 2026-02-17T18:40:00.000Z to 2026-02-17T18:41:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24845.25 / 24845.25 |
| Previous close / visible box | 24819.25 / 24842.25–24848.25 |
| Initial stop | 24865.25; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24715.25; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24785.25 / 24845.25 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 24865.25 |
| Exit UTC minute | 2026-02-17T18:55:00.000Z to 2026-02-17T18:56:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24865.25 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-17T02:04:00.000Z / 996.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VAH \| RB 5m/15m |
| Maximum historical family count | 3; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 32.50 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1771293840000\|24842.25\|24848.25\|1 |

**Setup narrative:** Green resistance / sell reversal zone 24842.25–24848.25 was visible before this contact. Its frozen contributor labels were STDV | VAH | RB 5m/15m. The prior candle closed at 24819.25; a midpoint limit at 24845.25 was selected before the contact candle high and low were known. The modeled fill was 24845.25, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 24818.50, H 24854.75, L 24815.75, C 24849.25. Penetration beyond the far box edge: 6.50 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00015 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-18 |
| Entry UTC minute | 2026-02-18T15:03:00.000Z to 2026-02-18T15:04:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24985.00 / 24985.00 |
| Previous close / visible box | 24977.00 / 24982.00–24988.00 |
| Initial stop | 25005.00; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24855.00; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24925.00 / 24985.00 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25005.00 |
| Exit UTC minute | 2026-02-18T15:04:00.000Z to 2026-02-18T15:05:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25005.00 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-13T19:00:00.000Z / 6963.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 15m |
| Maximum historical family count | 3; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1771009200000\|24982\|24988\|1 |

**Setup narrative:** Green resistance / sell reversal zone 24982.00–24988.00 was visible before this contact. Its frozen contributor labels were STDV | RB 15m. The prior candle closed at 24977.00; a midpoint limit at 24985.00 was selected before the contact candle high and low were known. The modeled fill was 24985.00, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 24977.25, H 24987.50, L 24969.75, C 24986.00. Penetration beyond the far box edge: 0.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00016 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | buy β (green at entry) |
| New York session date | 2026-02-19 |
| Entry UTC minute | 2026-02-19T14:35:00.000Z to 2026-02-19T14:36:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24806.50 / 24806.50 |
| Previous close / visible box | 24833.75 / 24803.50–24809.50 |
| Initial stop | 24786.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24936.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24866.50 / 24806.50 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 24786.50 |
| Exit UTC minute | 2026-02-19T14:36:00.000Z to 2026-02-19T14:37:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24786.50 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-19T13:40:00.000Z / 55.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 5m |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1771508400000\|24803.5\|24809.5\|-1 |

**Setup narrative:** Green support / buy reversal zone 24803.50–24809.50 was visible before this contact. Its frozen contributor labels were STDV | RB 5m. The prior candle closed at 24833.75; a midpoint limit at 24806.50 was selected before the contact candle high and low were known. The modeled fill was 24806.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 24834.25, H 24838.00, L 24795.50, C 24806.50. Penetration beyond the far box edge: 8.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00017 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | ambiguous / entry-minute-critical-threshold-order-unknown |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-20 |
| Entry UTC minute | 2026-02-20T15:01:00.000Z to 2026-02-20T15:02:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25063.25 / 25063.25 |
| Previous close / visible box | 24927.75 / 25060.25–25066.25 |
| Initial stop | 25083.25; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24933.25; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25003.25 / 25063.25 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25083.25 |
| Exit UTC minute | 2026-02-20T15:01:00.000Z to 2026-02-20T15:02:00.000Z |
| Exit precision / price | unresolved from 1m OHLC / Unknown |
| Realized gross points | Unresolved |
| Zone formation UTC / age at entry | 2026-02-19T08:15:00.000Z / 1846.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 3; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 0.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1771488900000\|25060.25\|25066.25\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25060.25–25066.25 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 24927.75; a midpoint limit at 25063.25 was selected before the contact candle high and low were known. The modeled fill was 25063.25, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** Unresolved: the minute candles cannot establish the required execution order. No win or loss is assigned. This observation cannot support a precision-entry claim.

**Contact candle evidence:** O 24928.75, H 25077.25, L 24905.75, C 25062.75. Penetration beyond the far box edge: 11.00 points. These extrema are unsequenced and are not an assumed fill path.

**Unresolved ordering:** entry-minute-critical-threshold-order-unknown. Evidence: O 24928.75, H 25077.25, L 24905.75, C 25062.75. outcome excluded from resolved rate; block new entries for the remainder of this NY session

## trade-00018 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | buy β (green at entry) |
| New York session date | 2026-02-24 |
| Entry UTC minute | 2026-02-24T14:33:00.000Z to 2026-02-24T14:34:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24739.00 / 24739.00 |
| Previous close / visible box | 24768.75 / 24736.00–24742.00 |
| Initial stop | 24719.00; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24869.00; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24799.00 / 24739.00 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 24719.00 |
| Exit UTC minute | 2026-02-24T14:34:00.000Z to 2026-02-24T14:35:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24719.00 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-24T02:34:00.000Z / 719.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1771900440000\|24736\|24742\|-1 |

**Setup narrative:** Green support / buy reversal zone 24736.00–24742.00 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 24768.75; a midpoint limit at 24739.00 was selected before the contact candle high and low were known. The modeled fill was 24739.00, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 24768.25, H 24772.50, L 24719.25, C 24722.25. Penetration beyond the far box edge: 16.75 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00019 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-24 |
| Entry UTC minute | 2026-02-24T14:44:00.000Z to 2026-02-24T14:45:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24889.00 / 24889.00 |
| Previous close / visible box | 24866.25 / 24886.00–24892.00 |
| Initial stop | 24909.00; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24759.00; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24829.00 / 24889.00 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 24909.00 |
| Exit UTC minute | 2026-02-24T14:44:00.000Z to 2026-02-24T14:45:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24909.00 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-24T14:05:00.000Z / 39.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 5m |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1771941900000\|24886\|24892\|1 |

**Setup narrative:** Green resistance / sell reversal zone 24886.00–24892.00 was visible before this contact. Its frozen contributor labels were STDV | RB 5m. The prior candle closed at 24866.25; a midpoint limit at 24889.00 was selected before the contact candle high and low were known. The modeled fill was 24889.00, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 24866.75, H 24913.00, L 24866.75, C 24910.75. Penetration beyond the far box edge: 21.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00020 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / break-even-stop |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-24 |
| Entry UTC minute | 2026-02-24T16:13:00.000Z to 2026-02-24T16:14:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25046.50 / 25046.50 |
| Previous close / visible box | 25033.50 / 25043.50–25049.50 |
| Initial stop | 25066.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24916.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24986.50 / 25046.50 (gross fill-price stop once activated) |
| Break-even activation UTC | 2026-02-24T16:31:00.000Z; within minute; exact time unknown |
| Last confirmed stop state | 25046.50 |
| Exit UTC minute | 2026-02-24T17:09:00.000Z to 2026-02-24T17:10:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25046.50 |
| Realized gross points | 0.00 |
| Zone formation UTC / age at entry | 2026-02-23T01:04:00.000Z / 2349.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 77.25 / adverse 0.25 points; not exact held-trade MFE/MAE |
| Zone identifier | 1771808640000\|25043.5\|25049.5\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25043.50–25049.50 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25033.50; a midpoint limit at 25046.50 was selected before the contact candle high and low were known. The modeled fill was 25046.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** The position exited flat in gross points. Commissions and execution costs could make the net result negative; this is not a target win.

**Contact candle evidence:** O 25033.50, H 25047.25, L 25030.75, C 25046.00. Penetration beyond the far box edge: 0.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00021 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-24 |
| Entry UTC minute | 2026-02-24T17:10:00.000Z to 2026-02-24T17:11:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25056.25 / 25056.25 |
| Previous close / visible box | 25050.75 / 25053.00–25059.25 |
| Initial stop | 25076.25; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24926.25; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24996.25 / 25056.25 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25076.25 |
| Exit UTC minute | 2026-02-24T17:12:00.000Z to 2026-02-24T17:13:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25076.25 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-23T00:15:00.000Z / 2455.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1771805700000\|25053\|25059.25\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25053.00–25059.25 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25050.75; a midpoint limit at 25056.25 was selected before the contact candle high and low were known. The modeled fill was 25056.25, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25050.75, H 25069.75, L 25048.75, C 25063.75. Penetration beyond the far box edge: 10.50 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00022 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-03-04 |
| Entry UTC minute | 2026-03-04T15:20:00.000Z to 2026-03-04T15:21:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25044.50 / 25044.50 |
| Previous close / visible box | 25032.75 / 25041.50–25047.50 |
| Initial stop | 25064.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24914.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24984.50 / 25044.50 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25064.50 |
| Exit UTC minute | 2026-03-04T15:21:00.000Z to 2026-03-04T15:22:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25064.50 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-03-03T00:25:00.000Z / 2335.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 10m/15m |
| Maximum historical family count | 3; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1772497500000\|25041.5\|25047.5\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25041.50–25047.50 was visible before this contact. Its frozen contributor labels were STDV | RB 10m/15m. The prior candle closed at 25032.75; a midpoint limit at 25044.50 was selected before the contact candle high and low were known. The modeled fill was 25044.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25033.50, H 25052.50, L 25022.25, C 25052.25. Penetration beyond the far box edge: 5.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00023 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-03-04 |
| Entry UTC minute | 2026-03-04T15:22:00.000Z to 2026-03-04T15:23:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25080.50 / 25080.50 |
| Previous close / visible box | 25076.00 / 25077.50–25083.50 |
| Initial stop | 25100.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24950.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25020.50 / 25080.50 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25100.50 |
| Exit UTC minute | 2026-03-04T15:26:00.000Z to 2026-03-04T15:27:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25100.50 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-03-03T01:57:00.000Z / 2245.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 5m/10m/15m |
| Maximum historical family count | 3; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 13.25 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1772503020000\|25077.5\|25083.5\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25077.50–25083.50 was visible before this contact. Its frozen contributor labels were STDV | RB 5m/10m/15m. The prior candle closed at 25076.00; a midpoint limit at 25080.50 was selected before the contact candle high and low were known. The modeled fill was 25080.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25076.00, H 25082.00, L 25063.00, C 25076.00. Penetration beyond the far box edge: 0.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00024 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / take-profit |
| Position | buy β (green at entry) |
| New York session date | 2026-03-05 |
| Entry UTC minute | 2026-03-05T15:31:00.000Z to 2026-03-05T15:32:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24940.00 / 24940.00 |
| Previous close / visible box | 24953.50 / 24937.00–24943.00 |
| Initial stop | 24920.00; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25070.00; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25000.00 / 24940.00 (gross fill-price stop once activated) |
| Break-even activation UTC | 2026-03-05T15:36:00.000Z; within minute; exact time unknown |
| Last confirmed stop state | 24940.00 |
| Exit UTC minute | 2026-03-05T15:40:00.000Z to 2026-03-05T15:41:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25070.00 |
| Realized gross points | +130.00 |
| Zone formation UTC / age at entry | 2026-03-05T03:52:00.000Z / 699.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 130.00 / adverse 9.50 points; not exact held-trade MFE/MAE |
| Zone identifier | 1772682720000\|24937\|24943\|-1 |

**Setup narrative:** Green support / buy reversal zone 24937.00–24943.00 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 24953.50; a midpoint limit at 24940.00 was selected before the contact candle high and low were known. The modeled fill was 24940.00, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** The frozen 130-point target was reached under this execution model. This isolated outcome does not establish an edge or repeatable tick precision.

**Contact candle evidence:** O 24953.75, H 24959.50, L 24935.50, C 24940.00. Penetration beyond the far box edge: 1.50 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00025 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / take-profit |
| Position | sell ρ (green at entry) |
| New York session date | 2026-03-09 |
| Entry UTC minute | 2026-03-09T13:31:00.000Z to 2026-03-09T13:32:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24517.50 / 24517.50 |
| Previous close / visible box | 24510.00 / 24514.50–24520.50 |
| Initial stop | 24537.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24387.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24457.50 / 24517.50 (gross fill-price stop once activated) |
| Break-even activation UTC | 2026-03-09T13:33:00.000Z; within minute; exact time unknown |
| Last confirmed stop state | 24517.50 |
| Exit UTC minute | 2026-03-09T13:40:00.000Z to 2026-03-09T13:41:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24387.50 |
| Realized gross points | +130.00 |
| Zone formation UTC / age at entry | 2026-03-09T09:29:00.000Z / 242.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 130.00 / adverse 0.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1773048540000\|24514.5\|24520.5\|1 |

**Setup narrative:** Green resistance / sell reversal zone 24514.50–24520.50 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 24510.00; a midpoint limit at 24517.50 was selected before the contact candle high and low were known. The modeled fill was 24517.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** The frozen 130-point target was reached under this execution model. This isolated outcome does not establish an edge or repeatable tick precision.

**Contact candle evidence:** O 24510.00, H 24525.25, L 24481.50, C 24486.00. Penetration beyond the far box edge: 4.75 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00026 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-03-10 |
| Entry UTC minute | 2026-03-10T15:00:00.000Z to 2026-03-10T15:01:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25157.25 / 25157.25 |
| Previous close / visible box | 25151.25 / 25154.25–25160.25 |
| Initial stop | 25177.25; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25027.25; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25097.25 / 25157.25 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25177.25 |
| Exit UTC minute | 2026-03-10T15:01:00.000Z to 2026-03-10T15:02:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25177.25 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-03-09T19:39:00.000Z / 1161.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1773085140000\|25154.25\|25160.25\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25154.25–25160.25 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25151.25; a midpoint limit at 25157.25 was selected before the contact candle high and low were known. The modeled fill was 25157.25, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25151.25, H 25165.00, L 25144.00, C 25165.00. Penetration beyond the far box edge: 4.75 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00027 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-03-10 |
| Entry UTC minute | 2026-03-10T17:17:00.000Z to 2026-03-10T17:18:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25189.75 / 25189.75 |
| Previous close / visible box | 25181.75 / 25186.75–25192.75 |
| Initial stop | 25209.75; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25059.75; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25129.75 / 25189.75 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25209.75 |
| Exit UTC minute | 2026-03-10T17:28:00.000Z to 2026-03-10T17:29:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25209.75 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-03-06T09:26:00.000Z / 6231.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 8.25 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1772789160000\|25186.75\|25192.75\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25186.75–25192.75 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25181.75; a midpoint limit at 25189.75 was selected before the contact candle high and low were known. The modeled fill was 25189.75, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25181.00, H 25191.75, L 25178.00, C 25188.75. Penetration beyond the far box edge: 0.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00028 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / session-close |
| Position | buy β (green at entry) |
| New York session date | 2026-03-11 |
| Entry UTC minute | 2026-03-11T17:38:00.000Z to 2026-03-11T17:39:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24877.50 / 24877.50 |
| Previous close / visible box | 24905.75 / 24874.50–24880.50 |
| Initial stop | 24857.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25007.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24937.50 / 24877.50 (gross fill-price stop once activated) |
| Break-even activation UTC | 2026-03-11T17:40:00.000Z; within minute; exact time unknown |
| Last confirmed stop state | 24877.50 |
| Exit UTC minute | 2026-03-11T19:59:00.000Z to 2026-03-11T20:00:00.000Z |
| Exit precision / price | bar close / 24983.75 |
| Realized gross points | +106.25 |
| Zone formation UTC / age at entry | 2026-03-11T03:37:00.000Z / 841.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 5m |
| Maximum historical family count | 3; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 129.25 / adverse 0.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1773200220000\|24874.5\|24880.5\|-1 |

**Setup narrative:** Green support / buy reversal zone 24874.50–24880.50 was visible before this contact. Its frozen contributor labels were STDV | RB 5m. The prior candle closed at 24905.75; a midpoint limit at 24877.50 was selected before the contact candle high and low were known. The modeled fill was 24877.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** The session exit retained a positive gross result below the reference target. Count it separately from a 130-point target win; it does not demonstrate the requested full move.

**Contact candle evidence:** O 24905.75, H 24909.50, L 24873.50, C 24884.50. Penetration beyond the far box edge: 1.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00029 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | buy β (green at entry) |
| New York session date | 2026-03-12 |
| Entry UTC minute | 2026-03-12T13:55:00.000Z to 2026-03-12T13:56:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24657.00 / 24657.00 |
| Previous close / visible box | 24669.00 / 24654.00–24660.00 |
| Initial stop | 24637.00; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24787.00; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24717.00 / 24657.00 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 24637.00 |
| Exit UTC minute | 2026-03-12T13:56:00.000Z to 2026-03-12T13:57:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24637.00 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-03-12T03:38:00.000Z / 617.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP \| RB 5m |
| Maximum historical family count | 3; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1773286680000\|24654\|24660\|-1 |

**Setup narrative:** Green support / buy reversal zone 24654.00–24660.00 was visible before this contact. Its frozen contributor labels were STDV | VWAP | RB 5m. The prior candle closed at 24669.00; a midpoint limit at 24657.00 was selected before the contact candle high and low were known. The modeled fill was 24657.00, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 24668.50, H 24678.25, L 24644.75, C 24649.00. Penetration beyond the far box edge: 9.25 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00030 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-03-13 |
| Entry UTC minute | 2026-03-13T13:43:00.000Z to 2026-03-13T13:44:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24746.00 / 24746.00 |
| Previous close / visible box | 24726.50 / 24743.00–24749.00 |
| Initial stop | 24766.00; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24616.00; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24686.00 / 24746.00 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 24766.00 |
| Exit UTC minute | 2026-03-13T13:44:00.000Z to 2026-03-13T13:45:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24766.00 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-03-13T00:40:00.000Z / 783.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 5m |
| Maximum historical family count | 3; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1773362400000\|24743\|24749\|1 |

**Setup narrative:** Green resistance / sell reversal zone 24743.00–24749.00 was visible before this contact. Its frozen contributor labels were STDV | RB 5m. The prior candle closed at 24726.50; a midpoint limit at 24746.00 was selected before the contact candle high and low were known. The modeled fill was 24746.00, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 24726.75, H 24754.00, L 24714.50, C 24754.00. Penetration beyond the far box edge: 5.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00031 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-03-16 |
| Entry UTC minute | 2026-03-16T13:35:00.000Z to 2026-03-16T13:36:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24930.50 / 24930.50 |
| Previous close / visible box | 24905.50 / 24927.50–24933.50 |
| Initial stop | 24950.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24800.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24870.50 / 24930.50 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 24950.50 |
| Exit UTC minute | 2026-03-16T13:58:00.000Z to 2026-03-16T13:59:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24950.50 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-03-16T11:37:00.000Z / 118.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 5m/10m |
| Maximum historical family count | 3; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 50.50 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1773661020000\|24927.5\|24933.5\|1 |

**Setup narrative:** Green resistance / sell reversal zone 24927.50–24933.50 was visible before this contact. Its frozen contributor labels were STDV | RB 5m/10m. The prior candle closed at 24905.50; a midpoint limit at 24930.50 was selected before the contact candle high and low were known. The modeled fill was 24930.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 24904.75, H 24931.75, L 24903.50, C 24924.00. Penetration beyond the far box edge: 0.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00032 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-03-17 |
| Entry UTC minute | 2026-03-17T13:32:00.000Z to 2026-03-17T13:33:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25040.75 / 25040.75 |
| Previous close / visible box | 25017.25 / 25037.75–25043.75 |
| Initial stop | 25060.75; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24910.75; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24980.75 / 25040.75 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25060.75 |
| Exit UTC minute | 2026-03-17T13:33:00.000Z to 2026-03-17T13:34:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25060.75 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-03-17T06:01:00.000Z / 451.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 5m/10m |
| Maximum historical family count | 3; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1773727260000\|25037.75\|25043.75\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25037.75–25043.75 was visible before this contact. Its frozen contributor labels were STDV | RB 5m/10m. The prior candle closed at 25017.25; a midpoint limit at 25040.75 was selected before the contact candle high and low were known. The modeled fill was 25040.75, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25018.50, H 25059.50, L 25010.75, C 25058.50. Penetration beyond the far box edge: 15.75 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00033 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-03-17 |
| Entry UTC minute | 2026-03-17T13:46:00.000Z to 2026-03-17T13:47:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25094.25 / 25094.25 |
| Previous close / visible box | 25085.75 / 25091.25–25097.25 |
| Initial stop | 25114.25; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24964.25; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25034.25 / 25094.25 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25114.25 |
| Exit UTC minute | 2026-03-17T13:47:00.000Z to 2026-03-17T13:48:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25114.25 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-03-17T06:01:00.000Z / 465.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 15m |
| Maximum historical family count | 3; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1773727260000\|25091.25\|25097.25\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25091.25–25097.25 was visible before this contact. Its frozen contributor labels were STDV | RB 15m. The prior candle closed at 25085.75; a midpoint limit at 25094.25 was selected before the contact candle high and low were known. The modeled fill was 25094.25, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25085.75, H 25113.00, L 25084.75, C 25111.75. Penetration beyond the far box edge: 15.75 points. These extrema are unsequenced and are not an assumed fill path.
