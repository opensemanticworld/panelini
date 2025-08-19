"""
Test cases for the Panelini application.
[See panel git for serve_component tests](https://github.com/holoviz/panel/blob/3eaee8f710c010f203b897cb6c67a7f15697d608/panel/tests/ui/template/test_editabletemplate.py#L9) # noqa
"""

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
