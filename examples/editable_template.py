"""
Panel EditableTemplate Example

Run with panel command:
    panel serve examples/editable_template.py --dev --port 5006
"""

import panel as pn

template = pn.template.EditableTemplate(title="Panel EditableTemplate Example")

sidebar_content = pn.Column(pn.pane.Markdown("## Sidebar Content Area"))

main_content = pn.Column(pn.pane.Markdown("## Main Content Area"))

template.main.append(main_content)
template.sidebar.append(sidebar_content)

print(type(template))

template.servable()
