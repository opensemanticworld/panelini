import panel as pn

from panelini import Panelini

if __name__ == "__main__":
    checkbox_group_1 = pn.widgets.CheckBoxGroup(
        name="Checkbox Group", value=["Apple", "Pear"], options=["Apple", "Banana", "Pear", "Strawberry"], inline=False
    )

    right_container_1 = pn.Column(checkbox_group_1, pn.pane.Markdown("container 1"))
    right_container_2 = pn.Column(checkbox_group_1, pn.pane.Markdown("container 2"))

    button_1 = pn.widgets.Button(name="load 1", button_type="primary")
    button_2 = pn.widgets.Button(name="load 2", button_type="primary")

    my_panelini = Panelini()
    my_panelini.sidebar_set([button_1, button_2, checkbox_group_1])
    my_panelini.main_set([
        right_container_1,  # right_container_2
    ])

    def button_1_callback(event):
        checkbox_group_1.value = ["Banana", "Strawberry"]
        my_panelini.main_set([right_container_1])

    def button_2_callback(event):
        checkbox_group_1.value = ["Apple", "Pear"]
        my_panelini.main_set([right_container_2])

    button_1.on_click(button_1_callback)
    button_2.on_click(button_2_callback)

    my_panelini.serve(port=5007)
    # my_panelini.servable()
