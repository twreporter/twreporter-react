BIN_DIR ?= node_modules/.bin
RELEASE_BRANCH ?= $(ARGS)
PROD_NODE_ENV ?= production

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
	@echo "\033[33m[webpack]\033[0m build client side bundles and write their filepaths into webpack-asset.json"
	NODE_ENV=$(PROD_NODE_ENV) $(BIN_DIR)/webpack --config webpack.config.js --progress --colors
	#@echo "\033[33m[webpack]\033[0m build service-worker"
	#NODE_ENV=$(PROD_NODE_ENV) $(BIN_DIR)/webpack --config webpack-service-worker.config.js --progress --colors

# transiple es6 files into es5 
build-server:
	@echo "\033[33m[babel]\033[0m transpile es6 files into es5"
	NODE_ENV=$(PROD_NODE_ENV) RELEASE_BRANCH=$(RELEASE_BRANCH) BABEL_ENV=ssr $(BIN_DIR)/babel src --out-dir dist --copy-files

build-pm2-config:
	@echo "\033[33m[PM2]\033[0m generate processes.json"
	RELEASE_BRANCH=$(RELEASE_BRANCH) node build-pm2-processes.js

build: clean build-webpack build-server build-pm2-config

start-server:
	@echo "\033[33m[PM2]\033[0m start application server"
	NODE_ENV=$(PROD_NODE_ENV) $(BIN_DIR)/pm2 start processes.json

start: build start-server

stop: 
	@echo "\033[33m[PM2]\033[0m stop application server"
	@$(BIN_DIR)/pm2 kill

start-testing-server: 
	@echo " $(P) start testing server by babel-node src/testing-server.js\n"
	@$(BIN_DIR)/babel-node src/testing-server.js

start-dev-server: 
	@echo " $(P) start dev server by nodemon src/server.js\n"
	NODE_ENV=development RELEASE_BRANCH=$(RELEASE_BRANCH) BABEL_ENV=ssr $(BIN_DIR)/nodemon src/server.js --exec $(BIN_DIR)/babel-node

start-webpack-dev-server:
	@echo " $(P) start webpack dev server by node webpack-dev-server.js\n"
	NODE_ENV=development RELEASE_BRANCH=$(RELEASE_BRANCH) node webpack-dev-server.js

dev:  
	@echo "Setup development environment."
	@echo "Development environment will contains three different servers."
	@echo "One will be application server, hosted on 3000 port."
	@echo "Another will be webpack dev server, hosted on 5000 port."
	@echo "The other will be mocked api server, hosted on 8080 port."
	@$(BIN_DIR)/concurrently --kill-others "$(MAKE) start-webpack-dev-server" "$(MAKE) start-dev-server" "$(MAKE) start-testing-server"

test:
	@echo "Run unit tests"
	@$(BIN_DIR)/mocha $(TEST_SCRIPTS_FILES) --compilers js:babel-core/register --reporter $(REPORTER)

ui-test:
	@echo "Run UI-test"
	@$(BIN_DIR)/mocha $(SCREENSHOT_TEST_SCRIPT) --compilers js:babel-core/register --require babel-polyfill --reporter $(REPORTER) --local 3000	

clean: 
	@echo "delete auto generated files, including processes.json, sw.js, dist/ and webpack-assets.json\n"
	@$(BIN_DIR)/rimraf processe.json sw.js dist webpack-assets.json

.PHONY: help clean build start stop dev test ui-test
