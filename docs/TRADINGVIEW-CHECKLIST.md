# TradingView acceptance checklist — v0.3.1

Status: offline checks available; official compilation and real-chart behavior remain unverified.

## First launch and cross-timeframe comparison

- [ ] Paste the complete v0.3.1 source into a new indicator. Record any exact compiler message and line.
- [ ] Use NQ1! standard candles with overnight history; leave historical Fib traces OFF initially.
- [ ] Inspect **1m engine as of** and initialization status on 1m.
- [ ] Switch to **5m, 10m, 15m, 30m, 1h and 4h** with identical symbol, feed and settings.
- [ ] At the **same engine timestamp**, compare Fib / VWAP / VP / RB prices, active states, POI bounds and members.
- [ ] Watch a live minute boundary on 1h / 4h: updates should not wait for the larger candle to close.
- [ ] Confirm forming-minute moves stay out of the frozen snapshot until the next source minute. The display has up to one minute of delay.
- [ ] Missing 1m data must be reported rather than replaced with chart candles.

## Strategy behavior

- [ ] No Fib before the range completes. The default range completes at 07:30 UTC; compare 0 / 1 to constructed **5m bodies**.
- [ ] Change construction to 10m and compare 10m-body anchors on all display charts.
- [ ] Check Friday-to-Monday retention in session mode and expiry in calendar mode.
- [ ] Retain only the two latest sets; old labels show their UTC dates.
- [ ] A completed 1m wick crossing the invalidation distance kills a level regardless of its close. A wick alone cannot arm expansion.
- [ ] RBs appear after next-source-candle confirmation, then remain for return taps. Test 5m / 10m / 15m toggles.
- [ ] RB wick boxes and price labels remain visible even with no qualifying POI or with Include RBs in confluence switched OFF. Check sparse source minutes and next-available-candle confirmation across a session gap.
- [ ] Individual Fib / VWAP / profile references and VWAP curves stay available on every supported display.
- [ ] POIs require two distinct types by default. Inspect member tooltips; display toggles and Include toggles have separate effects.
- [ ] Test colors, labels, transparency, text size, line styles and projection on the usual theme.
- [ ] Static historical Fib traces validate anchors only; they continue through invalidation. Check their capacity with live drawings.

## Comparisons and edge cases

- [ ] Compare VWAP to DRW using the same 1m sampling, source and anchor.
- [ ] Compare the estimated UTC profile to an identically anchored profile; it is not true volume-at-price.
- [ ] Compare RBs against hand-marked examples and tune the configurable thresholds.
- [ ] Compare an annotated session in Bar Replay on multiple displays at matching engine timestamps.
- [ ] Check summer, winter, weekend reopening, a holiday and a continuous-contract rollover.
- [ ] Reload after live updates and compare the final completed-minute state.
- [ ] Check loop-time, memory and 1m coverage limits on the actual TradingView subscription.

For feedback, include version, exact feed/symbol, UTC time, display timeframe, source timestamp, changed settings, observed behavior and expected behavior. Include exact compiler text for compilation failures.
