"""Incremental tree update demo - builds a project folder structure step by step.

This example demonstrates the incremental tree update API using the same
playbook notation as the visnetwork incremental_graph_demo.py.

Each step contains an 'actions' list with action objects that are
sent directly to the JavaScript side.
"""

import time

import panel as pn

from panelini.panels.wunderbaum import Wunderbaum

pn.extension()

# Build sequence - creates a project structure step by step
SEQUENCE = [
    {
        "actions": [
            {
                "action": "addNode",
                "parentKey": None,
                "key": "project",
                "title": "my-project",
                "icon": "bi bi-folder-fill",
                "expanded": True,
            }
        ],
        "status": "Creating project root...",
    },
    {
        "actions": [
            {
                "action": "addNode",
                "parentKey": "project",
                "key": "src",
                "title": "src",
                "icon": "bi bi-folder-fill",
                "expanded": True,
            },
            {
                "action": "addNode",
                "parentKey": "project",
                "key": "tests",
                "title": "tests",
                "icon": "bi bi-folder-fill",
            },
        ],
        "status": "Adding src/ and tests/ directories...",
    },
    {
        "actions": [
            {
                "action": "addNode",
                "parentKey": "src",
                "key": "main.py",
                "title": "main.py",
                "icon": "bi bi-file-earmark-code",
                "data": {"size": "2.1 KB", "language": "Python"},
            },
            {
                "action": "addNode",
                "parentKey": "src",
                "key": "utils.py",
                "title": "utils.py",
                "icon": "bi bi-file-earmark-code",
                "data": {"size": "856 B", "language": "Python"},
            },
        ],
        "status": "Adding source files...",
    },
    {
        "actions": [
            {
                "action": "addNode",
                "parentKey": "src",
                "key": "models",
                "title": "models",
                "icon": "bi bi-folder-fill",
                "expanded": True,
            }
        ],
        "status": "Adding models/ subdirectory...",
    },
    {
        "actions": [
            {
                "action": "addNode",
                "parentKey": "models",
                "key": "user.py",
                "title": "user.py",
                "icon": "bi bi-file-earmark-code",
            },
            {
                "action": "addNode",
                "parentKey": "models",
                "key": "__init__.py",
                "title": "__init__.py",
                "icon": "bi bi-file-earmark-code",
            },
        ],
        "status": "Adding model files...",
    },
    {
        "actions": [
            {
                "action": "addNode",
                "parentKey": "tests",
                "key": "test_main.py",
                "title": "test_main.py",
                "icon": "bi bi-file-earmark-code",
            },
        ],
        "status": "Adding test file...",
    },
    {
        "actions": [
            {
                "action": "addNode",
                "parentKey": "project",
                "key": "README.md",
                "title": "README.md",
                "icon": "bi bi-file-earmark-text",
            },
            {
                "action": "addNode",
                "parentKey": "project",
                "key": "pyproject.toml",
                "title": "pyproject.toml",
                "icon": "bi bi-file-earmark-code",
            },
        ],
        "status": "Adding project config files...",
    },
    {
        "actions": [
            {
                "action": "renameNode",
                "key": "main.py",
                "title": "app.py",
            },
        ],
        "status": "Renaming main.py to app.py...",
    },
    {
        "actions": [
            {
                "action": "moveNode",
                "key": "utils.py",
                "targetKey": "models",
                "mode": "child",
            },
        ],
        "status": "Moving utils.py into models/...",
    },
    {
        "actions": [{"action": "complete"}],
        "status": "Project structure complete!",
    },
]


def create_demo():
    """Create the incremental tree demo."""
    tree = Wunderbaum(source=[], options={})

    status = pn.pane.Markdown("**Status:** Ready to start")
    step_index = {"value": 0}

    def execute_step():
        if step_index["value"] >= len(SEQUENCE):
            status.object = "**Status:** Demo complete!"
            return

        step = SEQUENCE[step_index["value"]]
        status.object = f"**Status:** {step.get('status', 'Processing...')}"
        tree.execute_step(step)
        step_index["value"] += 1

    def reset_tree():
        tree.clear()
        step_index["value"] = 0
        status.object = "**Status:** Tree cleared. Ready to start."

    def run_all():
        reset_tree()
        time.sleep(0.5)
        for _i in range(len(SEQUENCE)):
            execute_step()
            time.sleep(1.0)

    step_btn = pn.widgets.Button(name="Next Step", button_type="primary")
    step_btn.on_click(lambda e: execute_step())

    reset_btn = pn.widgets.Button(name="Reset", button_type="danger")
    reset_btn.on_click(lambda e: reset_tree())

    run_btn = pn.widgets.Button(name="Run All (blocking)", button_type="success")
    run_btn.on_click(lambda e: run_all())

    controls = pn.Row(step_btn, reset_btn, run_btn)

    return pn.Column(
        "# Incremental Tree Update Demo",
        "Builds a project folder structure step by step.",
        controls,
        status,
        tree,
    )


app = create_demo()

if __name__ == "__main__":
    pn.serve(app)
