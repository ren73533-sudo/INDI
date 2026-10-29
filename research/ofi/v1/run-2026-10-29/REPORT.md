# OFI v1 preliminary NQ study

Source: Public TopstepX/ProjectX NQ archive (provider claim). TradingView NQ1! equivalence: unverified. Native Pine compilation is unverified.

The shelf revision was frozen before observing any trade outcomes. An initial cliff-only feasibility run produced zero signals and is preserved separately. The later split is exploratory chronological validation, not a pristine untouched holdout. No performance optimization followed. Full original history was replayed through the production Pine source.

| Split | Eligible RTH days | Trades | Net win rate | Net USD | Profit factor | Ambiguous |
|---|---:|---:|---:|---:|---:|---:|
| development | 37 | 5 | 40.0% | 337.50 | 1.13 | 0 |
| holdout | 20 | 0 | n/a | 0.00 | n/a | 0 |
| all | 57 | 5 | 40.0% | 337.50 | 1.13 | 0 |

Holdout Monte Carlo not estimated: no trades.

Full-sample exploratory Monte Carlo: 10000 paths over 57 eligible days from only 5 observed trades. Net-win-rate 95% empirical interval 0.0%–75.0%, conditional on paths with trades (497 zero-trade paths have undefined win rate). Net P&L 2.5th/median/97.5th percentiles: $-3513.00 / $227.50 / $5592.50. Fraction of paths losing money: 43.8%. Realized drawdown 97.5th percentile: $4397.50. These are conditional diagnostics from a small sample, not evidence of an edge.

Win = net P&L > 0 for the stated 2R/stop/60-minute model, one NQ contract, $4.50 round-trip fees and 1 tick adverse slippage on each side. Two-boundary candles use stop-first; target-first sensitivity is in results.json. Drawdowns use closed-trade equity and exclude intratrade excursion. Bootstrap percentiles are conditional uncertainty estimates, not a forecast or additional observed trades. Complete days lacking a usable preceding profile are initialization exclusions, not zero-trade bootstrap days; see coverage.json.

The limited data window and undocumented historical contracts/rolls prevent a robust NQ1! performance claim. Holdout dates are now consumed for this OFI baseline; subsequent tuning needs new validation data. No DOM, true delta, GEX, TPO or five-day composite is modeled.

See manifest.json for frozen methodology and hashes, coverage.json for exclusions, signals.csv for actual Pine signals and trades.csv for the complete derived ledger. Raw market data is not redistributed.
