# pytest test_lazy_loading.py --headed --slowmo 1000

import time

import panel as pn
import pytest
from playwright.sync_api import Page

from examples.panels.wunderbaum.lazy_loading import app, load_counts, tree
from panelini.testing import wb_row


@pytest.mark.media(role="feature", capture="gif")
def test_component(page: Page, port):
    """Expanding a lazy node loads its children on demand."""
    url = f"http://localhost:{port}"

    server = pn.serve(app, port=port, threaded=True, show=False)
    time.sleep(0.2)

    page.goto(url)
    time.sleep(5)

    assert len(tree.source) == 3
    assert page.locator(".wunderbaum-wrapper").first.is_visible()

    rows_before = page.locator(".wb-row").count()
    assert rows_before >= 3, f"Expected >= 3 .wb-row elements, got {rows_before}"

    # Expand the lazy "Root 1" node; its children load on demand.
    wb_row(page, "Root 1").locator(".wb-expander").click()
    time.sleep(2)

    # Backend lazy_load_callback fired for r1, and the UI gained child rows.
    assert load_counts.get("r1", 0) >= 1
    assert page.locator(".wb-row").count() > rows_before

    server.stop()
