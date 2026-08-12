"""Rotating circles animation with sliders for velocity and radius."""

import time

import numpy as np
import panel as pn

from panelini.panels.visnetwork import VisNetwork

pn.extension()

# Timestamp for last update (used to compute time delta per frame)
last_t = time.time()

# Current base angle of the rotating circle (in radians)
phi_0 = 0

# Base radius for the circle on which the fixed nodes lie
r = 100

# Precomputed angular offsets for the 5 nodes (equally spaced on the circle)
phi_1 = 2 * np.pi / 5
phi_2 = 2 * 2 * np.pi / 5
phi_3 = 3 * 2 * np.pi / 5
phi_4 = 4 * 2 * np.pi / 5

# Initial node list:
#   1-5: fixed nodes arranged on a circle
#   6-10: free nodes (no fixed x/y; layout is computed by vis.js)
nodes = [
    {"id": 1, "label": "Node 1", "color": "#e04141", "x": r * np.cos(phi_0), "y": r * np.sin(phi_0), "fixed": True},
    {
        "id": 2,
        "label": "Node 2",
        "color": "#e09c41",
        "x": r * np.cos(phi_0 + phi_1),
        "y": r * np.sin(phi_0 + phi_1),
        "fixed": True,
    },
    {
        "id": 3,
        "label": "Node 3",
        "color": "#e0df41",
        "x": r * np.cos(phi_0 + phi_2),
        "y": r * np.sin(phi_0 + phi_2),
        "fixed": True,
    },
    {
        "id": 4,
        "label": "Node 4",
        "color": "#7be041",
        "x": r * np.cos(phi_0 + phi_3),
        "y": r * np.sin(phi_0 + phi_3),
        "fixed": True,
    },
    {
        "id": 5,
        "label": "Node 5",
        "color": "#41e0c9",
        "x": r * np.cos(phi_0 + phi_4),
        "y": r * np.sin(phi_0 + phi_4),
        "fixed": True,
    },
    {"id": 6, "label": "Node 6", "color": "#e04141"},
    {"id": 7, "label": "Node 7", "color": "#e09c41"},
    {"id": 8, "label": "Node 8", "color": "#e0df41"},
    {"id": 9, "label": "Node 9", "color": "#7be041"},
    {"id": 10, "label": "Node 10", "color": "#41e0c9"},
]

# Edges:
#   1-5: ring of 5 nodes
#   each ring node is connected to exactly one free node (6-10)
edges = [
    {"from": 1, "to": 2},
    {"from": 2, "to": 3},
    {"from": 3, "to": 4},
    {"from": 4, "to": 5},
    {"from": 5, "to": 1},
    {"from": 1, "to": 6},
    {"from": 2, "to": 7},
    {"from": 3, "to": 8},
    {"from": 4, "to": 9},
    {"from": 5, "to": 10},
]

# Build the app at module level so it can be served, tested, and converted to a
# standalone browser app. The rotation runs on a periodic callback rather than a
# blocking loop, so it animates under `panel serve` and in the browser (Pyodide)
# alike; a `while True` loop would freeze the single-threaded WASM runtime.
visnetwork_panel = VisNetwork(nodes=nodes, edges=edges, sizing_mode="stretch_both")

vel_slider = pn.widgets.FloatSlider(name="Velocity", start=-20, end=20, value=1)
radius_slider = pn.widgets.FloatSlider(name="Radius", start=0, end=500, value=r)

app = pn.Column(visnetwork_panel, vel_slider, radius_slider)

_anim = {"phi": phi_0, "t": time.time()}
_offsets = (0.0, phi_1, phi_2, phi_3, phi_4)


def rotate() -> None:
    """Advance the ring by one frame and push the new positions to the graph."""
    now = time.time()
    _anim["phi"] += vel_slider.value * (now - _anim["t"])
    _anim["t"] = now
    radius = radius_slider.value
    ring = [
        {
            **node,
            "x": radius * np.cos(_anim["phi"] + offset),
            "y": radius * np.sin(_anim["phi"] + offset),
        }
        for node, offset in zip(nodes[:5], _offsets, strict=True)
    ]
    visnetwork_panel.nodes = ring + nodes[5:]


def _start_rotation() -> None:
    pn.state.add_periodic_callback(rotate, period=50)


pn.state.onload(_start_rotation)

if __name__ == "__main__":
    pn.serve(app)
