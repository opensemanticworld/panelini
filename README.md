# panelini <!-- omit in toc -->

[![Release](https://img.shields.io/github/v/release/opensemanticworld/panelini)](https://img.shields.io/github/v/release/opensemanticworld/panelini)
[![Build status](https://img.shields.io/github/actions/workflow/status/opensemanticworld/panelini/main.yml?branch=main)](https://github.com/opensemanticworld/panelini/actions/workflows/main.yml?query=branch%3Amain)
[![codecov](https://codecov.io/gh/opensemanticworld/panelini/branch/main/graph/badge.svg)](https://codecov.io/gh/opensemanticworld/panelini)
[![Commit activity](https://img.shields.io/github/commit-activity/m/opensemanticworld/panelini)](https://img.shields.io/github/commit-activity/m/opensemanticworld/panelini)

[![Panelini Banner](https://github.com/opensemanticworld/panelini/blob/init/img/panelinibanner.svg)](https://github.com/opensemanticworld/panelini)

``panelini`` is a user-friendly Python package designed to provide an out-of-the-box panel with a beautiful and responsive layout. It simplifies the creation of interactive dashboards by handling dynamic content seamlessly using Python Panel components. Whether you're building complex data visualizations or simple interactive interfaces, ``panelini`` offers an easy-to-use solution that enhances productivity and aesthetics.

## Table of Contents <!-- omit in toc -->

- [Features](#features)
- [Commands](#commands)
- [Authors](#authors)
- [Content Attribution](#content-attribution)

## Features

- **Easy Setup:** Quickly get started with minimal configuration.
- **Beautiful Layouts:** Pre-designed, aesthetically pleasing layouts that can be customized to fit your needs.
- **Dynamic Content:** Efficiently manage and display dynamic content using robust Python Panel components.
- **Extensible:** Easily extend and integrate with other Python libraries and tools.
- **Published on PyPI:** Install effortlessly using pip.

## Commands

Panel command to serve with static content

```bash
panel serve src/panelini/panelini.py --dev --port 5006 --static-dirs assets="src/panelini/assets" --ico-path src/panelini/assets/favicon.ico
```

## Authors

- [Andreas Räder](https://github.com/raederan)
- [Linus Schenk](https://github.com/cptnsloww)

## Content Attribution

The authors initially generated the logo and banner for this repository using DALL-E 3 and later modified it to better align with the project's vision.
