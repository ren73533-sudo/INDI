---
project: Ethereal
type: baseline-definition
status: frozen-source-proposed-experiments
created: 2026-10-27
---

# Baseline configuration

| Item | Identity |
| --- | --- |
| Indicator | Ethereal / Yugen v1.4.0, Pine v6 |
| Source commit | `0d36157e2aee6a7e4daa99cc6ffc94d4d982e446` |
| Source SHA-256 | `1304c756d9b725701181c3f3dd8722387157b47d82fe7f3817cf9e5d482f2709` |
| Production source | `indicators/ethereal.pine` in INDI |

`Evidence/Range defaults.json` records all 58 code-default inputs. `Evidence/Midnight baseline.json` changes only Fib anchoring to **Midnight open / first body swing**. These are proposed study configurations; the trader's current chart inputs have not been exported.

Both include active Fib STDV inside the band plus another distinct concept type, the CME 18:00 New York VWAP anchor, HLC3 source, two/Fib-set retention as configured, RBs on 5m/10m/15m and the configured yellow reaction rule. The seven display timeframes share one engine.

Any source-history override needed for full-period replay must be recorded separately in each run's exact settings and methodology; do not silently change the production defaults or present a limited-history run as full-period coverage.

Do not change the source while measuring a frozen experiment. Record later changes and their reason in [[Ethereal/Decisions]].
