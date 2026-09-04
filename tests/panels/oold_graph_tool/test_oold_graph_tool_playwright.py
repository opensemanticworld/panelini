# pytest test_oold_graph_tool_playwright.py --headed --slowmo 1000

import time

import panel as pn
from playwright.sync_api import Page

from examples.panels.oold_graph.recipy_json import config
from panelini.panels.oold_graph_tool.oold_graph_tool import OOLDGraphDetailTool


def _serve(tool, page, port):
    """Serve tool and wait for vis-network to render."""
    server = pn.serve(tool, port=port, threaded=True, show=False)
    time.sleep(0.2)
    page.goto(f"http://localhost:{port}")
    time.sleep(5)
    assert page.locator(".vis-network canvas").first.is_visible()
    return server


def test_click_node_shows_jsoneditor(page: Page, port):
    """Clicking an entity node opens OO-LD Form with a visible JsonEditor."""
    tool = OOLDGraphDetailTool(config=config)
    server = _serve(tool, page, port)

    cake_iri = tool.entity_list[0].get_iri()
    tool.show_node_details(cake_iri)
    time.sleep(3)

    # OO-LD Form tab (index 2) must be active
    tab = page.locator(".bk-tab.bk-active")
    assert tab.inner_text() == "OO-LD Form"

    # panelini JsonEditor (json-editor/json-editor) renders with .je-object__title
    je = page.locator(".je-object__title")
    assert je.count() >= 1, "No .je-object__title element found - JsonEditor not rendered"
    assert je.first.is_visible(), "JsonEditor title is present but not visible"

    server.stop()


def test_jsoneditor_shows_entity_data(page: Page, port):
    """JsonEditor form should contain inputs for entity properties."""
    tool = OOLDGraphDetailTool(config=config)
    server = _serve(tool, page, port)

    cake_iri = tool.entity_list[0].get_iri()
    tool.show_node_details(cake_iri)
    time.sleep(3)

    # The name input should contain the entity's name
    name_input = page.locator("[name='root[name]']")
    assert name_input.count() >= 1, "No name input field found"
    assert name_input.first.input_value() == "My cake recipe"

    server.stop()


def test_apply_button_present(page: Page, port):
    """An 'Apply Changes' button should appear below the JsonEditor."""
    tool = OOLDGraphDetailTool(config=config)
    server = _serve(tool, page, port)

    cake_iri = tool.entity_list[0].get_iri()
    tool.show_node_details(cake_iri)
    time.sleep(3)

    btn = page.locator("button", has_text="Apply Changes")
    assert btn.count() >= 1, "No 'Apply Changes' button found"
    assert btn.first.is_visible()

    server.stop()
