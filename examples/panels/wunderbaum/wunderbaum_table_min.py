"""Treegrid example demonstrating Wunderbaum with columns (tree+table mode).

Shows file/folder meta-properties in a table.
Column values are placed at the node level (not inside 'data')
since wunderbaum auto-moves non-reserved keys to node.data.
"""

import panel as pn

from panelini.panels.wunderbaum import Wunderbaum

pn.extension()

source = [
    {
        "title": "Documents",
        "key": "docs",
        "icon": "bi bi-folder-fill",
        "expanded": True,
        "size": "",
        "modified": "2024-01-15",
        "permissions": "rwxr-xr-x",
        "children": [
            {
                "title": "report.pdf",
                "key": "docs/report",
                "icon": "bi bi-file-earmark-pdf",
                "size": "2.4 MB",
                "modified": "2024-01-10",
                "permissions": "rw-r--r--",
            },
            {
                "title": "notes.txt",
                "key": "docs/notes",
                "icon": "bi bi-file-earmark-text",
                "size": "12 KB",
                "modified": "2024-01-14",
                "permissions": "rw-r--r--",
            },
        ],
    },
    {
        "title": "Images",
        "key": "images",
        "icon": "bi bi-folder-fill",
        "size": "",
        "modified": "2024-01-12",
        "permissions": "rwxr-xr-x",
        "children": [
            {
                "title": "photo.jpg",
                "key": "images/photo",
                "icon": "bi bi-file-earmark-image",
                "size": "3.8 MB",
                "modified": "2024-01-12",
                "permissions": "rw-r--r--",
            },
            {
                "title": "logo.png",
                "key": "images/logo",
                "icon": "bi bi-file-earmark-image",
                "size": "156 KB",
                "modified": "2024-01-08",
                "permissions": "rw-r--r--",
            },
        ],
    },
    {
        "title": "config.yaml",
        "key": "config",
        "icon": "bi bi-file-earmark-code",
        "size": "1.2 KB",
        "modified": "2024-01-15",
        "permissions": "rw-------",
    },
]

columns = [
    {"id": "*", "title": "Name", "width": "250px"},
    {"id": "size", "title": "Size", "width": "100px"},
    {"id": "modified", "title": "Modified", "width": "120px"},
    {"id": "permissions", "title": "Permissions", "width": "120px"},
]

tree = Wunderbaum(source=source, columns=columns)

if __name__ == "__main__":
    pn.serve(tree)
