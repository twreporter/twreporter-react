[![CircleCI](https://circleci.com/gh/twreporter/twreporter-react/tree/master.svg?style=shield)](https://circleci.com/gh/twreporter/twreporter-react/tree/master)
[![Tag](https://img.shields.io/github/tag/twreporter/twreporter-react.svg)](https://github.com/twreporter/twreporter-react/tags)
[![Join the chat at https://gitter.im/twreporter/twreporter-react](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/twreporter/twreporter-react?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# TW Reporter

New Media foundation in Taiwan.

# Contains

- [x] [PWA](https://developers.google.com/web/progressive-web-apps/)
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

## Package linking management

We use [`yalc`](https://github.com/whitecolor/yalc) to manage the package linking.

For example, if we want to test WIP `@twreporter/react-article-components` in `twreporter-react`, the workflow will be:

1. At `twreporter-npm-packages/packages/react-article-components`, run `yalc publish`
2. At `twreporter-react`, run `yalc add @twreporter/react-article-components`. The `yalc` will copy the files in `twreporter-npm-packages/packages/react-article-components` to `twreporter-react/.yalc` and `twreporter/node_modules`. It will only take files as if we publish with `npm publish`. And `yalc` will inject the linked package hash into `twreporter-react/packages.json`, so we can know we are using developing packages.
3. After tested okay, we can use `yalc remove --all` at `twreporter-react` to remove all files and injection in `twreporter-react`

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
