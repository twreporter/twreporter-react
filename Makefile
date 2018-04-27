BIN_DIR ?= node_modules/.bin
RELEASE_BRANCH ?= $(ARGS)
PROD_NODE_ENV ?= production

help:
	@echo "'make dev' to start dev servers"
	#@echo "'make stop-dev' to stop dev servers"
	@echo "'make build' to build production webpack assets and transiple es6 files to es5"
	@echo "'make clean' to clean the old builds"
	@echo "'make start' to start production server"
	@echo "'make stop' to stop production server"

build: clean build-webpack build-server

# build-webpack:
#		NODE_ENV=$(PROD_NODE_ENV) $(BIN_DIR)/webpack --config webpack-service-worker.config.js --progress --colors
build-webpack:
	NODE_ENV=$(PROD_NODE_ENV) $(BIN_DIR)/webpack --config webpack.config.js --progress --colors

build-server:
	NODE_ENV=$(PROD_NODE_ENV) RELEASE_BRANCH=$(RELEASE_BRANCH) BABEL_ENV=ssr $(BIN_DIR)/babel src --out-dir dist --copy-files

start-server:
	NODE_ENV=$(PROD_NODE_ENV) $(BIN_DIR)/pm2 start processes.json

start: build start-server

stop: 
	@$(BIN_DIR)/pm2 kill

start-testing-server: 
	@echo "start testing server by babel-node src/test-server.js"
	@$(BIN_DIR)/babel-node src/testing-server.js

start-dev-server: 
	@echo "start dev server by nodemon src/server.js"
	NODE_ENV=development RELEASE_BRANCH=$(RELEASE_BRANCH) BABEL_ENV=ssr $(BIN_DIR)/nodemon src/server.js --exec $(BIN_DIR)/babel-node

start-webpack-dev-server:
	@echo "start webpack dev server by node webpack-dev-server.js"
	NODE_ENV=development node webpack-dev-server.js

#stop-dev: 
#	@$(BIN_DIR)/forever stopall

dev:  
	@$(BIN_DIR)/concurrently --kill-others "$(MAKE) start-webpack-dev-server" "$(MAKE) start-dev-server" "$(MAKE) start-testing-server" 

clean: 
	@$(BIN_DIR)/rimraf dist webpack-assets.json

.PHONY: help clean build start stop dev
