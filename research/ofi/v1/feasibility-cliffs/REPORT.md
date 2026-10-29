# OFI v1 preliminary NQ study

Source: Public TopstepX/ProjectX NQ archive (provider claim). TradingView NQ1! equivalence: unverified. Native Pine compilation is unverified.

Rules were frozen before this OFI run; no parameter optimization. Full original history was replayed through the production Pine source.

| Split | Complete RTH days | Trades | Net win rate | Net USD | Profit factor | Ambiguous |
|---|---:|---:|---:|---:|---:|---:|
| development | 39 | 0 | n/a | 0.00 | n/a | 0 |
| holdout | 20 | 0 | n/a | 0.00 | n/a | 0 |
| all | 59 | 0 | n/a | 0.00 | n/a | 0 |

Holdout Monte Carlo not estimated: no trades.

Win = net P&L > 0 for the stated 2R/stop/60-minute model, one NQ contract, $4.50 round-trip fees and 1 tick adverse slippage on each side. Two-boundary candles use stop-first; target-first sensitivity is in results.json. Drawdowns use closed-trade equity and exclude intratrade excursion. Bootstrap percentiles are conditional uncertainty estimates, not a forecast or additional observed trades.

The limited data window and undocumented historical contracts/rolls prevent a robust NQ1! performance claim. Holdout dates are now consumed for this OFI baseline; subsequent tuning needs new validation data. No DOM, true delta, GEX, TPO or five-day composite is modeled.

See manifest.json for frozen methodology and hashes, coverage.json for incomplete-day exclusions, signals.csv for actual Pine signals and trades.csv for the complete derived ledger. Raw market data is not redistributed.
