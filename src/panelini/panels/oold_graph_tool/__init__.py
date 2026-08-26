"""OO-LD Graph Tool — interactive graph visualization for OO-LD entities.

Re-exports the public API so callers can use either::

    from panelini.panels.oold_graph_tool import OOLDGraphDetailTool
    from panelini.panels.oold_graph_tool.oold_graph_tool import OOLDGraphDetailTool
"""

from panelini.panels.oold_graph_tool.entity_adapter import (
    EntityAdapter,
    adapt_entity,
    adapt_type,
    is_schema_dict,
    register_pydantic_hierarchy,
)
from panelini.panels.oold_graph_tool.oold_graph_tool import (
    Entity,
    ExpansionStep,
    MultiExpansionPolicy,
    OOLDGraphConfig,
    OOLDGraphDetailTool,
    SingleNodeExpansionPolicy,
)
from panelini.panels.oold_graph_tool.oold_schema import (
    MISSING,
    OOLDSchemaIntrospector,
    PropertyInfo,
    build_context_from_schema,
)

__all__ = [
    "MISSING",
    "Entity",
    "EntityAdapter",
    "ExpansionStep",
    "MultiExpansionPolicy",
    "OOLDGraphConfig",
    "OOLDGraphDetailTool",
    "OOLDSchemaIntrospector",
    "PropertyInfo",
    "SingleNodeExpansionPolicy",
    "adapt_entity",
    "adapt_type",
    "build_context_from_schema",
    "is_schema_dict",
    "register_pydantic_hierarchy",
]
