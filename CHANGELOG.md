# CHANGELOG

Entries before this file was introduced (up to and including `0.9.4`)
are not tracked here; see the git log for that history.

<!-- version list -->

## v1.0.0 (2026-09-11)

### Bug Fixes

- **ai**: Auto-grow chat input
  ([`0ba0217`](https://github.com/opensemanticworld/panelini/commit/0ba0217058f6c3aa41892f2dec23f1221c02df21))

- **ai**: Keep the chat history importable without tornado or sqlite3
  ([`bb5a781`](https://github.com/opensemanticworld/panelini/commit/bb5a781551b8fa1dbe095b1a1026ac7daab2fc38))

- **ai**: Search clear button inside field on both views
  ([`6f7f8b4`](https://github.com/opensemanticworld/panelini/commit/6f7f8b441a9ddfa1abe69d17ccc8b0a5e04d156f))

- **css**: Give keyboard focus its ring back and stretch empty cells
  ([`ac185e7`](https://github.com/opensemanticworld/panelini/commit/ac185e71937fe9e25b28efadcc398374428d7aaa))

- **tanstack**: Keep a rolled up parent out of the drag batch
  ([`ff38413`](https://github.com/opensemanticworld/panelini/commit/ff3841351d28d0656e8553f068cbab92d4eb8db4))

- **tanstack**: Register drag and drop on the panel shadow host
  ([`0be09d3`](https://github.com/opensemanticworld/panelini/commit/0be09d392d7a52c30fff1b1ff51f93a257ba0338))

- **tanstack**: Resize the tree column from the width it renders
  ([`ee52fa1`](https://github.com/opensemanticworld/panelini/commit/ee52fa1061db5f258486562f2a02f05bdeef6169))

- **tanstack**: Roll up parent selection in hierarchy mode
  ([`7576e0d`](https://github.com/opensemanticworld/panelini/commit/7576e0d50733e009f3be8a85f803edbdc6db31be))

- **tanstack**: Wait on the watcher and cover the unreachable tree guards
  ([`a8a17be`](https://github.com/opensemanticworld/panelini/commit/a8a17be7b257fd62aa5ad2c7a68b881fde981d6a))

- **tanstack**: Wrap the toolbar onto a new line when it does not fit
  ([`238e009`](https://github.com/opensemanticworld/panelini/commit/238e009a5eecf579d9394cecfecb3684ca3266af))

- **usecases**: Wait for the tree to push its source back after a dnd move
  ([`c93dbc5`](https://github.com/opensemanticworld/panelini/commit/c93dbc554bbdc537548b573e1d1adf57db93cdb3))

- **wunderbaum**: Copy-drag uses Option on macOS
  ([`bda3e19`](https://github.com/opensemanticworld/panelini/commit/bda3e19e2260af04eaa26d60f652422c273431a9))

- **wunderbaum**: Drop bands on a parent row match their marker
  ([`b950568`](https://github.com/opensemanticworld/panelini/commit/b9505681ffe63ca8f0ee0a559ffca8caf5f41575))

- **wunderbaum**: Show the copy cursor badge during a copy-drag
  ([`d135ec6`](https://github.com/opensemanticworld/panelini/commit/d135ec6dc2c9d31591703d9573b6e08225739c07))

- **wunderbaum**: Stop the source echo clobbering a copy-drop
  ([`ce291bc`](https://github.com/opensemanticworld/panelini/commit/ce291bc58ad606a3f11254c74f8f9cc7fbfb994c))

### Chores

- Refresh uv.lock for 0.11.0
  ([`e32c1b5`](https://github.com/opensemanticworld/panelini/commit/e32c1b505daf4417cadfab59db94295cff84e48e))

- Rm author section from README.md
  ([`cec83ff`](https://github.com/opensemanticworld/panelini/commit/cec83ffee2207f3e9ad262964dcfdfa9c73b8e07))

- **deps**: Relock against stage and keep pytest-xdist
  ([`76d4ec5`](https://github.com/opensemanticworld/panelini/commit/76d4ec5a5c2e110e7f8c5f439b758616e57624ca))

- **release**: Commit uv.lock with version bumps via psr assets
  ([`fd25dff`](https://github.com/opensemanticworld/panelini/commit/fd25dffe31124955f9ac14fa79f0088e20f26678))

### Continuous Integration

- **tests**: Parallelise the test suite with pytest-xdist
  ([`d8e18af`](https://github.com/opensemanticworld/panelini/commit/d8e18af59f014cbbe4530affd82f49d87ca20e42))

### Documentation

- Drop the generated API index page
  ([`1b469b2`](https://github.com/opensemanticworld/panelini/commit/1b469b28b76481efd7ad14f7056eb27f82790b7c))

- **ai**: Align portfolio, media, and docs with the chat history features
  ([`eb08965`](https://github.com/opensemanticworld/panelini/commit/eb08965219a14c873946fea0b7bd80b8a3eb2c65))

- **apidocs**: Generate the tanstack table api pages
  ([`fac9cba`](https://github.com/opensemanticworld/panelini/commit/fac9cba1eecbc61ddcc398552d612e7c6d81f6bc))

- **portfolio**: Exclude the filesystem browser from the pyodide apps
  ([`ca7a00b`](https://github.com/opensemanticworld/panelini/commit/ca7a00b8a9d4e0937a8a9103fd4420c0c86ed572))

- **tanstack**: Add a merged TanstackTable example
  ([`414512a`](https://github.com/opensemanticworld/panelini/commit/414512a372815ef021cebc481f0c5779eec9df9a))

- **tanstack**: Add the four example pages and the category index
  ([`5749ebb`](https://github.com/opensemanticworld/panelini/commit/5749ebbcd97cefa173fcf69aeab2576d5bf28b89))

- **tanstack**: Add the recorded media for the four table examples
  ([`c9cdfd4`](https://github.com/opensemanticworld/panelini/commit/c9cdfd48578a131c9a41545d9f312cb96007aab8))

- **tanstack**: Add the TanstackTable panel guide
  ([`5a860fd`](https://github.com/opensemanticworld/panelini/commit/5a860fd85b39e9ff61e920c232d4bf24ec188f37))

- **tanstack**: Add treegrid and filesystem examples, drop files into the explorer
  ([`2b9e836`](https://github.com/opensemanticworld/panelini/commit/2b9e836ce87f8b9dcaa030988c7f625b7a05fb9f))

- **tanstack**: Rename tanstack table (tst) examples
  ([`8355f27`](https://github.com/opensemanticworld/panelini/commit/8355f27a068de907ead2f2cb917402fbb152235f))

- **wunderbaum**: Add panel README with build step
  ([`18fa907`](https://github.com/opensemanticworld/panelini/commit/18fa907e1d15d696fbf4cba91a35ebe4d82f88ab))

- **wunderbaum**: Document drop bands and no-op rejection
  ([`56c1520`](https://github.com/opensemanticworld/panelini/commit/56c1520fb006eee2338d72ed9ac21e8144b7cc89))

- **wunderbaum**: Multi-select + drag example, test and media
  ([`d094a6f`](https://github.com/opensemanticworld/panelini/commit/d094a6f541ece1b5f8ecfdf987800e8c766089ea))

- **wunderbaum**: Playground copies into the root-level drop area
  ([`78fd03e`](https://github.com/opensemanticworld/panelini/commit/78fd03e6d2bc10148a9d3f8ab3f33a3db075977c))

### Features

- **ai**: Add chat history store interface with sqlite and memory backends
  ([`2dcbe35`](https://github.com/opensemanticworld/panelini/commit/2dcbe355acaece43270067b56d163d686390737c))

- **ai**: Add date-grouped conversation history sidebar
  ([`1aceb9f`](https://github.com/opensemanticworld/panelini/commit/1aceb9f113f6224efbab28491c5a5569623805cf))

- **ai**: Add pluggable user resolver with anonymous cookie fallback
  ([`67b5ce8`](https://github.com/opensemanticworld/panelini/commit/67b5ce8f964260efd62a911b749e88b22c9d9044))

- **ai**: Add wunderbaum folder tree view for chat history
  ([`a11c1a6`](https://github.com/opensemanticworld/panelini/commit/a11c1a67aceb4d706b7e876e081e99878613e7aa))

- **ai**: Auto-title chats and add history search
  ([`0110b58`](https://github.com/opensemanticworld/panelini/commit/0110b58b7d8a545b59d27870d5f5e12c1c3ab727))

- **ai**: File chats in several folders, rebuild the sidebar on TanstackTable
  ([`3576f93`](https://github.com/opensemanticworld/panelini/commit/3576f933222b0ec0c4a6b5f6c5403c7859c5d0b0))

- **ai**: Make the folder tree the standard history view
  ([`edcfa36`](https://github.com/opensemanticworld/panelini/commit/edcfa36e281255dec7663ea561b0e15837bdb643))

- **ai**: Make the folder tree the standard history view
  ([`7424f51`](https://github.com/opensemanticworld/panelini/commit/7424f51d8f9f9cc5b81f2472d0c4e707a0bb9a48))

- **ai**: Persist chat exchanges through optional history store
  ([`41fc5e6`](https://github.com/opensemanticworld/panelini/commit/41fc5e63a21493d7bddfc8e59504d692a27e98eb))

- **ai**: Persist chat history in the browser via a local storage component
  ([`675750a`](https://github.com/opensemanticworld/panelini/commit/675750a8ff98eb82a331d5ec289e07f66b69d54a))

- **ai**: Switch between list and tree history view at runtime
  ([`9797cff`](https://github.com/opensemanticworld/panelini/commit/9797cff94819f40c075a50923556b16dbf08ee83))

- **core**: Generalize user identity with header badge
  ([`9bc1602`](https://github.com/opensemanticworld/panelini/commit/9bc1602054c0aa2dcead004a832ec6bc623bf876))

- **tanstack**: Add an optional context menu with the toolbar actions
  ([`f50612f`](https://github.com/opensemanticworld/panelini/commit/f50612fe8a842d935c1b6c3f04d630ca94aecdcb))

- **tanstack**: Add an optional toolbar with view actions and search
  ([`d66cc2b`](https://github.com/opensemanticworld/panelini/commit/d66cc2b6732d5eed552b19a23f9151dea117e366))

- **tanstack**: Add column sizing with drag and keyboard resizing
  ([`7bee714`](https://github.com/opensemanticworld/panelini/commit/7bee7144432c0bb72c1bb8423ec301d549188339))

- **tanstack**: Add cut, copy and paste over a python clipboard
  ([`76366e5`](https://github.com/opensemanticworld/panelini/commit/76366e5d62aae343b5369a01f5d863119721aae3))

- **tanstack**: Add inline rename with a batched event channel
  ([`ff77102`](https://github.com/opensemanticworld/panelini/commit/ff771026347d01932797e3a779c20617bd2ecc21))

- **tanstack**: Add keyboard reorder, indent and outdent to the toolbar
  ([`279a742`](https://github.com/opensemanticworld/panelini/commit/279a7428e1e19f7695ea53913809761421d1ea81))

- **tanstack**: Add new folder, new file, delete, icons and quiet deselect
  ([`40adfbb`](https://github.com/opensemanticworld/panelini/commit/40adfbb83ee4a141e27fbfb1ab281f6a58ffae62))

- **tanstack**: Add pragmatic drag and drop tree reparenting
  ([`c2cad74`](https://github.com/opensemanticworld/panelini/commit/c2cad74fb4fdbf240d3d074a75275c13a8b33ec1))

- **tanstack**: Add tanstack tree row model with expandable columns
  ([`6520882`](https://github.com/opensemanticworld/panelini/commit/65208828d5f8fb59826796c399400c4a2c811e77))

- **tanstack**: Add tri-state hierarchical checkbox selection
  ([`984c27f`](https://github.com/opensemanticworld/panelini/commit/984c27f0a953234217fff7f3a6af4a7fe23c6f7a))

- **tanstack**: Add undo and redo over a python tree history
  ([`b3f56c4`](https://github.com/opensemanticworld/panelini/commit/b3f56c4d7eba730f9c903c6685aac8d97fbb9445))

- **tanstack**: Add unidirectional python tree state and public api
  ([`32c161a`](https://github.com/opensemanticworld/panelini/commit/32c161ae1b17b169f470aaf1fa234e91283fa296))

- **tanstack**: Defer bulk python mutations to one push and one undo step
  ([`793b03c`](https://github.com/opensemanticworld/panelini/commit/793b03c995c9a93ba3fd5225a21ca0f1d92bcf96))

- **tanstack**: Edit any column through an inline cell editor
  ([`fe18afe`](https://github.com/opensemanticworld/panelini/commit/fe18afe9eda7d2a58efd106e13aa9079a3837815))

- **tanstack**: Implement ARIA treegrid roles and keyboard navigation
  ([`5c6fdb6`](https://github.com/opensemanticworld/panelini/commit/5c6fdb62605dc3422d9da8939e1bc399604f3e05))

- **tanstack**: Keep file icons and types in step with a rename
  ([`835f2de`](https://github.com/opensemanticworld/panelini/commit/835f2de6c7ab6668e94cb9e1d671d6eec5829204))

- **tanstack**: Load a branch's children the first time it opens
  ([`e4506a1`](https://github.com/opensemanticworld/panelini/commit/e4506a197c709679fc4e127b401fd0e354dea433))

- **tanstack**: Open the editor a column's own type asks for
  ([`30110df`](https://github.com/opensemanticworld/panelini/commit/30110dff354e0dd271604d426f006cf39ce6e200))

- **tanstack**: Render filetype and folder icons
  ([`7d0dd8e`](https://github.com/opensemanticworld/panelini/commit/7d0dd8e0f0c5fc0b7551d1bc556f228eef86d39c))

- **tanstack**: Render only the rows a viewport can show
  ([`87a0a02`](https://github.com/opensemanticworld/panelini/commit/87a0a02c36ae940ecbb2641dc1dd11553ee94e13))

- **tanstack**: Resolve node fields through a type registry
  ([`03a8264`](https://github.com/opensemanticworld/panelini/commit/03a8264a6ea84905243f3765b53e5f3750337bd3))

- **tanstack**: Scaffold TanstackTable panel and vite lib build
  ([`e70991a`](https://github.com/opensemanticworld/panelini/commit/e70991ac8627e7222b0c2a5981fd8b871693915a))

- **tanstack**: Send the browser only the branches it has opened
  ([`588e59a`](https://github.com/opensemanticworld/panelini/commit/588e59af05ecdbec2f485ae88536201f452ff9f8))

- **tanstack**: Sort columns from a three state header control
  ([`50a988a`](https://github.com/opensemanticworld/panelini/commit/50a988a10451f358ae202ef43ad2aa6e6891572a))

- **tanstack**: Split the checkbox column from row selection
  ([`9635ffe`](https://github.com/opensemanticworld/panelini/commit/9635ffea21423bdbc3a0b6886d5304b7cd0065ed))

- **tanstack**: Take files dropped from the desktop as new nodes
  ([`9ebdbca`](https://github.com/opensemanticworld/panelini/commit/9ebdbca98ee320ce45de1567998f5801a262dcd4))

- **tanstack**: Transfer nodes by dragging between two tables
  ([`54ee582`](https://github.com/opensemanticworld/panelini/commit/54ee582e7cb6cf7e5b960bd99db5e4c3c1320b4d))

- **wunderbaum**: Deliver batched click events with regions and add row action icons
  ([`004dbc8`](https://github.com/opensemanticworld/panelini/commit/004dbc80240b912f9de2679bedfae4d9dd008b76))

- **wunderbaum**: Drop in the blank area appends at root level
  ([`9982f21`](https://github.com/opensemanticworld/panelini/commit/9982f213a2c8ee44be37a11bd040b0d3bec56cf8))

- **wunderbaum**: Emit externalDrop for drags from another tree
  ([`3864bfb`](https://github.com/opensemanticworld/panelini/commit/3864bfb3ba4ae1f48d46602eb018d3adb495f2a8))

- **wunderbaum**: Expose filterNodes and clearFilter to Python
  ([`1bf7b52`](https://github.com/opensemanticworld/panelini/commit/1bf7b52908ded1caf62e9a527494d15df070e373))

- **wunderbaum**: Same-tree drop moves the whole multi-selection
  ([`9b1e7c3`](https://github.com/opensemanticworld/panelini/commit/9b1e7c3ef0cc29b4d4239f7c610882f16338a8cd))

- **wunderbaum**: Windows explorer selection semantics
  ([`9d7c1b4`](https://github.com/opensemanticworld/panelini/commit/9d7c1b42177ead53542fbec6c736bc7924b7b038))

### Refactoring

- **ai**: Align chat history storage on a document schema
  ([`bece665`](https://github.com/opensemanticworld/panelini/commit/bece665e7454625bd21dd07a0127102bb826da3f))

- **ai**: Make chat history the standard, drop the welcome message and the default preview
  ([`65cc2e8`](https://github.com/opensemanticworld/panelini/commit/65cc2e8b72f4c47b2283d39950d614fcab1c20ce))

- **ai**: Serve ai examples via per-session factory for multi-user isolation
  ([`b57ed27`](https://github.com/opensemanticworld/panelini/commit/b57ed27093b06c66ea31d3be94883c7aa7589ef5))

- **tanstack**: Split the big tree example out of the filesystem browser
  ([`8b02e14`](https://github.com/opensemanticworld/panelini/commit/8b02e14798ad3958af73814e26fa4b576b46f6e7))

- **wunderbaum**: Always send drag keys as JSON array
  ([`111628c`](https://github.com/opensemanticworld/panelini/commit/111628cb11f5770bbf6733c6e1ac62e495f49814))

### Testing

- Allocate a free port per served app in module-scoped fixtures
  ([`b8edb18`](https://github.com/opensemanticworld/panelini/commit/b8edb18ca760450ccdf0a6320dba7f055ef2e643))

- **ai**: Confirm the list-view delete across a rebuild
  ([`9676230`](https://github.com/opensemanticworld/panelini/commit/9676230e3a8d577f4aa15d3045b63e225b0269b2))

- **ai**: Locate history rows by title instead of by index
  ([`5de0699`](https://github.com/opensemanticworld/panelini/commit/5de0699d3fbdc8a56ac90da98c00308951c8fa0d))

- **ai**: Retry row action clicks that a tree refresh steals
  ([`c0cf486`](https://github.com/opensemanticworld/panelini/commit/c0cf486cf8fc32f0741db50aeef95c5ca56b96eb))

- **portfolio**: Verify the tanstack apps render and reach python in wasm
  ([`cc6d49e`](https://github.com/opensemanticworld/panelini/commit/cc6d49e1d1838509264abba9c4706f35f7ababbf))

- **tanstack**: Assert what the three examples promise
  ([`25bacf2`](https://github.com/opensemanticworld/panelini/commit/25bacf20e861a1b6653c460047b2eb1b61a090b9))

- **tanstack**: Close the teardown stop race and the undo focus race
  ([`6a3fe83`](https://github.com/opensemanticworld/panelini/commit/6a3fe83353715208a1381aa083be464ad1e8a876))

- **tanstack**: Cover tree helpers, bridge events and treegrid a11y
  ([`aa36701`](https://github.com/opensemanticworld/panelini/commit/aa367016473f05ab6fcb5ea4036a726f5544b525))

- **tanstack**: Fix the macOS ctrl click and the expand-all race, close the coverage gap
  ([`b8c1748`](https://github.com/opensemanticworld/panelini/commit/b8c17484a40387acd27f6f3ea38296df38de20f1))

- **tanstack**: Fix the ubuntu move-shortcut and teardown races
  ([`c5616b3`](https://github.com/opensemanticworld/panelini/commit/c5616b3e8ed9533681b79eaffc24f3a97b758394))

- **tanstack**: Follow the example split in the browser tests and the media
  ([`d1ad003`](https://github.com/opensemanticworld/panelini/commit/d1ad0039af66273a05983daa47329e015758bc6f))

- **tanstack**: Record docs media for the three table examples
  ([`c9ea96a`](https://github.com/opensemanticworld/panelini/commit/c9ea96a6793b4aa9d5d13f688574688913c46720))

- **wunderbaum**: Guard bounding_box results in the blank-area helper
  ([`9bce4b6`](https://github.com/opensemanticworld/panelini/commit/9bce4b647bdc92e686ae28320d230b61b856a437))

- **wunderbaum**: Return bool from wait_until predicates
  ([`904f57b`](https://github.com/opensemanticworld/panelini/commit/904f57bee5108d52c6dbfb3e60bbaf576b932595))

- **wunderbaum**: Use Cmd as the toggle modifier on macOS
  ([`ea466d1`](https://github.com/opensemanticworld/panelini/commit/ea466d14977e87c4dee44db10e8374f4502f514c))

- **wunderbaum**: Wait for the status pane after adding a child
  ([`bc6e893`](https://github.com/opensemanticworld/panelini/commit/bc6e893a0bd716f3a6218850a623063c321f16dc))


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
