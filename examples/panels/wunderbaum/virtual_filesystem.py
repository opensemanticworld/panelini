"""Virtual multiroot filesystem demo with Wunderbaum (tree+table mode).

Demonstrates:
- Multiple root mounts
- Folder/file icons
- Columns: name, size, modified date
- Built-in context menu (right-click): add file/folder, delete
- Python API buttons for programmatic tree manipulation
- DnD, rename (F2), external file drop
- In-memory dict as filesystem backend
"""

import panel as pn

from panelini.panels.wunderbaum import Wunderbaum

pn.extension()

# In-memory filesystem backend
filesystem: dict[str, dict] = {
    "/home": {
        "type": "folder",
        "size": "",
        "modified": "2024-01-15",
    },
    "/home/user": {
        "type": "folder",
        "size": "",
        "modified": "2024-01-15",
    },
    "/home/user/document.txt": {
        "type": "file",
        "size": "4.2 KB",
        "modified": "2024-01-14",
    },
    "/home/user/photo.jpg": {
        "type": "file",
        "size": "2.8 MB",
        "modified": "2024-01-12",
    },
    "/tmp": {  # noqa: S108 (virtual path, not actual temp dir)
        "type": "folder",
        "size": "",
        "modified": "2024-01-15",
    },
    "/tmp/cache.dat": {  # noqa: S108
        "type": "file",
        "size": "128 KB",
        "modified": "2024-01-15",
    },
}


def fs_to_tree_source() -> list[dict]:
    """Convert the flat filesystem dict to a tree source."""
    tree_nodes: dict[str, dict] = {}

    for path in sorted(filesystem.keys()):
        info = filesystem[path]
        parts = path.strip("/").split("/")
        name = parts[-1]

        node: dict = {
            "title": name,
            "key": path,
            "size": info.get("size", ""),
            "modified": info.get("modified", ""),
        }

        if info["type"] == "folder":
            node["icon"] = "bi bi-folder-fill"
            node["expanded"] = True
            node["children"] = []
        else:
            ext = name.rsplit(".", 1)[-1] if "." in name else ""
            icon_map = {
                "txt": "bi bi-file-earmark-text",
                "py": "bi bi-file-earmark-code",
                "jpg": "bi bi-file-earmark-image",
                "png": "bi bi-file-earmark-image",
                "pdf": "bi bi-file-earmark-pdf",
                "dat": "bi bi-file-earmark-binary",
            }
            node["icon"] = icon_map.get(ext, "bi bi-file-earmark")

        tree_nodes[path] = node

    roots = []
    for path, node in tree_nodes.items():
        parts = path.strip("/").split("/")
        if len(parts) == 1:
            roots.append(node)
        else:
            parent_path = "/" + "/".join(parts[:-1])
            if parent_path in tree_nodes:
                parent = tree_nodes[parent_path]
                if "children" not in parent:
                    parent["children"] = []
                parent["children"].append(node)

    return roots


columns = [
    {"id": "*", "title": "Name", "width": "300px"},
    {"id": "size", "title": "Size", "width": "100px"},
    {"id": "modified", "title": "Modified", "width": "120px"},
]

status = pn.pane.Markdown("**Status:** Ready. Right-click a node for context menu.")

counter = {"value": 0}


# =========================================================================
# Tree event handlers
# =========================================================================


def _get_checked_keys() -> list[str]:
    """Read checked keys from tree.source (synced from JS)."""
    keys: list[str] = []

    def walk(nodes: list[dict]) -> None:
        for n in nodes:
            if n.get("selected"):
                keys.append(n["key"])
            walk(n.get("children", []))

    walk(tree.source)
    return keys


def delete_checked() -> None:
    """Delete all checked nodes via batch_update."""
    keys = _get_checked_keys()
    if not keys:
        status.object = "**No nodes checked**"
        return
    print(f"Deleting checked: {keys}")
    tree.batch_update([{"action": "removeNode", "key": k} for k in keys])
    status.object = f"**Deleted {len(keys)} node(s)**"


def on_tree_event(event_name: str, event_params: dict) -> None:
    """Handle tree events."""
    print(f"Tree event: {event_name}, params keys: {list(event_params.keys())}")
    if event_name == "contextmenu":
        action = event_params.get("action", "")
        key = event_params.get("key", "")
        title = event_params.get("title", "")

        if action == "new_folder":
            counter["value"] += 1
            name = f"new_folder_{counter['value']}"
            tree.add_folder(key, name, key=f"{key}/{name}")
            tree.expand_node(key, True)
            status.object = f"**Created folder** `{name}` in `{title}`"
        elif action == "new_file":
            counter["value"] += 1
            name = f"new_file_{counter['value']}.txt"
            tree.add_file(
                key,
                name,
                data={"size": "0 B", "modified": "now"},
                key=f"{key}/{name}",
            )
            tree.expand_node(key, True)
            status.object = f"**Created file** `{name}` in `{title}`"
        elif action == "delete":
            print(f"Deleting key={key!r}")
            tree.remove_node(key)
            status.object = f"**Deleted** `{title}` ({key})"
        elif action == "delete_checked":
            delete_checked()

    elif event_name == "activate":
        key = event_params.get("key", "")
        info = filesystem.get(key, {})
        status.object = (
            f"**Selected:** `{key}`: "
            f"{info.get('type', 'unknown')}, "
            f"size: {info.get('size', 'n/a')}, "
            f"modified: {info.get('modified', 'n/a')}"
        )
    elif event_name == "drop":
        src = event_params.get("sourceKey", "")
        tgt = event_params.get("targetKey", "")
        rgn = event_params.get("region", "")
        status.object = f"**Moved:** `{src}` -> `{tgt}` ({rgn})"
    elif event_name == "edit.apply":
        key = event_params.get("key", "")
        new_title = event_params.get("newValue", "")
        status.object = f"**Renamed:** `{key}` -> `{new_title}`"


def on_file_drop(event_params: dict) -> None:
    """Handle external file drops."""
    files = event_params.get("files", [])
    target_key = event_params.get("targetKey")
    names = [f.get("name", "unknown") for f in files]
    status.object = f"**File drop:** {', '.join(names)} (target: {target_key or 'root'})"
    for f in files:
        name = f.get("name", "dropped_file")
        parent = target_key or "/home/user"
        tree.add_file(
            parent,
            name,
            data={"size": "new", "modified": "now"},
        )


tree = Wunderbaum(
    source=fs_to_tree_source(),
    columns=columns,
    context_menu_items=[
        {
            "id": "new_folder",
            "label": "New Folder",
            "icon": "bi bi-folder-plus",
        },
        {
            "id": "new_file",
            "label": "New File",
            "icon": "bi bi-file-earmark-plus",
        },
        {
            "id": "delete",
            "label": "Delete",
            "icon": "bi bi-trash",
        },
        {
            "id": "delete_checked",
            "label": "Delete Checked",
            "icon": "bi bi-trash-fill",
        },
    ],
    options={
        "checkbox": True,
        "dnd": True,
        "edit": {"trigger": ["clickActive", "F2"]},
    },
    tree_event_callback=on_tree_event,
    file_drop_callback=on_file_drop,
)

# =========================================================================
# Python API buttons (demonstrate programmatic manipulation)
# =========================================================================
new_folder_parent = pn.widgets.TextInput(
    name="Parent key",
    value="/home/user",
    width=200,
)
new_folder_name = pn.widgets.TextInput(
    name="Name",
    value="new_folder",
    width=150,
)
new_folder_btn = pn.widgets.Button(
    name="Add Folder",
    button_type="primary",
    width=100,
    align="end",
)
new_folder_btn.on_click(
    lambda e: tree.add_folder(
        new_folder_parent.value,
        new_folder_name.value,
        key=(f"{new_folder_parent.value}/{new_folder_name.value}"),
    )
)

new_file_parent = pn.widgets.TextInput(
    name="Parent key",
    value="/home/user",
    width=200,
)
new_file_name = pn.widgets.TextInput(
    name="Name",
    value="new_file.txt",
    width=150,
)
new_file_btn = pn.widgets.Button(
    name="Add File",
    button_type="success",
    width=100,
    align="end",
)
new_file_btn.on_click(
    lambda e: tree.add_file(
        new_file_parent.value,
        new_file_name.value,
        data={"size": "0 B", "modified": "now"},
        key=(f"{new_file_parent.value}/{new_file_name.value}"),
    )
)

delete_key = pn.widgets.TextInput(
    name="Node key to delete",
    value="",
    width=200,
)
delete_btn = pn.widgets.Button(
    name="Delete",
    button_type="danger",
    width=100,
)
delete_btn.on_click(lambda e: (tree.remove_node(delete_key.value) if delete_key.value else None))

delete_checked_btn = pn.widgets.Button(
    name="Delete Checked",
    button_type="danger",
    width=130,
)
delete_checked_btn.on_click(lambda e: delete_checked())

delete_key = pn.widgets.TextInput(
    name="Node key to delete",
    value="",
    width=200,
)
delete_btn = pn.widgets.Button(
    name="Delete",
    button_type="danger",
    width=100,
    align="end",
)
delete_btn.on_click(lambda e: (tree.remove_node(delete_key.value) if delete_key.value else None))

python_controls = pn.Card(
    pn.Row(new_folder_parent, new_folder_name, new_folder_btn),
    pn.Row(new_file_parent, new_file_name, new_file_btn),
    pn.Row(delete_key, delete_btn),
    title="Python API Controls",
    collapsed=True,
)

# HTML drop target: only reacts to DnD + keyboard, not tree clicks
dnd_target = pn.pane.HTML(
    """
<div style="margin-bottom:8px">
  <label style="font-weight:bold; font-size:13px">
    Drag a node here to insert its path:
  </label><br>
  <input type="text" id="wb-dnd-input"
    style="width:380px; padding:6px 10px; border:2px dashed #ccc;
           border-radius:4px; font-family:monospace; font-size:13px"
    placeholder="Drag a tree node here..." />
</div>
<script>
(function() {
  const input = document.getElementById('wb-dnd-input');
  if (!input) return;
  input.addEventListener('dragover', (e) => {
    e.preventDefault();
    input.style.borderColor = '#007bff';
    input.style.backgroundColor = '#f0f7ff';
  });
  input.addEventListener('dragleave', () => {
    input.style.borderColor = '#ccc';
    input.style.backgroundColor = '';
  });
  input.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    input.style.borderColor = '#28a745';
    input.style.backgroundColor = '';
    const key = e.dataTransfer.getData('text/plain');
    if (key) {
      input.value = "file: '" + key + "'";
    }
    setTimeout(() => { input.style.borderColor = '#ccc'; }, 1000);
  });
})();
</script>
""",
    width=420,
)

# Readonly display of checked nodes
checked_display = pn.pane.Markdown("**Checked:** (none)")


# Update checked display when source changes (select events
# get lost due to rapid activate overwriting _event_data)
def _update_checked_display(*args: object) -> None:
    keys = _get_checked_keys()
    if keys:
        paths = ", ".join(f"`{k}`" for k in keys)
        checked_display.object = f"**Checked:** {paths}"
    else:
        checked_display.object = "**Checked:** (none)"


tree.param.watch(_update_checked_display, ["source"])

app = pn.Column(
    "# Virtual Filesystem Demo",
    "Right-click for context menu. Drag nodes onto the input field. Double-click or F2 to rename.",
    python_controls,
    status,
    pn.Row(tree, pn.Column(dnd_target, checked_display)),
    pn.Row(delete_checked_btn),
)

if __name__ == "__main__":
    pn.serve(app)
