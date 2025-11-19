"""Test cases for the Panelini application."""

# TODO: serve tests
# [See panel git for serve_component tests](https://github.com/holoviz/panel/blob/3eaee8f710c010f203b897cb6c67a7f15697d608/panel/tests/ui/template/test_editabletemplate.py#L9) # noqa[E509]
# TODO: Playwright tests
# TODO: Util def tests

import os
from pathlib import Path

from panel import Card, Column, Row, Spacer, config
from panel.layout.gridstack import GridStack
from panel.pane import Markdown

from panelini.main import Panelini

# $$$$$$$$$$$$$$$$$$$$$$$$$$$ BEGIN LOCAL DIR PATH $$$$$$$$$$$$$$$$$$$$$$$$$$$
_TESTS_DIR = os.path.dirname(os.path.abspath(__file__))
_ROOT_DIR = os.path.dirname(_TESTS_DIR)
_SRC_PANELINI_DIR = os.path.join(_ROOT_DIR, "src", "panelini")
_ASSETS_DIR = os.path.join(_SRC_PANELINI_DIR, "assets")


# $$$$$$$$$$$$$$$$$$$$$$$$$$$ ENDOF LOCAL DIR PATH $$$$$$$$$$$$$$$$$$$$$$$$$$$


# $$$$$$$$$$$$$$$$$$$$$$$$$$$ BEGIN INIT TESTCASES $$$$$$$$$$$$$$$$$$$$$$$$$$$
def test_panelini_instantiation():
    """Test instantiation of the Panelini class."""
    instance = Panelini()
    assert isinstance(instance, Panelini)


# $$$$$$$$$$$$$$$$$$$$$$$$$$$ ENDOF INIT TESTCASES $$$$$$$$$$$$$$$$$$$$$$$$$$$


# $$$$$$$$$$$$$$$$$$$$$$$$$$$ BEGIN CLASSVAR TESTS $$$$$$$$$$$$$$$$$$$$$$$$$$$
def test_panelini_classvar_logo():
    """Test the logo in the header."""
    logo_path = Path(os.path.join(_ASSETS_DIR, "panelinilogo.png"))
    logo_str = str(logo_path)
    instance_path = Panelini(logo=logo_path)
    instance_str = Panelini(logo=logo_str)
    assert instance_path.logo == logo_path
    assert instance_str.logo == logo_str


def test_panelini_classvar_logo_link_url():
    """Test the logo link URL in the header."""
    logo_link_url = "/"
    instance = Panelini(logo_link_url=logo_link_url)
    assert instance.logo_link_url == logo_link_url


def test_panelini_classvar_title():
    instance = Panelini(title="Panelini Test Title")
    assert instance.title == "Panelini Test Title"


def test_panelini_classvar_header_background_image():
    """Test the background image in the header."""
    header_background_image_path = Path(os.path.join(_ASSETS_DIR, "header.svg"))
    header_background_image_str = str(header_background_image_path)
    instance_path = Panelini(header_background_image=header_background_image_path)
    """Test the background image in the content area."""
    instance = Panelini(title="Panelini TEST")
    assert instance.title == "Panelini TEST"

    instance_str = Panelini(header_background_image=header_background_image_str)
    assert instance_path.header_background_image == header_background_image_path
    assert instance_str.header_background_image == header_background_image_str


def test_panelini_classvar_content_background_image():
    """Test the background image in the content area."""
    content_background_image_path = Path(os.path.join(_ASSETS_DIR, "content.svg"))
    content_background_image_str = str(content_background_image_path)
    instance_path = Panelini(content_background_image=content_background_image_path)
    instance_str = Panelini(content_background_image=content_background_image_str)
    assert instance_path.content_background_image == content_background_image_path
    assert instance_str.content_background_image == content_background_image_str


def test_panelini_classvar_static_dir():
    """Test the assets as static directory."""
    instance = Panelini(static_dir="/assets")
    assert instance.static_dir == "/assets"


def test_panelini_classvar_main():
    """Test the main content objects."""
    instance = Panelini(main=[Markdown("## Welcome to Panelini")])
    assert isinstance(instance.main, list)


def test_panelini_classvar_sidebar():
    """Test the left sidebar content objects."""
    instance = Panelini(sidebar=[Markdown("## Left Sidebar")])
    assert isinstance(instance.sidebar, list)


def test_panelini_classvar_sidebar_right():
    """Test the right sidebar content objects."""
    instance = Panelini(sidebar_right=[Markdown("## Right Sidebar")])
    assert isinstance(instance.sidebar_right, list)


def test_panelini_classvar_sidebar_enabled():
    """Test the sidebar enabled state."""
    instance = Panelini(sidebar_enabled=True)
    assert instance.sidebar_enabled is True


def test_panelini_classvar_sidebar_right_enabled():
    """Test the right sidebar enabled state."""
    instance = Panelini(sidebar_right_enabled=True)
    assert instance.sidebar_right_enabled is True


def test_panelini_classvar_sidebar_visible():
    """Test the sidebar visible state."""
    instance = Panelini(sidebar_visible=True)
    assert instance.sidebar_visible is True
    assert instance._sidebar_left.visible is True


def test_panelini_classvar_sidebar_right_visible():
    """Test the right sidebar visible state."""
    instance = Panelini(
        sidebar_right_enabled=True,
        sidebar_right_visible=True,
    )
    assert instance.sidebar_right_visible is True
    assert instance._sidebar_right.visible is True


def test_panelini_classvar_sidebars_max_width():
    """Test the sidebars max width."""
    instance = Panelini(sidebars_max_width=300)
    assert instance.sidebars_max_width == 300
    # Test below the lower boundary 100
    try:
        Panelini(sidebars_max_width=99)
    except ValueError:
        assert True
    else:
        raise AssertionError()
    # Test below the upper boundary 500
    try:
        Panelini(sidebars_max_width=501)
    except ValueError:
        assert True
    else:
        raise AssertionError()


def test_panelini_classvar_footer():
    """Test the footer content."""
    instance = Panelini(footer=[Markdown("## Footer")])
    assert isinstance(instance.footer, list)


def test_panelini_classvar_footer_enabled():
    """Test the footer enabled state."""
    instance = Panelini(footer_enabled=True)
    assert instance.footer_enabled is True


# $$$$$$$$$$$$$$$$$$$$$$$$$$$ ENDOF CLASSVAR TESTS $$$$$$$$$$$$$$$$$$$$$$$$$$$


# $$$$$$$$$$$$$$$$$$$$$$$$$$$ BEGIN PRIV DEF TESTS $$$$$$$$$$$$$$$$$$$$$$$$$$$
def test_panelini_method__css_main_load():
    """Test the _css_main_load method."""
    instance = Panelini()
    instance._css_main_load()
    assert len(config.raw_css) > 0


def test_panelini_method__sidebar_config_set():
    """Test the _sidebar_config_set method."""
    sidebars_max_width = 300
    instance = Panelini(sidebars_max_width=sidebars_max_width)
    assert instance._sidebar_inner_width == int(sidebars_max_width * 0.91)
    assert instance._sidebar_object_width == int(sidebars_max_width * 0.88)
    assert instance._sidebar_card_elem_width == int(sidebars_max_width * 0.80)
    assert instance._sidebar_card_spacer_height == int(sidebars_max_width * 0.06)


def test_panelini_method__sidebar_right_set():
    """Test the _sidebar_right_set method."""
    instance = Panelini(sidebar_right_enabled=True)
    assert isinstance(instance._sidebar_right, Column)


def test_panelini_method__sidebar_right_toggle():
    """Test the _sidebar_right_toggle method."""
    instance = Panelini(sidebar_right_enabled=True)
    # Default visible = False
    assert instance._sidebar_right.visible is False
    # Toggle once should be visible = True
    instance._sidebar_right_toggle(event=None)
    assert instance._sidebar_right.visible is True
    # Toggle again should be visible = False
    instance._sidebar_right_toggle(event=None)
    assert instance._sidebar_right.visible is False


def test_panelini_method__sidebar_left_set():
    """Test the _sidebar_left_set method."""
    # Left sidebar must be enabled, cause default is False
    instance = Panelini(sidebar_enabled=True)
    assert isinstance(instance._sidebar_left, Column)


def test_panelini_method__sidebar_left_toggle():
    """Test the _sidebar_left_toggle method."""
    instance = Panelini(sidebar_enabled=True)
    # Default visible = True
    assert instance._sidebar_left.visible is True
    # Toggle once should be visible = False
    instance._sidebar_left_toggle(event=None)
    assert instance._sidebar_left.visible is False
    # Toggle again should be visible = True
    instance._sidebar_left_toggle(event=None)
    assert instance._sidebar_left.visible is True


def test_panelini_method__main_set():
    """Test the _main_set method."""
    instance = Panelini()
    assert isinstance(instance._main, Column)


def test_panelini_method__content_set():
    """Test the _content_set method."""
    instance = Panelini()
    assert isinstance(instance._content, Row)


def test_panelini_method__footer_set():
    """Test the _footer_set method."""
    instance = Panelini(footer_enabled=True)
    assert isinstance(instance._footer, Row)
    try:
        instance_no_footer = Panelini(footer_enabled=False)
        assert instance_no_footer._footer is None
    except AttributeError:
        pass
    else:
        raise AssertionError()


def test_panelini_method__header_set():
    """Test the _header_set method."""
    instance = Panelini()
    assert isinstance(instance._header, Row)


def test_panelini_method__navbar_set():
    """Test the _set_navbar method, only Column objects allowed."""
    instance = Panelini()
    assert isinstance(instance._navbar, list)
    for obj in instance._navbar:
        assert isinstance(obj, Column)


def test_panelini_method__panel_set():
    """Test the _build_panel method and its css_classes."""
    instance = Panelini()
    assert isinstance(instance._panel, Column)
    assert "panel" in instance._panel.css_classes


# $$$$$$$$$$$$$$$$$$$$$$$$$$$ ENDOF PRIV DEF TESTS $$$$$$$$$$$$$$$$$$$$$$$$$$$


# $$$$$$$$$$$$$$$$$$$$$$$$$$$ BEGIN PUBL DEF TESTS $$$$$$$$$$$$$$$$$$$$$$$$$$$
def test_panelini_methods_sidebar_right_set_and_get():
    """Test the sidebar_right_set as well as sidebar_right_get methods."""
    instance = Panelini(sidebar_right_enabled=True)
    sidebar_right = [Card(title="sidebar right test")]
    instance.sidebar_right_set(sidebar_right)
    assert instance.sidebar_right_get() == sidebar_right


def test_panelini_methods_sidebar_set_and_get():
    """Test the sidebar_set as well as sidebar_get methods."""
    instance = Panelini(sidebar_enabled=True)
    sidebar = [Card(title="sidebar left test")]
    instance.sidebar_set(sidebar)
    assert instance.sidebar_get() == sidebar


def test_panelini_methods_main_add_and_remove():
    """Test the main_add method."""
    instance = Panelini()
    instance.main_add([Card(title="main add test card")])
    assert instance._main.objects[-1].title == "main add test card"
    instance.main_remove_index(0)
    assert instance._main.objects == []


def test_panelini_methods_main_clear():
    """Test the main_clear method."""
    instance = Panelini()
    instance.main_add([Card(title="main clear test card")])
    assert len(instance._main.objects) > 0
    instance.main_clear()
    assert instance._main.objects == [instance._main_empty_column]


def test_panelini_methods_main_set_and_get():
    """Test the main_set as well as main_get methods."""
    instance = Panelini()
    gstack = GridStack(sizing_mode="stretch_both", min_height=600)

    gstack[:, 0:3] = Spacer(styles={"background": "red"})
    gstack[0:2, 3:9] = Spacer(styles={"background": "green"})
    gstack[2:4, 6:12] = Spacer(styles={"background": "orange"})
    gstack[4:6, 3:12] = Spacer(styles={"background": "blue"})
    gstack[0:2, 9:12] = Spacer(styles={"background": "purple"})

    # Edit main objects using set and get functions
    instance.main_set([gstack])

    assert instance.main_get() == [gstack]


# $$$$$$$$$$$$$$$$$$$$$$$$$$$ ENDOF PUBL DEF TESTS $$$$$$$$$$$$$$$$$$$$$$$$$$$
