# Contributing to `panelini`

Contributions are welcome, and they are greatly appreciated!
Every little bit helps, and credit will always be given.

You can contribute in many ways:

## Types of Contributions

### Report Bugs

Report bugs at [https://github.com/opensemanticworld/panelini/issues.](https://github.com/opensemanticworld/panelini/issues)

If you are reporting a bug, please include:

- Your operating system name and version.
- Any details about your local setup that might be helpful in troubleshooting.
- Detailed steps to reproduce the bug.

### Fix Bugs

Look through the GitHub issues for bugs.
Anything tagged with "bug" and "help wanted" is open to whoever wants to implement a fix for it.

### Implement Features

Look through the GitHub issues for features.
Anything tagged with "enhancement" and "help wanted" is open to whoever wants to implement it.

### Write Documentation

panelini could always use more documentation, whether as part of the official docs, in docstrings, or even on the web in blog posts, articles, and such.

### Submit Feedback

The best way to send feedback is to file an issue at [https://github.com/opensemanticworld/panelini/issues.](https://github.com/opensemanticworld/panelini/issues)

If you are proposing a new feature:

- Explain in detail how it would work.
- Keep the scope as narrow as possible, to make it easier to implement.
- Remember that this is a volunteer-driven project, and that contributions
  are welcome :)

## Get Started

Ready to contribute? Here's how to set up `panelini` for local development.
Please note this documentation assumes you already have `uv` and `Git` installed and ready to go.

1. Fork the `panelini` repo on GitHub.

2. Clone your fork locally:

      ```bash
      cd <directory_in_which_repo_should_be_created>
      git clone git@github.com:YOUR_NAME/panelini.git
      ```

3. Now we need to install the environment. Navigate into the directory

      ```bash
      cd panelini
      ```

   Then, install and activate the environment with:

      ```bash
      uv sync --all-extras
      ```

      `--all-extras` is required: plain `uv sync` skips the optional
      `ai`/`ai-drawio`/`ai-llm-sandbox`/`ai-osw` extras, and `make
      check` (mypy, deptry) will fail on those code paths without
      them installed.

4. Install pre-commit to run linters/formatters at commit time:

      ```bash
      uv run pre-commit install
      ```

5. Create a branch for local development:

      ```bash
      git checkout -b name-of-your-bugfix-or-feature
      ```

      Now you can make your changes locally.

6. Don't forget to add test cases for your added functionality to the `tests` directory.

7. When you're done making changes, check that your changes pass the formatting tests.

      ```bash
      make check
      ```

8. Now, validate that all unit tests are passing:

      ```bash
      make test
      ```

9. (Optional) Run UI tests with Playwright to test browser interactions:

      ```bash
      make test-ui
      ```

      This will:
      - Install Playwright browsers automatically
      - Run UI tests in headed mode (visible browser) with slow motion
      - Pause on errors for debugging (--pdb flag)

      **Note:** UI tests are automatically skipped in CI environments but can be run locally for manual testing and debugging.

10. Before raising a pull request you should also run tox.
   This will run the tests across different versions of Python:

      ```bash
      tox
      ```

      This requires you to have multiple versions of python installed.
      This step is also triggered in the CI/CD pipeline, so you could also choose to skip this step locally.

11. Commit your changes using
    [Conventional Commits](https://www.conventionalcommits.org/) and
    push your branch to GitHub:

      ```bash
      git add .
      git commit -m "fix: correct sidebar collapse on small screens"
      git push origin name-of-your-bugfix-or-feature
      ```

12. Submit a pull request through the GitHub website.

## Pull Request Guidelines

Before you submit a pull request, check that it meets these guidelines:

1. The pull request should include tests.

2. If the pull request adds functionality, the docs should be updated.
   Put your new functionality into a function with a docstring, and add the feature to the list in `README.md`.

## Commit Messages and Releases

Releases are fully automated with
[python-semantic-release](https://python-semantic-release.readthedocs.io/),
driven by your commit messages. Please write commits as
`type(scope): subject`, for example:

- `feat: ...` for a new feature (bumps the minor version)
- `fix: ...` for a bug fix (bumps the patch version)
- `perf: ...` for a performance improvement (bumps the patch version)
- `BREAKING CHANGE:` in the commit body (bumps the major version)
- `docs:`, `chore:`, `test:`, `refactor:`, `ci:`, `style:` for everything
  else that shouldn't trigger a release on its own

You do not need to bump the version yourself or edit `CHANGELOG.md`.
Once your pull request is open, CI posts a comment with the version
that would be released if it's merged, so you can check the outcome
before merging. `main` requires one approving review; once merged, CI
bumps the version, updates the changelog, tags the release, publishes
to PyPI, and deploys the docs automatically.
