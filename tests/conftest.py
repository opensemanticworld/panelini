"""Root test configuration.

Auto-marks tests whose module imports from the ``playwright`` package with
the ``ui`` marker so they are excluded from the default ``make test`` run.
"""

import pytest


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
