"""Team and project structure with colored groups."""

import panel as pn

from panelini.panels.visnetwork import VisNetwork

pn.extension()

# Project nodes (fixed positions, no physics)
project_nodes = [
    {
        "id": "P1",
        "label": "Project Atlas",
        "group": "project",
        "shape": "box",
        "title": "Backend-Heavy Project",
        "x": -200,
        "y": -50,
        "fixed": True,
        "physics": False,
    },
    {
        "id": "P2",
        "label": "Project Nova",
        "group": "project",
        "shape": "box",
        "title": "Frontend-Heavy Project",
        "x": 0,
        "y": -50,
        "fixed": True,
        "physics": False,
    },
    {
        "id": "P3",
        "label": "Project Orion",
        "group": "project",
        "shape": "box",
        "title": "Data & Analytics",
        "x": 200,
        "y": -50,
        "fixed": True,
        "physics": False,
    },
    {
        "id": "P4",
        "label": "Project Vega",
        "group": "project",
        "shape": "box",
        "title": "Mixed Project",
        "x": 0,
        "y": 150,
        "fixed": True,
        "physics": False,
    },
]

# People nodes (groups by role/team)
people_nodes = [
    # Backend Team
    {"id": "B1", "label": "Alice", "group": "backend", "title": "Backend Lead"},
    {"id": "B2", "label": "Bob", "group": "backend", "title": "Backend Dev"},
    {"id": "B3", "label": "Carl", "group": "backend", "title": "Backend Dev"},
    # Frontend Team
    {"id": "F1", "label": "Diana", "group": "frontend", "title": "Frontend Lead"},
    {"id": "F2", "label": "Eve", "group": "frontend", "title": "Frontend Dev"},
    {"id": "F3", "label": "Frank", "group": "frontend", "title": "Frontend Dev"},
    # Data Team
    {"id": "D1", "label": "Grace", "group": "data", "title": "Data Scientist"},
    {"id": "D2", "label": "Heidi", "group": "data", "title": "Data Engineer"},
    # Design Team
    {"id": "DS1", "label": "Ivan", "group": "design", "title": "UX Designer"},
    {"id": "DS2", "label": "Judy", "group": "design", "title": "UI Designer"},
]

nodes = project_nodes + people_nodes

# Edges: People -> Projects
edges = [
    # Project Atlas (Backend-heavy)
    {"from": "B1", "to": "P1", "label": "Lead", "arrows": "to"},
    {"from": "B2", "to": "P1", "label": "Dev", "arrows": "to"},
    {"from": "F2", "to": "P1", "label": "Support", "arrows": "to"},
    {"from": "D1", "to": "P1", "label": "Analytics", "arrows": "to"},
    # Project Nova (Frontend-heavy)
    {"from": "F1", "to": "P2", "label": "Lead", "arrows": "to"},
    {"from": "F3", "to": "P2", "label": "Dev", "arrows": "to"},
    {"from": "DS1", "to": "P2", "label": "UX", "arrows": "to"},
    # Project Orion (Data/Analytics)
    {"from": "D2", "to": "P3", "label": "Engineering", "arrows": "to"},
    {"from": "B3", "to": "P3", "label": "API", "arrows": "to"},
    {"from": "DS2", "to": "P3", "label": "UI", "arrows": "to"},
    # Project Vega (mixed)
    {"from": "B2", "to": "P4", "label": "Backend", "arrows": "to"},
    {"from": "F2", "to": "P4", "label": "Frontend", "arrows": "to"},
    {"from": "D1", "to": "P4", "label": "Data", "arrows": "to"},
    {"from": "DS1", "to": "P4", "label": "UX", "arrows": "to"},
]

# vis.js options for group colors and physics
options = {
    "groups": {
        "project": {"color": {"background": "#cccccc", "border": "#666666"}},
        "backend": {"color": {"background": "#1f77b4", "border": "#1f77b4"}},
        "frontend": {"color": {"background": "#2ca02c", "border": "#2ca02c"}},
        "data": {"color": {"background": "#9467bd", "border": "#9467bd"}},
        "design": {"color": {"background": "#ff7f0e", "border": "#ff7f0e"}},
    },
    "physics": {
        "enabled": True,
        "stabilization": {"enabled": True, "iterations": 200},
    },
    "interaction": {"hover": True},
}


if __name__ == "__main__":
    visnetwork_panel = VisNetwork(
        nodes=nodes,
        edges=edges,
        options=options,
    )
    pn.serve(visnetwork_panel, threaded=True)
