# CHANGELOG

Entries before this file was introduced (up to and including `0.9.4`)
are not tracked here; see the git log for that history.

<!-- version list -->

## v0.10.0 (2026-07-31)

### Bug Fixes

- Make check
  ([`5684701`](https://github.com/opensemanticworld/panelini/commit/5684701cb464c00d452d0e55bfce2fc39552286a))

- **visnetwork**: Tidy PR #19 debug logging and resize observer, add tests and docs
  ([`9363f7f`](https://github.com/opensemanticworld/panelini/commit/9363f7f73819934ce33df0cbbf196013e955a5c9))

### Build System

- Decouple the pyodide portfolio from the docs build
  ([`312578c`](https://github.com/opensemanticworld/panelini/commit/312578cbf6cf0be6073015c407281406ab254f7d))

### Chores

- Add pre-commit hook to prevent em dash usage
  ([`4232912`](https://github.com/opensemanticworld/panelini/commit/42329126609cc9660af3b0cee2241fa448b1dc06))

- Ign local dir
  ([`af30390`](https://github.com/opensemanticworld/panelini/commit/af30390e5cf06ea0c7a4a23b9145bdda948db889))

- Update uv lock file
  ([`ce052c2`](https://github.com/opensemanticworld/panelini/commit/ce052c23e55b97ef4846a29bbd61d9f763976993))

### Continuous Integration

- Automate releases with python-semantic-release, add PR version-preview comment
  ([`6ad0d43`](https://github.com/opensemanticworld/panelini/commit/6ad0d4328c17086accf1f60d530d30eb154c7954))

- Pass GH_TOKEN to semantic-release so it can create the GitHub release
  ([`17505ef`](https://github.com/opensemanticworld/panelini/commit/17505efdfb6d0ddcea9d81bb0dd14ad4f01b95ba))

- Simplify docs with embedded portfolieo generation mechanism
  ([`c91840d`](https://github.com/opensemanticworld/panelini/commit/c91840d81f511c9c65afa5d90a2c309798eef412))

### Documentation

- Add "Open fullscreen" links to portfolio cards and embed pages
  ([`4c45361`](https://github.com/opensemanticworld/panelini/commit/4c45361212819fd365f119b00e94d87483cc854d))

- Build portfolio apps in release CI and make builds incremental
  ([`0776bc4`](https://github.com/opensemanticworld/panelini/commit/0776bc4be9589325fb5aae58d2ffcaeb05c3acfc))

- Create automated test recording infrastructure
  ([`0c72f34`](https://github.com/opensemanticworld/panelini/commit/0c72f34fbf610bf9772b2390aec1d5d7d25642dc))

- Document conventional commits and automated release flow
  ([`6529e05`](https://github.com/opensemanticworld/panelini/commit/6529e056943b4f6429e71789976d23ce8d842e0e))

- Fix make portfolio issues with panel.io and also relative imports of examples
  ([`35c5c22`](https://github.com/opensemanticworld/panelini/commit/35c5c22a5004e886c6ac704ed7c9e9e584c3ccc3))

- Fix uv sync instructions to include all extras for make check
  ([`2ae622b`](https://github.com/opensemanticworld/panelini/commit/2ae622b1029091116a14fc84bb8b694a03a85b4d))

- Full media coverage (chat, terminalmirror, wunderbaum min); fix light-theme surfaces
  ([`d3dea95`](https://github.com/opensemanticworld/panelini/commit/d3dea95ca47f73a5e1028940ab3cd2a849008f30))

- Generate media from selected test cases
  ([`89b2251`](https://github.com/opensemanticworld/panelini/commit/89b2251046578fa28542126df70619ef080870b8))

- Generate visual media for panels and usecases
  ([`31e270a`](https://github.com/opensemanticworld/panelini/commit/31e270ac71a85bdad289f8bfea23aa5c7a0dc2a5))

- Init portfolio pyodide
  ([`ebd1b42`](https://github.com/opensemanticworld/panelini/commit/ebd1b429cc0ab41f10974c551e34c4bd7882e48a))

- Merge portfolio into a nested, per-component Examples section
  ([`b8ba9fa`](https://github.com/opensemanticworld/panelini/commit/b8ba9fa8ef08765266c1cf55cd8f87ade641b556))

- Restructure nav, add wunderbaum panel guide, embed media
  ([`a55f9c1`](https://github.com/opensemanticworld/panelini/commit/a55f9c1f676073aa7d7ff0e03f9fcc7d4d488418))

- **portfolio**: Use committed media clips as card thumbnails
  ([`4598c05`](https://github.com/opensemanticworld/panelini/commit/4598c05af5661c446602996c5a034385abc474f0))

### Features

- **portfolio**: Phase 1 - verify Pyodide apps render + WASM-safe terminal mirror
  ([`da88cb7`](https://github.com/opensemanticworld/panelini/commit/da88cb755e3e7646b117323d91bbe26535485457))

### Refactoring

- Reduce code duplication between generate_media and playwright tests
  ([`daafa4f`](https://github.com/opensemanticworld/panelini/commit/daafa4f3933d36c9562b1df95ac5453781e8a91f))
