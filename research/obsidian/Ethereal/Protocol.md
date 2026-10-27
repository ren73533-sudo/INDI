---
project: Ethereal
type: study-protocol
status: active
created: 2026-10-27
---

# Study protocol

## 1. Freeze the baseline

Record the actual Ethereal source hash, revision, runtime and full settings for every run. Start with separate named experiments for **Range body extremes** and **Midnight open / first body swing**; do not pool their results.

The configuration files in `Evidence` are snapshots of the code defaults and a proposed midnight-mode variant. They are not an export of the trader's live TradingView settings. Mandatory active Fib STDV inside the visible band remains ON, with at least one other distinct concept type.

## 2. Validate the data and replay

Check UTC timestamps, duplicate or invalid rows, price tick alignment, volume, overnight coverage, RTH coverage and gaps. Record provider identity and the unresolved contract/rollover methodology. Exclude unusable initialization periods. S01 requires two published Fib sets and records the engine's VWAP/profile readiness; the actual indicator determines which concept sources may qualify a visible zone.

The older `tools/poi-study.mjs` loads `nq_key_levels.pine`, not Ethereal. S01 uses `tools/ethereal-replay.mjs` and `tools/run-ethereal-session.mjs` to replay the actual `ethereal.pine` source. Preserve its resting boxes, mandatory Fib rule, frozen side, grade history, display selection and first-return policy. Label the external data source honestly; it is not a verified TradingView NQ1! feed.

The production history default is 6,000 source minutes, while the dataset contains 83,919 rows. Declare the study history setting and any batching/initialization rules. Do not interpret unavailable historical snapshots as zero qualifying zones. Test that adding later candles does not change earlier scored states under the declared history policy, and explicitly account for history-window boundaries.

Check all seven display timeframes for consistency. They share one 1m engine and are not seven independent performance samples.

## 3. Preserve a chronological validation set

Reserve the latest 20 complete overnight/RTH dates: **2026-03-18 through 2026-04-15**, with the exact dates listed in `Evidence/study-design.json`. Use preceding dates for calibration after initialization and coverage exclusions. The prior history may initialize the validation replay, but validation outcomes must not influence parameter selection.

Choose a small, documented set of calibration candidates. Record every candidate and its exclusions, including unsuccessful candidates. Freeze the selected rules before opening validation results. If validation outcomes are subsequently used to change rules, relabel that period as development data and require new untouched validation data.

## 4. Define a causal zone-contact event

- Use the visible, eligible zone state known before the contact candle; the contact candle cannot create its own tested zone.
- Use the zone's frozen beta/rho side. Define a valid approach from above for support/buy areas and from below for resistance/sell areas. Exclude an already-straddled prior close from the initial approach study.
- Identify a resting zone by its original formation timestamp, frozen prices and side. Separate its first contact from later retests, and avoid counting overlapping warmup/batch copies twice.
- Record the grade known at contact. A later yellow upgrade cannot recolor an earlier green event.
- Apply the actual display cap and first-return settings. Keep retained-but-hidden zones distinguishable from the areas the trader could see.
- Score NY RTH as the primary session and the fixed-UTC London window separately. Overnight data remains necessary for construction and initialization.

## 5. Measure reactions

Use 5-, 15- and 30-minute elapsed horizons. The initial price reference is the contact candle's close; observation begins with the following candle. This measures post-contact reactions and does not claim an intrabar resting-limit fill.

Record favorable and adverse excursion, directional close change, penetration beyond the frozen band, and timing. Report counts by green/yellow grade, Fib mode, concept combination, side and session. Include coverage/exclusion counts and event-level CSV evidence alongside summaries.

If used, a symmetric 15-point first-hit comparison is a descriptive benchmark, not the trader's stop or target. An observed open at or beyond one threshold establishes that boundary first. If the candle opens between thresholds and both occur within that minute, mark the order **ambiguous**. Missing follow-up candles make the relevant horizon **incomplete**. Do not select an assumed intrabar path.

One-minute OHLCV cannot establish exact top/bottom ticks, queue position or tick-by-tick fill order. The separately frozen S01 trade baseline is midpoint limit / planned SL20 / BE60 / fixed TP130, one position, NY RTH entries and session-end exit. Full rules and ambiguity handling are in [[Ethereal/Runs/2026-10-27-S01/Report|S01 report]] and its Trade model.json. Costs remain unspecified; trade results are gross points only.

## 6. Review failures before changing rules

Inspect dated event examples: rejected areas, missed manual zones, box penetration followed by reversal, and wrong-side or late formations. Compare against the trader's annotated zones identified before the touch. Data alone does not define the trader's discretionary selection.

For yellow areas, count how often each condition is available: four concept types, an aligned RB meeting the reference timeframe, the configured VAH/VAL reaction and the display/first-return policy. A small or absent yellow sample is a reported result, not a reason to fabricate yellow qualification.

## 7. Write a permanent run record

Each `Runs/<run-id>/` directory contains `Report.md`, the exact `Settings.json`, machine-readable summary/event files, and any figures. Use [[Ethereal/Templates/Run report]] and link completed runs from [[Ethereal/Index]]. Record source/data hashes, periods, methodology, exclusions and limitations. Separate software correctness from market outcomes and measured outcomes from interpretation.
