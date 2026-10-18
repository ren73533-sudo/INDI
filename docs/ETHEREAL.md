# 幽玄 — Ethereal v1.0.0

**幽玄 (Yūgen)** is the separate, boxes-only indicator requested by the trader. Paste the complete [ethereal.pine](../indicators/ethereal.pine) into a new TradingView Pine Editor indicator, save and add it to NQ1!. All settings are English; the indicator name is Japanese.

[Download the folder](https://github.com/ren73533-sudo/INDI/raw/refs/heads/main/downloads/Ethereal-v1.0.0.zip).

## What appears

Only rectangles appear: no individual Fib lines, VWAP curves, RB drawings, price labels, dashboard, arrows or box text. The original full-display `nq_key_levels.pine` remains available separately.

| Box | Qualification |
| --- | --- |
| Green | At least two distinct concept types align within the configured tolerance |
| Yellow | All four types align, an aligned RB meets the chosen reference timeframe, and the configured VAH/VAL reversal condition is satisfied |

The four types are **Fib STDV, VWAP ±2/±3, VAH/VAL and confirmed RBs**. Examples of green: RB 10m + Fib +2.5, or Fib STDV + VWAP −2. Three types also qualify. Four types without full yellow qualification remain green. Disabling a type does not lower the four-type yellow requirement.

Two Fib levels count as one type, including today and the previous session. Several RB timeframes also count as one type. POC, VWAP center / ±1, and Fib geometry never qualify. Dormant Fib expansions qualify only after arming. There is no trend filter and no required order of appearance of the four confluences.

Yellow is the requested stronger confluence grade. Its reversal success rate has not been measured.

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
| Minimum box height | 5 points |
| Padding on each price edge | 0.5 point |
| Maximum duration | 120 minutes |
| Colors | Green / yellow, independently customizable |
| Fill transparency | 82%; adjustable 0–100% |
| Border width | 1; adjustable 0–4 |
| History retained | 2 calendar days, up to 150 boxes |

Tolerance decides whether concepts align. Height and padding decide how their rectangle looks. Each rectangle covers the common confluence interval / gap, expanded to the minimum height and padding, with edges rounded outward to the symbol's tick size. A broad RB does not force a box to span the entire wick if the other concepts align within only part of it.

Boxes use **absolute timestamps and price coordinates**, with `xloc.bar_time` and no viewport coordinates or right extension. Duration is in minutes, not chart candles. Their start and price bounds stay fixed. Zooming does not enter the calculations. Keep the indicator pinned to the same price scale as NQ.

A live rectangle ends early when its alignment breaks or its green/yellow qualification changes. A color change starts a new rectangle at that confirmation time; it never paints yellow onto earlier green history. If alignment continues past the duration cap, a new rectangle begins. Historical rectangles remain until their age or capacity limit removes them. They show past qualification, not current eligibility. Yellow rectangles draw above overlapping green ones.

## Strategy calculations and data

Supported standard-candle displays: **1m, 5m, 10m, 15m, 30m, 1h, 4h**. All calculation and event timestamps come from one shared 1m stream, independently of the display timeframe. The snapshot excludes the forming source minute, so changes appear with up to one minute of delay. A closed market does not create extra source bars.

The calculation engine preserves the existing strategy: 00:00–07:30 UTC body-based Fib anchors, primary ±2/±2.25/±2.5 and armed expansions, two published Fib sets, volume-weighted hlc3 VWAP and SD, estimated UTC daily profile, wick-based RBs and distance-based invalidation. Calibration remains available in Settings.

Load overnight and prior-session history. **Engine history** defaults to 6,000 one-minute candles, adjustable 3,000–100,000 subject to feed and account limits. Longer requested box history also needs sufficient engine history. Missing Fib-window minutes prevent Fib publication; incomplete VWAP/profile initialization prevents those concepts from qualifying. No chart-candle substitute or fabricated zone is used. With fewer than two available types, no box appears.

The profile estimates volume by distributing candle volume across its high–low range; it is not actual volume-at-price. Matching the DRW VWAP remains unverified without its source.

## Development and validation

The standalone Pine file is generated from the existing indicator's calculation engine and the templates in `tools/ethereal/`. It has no runtime dependency on other files in TradingView. The generator does not edit the original indicator.

```sh
node tools/build-ethereal.mjs
node tools/build-ethereal.mjs --check
npm test
```

Tests cover every distinct pair, order independence, yellow requirements, reference-timeframe filtering, actual green/yellow boxes across all seven displays, point/time calibration, VAH/VAL reactions, frozen source snapshots, preserved anchors and equality with the original engine calculations. Production-default timeframe checks use the unchanged standalone source. Custom offline fixtures only materialize input default literals to work around PineTS input forwarding.

TradingView compilation, actual chart zoom / scale interaction, live source-context rollback, NQ feed behavior and account runtime / memory limits still require TradingView testing. Synthetic software checks are not a real-market backtest.

For the first chart test, use identical symbol, data session and settings across displays; inspect a green pair, a yellow full stack, a late yellow upgrade, and zoom / pan both axes. Compare against your manually marked VAH/VAL, STDV and RB examples.
