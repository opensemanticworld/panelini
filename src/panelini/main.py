"""
Main entry point for the Panelini application containing
header and content area, where the content area includes
a left as well as right sidebar and also the main area.
"""

# $$$$$$$$$$$$$$$$$$$$$ HEADER AREA $$$$$$$$$$$$$$$$$$$$$$
# ##################### CONTENT AREA #####################
# ## L ## ----------------- MAIN ----------------- ## R ##
# ## E ## ----------------- MAIN ----------------- ## I ##
# ## F ## ----------------- MAIN ----------------- ## G ##
# ## T ## ----------------- MAIN ----------------- ## H ##
# ## - ## ----------------- MAIN ----------------- ## T ##
# ## - ## ----------------- MAIN ----------------- ## - ##
# ## S ## ----------------- MAIN ----------------- ## S ##
# ## I ## ----------------- MAIN ----------------- ## I ##
# ## D ## ----------------- MAIN ----------------- ## D ##
# ## E ## ----------------- MAIN ----------------- ## E ##
# ## B ## ----------------- MAIN ----------------- ## B ##
# ## A ## ----------------- MAIN ----------------- ## A ##
# ## R ## ----------------- MAIN ----------------- ## R ##
# ##################### CONTENT AREA #####################
# $$$$$$$$$$$$$$$$$$$$$ FOOTER AREA $$$$$$$$$$$$$$$$$$$$$$

import os
from pathlib import Path
from typing import Any

import panel
import param  # type: ignore[import-untyped]
from panel.io.server import Server, StoppableThread

# $$$$$$$$$$$$$$$$$$$$$$$$$$$ BEGIN LOCAL DIR PATH $$$$$$$$$$$$$$$$$$$$$$$$$$$
_ROOT = Path(__file__).parent
_ASSETS = _ROOT / "assets"
_MAIN_CSS = _ROOT / "main.css"
_FAVICON_URL = _ASSETS / "favicon.ico"
_LOGO = _ASSETS / "panelinilogo.png"
_HEADER_BACKGROUND_IMAGE = _ASSETS / "header.svg"
_CONTENT_BACKGROUND_IMAGE = _ASSETS / "content.svg"

# $$$$$$$$$$$$$$$$$$$$$$$$$$$ ENDOF LOCAL DIR PATH $$$$$$$$$$$$$$$$$$$$$$$$$$$


class Panelini(param.Parameterized):  # type: ignore[no-any-unimported]
    """Main class for the Panelini application."""

    # $$$$$$$$$$$$$$$$$$$$$$$$$$ BEGIN CLASSVARS $$$$$$$$$$$$$$$$$$$$$$$$$$
    logo = param.ClassSelector(
        class_=(str, Path),
        default=_LOGO,
        doc="Logo image for the application. Can be a string path or pathlib.Path.",
    )

    logo_link_url = param.String(
        default="/",
        doc="Logo provided link to given URL.",
    )

    title = param.String(
        default="📊 HELLO PANELINI 🐍",
        doc="Title of the application.",
    )

    header_background_image = param.ClassSelector(
        class_=(str, Path),
        default=_HEADER_BACKGROUND_IMAGE,
        doc="Background image for the header section.",
    )

    content_background_image = param.ClassSelector(
        class_=(str, Path),
        default=_CONTENT_BACKGROUND_IMAGE,
        doc="Background image for the content section.",
    )

    static_dir = param.ClassSelector(
        class_=(str, Path),
        default=_ASSETS,
        doc="Directory for serving static assets.",
    )

    main = param.List(
        default=[],
        item_type=panel.viewable.Viewable,
        doc="List of Panel objects to be displayed in main area.",
    )

    sidebar = param.List(
        default=[],
        item_type=panel.viewable.Viewable,
        doc="List of Panel objects to be displayed in left sidebar.",
    )

    sidebar_right = param.List(
        default=[],
        item_type=panel.viewable.Viewable,
        doc="List of Panel objects to be displayed in right sidebar.",
    )

    sidebar_enabled = param.Boolean(
        default=True,
        doc="Enable or disable the left sidebar.",
    )

    sidebar_right_enabled = param.Boolean(
        default=False,
        doc="Enable or disable the right sidebar.",
    )

    sidebar_visible = param.Boolean(
        default=True,
        doc="Enable or disable the collapsing of the left sidebar.",
    )

    sidebar_right_visible = param.Boolean(
        default=False,
        doc="Enable or disable the collapsing of the right sidebar.",
    )

    sidebars_max_width = param.Integer(
        default=300,
        bounds=(100, 500),
        doc="Maximum width of the sidebars as integer in px.",
    )

    footer = param.List(
        default=[],
        item_type=panel.viewable.Viewable,
        doc="List of Panel objects to be displayed in the footer.",
    )

    footer_enabled = param.Boolean(
        default=False,
        doc="Enable or disable the footer.",
    )

    # $$$$$$$$$$$$$$$$$$$$$$$$$$ ENDOF CLASSVARS $$$$$$$$$$$$$$$$$$$$$$$$$$

    # $$$$$$$$$$$$$$$$$$$$$$$$$$$$ BEGIN UTILS $$$$$$$$$$$$$$$$$$$$$$$$$$$$
    # TODO: Outsource to utils directory in separate python files
    # TODO: Write test for this function below, also check different panel objects than Card
    def _css_classes_extend(self, objects: list[panel.viewable.Viewable], css_classes: list[str]) -> None:
        """Add CSS classes to a list of Panel objects."""
        for obj in objects:
            if isinstance(obj, panel.viewable.Viewable):
                obj.css_classes.extend(css_classes)

    def _css_classes_set(self, objects: list[panel.viewable.Viewable], css_classes: list[str]) -> None:
        """Set CSS classes for a list of Panel objects, avoiding duplicates."""
        for obj in objects:
            if isinstance(obj, panel.viewable.Viewable):
                obj.css_classes += list(set(obj.css_classes).union(css_classes))

    # TODO: Write test for this function below, also check different panel objects than Card
    def _sidebar_object_width_extend(self, objects: list[panel.viewable.Viewable]) -> None:
        """Extend the width of sidebar cards."""
        for obj in objects:
            if isinstance(obj, panel.viewable.Viewable):
                obj.width = self._sidebar_object_width

    # $$$$$$$$$$$$$$$$$$$$$$$$$$$$ ENDOF UTILS $$$$$$$$$$$$$$$$$$$$$$$$$$$$

    # $$$$$$$$$$$$$$$$$$$$$$$$$$$$ BEGIN INIT $$$$$$$$$$$$$$$$$$$$$$$$$$$$
    def __init__(self, **params: Any) -> None:
        super().__init__(**params)
        # self.servable = servable
        self._css_main_load()
        # Navbar: 1st section of the panel
        self._navbar_set()
        self._header_set()
        # Content: 2nd section of the panel
        self._sidebar_config_set()
        self._main_set()
        self._content_set()
        self._panel_set()

    def __panel__(self) -> panel.viewable.Viewable:
        """Return the main panel for the application."""
        return self._panel

    # $$$$$$$$$$$$$$$$$$$$$$$$$$$$ ENDOF INIT $$$$$$$$$$$$$$$$$$$$$$$$$$$$

    # $$$$$$$$$$$$$$$$$$$$$$$$$$$ BEGIN PRIV DEF $$$$$$$$$$$$$$$$$$$$$$$$$$$
    def _css_main_load(self) -> None:
        """Load custom CSS for the application."""
        panel.config.raw_css.append(_MAIN_CSS.read_text())

        # Set navbar background image
        panel.config.raw_css.append(
            f".navbar {{ background-image: url(/assets/{os.path.basename(self.header_background_image)}); }}"
        )
        # Set content background image
        panel.config.raw_css.append(
            f".content {{ background-image: url(/assets/{os.path.basename(self.content_background_image)}); }}"
        )

    def _sidebar_config_set(self) -> None:
        """Set the configuration for the sidebars."""
        self._sidebar_max_width = int(self.sidebars_max_width)
        self._sidebar_inner_width = int(self.sidebars_max_width * 0.91)
        self._sidebar_object_width = int(self.sidebars_max_width * 0.88)
        self._sidebar_card_elem_width = int(self.sidebars_max_width * 0.80)
        self._sidebar_card_spacer_height = int(self.sidebars_max_width * 0.06)

    def _sidebar_right_set(self) -> None:
        """Set the sidebar with the defined objects."""
        self._sidebar_right = panel.Column(
            css_classes=["card", "sidebar", "right-sidebar"],
            # sizing_mode="stretch_both",
            max_width=self.sidebars_max_width,
            visible=self.sidebar_right_visible,  # Initially hidden
            objects=self.sidebar_right_get(),
        )
        # Extend right sidebar objects with css_classes and card width
        self._css_classes_extend(self._sidebar_right.objects, ["card", "sidebar-card", "right-sidebar-card"])
        self._sidebar_object_width_extend(self._sidebar_right.objects)

    def _sidebar_right_toggle(self, event: Any) -> None:
        """Toggle the visibility of the sidebar."""
        # Private cause of _sidebar_right object must exist to use this method
        # When making this public, consider enabling sidebar_right_enabled initially
        # or set it automatically to enabled or at least check if _sidebar_right exists
        if self._sidebar_right.visible:
            self._sidebar_right.visible = False
        else:
            self._sidebar_right.visible = True

    def _sidebar_left_set(self) -> None:
        """Set the left sidebar with the defined objects."""
        # Set full left sidebar
        self._sidebar_left = panel.Column(
            css_classes=["card", "sidebar", "left-sidebar"],
            visible=self.sidebar_visible,  # Initially visible
            sizing_mode="stretch_both",
            max_width=self._sidebar_max_width,
            objects=self.sidebar_get(),
        )
        # Extend sidebar objects with css_classes and card width
        self._css_classes_extend(self._sidebar_left.objects, ["card", "sidebar-card", "left-sidebar-card"])
        self._sidebar_object_width_extend(self._sidebar_left.objects)

    def _sidebar_left_toggle(self, event: Any) -> None:
        """Toggle the visibility of the sidebar."""
        # Private cause of _sidebar_left object must exist to use this method
        # When making this public, consider enabling sidebar_left_enabled initially
        # or set it automatically to enabled or at least check if _sidebar_left exists
        if self._sidebar_left.visible:
            self._sidebar_left.visible = False
        else:
            self._sidebar_left.visible = True

    def _main_set(self) -> None:
        """Set or update main area Column."""
        if hasattr(self, "_main") and hasattr(self._main, "objects"):
            self._main.objects = self.main_get()
        else:
            self._main: panel.Column = panel.Column(
                css_classes=["main", "gridstack"],
                objects=self.main_get(),
            )

    def _content_set(self) -> None:
        """Set the layout of the content area."""
        self._content = panel.Row(
            css_classes=["content"],
            objects=[],  # Appended below, parts conditionally
            sizing_mode="scale_both",
        )

        # Left sidebar
        if self.sidebar_enabled:
            self._sidebar_left_set()
            self._content.objects.append(self._sidebar_left)

        # Main content
        self._content.objects.append(self._main)

        # Right sidebar
        if self.sidebar_right_enabled:
            self._sidebar_right_set()
            self._content.objects.append(self._sidebar_right)

    def _footer_set(self) -> None:
        """Set the footer layout with objects."""
        self._footer = panel.Row(
            css_classes=["footer", "navbar"],
            sizing_mode="stretch_width",
            objects=self._navbar,
        )

    def _header_set(self) -> None:
        """Set the header layout with objects."""
        self._header = panel.Row(
            css_classes=["header", "navbar"],
            sizing_mode="stretch_width",
            objects=self._navbar,
        )

    def _navbar_set(self) -> None:
        """Set the navbar objects, only type Column is allowed in tests."""
        self._navbar = []

        # Button: Toggle Left Sidebar (=sidebar)
        if self.sidebar_enabled:
            self._navbar.append(
                panel.Column(
                    align="center",
                    objects=[
                        panel.widgets.Button(
                            css_classes=["left-navbar-button"],
                            button_style="outline",
                            icon="menu-2",
                            icon_size="2em",
                            on_click=self._sidebar_left_toggle,
                        ),
                    ],
                ),
            )

        # Logo
        self._navbar.append(
            panel.Column(
                align="center",
                max_width=140,
                objects=[
                    panel.pane.image.Image(str(self.logo), link_url=self.logo_link_url, height=50),
                ],
            )
        )

        # Title
        self._navbar.append(
            panel.Column(
                align="center",
                sizing_mode="stretch_width",
                objects=[
                    panel.pane.HTML(
                        f"<h1>{self.title}</h1>",
                    ),
                ],
            )
        )

        # Button: Toggle Right Sidebar if enabled
        if self.sidebar_right_enabled:
            self._navbar.append(
                panel.Column(
                    align="center",
                    objects=[
                        panel.widgets.Button(
                            css_classes=["right-navbar-button"],
                            button_style="outline",
                            icon="menu-2",
                            icon_size="2em",
                            on_click=self._sidebar_right_toggle,
                        ),
                    ],
                )
            )

    def _panel_set(self) -> None:
        """Update the main panel with the current layout."""
        self._panel = panel.Column(
            css_classes=["panel"],
            sizing_mode="scale_both",
            objects=[],  # Appended below, parts conditionally
        )

        # Header
        self._panel.objects.append(self._header)

        # Content
        self._panel.objects.append(self._content)

        # Footer if enabled
        if self.footer_enabled:
            self._footer_set()
            self._panel.objects.append(self._footer)

    # TODO: Add tests of param.depends functions
    @param.depends("main", watch=True)
    def _panel_update_main(self) -> None:
        """Update the panel with the current layout of the main content."""
        self._main_set()
        # self._css_classes_set(self._main.objects, ["main-object"])
        self._content_set()
        self._panel_set()
        print("TRIGGER: Main panel updated")

    @param.depends("sidebar", watch=True)
    def _panel_update_sidebar_left(self) -> None:
        """Update the panel with the current layout of the left sidebar."""
        self._sidebar_left_set()
        self._content_set()
        self._panel_set()

    @param.depends("sidebar_right", watch=True)
    def _panel_update_sidebar_right(self) -> None:
        """Update the panel with the current layout of the right sidebar."""
        self._sidebar_right_set()
        self._content_set()
        self._panel_set()

    @param.depends("footer", watch=footer_enabled)
    def _panel_update_footer(self) -> None:
        """Update the panel with the current layout of the footer."""
        self._footer_set()
        self._panel_set()

    # $$$$$$$$$$$$$$$$$$$$$$$$$$$ ENDOF PRIV DEF $$$$$$$$$$$$$$$$$$$$$$$$$$$

    # $$$$$$$$$$$$$$$$$$$$$$$$$$$ BEGIN PUBL DEF $$$$$$$$$$$$$$$$$$$$$$$$$$$
    def sidebar_right_set(self, objects: list[panel.viewable.Viewable]) -> None:
        """Set the right sidebar objects."""
        self.sidebar_right = objects

    def sidebar_right_get(self) -> list[panel.viewable.Viewable]:
        """Get the right sidebar objects."""
        return list(self.sidebar_right)

    def sidebar_set(self, objects: list[panel.viewable.Viewable]) -> None:
        """Set the left sidebar objects."""
        self.sidebar = objects

    def sidebar_get(self) -> list[panel.viewable.Viewable]:
        """Get the sidebar objects."""
        return list(self.sidebar)

    # TODO: define main_clear function and test

    def main_remove_index(self, index: int) -> None:
        """Remove an object from the main content area by index."""
        if 0 <= index < len(self.main):
            del self.main[index]
            self.param.trigger("main")

    def main_add(self, objects: list[panel.viewable.Viewable]) -> None:
        """Add objects to the main content area and update the dashboard, applying CSS instantly."""
        self.main.extend(objects)
        self._css_classes_set(objects, ["main-object"])
        self.param.trigger("main")

    def main_set(self, objects: list[panel.viewable.Viewable]) -> None:
        """Set the main objects and apply CSS instantly."""
        self.main = objects
        self._css_classes_set(objects, ["main-object"])
        self.param.trigger("main")

    def main_get(self) -> list[panel.viewable.Viewable]:
        """Get the main objects."""
        return list(self.main)

    # TODO: Add tests for serve functions below
    def servable(self, **kwargs: Any) -> panel.viewable.Viewable:
        """Make the application servable with additional parameters."""
        kwargs["title"] = kwargs.get("title", self.title)
        return panel.viewable.Viewable.servable(
            self._panel,
            **kwargs,
        )

    def serve(self, **kwargs: Any) -> StoppableThread | Server:
        """Serve the application."""
        return panel.io.server.serve(
            self.__panel__(),
            title=str(self.title),
            ico_path=str(_FAVICON_URL),
            static_dirs={"/assets": self.static_dir},
            **kwargs,
        )
        # TODO: Access parameters maybe better via kwargs, to be tested
        # kwargs["title"] = str(self.title)
        # kwargs["ico_path"] = str(_FAVICON_URL)
        # kwargs["static_dirs"] = {"/assets": self.static_dir}
        # return panel.io.server.serve(
        #     self.__panel__(),
        #     **kwargs,
        # )

    # $$$$$$$$$$$$$$$$$$$$$$$$$$$ ENDOF PUBL DEF $$$$$$$$$$$$$$$$$$$$$$$$$$$


servable = Panelini()
servable.servable()


if __name__ == "__main__":
    """Run the Panelini application."""
    app = Panelini()
    app.serve(port=2222)
