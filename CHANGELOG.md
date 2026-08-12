# CHANGELOG

Entries before this file was introduced (up to and including `0.9.4`)
are not tracked here; see the git log for that history.

<!-- version list -->

## v0.11.0 (2026-08-12)

### Bug Fixes

- **docs**: Record the docs clips correctly after the shared-server test refactor
  ([`a5f782c`](https://github.com/opensemanticworld/panelini/commit/a5f782c12d1a4bb7bcbc28a278758267c1c86310))

- **examples**: Keep AI chat sidebar collapsed by default
  ([`3c4ac49`](https://github.com/opensemanticworld/panelini/commit/3c4ac49e77b2716e860c4ab861039448d34ed760))

### Build System

- Replace mypy with ty for static type checking
  ([`156a4a5`](https://github.com/opensemanticworld/panelini/commit/156a4a52b1a2e7fd689fa35cc2b681e299fd300a))

### Continuous Integration

- Gate releases behind a PR-required main and a scoped GitHub App token
  ([`2fbd568`](https://github.com/opensemanticworld/panelini/commit/2fbd568b8351bc88ac497c93fb900dc7a40a4856))

- Run tests across ubuntu, macOS and windows for all supported Python versions
  ([`b0b53a2`](https://github.com/opensemanticworld/panelini/commit/b0b53a2fda8da5beb2a57f5d02142306505a580e))

- Validate package metadata with twine before publishing
  ([`8bd5c56`](https://github.com/opensemanticworld/panelini/commit/8bd5c567d675cf74b097de0d6a2be5a03f7d12d5))

### Documentation

- Enforce Conventional Commits locally and document AI usage guidelines
  ([`95925be`](https://github.com/opensemanticworld/panelini/commit/95925be7b309f9b41b12344be14fa40bdb6165f7))

- Remove superpower docs from remote, upd uv lock version
  ([`762f14c`](https://github.com/opensemanticworld/panelini/commit/762f14c1d5da255cefbffd21bf17973f70e96eb7))

### Testing

- Add bench test details
  ([`04e63ac`](https://github.com/opensemanticworld/panelini/commit/04e63ac605a98a4a81c75331a6abbb2068cb3d2b))

- Fix real race between collapse/expand clicks in terminalmirror test
  ([`b22d933`](https://github.com/opensemanticworld/panelini/commit/b22d9330f7ce9a2e818c0c03b4e33679f435a713))

- Give the terminalmirror redraw wait more headroom for loaded CI runners
  ([`e3b7319`](https://github.com/opensemanticworld/panelini/commit/e3b7319363c86fb180c1c25b6e36e6eb5910c745))

- Increase terminalmirror redraw timeout further for macOS CI runners
  ([`0c8953b`](https://github.com/opensemanticworld/panelini/commit/0c8953b9a8715e44168bb0cec08841776e2f95fa))

- Replace per-test servers and hardcoded sleeps with shared servers and condition waits in UI tests
  ([`bde06f2`](https://github.com/opensemanticworld/panelini/commit/bde06f2e1317c50687c126508c6e4dbbcac0a805))

- Stop test_example_redraws_on_card_expand from sharing the served terminalmirror singleton
  ([`3bd2fb8`](https://github.com/opensemanticworld/panelini/commit/3bd2fb8ea0ed56fd29a55ad05dfca58be61cacf6))

- Wait for actual rendered terminal content instead of racing Python-side state
  ([`96aa203`](https://github.com/opensemanticworld/panelini/commit/96aa2031dc036893033f1b87734784aba53d47e5))


## v0.10.1 (2026-07-31)

### Bug Fixes

- **docs**: Repair cross-references broken by the examples restructure
  ([`db35c9d`](https://github.com/opensemanticworld/panelini/commit/db35c9df8c879e242cf121d17d0cd223040fd436))


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
