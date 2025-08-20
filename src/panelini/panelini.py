"""
Main entry point for the Panelini application containing
header and content area, where the content area includes
a left as well as right sidebar and also the main area.
$$$$$$$$$$$$$$$$$$$$$ HEADER AREA $$$$$$$$$$$$$$$$$$$$$$
##################### CONTENT AREA #####################
## L ## ----------------- MAIN ----------------- ## R ##
## E ## ----------------- MAIN ----------------- ## I ##
## F ## ----------------- MAIN ----------------- ## G ##
## T ## ----------------- MAIN ----------------- ## H ##
## - ## ----------------- MAIN ----------------- ## T ##
## - ## ----------------- MAIN ----------------- ## - ##
## S ## ----------------- MAIN ----------------- ## S ##
## I ## ----------------- MAIN ----------------- ## I ##
## D ## ----------------- MAIN ----------------- ## D ##
## E ## ----------------- MAIN ----------------- ## E ##
## B ## ----------------- MAIN ----------------- ## B ##
## A ## ----------------- MAIN ----------------- ## A ##
## R ## ----------------- MAIN ----------------- ## R ##
##################### CONTENT AREA #####################
"""

import os
from pathlib import Path

import panel
import param

# from .utils.helper import get_os_abs_path

_ROOT = Path(__file__).parent
_ASSETS = _ROOT / "assets"
_PANELINI_CSS = _ROOT / "panelini.css"
_FAVICON_URL = _ASSETS / "favicon.ico"
_LOGO = _ASSETS / "panelinilogo.png"
_HEADER_BACKGROUND_IMAGE = _ASSETS / "header.svg"
_CONTENT_BACKGROUND_IMAGE = _ASSETS / "content.svg"


panel.extension("gridstack")


class Panelini(param.Parameterized):
    """Main class for the Panelini application."""

    # $$$$$$$$$$$$$$$$$$$$$$$$ BEGIN CLASSVARS $$$$$$$$$$$$$$$$$$$$$$$$
    logo = param.ClassSelector(
        # TODO: Implement util function that checks if path is valid
        # default=get_os_abs_path(_LOGO),
        default=str(_LOGO),
        class_=str,
        # class_=Path,
        doc="Logo image for the application.",
    )
    """Logo image for the application."""

    header_background_image = param.ClassSelector(
        default=str(_HEADER_BACKGROUND_IMAGE),
        class_=str,
        doc="Background image for the header section.",
    )
    """Background image for the header section."""

    content_background_image = param.ClassSelector(
        default=str(_CONTENT_BACKGROUND_IMAGE),
        class_=str,
        doc="Background image for the content section.",
    )
    """Background image for the content section."""

    title = param.String(
        default="Panelini",
        doc="Title of the application.",
    )
    """Title of the application."""

    main = param.List(
        default=[],
        item_type=panel.viewable.Viewable,
        doc="List of Panel objects to be displayed in main area.",
    )
    """List of Panel objects to be displayed in main area."""

    sidebar = param.List(
        default=[],
        item_type=panel.viewable.Viewable,
        doc="List of Panel objects to be displayed in left sidebar.",
    )
    """List of Panel objects to be displayed in left sidebar."""

    sidebar_right = param.List(
        default=[],
        item_type=panel.viewable.Viewable,
        doc="List of Panel objects to be displayed in right sidebar.",
    )
    """List of Panel objects to be displayed in right sidebar."""

    sidebar_enabled = param.Boolean(
        default=True,
        doc="Enable or disable the left sidebar.",
    )
    """Enable or disable the left sidebar."""

    sidebar_right_enabled = param.Boolean(
        default=False,
        doc="Enable or disable the right sidebar.",
    )
    """Enable or disable the right sidebar."""

    sidebar_visible = param.Boolean(
        default=True,
        doc="Enable or disable the collapsing of the left sidebar.",
    )
    """Show or hide the left sidebar initially."""

    sidebar_right_visible = param.Boolean(
        default=False,
        doc="Enable or disable the collapsing of the right sidebar.",
    )
    """Show or hide the right sidebar initially."""

    sidebars_max_width = param.Integer(
        default=300,
        bounds=(100, 500),
        doc="Maximum width of the sidebars as integer in px.",
    )
    """Maximum width of the sidebars as integer in px."""
    # $$$$$$$$$$$$$$$$$$$$$$$$ ENDOF CLASSVARS $$$$$$$$$$$$$$$$$$$$$$$$

    def __init__(self, **params):
        # def __init__(self, servable=False, **params):
        super().__init__(**params)
        # self.servable = servable
        self._load_css()
        # Navbar: 1st section of the panel
        self._set_navbar_objects()
        self._set_header()
        self._set_footer()
        # Content: 2nd section of the panel
        self._set_sidebar_config()
        self._set_main()
        self._set_content()
        self._build_panel()

    def _load_css(self) -> None:
        """Load custom CSS for the application."""
        panel.config.raw_css.append(_PANELINI_CSS.read_text())

        # Set navbar background image
        panel.config.raw_css.append(
            f".navbar {{ background-image: url(/assets/{os.path.basename(self.header_background_image)}); }}"
        )
        # Set content background image
        panel.config.raw_css.append(
            f".content {{ background-image: url(/assets/{os.path.basename(self.content_background_image)}); }}"
        )

    # $$$$$$$$$$$$$$$$$$$$$$$$ BEGIN UTILS $$$$$$$$$$$$$$$$$$$$$$$$
    # TODO: Write test for this function below, also check different panel objects than Card
    def _extend_css_classes(self, objects: list[panel.viewable.Viewable], css_classes: list[str]) -> None:
        """Add CSS classes to a list of Panel objects."""
        for obj in objects:
            if isinstance(obj, panel.viewable.Viewable):
                obj.css_classes.extend(css_classes)

    # TODO: Write test for this function below, also check different panel objects than Card
    def _extend_sidebar_object_width(self, objects: list[panel.viewable.Viewable]) -> None:
        """Extend the width of sidebar cards."""
        for obj in objects:
            if isinstance(obj, panel.viewable.Viewable):
                obj.width = self._sidebar_object_width

    # $$$$$$$$$$$$$$$$$$$$$$$$ ENDOF UTILS $$$$$$$$$$$$$$$$$$$$$$$$

    def _set_sidebar_config(self):
        """Set the configuration for the sidebars."""
        self._sidebar_max_width = int(self.sidebars_max_width)
        self._sidebar_inner_width = int(self.sidebars_max_width * 0.91)
        self._sidebar_object_width = int(self.sidebars_max_width * 0.88)
        # self._sidebar_card_elem_width = int(self.sidebars_max_width * 0.80)
        self._sidebar_card_spacer_height = int(self.sidebars_max_width * 0.06)

    def _set_sidebar_right(self):
        """Set the sidebar with the defined objects."""
        self._sidebar_right = panel.Column(
            css_classes=["card", "sidebar", "right-sidebar"],
            # hide_header=True,
            # collapsible=False,
            sizing_mode="stretch_both",
            max_width=self.sidebars_max_width,
            visible=self.sidebar_right_visible,  # Initially hidden
            objects=self.get_sidebar_right(),
        )
        # Extend right sidebar objects with css_classes and card width
        self._extend_css_classes(self._sidebar_right.objects, ["card", "sidebar-card", "right-sidebar-card"])
        self._extend_sidebar_object_width(self._sidebar_right.objects)

    def _toggle_sidebar_right(self, event):
        """Toggle the visibility of the sidebar."""
        # Private cause of _sidebar_right object must exist to use this method
        # When making this public, consider enabling sidebar_right_enabled initially
        # or set it automatically to enabled or at least check if _sidebar_right exists
        if self._sidebar_right.visible:
            self._sidebar_right.visible = False
        else:
            self._sidebar_right.visible = True

    def _set_sidebar_left(self):
        """Set the left sidebar with the defined objects."""
        # Set full left sidebar
        self._sidebar_left = panel.Column(
            css_classes=["card", "sidebar", "left-sidebar"],
            # hide_header=True,
            # collapsible=False,
            visible=self.sidebar_visible,  # Initially visible
            sizing_mode="stretch_both",
            max_width=self._sidebar_max_width,
            objects=self.get_sidebar(),
        )
        # Extend sidebar objects with css_classes and card width
        self._extend_css_classes(self._sidebar_left.objects, ["card", "sidebar-card", "left-sidebar-card"])
        self._extend_sidebar_object_width(self._sidebar_left.objects)

    def _toggle_sidebar_left(self, event):
        """Toggle the visibility of the sidebar."""
        # Private cause of _sidebar_left object must exist to use this method
        # When making this public, consider enabling sidebar_left_enabled initially
        # or set it automatically to enabled or at least check if _sidebar_left exists
        if self._sidebar_left.visible:
            self._sidebar_left.visible = False
        else:
            self._sidebar_left.visible = True

    def _set_main(self):
        """Set main area Column"""
        self._main = panel.Column(
            # self._main = panel.layout.base.ListLike(
            css_classes=["main", "gridstack"],
            sizing_mode="stretch_both",
            objects=self.get_main(),
        )

    def _set_content(self):
        """Set the layout of the content area."""
        self._content = panel.Row(
            css_classes=["content"],
            objects=[],
            sizing_mode="stretch_height",
        )
        # Left sidebar
        if self.sidebar_enabled:
            self._set_sidebar_left()
            self._content.objects.append(self._sidebar_left)

        # Main content
        self._content.objects.append(self._main)
        # Right sidebar
        if self.sidebar_right_enabled:
            self._set_sidebar_right()
            self._content.objects.append(self._sidebar_right)

    def _set_footer(self):
        """Set the footer layout with objects."""
        self._footer = panel.Row(
            css_classes=["footer", "navbar"],
            sizing_mode="stretch_width",
            objects=self._navbar_objects,
        )

    def _set_header(self):
        """Set the header layout with objects."""
        self._header = panel.Row(
            css_classes=["header", "navbar"],
            sizing_mode="stretch_width",
            objects=self._navbar_objects,
        )

    def _set_navbar_objects(self):
        """Get the navbar objects."""
        self._navbar_objects = []
        # Sidebar left
        if self.sidebar_enabled:
            self._navbar_objects.append(
                panel.Column(
                    align="center",
                    objects=[
                        panel.widgets.Button(
                            css_classes=["left-navbar-button"],
                            # name="Toggle Sidebar",
                            # description="Toggle Sidebar",
                            button_style="outline",
                            icon="menu-2",
                            icon_size="2em",
                            on_click=self._toggle_sidebar_left,
                        ),
                    ],
                ),
            )
        # Logo
        self._navbar_objects.append(
            panel.Column(
                align="center",
                max_width=140,
                objects=[
                    panel.pane.image.Image(str(self.logo), link_url="/", height=50),
                ],
            )
        )

        # Title
        self._navbar_objects.append(
            panel.Column(
                align="center",
                sizing_mode="stretch_width",
                objects=[
                    # TODO: make title a param default to "Panelini"
                    panel.pane.HTML(
                        f"<h1>{self.title}</h1>",
                    ),
                ],
            )
        )

        # Sidebar right
        if self.sidebar_right_enabled:
            self._navbar_objects.append(
                panel.Column(
                    align="center",
                    objects=[
                        panel.widgets.Button(
                            css_classes=["right-navbar-button"],
                            # name="Toggle Right Sidebar",
                            # description="Toggle Right Sidebar",
                            button_style="outline",
                            icon="menu-2",
                            icon_size="2em",
                            on_click=self._toggle_sidebar_right,
                        ),
                    ],
                )
            )

    def _build_panel(self):
        """Update the main panel with the current layout."""
        # copy header as footer
        self._panel = panel.Column(
            css_classes=["panel"],
            sizing_mode="scale_both",
            objects=[self._header, self._content, self._footer],
        )

    def set_sidebar_right(self, objects) -> None:
        """Set the right sidebar objects."""
        self.sidebar_right = objects

    def get_sidebar_right(self) -> list:
        """Get the right sidebar objects."""
        return self.sidebar_right

    def set_sidebar(self, objects) -> None:
        """Set the left sidebar objects."""
        self.sidebar = objects

    def get_sidebar(self) -> list:
        """Get the sidebar objects."""
        return self.sidebar

    def set_main(self, objects) -> None:
        """Set the main objects."""
        self.main = objects

    def get_main(self) -> list:
        """Get the main objects."""
        return self.main

    # TODO: Add tests for functions below
    def servable(self, *args, **kwargs):
        """Make the application servable."""
        return self.__panel__().servable(*args, **kwargs)

    def serve(self, *args, **kwargs):
        """Serve the application."""
        return panel.serve(self, *args, ico_path=str(_FAVICON_URL), static_dirs={"/assets": str(_ASSETS)}, **kwargs)

    def __panel__(self):
        """Return the main panel for the application."""
        return self._panel

    # TODO: Test this functions below
    # How to check if rendered panel has been updated?
    @param.depends("main", watch=True)
    def _update_main_panel(self):
        """Update the panel with the current layout."""
        self._set_main()
        self._set_content()
        self._build_panel()

    @param.depends("sidebar", watch=True)
    def _update_left_sidebar_panel(self):
        """Update the panel with the current layout."""
        self._set_sidebar_left()
        self._set_content()
        self._build_panel()

    @param.depends("sidebar_right", watch=True)
    def _update_right_sidebar_panel(self):
        """Update the panel with the current layout."""
        self._set_sidebar_right()
        self._set_content()
        self._build_panel()


app = Panelini(
    title="Panelini",
    logo="/usr/local/docker-container/_dev/github/opensemanticworld/panelini/src/panelini/assets/panelinilogo.png",
    main=[
        panel.pane.Markdown("## Welcome to Panelini"),
    ],
    sidebar_enabled=True,
    sidebar_right_enabled=True,
)

app.servable()


# app.main.append(panel.pane.Markdown("#### Explore the latest updates and improvements."))


if __name__ == "__main__":
    """Run the Panelini application."""
    app = Panelini(logo="/usr/local/docker-container/_dev/github/opensemanticworld/panelini/img/panelinibanner.svg")
    panel.serve(
        app,
        static_dirs={"/assets": str(_ASSETS)},
        ico_path=str(_FAVICON_URL),
        port=5006,
        title="Panelini",
    )
