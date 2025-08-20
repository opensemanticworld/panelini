"""
Test cases for the Panelini application.
[See panel git for serve_component tests](https://github.com/holoviz/panel/blob/3eaee8f710c010f203b897cb6c67a7f15697d608/panel/tests/ui/template/test_editabletemplate.py#L9) # noqa
"""

from panel import Card, Column, Row, Spacer
from panel.layout.gridstack import GridStack
from panel.pane import Markdown

from panelini.panelini import Panelini


def test_panelini_instantiation():
    """Test instantiation of the Panelini class."""
    instance = Panelini()
    assert isinstance(instance, Panelini)


def test_panelini_classvar_header_logo():
    """Test the logo in the header."""
    instance = Panelini(
        logo="/usr/local/docker-container/_dev/github/opensemanticworld/panelini/img/panelinibanner.svg"
    )
    assert instance.logo == "/usr/local/docker-container/_dev/github/opensemanticworld/panelini/img/panelinibanner.svg"


def test_panelini_classvar_header_background():
    """Test the background image in the header."""
    instance = Panelini(
        header_background_image="/usr/local/docker-container/_dev/github/opensemanticworld/panelini/img/header.svg"
    )
    assert (
        instance.header_background_image
        == "/usr/local/docker-container/_dev/github/opensemanticworld/panelini/img/header.svg"
    )


def test_panelini_classvar_content_background():
    """Test the background image in the content area."""
    instance = Panelini(
        content_background_image="/usr/local/docker-container/_dev/github/opensemanticworld/panelini/img/content.svg"
    )
    assert (
        instance.content_background_image
        == "/usr/local/docker-container/_dev/github/opensemanticworld/panelini/img/content.svg"
    )


def test_panelini_classvar_title():
    """Test the background image in the content area."""
    instance = Panelini(title="Panelini TEST")
    assert instance.title == "Panelini TEST"


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
    instance = Panelini(sidebar_right_enabled=True, sidebar_right_visible=True)
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
    # Test below the lower boundary 500
    try:
        Panelini(sidebars_max_width=501)
    except ValueError:
        assert True
    else:
        raise AssertionError()


def test_panelini_method_set_sidebar_config():
    """Test the set_sidebar_config method."""
    sidebars_max_width = 300
    instance = Panelini(sidebars_max_width=sidebars_max_width)
    assert instance._sidebar_inner_width == int(sidebars_max_width * 0.91)
    assert instance._sidebar_object_width == int(sidebars_max_width * 0.88)
    assert instance._sidebar_card_spacer_height == int(sidebars_max_width * 0.06)


def test_panelini_method_set_sidebar_right():
    """Test the set_sidebar_right method."""
    # Right sidebar must be enabled, cause default is False
    instance = Panelini(sidebar_right_enabled=True)
    assert isinstance(instance._sidebar_right, Column)


def test_panelini_method_toggle_sidebar_right():
    """Test the toggle_sidebar_right method."""
    instance = Panelini(sidebar_right_enabled=True)
    # Default visible = False
    assert instance._sidebar_right.visible is False
    # Toggle once should be visible = True
    instance._toggle_sidebar_right(event=None)
    assert instance._sidebar_right.visible is True
    # Toggle again should be visible = False
    instance._toggle_sidebar_right(event=None)
    assert instance._sidebar_right.visible is False


def test_panelini_method_set_sidebar_left():
    """Test the set_sidebar_left method."""
    # Left sidebar must be enabled, cause default is False
    instance = Panelini(sidebar_enabled=True)
    assert isinstance(instance._sidebar_left, Column)


def test_panelini_method_toggle_sidebar_left():
    """Test the toggle_sidebar_left method."""
    instance = Panelini(sidebar_enabled=True)
    # Default visible = True
    assert instance._sidebar_left.visible is True
    # Toggle once should be visible = False
    instance._toggle_sidebar_left(event=None)
    assert instance._sidebar_left.visible is False
    # Toggle again should be visible = True
    instance._toggle_sidebar_left(event=None)
    assert instance._sidebar_left.visible is True


def test_panelini_method_set_main():
    """Test the _set_main method."""
    instance = Panelini()
    assert isinstance(instance._main, Column)


def test_panelini_method_set_content():
    """Test the _set_content method."""
    instance = Panelini()
    assert isinstance(instance._content, Row)


def test_panelini_method_set_navbar_objects():
    """Test the _set_navbar_objects method."""
    instance = Panelini()
    # Check if _navbar_objects is a list and consists of Column elements
    assert isinstance(instance._navbar_objects, list)
    for obj in instance._navbar_objects:
        assert isinstance(obj, Column)


def test_panelini_method_build_panel():
    """Test the _build_panel method."""
    instance = Panelini()
    assert isinstance(instance._panel, Column)
    # Check if _panel has css_classes=["panel"]
    assert "panel" in instance._panel.css_classes


def test_panelini_methods_public_set_and_get_sidebar_right():
    """Test the set_sidebar_right as well as get_sidebar_right methods."""
    instance = Panelini(sidebar_right_enabled=True)
    sidebar_right = [Card(title="sidebar right test")]
    instance.set_sidebar_right(sidebar_right)
    assert instance.get_sidebar_right() == sidebar_right


def test_panelini_methods_public_set_and_get_sidebar():
    """Test the set_sidebar as well as get_sidebar methods."""
    instance = Panelini(sidebar_enabled=True)
    sidebar = [Card(title="sidebar left test")]
    instance.set_sidebar(sidebar)
    assert instance.get_sidebar() == sidebar


def test_panelini_methods_public_set_and_get_main_():
    """Test the set_main as well as get_main methods."""
    instance = Panelini()
    gstack = GridStack(sizing_mode="stretch_both", min_height=600)

    gstack[:, 0:3] = Spacer(styles={"background": "red"})
    gstack[0:2, 3:9] = Spacer(styles={"background": "green"})
    gstack[2:4, 6:12] = Spacer(styles={"background": "orange"})
    gstack[4:6, 3:12] = Spacer(styles={"background": "blue"})
    gstack[0:2, 9:12] = Spacer(styles={"background": "purple"})

    # Edit main objects using set and get functions
    instance.set_main([gstack])

    assert instance.get_main() == [gstack]
