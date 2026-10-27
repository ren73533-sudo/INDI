---
project: Ethereal
type: session-progress
status: calibration-complete-validation-pending
created: 2026-10-27
---

# S01 progress

- 2026-10-27T14:41:10.909759+00:00: Session started. Source/settings and data identities frozen; latest 20 complete dates remain reserved.
- 2026-10-27T14:41:10.909759+00:00: Actual-Ethereal replay, reaction scoring and the user-defined 20/60/130 trade model are under implementation and independent methodological review.
- 2026-10-27T14:41:10.909759+00:00: Initial planned benchmark is a continuous prefix through January 23, scoring January 22–23 only. Runtime/memory will determine the size of the next batch.



- 2026-10-27T18:39:13.781Z: Resumed after usage interruption. Replay, reaction and trade scorer tests pass. Trade simulation now correctly counts known stop-only entry-minute losses.
- 2026-10-27T18:39:13.781Z: Initial two-date pilots complete: Range 14.12 seconds / 657.9 MiB peak RSS; Midnight 15.72 seconds / 677.4 MiB. Both entered zero trades, so no trade win rate exists yet. Range had one reaction event / one unfilled midpoint attempt; Midnight had none. CSV export quoting defect found by independent audit and corrected before publication.
- 2026-10-27T18:39:13.781Z: Extended scope frozen: 37 calibration dates, unchanged 5m construction, Range and Midnight separately, continuous source prefix through March 17. Twenty validation dates remain unreplayed.

- 2026-10-27T18:50:45.872439+00:00: Both clean extended runs completed: 55,439 bars each, 37 complete scored dates, 14,430 ready RTH minutes each. Range: 42 entries / 40 resolved / 2 ambiguous; TP130 5/40; +199.75 gross resolved points. Midnight: 33 / 32 / 1; TP130 2/32; -173.75 gross resolved points.
- 2026-10-27T18:50:45.872439+00:00: Second read-only artifact audit verified hashes, slice, standard CSV parsing, SL/BE/TP, session timing, no overlap and untouched holdout. Full journals and machine-readable evidence prepared for Obsidian. First baseline calibration complete; retuning/timeframe ranking/validation pending. No background process remains.
