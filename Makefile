BIN_DIR ?= node_modules/.bin
RELEASE_BRANCH ?= $(ARGS)
PROD_NODE_ENV ?= production
SERVER_RENDER_ENV ?= server
P="\\033[32m[+]\\033[0m"

TEST_SCRIPTS_FILES := $(shell find src -name '*.test.js' -not -path "src/test/screenshot.test.js")
SCREENSHOT_TEST_SCRIPT := src/test/screenshot.test.js
REPORTER = spec

help:
	@echo "\033[33mmake dev\033[0m - start dev servers"
	@echo "\033[33mmake build\033[0m - build production webpack assets and transiple es6 files to es5"
	@echo "\033[33mmake clean\033[0m - clean the old builds"
	@echo "\033[33mmake start\033[0m - start application server"
	@echo "\033[33mmake stop\033[0m - stop application server"
	@echo "\033[33mmake test\033[0m - run unit tests and UI tests"

# build webpacks client side needed
build-webpack: 
	@echo "\033[33m[webpack]\033[0m build client side bundles"
	NODE_ENV=$(PROD_NODE_ENV) $(BIN_DIR)/webpack --config webpack.config.js --colors

build-service-worker: 
	@echo "\033[33m[service-worker]\033[0m genereate service worker by babel-node service-worker/service-worker-generator.js"
	NODE_ENV=$(PROD_NODE_ENV) RELEASE_BRANCH=$(RELEASE_BRANCH) $(BIN_DIR)/babel-node service-worker/service-worker-generator.js

# transiple es6 files into es5 
build-server:
	@echo "\033[33m[babel]\033[0m transpile es6 files into es5"
	NODE_ENV=$(PROD_NODE_ENV) RELEASE_BRANCH=$(RELEASE_BRANCH) RENDER_ENV=$(SERVER_RENDER_ENV) $(BIN_DIR)/babel src --out-dir dist --copy-files

build: clean build-webpack build-service-worker build-server

start-server:
	@echo "\033[33m[NODE]\033[0m start application server"
	NODE_ENV=$(PROD_NODE_ENV) node dist/server.js

start: build start-server

start-testing-server: 
	@echo " $(P) start testing server by babel-node src/testing-server.js\n"
	@$(BIN_DIR)/babel-node src/testing-server.js

start-dev-server: 
	@echo " $(P) start dev server by nodemon src/server.js\n"
	NODE_ENV=development RELEASE_BRANCH=$(RELEASE_BRANCH) RENDER_ENV=$(SERVER_RENDER_ENV) $(BIN_DIR)/nodemon src/server.js --exec $(BIN_DIR)/babel-node

start-webpack-dev-server:
	@echo " $(P) start webpack dev server by node webpack-dev-server.js\n"
	NODE_ENV=development RELEASE_BRANCH=$(RELEASE_BRANCH) node webpack-dev-server.js

dev: clean 
	@echo "Setup development environment."
	@echo "Development environment will contains three different servers."
	@echo "One will be application server, hosted on 3000 port."
	@echo "Another will be webpack dev server, hosted on 5000 port."
	@echo "The other will be mocked api server, hosted on 8080 port."
	@$(BIN_DIR)/concurrently --kill-others "$(MAKE) start-webpack-dev-server" "$(MAKE) start-dev-server" "$(MAKE) start-testing-server"

ui-test:
	@echo "Run UI-test"
	@$(BIN_DIR)/mocha $(SCREENSHOT_TEST_SCRIPT) --compilers js:babel-core/register --require babel-polyfill --reporter $(REPORTER) --local 3000	

clean: 
	@echo "delete auto generated files, including processes.json, sw.js, dist/, webpack-assets.json and react-loadabel.json\n"
	@$(BIN_DIR)/rimraf processe.json sw.js dist webpack-assets.json react-loadable.json

build-babelrc:
	@build .babelrc depends on the NODE_ENV and RENDER_ENV

prettier:
	@echo "$(P) Run prettier"
	$(BIN_DIR)/prettier --write "**/*.{js,json,css,md,html,htm}"

lint:
	@echo "$(P) Run eslint with --fix"
	$(BIN_DIR)/eslint --fix "**/*.js"

.PHONY: help clean build start dev test ui-test lint prettier
