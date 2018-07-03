[![CircleCI](https://circleci.com/gh/twreporter/twreporter-react/tree/master.svg?style=shield)](https://circleci.com/gh/twreporter/twreporter-react/tree/master)
[![Tag](https://img.shields.io/github/tag/twreporter/twreporter-react.svg)](https://github.com/twreporter/twreporter-react/tags)
[![Join the chat at https://gitter.im/twreporter/twreporter-react](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/twreporter/twreporter-react?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# TW Reporter
New Media foundation in Taiwan.

# Contains
- [x] [Webpack](https://webpack.github.io)
- [x] [Babel](https://babeljs.io/)
- [x] [React](https://facebook.github.io/react/)
- [x] [Redux](https://github.com/reactjs/redux)
- [x] Isomorphic/Universal rendering
- [x] [Express](https://github.com/expressjs/express.git)
- [x] Hot Module Replacement
- [x] Code splitting

# Environment
  Install node(https://nodejs.org/en/) @7.9.0 above.

# Installation
`yarn install`

# Production start
`make start`

# Development start
`make dev`

# Build docker image
```
// install dependencies first
yarn install

// build the webpack bundles and transpile es6 to es5
make build

// build docker image
docker build -t twreporter-react:latest .
```

# Testing

Run unit tests

```
make test
```

Run ui-test (It will take some time to compare screenshots)

```
// start dev servers for ui-test
make dev
// run ui-test
make ui-test
```

# License
* Copyright (C) 2015 - 2018 The Reporter 報導者. All rights reserved.
* Distributed under the GNU AGPL v3.0
