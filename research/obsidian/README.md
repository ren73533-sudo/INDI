# Ethereal research notes for Obsidian

Copy the `Ethereal` directory next to this file into the local Obsidian vault. For this project, the requested destination is `C:\brain\Ethereal`.

This repository is the exchange point between the cloud workspace and the trader's local Claude Code session. The cloud session cannot directly read or write the PC's drive. Local filesystem permission must be granted in the local Claude Code session.

## Local Claude Code handoff

Give Claude Code the following instruction from the PC:

```text
You may create and update C:\brain\Ethereal for the INDI/Ethereal research project.
Read https://github.com/ren73533-sudo/INDI and import research/obsidian/Ethereal into that directory.
Use only that dedicated directory for this import. Preserve the rest of the vault and its .obsidian configuration.
Keep the directory structure, Markdown frontmatter, Obsidian links and JSON evidence files intact.
If an existing destination file has different local content, preserve it and place the incoming file in a dated Imports subdirectory; report the conflict instead of overwriting it.
Open Index.md and report which files were imported.
Do not invent market results. Read the latest S01 report and progress log to distinguish completed measurements, active work and untested hypotheses.
```

Subsequent cloud-generated runs belong under `Ethereal/Runs/<run-id>/`. Preserve completed run records; corrections should explain the change and reference the prior run.

Raw third-party market CSV files are not bundled here. The provenance note records their origin and checksums. No entire vault is uploaded to this repository.

## Current status

- Prepared: data provenance, validation record, configuration snapshots, protocol and report template.
- Historical record: 62 offline software checks previously passed; this does not establish market performance.
- Completed: S01 first 37-date actual-Ethereal calibration audit, two separate 5m-construction modes, individual trade journals and CSV/JSON evidence.
- Fresh research checks: 52 passed; full execution log retained in S01.
- Pending: candidate retuning, construction-timeframe comparison and the 20 untouched validation dates. No background run is active at this checkpoint.
- Not verified: native TradingView compilation/replay, direct equivalence of the public data to TradingView NQ1!, or net profitability/predictive performance on untouched data.
