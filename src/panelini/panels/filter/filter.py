from pathlib import Path
from typing import ClassVar
import panel as pn
import param
from panel.custom import AnyWidgetComponent

pn.extension()

bundled_assets_dir = Path(__file__).parent / "vue" / "dist"


class Filter(AnyWidgetComponent):
    value = param.Dict(default={})

    _esm: ClassVar = bundled_assets_dir / "filter_vue.mjs"
