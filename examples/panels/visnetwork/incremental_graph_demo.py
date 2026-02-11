"""Incremental graph update demo - builds a knowledge graph step by step.

This example demonstrates the incremental graph update API using the same
JSON playbook notation as the reference kg-visjs.html file.

Each step contains an 'actions' list with flat action objects that are
sent directly to the JavaScript side.
"""

import time

import panel as pn

from panelini.panels.visnetwork import VisNetwork

pn.extension()

# Animation sequence - same format as kg-visjs.html
SEQUENCE = [
    {
        "actions": [
            {
                "action": "addNode",
                "id": "input1",
                "label": '"A tensile test experiment #1\nconducted by Dr. Jane Doe,\nExample Lab Corp."',
                "type": "input",
            }
        ],
        "status": "User input for Experiment #1...",
    },
    {
        "actions": [{"action": "pause"}],
        "status": "Processing input...",
    },
    {
        "actions": [
            {
                "action": "addNode",
                "id": "e",
                "label": "A tensile test experiment #1\nconducted by Dr. Jane Doe,\nExample Lab Corp.",
                "type": "instance",
            },
            {
                "action": "addEdge",
                "from": "input1",
                "to": "e",
                "label": "",
                "dashed": True,
            },
        ],
        "status": "Extracting experiment entity...",
    },
    {
        "actions": [
            {
                "action": "addNode",
                "id": "eC",
                "label": "LaboratoryProcess",
                "type": "class",
            },
            {"action": "addEdge", "from": "e", "to": "eC", "label": "type"},
        ],
        "status": "Adding LaboratoryProcess class and connecting...",
    },
    {
        "actions": [
            {
                "action": "addNode",
                "id": "p",
                "label": "Dr. Jane Doe,\nExample Lab Corp.",
                "type": "instance",
            },
            {
                "action": "updateNode",
                "id": "e",
                "label": "A tensile test\nexperiment #1",
            },
            {"action": "addEdge", "from": "e", "to": "p", "label": "actionee"},
        ],
        "status": "Adding person and refining relationships...",
    },
    {
        "actions": [
            {"action": "addNode", "id": "pC", "label": "Person", "type": "class"},
            {"action": "addEdge", "from": "p", "to": "pC", "label": "type"},
        ],
        "status": "Adding Person class and connecting...",
    },
    {
        "actions": [
            {
                "action": "addNode",
                "id": "o",
                "label": "Example Lab Corp.",
                "type": "instance",
            },
            {"action": "updateNode", "id": "p", "label": "Dr. Jane Doe"},
            {"action": "addEdge", "from": "p", "to": "o", "label": "organization"},
        ],
        "status": "Adding organization and refining relationships...",
    },
    {
        "actions": [
            {
                "action": "addNode",
                "id": "oC",
                "label": "Organization",
                "type": "class",
            },
            {"action": "addEdge", "from": "o", "to": "oC", "label": "type"},
        ],
        "status": "Adding Organization class and connecting...",
    },
    {
        "actions": [
            {"action": "updateNodeState", "nodeIds": ["e", "p", "o"], "state": "stored"},
            {"action": "pause"},
        ],
        "status": "--- Starting Experiment #2 ---",
    },
    {
        "actions": [
            {
                "action": "addNode",
                "id": "input2",
                "label": '"A tensile test experiment #2\nconducted by Dr. John Doe,\nExample Lab Corp."',
                "type": "input",
            }
        ],
        "status": "User input for Experiment #2...",
    },
    {
        "actions": [{"action": "pause"}],
        "status": "Processing input...",
    },
    {
        "actions": [
            {
                "action": "addNode",
                "id": "e2",
                "label": "A tensile test experiment #2\nconducted by Dr. John Doe,\nExample Lab Corp.",
                "type": "instance",
            },
            {"action": "addEdge", "from": "e2", "to": "eC", "label": "type"},
            {"action": "addEdge", "from": "input2", "to": "e2", "label": "", "dashed": True},
        ],
        "status": "Extracting experiment entity and connecting to class...",
    },
    {
        "actions": [
            {
                "action": "addNode",
                "id": "p2",
                "label": "Dr. John Doe,\nExample Lab Corp.",
                "type": "instance",
            },
            {
                "action": "updateNode",
                "id": "e2",
                "label": "A tensile test\nexperiment #2",
            },
            {"action": "addEdge", "from": "e2", "to": "p2", "label": "actionee"},
            {"action": "addEdge", "from": "p2", "to": "pC", "label": "type"},
        ],
        "status": "Adding second person and connecting relationships...",
    },
    {
        "actions": [
            {
                "action": "addNode",
                "id": "o2",
                "label": "Example Lab Corp.",
                "type": "instance",
            },
            {"action": "updateNode", "id": "p2", "label": "Dr. John Doe"},
            {"action": "addEdge", "from": "p2", "to": "o2", "label": "organization"},
            {"action": "addEdge", "from": "o2", "to": "oC", "label": "type"},
        ],
        "status": "Adding second organization and connecting relationships...",
    },
    {
        "actions": [{"action": "addEdge", "from": "o2", "to": "o", "label": "sameAs"}],
        "status": "Identifying organizations as the same...",
    },
    {
        "actions": [{"action": "mergeNodes", "sourceId": "o2", "targetId": "o"}],
        "status": "Merging duplicate organizations...",
    },
    {
        "actions": [
            {"action": "updateNodeState", "nodeIds": ["e2", "p2"], "state": "stored"},
            {"action": "pause"},
        ],
        "status": "--- Starting Experiment #3 ---",
    },
    {
        "actions": [
            {
                "action": "addNode",
                "id": "input3",
                "label": '"A tensile test experiment #3\nconducted by Dr. John Doe,\nManager of Example Lab Corp."',
                "type": "input",
            }
        ],
        "status": "User input for Experiment #3...",
    },
    {
        "actions": [{"action": "pause"}],
        "status": "Processing input...",
    },
    {
        "actions": [
            {
                "action": "addNode",
                "id": "e3",
                "label": "A tensile test experiment #3\nconducted by Dr. John Doe,\nManager of Example Lab Corp.",
                "type": "instance",
            },
            {"action": "addEdge", "from": "e3", "to": "eC", "label": "type"},
            {"action": "addEdge", "from": "input3", "to": "e3", "label": "", "dashed": True},
        ],
        "status": "Extracting experiment entity and connecting to class...",
    },
    {
        "actions": [
            {
                "action": "addNode",
                "id": "p3",
                "label": "Dr. John Doe,\nManager of Example Lab Corp.",
                "type": "instance",
            },
            {
                "action": "updateNode",
                "id": "e3",
                "label": "A tensile test\nexperiment #3",
            },
            {"action": "addEdge", "from": "e3", "to": "p3", "label": "actionee"},
            {"action": "addEdge", "from": "p3", "to": "pC", "label": "type"},
        ],
        "status": "Adding third person and connecting relationships...",
    },
    {
        "actions": [{"action": "addEdge", "from": "p3", "to": "p2", "label": "sameAs"}],
        "status": "Identifying persons as the same...",
    },
    {
        "actions": [{"action": "mergeNodes", "sourceId": "p3", "targetId": "p2"}],
        "status": "Merging duplicate persons...",
    },
    {
        "actions": [
            {"action": "updateNode", "id": "p2", "label": "Dr. John Doe"},
            {"action": "addEdge", "from": "o", "to": "p2", "label": "manager"},
            {"action": "updateNodeState", "nodeIds": ["o"], "state": "modified"},
        ],
        "status": "Recognizing organization and adding manager relationship...",
    },
    {
        "actions": [
            {"action": "updateNodeState", "nodeIds": ["e3", "o"], "state": "stored"},
            {"action": "complete"},
        ],
        "status": "Animation complete!",
    },
]


def create_demo():
    """Create the incremental graph demo."""
    # Create empty graph
    vis = VisNetwork(
        nodes=[],
        edges=[],
        options={
            "nodes": {
                "shape": "dot",
                "size": 20,
                "font": {"size": 14, "strokeWidth": 3, "strokeColor": "#ffffff"},
                "borderWidth": 2,
                "shadow": True,
            },
            "edges": {
                "arrows": "to",
                "font": {
                    "size": 12,
                    "align": "middle",
                    "strokeWidth": 3,
                    "strokeColor": "#ffffff",
                },
                "smooth": {"type": "continuous"},
            },
            "physics": {
                "enabled": True,
                "solver": "forceAtlas2Based",
                "forceAtlas2Based": {
                    "gravitationalConstant": -200,
                    "centralGravity": 0.005,
                    "springLength": 80,
                    "springConstant": 0.05,
                    "damping": 0.4,
                    "avoidOverlap": 1,
                },
                "stabilization": {
                    "enabled": True,
                    "iterations": 200,
                    "updateInterval": 25,
                },
            },
        },
    )

    # Status display
    status = pn.pane.Markdown("**Status:** Ready to start")
    step_index = {"value": 0}

    def execute_step():
        """Execute the next step in the sequence."""
        if step_index["value"] >= len(SEQUENCE):
            status.object = "**Status:** Animation complete!"
            return

        step = SEQUENCE[step_index["value"]]
        status.object = f"**Status:** {step.get('status', 'Processing...')}"

        # Send step directly to JavaScript (flat JSON format)
        vis.execute_step(step)

        step_index["value"] += 1

    def reset_graph():
        """Clear the graph and reset."""
        vis.clear()
        step_index["value"] = 0
        status.object = "**Status:** Graph cleared. Ready to start."

    def run_all():
        """Run all steps with delays."""
        reset_graph()
        time.sleep(0.5)

        for _i in range(len(SEQUENCE)):
            execute_step()
            time.sleep(1.5)

    # Control buttons
    step_btn = pn.widgets.Button(name="Next Step", button_type="primary")
    step_btn.on_click(lambda e: execute_step())

    reset_btn = pn.widgets.Button(name="Reset", button_type="danger")
    reset_btn.on_click(lambda e: reset_graph())

    run_btn = pn.widgets.Button(name="Run All (blocking)", button_type="success")
    run_btn.on_click(lambda e: run_all())

    # Layout
    controls = pn.Row(step_btn, reset_btn, run_btn)

    return pn.Column(
        "# Incremental Graph Update Demo",
        "Demonstrates the incremental graph update API with knowledge graph building.",
        "Uses the same JSON playbook format as kg-visjs.html.",
        controls,
        status,
        vis,
    )


app = create_demo()

if __name__ == "__main__":
    pn.serve(app)
