"""
Test cases for the Panelini application.
[See panel git for serve_component tests](https://github.com/holoviz/panel/blob/3eaee8f710c010f203b897cb6c67a7f15697d608/panel/tests/ui/template/test_editabletemplate.py#L9) # noqa
"""

from panelini.panelini import Panelini


def test_panelini_instantiation():
    """Test instantiation of the Panelini class."""
    instance = Panelini()
    assert isinstance(instance, Panelini)
