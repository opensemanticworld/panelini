# {py:mod}`panelini.panels.ai.plot.tools.osw_tools`

```{py:module} panelini.panels.ai.plot.tools.osw_tools
```

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools
:allowtitles:
```

## Module Contents

### Classes

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`GetPageHtmlInput <panelini.panels.ai.plot.tools.osw_tools.GetPageHtmlInput>`
  -
* - {py:obj}`DownloadOslFileInput <panelini.panels.ai.plot.tools.osw_tools.DownloadOslFileInput>`
  -
* - {py:obj}`GetFileHeaderInput <panelini.panels.ai.plot.tools.osw_tools.GetFileHeaderInput>`
  -
* - {py:obj}`SparqlSearchInput <panelini.panels.ai.plot.tools.osw_tools.SparqlSearchInput>`
  -
* - {py:obj}`FindOutEverythingAboutInput <panelini.panels.ai.plot.tools.osw_tools.FindOutEverythingAboutInput>`
  -
* - {py:obj}`GetTopicTaxonomyInput <panelini.panels.ai.plot.tools.osw_tools.GetTopicTaxonomyInput>`
  -
* - {py:obj}`GetInstancesInput <panelini.panels.ai.plot.tools.osw_tools.GetInstancesInput>`
  -
* - {py:obj}`GetWebsiteHtmlInput <panelini.panels.ai.plot.tools.osw_tools.GetWebsiteHtmlInput>`
  -
* - {py:obj}`GetPageHtmlTool <panelini.panels.ai.plot.tools.osw_tools.GetPageHtmlTool>`
  -
* - {py:obj}`DownloadOslFileTool <panelini.panels.ai.plot.tools.osw_tools.DownloadOslFileTool>`
  -
* - {py:obj}`GetFileHeaderTool <panelini.panels.ai.plot.tools.osw_tools.GetFileHeaderTool>`
  -
* - {py:obj}`SparqlSearchTool <panelini.panels.ai.plot.tools.osw_tools.SparqlSearchTool>`
  -
* - {py:obj}`FindOutEverythingAboutTool <panelini.panels.ai.plot.tools.osw_tools.FindOutEverythingAboutTool>`
  -
* - {py:obj}`GetTopicTaxonomyTool <panelini.panels.ai.plot.tools.osw_tools.GetTopicTaxonomyTool>`
  -
* - {py:obj}`GetInstancesTool <panelini.panels.ai.plot.tools.osw_tools.GetInstancesTool>`
  -
* - {py:obj}`GetWebsiteHtmlTool <panelini.panels.ai.plot.tools.osw_tools.GetWebsiteHtmlTool>`
  -
````

### Functions

````{list-table}
:class: autosummary longtable
:align: left

* - {py:obj}`make_osw_tools <panelini.panels.ai.plot.tools.osw_tools.make_osw_tools>`
  - ```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.make_osw_tools
    :summary:
    ```
````

### API

`````{py:class} GetPageHtmlInput(/, **data: typing.Any)
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetPageHtmlInput

Bases: {py:obj}`pydantic.BaseModel`

````{py:attribute} fullpagetitle
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetPageHtmlInput.fullpagetitle
:type: str
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetPageHtmlInput.fullpagetitle
```

````

`````

`````{py:class} DownloadOslFileInput(/, **data: typing.Any)
:canonical: panelini.panels.ai.plot.tools.osw_tools.DownloadOslFileInput

Bases: {py:obj}`pydantic.BaseModel`

````{py:attribute} osw_id
:canonical: panelini.panels.ai.plot.tools.osw_tools.DownloadOslFileInput.osw_id
:type: str
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.DownloadOslFileInput.osw_id
```

````

`````

`````{py:class} GetFileHeaderInput(/, **data: typing.Any)
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetFileHeaderInput

Bases: {py:obj}`pydantic.BaseModel`

````{py:attribute} file_path
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetFileHeaderInput.file_path
:type: str
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetFileHeaderInput.file_path
```

````

````{py:attribute} n_lines
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetFileHeaderInput.n_lines
:type: int
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetFileHeaderInput.n_lines
```

````

`````

`````{py:class} SparqlSearchInput(/, **data: typing.Any)
:canonical: panelini.panels.ai.plot.tools.osw_tools.SparqlSearchInput

Bases: {py:obj}`pydantic.BaseModel`

````{py:attribute} search_string
:canonical: panelini.panels.ai.plot.tools.osw_tools.SparqlSearchInput.search_string
:type: str
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.SparqlSearchInput.search_string
```

````

`````

`````{py:class} FindOutEverythingAboutInput(/, **data: typing.Any)
:canonical: panelini.panels.ai.plot.tools.osw_tools.FindOutEverythingAboutInput

Bases: {py:obj}`pydantic.BaseModel`

````{py:attribute} osw_id
:canonical: panelini.panels.ai.plot.tools.osw_tools.FindOutEverythingAboutInput.osw_id
:type: str
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.FindOutEverythingAboutInput.osw_id
```

````

````{py:attribute} depth
:canonical: panelini.panels.ai.plot.tools.osw_tools.FindOutEverythingAboutInput.depth
:type: int
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.FindOutEverythingAboutInput.depth
```

````

`````

`````{py:class} GetTopicTaxonomyInput(/, **data: typing.Any)
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetTopicTaxonomyInput

Bases: {py:obj}`pydantic.BaseModel`

````{py:attribute} osw_id
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetTopicTaxonomyInput.osw_id
:type: str
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetTopicTaxonomyInput.osw_id
```

````

````{py:attribute} parent_depth
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetTopicTaxonomyInput.parent_depth
:type: int
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetTopicTaxonomyInput.parent_depth
```

````

````{py:attribute} child_depth
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetTopicTaxonomyInput.child_depth
:type: int
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetTopicTaxonomyInput.child_depth
```

````

`````

`````{py:class} GetInstancesInput(/, **data: typing.Any)
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetInstancesInput

Bases: {py:obj}`pydantic.BaseModel`

````{py:attribute} osw_id
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetInstancesInput.osw_id
:type: str
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetInstancesInput.osw_id
```

````

````{py:attribute} max_number
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetInstancesInput.max_number
:type: int
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetInstancesInput.max_number
```

````

`````

`````{py:class} GetWebsiteHtmlInput(/, **data: typing.Any)
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetWebsiteHtmlInput

Bases: {py:obj}`pydantic.BaseModel`

````{py:attribute} url
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetWebsiteHtmlInput.url
:type: str
:value: >
   'Field(...)'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetWebsiteHtmlInput.url
```

````

`````

`````{py:class} GetPageHtmlTool(**kwargs: typing.Any)
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetPageHtmlTool

Bases: {py:obj}`langchain_core.tools.BaseTool`

````{py:attribute} name
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetPageHtmlTool.name
:type: str
:value: >
   'get_page_html'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetPageHtmlTool.name
```

````

````{py:attribute} description
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetPageHtmlTool.description
:type: str
:value: >
   'Get the HTML content of a wiki page (main slot) from an OSW instance.'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetPageHtmlTool.description
```

````

````{py:attribute} args_schema
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetPageHtmlTool.args_schema
:type: type[pydantic.BaseModel]
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetPageHtmlTool.args_schema
```

````

`````

`````{py:class} DownloadOslFileTool(**kwargs: typing.Any)
:canonical: panelini.panels.ai.plot.tools.osw_tools.DownloadOslFileTool

Bases: {py:obj}`langchain_core.tools.BaseTool`

````{py:attribute} name
:canonical: panelini.panels.ai.plot.tools.osw_tools.DownloadOslFileTool.name
:type: str
:value: >
   'download_osl_file'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.DownloadOslFileTool.name
```

````

````{py:attribute} description
:canonical: panelini.panels.ai.plot.tools.osw_tools.DownloadOslFileTool.description
:type: str
:value: >
   'Download a file from an OSW instance to a local path and return that path.'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.DownloadOslFileTool.description
```

````

````{py:attribute} args_schema
:canonical: panelini.panels.ai.plot.tools.osw_tools.DownloadOslFileTool.args_schema
:type: type[pydantic.BaseModel]
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.DownloadOslFileTool.args_schema
```

````

`````

`````{py:class} GetFileHeaderTool(**kwargs: typing.Any)
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetFileHeaderTool

Bases: {py:obj}`langchain_core.tools.BaseTool`

````{py:attribute} name
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetFileHeaderTool.name
:type: str
:value: >
   'get_file_header'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetFileHeaderTool.name
```

````

````{py:attribute} description
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetFileHeaderTool.description
:type: str
:value: >
   'Read the first N lines of a local text file and return them as one string.'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetFileHeaderTool.description
```

````

````{py:attribute} args_schema
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetFileHeaderTool.args_schema
:type: type[pydantic.BaseModel]
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetFileHeaderTool.args_schema
```

````

`````

`````{py:class} SparqlSearchTool(**kwargs: typing.Any)
:canonical: panelini.panels.ai.plot.tools.osw_tools.SparqlSearchTool

Bases: {py:obj}`langchain_core.tools.BaseTool`

````{py:attribute} name
:canonical: panelini.panels.ai.plot.tools.osw_tools.SparqlSearchTool.name
:type: str
:value: >
   'sparql_search'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.SparqlSearchTool.name
```

````

````{py:attribute} description
:canonical: panelini.panels.ai.plot.tools.osw_tools.SparqlSearchTool.description
:type: str
:value: >
   'Search for a string in the OSW via SPARQL (label match on normalized labels).'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.SparqlSearchTool.description
```

````

````{py:attribute} args_schema
:canonical: panelini.panels.ai.plot.tools.osw_tools.SparqlSearchTool.args_schema
:type: type[pydantic.BaseModel]
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.SparqlSearchTool.args_schema
```

````

`````

`````{py:class} FindOutEverythingAboutTool(**kwargs: typing.Any)
:canonical: panelini.panels.ai.plot.tools.osw_tools.FindOutEverythingAboutTool

Bases: {py:obj}`langchain_core.tools.BaseTool`

````{py:attribute} name
:canonical: panelini.panels.ai.plot.tools.osw_tools.FindOutEverythingAboutTool.name
:type: str
:value: >
   'find_out_everything_about'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.FindOutEverythingAboutTool.name
```

````

````{py:attribute} description
:canonical: panelini.panels.ai.plot.tools.osw_tools.FindOutEverythingAboutTool.description
:type: str
:value: >
   'Get all SPARQL triples (star shape) for an OSW element — all its properties and relations.'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.FindOutEverythingAboutTool.description
```

````

````{py:attribute} args_schema
:canonical: panelini.panels.ai.plot.tools.osw_tools.FindOutEverythingAboutTool.args_schema
:type: type[pydantic.BaseModel]
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.FindOutEverythingAboutTool.args_schema
```

````

`````

`````{py:class} GetTopicTaxonomyTool(**kwargs: typing.Any)
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetTopicTaxonomyTool

Bases: {py:obj}`langchain_core.tools.BaseTool`

````{py:attribute} name
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetTopicTaxonomyTool.name
:type: str
:value: >
   'get_topic_taxonomy'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetTopicTaxonomyTool.name
```

````

````{py:attribute} description
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetTopicTaxonomyTool.description
:type: str
:value: >
   'Get parent and child classes of a given OSW class via SubClassOf traversal.'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetTopicTaxonomyTool.description
```

````

````{py:attribute} args_schema
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetTopicTaxonomyTool.args_schema
:type: type[pydantic.BaseModel]
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetTopicTaxonomyTool.args_schema
```

````

`````

`````{py:class} GetInstancesTool(**kwargs: typing.Any)
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetInstancesTool

Bases: {py:obj}`langchain_core.tools.BaseTool`

````{py:attribute} name
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetInstancesTool.name
:type: str
:value: >
   'get_instances'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetInstancesTool.name
```

````

````{py:attribute} description
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetInstancesTool.description
:type: str
:value: >
   'Get all instances (examples) of a given OSW class.'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetInstancesTool.description
```

````

````{py:attribute} args_schema
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetInstancesTool.args_schema
:type: type[pydantic.BaseModel]
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetInstancesTool.args_schema
```

````

`````

`````{py:class} GetWebsiteHtmlTool(**kwargs: typing.Any)
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetWebsiteHtmlTool

Bases: {py:obj}`langchain_core.tools.BaseTool`

````{py:attribute} name
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetWebsiteHtmlTool.name
:type: str
:value: >
   'get_website_html'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetWebsiteHtmlTool.name
```

````

````{py:attribute} description
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetWebsiteHtmlTool.description
:type: str
:value: >
   'Fetch the HTML content of an arbitrary URL.'

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetWebsiteHtmlTool.description
```

````

````{py:attribute} args_schema
:canonical: panelini.panels.ai.plot.tools.osw_tools.GetWebsiteHtmlTool.args_schema
:type: type[pydantic.BaseModel]
:value: >
   None

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.GetWebsiteHtmlTool.args_schema
```

````

`````

````{py:function} make_osw_tools() -> list[langchain_core.tools.BaseTool]
:canonical: panelini.panels.ai.plot.tools.osw_tools.make_osw_tools

```{autodoc2-docstring} panelini.panels.ai.plot.tools.osw_tools.make_osw_tools
```
````
