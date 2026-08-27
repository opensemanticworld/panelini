"""Skip the AI plot tests unless the ``ai-llm-sandbox`` extra is installed.

Mirrors the ``langchain`` guard in ``tests/panels/ai/conftest.py``: these modules
import ``llm_sandbox`` (which needs Docker), so skip cleanly when it is absent
instead of failing collection.
"""

import pytest

pytest.importorskip("llm_sandbox")
