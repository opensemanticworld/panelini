"""OSW-bound BaseTool subclasses that upload a PlotPanel's current plot.

These "bridge tools" span two domains: they need an
:class:`~..connection.OswConnection` for the OSW instance and a
``PlotPanel`` reference for the current plot state. Both are injected at
construction time.

This module imports from the ``osw`` package at top level, so it is only
importable when ``osw`` is installed (via ``panelini[ai-osw]``).
"""

from __future__ import annotations

import io
import uuid
from datetime import datetime
from typing import TYPE_CHECKING, Any

from langchain_core.tools import BaseTool
from pydantic import BaseModel, ConfigDict, Field

from ..connection import OswConnection
from ..utils.osw_env import build_osw_express

if TYPE_CHECKING:
    from panelini.panels.ai.plot.panel import PlotPanel

    WikiFileController: Any = Any
    OSW: Any = Any
    model: Any = Any
    get_full_title: Any = Any
else:
    from osw.controller.file.wiki import WikiFileController
    from osw.core import OSW, model
    from osw.utils.wiki import get_full_title

_PANEL_MODEL_CONFIG = ConfigDict(arbitrary_types_allowed=True)


class AttachPlotInput(BaseModel):
    osw_id: str = Field(
        ...,
        description=(
            "Fullpagetitle of the page to attach the plot to. It has to be formatted like "
            "<NAMESPACE>:<OSW_ID> for example 'Item:OSW0b80ad413e954c87ac48bcc6ed784276' or "
            "'Category:OSW0b80ad413e954c87ac48bcc6ed784276'."
        ),
    )
    format: str = Field(default="png", description="The format to save the plot in.")


class DocumentEvaluationInput(BaseModel):
    uuid: str | None = Field(
        default=None,
        description="The uuid of the evaluation process. A new uuid is generated if None.",
    )
    output_osw_id: str | None = Field(
        default=None,
        description="The OSW ID of the output of the evaluation process, e.g. the OSW-Object plot.",
    )


def _load_plot_bytes(panel: PlotPanel) -> io.BytesIO:
    path = panel.output_file_path
    if path is None or not path.exists():
        raise ValueError("No image available to attach — run plot_by_code first.")  # noqa: TRY003
    return io.BytesIO(path.read_bytes())


def _build_wiki_file(osw_obj: Any, plot_uuid: uuid.UUID) -> Any:
    return WikiFileController(
        uuid=str(plot_uuid),
        osw=osw_obj,
        title="OSW" + str(plot_uuid).replace("-", "") + ".png",
        label=[model.Label(text=f"Plot from Chatbot {datetime.now().strftime('%Y-%m-%d_%H-%M')}")],
    )


def _get_osw(connection: OswConnection | None) -> Any:
    if connection is not None:
        return connection.build_osw_express()
    return build_osw_express()


class AttachPlotToOswTool(BaseTool):
    model_config = _PANEL_MODEL_CONFIG
    name: str = "attach_current_plot_to_osw_page"
    description: str = (
        "Upload the currently displayed plot to an OSW instance as a WikiFile and attach it to the "
        "given OSW page. Requires OSW_DOMAIN env var and the 'osw' package."
    )
    args_schema: type[BaseModel] = AttachPlotInput
    panel: Any  # PlotPanel — Any to avoid import at class-body time
    connection: OswConnection | None = None

    def _run(self, osw_id: str, format: str = "png") -> str:  # noqa: A002
        try:
            osw_obj = _get_osw(self.connection)
            entity = osw_obj.load_entity(osw_id)
            if entity is None:
                return f"error loading entity with title: {osw_id} — was it formatted correctly?"
            bytesio = _load_plot_bytes(self.panel)
            plot_uuid = uuid.uuid4()
            wf = _build_wiki_file(osw_obj, plot_uuid)
            bytesio.name = wf.title
            wf.put(bytesio, overwrite=True)
            if not hasattr(entity, "attachments") or entity.attachments is None:
                entity.attachments = []
            entity.attachments.append(get_full_title(wf))
            osw_obj.store_entity(OSW.StoreEntityParam(entities=[entity], overwrite=True))
        except Exception as e:
            return f"error attaching plot to OSW: {e}"
        else:
            return f"plot uploaded to OSW (uuid={plot_uuid}) and attached to {osw_id}"

    async def _arun(self, osw_id: str, format: str = "png") -> str:  # noqa: A002
        return self._run(osw_id=osw_id, format=format)


class DocumentEvaluationTool(BaseTool):
    model_config = _PANEL_MODEL_CONFIG
    name: str = "document_current_evaluation"
    description: str = (
        "Document the current python-code evaluation as an OSW PythonEvaluationProcess object, "
        "uploading the plot as a linked file. Requires OSW_DOMAIN env var and the 'osw' package."
    )
    args_schema: type[BaseModel] = DocumentEvaluationInput
    panel: Any  # PlotPanel
    connection: OswConnection | None = None

    def _run(self, uuid: str | None = None, output_osw_id: str | None = None) -> str:
        try:
            osw_obj = _get_osw(self.connection)
            bytesio = _load_plot_bytes(self.panel)
            plot_uuid = __import__("uuid").uuid4()
            wf = _build_wiki_file(osw_obj, plot_uuid)
            bytesio.name = wf.title
            wf.put(bytesio, overwrite=True)
            inputs = [self.panel.current_input_osw_id] if self.panel.current_input_osw_id else None
            doc = model.PythonEvaluationProcess(
                label=[
                    model.Label(
                        text=f"Python Evaluation from Chatbot {datetime.now().strftime('%Y-%m-%d_%H-%M')}",
                        lang="en",
                    )
                ],
                input=inputs,
                python_evaluation_code=self.panel.current_python_code,
                uuid=uuid,
                output=[get_full_title(wf)],
                image=get_full_title(wf),
            )
            osw_obj.store_entity(OSW.StoreEntityParam(entities=[doc], overwrite=True))
        except Exception as e:
            return f"error documenting evaluation: {e}"
        else:
            return f"documentation object stored (plot uuid={plot_uuid})"

    async def _arun(self, uuid: str | None = None, output_osw_id: str | None = None) -> str:
        return self._run(uuid=uuid, output_osw_id=output_osw_id)


def make_osw_plot_tools(
    connection: OswConnection,
    panel: Any,
) -> list[BaseTool]:
    """Return OSW plot bridge tools bound to a connection and PlotPanel."""
    return [
        AttachPlotToOswTool(panel=panel, connection=connection),
        DocumentEvaluationTool(panel=panel, connection=connection),
    ]
