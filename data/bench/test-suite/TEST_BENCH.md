# UI Test Suite Speed-Up: Benchmark Report

Full timing record of every measured run performed while converting the UI
test suite (`tests/panels/{wunderbaum,visnetwork,jsoneditor,terminalmirror}`,
`tests/usecases`) from fresh-`pn.serve()`-per-test + hardcoded `time.sleep()`
to module-scoped shared servers + condition-based waits. Companion to the
"Additional" section of `.ign/CI_PSR.md` (root cause, pattern, decisions);
this file is the raw benchmark log.

## Summary

| Directory                                    | Before                        | After      | Speedup   |
| -------------------------------------------- | ----------------------------- | ---------- | --------- |
| `tests/panels/wunderbaum/`                   | ~180s                         | ~26-29s    | ~6-7x     |
| `tests/panels/visnetwork/`                   | ~40s+                         | ~16s       | ~2.5x+    |
| `tests/panels/jsoneditor/`                   | ~25-30s                       | ~7s        | ~4x       |
| `tests/panels/terminalmirror/`               | ~8s                           | ~1.3-2.8s  | ~3-6x     |
| `tests/usecases/`                            | ~75s+                         | ~19s       | ~4x       |
| **Total (sum of the 5 directories above)**   | **~330s+**                    | **~71.5s** | **~4.6x** |
| **Full suite** (`pytest -m "not portfolio"`) | ~409s (388s + ~21s ai)        | ~119-130s  | ~3x       |
| `tests/portfolio` (untouched, unaffected)    | ~530s, 1 pre-existing failure | same       | n/a       |

The "Total" row sums only the 5 converted directories in isolation (each
run standalone, so per-directory Playwright/browser startup cost is
counted once per row); it does not equal the full-suite row above, which
also includes untouched AI/unit tests and amortizes browser startup once
across the whole run.

## Baseline (before any changes)

| #   | Scope                                                           | Command                                               | Result                                | Duration               |
| --- | --------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------- | ---------------------- |
| 1   | Non-AI UI + unit                                                | `pytest -m "not portfolio and not ai"`                | 156 passed, 193 deselected, 1 xfailed | 388.16s (real 6m31.5s) |
| 2   | AI examples (already fast, module-scoped pattern pre-existing)  | `pytest tests/panels/ai/examples -m "not portfolio"`  | 15 passed                             | 18.00s (real 20.96s)   |
| 3   | AI unit tests (non-UI)                                          | `pytest -m ai`                                        | 167 passed, 183 deselected            | 3.69s (real 5.998s)    |
| 4   | `tests/panels/wunderbaum/` full directory, unmodified           | `pytest tests/panels/wunderbaum -q` (via `git stash`) | 37 passed, 1 xfailed                  | 180.91s                |
| 5   | `tests/panels/wunderbaum/` full directory, unmodified (2nd run) | same                                                  | 37 passed, 1 xfailed                  | 181.18s                |

Runs 4-5 were a same-code control comparison (git-stashed working tree)
done specifically to confirm two race conditions found later were
introduced by the module-scoped-server conversion, not pre-existing -
both baseline runs were clean, supporting that conclusion.

## `tests/panels/wunderbaum/` - loop runs

### Pilot file only (`test_checkbox_tree.py`), before directory-wide rollout

| #   | Result   | Duration           |
| --- | -------- | ------------------ |
| 1   | 8 passed | 8.16s (real 9.70s) |
| 2   | 8 passed | 8.74s              |
| 3   | 8 passed | 7.50s              |
| 4   | 8 passed | 7.37s              |

### Full directory, first pass (module-scoped server + `page.reload()` reset - later found flaky)

| #   | Result                                       | Duration             | Notes                                                                                                                                                                                                                         |
| --- | -------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | 37 passed, 1 xfailed                         | 26.15s (real 27.85s) | First clean full-directory run after conversion.                                                                                                                                                                              |
| 2   | 37 passed, 1 xfailed                         | 26.21s               |                                                                                                                                                                                                                               |
| 3   | 37 passed, 1 xfailed, **1 error**            | 26.09s               | `RuntimeError: Thread already stopping` in an unrelated `test_wunderbaum.py` unit test's teardown - stale panel server registry entry.                                                                                        |
| 4   | 37 passed, 1 xfailed                         | 25.75s               |                                                                                                                                                                                                                               |
| 5   | 37 passed, 1 xfailed                         | 26.08s               |                                                                                                                                                                                                                               |
| 6   | 37 passed, 1 xfailed                         | 25.05s               |                                                                                                                                                                                                                               |
| 7   | 37 passed, 1 xfailed                         | 25.51s               |                                                                                                                                                                                                                               |
| 8   | 37 passed, 1 xfailed                         | 25.82s               |                                                                                                                                                                                                                               |
| 9   | 37 passed, 1 xfailed                         | 25.68s               |                                                                                                                                                                                                                               |
| 10  | 1 failed, 30 passed, 1 xfailed, **7 errors** | 53.52s               | Worst observed run: `page.reload()` on the shared page raced with in-flight server activity (`TimeoutError` / `net::ERR_ABORTED` in `_reset_tree`), cascading into multiple test errors and roughly 2x the normal wall-clock. |
| 11  | 37 passed, 1 xfailed                         | 25.81s               |                                                                                                                                                                                                                               |
| 12  | 37 passed, 1 xfailed                         | 25.69s               |                                                                                                                                                                                                                               |
| 13  | 37 passed, 1 xfailed                         | 26.29s               |                                                                                                                                                                                                                               |
| 14  | 37 passed, 1 xfailed                         | 26.04s               |                                                                                                                                                                                                                               |
| 15  | 37 passed, 1 xfailed, **1 error**            | 25.44s               | Same `RuntimeError: Thread already stopping` as run 3.                                                                                                                                                                        |
| 16  | 37 passed, 1 xfailed                         | 25.55s               |                                                                                                                                                                                                                               |
| 17  | **1 failed**, 36 passed, 1 xfailed           | 25.13s               | `test_check_leaf_node` - `checked_display.object` still showed `"(none)"` after `tree.source` already reflected the checkbox click (watcher-fires-after-attribute-visible race).                                              |

Root causes identified from runs 10, 3, 15, 17: (a) reloading a shared page
raced with in-flight server/session activity, (b) a bare `server.stop()`
left panel's internal `state._servers`/`_threads` registry entry stale for
a later unrelated test's `pn.state.reset()` to trip over, (c) polling
`tree.source` directly could observe the backend value before its
downstream watcher-driven UI update landed. Fixes: fresh browser
context/page per test (no `.reload()`) against the module-scoped server;
`pn.state.kill_all_servers()` instead of `server.stop()` at teardown; poll
the true downstream signal (`checked_display.object`) instead of the
intermediate one (`tree.source`).

### Pilot file only, after the fresh-page-per-test + `kill_all_servers()` fix

| #   | Result   | Duration |
| --- | -------- | -------- |
| 1   | 8 passed | 9.82s    |
| 2   | 8 passed | 8.46s    |
| 3   | 8 passed | 8.46s    |
| 4   | 8 passed | 9.84s    |

### Full directory, after all fixes

| #   | Result               | Duration |
| --- | -------------------- | -------- |
| 1   | 37 passed, 1 xfailed | 29.07s   |
| 2   | 37 passed, 1 xfailed | 28.76s   |

No further failures observed after the fix across these plus the pilot
runs above (8 clean runs total post-fix).

## `tests/panels/visnetwork/` - loop runs

Fresh-page-per-test + `pn.state.kill_all_servers()` pattern applied from
the start (lesson already learned from wunderbaum) - no flakiness detours
needed here.

| #                                        | Result    | Duration             |
| ---------------------------------------- | --------- | -------------------- |
| 1 (first full run, with `--durations=0`) | 11 passed | 16.89s (real 18.88s) |
| 2                                        | 11 passed | 15.90s               |
| 3                                        | 11 passed | 15.65s               |
| 4                                        | 11 passed | 15.78s               |
| 5                                        | 11 passed | 15.86s               |

## `tests/panels/jsoneditor/` - loop runs

| #                                        | Result                 | Duration           | Notes                                                                                                                                                                                                                                        |
| ---------------------------------------- | ---------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 (first full run, with `--durations=0`) | **2 failed**, 6 passed | 7.22s              | `test_jsoneditor_panel_min.py` / `test_jsoneditor_panelini_min.py`: `get_value()` returned `None` right after the input field's `.wait_for()` resolved - the DOM field attaches before the JSONEditor JS widget finishes its own async init. |
| 2 (after fix)                            | 8 passed               | 7.87s (real 9.39s) | Fixed by waiting on `get_value() is not None` before asserting.                                                                                                                                                                              |
| 3                                        | 8 passed               | 7.76s              |                                                                                                                                                                                                                                              |
| 4                                        | 8 passed               | 6.67s              |                                                                                                                                                                                                                                              |
| 5                                        | 8 passed               | 6.66s              |                                                                                                                                                                                                                                              |
| 6                                        | 8 passed               | 6.70s              |                                                                                                                                                                                                                                              |
| 7                                        | 8 passed               | 7.79s              |                                                                                                                                                                                                                                              |

## `tests/panels/terminalmirror/` - loop runs

Single UI test in the directory (rest is pure unit tests); no shared-state
complications, but a real race was found only during the later full-suite
run (see below), not during this directory's own stress-testing.

| #                                        | Result    | Duration |
| ---------------------------------------- | --------- | -------- |
| 1 (first full run, with `--durations=0`) | 14 passed | 2.77s    |
| 2                                        | 14 passed | 1.35s    |
| 3                                        | 14 passed | 1.28s    |
| 4                                        | 14 passed | 1.27s    |

## `tests/usecases/` - loop runs

| #   | Scope                                                                       | Result    | Duration             | Notes                                                                                                                                                   |
| --- | --------------------------------------------------------------------------- | --------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `test_wunderbaum_visnetwork.py` only (10 tests, first run after conversion) | 10 passed | 17.24s (real 18.90s) | Biggest reset surface of the whole effort: `NODES`/`EDGES`/`tree`/`graph` module-level singletons rebuilt from deep-copied originals before every test. |
| 2   | Full directory (both files)                                                 | 11 passed | 19.47s (real 21.16s) |                                                                                                                                                         |
| 3   | Full directory                                                              | 11 passed | 19.23s               |                                                                                                                                                         |
| 4   | Full directory                                                              | 11 passed | 19.02s               |                                                                                                                                                         |
| 5   | Full directory                                                              | 11 passed | 19.24s               |                                                                                                                                                         |
| 6   | Full directory                                                              | 11 passed | 18.93s               |                                                                                                                                                         |

## Full-suite verification runs

| #   | Command                                                                            | Result                                             | Duration               | Notes                                                                                                                                                                                                                                                                        |
| --- | ---------------------------------------------------------------------------------- | -------------------------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `pytest -m "not portfolio" --cov --cov-config=pyproject.toml --cov-report=xml -q`  | **1 failed**, 322 passed, 29 deselected, 1 xfailed | 130.42s (real 2m14.5s) | `test_terminalmirror_panelini_min.py`: waited only on the redraw's clear-counter incrementing, but `redraw()` clears first and rewrites the output buffer as a separate, slightly-later step. Only surfaced here - directory-level stress-testing (4 runs) hadn't caught it. |
| 2   | Same, after fix                                                                    | 323 passed, 29 deselected, 1 xfailed               | 130.65s (real 2m14.7s) |                                                                                                                                                                                                                                                                              |
| 3   | `pytest -m "not portfolio" --durations=30 -q` (no coverage)                        | 323 passed, 29 deselected, 1 xfailed               | 119.34s (real - )      | Slowest individual test now 4.00s; nothing from the converted directories in the top of the list is sleep-bound anymore.                                                                                                                                                     |
| 4   | `pytest -m "not portfolio" --cov ... -q`, after the `make check` ty-diagnostic fix | 323 passed, 29 deselected, 1 xfailed               | 130.38s (real 2m14.5s) | Final confirmation run.                                                                                                                                                                                                                                                      |

### Terminal fix stress-test (isolated)

| #   | Result   | Duration |
| --- | -------- | -------- |
| 1   | 1 passed | 2.83s    |
| 2   | 1 passed | 1.33s    |
| 3   | 1 passed | 1.28s    |
| 4   | 1 passed | 1.25s    |
| 5   | 1 passed | 1.30s    |
| 6   | 1 passed | 1.28s    |

## `tests/portfolio` (untouched, unaffected by this work)

| #   | Scope                                 | Result                  | Duration          | Notes                                                                                                                                                                                                                                                            |
| --- | ------------------------------------- | ----------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Full portfolio suite                  | **1 failed**, 28 passed | 530.02s (0:08:50) | `test_app_renders[chromium-visnetwork/visnetwork_panelini_min]`: `Failed: widget never appeared (selector '.vis-network canvas' not visible within 120s)`; console errors `GridStack is not defined`, `Cannot read properties of undefined (reading 'destroy')`. |
| 2   | Failing test only, rerun in isolation | **1 failed**            | 138.03s (0:02:18) | Same failure, same console errors - reproduces consistently, not a timing flake.                                                                                                                                                                                 |

**Confirmed pre-existing and unrelated to this session's work:** `git
status` shows zero changes to `tests/portfolio/`,
`examples/panels/visnetwork/`, or `docs/gen_portfolio.py` - nothing this
effort touched could have caused it. Left for the user to decide whether
to investigate separately; noted in `.ign/CI_PSR.md`.

## Bugs found and fixed during this effort (cross-reference)

| #   | File                                                                                                                | Symptom                                                                                                    | Root cause                                                                                                                | Fix                                                                                                                          |
| --- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 1   | `tests/panels/wunderbaum/examples/test_checkbox_tree.py` (+ `test_wunderbaum_dnd.py`, `test_virtual_filesystem.py`) | `page.reload()` `TimeoutError` / `net::ERR_ABORTED`, intermittent (~1 in 8 runs, worse under load)         | Reloading a page whose previous session might still have an in-flight server round-trip                                   | Fresh `browser.new_context()` + `new_page()` per test against the module-scoped server, instead of reloading one shared page |
| 2   | Same 3 files                                                                                                        | `RuntimeError: Thread already stopping`, surfacing in an unrelated test's teardown                         | Bare `server.stop()` left a stale entry in panel's internal `state._servers`/`_threads` registry                          | Teardown via `pn.state.kill_all_servers()` instead                                                                           |
| 3   | `test_checkbox_tree.py`                                                                                             | `checked_display.object` still `"(none)"` even though `tree.source` already showed the checkbox as checked | Polled the intermediate attribute (`tree.source`) instead of the final, watcher-driven one                                | `wait_until()` on `checked_display.object` instead                                                                           |
| 4   | `tests/panels/jsoneditor/examples/test_jsoneditor_panel_min.py`, `test_jsoneditor_panelini_min.py`                  | `get_value()` returned `None` right after the input field became visible                                   | The DOM field attaches before the JSONEditor JS widget finishes its own async init                                        | `wait_until(lambda: ...get_value() is not None)` before asserting                                                            |
| 5   | `tests/panels/terminalmirror/examples/test_terminalmirror_panelini_min.py`                                          | Output buffer assertion failed right after the clear-counter had already incremented                       | `redraw()` clears first, then rewrites the buffer as a separate, slightly-later step                                      | `wait_until()` on both the clear count *and* the output text together                                                        |
| 6   | `tests/panels/wunderbaum/examples/test_incremental_tree_demo.py`                                                    | `make check` (`ty`) diagnostic: `Page.get_by_text` argument type mismatch                                  | `step["status"]` inferred as a broad union (dict-literal-value-type unioning across all `SEQUENCE` keys) instead of `str` | `str()` cast narrowing to the true runtime type, instead of a suppression                                                    |
