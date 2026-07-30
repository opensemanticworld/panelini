"""Root test configuration.

Auto-marks tests whose module imports from the ``playwright`` package with
the ``ui`` marker so they are excluded from the default ``make test`` run.

Also disables Panelini background images session-wide to skip the ~530 KB
base64 CSS injection that otherwise fires at every ``Panelini(...)`` call.
Unit tests in ``test_main.py`` pass explicit values and are unaffected.
"""

import pytest

from panelini.testing import disable_panelini_backgrounds

disable_panelini_backgrounds()


def pytest_collection_modifyitems(items):
    seen_modules = {}
    for item in items:
        mod = item.module
        if mod not in seen_modules:
            seen_modules[mod] = any(
                getattr(val, "__module__", "").startswith("playwright") for val in vars(mod).values()
            )
        if seen_modules[mod]:
            item.add_marker(pytest.mark.ui)
