# 📊 panelini 🐍<!-- omit in toc -->

[![opensemanticworld.github.io/panelini/](https://img.shields.io/badge/panelini-docs-blue
)](https://opensemanticworld.github.io/panelini/)
[![PyPI Version](https://img.shields.io/pypi/v/panelini)](https://pypi.org/project/panelini/)
[![Release](https://img.shields.io/github/v/release/opensemanticworld/panelini)](https://img.shields.io/github/v/release/opensemanticworld/panelini)
[![Build status](https://img.shields.io/github/actions/workflow/status/opensemanticworld/panelini/main.yml?branch=main)](https://github.com/opensemanticworld/panelini/actions/workflows/main.yml?query=branch%3Amain)
[![codecov](https://codecov.io/gh/opensemanticworld/panelini/branch/main/graph/badge.svg)](https://codecov.io/gh/opensemanticworld/panelini)
[![Commit activity](https://img.shields.io/github/commit-activity/m/opensemanticworld/panelini)](https://img.shields.io/github/commit-activity/m/opensemanticworld/panelini)
[![License](https://img.shields.io/github/license/opensemanticworld/panelini)](https://github.com/opensemanticworld/panelini/blob/fa449c31d48088bbdbf14072746bb68360131ddb/LICENSE)

[![Panelini Banner](https://raw.githubusercontent.com/opensemanticworld/panelini/fa449c31d48088bbdbf14072746bb68360131ddb/img/panelinibanner.svg)](https://github.com/opensemanticworld/panelini)

``panelini`` is a user-friendly Python package designed to provide an out-of-the-box panel with a beautiful and responsive layout. It simplifies the creation of interactive dashboards by handling dynamic content seamlessly using Python Panel components. Whether you're building complex data visualizations or simple interactive interfaces, ``panelini`` offers an easy-to-use solution that enhances productivity and aesthetics.

## 📦 Table of Contents <!-- omit in toc -->

- [📄 Features](#-features)
- [🚀 Install](#-install)
- [💥 Usage](#-usage)
- [🛞 Commands](#-commands)
- [🦥 Authors](#-authors)
- [📜 Content Attribution](#-content-attribution)

## 📄 Features

- **Easy Setup:** Quickly get started with minimal configuration.
- **Beautiful Layouts:** Pre-designed, aesthetically pleasing layouts that can be customized to fit your needs.
- **Dynamic Content:** Efficiently manage and display dynamic content using robust Python Panel components.
- **Extensible:** Easily extend and integrate with other Python libraries and tools.
- **Published on PyPI:** Install effortlessly using pip.

## 🚀 Install

Recommended

```bash
uv add panelini
```

or use pip

```bash
pip install panelini
```

## 💥 Usage

A minimal example to run ``Panelini`` can be found in the `examples/panelini_min.py` file.
Below is a simple code snippet to get you started:

```python
from panelini import Panelini

# Minimal Example to run Panelini
main_objects = [
    # Use panel components to build your layout
    Card(
        objects=[Markdown("# 📊 Welcome to Panelini! 🖥️", disable_anchors=True)],
        title="Panel Example Card",
        width=300,
        max_height=200,
    )
]
# Create an instance of Panelini
app = Panelini(
    title="Hello Panelini",
    # main = [main_objects] # init objects here
)
# Or set objects outside
app.main_set(objects=main_objects)
# Use servable when using CLI "panel serve" command
app.servable()


if __name__ == "__main__":
    # Serve app as you would in panel
    app.serve(port=5010)
```

> See [examples directory](https://github.com/opensemanticworld/panelini/tree/main/examples) for more usage scenarios.

## 🛞 Commands

Panel command to serve with static content

```bash
panel serve src/panelini/main.py --dev --port 5006 --static-dirs assets="src/panelini/assets" --ico-path src/panelini/assets/favicon.ico
```

> When using `panel serve`, make sure to specify the correct paths for your static assets and favicon.

## 🦥 Authors

- [Andreas Räder](https://github.com/raederan)
- [Linus Schenk](https://github.com/cptnsloww)

## 📜 Content Attribution

The authors initially generated the logo and banner for this repository using DALL-E 3 and later modified it to better align with the project's vision.
