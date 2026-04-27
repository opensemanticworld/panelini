"""Fix sys.path so that ``mcp.server`` resolves to the installed package.

The presence of ``tests/mcp/server/__init__.py`` causes pytest to put
``tests/`` on ``sys.path``.  Python then finds this stub *before* the real
``mcp.server`` package in site-packages, which makes
``from mcp.server import Server`` fail.

We work around this by temporarily removing every ``tests/``-like entry from
``sys.path``, importing the real ``mcp`` namespace, then restoring the entries.
This conftest runs before any test module in this package is imported.
"""

import sys

_tests_entries = [p for p in sys.path if p.endswith("/tests") or p == "tests"]
for _p in _tests_entries:
    sys.path.remove(_p)

for _key in list(sys.modules):
    if _key == "mcp" or _key.startswith("mcp.server") or _key.startswith("mcp.types"):
        del sys.modules[_key]


sys.path.extend(_tests_entries)
