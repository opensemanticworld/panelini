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

if __name__ == "__main__":
    # Create the VisNetwork panel with initial nodes/edges
    # Use height parameter for fixed height; width will stretch to fill container
    visnetwork_panel = VisNetwork(nodes=nodes, edges=edges, sizing_mode="stretch_both")

    # Slider controlling angular velocity of the rotation
    vel_slider = pn.widgets.FloatSlider(name="Velocity", start=-20, end=20, value=1)

    # Slider controlling the radius of the circle on which the fixed nodes lie
    radius_slider = pn.widgets.FloatSlider(name="Radius", start=0, end=500, value=r)

    # Layout: graph on top, sliders below
    col = pn.Column(visnetwork_panel, vel_slider, radius_slider)

    # Start Panel server in a separate thread so the loop below can run
    pn.serve(col, threaded=True)

    # Animation/update loop
    while True:
        # Advance base angle based on velocity and elapsed time since last frame
        phi_0 += vel_slider.value * (time.time() - last_t)
        last_t = time.time()

        # Read current radius from slider
        r = radius_slider.value

        # Rebuild node list with updated positions for the 5 fixed nodes
        nodes = [
            {
                "id": 1,
                "label": "Node 1",
                "color": "#e04141",
                "x": r * np.cos(phi_0),
                "y": r * np.sin(phi_0),
                "fixed": True,
            },
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
            # Free nodes remain without fixed coordinates
            {"id": 6, "label": "Node 6", "color": "#e04141"},
            {"id": 7, "label": "Node 7", "color": "#e09c41"},
            {"id": 8, "label": "Node 8", "color": "#e0df41"},
            {"id": 9, "label": "Node 9", "color": "#7be041"},
            {"id": 10, "label": "Node 10", "color": "#41e0c9"},
        ]

        # Push updated node positions to the VisNetwork panel
        visnetwork_panel.nodes = nodes

        # Small sleep to limit CPU usage and smoothen the animation
        time.sleep(0.01)
