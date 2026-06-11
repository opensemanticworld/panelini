import panel as pn
from pydantic import BaseModel
from pydantic_panel import PydanticModelEditor


class SomeModel(BaseModel):
    name: str
    value: float


model = SomeModel(name="meaning", value=42)


pn.extension()

# widget = pn.panel(model)
widget = PydanticModelEditor(value=model, bidirectional=True)

layout = pn.Column(widget, widget.json)

pn.serve(layout, threaded=True)
