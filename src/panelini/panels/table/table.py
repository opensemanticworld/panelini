from pathlib import Path
from typing import ClassVar
import panel as pn
import param
from panel.custom import AnyWidgetComponent

pn.extension()

bundled_assets_dir = Path(__file__).parent / "vue" / "dist"


class Table(AnyWidgetComponent):
    value = param.Dict(default={"headers": [], "data": []})

    _esm: ClassVar = bundled_assets_dir / "table_vue.mjs"
