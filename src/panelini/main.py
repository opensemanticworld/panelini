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

import base64
from pathlib import Path
from typing import Any

import panel
import param  # type: ignore[import-untyped]
from panel.io.location import Location

# $$$$$$$$$$$$$$$$$$$$$$$$$$$ BEGIN LOCAL DIR PATH $$$$$$$$$$$$$$$$$$$$$$$$$$$
_ROOT = Path(__file__).parent
_ASSETS = _ROOT / "assets"
_MAIN_CSS = _ROOT / "main.css"
_FAVICON_URL = _ASSETS / "favicon.ico"
_LOGO = _ASSETS / "panelinilogo.png"
_HEADER_BACKGROUND_IMAGE = _ASSETS / "header.jpg"
_CONTENT_BACKGROUND_IMAGE = _ASSETS / "content.jpg"

# $$$$$$$$$$$$$$$$$$$$$$$$$$$ ENDOF LOCAL DIR PATH $$$$$$$$$$$$$$$$$$$$$$$$$$$


class ImageFileNotFoundError(FileNotFoundError):
    """Custom error for missing image files."""

    def __init__(self, image_path: str) -> None:
        """Initialize the error with the missing image path."""
        super().__init__(f"The image file at {image_path} was not found.")


def image_to_base64(image_path: str) -> str:
    """Convert an image file to a base64-encoded string."""
    # Ensure path exists
    if Path(image_path).is_file():
        with open(image_path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode("utf-8")
        return f"data:image/{Path(image_path).suffix[1:]};base64,{encoded_string}"
    else:
        raise ImageFileNotFoundError(image_path)


class Panelini(panel.viewable.Viewer):  # type: ignore[no-any-unimported]
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
        allow_None=True,
        doc="Background image for the header section. Set to None to disable.",
    )

    content_background_image = param.ClassSelector(
        class_=(str, Path),
        default=_CONTENT_BACKGROUND_IMAGE,
        allow_None=True,
        doc="Background image for the content section. Set to None to disable.",
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
        default=False,
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

    use_ai = param.Boolean(
        default=False,
        doc="Enable the AI chat component.",
    )

    ai_system_message = param.String(
        default="You are a helpful assistant.",
        doc="System message for the AI backend.",
    )

    ai_welcome_message = param.String(
        default=None,
        allow_None=True,
        doc="Optional greeting posted into a new AI chat. None starts it empty.",
    )

    ai_config_path = param.ClassSelector(
        class_=(str, Path),
        default=None,
        allow_None=True,
        doc="Optional path to a custom config.yml for the AI component.",
    )

    ai_show_preview = param.Boolean(
        default=False,
        doc="Show the preview pane next to the AI chat (off by default).",
    )

    ai_history_store = param.Parameter(
        default=None,
        doc=(
            "ChatHistoryStore for the AI chat history. When None, all "
            "sessions share a SQLite store at PANELINI_HISTORY_DB, or an "
            "in-memory store when that variable is unset. The string "
            "'browser' keeps each user's history in their browser's "
            "localStorage instead."
        ),
    )

    ai_history_view = param.Selector(
        default="tree",
        objects=["tree", "list"],
        doc="Initial history sidebar style: drag-and-drop folder tree (default) or date-grouped list.",
    )

    show_user = param.Boolean(
        default=False,
        doc="Show the resolved user as a chip in the header (top right).",
    )

    user_resolver = param.Callable(
        default=None,
        doc=(
            "Callable resolving the application user id (header chip, AI chat "
            "history owner); defaults to Panel auth user or an anonymous "
            "browser cookie."
        ),
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
        # Session user, resolved at most once (see _resolved_user)
        self._user_id: str | None = None
        self._user_cookie_pane: panel.viewable.Viewable | None = None
        # Empty Column to trigger panel rendering when clearing
        self._main_empty_column = panel.Column(visible=False)

        # self.servable = servable
        self._css_main_load()
        self._main_container_dict: dict[panel.viewable.Viewable, panel.Column] = {}
        # Navbar: 1st section of the panel
        self._navbar_set()
        self._header_set()
        # Content: 2nd section of the panel
        self._sidebar_config_set()

        if self.sidebar_right_enabled:
            self._sidebar_right = panel.Column(
                css_classes=["sidebar", "right-sidebar"],
                visible=self.sidebar_right_visible,
                max_width=self._sidebar_max_width,
                sizing_mode="stretch_both",
                objects=self.sidebar_right_get(),
            )
            self._sidebar_right_set()

        if self.sidebar_enabled:
            self._sidebar_left = panel.Column(
                css_classes=["sidebar", "left-sidebar"],
                visible=self.sidebar_visible,
                max_width=self._sidebar_max_width,
                sizing_mode="stretch_both",
                objects=self.sidebar_get(),
            )
            self._sidebar_left_set()

        self._main = panel.Column(
            css_classes=["main", "main-column"],
            sizing_mode="scale_both",
            objects=[self._main_empty_column],
        )
        self._main_set()

        self._content = panel.Row(
            css_classes=["content"],
            objects=[
                self._header,
                self._main,
            ],
            sizing_mode="scale_both",
        )
        # Appended below, parts conditionally in _content_set function
        self._content_set()

        self._panel = panel.Column(
            css_classes=["panel"],
            sizing_mode="scale_both",
            objects=[],  # Appended below, parts conditionally
        )
        self._panel_set()

        if self.use_ai:
            self._init_ai()

    def _init_ai(self) -> None:
        """Lazily initialize the AI chat component.

        Raises:
            ImportError: If the AI dependencies are not installed.
        """
        try:
            from panelini.panels.ai import AiChat
        except ImportError as exc:
            msg = "AI dependencies are not installed. Install with: pip install panelini[ai]"
            raise ImportError(msg) from exc

        config_path = Path(self.ai_config_path) if isinstance(self.ai_config_path, str) else self.ai_config_path
        history_store = self.ai_history_store
        if history_store is None:
            from panelini.panels.ai.history import default_history_store

            history_store = default_history_store()
        # Single resolution point: the header badge and the AI panel share
        # one resolved identity; the cookie pane is embedded exactly once
        user_id, cookie_pane = self._resolved_user()
        if self.show_user:
            cookie_pane = None  # already embedded next to the header badge
        self._ai_frontend = AiChat(
            system_message=self.ai_system_message,
            welcome_message=self.ai_welcome_message,
            config_path=config_path,
            show_preview=self.ai_show_preview,
            history_store=history_store,
            history_view=self.ai_history_view,
            user_id=user_id,
            cookie_pane=cookie_pane,
        )

        # Ensure the sidebar is enabled so AI controls are accessible
        if not self.sidebar_enabled:
            self.sidebar_enabled = True
            self._sidebar_left = panel.Column(
                css_classes=["sidebar", "left-sidebar"],
                visible=self.sidebar_visible,
                max_width=self._sidebar_max_width,
                sizing_mode="stretch_both",
                objects=self.sidebar_get(),
            )
            self._sidebar_left_set()

        self.sidebar_set(objects=self._ai_frontend.sidebar_objects)
        self.main_set(objects=self._ai_frontend.main_objects)

    def __panel__(self) -> panel.viewable.Viewable:
        """Return the main panel for the application."""
        return self._panel

    # $$$$$$$$$$$$$$$$$$$$$$$$$$$$ ENDOF INIT $$$$$$$$$$$$$$$$$$$$$$$$$$$$

    # $$$$$$$$$$$$$$$$$$$$$$$$$$$ BEGIN PRIV DEF $$$$$$$$$$$$$$$$$$$$$$$$$$$
    def _css_main_load(self) -> None:
        """Load custom CSS for the application."""
        # Convert background_image to base64 and embed in CSS

        panel.config.raw_css.append(_MAIN_CSS.read_text())

        # Set navbar background image
        if self.header_background_image is not None:
            header_img_base64 = image_to_base64(str(self.header_background_image))
            panel.config.raw_css.append(f".navbar {{ background-image: url({header_img_base64}); }}")

        # Set content background image
        if self.content_background_image is not None:
            content_img_base64 = image_to_base64(str(self.content_background_image))
            panel.config.raw_css.append(f".content {{ background-image: url({content_img_base64}); }}")

    def _sidebar_config_set(self) -> None:
        """Set the configuration for the sidebars."""
        self._sidebar_max_width = int(self.sidebars_max_width)
        self._sidebar_inner_width = int(self.sidebars_max_width * 0.91)
        self._sidebar_object_width = int(self.sidebars_max_width * 0.88)
        self._sidebar_card_elem_width = int(self.sidebars_max_width * 0.80)
        self._sidebar_card_spacer_height = int(self.sidebars_max_width * 0.06)

    def _sidebar_right_set(self) -> None:
        """Set the sidebar with the defined objects."""

        self._sidebar_right.objects.clear()
        self._sidebar_right.objects = self.sidebar_right_get()
        # Extend right sidebar objects with css_classes and card width
        self._css_classes_extend(self._sidebar_right.objects, ["right-sidebar-object"])
        self._sidebar_object_width_extend(self._sidebar_right.objects)

    def _sidebar_right_toggle(self, event: Any) -> None:
        """Toggle the visibility of the sidebar."""
        # Private cause of _sidebar_right object must exist to use this method
        # When making this public, consider enabling sidebar_right_enabled initially
        # or set it automatically to enabled or at least check if _sidebar_right exists
        if self._sidebar_right.visible:
            self._sidebar_right.visible = False
            # print("§§§ HIDE SIDEBAR §§§")
        else:
            self._sidebar_right.visible = True
            # print("§§§ SHOW SIDEBAR §§§")

    def _sidebar_left_set(self) -> None:
        """Set the left sidebar with the defined objects."""
        # Set full left sidebar
        self._sidebar_left.objects.clear()
        self._sidebar_left.objects = self.sidebar_get()
        # Extend sidebar objects with css_classes and card width
        self._css_classes_extend(self._sidebar_left.objects, ["left-sidebar-object"])
        self._sidebar_object_width_extend(self._sidebar_left.objects)

    def _sidebar_left_toggle(self, event: Any) -> None:
        """Toggle the visibility of the sidebar."""
        # Private cause of _sidebar_left object must exist to use this method
        # When making this public, consider enabling sidebar_left_enabled initially
        # or set it automatically to enabled or at least check if _sidebar_left exists
        if self._sidebar_left.visible:
            self._sidebar_left.visible = False
            # print("§§§ HIDE SIDEBAR §§§")
        else:
            self._sidebar_left.visible = True
            # print("§§§ SHOW SIDEBAR §§§")

    def _main_set(self) -> None:
        """Set main area Column."""
        # clear objects without losing reference to self._main
        self._main.objects.clear()
        self._css_classes_extend(self.main, ["main-object"])
        self._main.objects = self.main

    def _content_set(self) -> None:
        """Set the layout of the content area."""
        self._content.objects.clear()

        # Left sidebar
        if self.sidebar_enabled:
            self._content.objects.append(self._sidebar_left)

        # Main area
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

    def _resolved_user(self) -> tuple[str, panel.viewable.Viewable | None]:
        """Resolve the session user once; header and AI panel share it."""
        if self._user_id is None:
            from panelini.user import ensure_anonymous_cookie, resolve_user

            if self.user_resolver is not None:
                self._user_id = resolve_user(self.user_resolver)
            else:
                self._user_id, self._user_cookie_pane = ensure_anonymous_cookie()
        return self._user_id, self._user_cookie_pane

    def _navbar_set(self) -> None:
        """Set the navbar objects, only type Column is allowed in tests."""
        self._navbar = []
        spacer_width = 60

        # The columns around the title are capped so a global pn.config.sizing_mode
        # cannot stretch them and spread the header apart.

        # Left sidebar toggle button
        if self.sidebar_enabled:
            self._navbar.append(
                panel.Column(
                    align="center",
                    max_width=spacer_width,
                    objects=[
                        panel.widgets.Button(
                            css_classes=["left-navbar-button"],
                            button_style="outline",
                            icon=(
                                "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'"
                                " fill='none' stroke='currentColor' stroke-width='2'>"
                                "<path d='M4 6h16M4 12h16M4 18h16'/></svg>"
                            ),
                            icon_size="2em",
                            on_click=self._sidebar_left_toggle,
                        ),
                    ],
                ),
            )
        else:
            self._navbar.append(panel.Column(panel.Spacer(width=spacer_width), max_width=spacer_width))

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

        # Current user badge (top right)
        if self.show_user:
            from panelini.components.user_badge import user_badge

            user_id, cookie_pane = self._resolved_user()
            badge_objects: list[panel.viewable.Viewable] = [user_badge(user_id)]
            if cookie_pane is not None:
                badge_objects.append(cookie_pane)
            self._navbar.append(panel.Column(align="center", objects=badge_objects))

        # Sidebar right toggle button
        if self.sidebar_right_enabled:
            self._navbar.append(
                panel.Column(
                    align="center",
                    max_width=spacer_width,
                    objects=[
                        panel.widgets.Button(
                            css_classes=["right-navbar-button"],
                            button_style="outline",
                            icon=(
                                "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'"
                                " fill='none' stroke='currentColor' stroke-width='2'>"
                                "<path d='M4 6h16M4 12h16M4 18h16'/></svg>"
                            ),
                            icon_size="2em",
                            on_click=self._sidebar_right_toggle,
                        ),
                    ],
                )
            )
        else:
            self._navbar.append(panel.Column(panel.Spacer(width=spacer_width), max_width=spacer_width))

    def _panel_set(self) -> None:
        """Update the main panel with the current layout."""

        self._panel.objects.clear()
        self._panel.objects.append(self._header)
        self._panel.objects.append(self._content)
        if self.footer_enabled:
            self._footer_set()
            self._panel.objects.append(self._footer)

    # TODO: Add tests of param.depends functions
    @param.depends("main", watch=True)
    def _panel_update_main(self) -> None:
        """Update the panel with the current layout of the main content."""
        self._main_set()
        self._content_set()
        self._panel_set()
        # print("TRIGGER: _panel_update_main")

    @param.depends("sidebar", watch=True)
    def _panel_update_sidebar_left(self) -> None:
        """Update the panel with the current layout of the left sidebar."""
        self._sidebar_left_set()
        self._content_set()
        self._panel_set()
        # print("TRIGGER: _panel_update_sidebar_left")

    @param.depends("sidebar_right", watch=True)
    def _panel_update_sidebar_right(self) -> None:
        """Update the panel with the current layout of the right sidebar."""
        self._sidebar_right_set()
        self._content_set()
        self._panel_set()
        # print("TRIGGER: _panel_update_sidebar_right")

    @param.depends("sidebar_visible", watch=True)
    def _panel_update_sidebar_left_visible(self) -> None:
        """Reflect a runtime change of ``sidebar_visible`` onto the rendered sidebar.

        The Column reads ``sidebar_visible`` once at construction, so without this
        watcher setting the param afterwards would be a no-op. The toggle button stays,
        so a collapsed sidebar can still be opened.
        """
        if hasattr(self, "_sidebar_left"):
            self._sidebar_left.visible = self.sidebar_visible

    @param.depends("sidebar_right_visible", watch=True)
    def _panel_update_sidebar_right_visible(self) -> None:
        """Reflect a runtime change of ``sidebar_right_visible`` onto the right sidebar."""
        if hasattr(self, "_sidebar_right"):
            self._sidebar_right.visible = self.sidebar_right_visible

    @param.depends("footer", watch=True)
    def _panel_update_footer(self) -> None:
        """Update the panel with the current layout of the footer."""
        self._footer_set()
        self._panel_set()
        # print("TRIGGER: _panel_update_footer")

    # $$$$$$$$$$$$$$$$$$$$$$$$$$$ ENDOF PRIV DEF $$$$$$$$$$$$$$$$$$$$$$$$$$$

    # $$$$$$$$$$$$$$$$$$$$$$$$$$$ BEGIN PUBL DEF $$$$$$$$$$$$$$$$$$$$$$$$$$$
    def sidebar_right_set(self, objects: list[panel.viewable.Viewable]) -> None:
        """Set the right sidebar objects."""
        self.sidebar_right = objects

    def sidebar_right_get(self) -> list[panel.viewable.Viewable]:
        """Get the right sidebar objects."""
        self._css_classes_extend(self.sidebar_right, ["sidebar-object"])
        return list(self.sidebar_right)

    def sidebar_set(self, objects: list[panel.viewable.Viewable]) -> None:
        """Set the left sidebar objects."""
        self.sidebar = objects

    def sidebar_get(self) -> list[panel.viewable.Viewable]:
        """Get the sidebar objects."""
        self._css_classes_extend(self.sidebar, ["sidebar-object"])

        return list(self.sidebar)

    def main_remove_index(self, index: int) -> None:
        """Remove an object from the main content area by index."""
        if 0 <= index < len(self.main):
            del self.main[index]
            self.param.trigger("main")

    def main_add(self, objects: list[panel.viewable.Viewable]) -> None:
        """Add objects to the main content area and update the dashboard, applying CSS instantly."""
        self._css_classes_extend(objects, ["main-object"])
        self.main.extend(objects)

    def main_set(self, objects: list[panel.viewable.Viewable]) -> None:
        """Set the main objects and apply CSS instantly."""
        # print(f"$$$ BEFORE $$$ main_set: {self.main}")
        # self._css_classes_extend(objects, ["main-object"])
        self.main = objects
        # print(f"$$$ AFTER $$$ main_set: {self.main}")
        # self.param.trigger("main")

    def main_clear(self) -> None:
        """Clear all objects from the main content area and update the dashboard."""
        # Uses empty column to trigger panel rendering without the need of refreshing the browser
        self.main = [self._main_empty_column]

    def main_get(self) -> list[panel.viewable.Viewable]:
        """Get the main objects."""
        self._css_classes_extend(self.main, ["main-object"])
        return list(self.main)

    def servable(
        self,
        title: str | None = None,
        location: bool | Location = True,
        area: str = "main",
        target: str | None = None,
    ) -> panel.viewable.Viewable:
        """Make the application servable with additional parameters."""
        if title is None:
            title = self.title
        return panel.viewable.Viewable.servable(self._panel, title, location, area, target)

    # $$$$$$$$$$$$$$$$$$$$$$$$$$$ ENDOF PUBL DEF $$$$$$$$$$$$$$$$$$$$$$$$$$$


if __name__ == "__main__":
    """Run the Panelini application."""
    app = Panelini(title="Welcome to Panelini! 🖥️", sidebar_enabled=False)
    panel.io.server.serve(
        app.servable(),
        port=2233,
    )
