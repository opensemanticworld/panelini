from pathlib import Path
from typing import ClassVar
import panel as pn
import param
from panel.custom import AnyWidgetComponent

pn.extension()

bundled_assets_dir = Path(__file__).parent / "vue" / "dist"


class Filter(AnyWidgetComponent):
    value = param.Dict(default={})
    schema = param.Dict(default={})

    _esm: ClassVar = bundled_assets_dir / "filter_vue.mjs"

    def build_schema_from_data(
        self, predicates_data: list, entities_data: list
    ) -> None:
        """
        Builds the JSON-Editor schema tree internally.
        Expects lists of dicts:
          predicates_data: [{"group": x, "value": y, "label": z}, ...]
          entities_data: [{"category": w, "group": x, "value": y, "label": z}, ...]
        """

        def build_tree(items_list, id_prefix=""):
            groups = {}
            for item in items_list:
                g = item.get("group", "other")
                if g not in groups:
                    groups[g] = []
                if not any(i.get("value") == item.get("value") for i in groups[g]):
                    groups[g].append(item)

            tree = []
            for g, items in sorted(groups.items(), key=lambda kv: str(kv[0]).lower()):
                children = [
                    {
                        "id": f"{id_prefix}{g}_{i['value']}",
                        "label": i.get("label", i.get("value")),
                        "value": i["value"],
                    }
                    for i in sorted(
                        items, key=lambda x: str(x.get("label", "")).lower()
                    )
                ]
                tree.append(
                    {"id": f"{id_prefix}group_{g}", "label": g, "children": children}
                )
            return tree

        pred_tree = build_tree(predicates_data, id_prefix="pred_")

        ent_categories = {}
        for item in entities_data:
            cat = item.get("category", "Other")
            if cat not in ent_categories:
                ent_categories[cat] = []
            ent_categories[cat].append(item)

        ent_tree = []
        for cat, items in sorted(
            ent_categories.items(), key=lambda kv: str(kv[0]).lower()
        ):
            ent_tree.append(
                {
                    "id": f"cat_{cat}",
                    "label": cat,
                    "children": build_tree(items, id_prefix=f"{cat}_"),
                }
            )

        self.schema = {"predicates": pred_tree, "entities": ent_tree}
