> SUPERSEDED: this intermediate run included initialization days in bootstrap dates. See ../run-2026-10-29/ for corrected eligibility and Monte Carlo. The signal source and five trades are unchanged.

# OFI v1 preliminary NQ study

Source: Public TopstepX/ProjectX NQ archive (provider claim). TradingView NQ1! equivalence: unverified. Native Pine compilation is unverified.

The shelf revision was frozen before observing any trade outcomes. An initial cliff-only feasibility run produced zero signals and is preserved separately. The later split is exploratory chronological validation, not a pristine untouched holdout. No performance optimization followed. Full original history was replayed through the production Pine source.

| Split | Complete RTH days | Trades | Net win rate | Net USD | Profit factor | Ambiguous |
|---|---:|---:|---:|---:|---:|---:|
| development | 39 | 5 | 40.0% | 337.50 | 1.13 | 0 |
| holdout | 20 | 0 | n/a | 0.00 | n/a | 0 |
| all | 59 | 5 | 40.0% | 337.50 | 1.13 | 0 |

Holdout Monte Carlo not estimated: no trades.

Win = net P&L > 0 for the stated 2R/stop/60-minute model, one NQ contract, $4.50 round-trip fees and 1 tick adverse slippage on each side. Two-boundary candles use stop-first; target-first sensitivity is in results.json. Drawdowns use closed-trade equity and exclude intratrade excursion. Bootstrap percentiles are conditional uncertainty estimates, not a forecast or additional observed trades.

The limited data window and undocumented historical contracts/rolls prevent a robust NQ1! performance claim. Holdout dates are now consumed for this OFI baseline; subsequent tuning needs new validation data. No DOM, true delta, GEX, TPO or five-day composite is modeled.

See manifest.json for frozen methodology and hashes, coverage.json for incomplete-day exclusions, signals.csv for actual Pine signals and trades.csv for the complete derived ledger. Raw market data is not redistributed.

## Full-sample Monte Carlo (exploratory only)

10,000 moving-day-block resamples of the 59 complete RTH days (including empty days), using only 5 observed trades. The 95% empirical net-win-rate interval is **0%–80%**, conditional on paths with trades; **499 paths have no trades**, so their win rate is undefined and excluded from that interval. Net P&L percentiles are **-$3,513 / $227.50 / $5,430** (2.5th / median / 97.5th), with **43.97%** of paths losing money. Realized drawdown 97.5th percentile: **$4,352.50** for one NQ contract.

All five trades belong to the failed-auction setup: two wins, three losses. Balanced VWAP has no market trades in this run. Five trades over four trading days are insufficient to establish an edge; Monte Carlo does not increase that sample. The later 20-day split contains no trades and supplies no win-rate validation.
