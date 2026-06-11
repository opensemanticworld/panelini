import panel as pn
from pydantic import BaseModel, Field
from pydantic_panel import PydanticModelEditor


class Component(BaseModel):
    material: str = "to_be_modeled_material"
    # Todo: Add characteristics example test
    weight_g: float = Field(0.0, description="Weight in grams")


class MixingProcess(BaseModel):
    components: list[Component] = []


class CastingProcess(BaseModel):
    casting_duration_s: float = Field(0.0, description="Duration in seconds")


class EndOfLineTestingProcess(BaseModel):
    hardness_vickers: float = 0.0
    thickness_m: float = 0.0
    weight_s: float = 0.0


class DesSensorManufacturing(BaseModel):
    mixing_conductive_silicone: MixingProcess = MixingProcess()
    mixing_isolative_silicone: MixingProcess = MixingProcess()
    casting: CastingProcess = CastingProcess()
    endofline_testing: EndOfLineTestingProcess = EndOfLineTestingProcess()


model = DesSensorManufacturing()


pn.extension()

# widget = pn.panel(model)
widget1 = PydanticModelEditor(value=model.mixing_conductive_silicone, bidirectional=True)
widget2 = PydanticModelEditor(value=model.mixing_isolative_silicone, bidirectional=True)
widget3 = PydanticModelEditor(value=model.casting, bidirectional=True)
widget4 = PydanticModelEditor(value=model.endofline_testing, bidirectional=True)

layout_mixing = pn.Column(widget1, widget2)
layout_casting = pn.Column(widget3)
layout_endofline = pn.Column(widget4)


pn.serve(layout_mixing, threaded=True, port=4001)
pn.serve(layout_casting, threaded=True, port=4002)
pn.serve(layout_endofline, threaded=True, port=4003)
