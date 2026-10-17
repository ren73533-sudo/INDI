# NQ Key-Level Indicator — Handoff Brief

**For:** GPT-6.1 (ChatGPT)
**From:** Claude (Opus 5), via Claude Code
**Date:** 2026-10-17
**Deliverable:** A TradingView Pine Script indicator that plots the trader's key levels / POIs directly on an NQ1! chart.

---

## 0. Collaboration protocol

You are picking up work that has already gone through a full requirements phase. Please:

1. **Treat §2 as fixed.** It was extracted from the trader over a long structured interview. Do not redesign the strategy, suggest "better" indicators, or substitute standard ICT/SMC definitions where the trader's own definitions differ. They differ deliberately.
2. **Treat §4 as genuinely open.** Four questions are unanswered and block exactness. Recommended defaults are given so you are not blocked — implement the defaults as **configurable inputs**, not hardcoded values.
3. **Flag disagreement rather than silently diverging.** If something in §2 is not implementable in Pine as written, say so explicitly and propose the closest alternative.
4. **Verify current Pine syntax.** §5 reflects my understanding of Pine Script v6; I may be behind on API details. Check anything that matters before relying on it.

Division of labour: I (Claude) did the requirements extraction and built a working reference implementation in PowerShell that validated the maths against live data. You are being asked to write the Pine Script. The trader will test on their own chart and report back.

---

## 1. Objective

A Pine Script v6 indicator for **NQ1!** that renders, on-chart:

- The daily Fib STDV level set (today's + previous day's)
- VWAP with ±2 and ±3 SD bands
- Daily volume profile VAH / VAL / POC
- Rejection Block zones
- **POI zones** — where 2+ of the above stack within a tolerance — highlighted distinctly from individual levels

The trader reads these at the NY open, decides for themselves, and places their own limit orders. The indicator is a **display tool**, not a signal generator. No buy/sell arrows, no automated entries, no alerts-to-trade.

---

## 2. The strategy — complete specification

### 2.1 Context

| | |
|---|---|
| Instrument | NQ1! (front-month E-mini Nasdaq 100) |
| Chart timezone | **UTC** |
| Trader timezone | Paris (UTC+1 / UTC+2) |
| Level timeframes | 4H → 1H → 15m → 5m |
| Entry timeframe | 1m, resting limit orders |
| Trading windows | NY open (primary), London intraday (secondary), **never Asia** |

**Trader type: reversal / mean-reversion.** This is the single most important fact. There is **no directional bias filter**. HTF trend is a *fade target*: 4H bullish means they are hunting a **short**. Do not build trend-following logic or filter levels by trend agreement.

**Sessions (UTC, as configured on their chart):**

| Session | UTC |
|---|---|
| Tokyo | 00:00 – 06:00 |
| London | 07:30 – 13:30 |
| New York | 13:30 – 19:50 |

⚠️ The NY session is exchange-anchored (09:30–16:00 America/New_York), so its UTC boundaries shift with US DST (13:30–20:00 summer, 14:30–21:00 winter). The Tokyo and London boundaries above are the trader's own fixed settings and do **not** shift.

### 2.2 Structure definitions

These are **candle-colour based**, not standard pivots. `ta.pivothigh` / `ta.pivotlow` will **not** reproduce them.

- **Swing high** = 3 consecutive candles `[bullish][bullish][bearish]`. The swing high price is the **highest body** of the three (`max(open, close)`). Wicks ignored.
- **Swing low** = 3 consecutive candles `[bearish][bearish][bullish]`. The swing low price is the **lowest body** of the three (`min(open, close)`). Wicks ignored.
- **BOS** = a body close beyond the prior swing in the direction of the current trend.

BOS is **not** a precondition for a level. Levels qualify by concept alignment (§2.7), not structure breaks.

### 2.3 Concept 1 — Daily Volume Profile

- Daily profile (one per day)
- **VAH** and **VAL** are tradeable levels
- **POC** has two roles: a target, and an absorption read (watching who is being absorbed at the level to confirm direction)

### 2.4 Concept 2 — Fib STDV ← the core construction

Fully mechanical from OHLC. This is the piece that must be exact.

**Window:** `00:00 → 07:30 UTC` (Tokyo open through London open). Called *the range*.

**Anchoring algorithm:**
1. Within the window, find the **highest body** (`max(open,close)`) and the **lowest body** (`min(open,close)`), recording the bar time of each.
2. Whichever printed **first in time** → level **0**.
3. Whichever printed **second in time** → level **1**.

This single rule handles both directional cases with no trend judgment. A bullish range means the low necessarily printed before the high, so "bullish → anchor low to high" and "0 = the earlier extreme" are equivalent statements. Bearish range, inverted.

**Projection:**
```
price(L) = p0 + L * (p1 - p0)
```

**Levels:**

| Band | Multipliers | Status |
|---|---|---|
| Geometry only | 1, 1.5 | **Not traded.** Plot faintly or not at all. |
| **Primary** | **±2, ±2.25, ±2.5** | Always active |
| Max expansion | ±3, ±3.5, ±4 | **Dormant** until armed (below) |

**Max-expansion arming:** the 3/3.5/4 band activates when a candle **body closes beyond ±2.5**. Once armed it functions as **both** a fade zone and a target. Before arming, do not plot it (or plot greyed out).

⚠️ **Sign convention trap:** the multiplier sign is relative to the *leg direction*, not the chart. On a **bearish** range (0 = high, 1 = low), `+2` is **below** price and `−2` is **above** it. Label plotted levels by price and position, and keep the multiplier as metadata — otherwise the labels read backwards. This bit me in the reference implementation.

**Lifecycle:**
- Drawn once per day; the leg is complete at 07:30 UTC, so nothing repaints after that
- Fixed for the session — no re-anchoring
- **Previous day's set stays live with no expiry.** A yesterday deviation is as valid as today's if it stacks.
- Two days back and older: discard

### 2.5 Concept 3 — VWAP

The trader uses a specific published indicator: **"DRW Institutional VWAP & SD Bands"**.

| Setting | Value |
|---|---|
| Anchor | Session *(which session — see §4.3)* |
| Source | **(H+L+C)/3** (hlc3) |
| SD1 multiplier | 1 — "value area" |
| SD2 multiplier | 2 — "exhaustion" |
| SD3 multiplier | 3 — "extreme overreach" |

**Traded: ±2 and ±3 only.** SD1 is context, never a trade level.

Standard volume-weighted SD maths:
```
tp     = (high + low + close) / 3
vwap   = Σ(tp × vol) / Σ(vol)
var    = Σ(vol × (tp − vwap)²) / Σ(vol)
band_k = vwap ± k × sqrt(var)
```

⚠️ Pine's built-in `ta.vwap(src, anchor, mult)` may compute its standard deviation differently from the DRW script. **Ask the trader to paste the DRW source** so you can match it exactly rather than approximating. If they can't, implement the formula above manually.

### 2.6 Concept 4 — Rejection Block (RB)

**Formation:** the dominant side is leading a move; the opposing side pushes back, leaving a **long wick against the move**; price reverses immediately after that point.

**Zone = the wick range** — from the body edge to the wick tip.

**Timeframes:** 5m / 10m / 15m.

**Two distinct uses:**
1. **As a level** (primary) — an already-formed RB is marked and left on the chart; price is expected to return and tap it later. RBs are **not** traded on formation. This is explicitly *not* pattern trading.
2. **As live confirmation** (secondary) — an RB forming *at* an already-resting limit order confirms the position is correct. This is trade management, not a level. Out of scope for v1 of the indicator.

### 2.7 POI construction

A **POI** is a cluster where two or more concepts land together.

| Rule | Value |
|---|---|
| Minimum concepts | **2** — one alone is *never* traded (trader was emphatic) |
| Maximum | None — more stacked = stronger |
| Clustering tolerance | **~15 points** *(working default — see §4.1)* |

The 15pt tolerance was chosen to mirror the invalidation distance, so a "stack" is a group tight enough that a single 15-point push would kill all of it at once.

**Side assignment is positional, not discretionary.** Given the reversal premise: stacks above price are sell-limit zones, stacks below are buy-limit zones.

### 2.8 Invalidation

A level dies when price runs **15–20 points through it**. Distance-based, **not** close-based. A level price traded 15–20 points beyond is discarded regardless of how the candle closed.

---

## 3. What's already built and verified

A reference implementation in PowerShell pulled live 5-minute NQ data and computed the full level set. It validated that §2.4's anchoring rule is unambiguous and produces sane output. **That prototype has since been deleted** (ephemeral scratch directory) — it is not a deliverable and does not need porting. Its value was proving the maths.

### 3.1 Test vector — use this to validate your Pine implementation

Live NQ data, **2026-09-23**, computed at 13:47 UTC, price 30,866.50:

```
TODAY range 00:00–07:30  [bullish]
  0 = 30,996.75  @ 03:15 UTC
  1 = 31,090.50  @ 06:35 UTC
  leg = 93.75

PREV DAY range  [bearish]
  0 = 30,900.00  @ 01:00 UTC
  1 = 30,768.75  @ 07:25 UTC
  leg = 131.25

Derived fib (today):   +2 = 31,184.25   +2.5 = 31,231.13
                       −2 = 30,809.25   −2.5 = 30,762.38
Derived fib (prev):    +2 = 30,637.50   −2 = 31,162.50   ← note inversion
max expansion: NOT armed

VWAP futures-session (22:00 UTC anchor): 30,987.0   sd 51.11
VWAP RTH (13:30 UTC anchor):             30,930.5   sd 23.02
Volume profile:  POC 31,037.5   VAH 31,060.0   VAL 30,945.0
4H regime: bullish
```

If your Pine fib calculation reproduces the two anchor pairs above on 2026-09-23, the core is correct.

### 3.2 What that run exposed

- Only **2 POIs** found, both 320–360 points from price — i.e. a thin day. Informative, not a bug.
- Both POIs were **fib + fib** (today's + yesterday's), which raises §4.2.
- VWAP −3 (30,833.7) and fib −2 (30,809.3) sat **24 points apart** — just outside the 15pt tolerance, so invisible to the engine. This is the sharpest argument that the tolerance needs tuning (§4.1).
- The volume profile was computed from Yahoo data whose volume is **not** true CME volume, so POC/VAH/VAL were approximations. **In Pine this problem disappears** — TradingView has real contract volume. Expect Pine's VP to be more accurate than the prototype's.

---

## 4. Open questions — BLOCKING exactness

These four are unanswered by the trader. Implement the recommended default as a **configurable input** and flag it in the indicator's settings panel so they can tune visually.

### 4.1 Clustering tolerance
15 points was my proposal, never validated. The 24-point VWAP/fib near-miss above suggests it may be too tight.
→ **Default: input, 15 pts, range 5–50.** Let them widen it and watch what appears.

### 4.2 Does "2 concepts" mean 2 *distinct* concept types?
Both POIs in the test run were two fib levels (today's + yesterday's). Under a loose reading that's a valid stack; under a strict reading (needs two different concept *types*) that day had **zero** POIs. The trader listed four concepts and said one alone is never enough — I suspect they mean strict, but it was never confirmed.
→ **Default: input toggle, "require distinct concept types" = ON.**

### 4.3 Which VWAP session anchor?
Futures session (22:00 UTC prior day) vs RTH (13:30 UTC). These diverged materially in testing — VWAP +2 was 31,089 vs 30,977, over 100 points apart.
→ **Default: input dropdown {Futures session, RTH, Daily UTC}, default Futures session.**

### 4.4 Rejection Block wick threshold
"Long wick" has no numeric definition. The engine currently detects zero RBs — an entire concept is offline.
→ **Default: two inputs — `wick ≥ N × body` (N default 2.0) and `wick ≥ P% of total candle range` (P default 60).** Both must pass. Ask the trader to eyeball the result against RBs they've marked by hand and tune.

### 4.5 Also undefined: "4H bullish/bearish"
The trader reads this visually. The prototype derived it from the direction of the last BOS using their own swing rule (§2.2), but with limited history that read was low-confidence.
→ Since there is no trend filter in the strategy (§2.1), this is **display-only context**. Low priority. Don't let it block the build.

---

## 5. Pine Script implementation notes

My understanding of the constraints — verify against current docs.

**Declaration:** needs raised object limits, e.g.
```pinescript
indicator("NQ Key Levels", overlay=true,
          max_lines_count=500, max_boxes_count=500, max_labels_count=500)
```

**Timezone handling:** the trader's chart is UTC, but don't rely on chart timezone. Use explicit UTC extraction (`hour(time, "UTC")`, `minute(time, "UTC")`) so the indicator behaves identically regardless of the viewer's chart settings. The 00:00–07:30 window must be UTC-absolute.

**Fib anchoring:** track within-window running extremes in `var` variables, reset at the 00:00 UTC boundary:
- `var float hiBody`, `var int hiTime`, `var float loBody`, `var int loTime`
- Update while `inWindow`; at the 07:30 boundary, compare `hiTime` vs `loTime` to assign p0/p1
- Before resetting for a new day, copy the current day's p0/p1 into `prevP0`/`prevP1`
- Levels drawn from completed-window data do **not** repaint

**VWAP:** `ta.vwap` with an anchor condition exists and can return SD bands, but see the §2.5 warning about matching DRW's exact SD maths. Manual computation of the formula in §2.5 is safer and not expensive.

**Volume profile — the hard part.** Pine has no built-in accessible VP (the TradingView VP indicators are not callable from Pine). You must bucket manually:
- `array.new_float(nBuckets, 0.0)`, distribute each bar's volume across its high–low range
- Expensive on low timeframes over long history; restrict to the **current day only**
- Make bucket count an input (suggest 50–100 rows default)
- Value area = expand outward from POC until 70% of total volume is captured → VAH/VAL
- Watch `max_bars_back` and script execution limits
- **If this proves too costly, phase it (see §6)** — it is the least essential of the four concepts for v1

**Swing detection:** trivial given §2.2 is candle-colour based. Three `close > open` / `close < open` checks on consecutive bars. Do **not** use `ta.pivothigh`/`ta.pivotlow` — different definition.

**Multi-timeframe RBs:** 5m/10m/15m via `request.security()`. Beware lookahead — use `barmerge.lookahead_off`.

**Clustering:** collect active level prices into an array with parallel arrays for label and concept-type, sort by price, walk once grouping within tolerance, count distinct concept types per group, draw a `box` for groups passing the §4.2 test.

**Rendering suggestion:** individual levels as thin lines, POI clusters as filled boxes with a label showing the stacked concept names and the count. The trader's priority is seeing *where things overlap*, not reading every level.

---

## 6. Recommended build order

Phase in this order — each phase is independently useful on the chart, and the trader can validate incrementally rather than debugging a monolith.

| Phase | Content | Why first/last |
|---|---|---|
| **1** | Fib STDV (today + prev day, primary + armed expansion) | The core construction. Exact, cheap, highest value. Validate against §3.1. |
| **2** | VWAP ±2/±3 with the anchor selector (§4.3) | Cheap, exact, resolves an open question visually. |
| **3** | Clustering / POI boxes using phases 1–2 only | Delivers the actual product — overlap detection — before the expensive parts. |
| **4** | Volume profile VAH/VAL/POC | Expensive and fiddly. Feed into clustering once working. |
| **5** | Rejection Blocks | Blocked on §4.4; needs visual tuning against hand-marked examples. |

Phases 1–3 alone would already be useful to the trader every morning.

---

## 7. Known risks

- **DRW VWAP mismatch** — if the SD maths differs from the published indicator, every VWAP level is slightly off and the trader will notice. Get the source if possible.
- **Volume profile cost** — may hit Pine execution limits. Have a fallback (coarser buckets, current day only, or higher chart TF).
- **Contract rollover** — NQ1! is continuous; the session windows and prior-day levels should be checked for sane behaviour across a roll date.
- **DST** — only the NY session shifts (§2.1). Tokyo/London are the trader's fixed UTC settings. Don't "helpfully" make them exchange-anchored.
- **Weekend/holiday gaps** — the 00:00–07:30 window won't exist on non-trading days. Handle empty windows without carrying stale anchors.

---

## 8. Settled — do not re-open

These were decided with the trader directly. Changing them means changing the strategy.

1. Swing definition is **candle-colour based on bodies**, not standard pivots.
2. Fib anchors use **bodies, not wicks**.
3. Level **0 is the chronologically earlier** extreme.
4. Fib multipliers 1 and 1.5 are **geometry only**, never traded.
5. VWAP **SD1 is never a trade level** — only ±2 and ±3.
6. RBs are marked and left for a **return tap**; never traded on formation.
7. Previous day's fib deviations have **no expiry**; two days back is discarded.
8. Minimum **2 concepts** — one is never enough.
9. Invalidation is **distance-based (15–20 pts)**, never close-based.
10. **No trade signals, no entry arrows, no sizing, no targets** in the output. The trader confirms everything independently. This is a display tool.

---

## 9. What to ask the trader

If you need input, these are the highest-value asks, in order:

1. The **DRW Institutional VWAP & SD Bands source code** (§2.5) — removes the biggest accuracy risk.
2. A **screenshot of a morning they've marked up by hand**, with the date, so the indicator's output can be diffed against their own markup. This is the real acceptance test.
3. Answers to §4.1–4.4, though sensible defaults mean these don't block you.

---

*Requirements extracted from trader interview 2026-09-23. Strategy spec also lives in `STRATEGY.md` alongside this file. Nothing here constitutes financial advice; the indicator renders the mechanical output of the trader's own rules, which they verify independently before acting.*
