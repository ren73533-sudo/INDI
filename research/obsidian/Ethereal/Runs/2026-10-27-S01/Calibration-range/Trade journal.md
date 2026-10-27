# Ethereal trade journal

Fib mode: **range**. Session: **NY RTH, 09:30–16:00 America/New_York**. Instrument prices are NQ index points.

Frozen reference model: midpoint resting limit, one position at a time, initial stop **20.00 points**, move stop to modeled fill after **+60.00 points**, target **+130.00 points**, flatten at session close. First band contact is the sole attempt; a missed midpoint consumes it.

All results are gross points. Costs are unspecified. A planned 20-point stop cannot guarantee a 20-point realized maximum during a gap; observed breaches remain visible. One-minute OHLC cannot determine every intrabar path. Ambiguous trades block further entries for that NY session and remain outside resolved win rates.

Contributor text is frozen at zone formation or its recorded yellow upgrade. It is carried into entry for attribution and does not prove every family was still aligned at contact. No news, macro trend or discretionary narrative is inferred from these labels.

| Measure | Value |
| --- | --- |
| Entered / resolved / ambiguous / incomplete | 42 / 40 / 2 / 0 |
| 130-point target win rate among resolved trades | 12.50% (5/40) |
| Positive gross exit rate among resolved trades | 20.00% (8/40) |
| Gross points on resolved trades | +199.75 |
| Planned risk breaches | 0 |

The two rates use resolved trades only. Unknown outcomes can materially change the result; this selected sample is not a complete simulated account path. Positive session exits below the reference target are distinct from target wins.

## trade-00001 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-01-26 |
| Entry UTC minute | 2026-01-26T14:45:00.000Z to 2026-01-26T14:46:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25833.75 / 25833.75 |
| Previous close / visible box | 25816.25 / 25830.75–25836.75 |
| Initial stop | 25853.75; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25703.75; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25773.75 / 25833.75 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25853.75 |
| Exit UTC minute | 2026-01-26T15:17:00.000Z to 2026-01-26T15:18:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25853.75 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-01-26T08:59:00.000Z / 346.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 30.75 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1769417940000\|25830.75\|25836.75\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25830.75–25836.75 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25816.25; a midpoint limit at 25833.75 was selected before the contact candle high and low were known. The modeled fill was 25833.75, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25816.75, H 25834.00, L 25816.75, C 25826.00. Penetration beyond the far box edge: 0.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00002 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-01-26 |
| Entry UTC minute | 2026-01-26T15:19:00.000Z to 2026-01-26T15:20:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25868.00 / 25868.00 |
| Previous close / visible box | 25856.75 / 25865.00–25871.00 |
| Initial stop | 25888.00; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25738.00; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25808.00 / 25868.00 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25888.00 |
| Exit UTC minute | 2026-01-26T15:52:00.000Z to 2026-01-26T15:53:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25888.00 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-01-26T14:33:00.000Z / 46.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 34.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1769437980000\|25865\|25871\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25865.00–25871.00 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25856.75; a midpoint limit at 25868.00 was selected before the contact candle high and low were known. The modeled fill was 25868.00, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25856.50, H 25873.75, L 25852.75, C 25871.25. Penetration beyond the far box edge: 2.75 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00003 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-01-27 |
| Entry UTC minute | 2026-01-27T15:38:00.000Z to 2026-01-27T15:39:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 26090.25 / 26090.25 |
| Previous close / visible box | 26079.75 / 26087.25–26093.25 |
| Initial stop | 26110.25; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25960.25; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 26030.25 / 26090.25 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 26110.25 |
| Exit UTC minute | 2026-01-27T20:13:00.000Z to 2026-01-27T20:14:00.000Z |
| Exit precision / price | within minute; exact time unknown / 26110.25 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-01-26T16:31:00.000Z / 1387.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 52.25 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1769445060000\|26087.25\|26093.25\|1 |

**Setup narrative:** Green resistance / sell reversal zone 26087.25–26093.25 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 26079.75; a midpoint limit at 26090.25 was selected before the contact candle high and low were known. The modeled fill was 26090.25, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 26080.00, H 26091.25, L 26078.25, C 26091.00. Penetration beyond the far box edge: 0.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00004 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / break-even-stop |
| Position | buy β (green at entry) |
| New York session date | 2026-01-29 |
| Entry UTC minute | 2026-01-29T15:14:00.000Z to 2026-01-29T15:15:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25730.75 / 25730.75 |
| Previous close / visible box | 25759.75 / 25727.75–25734.00 |
| Initial stop | 25710.75; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25860.75; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25790.75 / 25730.75 (gross fill-price stop once activated) |
| Break-even activation UTC | 2026-01-29T15:20:00.000Z; within minute; exact time unknown |
| Last confirmed stop state | 25730.75 |
| Exit UTC minute | 2026-01-29T15:29:00.000Z to 2026-01-29T15:30:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25730.75 |
| Realized gross points | 0.00 |
| Zone formation UTC / age at entry | 2026-01-29T07:30:00.000Z / 464.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 5m |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 92.00 / adverse 10.50 points; not exact held-trade MFE/MAE |
| Zone identifier | 1769671800000\|25727.75\|25734\|-1 |

**Setup narrative:** Green support / buy reversal zone 25727.75–25734.00 was visible before this contact. Its frozen contributor labels were STDV | RB 5m. The prior candle closed at 25759.75; a midpoint limit at 25730.75 was selected before the contact candle high and low were known. The modeled fill was 25730.75, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** The position exited flat in gross points. Commissions and execution costs could make the net result negative; this is not a target win.

**Contact candle evidence:** O 25760.25, H 25761.00, L 25718.25, C 25721.00. Penetration beyond the far box edge: 9.50 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00005 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | buy β (green at entry) |
| New York session date | 2026-01-29 |
| Entry UTC minute | 2026-01-29T15:40:00.000Z to 2026-01-29T15:41:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25645.00 / 25645.00 |
| Previous close / visible box | 25657.75 / 25642.00–25648.25 |
| Initial stop | 25625.00; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25775.00; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25705.00 / 25645.00 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25625.00 |
| Exit UTC minute | 2026-01-29T15:42:00.000Z to 2026-01-29T15:43:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25625.00 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-01-28T07:30:00.000Z / 1930.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 5m |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 12.25 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1769585400000\|25642\|25648.25\|-1 |

**Setup narrative:** Green support / buy reversal zone 25642.00–25648.25 was visible before this contact. Its frozen contributor labels were STDV | RB 5m. The prior candle closed at 25657.75; a midpoint limit at 25645.00 was selected before the contact candle high and low were known. The modeled fill was 25645.00, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25660.25, H 25661.00, L 25629.50, C 25634.75. Penetration beyond the far box edge: 12.50 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00006 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | buy β (green at entry) |
| New York session date | 2026-01-29 |
| Entry UTC minute | 2026-01-29T15:50:00.000Z to 2026-01-29T15:51:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25583.50 / 25583.50 |
| Previous close / visible box | 25603.25 / 25580.50–25586.50 |
| Initial stop | 25563.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25713.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25643.50 / 25583.50 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25563.50 |
| Exit UTC minute | 2026-01-29T15:51:00.000Z to 2026-01-29T15:52:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25563.50 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-01-27T07:30:00.000Z / 3380.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 5m/15m |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1769499000000\|25580.5\|25586.5\|-1 |

**Setup narrative:** Green support / buy reversal zone 25580.50–25586.50 was visible before this contact. Its frozen contributor labels were STDV | RB 5m/15m. The prior candle closed at 25603.25; a midpoint limit at 25583.50 was selected before the contact candle high and low were known. The modeled fill was 25583.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25601.25, H 25602.50, L 25570.75, C 25575.75. Penetration beyond the far box edge: 9.75 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00007 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / break-even-stop |
| Position | buy β (green at entry) |
| New York session date | 2026-02-03 |
| Entry UTC minute | 2026-02-03T15:13:00.000Z to 2026-02-03T15:14:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25537.50 / 25537.50 |
| Previous close / visible box | 25554.00 / 25534.50–25540.50 |
| Initial stop | 25517.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25667.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25597.50 / 25537.50 (gross fill-price stop once activated) |
| Break-even activation UTC | 2026-02-03T15:20:00.000Z; within minute; exact time unknown |
| Last confirmed stop state | 25537.50 |
| Exit UTC minute | 2026-02-03T15:23:00.000Z to 2026-02-03T15:24:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25537.50 |
| Realized gross points | 0.00 |
| Zone formation UTC / age at entry | 2026-02-03T14:57:00.000Z / 16.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 5m |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 67.50 / adverse 7.50 points; not exact held-trade MFE/MAE |
| Zone identifier | 1770130620000\|25534.5\|25540.5\|-1 |

**Setup narrative:** Green support / buy reversal zone 25534.50–25540.50 was visible before this contact. Its frozen contributor labels were STDV | RB 5m. The prior candle closed at 25554.00; a midpoint limit at 25537.50 was selected before the contact candle high and low were known. The modeled fill was 25537.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** The position exited flat in gross points. Commissions and execution costs could make the net result negative; this is not a target win.

**Contact candle evidence:** O 25552.25, H 25566.25, L 25534.75, C 25540.75. Penetration beyond the far box edge: 0.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00008 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | buy β (green at entry) |
| New York session date | 2026-02-04 |
| Entry UTC minute | 2026-02-04T15:00:00.000Z to 2026-02-04T15:01:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25154.50 / 25154.50 |
| Previous close / visible box | 25194.25 / 25151.50–25157.50 |
| Initial stop | 25134.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25284.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25214.50 / 25154.50 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25134.50 |
| Exit UTC minute | 2026-02-04T15:01:00.000Z to 2026-02-04T15:02:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25134.50 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-02T02:51:00.000Z / 3609.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 5m/10m |
| Maximum historical family count | 3; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1770000660000\|25151.5\|25157.5\|-1 |

**Setup narrative:** Green support / buy reversal zone 25151.50–25157.50 was visible before this contact. Its frozen contributor labels were STDV | RB 5m/10m. The prior candle closed at 25194.25; a midpoint limit at 25154.50 was selected before the contact candle high and low were known. The modeled fill was 25154.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25194.25, H 25194.25, L 25146.50, C 25152.50. Penetration beyond the far box edge: 5.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00009 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | buy β (green at entry) |
| New York session date | 2026-02-04 |
| Entry UTC minute | 2026-02-04T16:40:00.000Z to 2026-02-04T16:41:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25011.75 / 25011.75 |
| Previous close / visible box | 25038.50 / 25008.75–25014.75 |
| Initial stop | 24991.75; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25141.75; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25071.75 / 25011.75 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 24991.75 |
| Exit UTC minute | 2026-02-04T16:43:00.000Z to 2026-02-04T16:44:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24991.75 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-01-26T16:29:00.000Z / 12971.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 5m |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 3.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1769444940000\|25008.75\|25014.75\|-1 |

**Setup narrative:** Green support / buy reversal zone 25008.75–25014.75 was visible before this contact. Its frozen contributor labels were STDV | RB 5m. The prior candle closed at 25038.50; a midpoint limit at 25011.75 was selected before the contact candle high and low were known. The modeled fill was 25011.75, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25037.25, H 25042.25, L 25005.50, C 25006.25. Penetration beyond the far box edge: 3.25 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00010 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-06 |
| Entry UTC minute | 2026-02-06T14:45:00.000Z to 2026-02-06T14:46:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24934.25 / 24934.25 |
| Previous close / visible box | 24926.50 / 24931.25–24937.25 |
| Initial stop | 24954.25; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24804.25; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24874.25 / 24934.25 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 24954.25 |
| Exit UTC minute | 2026-02-06T14:51:00.000Z to 2026-02-06T14:52:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24954.25 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-06T10:54:00.000Z / 231.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 36.25 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1770375240000\|24931.25\|24937.25\|1 |

**Setup narrative:** Green resistance / sell reversal zone 24931.25–24937.25 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 24926.50; a midpoint limit at 24934.25 was selected before the contact candle high and low were known. The modeled fill was 24934.25, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 24926.75, H 24943.00, L 24921.50, C 24931.50. Penetration beyond the far box edge: 5.75 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00011 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-06 |
| Entry UTC minute | 2026-02-06T16:21:00.000Z to 2026-02-06T16:22:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25017.75 / 25017.75 |
| Previous close / visible box | 24998.00 / 25014.50–25020.75 |
| Initial stop | 25037.75; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24887.75; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24957.75 / 25017.75 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25037.75 |
| Exit UTC minute | 2026-02-06T16:34:00.000Z to 2026-02-06T16:35:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25037.75 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-06T11:43:00.000Z / 278.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 39.75 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1770378180000\|25014.5\|25020.75\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25014.50–25020.75 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 24998.00; a midpoint limit at 25017.75 was selected before the contact candle high and low were known. The modeled fill was 25017.75, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 24998.00, H 25031.50, L 24998.00, C 25030.75. Penetration beyond the far box edge: 10.75 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00012 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / break-even-stop |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-10 |
| Entry UTC minute | 2026-02-10T15:06:00.000Z to 2026-02-10T15:07:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25434.25 / 25434.25 |
| Previous close / visible box | 25401.00 / 25431.00–25437.25 |
| Initial stop | 25454.25; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25304.25; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25374.25 / 25434.25 (gross fill-price stop once activated) |
| Break-even activation UTC | 2026-02-10T15:13:00.000Z; within minute; exact time unknown |
| Last confirmed stop state | 25434.25 |
| Exit UTC minute | 2026-02-10T15:31:00.000Z to 2026-02-10T15:32:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25434.25 |
| Realized gross points | 0.00 |
| Zone formation UTC / age at entry | 2026-02-06T18:22:00.000Z / 5564.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 76.50 / adverse 13.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1770402120000\|25431\|25437.25\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25431.00–25437.25 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25401.00; a midpoint limit at 25434.25 was selected before the contact candle high and low were known. The modeled fill was 25434.25, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** The position exited flat in gross points. Commissions and execution costs could make the net result negative; this is not a target win.

**Contact candle evidence:** O 25402.25, H 25443.50, L 25391.50, C 25436.25. Penetration beyond the far box edge: 6.25 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00013 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / session-close |
| Position | buy β (green at entry) |
| New York session date | 2026-02-10 |
| Entry UTC minute | 2026-02-10T20:55:00.000Z to 2026-02-10T20:56:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25211.50 / 25211.50 |
| Previous close / visible box | 25227.75 / 25208.50–25214.50 |
| Initial stop | 25191.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25341.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25271.50 / 25211.50 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25191.50 |
| Exit UTC minute | 2026-02-10T20:59:00.000Z to 2026-02-10T21:00:00.000Z |
| Exit precision / price | bar close / 25219.50 |
| Realized gross points | +8.00 |
| Zone formation UTC / age at entry | 2026-02-10T20:07:00.000Z / 48.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 14.25 / adverse 13.25 points; not exact held-trade MFE/MAE |
| Zone identifier | 1770754020000\|25208.5\|25214.5\|-1 |

**Setup narrative:** Green support / buy reversal zone 25208.50–25214.50 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25227.75; a midpoint limit at 25211.50 was selected before the contact candle high and low were known. The modeled fill was 25211.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** The session exit retained a positive gross result below the reference target. Count it separately from a 130-point target win; it does not demonstrate the requested full move.

**Contact candle evidence:** O 25227.00, H 25230.00, L 25211.25, C 25219.50. Penetration beyond the far box edge: 0.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00014 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / take-profit |
| Position | buy β (green at entry) |
| New York session date | 2026-02-11 |
| Entry UTC minute | 2026-02-11T15:24:00.000Z to 2026-02-11T15:25:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25066.50 / 25066.50 |
| Previous close / visible box | 25098.00 / 25063.50–25069.50 |
| Initial stop | 25046.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25196.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25126.50 / 25066.50 (gross fill-price stop once activated) |
| Break-even activation UTC | 2026-02-11T15:31:00.000Z; within minute; exact time unknown |
| Last confirmed stop state | 25066.50 |
| Exit UTC minute | 2026-02-11T15:45:00.000Z to 2026-02-11T15:46:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25196.50 |
| Realized gross points | +130.00 |
| Zone formation UTC / age at entry | 2026-02-11T14:02:00.000Z / 82.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 130.00 / adverse 8.25 points; not exact held-trade MFE/MAE |
| Zone identifier | 1770818520000\|25063.5\|25069.5\|-1 |

**Setup narrative:** Green support / buy reversal zone 25063.50–25069.50 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25098.00; a midpoint limit at 25066.50 was selected before the contact candle high and low were known. The modeled fill was 25066.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** The frozen 130-point target was reached under this execution model. This isolated outcome does not establish an edge or repeatable tick precision.

**Contact candle evidence:** O 25098.75, H 25102.75, L 25065.50, C 25076.25. Penetration beyond the far box edge: 0.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00015 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | buy β (green at entry) |
| New York session date | 2026-02-12 |
| Entry UTC minute | 2026-02-12T15:55:00.000Z to 2026-02-12T15:56:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25041.00 / 25041.00 |
| Previous close / visible box | 25052.75 / 25038.00–25044.00 |
| Initial stop | 25021.00; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25171.00; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25101.00 / 25041.00 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25021.00 |
| Exit UTC minute | 2026-02-12T15:58:00.000Z to 2026-02-12T15:59:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25021.00 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-11T15:21:00.000Z / 1474.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 15.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1770823260000\|25038\|25044\|-1 |

**Setup narrative:** Green support / buy reversal zone 25038.00–25044.00 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25052.75; a midpoint limit at 25041.00 was selected before the contact candle high and low were known. The modeled fill was 25041.00, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25052.50, H 25062.00, L 25040.50, C 25044.50. Penetration beyond the far box edge: 0.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00016 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | buy β (green at entry) |
| New York session date | 2026-02-12 |
| Entry UTC minute | 2026-02-12T16:02:00.000Z to 2026-02-12T16:03:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24998.00 / 24998.00 |
| Previous close / visible box | 25006.00 / 24995.00–25001.00 |
| Initial stop | 24978.00; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25128.00; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25058.00 / 24998.00 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 24978.00 |
| Exit UTC minute | 2026-02-12T16:05:00.000Z to 2026-02-12T16:06:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24978.00 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-11T15:25:00.000Z / 1477.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 33.75 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1770823500000\|24995\|25001\|-1 |

**Setup narrative:** Green support / buy reversal zone 24995.00–25001.00 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25006.00; a midpoint limit at 24998.00 was selected before the contact candle high and low were known. The modeled fill was 24998.00, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25006.00, H 25008.25, L 24991.00, C 25001.50. Penetration beyond the far box edge: 4.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00017 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | buy β (green at entry) |
| New York session date | 2026-02-12 |
| Entry UTC minute | 2026-02-12T16:07:00.000Z to 2026-02-12T16:08:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24952.00 / 24952.00 |
| Previous close / visible box | 24961.75 / 24949.00–24955.00 |
| Initial stop | 24932.00; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25082.00; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25012.00 / 24952.00 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 24932.00 |
| Exit UTC minute | 2026-02-12T16:12:00.000Z to 2026-02-12T16:13:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24932.00 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-09T10:39:00.000Z / 4648.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 33.75 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1770633540000\|24949\|24955\|-1 |

**Setup narrative:** Green support / buy reversal zone 24949.00–24955.00 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 24961.75; a midpoint limit at 24952.00 was selected before the contact candle high and low were known. The modeled fill was 24952.00, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 24961.50, H 24972.00, L 24943.50, C 24964.25. Penetration beyond the far box edge: 5.50 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00018 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | buy β (green at entry) |
| New York session date | 2026-02-12 |
| Entry UTC minute | 2026-02-12T16:16:00.000Z to 2026-02-12T16:17:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24904.50 / 24904.50 |
| Previous close / visible box | 24912.75 / 24901.50–24907.75 |
| Initial stop | 24884.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25034.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24964.50 / 24904.50 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 24884.50 |
| Exit UTC minute | 2026-02-12T16:20:00.000Z to 2026-02-12T16:21:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24884.50 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-09T10:52:00.000Z / 4644.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 35.75 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1770634320000\|24901.5\|24907.75\|-1 |

**Setup narrative:** Green support / buy reversal zone 24901.50–24907.75 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 24912.75; a midpoint limit at 24904.50 was selected before the contact candle high and low were known. The modeled fill was 24904.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 24912.00, H 24920.25, L 24898.50, C 24913.00. Penetration beyond the far box edge: 3.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00019 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | buy β (green at entry) |
| New York session date | 2026-02-12 |
| Entry UTC minute | 2026-02-12T16:25:00.000Z to 2026-02-12T16:26:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24857.25 / 24857.25 |
| Previous close / visible box | 24882.75 / 24854.25–24860.50 |
| Initial stop | 24837.25; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24987.25; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24917.25 / 24857.25 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 24837.25 |
| Exit UTC minute | 2026-02-12T16:27:00.000Z to 2026-02-12T16:28:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24837.25 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-09T14:31:00.000Z / 4434.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 6.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1770647460000\|24854.25\|24860.5\|-1 |

**Setup narrative:** Green support / buy reversal zone 24854.25–24860.50 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 24882.75; a midpoint limit at 24857.25 was selected before the contact candle high and low were known. The modeled fill was 24857.25, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 24882.50, H 24888.00, L 24845.75, C 24847.25. Penetration beyond the far box edge: 8.50 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00020 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-18 |
| Entry UTC minute | 2026-02-18T15:04:00.000Z to 2026-02-18T15:05:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25007.25 / 25007.25 |
| Previous close / visible box | 24986.00 / 25004.00–25010.25 |
| Initial stop | 25027.25; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24877.25; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24947.25 / 25007.25 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25027.25 |
| Exit UTC minute | 2026-02-18T15:05:00.000Z to 2026-02-18T15:06:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25027.25 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-18T07:30:00.000Z / 454.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 15m |
| Maximum historical family count | 3; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1771399800000\|25004\|25010.25\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25004.00–25010.25 was visible before this contact. Its frozen contributor labels were STDV | RB 15m. The prior candle closed at 24986.00; a midpoint limit at 25007.25 was selected before the contact candle high and low were known. The modeled fill was 25007.25, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 24985.50, H 25019.50, L 24984.50, C 25016.50. Penetration beyond the far box edge: 9.25 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00021 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-18 |
| Entry UTC minute | 2026-02-18T16:05:00.000Z to 2026-02-18T16:06:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25105.75 / 25105.75 |
| Previous close / visible box | 25099.50 / 25102.75–25108.75 |
| Initial stop | 25125.75; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24975.75; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25045.75 / 25105.75 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25125.75 |
| Exit UTC minute | 2026-02-18T17:06:00.000Z to 2026-02-18T17:07:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25125.75 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-18T15:14:00.000Z / 51.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 48.25 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1771427640000\|25102.75\|25108.75\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25102.75–25108.75 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25099.50; a midpoint limit at 25105.75 was selected before the contact candle high and low were known. The modeled fill was 25105.75, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25099.75, H 25113.75, L 25098.00, C 25109.75. Penetration beyond the far box edge: 5.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00022 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / take-profit |
| Position | buy β (green at entry) |
| New York session date | 2026-02-20 |
| Entry UTC minute | 2026-02-20T14:30:00.000Z to 2026-02-20T14:31:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24692.50 / 24692.50 |
| Previous close / visible box | 24715.50 / 24689.50–24695.50 |
| Initial stop | 24672.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24822.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24752.50 / 24692.50 (gross fill-price stop once activated) |
| Break-even activation UTC | 2026-02-20T14:31:00.000Z; within minute; exact time unknown |
| Last confirmed stop state | 24692.50 |
| Exit UTC minute | 2026-02-20T14:35:00.000Z to 2026-02-20T14:36:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24822.50 |
| Realized gross points | +130.00 |
| Zone formation UTC / age at entry | 2026-02-20T13:42:00.000Z / 48.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 130.00 / adverse 0.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1771594920000\|24689.5\|24695.5\|-1 |

**Setup narrative:** Green support / buy reversal zone 24689.50–24695.50 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 24715.50; a midpoint limit at 24692.50 was selected before the contact candle high and low were known. The modeled fill was 24692.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** The frozen 130-point target was reached under this execution model. This isolated outcome does not establish an edge or repeatable tick precision.

**Contact candle evidence:** O 24715.25, H 24736.50, L 24678.50, C 24726.00. Penetration beyond the far box edge: 11.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00023 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | ambiguous / entry-minute-critical-threshold-order-unknown |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-20 |
| Entry UTC minute | 2026-02-20T15:01:00.000Z to 2026-02-20T15:02:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25041.25 / 25041.25 |
| Previous close / visible box | 24927.75 / 25038.25–25044.25 |
| Initial stop | 25061.25; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24911.25; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24981.25 / 25041.25 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25061.25 |
| Exit UTC minute | 2026-02-20T15:01:00.000Z to 2026-02-20T15:02:00.000Z |
| Exit precision / price | unresolved from 1m OHLC / Unknown |
| Realized gross points | Unresolved |
| Zone formation UTC / age at entry | 2026-02-20T07:30:00.000Z / 451.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 5m |
| Maximum historical family count | 3; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 0.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1771572600000\|25038.25\|25044.25\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25038.25–25044.25 was visible before this contact. Its frozen contributor labels were STDV | RB 5m. The prior candle closed at 24927.75; a midpoint limit at 25041.25 was selected before the contact candle high and low were known. The modeled fill was 25041.25, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** Unresolved: the minute candles cannot establish the required execution order. No win or loss is assigned. This observation cannot support a precision-entry claim.

**Contact candle evidence:** O 24928.75, H 25077.25, L 24905.75, C 25062.75. Penetration beyond the far box edge: 33.00 points. These extrema are unsequenced and are not an assumed fill path.

**Unresolved ordering:** entry-minute-critical-threshold-order-unknown. Evidence: O 24928.75, H 25077.25, L 24905.75, C 25062.75. outcome excluded from resolved rate; block new entries for the remainder of this NY session

## trade-00024 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-25 |
| Entry UTC minute | 2026-02-25T14:30:00.000Z to 2026-02-25T14:31:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25186.75 / 25186.75 |
| Previous close / visible box | 25160.50 / 25183.50–25189.75 |
| Initial stop | 25206.75; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25056.75; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25126.75 / 25186.75 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25206.75 |
| Exit UTC minute | 2026-02-25T14:30:00.000Z to 2026-02-25T14:31:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25206.75 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-20T15:51:00.000Z / 7119.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1771602660000\|25183.5\|25189.75\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25183.50–25189.75 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25160.50; a midpoint limit at 25186.75 was selected before the contact candle high and low were known. The modeled fill was 25186.75, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25160.25, H 25220.00, L 25156.75, C 25211.75. Penetration beyond the far box edge: 30.25 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00025 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-25 |
| Entry UTC minute | 2026-02-25T14:31:00.000Z to 2026-02-25T14:32:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25231.00 / 25231.00 |
| Previous close / visible box | 25211.75 / 25228.00–25234.00 |
| Initial stop | 25251.00; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25101.00; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25171.00 / 25231.00 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25251.00 |
| Exit UTC minute | 2026-02-25T14:39:00.000Z to 2026-02-25T14:40:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25251.00 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-25T14:16:00.000Z / 15.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 22.50 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1772028960000\|25228\|25234\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25228.00–25234.00 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25211.75; a midpoint limit at 25231.00 was selected before the contact candle high and low were known. The modeled fill was 25231.00, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25211.75, H 25231.50, L 25211.25, C 25223.75. Penetration beyond the far box edge: 0.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00026 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-25 |
| Entry UTC minute | 2026-02-25T14:46:00.000Z to 2026-02-25T14:47:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25312.00 / 25312.00 |
| Previous close / visible box | 25298.25 / 25309.00–25315.00 |
| Initial stop | 25332.00; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25182.00; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25252.00 / 25312.00 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25332.00 |
| Exit UTC minute | 2026-02-25T14:49:00.000Z to 2026-02-25T14:50:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25332.00 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-25T14:37:00.000Z / 9.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 8.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1772030220000\|25309\|25315\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25309.00–25315.00 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25298.25; a midpoint limit at 25312.00 was selected before the contact candle high and low were known. The modeled fill was 25312.00, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25298.50, H 25312.50, L 25290.25, C 25310.75. Penetration beyond the far box edge: 0.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00027 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / break-even-stop |
| Position | sell ρ (green at entry) |
| New York session date | 2026-02-25 |
| Entry UTC minute | 2026-02-25T14:58:00.000Z to 2026-02-25T14:59:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25352.50 / 25352.50 |
| Previous close / visible box | 25324.25 / 25349.50–25355.50 |
| Initial stop | 25372.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25222.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25292.50 / 25352.50 (gross fill-price stop once activated) |
| Break-even activation UTC | 2026-02-25T15:16:00.000Z; within minute; exact time unknown |
| Last confirmed stop state | 25352.50 |
| Exit UTC minute | 2026-02-25T17:57:00.000Z to 2026-02-25T17:58:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25352.50 |
| Realized gross points | 0.00 |
| Zone formation UTC / age at entry | 2026-02-25T14:43:00.000Z / 15.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 88.00 / adverse 9.25 points; not exact held-trade MFE/MAE |
| Zone identifier | 1772030580000\|25349.5\|25355.5\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25349.50–25355.50 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25324.25; a midpoint limit at 25352.50 was selected before the contact candle high and low were known. The modeled fill was 25352.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** The position exited flat in gross points. Commissions and execution costs could make the net result negative; this is not a target win.

**Contact candle evidence:** O 25324.25, H 25353.25, L 25323.50, C 25345.25. Penetration beyond the far box edge: 0.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00028 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | buy β (green at entry) |
| New York session date | 2026-02-26 |
| Entry UTC minute | 2026-02-26T15:12:00.000Z to 2026-02-26T15:13:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25126.25 / 25126.25 |
| Previous close / visible box | 25158.00 / 25123.25–25129.25 |
| Initial stop | 25106.25; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25256.25; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25186.25 / 25126.25 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25106.25 |
| Exit UTC minute | 2026-02-26T15:12:00.000Z to 2026-02-26T15:13:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25106.25 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-26T14:57:00.000Z / 15.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1772117820000\|25123.25\|25129.25\|-1 |

**Setup narrative:** Green support / buy reversal zone 25123.25–25129.25 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25158.00; a midpoint limit at 25126.25 was selected before the contact candle high and low were known. The modeled fill was 25126.25, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25157.00, H 25158.25, L 25087.25, C 25093.00. Penetration beyond the far box edge: 36.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00029 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | buy β (green at entry) |
| New York session date | 2026-02-26 |
| Entry UTC minute | 2026-02-26T15:15:00.000Z to 2026-02-26T15:16:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25052.50 / 25052.50 |
| Previous close / visible box | 25066.25 / 25049.50–25055.50 |
| Initial stop | 25032.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25182.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25112.50 / 25052.50 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25032.50 |
| Exit UTC minute | 2026-02-26T15:15:00.000Z to 2026-02-26T15:16:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25032.50 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-26T15:15:00.000Z / 0.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 5m |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1772118900000\|25049.5\|25055.5\|-1 |

**Setup narrative:** Green support / buy reversal zone 25049.50–25055.50 was visible before this contact. Its frozen contributor labels were STDV | RB 5m. The prior candle closed at 25066.25; a midpoint limit at 25052.50 was selected before the contact candle high and low were known. The modeled fill was 25052.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25067.00, H 25067.25, L 25025.50, C 25033.75. Penetration beyond the far box edge: 24.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00030 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | buy β (green at entry) |
| New York session date | 2026-02-26 |
| Entry UTC minute | 2026-02-26T15:16:00.000Z to 2026-02-26T15:17:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25015.50 / 25015.50 |
| Previous close / visible box | 25033.75 / 25012.50–25018.75 |
| Initial stop | 24995.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25145.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25075.50 / 25015.50 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 24995.50 |
| Exit UTC minute | 2026-02-26T15:16:00.000Z to 2026-02-26T15:17:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24995.50 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-26T15:15:00.000Z / 1.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 15m |
| Maximum historical family count | 3; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1772118900000\|25012.5\|25018.75\|-1 |

**Setup narrative:** Green support / buy reversal zone 25012.50–25018.75 was visible before this contact. Its frozen contributor labels were STDV | RB 15m. The prior candle closed at 25033.75; a midpoint limit at 25015.50 was selected before the contact candle high and low were known. The modeled fill was 25015.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25033.25, H 25033.75, L 24990.25, C 24994.00. Penetration beyond the far box edge: 22.25 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00031 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | buy β (green at entry) |
| New York session date | 2026-02-26 |
| Entry UTC minute | 2026-02-26T15:18:00.000Z to 2026-02-26T15:19:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24978.75 / 24978.75 |
| Previous close / visible box | 24999.00 / 24975.75–24981.75 |
| Initial stop | 24958.75; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25108.75; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25038.75 / 24978.75 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 24958.75 |
| Exit UTC minute | 2026-02-26T15:19:00.000Z to 2026-02-26T15:20:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24958.75 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-02-26T15:15:00.000Z / 3.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 15m |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1772118900000\|24975.75\|24981.75\|-1 |

**Setup narrative:** Green support / buy reversal zone 24975.75–24981.75 was visible before this contact. Its frozen contributor labels were STDV | RB 15m. The prior candle closed at 24999.00; a midpoint limit at 24978.75 was selected before the contact candle high and low were known. The modeled fill was 24978.75, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 24998.75, H 25002.75, L 24965.00, C 24970.00. Penetration beyond the far box edge: 10.75 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00032 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / take-profit |
| Position | buy β (green at entry) |
| New York session date | 2026-02-26 |
| Entry UTC minute | 2026-02-26T15:34:00.000Z to 2026-02-26T15:35:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24866.50 / 24866.50 |
| Previous close / visible box | 24904.25 / 24863.50–24869.50 |
| Initial stop | 24846.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24996.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24926.50 / 24866.50 (gross fill-price stop once activated) |
| Break-even activation UTC | 2026-02-26T15:37:00.000Z; within minute; exact time unknown |
| Last confirmed stop state | 24866.50 |
| Exit UTC minute | 2026-02-26T15:41:00.000Z to 2026-02-26T15:42:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24996.50 |
| Realized gross points | +130.00 |
| Zone formation UTC / age at entry | 2026-02-25T14:53:00.000Z / 1481.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 130.00 / adverse 0.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1772031180000\|24863.5\|24869.5\|-1 |

**Setup narrative:** Green support / buy reversal zone 24863.50–24869.50 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 24904.25; a midpoint limit at 24866.50 was selected before the contact candle high and low were known. The modeled fill was 24866.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** The frozen 130-point target was reached under this execution model. This isolated outcome does not establish an edge or repeatable tick precision.

**Contact candle evidence:** O 24903.00, H 24903.00, L 24861.75, C 24871.25. Penetration beyond the far box edge: 1.75 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00033 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / take-profit |
| Position | buy β (green at entry) |
| New York session date | 2026-02-27 |
| Entry UTC minute | 2026-02-27T14:43:00.000Z to 2026-02-27T14:44:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24785.50 / 24785.50 |
| Previous close / visible box | 24822.75 / 24782.50–24788.50 |
| Initial stop | 24765.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24915.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24845.50 / 24785.50 (gross fill-price stop once activated) |
| Break-even activation UTC | 2026-02-27T14:44:00.000Z; within minute; exact time unknown |
| Last confirmed stop state | 24785.50 |
| Exit UTC minute | 2026-02-27T14:48:00.000Z to 2026-02-27T14:49:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24915.50 |
| Realized gross points | +130.00 |
| Zone formation UTC / age at entry | 2026-02-25T14:37:00.000Z / 2886.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 10m |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 130.00 / adverse 0.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1772030220000\|24782.5\|24788.5\|-1 |

**Setup narrative:** Green support / buy reversal zone 24782.50–24788.50 was visible before this contact. Its frozen contributor labels were STDV | RB 10m. The prior candle closed at 24822.75; a midpoint limit at 24785.50 was selected before the contact candle high and low were known. The modeled fill was 24785.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** The frozen 130-point target was reached under this execution model. This isolated outcome does not establish an edge or repeatable tick precision.

**Contact candle evidence:** O 24825.00, H 24826.50, L 24782.00, C 24798.50. Penetration beyond the far box edge: 0.50 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00034 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-03-09 |
| Entry UTC minute | 2026-03-09T16:03:00.000Z to 2026-03-09T16:04:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24677.00 / 24677.00 |
| Previous close / visible box | 24642.00 / 24673.75–24680.00 |
| Initial stop | 24697.00; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24547.00; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24617.00 / 24677.00 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 24697.00 |
| Exit UTC minute | 2026-03-09T16:26:00.000Z to 2026-03-09T16:27:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24697.00 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-03-09T07:30:00.000Z / 513.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 5m/15m |
| Maximum historical family count | 3; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 43.25 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1773041400000\|24673.75\|24680\|1 |

**Setup narrative:** Green resistance / sell reversal zone 24673.75–24680.00 was visible before this contact. Its frozen contributor labels were STDV | RB 5m/15m. The prior candle closed at 24642.00; a midpoint limit at 24677.00 was selected before the contact candle high and low were known. The modeled fill was 24677.00, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 24641.50, H 24680.00, L 24641.00, C 24666.75. Penetration beyond the far box edge: 0.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00035 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / session-close |
| Position | sell ρ (green at entry) |
| New York session date | 2026-03-09 |
| Entry UTC minute | 2026-03-09T19:38:00.000Z to 2026-03-09T19:39:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25048.75 / 25048.75 |
| Previous close / visible box | 25019.50 / 25045.75–25051.75 |
| Initial stop | 25068.75; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24918.75; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24988.75 / 25048.75 (gross fill-price stop once activated) |
| Break-even activation UTC | 2026-03-09T19:40:00.000Z; within minute; exact time unknown |
| Last confirmed stop state | 25048.75 |
| Exit UTC minute | 2026-03-09T19:59:00.000Z to 2026-03-09T20:00:00.000Z |
| Exit precision / price | bar close / 24992.25 |
| Realized gross points | +56.50 |
| Zone formation UTC / age at entry | 2026-03-09T19:25:00.000Z / 13.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 117.25 / adverse 0.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1773084300000\|25045.75\|25051.75\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25045.75–25051.75 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25019.50; a midpoint limit at 25048.75 was selected before the contact candle high and low were known. The modeled fill was 25048.75, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** The session exit retained a positive gross result below the reference target. Count it separately from a 130-point target win; it does not demonstrate the requested full move.

**Contact candle evidence:** O 25019.75, H 25058.00, L 25017.25, C 25020.00. Penetration beyond the far box edge: 6.25 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00036 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / take-profit |
| Position | sell ρ (green at entry) |
| New York session date | 2026-03-10 |
| Entry UTC minute | 2026-03-10T17:28:00.000Z to 2026-03-10T17:29:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25214.00 / 25214.00 |
| Previous close / visible box | 25206.50 / 25211.00–25217.00 |
| Initial stop | 25234.00; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 25084.00; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 25154.00 / 25214.00 (gross fill-price stop once activated) |
| Break-even activation UTC | 2026-03-10T17:35:00.000Z; within minute; exact time unknown |
| Last confirmed stop state | 25214.00 |
| Exit UTC minute | 2026-03-10T18:14:00.000Z to 2026-03-10T18:15:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25084.00 |
| Realized gross points | +130.00 |
| Zone formation UTC / age at entry | 2026-03-06T09:36:00.000Z / 6232.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 130.00 / adverse 1.75 points; not exact held-trade MFE/MAE |
| Zone identifier | 1772789760000\|25211\|25217\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25211.00–25217.00 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25206.50; a midpoint limit at 25214.00 was selected before the contact candle high and low were known. The modeled fill was 25214.00, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** The frozen 130-point target was reached under this execution model. This isolated outcome does not establish an edge or repeatable tick precision.

**Contact candle evidence:** O 25206.25, H 25217.50, L 25204.00, C 25215.50. Penetration beyond the far box edge: 0.50 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00037 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | buy β (green at entry) |
| New York session date | 2026-03-12 |
| Entry UTC minute | 2026-03-12T13:55:00.000Z to 2026-03-12T13:56:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24652.50 / 24652.50 |
| Previous close / visible box | 24669.00 / 24649.50–24655.50 |
| Initial stop | 24632.50; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24782.50; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24712.50 / 24652.50 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 24632.50 |
| Exit UTC minute | 2026-03-12T13:56:00.000Z to 2026-03-12T13:57:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24632.50 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-03-11T22:39:00.000Z / 916.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 5m |
| Maximum historical family count | 3; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1773268740000\|24649.5\|24655.5\|-1 |

**Setup narrative:** Green support / buy reversal zone 24649.50–24655.50 was visible before this contact. Its frozen contributor labels were STDV | RB 5m. The prior candle closed at 24669.00; a midpoint limit at 24652.50 was selected before the contact candle high and low were known. The modeled fill was 24652.50, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 24668.50, H 24678.25, L 24644.75, C 24649.00. Penetration beyond the far box edge: 4.75 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00038 — buy β

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / session-close |
| Position | buy β (green at entry) |
| New York session date | 2026-03-13 |
| Entry UTC minute | 2026-03-13T19:40:00.000Z to 2026-03-13T19:41:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24352.75 / 24352.75 |
| Previous close / visible box | 24362.00 / 24349.75–24355.75 |
| Initial stop | 24332.75; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24482.75; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24412.75 / 24352.75 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 24332.75 |
| Exit UTC minute | 2026-03-13T19:59:00.000Z to 2026-03-13T20:00:00.000Z |
| Exit precision / price | bar close / 24398.00 |
| Realized gross points | +45.25 |
| Zone formation UTC / age at entry | 2026-03-13T18:45:00.000Z / 55.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 15m |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 51.25 / adverse 2.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1773427500000\|24349.75\|24355.75\|-1 |

**Setup narrative:** Green support / buy reversal zone 24349.75–24355.75 was visible before this contact. Its frozen contributor labels were STDV | RB 15m. The prior candle closed at 24362.00; a midpoint limit at 24352.75 was selected before the contact candle high and low were known. The modeled fill was 24352.75, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** The session exit retained a positive gross result below the reference target. Count it separately from a 130-point target win; it does not demonstrate the requested full move.

**Contact candle evidence:** O 24361.75, H 24368.25, L 24350.50, C 24356.75. Penetration beyond the far box edge: 0.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00039 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-03-16 |
| Entry UTC minute | 2026-03-16T13:33:00.000Z to 2026-03-16T13:34:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24921.00 / 24921.00 |
| Previous close / visible box | 24900.00 / 24918.00–24924.00 |
| Initial stop | 24941.00; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24791.00; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24861.00 / 24921.00 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 24941.00 |
| Exit UTC minute | 2026-03-16T13:47:00.000Z to 2026-03-16T13:48:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24941.00 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-03-16T07:30:00.000Z / 363.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| RB 5m/10m |
| Maximum historical family count | 3; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 41.00 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1773646200000\|24918\|24924\|1 |

**Setup narrative:** Green resistance / sell reversal zone 24918.00–24924.00 was visible before this contact. Its frozen contributor labels were STDV | RB 5m/10m. The prior candle closed at 24900.00; a midpoint limit at 24921.00 was selected before the contact candle high and low were known. The modeled fill was 24921.00, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 24900.50, H 24921.50, L 24891.25, C 24919.75. Penetration beyond the far box edge: 0.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00040 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-03-16 |
| Entry UTC minute | 2026-03-16T13:58:00.000Z to 2026-03-16T13:59:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24955.00 / 24955.00 |
| Previous close / visible box | 24939.00 / 24951.75–24958.00 |
| Initial stop | 24975.00; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24825.00; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24895.00 / 24955.00 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 24975.00 |
| Exit UTC minute | 2026-03-16T14:10:00.000Z to 2026-03-16T14:11:00.000Z |
| Exit precision / price | within minute; exact time unknown / 24975.00 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-03-16T12:15:00.000Z / 103.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 43.50 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1773663300000\|24951.75\|24958\|1 |

**Setup narrative:** Green resistance / sell reversal zone 24951.75–24958.00 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 24939.00; a midpoint limit at 24955.00 was selected before the contact candle high and low were known. The modeled fill was 24955.00, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 24939.00, H 24955.25, L 24938.50, C 24949.75. Penetration beyond the far box edge: 0.00 points. These extrema are unsequenced and are not an assumed fill path.

## trade-00041 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | ambiguous / entry-minute-critical-threshold-order-unknown |
| Position | sell ρ (green at entry) |
| New York session date | 2026-03-16 |
| Entry UTC minute | 2026-03-16T19:09:00.000Z to 2026-03-16T19:10:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 24988.75 / 24988.75 |
| Previous close / visible box | 24917.50 / 24985.50–24991.75 |
| Initial stop | 25008.75; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24858.75; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24928.75 / 24988.75 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25008.75 |
| Exit UTC minute | 2026-03-16T19:09:00.000Z to 2026-03-16T19:10:00.000Z |
| Exit precision / price | unresolved from 1m OHLC / Unknown |
| Realized gross points | Unresolved |
| Zone formation UTC / age at entry | 2026-03-16T12:38:00.000Z / 391.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 0.00 / adverse 0.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1773664680000\|24985.5\|24991.75\|1 |

**Setup narrative:** Green resistance / sell reversal zone 24985.50–24991.75 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 24917.50; a midpoint limit at 24988.75 was selected before the contact candle high and low were known. The modeled fill was 24988.75, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** Unresolved: the minute candles cannot establish the required execution order. No win or loss is assigned. This observation cannot support a precision-entry claim.

**Contact candle evidence:** O 24916.75, H 25004.50, L 24915.00, C 25001.75. Penetration beyond the far box edge: 12.75 points. These extrema are unsequenced and are not an assumed fill path.

**Unresolved ordering:** entry-minute-critical-threshold-order-unknown. Evidence: O 24916.75, H 25004.50, L 24915.00, C 25001.75. outcome excluded from resolved rate; block new entries for the remainder of this NY session

## trade-00042 — sell ρ

| Detail | Recorded value |
| --- | --- |
| Status / exit reason | closed / stop-loss |
| Position | sell ρ (green at entry) |
| New York session date | 2026-03-17 |
| Entry UTC minute | 2026-03-17T13:32:00.000Z to 2026-03-17T13:33:00.000Z |
| Entry precision | within minute; exact fill time unknown |
| NQ modeled fill / limit | 25056.25 / 25056.25 |
| Previous close / visible box | 25017.25 / 25053.25–25059.25 |
| Initial stop | 25076.25; 20.00 points from fill; placed with modeled entry (same timing precision) |
| Reference take-profit | 24926.25; active from modeled entry (same timing precision) |
| Break-even trigger / stop | 24996.25 / 25056.25 (gross fill-price stop once activated) |
| Break-even activation UTC | No confirmed activation recorded; unknown ordering does not establish that the trigger was never touched |
| Last confirmed stop state | 25076.25 |
| Exit UTC minute | 2026-03-17T13:45:00.000Z to 2026-03-17T13:46:00.000Z |
| Exit precision / price | within minute; exact time unknown / 25076.25 |
| Realized gross points | -20.00 |
| Zone formation UTC / age at entry | 2026-03-17T13:26:00.000Z / 6.00 minutes (entry-minute approximation) |
| Frozen contributor labels | STDV \| VWAP |
| Maximum historical family count | 2; not a current-at-entry alignment count |
| Opening fill improvement | 0.00 points versus resting limit |
| Opening gap beyond zone / anchor invalidation | No / No |
| Exit opening gap / planned risk exceeded | No / No |
| Confirmed excursion lower bounds | Favorable 11.25 / adverse 20.00 points; not exact held-trade MFE/MAE |
| Zone identifier | 1773753960000\|25053.25\|25059.25\|1 |

**Setup narrative:** Green resistance / sell reversal zone 25053.25–25059.25 was visible before this contact. Its frozen contributor labels were STDV | VWAP. The prior candle closed at 25017.25; a midpoint limit at 25056.25 was selected before the contact candle high and low were known. The modeled fill was 25056.25, with 20.00 points of initial risk. These facts describe the rule-based setup; they do not establish that its original confluences still aligned at entry.

**Opinion:** This setup failed under the frozen entry and risk model. The loss alone cannot distinguish incorrect zone selection from unsuitable entry or stop geometry; compare the contact evidence and matching setups before changing calibration.

**Contact candle evidence:** O 25018.50, H 25059.50, L 25010.75, C 25058.50. Penetration beyond the far box edge: 0.25 points. These extrema are unsequenced and are not an assumed fill path.
