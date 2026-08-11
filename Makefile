.PHONY: install
install: ## Install the virtual environment and install the pre-commit hooks
	@echo "🚀 Creating virtual environment using uv"
	@uv sync --all-extras
	@uv run pre-commit install

.PHONY: check
check: ## Run code quality tools.
	@echo "🚀 Checking lock file consistency with 'pyproject.toml'"
	@uv lock --locked
	@echo "🚀 Linting code: Running pre-commit"
	@uv run pre-commit run -a
	@echo "🚀 Static type checking: Running ty"
	@uv run ty check
	@echo "🚀 Checking for obsolete dependencies: Running deptry"
	@uv run deptry src

.PHONY: test
test: ## Test the primary code with pytest
	@echo "🚀 Testing code: Running primary pytest"
	@uv run pytest -m "not ui" --cov --cov-config=pyproject.toml --cov-report=xml

.PHONY: test-ui
test-ui: ## Run UI tests with Playwright in headless mode
	@echo "🚀 Installing Playwright browsers"
	@uv run playwright install
	@echo "🚀 Running UI tests with Playwright (headless)"
	@uv run pytest -m "ui and not portfolio" --cov --cov-config=pyproject.toml --cov-report=xml

.PHONY: test-ui-headed
test-ui-headed: ## Run UI tests with Playwright in headed mode
	@echo "🚀 Installing Playwright browsers"
	@uv run playwright install
	@echo "🚀 Running UI tests with Playwright"
	@uv run pytest -m "ui and not portfolio" --headed --slowmo 1000 --pdb --cov --cov-config=pyproject.toml --cov-report=xml

.PHONY: test-full
test-full: ## Test the code with pytest
	@echo "🚀 Testing code: Running full pytest"
	@uv run pytest -m "not portfolio" --cov --cov-config=pyproject.toml --cov-report=xml

.PHONY: test-portfolio
test-portfolio: portfolio ## Verify representative built Pyodide apps render in a browser (one per category)
	@echo "🚀 Installing Playwright browsers"
	@uv run playwright install chromium
	@echo "🚀 Verifying representative Pyodide apps (*_panel_min)"
	@uv run pytest -m portfolio -k panel_min tests/portfolio

.PHONY: test-portfolio-all
test-portfolio-all: portfolio ## Verify ALL built Pyodide apps render in a browser (the scoreboard)
	@echo "🚀 Installing Playwright browsers"
	@uv run playwright install chromium
	@echo "🚀 Verifying every Pyodide app"
	@uv run pytest -m portfolio tests/portfolio

.PHONY: build
build: clean-build ## Build wheel file
	@echo "🚀 Creating wheel file"
	@uvx --from build pyproject-build --installer uv

.PHONY: clean-build
clean-build: ## Clean build artifacts
	@echo "🚀 Removing build artifacts"
	@uv run python -c "import shutil; import os; shutil.rmtree('dist') if os.path.exists('dist') else None"

.PHONY: publish
publish: ## Publish a release to PyPI.
	@echo "🚀 Publishing."
	@uvx twine upload --repository-url https://upload.pypi.org/legacy/ dist/*

.PHONY: build-and-publish
build-and-publish: build publish ## Build and publish.

.PHONY: portfolio
portfolio: ## Build/refresh the Pyodide portfolio apps (incremental; only changed examples rebuild)
	@echo "🚀 Building Pyodide portfolio apps (unchanged apps are skipped)"
	@uv run python docs/gen_portfolio.py --convert

.PHONY: portfolio-force
portfolio-force: ## Rebuild every Pyodide portfolio app, even unchanged ones
	@echo "🚀 Rebuilding all Pyodide portfolio apps"
	@uv run python docs/gen_portfolio.py --convert --force

.PHONY: docs-test
docs-test: ## Test if documentation can be built without warnings or errors
	@uv run sphinx-build -b html docs docs/_build/html -W --keep-going

.PHONY: docs
docs: ## Build and serve the documentation
	@uv run sphinx-autobuild docs docs/_build/html --port 8000 --open-browser

.PHONY: docs-media
docs-media: ## Record docs media from @pytest.mark.media tests (commit the output)
	@echo "🚀 Installing Playwright browsers"
	@uv run playwright install
	@echo "🚀 Recording docs media (Playwright video -> WebP/PNG/MP4)"
	@uv run pytest -m media --record-media --slowmo 150

.PHONY: help
help:
	@uv run python -c "import re; \
	[[print(f'\033[36m{m[0]:<20}\033[0m {m[1]}') for m in re.findall(r'^([a-zA-Z_-]+):.*?## (.*)$$', open(makefile).read(), re.M)] for makefile in ('$(MAKEFILE_LIST)').strip().split()]"

.DEFAULT_GOAL := help
