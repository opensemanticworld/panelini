import panel as pn
from pydantic import BaseModel, Field
from pydantic._internal._model_construction import ModelMetaclass

from panelini.panels.jsoneditor import JsonEditor


def _apply_formats(schema: dict, array_tabs: bool, dict_categories: bool) -> dict:
    if not isinstance(schema, dict):
        return schema
    schema = dict(schema)
    node_type = schema.get("type")
    if array_tabs and node_type == "array" and "format" not in schema:
        schema["format"] = "tabs"
    if dict_categories and node_type == "object" and "format" not in schema:
        schema["format"] = "categories"
    for key in ("properties", "$defs"):
        if key in schema:
            schema[key] = {k: _apply_formats(v, array_tabs, dict_categories) for k, v in schema[key].items()}
    for key in ("items", "additionalProperties", "not"):
        if key in schema:
            schema[key] = _apply_formats(schema[key], array_tabs, dict_categories)
    for key in ("anyOf", "allOf", "oneOf"):
        if key in schema:
            schema[key] = [_apply_formats(s, array_tabs, dict_categories) for s in schema[key]]
    return schema


class PydanticEditor(JsonEditor):
    def __init__(
        self,
        pydantic_model: ModelMetaclass,
        value=None,
        format_array_tabs: bool = False,
        format_dict_categories: bool = False,
        **params,
    ):
        self.pydantic_model = pydantic_model
        self.schema = self.pydantic_model.model_json_schema()

        options = params.get("options", {})

        if self.pydantic_model is not None:
            json_schema = self.pydantic_model.model_json_schema()
            if format_array_tabs or format_dict_categories:
                json_schema = _apply_formats(json_schema, format_array_tabs, format_dict_categories)
            options["schema"] = json_schema
        else:
            options["schema"] = {}

        params["options"] = options
        super().__init__(**params)
        if isinstance(value, BaseModel):
            value = value.model_dump()
        self.value = value


if __name__ == "__main__":
    import time
    from typing import Optional

    class ASub(BaseModel):
        a: int = Field(..., description="prop a of sub property ASub")
        b: int = Field(..., description="prop b of sub property ASub")

    class A(BaseModel):
        x: int = Field(..., description="x function_config")
        y: int = Field(..., description="y function_config")
        z: Optional[int] = Field(None, description="z function_config")
        sub: list[ASub] = Field([], description="sub property of A, which is of type ASub")

    a = A(x=1, y=2, z=3, sub=[ASub(a=1, b=2), ASub(a=4, b=3)])

    my_editor = PydanticEditor(A, value=a, format_array_tabs=True, format_dict_categories=False)
    time.sleep(1)
    pn.serve(my_editor, threaded=True)
