# 幽玄 — Ethereal v1.3.0

**幽玄 (Yūgen)** is the separate, box-based indicator requested by the trader. Paste the complete [ethereal.pine](../indicators/ethereal.pine) into a new TradingView Pine Editor indicator, save and add it to NQ1!. All settings are English; the indicator name is Japanese.

[Download the folder](https://github.com/ren73533-sudo/INDI/raw/refs/heads/main/downloads/Ethereal-v1.3.0.zip).

Version 1.1 corrects the earlier stair-step display. Confluence now establishes a **resting horizontal price area for a later return tap**. The area stays at its original prices while VWAP / profile move, and projects to the right until price invalidates it.

Version 1.2 fixes the last-bar-only export and drawing gates that left earlier Bar Replay cursors without zones. It transports compact zone history on every available source bar and updates the drawing on every available chart bar. The strategy, settings, resting-area bounds and green/yellow rules are preserved.

Version 1.3 adds optional in-box confluence text and β / ρ side symbols, plus optional beyond-wick placement and first-return filtering following trader feedback. These options are calibration tools; improved reversal accuracy has not been measured. The script declares Pine Script v6.

## What appears

Rectangles can contain optional text and side symbols. No individual Fib lines, VWAP curves, RB drawings, separate price labels, dashboard or arrows appear. The original full-display `nq_key_levels.pine` remains available separately.

| Box | Qualification |
| --- | --- |
| Green | At least two distinct concept types align within the configured tolerance |
| Yellow | All four types align, an aligned RB meets the chosen reference timeframe, and the configured VAH/VAL reversal condition is satisfied |

The four types are **Fib STDV, VWAP ±2/±3, VAH/VAL and confirmed RBs**. Examples of green: RB 10m + Fib +2.5, or Fib STDV + VWAP −2. Three types also qualify. Four types without full yellow qualification remain green. Disabling a type does not lower the four-type yellow requirement.

Two Fib levels count as one type, including today and the previous session. Several RB timeframes also count as one type. POC, VWAP center / ±1, and Fib geometry never qualify. Dormant Fib expansions qualify only after arming. There is no trend filter and no required order of appearance of the four confluences.

Yellow is the requested stronger confluence grade. Its reversal success rate has not been measured.

## Box text and side symbols

**Show confluence text** defaults ON. A box can read `ρ  STDV | VWAP | VAH | RB 10m`. Text lists the actual concept families at formation, with contributing RB timeframes. Multiple levels in a family still count as one type. This is a concise family summary, not a list of every level price or multiplier. OTE is not calculated or claimed.

**Show reversal side symbol (β / ρ)** is a separate toggle, default ON:

- **β** = support / buy-reversal area (source-anchor side −1).
- **ρ** = resistance / sell-reversal area (source-anchor side +1).

These describe the frozen zone side. They are not confirmations that a reversal or entry has occurred, and do not flip when price moves or the chart timeframe changes. Show symbols only, names only, both, or neither. **Confluence text color** and **Confluence text size** apply to both. Text is centered inside the rectangle.

The formation label is frozen. If the area later upgrades to yellow, the yellow segment gets its own known contributors; the earlier green segment retains its original label. Labels do not change eligibility, color, price bounds or timestamps.

## Optional placement for sweeps beyond an RB wick

The trader reported reversals beyond the original RB wick tip. The new **RB zone placement → Beyond wick confluence** option uses an already known Fib, VWAP or VAH/VAL level beyond an aligned RB's wick: above an upper rejection wick for resistance, below a lower wick for support. It selects the nearest eligible outer level; equal distances prefer the higher RB timeframe, then Fib before VWAP before profile. At least two distinct types still qualify, and non-RB pairs retain the original rules.

The outer level must be at least **Minimum distance beyond RB wick**, default 0.25 point (one NQ tick), beyond the tip, no farther than **Confluence tolerance**, and strictly before the RB's configured price-invalidation threshold. If an RB stack has no such level, it is skipped in this mode. There is no arbitrary price offset, reference to a later reversal candle or future-data placement.

The new band centers on that known outer level, with **Zone height** plus padding and outward tick rounding. In this mode, Cover confluence span uses the selected outer point rather than including the old wick. Bounds freeze at formation, even if the chosen VWAP/profile reference moves afterward. The selected RB supplies the consumed anchor identity, side and original wick-based invalidation. A level beyond the old invalidation distance needs a deliberate calibration change, not automatic relocation of its invalidation threshold.

**Hide zones after first return**, default OFF, hides a zone after the first completed 1m candle overlaps its price band following creation. It also skips formation when that same candle already reaches the proposed band, so a newly displayed area is still awaiting a return. The initial formation candle is not counted as a later return. The record remains stored and its normal price invalidation is unchanged. First-return tracking starts at zone creation; it does not claim the area was never traded before confluence formed. A forming-minute touch has no effect until it enters the completed-source snapshot. Earlier replay cursors retain their earlier view.

To try the new behavior, choose **Beyond wick confluence**, enable **Hide zones after first return**, and leave the text/symbol toggles ON if wanted. This reduces eligible RB stacks and removes already-returned areas; it can also omit areas that were useful under the original placement. **Original anchor** remains the default placement, so existing price calibration is preserved. Use annotated sessions to judge the tradeoff. These options have synthetic software tests, not measured NQ reversal results, and cannot guarantee exact top/bottom-tick entries.

## Yellow reference and reversal

The trader chose a **configurable reference timeframe, default 5m**, rather than the display chart timeframe. Confirmed RB sources remain 5m / 10m / 15m. At a 10m reference, RB 5m can still help form green, but RB 10m or 15m must participate for yellow. Switching the chart to 1h or 4h does not change this reference or the colors.

By default, the VAH/VAL reversal is:

- A completed 1m candle touches a previously known VAH or VAL, within **1 point**.
- At VAH it closes below VAH and below its open; at VAL it closes above VAL and above its open.
- The reaction occurred within **15 minutes**, in the same UTC profile day, and its edge price remains within the confluence tolerance of the aligned profile member.

The candle-direction requirement, touch tolerance and memory are adjustable. Turning off **Yellow requires a VAH / VAL reversal** grades any four-type stack with a qualifying RB yellow. A reaction can occur before or after the other confluences; the box is green until the full yellow conditions are known. No prescribed sequencing is enforced.

## Size, color and anchoring

| Setting | Default |
| --- | --- |
| Confluence tolerance | 15 points, adjustable 0.25–100 |
| Zone sizing / height | Fixed height / 5 points before padding |
| Padding on each price edge | 0.5 point |
| Right projection | 240 minutes beyond the latest completed source minute |
| Automatic zone expiration | Off; retain until price invalidation |
| Active zones shown | Nearest 8; configurable |
| Merge distance | 0 points; anchors inside an existing band share it |
| Colors | Green / yellow, independently customizable |
| Fill transparency | 78%; adjustable 0–100% |
| Border width | 1; adjustable 0–4 |
| Invalidated zones | Hidden by default; optional history for 2 calendar days |
| Total storage | Up to 150 zones |

Tolerance decides whether concepts align **when a zone is established**. With **Original anchor**, a fixed Fib anchor is preferred, followed by an already formed RB wick, then the profile edge for a VP + VWAP pairing. With **Fixed height** (default), the band is centered on the qualifying Fib / profile price or on the RB wick location where the concepts stack. Its height is the requested number of points plus per-side padding, rounded outward to the symbol's tick size. Confluence tolerance is independent of the visible height: a nearby reference can qualify within tolerance without sitting inside the narrower rectangle.

Choose **Cover confluence span** to include the qualifying interval and source anchor in the rectangle; Zone height then sets its minimum thickness. Both sizing modes freeze their price bounds at creation.

After creation, its **start and price bounds never move**. VWAP/profile drift, disappearance of the original instantaneous alignment, a normal return tap (when first-return hiding is OFF), or expiration of the yellow reaction window do not delete or restart it. Repeated alignment with the same anchor does not draw another box. Nearby anchors inside the band share it; the merge-distance setting can widen that association without changing the existing bounds.

The band's side and invalidation thresholds are frozen from its source anchor. A resistance area is invalidated by a wick at the original anchor's upper edge plus the configured distance; support by a wick at its lower edge minus the distance. A close beyond the level is not required. Padding / zone height are visual and do not change those thresholds. An invalidated anchor does not immediately respawn merely because the references align again.

Active bands project to **the latest completed source timestamp + Right projection**, independently of chart candles and viewport zoom. Only the right edge advances with market time. Set an optional expiration in days if wanted. Storage capacity and available source history also bound retention. Broken areas are hidden by default; enabling their history shows them ending at invalidation / expiry time.

When a green area earns yellow qualification later, it keeps the same price band and original formation timestamp. Its earlier green part remains green, and the yellow part starts at the qualification timestamp and continues forward. A qualified yellow area's grade does not flicker back to green as moving references change. Yellow rectangles draw above overlapping green ones.

Boxes use **absolute timestamps and price coordinates**, with `xloc.bar_time` and no viewport coordinates. Keep the indicator pinned to the same price scale as NQ. The active display limit selects the nearest retained areas; other stored areas can become visible as price approaches, at their original anchors.

## Strategy calculations and data

Supported standard-candle displays: **1m, 5m, 10m, 15m, 30m, 1h, 4h**. All calculation and event timestamps come from one shared 1m stream, independently of the display timeframe. The snapshot excludes the forming source minute, so changes appear with up to one minute of delay. A closed market does not create extra source bars.

The source calculations preserve the existing strategy: 00:00–07:30 UTC body-based Fib anchors, primary ±2/±2.25/±2.5 and armed expansions, two published Fib sets, volume-weighted hlc3 VWAP and SD, estimated UTC daily profile, wick-based RBs and distance-based invalidation. Calibration remains available in Settings.

Load overnight and prior-session history. **Engine history** defaults to 6,000 one-minute candles, adjustable 3,000–100,000 subject to feed and account limits. Longer requested box history also needs sufficient engine history. Missing Fib-window minutes prevent Fib publication; incomplete VWAP/profile initialization prevents those concepts from qualifying. No chart-candle substitute or fabricated zone is used. With fewer than two available types, no box appears.

The profile estimates volume by distributing candle volume across its high–low range; it is not actual volume-at-price. Matching the DRW VWAP remains unverified without its source.

## Bar Replay

Replace the entire older Ethereal script with `indicators/ethereal.pine`, save it and add the updated indicator. Start replay after loading overnight history and allow at least one new source minute for a completed-minute snapshot. Use the same symbol, session and settings when comparing timeframes.

Each historical chart bar now receives the zones known at its completed-source timestamp. A later invalidation or yellow upgrade does not alter an earlier cursor's snapshot. Quiet replay steps advance the right projection without moving the original start or prices. Drawing objects are rebuilt only when the visible zone selection or state changes.

The source caches a compact string when zone state changes, rather than copying the mutable level/profile collections into every historical snapshot. The hidden `f_engine(true)` audit argument exposes those raw collections only for offline numerical comparisons; production uses `f_engine()`.

Replay still needs available 1m history within the **Engine history** setting and the feed/account limits. A cursor outside that coverage has no source state. Missing warmup or fewer than two eligible concept types also yields no box. Invalidated zones are hidden by default; enable **Show invalidated / expired zones** to inspect retained broken areas. This release has been checked with synthetic historical cursors; native TradingView Bar Replay remains an external acceptance check.

## Development and validation

The standalone Pine file is generated from the existing indicator's calculation engine and the templates in `tools/ethereal/`. It has no runtime dependency on other files in TradingView. The generator does not edit the original indicator.

```sh
node tools/build-ethereal.mjs
node tools/build-ethereal.mjs --check
npm test
```

Tests cover every distinct pair, order independence, yellow requirements, reference-timeframe filtering, actual green/yellow boxes across all seven displays, point/time calibration, text/symbol toggles and styles, outside-wick placement and rejection of unavailable sweep prices, completed-minute first-return filtering, persistence after lost alignment, normal return taps, wick invalidation, prevention of duplicate staircases / respawning, display filtering, VAH/VAL reactions, frozen source snapshots, preserved anchors and equality with the original engine calculations. Replay tests compare historical cursors with independent prefix-only runs on all seven displays, include later invalidations, round-trip 150 compact records and check right-edge advancement during quiet steps. Production-default timeframe checks use the unchanged standalone source. Custom offline fixtures only materialize input default literals to work around PineTS input forwarding.

TradingView compilation, actual chart zoom / scale interaction, live source-context rollback, NQ feed behavior and account runtime / memory limits still require TradingView testing. Synthetic software checks are not a real-market backtest.

For the first chart test, use identical symbol, data session and settings across displays; inspect a green pair, a yellow full stack, a late yellow upgrade, and zoom / pan both axes. In Bar Replay, advance through formation, a quiet interval, a return tap and invalidation, then restart at an earlier cursor to compare the areas. Compare against your manually marked VAH/VAL, STDV and RB examples. If TradingView rejects the script, record the exact Pine Editor or red-exclamation error; offline tests cannot diagnose an unseen native error.
