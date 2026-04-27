"""Panel-bound BaseTool subclasses that drive a ``PlotPanel``.

The three tools here delegate directly to panel methods. OSW-bound tools
have moved to ``panelini.panels.eln_connectors.osw.tools`` and are no
longer bundled by ``make_plot_tools``.
"""

from __future__ import annotations

from langchain_core.tools import BaseTool
from pydantic import BaseModel, ConfigDict, Field

from ..panel import PlotPanel

_PANEL_MODEL_CONFIG = ConfigDict(arbitrary_types_allowed=True)


# --------------------------------------------------------------------------
# Input schemas (pydantic v2)
# --------------------------------------------------------------------------


class PlotByCodeInput(BaseModel):
    code: str = Field(
        ...,
        description=(
            'The code to run. The code must save a figure as .png to a file at "/sandbox/output.png". '
            "The code must be utf-8 encoded and able to run in a sandboxed environment."
        ),
    )
    file_paths: list[str] | None = Field(
        default=None,
        description=(
            "List of file paths to copy into the sandbox before running the code. "
            "Each file will be available at '/sandbox/<FILENAME>' where <FILENAME> is the basename "
            "of the path. Accepts full host paths or just filenames (resolved from the downloads "
            "directory)."
        ),
    )
    libraries: list[str] | None = Field(
        default=None,
        description=(
            "List of pip packages to install in the sandbox before running the code. "
            "Defaults to numpy, pandas, matplotlib, scipy when not specified. Add any additional "
            "packages the code needs (e.g. 'micress-micpy', 'seaborn', 'scikit-learn'). "
            "Note: the pip package name may differ from the Python import name."
        ),
    )


class RunCodeInput(BaseModel):
    code: str = Field(..., description="The code to run. Whatever is printed will be returned.")
    lang: str = Field(default="python", description="The language of the code to run.")
    file_paths: list[str] | None = Field(
        default=None,
        description="List of file paths to copy into the sandbox before running the code.",
    )
    libraries: list[str] | None = Field(
        default=None,
        description="List of pip packages to install in the sandbox. Defaults to numpy/pandas/matplotlib/scipy.",
    )


class LoadCsvInput(BaseModel):
    file_path: str = Field(..., description="The path to the file to read to a pandas dataframe.")
    delimiter: str = Field(default="\t", description="The delimiter of the csv file.")
    skip_rows: int = Field(default=0, description="The number of lines to skip at the beginning of the file.")


# --------------------------------------------------------------------------
# Delegation tools (no OSW)
# --------------------------------------------------------------------------


class PlotByCodeTool(BaseTool):
    model_config = _PANEL_MODEL_CONFIG
    name: str = "plot_by_code"
    description: str = (
        "Run python code in a sandboxed Docker container to produce a matplotlib plot. "
        "The code MUST save the figure to '/sandbox/output.png'. The plot is rendered in "
        "the plot panel next to the chat. Use this whenever the user asks for a plot."
    )
    args_schema: type[BaseModel] = PlotByCodeInput
    panel: PlotPanel

    def _run(
        self,
        code: str,
        file_paths: list[str] | None = None,
        libraries: list[str] | None = None,
    ) -> str:
        return self.panel.plot_by_code(code=code, file_paths=file_paths, libraries=libraries)

    async def _arun(
        self,
        code: str,
        file_paths: list[str] | None = None,
        libraries: list[str] | None = None,
    ) -> str:
        return self._run(code=code, file_paths=file_paths, libraries=libraries)


class RunCodeTool(BaseTool):
    model_config = _PANEL_MODEL_CONFIG
    name: str = "run_code"
    description: str = (
        "Run code in a sandboxed Docker container and return whatever it prints to stdout. "
        "Typically used to compute or summarize text-based results from code."
    )
    args_schema: type[BaseModel] = RunCodeInput
    panel: PlotPanel

    def _run(
        self,
        code: str,
        lang: str = "python",
        file_paths: list[str] | None = None,
        libraries: list[str] | None = None,
    ) -> str:
        return self.panel.run_code(code=code, lang=lang, file_paths=file_paths, libraries=libraries)

    async def _arun(
        self,
        code: str,
        lang: str = "python",
        file_paths: list[str] | None = None,
        libraries: list[str] | None = None,
    ) -> str:
        return self._run(code=code, lang=lang, file_paths=file_paths, libraries=libraries)


class LoadCsvTool(BaseTool):
    model_config = _PANEL_MODEL_CONFIG
    name: str = "load_data_from_csv"
    description: str = "Load a CSV into a pandas dataframe and return the column names."
    args_schema: type[BaseModel] = LoadCsvInput
    panel: PlotPanel

    def _run(self, file_path: str, delimiter: str = "\t", skip_rows: int = 0) -> list[str]:
        return self.panel.load_data_from_csv(file_path=file_path, delimiter=delimiter, skip_rows=skip_rows)

    async def _arun(self, file_path: str, delimiter: str = "\t", skip_rows: int = 0) -> list[str]:
        return self._run(file_path=file_path, delimiter=delimiter, skip_rows=skip_rows)


# --------------------------------------------------------------------------
# Factory
# --------------------------------------------------------------------------


def make_plot_tools(panel: PlotPanel) -> list[BaseTool]:
    """Return panel-bound tools, ready to be passed to ``AiChat(tools=...)``.

    Returns the three delegation tools (``plot_by_code``, ``run_code``,
    ``load_data_from_csv``). OSW-bound tools are now provided separately
    by ``panelini.panels.eln_connectors.osw``.
    """
    return [
        PlotByCodeTool(panel=panel),
        RunCodeTool(panel=panel),
        LoadCsvTool(panel=panel),
    ]
