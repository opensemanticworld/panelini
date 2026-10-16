from pathlib import Path
from typing import ClassVar
import panel as pn
import param
from panel.custom import AnyWidgetComponent

pn.extension()

bundled_assets_dir = Path(__file__).parent / "vue" / "dist"


class Table(AnyWidgetComponent):
    value = param.Dict(default={"headers": [], "data": [], "has_run": False})

    _esm: ClassVar = bundled_assets_dir / "table_vue.mjs"

    def update_from_table(self, table_obj, has_run: bool = True) -> None:
        """Parses a tabular.Table object directly into the internal Vue dictionary format."""
        if table_obj is None or not hasattr(table_obj, "headers"):
            self.value = {"headers": [], "data": [], "has_run": has_run}
            return

        # Deduplicate headers maintaining order
        raw_headers = [str(h) for h in table_obj.headers]
        unique_headers = []
        for h in raw_headers:
            if h not in unique_headers:
                unique_headers.append(h)

        # Map values and cleanly concatenate duplicates (like owl:sameAs)
        data_rows = []
        for row in table_obj.rows:
            record = {}
            for h, val in zip(raw_headers, row):
                str_val = str(val) if val is not None else ""
                if record.get(h):
                    record[h] = f"{record[h]}, {str_val}" if str_val else record[h]
                else:
                    record[h] = str_val
            data_rows.append(record)

        self.value = {"headers": unique_headers, "data": data_rows, "has_run": has_run}
