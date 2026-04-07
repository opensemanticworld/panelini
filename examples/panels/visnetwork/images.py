"""Image nodes example - nodes with image URLs."""

import panel as pn

from panelini.panels.visnetwork import VisNetwork

pn.extension()

nodes = [
    {"id": 1, "label": "Wuerzburg", "shape": "ellipse", "color": "green"},
    {"id": 2, "label": "Festung Marienberg", "shape": "ellipse", "color": "blue"},
    {"id": 3, "label": "Residenz", "shape": "ellipse", "color": "blue"},
    {"id": 4, "label": "Kaeppele", "shape": "ellipse", "color": "blue"},
    {
        "id": 5,
        "shape": "image",
        "size": 50,
        "image": "https://upload.wikimedia.org/wikipedia/commons/9/9b/Wuerzburg_Festung_Marienberg.jpg",
    },
    {
        "id": 6,
        "shape": "image",
        "size": 50,
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/South_facade_of_the_Wurzburg_Residence_05.jpg/960px-South_facade_of_the_Wurzburg_Residence_05.jpg",
    },
    {
        "id": 7,
        "shape": "image",
        "size": 50,
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Kaeppele_wuerzburg_festungsfoto.jpg/1280px-Kaeppele_wuerzburg_festungsfoto.jpg",
    },
]

edges = [
    {"from": 1, "to": 2, "label": "HasBuilding", "arrows": "to", "color": "black"},
    {"from": 1, "to": 3, "label": "HasBuilding", "arrows": "to", "color": "black"},
    {"from": 1, "to": 4, "label": "HasBuilding", "arrows": "to", "color": "black"},
    {"from": 2, "to": 5, "label": "HasImage", "arrows": "to", "color": "black"},
    {"from": 3, "to": 6, "label": "HasImage", "arrows": "to", "color": "black"},
    {"from": 4, "to": 7, "label": "HasImage", "arrows": "to", "color": "black"},
]


if __name__ == "__main__":
    visnetwork_panel = VisNetwork(nodes=nodes, edges=edges)
    pn.serve(visnetwork_panel, threaded=True)
