---
project: Ethereal
type: session-report
status: calibration-complete-validation-pending
created: 2026-10-27
---

# S01 — first NQ calibration audit

The first measured pass confirms the trader's complaint: this baseline can capture 130-point moves, but it also produces long stop sequences. Range performed better than Midnight on this calibration sample. Neither mode establishes the requested entry precision or a validated trading edge. The indicator and its calibration were not changed to improve these results.

## Scope and frozen setup

Each experiment continuously replayed **55,439 one-minute bars**, from January 20 at 15:56 UTC through March 17 at 23:59 UTC. Scoring covers **37 complete NY sessions, January 22–March 17**, with 14,430/14,430 RTH minutes ready in each mode. January 21 is initialization. The 20 reserved March 18–April 15 validation dates were **not replayed or scored**.

- Entry: resting box-midpoint limit, rounded to the 0.25-point NQ tick; select the nearest correct-side fresh visible zone before seeing the contact candle range.
- Risk: planned initial **SL20**, move stop to modeled fill after **+60**, fixed reference **TP130**; one active position.
- First band-contact attempt only. A missed midpoint consumes the attempt; prior contacts outside RTH or while hidden also consume freshness.
- Entries: NY RTH 09:30–16:00; flatten at session end. Other positive session exits are separate from TP130 wins.
- Unknown intrabar execution order remains unresolved and blocks entries for the remaining NY session. Opening gaps are processed explicitly; stop losses are never falsely capped.
- Both modes use **5-minute Fib construction**, RB sources 5/10/15m, mandatory active Fib inside the band at formation, tolerance 15 points, height input 5 points plus 0.5-point padding per side, production display cap 8, and 100,000-minute research history. Exact settings and hashes accompany each record.

Trade model.json and Calibration scope.json were frozen before the extended outcomes. These are code-default-based candidates, not an export of the trader's actual TradingView settings. The trader's discretionary 130-point winners are an objective, not a verified comparative dataset.

## Trade results

| Measure | Range | Midnight |
| --- | ---: | ---: |
| Entered trades | 42 | 33 |
| Resolved / ambiguous | 40 / 2 | 32 / 1 |
| TP130 wins | 5 | 2 |
| **TP130 rate among resolved trades** | **12.50% (5/40)** | **6.25% (2/32)** |
| Initial SL20 exits | 28 | 27 |
| Gross break-even exits | 4 | 2 |
| Positive session exits below TP130 | 3 | 1 |
| Any positive exit rate, resolved only | 20.00% (8/40) | 9.375% (3/32) |
| Longest confirmed consecutive initial stops | 7 | 8 |
| Gross points on resolved trades | +199.75 | −173.75 |
| Worst resolved trade | −20 | −20 |
| Realized gap losses exceeding planned 20-point risk | 0 | 0 |

Range's total is **650 − 560 + 109.75 = +199.75** points. Its three partial session exits contribute +109.75; they do not meet the 130-point winning-move objective. Midnight's total is **260 − 540 + 106.25 = −173.75** points. All full TP winners took exactly 130 points under the fixed reference target.

Across all entered trades, extreme TP outcome bounds are 11.90–16.67% for Range and 6.06–9.09% for Midnight. These are not confidence intervals. Resolved-only gross totals omit unresolved outcomes and trades blocked after ambiguity; they are not complete account equity curves. The two modes share dates/data and must not be pooled into a single independent portfolio or larger sample. Costs are unspecified: every figure is gross, and gross break-even need not be net break-even.

## Setups and attribution

| Frozen formation/upgrade contributors | Entered / resolved | TP130 | Initial SL | BE | Positive session exits | Gross resolved points |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Range — STDV + VWAP | 26 / 25 | 4 | 17 | 2 | 2 | +244.50 |
| Range — STDV + RB | 16 / 15 | 1 | 11 | 2 | 1 | −44.75 |
| Midnight — STDV + VWAP | 15 / 14 | 2 | 10 | 2 | 0 | +60.00 |
| Midnight — STDV + RB | 15 / 15 | 0 | 14 | 0 | 1 | −173.75 |
| Midnight — three-family setups | 3 / 3 | 0 | 3 | 0 | 0 | −60.00 |

These small selected groups suggest investigation priorities, not validated family filters. Contributor text is frozen when a zone forms or upgrades; it does not prove all families remain aligned at entry. Maximum historical family count is also not a current alignment count. Each individual journal identifies contributor labels and RB timeframes without inventing a news/trend narrative.

- [[Ethereal/Runs/2026-10-27-S01/Calibration-range/Trade journal|Range: every position, NQ fill, confluences, SL/BE/TP, outcome and opinion]]
- [[Ethereal/Runs/2026-10-27-S01/Calibration-midnight/Trade journal|Midnight: every position, NQ fill, confluences, SL/BE/TP, outcome and opinion]]
- [[Ethereal/Runs/2026-10-27-S01/Calibration-range/Report|Range detailed run record]]
- [[Ethereal/Runs/2026-10-27-S01/Calibration-midnight/Report|Midnight detailed run record]]

Trades.json/Trades.csv preserve exact modeled entry/exit prices and minute-level precision, risk levels, zone age, grade, contributor evidence and ambiguity. The Markdown journals provide a readable setup narrative and candid opinion for every entered record. Prices are model fills from one-minute data, not tick-exact exchange confirmations.

## Why the zones remain insufficiently precise

**Box penetration is measurable.** Among first-contact reaction events, price penetrated the adverse edge in 38/84 Range contacts and 42/74 Midnight contacts. Positive penetrations had a median of 6.25 and 8.125 points respectively; maxima were 36 and 23 points. The indicator's invalidation threshold was reached within the contact candle in 9 Range and 11 Midnight events. These diagnostics concern all qualifying reaction contacts, not only filled trades, and cannot determine an intrabar fill path.

**Midnight often freezes a small early swing.** Current-day Fib legs have a median of 32.75 points, versus 138.5 for Range. Midnight legs span 3.5–108.5 points, with 10/37 below 20 points; Range spans 72.5–437.75. There were 253 first contacts outside RTH on scored Midnight dates versus 35 in Range. This supports investigating scale and early off-session consumption. It does not prove that a minimum-leg filter would improve performance or reproduce Dutchy's discretionary anchors.

**Age is not a universal rejection rule.** Range TP winners had median zone age 1,481 minutes, versus 408.5 for initial stops; 3/5 TP winners used zones older than one day. Midnight TP median age was 470.5 minutes versus 785 for stops. Blanket expiry would have removed many Range winners. Current alignment and source lifecycle should be measured before deciding an age filter.

**Yellow is unassessed.** There were zero visible **and zero retained** live yellow RTH minutes in both modes. Display filtering alone therefore does not explain the absence in these sessions. Instrument the four-family, qualifying-RB and VAH/VAL-reversal rejection reasons before changing the rule. Zero yellow observations cannot establish yellow efficacy or prove the code never creates yellow areas.

## Separate reaction study

The post-contact-close ±15-point benchmark at 30 minutes records Range 41 favorable-first / 38 adverse-first / 5 ambiguous across 84 events, and Midnight 36 / 37 / 1 across 74 events. This is not the TP130 trade win rate. In fact, 2/9 Range and 5/11 Midnight contacts that already reached indicator invalidation still had favorable-first post-close reactions. A later reaction must not be presented as a successful tight-stop entry.

All 5/15/30-minute evidence, exclusions and dependent event groups are in Reactions.json/Events.csv. Overlapping areas and horizons are correlated observations.

## Calibration priorities and timeframe

1. Instrument yellow qualification rejection reasons and measure whether formation contributors, especially the Fib level inside the box, are still active at contact. Keep boxes at their frozen prices while distinguishing outdated evidence.
2. Declare a separate comparison of Original anchor versus Beyond wick confluence, aligned with the trader's observation of reversals beyond RB wick tips. Preserve mandatory in-box Fib and the same SL20/BE60/TP130 model.
3. Declare a small tolerance/box-geometry grid before running it. The baseline's 15-point tolerance exceeds its 6-point displayed height; a narrow box alone does not imply narrow confluence alignment. Report frequency and missed attempts alongside outcomes.
4. Compare construction timeframes 1/5/10/15m and the early-swing scale rule as separately frozen candidates. A minimum-leg filter would change the trader's first-confirmed-swing rule and must be labeled as an optional new experiment, not silently substituted.
5. Freeze any selected candidate before opening validation. Repeated tuning consumes calibration information; once validation influences edits it cannot remain an untouched test.

**Best timeframe: not established.** Both completed candidates construct Fib on 5m. Chart displays 5/10/15/30/60/240m share the same one-minute engine and cannot be ranked as independent trade tests merely by changing the chart. No new calibration is claimed optimal.

## Verification, runtime and remaining evidence

The fresh research suite passed **52 tests**, source generation matches, and the Pine source hash is unchanged. A second read-only internal review independently recalculated outcomes, checked hashes and CSV parsing, confirmed 37×390 ready RTH minutes, no position overlap, correct SL/BE/TP levels and timestamps, and the untouched validation cutoff. See [[Ethereal/Runs/2026-10-27-S01/Implementation audit|implementation audit]] and [[Ethereal/Runs/2026-10-27-S01/Progress|progress log]].

Range replay/scoring took 305.28 seconds with 5,285.99 MiB peak process RSS; Midnight took 282.00 seconds with 5,136.45 MiB. The processes ran concurrently. Export writing/review is additional time. The preliminary 4,504-bar pilots took approximately 14–16 seconds each. Initial estimates were revised after those measurements; no work is promised outside an active execution turn.

PineTS 0.11.1 remains a third-party runtime. Native TradingView behavior, exact public-data contract/rollover identity and NQ1! equivalence remain unverified. One-minute OHLC cannot establish perfect tick entries or all execution orders. Earlier history outside the archive cannot initialize old persistent zones. Dated manual accepted/rejected zones remain necessary to measure agreement with the trader's own selection, beyond mechanical performance.

This checkpoint completes the first baseline calibration audit. Candidate retuning, construction-timeframe ranking and untouched validation are pending and are not running in the background. The repository is the exchange point for local Claude Code to import into C:\brain\Ethereal; direct PC writing/import verification has not occurred.
