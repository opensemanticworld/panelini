"""
Main entry point for the Panelini application containing
header and content area, where the content area includes
a left as well as right sidebar and also the main area.
%%%%%%%%%%%%%%%%%%%%%%%% HEADER %%%%%%%%%%%%%%%%%%%%%%%%
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

    logo = param.ClassSelector(
        # TODO: Implement util function that checks if path is valid
        # default=get_os_abs_path(_LOGO),
        default=str(_LOGO),
        class_=str,
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

    # BEGIN TODO: MAKE FOLLOWING PARAMS EDITABLE IN INSTANCES
    main = param.List(
        default=[],
        doc="List of Panel objects to be displayed in the application.",
        item_type=panel.viewable.Viewable,
    )
    """List of Panel objects to be displayed in the application."""

    sidebar_left = param.ClassSelector(
        default=None,
        class_=panel.Column,
        doc="Left sidebar for the application.",
    )
    """Left sidebar for the application."""

    sidebar_right = param.ClassSelector(
        default=None,
        class_=panel.Card,
        doc="Right sidebar for the application.",
    )
    """Right sidebar for the application."""
    # ENDOF MAKE FOLLOWING PARAMS EDITABLE IN INSTANCES

    # NOT NECESSARY YET - mechanism of existing class vars tbd: logo, title, ...
    # header = param.List(
    #     default=[],
    #     doc="List of Panel objects to be displayed in the header.",
    #     item_type=panel.viewable.Viewable,
    # )
    # """List of Panel objects to be displayed in the header."""

    def __init__(self, **params):
        # def __init__(self, servable=False, **params):
        super().__init__(**params)
        # self.servable = servable
        self._load_css()
        # Header: 1st section of the panel
        self._set_header()
        # Content: 2nd section of the panel
        self._set_sidebar_config()
        self._set_left_sidebar_objects()
        self._set_right_sidebar_objects()
        self._set_left_sidebar()
        self._set_right_sidebar()
        self._set_main()
        self._set_content()
        self._build_panel()

    def _load_css(self) -> None:
        """Load custom CSS for the application."""
        panel.config.raw_css.append(_PANELINI_CSS.read_text())

        # Set header background image
        panel.config.raw_css.append(
            f".header {{ background-image: url(/assets/{os.path.basename(self.header_background_image)}); }}"
        )
        # Set content background image
        panel.config.raw_css.append(
            f".content {{ background-image: url(/assets/{os.path.basename(self.content_background_image)}); }}"
        )

        # Header: 1st section of the panel
        self._set_header()
        # Content: 2nd section of the panel
        self._set_sidebar_config()
        self._set_left_sidebar_objects()
        self._set_right_sidebar_objects()
        self._set_left_sidebar()
        self._set_right_sidebar()
        self._set_main()
        self._set_content()
        # Combines header and content into body of the panel
        self._build_panel()

    def _set_header(self):
        """Set the navbar with a toggle button for the sidebar."""
        self._header = panel.Row(
            css_classes=["header", "navbar"],
            sizing_mode="stretch_width",
            objects=[
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
                            on_click=self._toggle_left_sidebar,
                        ),
                    ],
                ),
                panel.Column(
                    align="center",
                    max_width=140,
                    objects=[
                        panel.pane.image.Image(str(self.logo), link_url="/", height=50),
                    ],
                ),
                panel.Column(
                    align="center",
                    sizing_mode="stretch_width",
                    objects=[
                        # TODO: make title a param default to "Panelini"
                        panel.pane.HTML(
                            f"<h1>{self.title}</h1>",
                        ),
                    ],
                ),
                panel.Column(
                    align="center",
                    # set icon color to white
                    objects=[
                        panel.widgets.Button(
                            css_classes=["right-navbar-button"],
                            # name="Toggle Sidebar",
                            # description="Toggle Sidebar",
                            button_style="outline",
                            icon="menu-2",
                            icon_size="2em",
                            on_click=self._toggle_right_sidebar,
                        ),
                    ],
                ),
            ],
        )

    def _set_sidebar_config(self):
        """Set the configuration for the sidebars."""
        self._sidebar_max_width = 330  # px as int, default is 330
        self._sidebar_inner_width = self._sidebar_max_width - 30  # px as int
        self._sidebar_card_width = self._sidebar_inner_width - 10  # px as int
        self._sidebar_card_elem_width = self._sidebar_card_width - 25  # px as int
        self._sidebar_card_spacer_heigth = 20  # px as int

    def _set_left_sidebar_objects(self):
        """Set the sidebar content."""
        self._left_sidebar_objects = [
            panel.Card(
                css_classes=["card", "sidebar-card", "left-sidebar-card"],
                title="Main Functions",
                width=self._sidebar_card_width,
                # objects=[panel.widgets.Button(name="Update Main", button_type="primary", on_click=self._update_main)],
            ),
            panel.Card(
                css_classes=["card", "sidebar-card", "left-sidebar-card"],
                title="Left Sidebar Card",
                width=self._sidebar_card_width,
                objects=[
                    panel.widgets.Button(
                        name="Debug gstack", button_type="primary", on_click=lambda _: print(self._main.objects)
                    ),
                    panel.widgets.Button(
                        name="Get State", button_type="primary", on_click=lambda _: print(self._main.state)
                    ),
                ],
            ),
            panel.Card(
                css_classes=["card", "sidebar-card", "left-sidebar-card"],
                title="Left Sidebar Card",
                width=self._sidebar_card_width,
                objects=[
                    panel.widgets.Button(name="Button 1", button_type="primary", align="center"),
                    panel.widgets.Button(name="Button 2", button_type="primary", align="end"),
                    panel.widgets.Button(name="Button 3", button_type="primary", align="start"),
                ],
            ),
            # panel.Row(sizing_mode="stretch_both", css_classes=["sidebar-card-spacer"]),
            # panel.Spacer(sizing_mode="stretch_height"),
        ]

    def _set_right_sidebar_objects(self):
        """Set the sidebar content."""
        self._right_sidebar_objects = [
            # Use a sidebar card
            panel.Card(
                css_classes=["card", "sidebar-card", "right-sidebar-card"],
                hide_header=True,
                collapsible=False,
                # sizing_mode="stretch_width",
                width=self._sidebar_card_width,
                objects=[
                    panel.pane.Markdown("### Right Sidebar Content"),
                    panel.widgets.Button(name="Button 1", button_type="primary"),
                    panel.widgets.Button(name="Button 2", button_type="primary"),
                    panel.widgets.Button(name="Button 3", button_type="primary"),
                ],
            ),
            panel.Spacer(height=self._sidebar_card_spacer_heigth),  # Spacer for layout
            # panel.Spacer(height=self._sidebar_card_spacer_heigth, sizing_mode="stretch_height"),  # Spacer for layout
        ]

    def _set_left_sidebar(self):
        """Set the sidebar with the defined objects."""
        self._sidebar = panel.Column(
            css_classes=["card", "sidebar", "left-sidebar"],
            sizing_mode="stretch_both",
            max_width=self._sidebar_max_width,
            objects=[*self._left_sidebar_objects],
        )

    def _set_right_sidebar(self):
        """Set the sidebar with the defined objects."""
        self._right_sidebar = panel.Card(
            css_classes=["card", "sidebar", "right-sidebar"],
            title="Right Sidebar",
            hide_header=True,
            collapsible=False,
            sizing_mode="stretch_height",
            max_width=330,
            visible=False,  # Initially hidden
            objects=self._right_sidebar_objects,
        )

    def _toggle_left_sidebar(self, event):
        """Toggle the visibility of the sidebar."""
        if self._sidebar.visible:
            self._sidebar.visible = False
        else:
            self._sidebar.visible = True

    def _toggle_right_sidebar(self, event):
        """Toggle the visibility of the sidebar."""
        if self._right_sidebar.visible:
            self._right_sidebar.visible = False
        else:
            self._right_sidebar.visible = True

    def _set_main(self):
        """Set main area Column"""
        self._main = panel.Column(
            css_classes=["main", "gridstack"],
            sizing_mode="stretch_both",
            objects=self.main,
        )

        # """Set content in main area of the GridStack."""
        # if self.main_objects:
        #     self._main = panel.GridStack(sizing_mode="scale_both", css_classes=["gridstack", "main"])
        # else:
        #     self._main = panel.GridStack(sizing_mode="scale_both", css_classes=["gridstack", "main"])

    # def update_main(self, event):
    #     """Update the main area with the current layout."""
    #     main_tmp = self._main.objects.copy()
    #     self._main.objects.clear()
    #     self._main.objects.extend(self.main_objects)

    def _set_content(self):
        """Set the layout of the content area."""
        self._content = panel.Row(
            css_classes=["content"],
            objects=[self._sidebar, self._main, self._right_sidebar],
            sizing_mode="stretch_height",
        )

    def _build_panel(self):
        """Update the main panel with the current layout."""
        self._panel = panel.Column(
            css_classes=["panel"],
            sizing_mode="scale_both",
            objects=[self._header, self._content],
        )

    def servable(self, *args, **kwargs):
        """Make the application servable."""
        return self.__panel__().servable(*args, **kwargs)

    def serve(self, *args, **kwargs):
        """Serve the application."""
        return panel.serve(self, *args, ico_path=str(_FAVICON_URL), static_dirs={"/assets": str(_ASSETS)}, **kwargs)

    def __panel__(self):
        """Return the main panel for the application."""
        return self._panel


Panelini(
    logo="/usr/local/docker-container/_dev/github/opensemanticworld/panelini/src/panelini/assets/panelinilogo.png",
    # logo="/usr/local/docker-container/_dev/github/opensemanticworld/panelini/img/panelinibanner.svg",
).servable(
    title="Panelini",
)


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
