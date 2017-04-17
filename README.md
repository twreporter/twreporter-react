[![Build Status](https://travis-ci.org/twreporter/twreporter-react.svg?branch=master)](https://travis-ci.org/twreporter/twreporter-react)

# TW Reporter
New Media foundation in Taiwan.

# Environment
  Install node(https://nodejs.org/en/) v4.x.x or v6.x.x first.

# Installation
    $ npm install

# Pre-process
    $ cp api/config.example.js api/config.js 
edit api/config.js to connect to your own api host <br />
if you have no api server, you can follow [this](https://github.com/twreporter/twreporter-react/blob/revamp/README.md#build-your-own-api) to build your own API layer.

## Build your own API
Before starting up twreporter-react, you may need serveral API endpoints to provide the articles.<br/>
If you don't have these endpoints, you can follow next steps to build up your own API layer.

### FIRST STEP: create a CMS 
You can use [CMS of twreporter](https://github.com/twreporter/plate) to create your own CMS.<br/>
Since you have your own CMS, you can create, edit and delete those articles you want to show on your twreporter-react site.

### SECOND STEP: start up an API server
[tr-projects-rest](https://github.com/twreporter/tr-projects-rest) is used to start up a RESTful webservice which is created for [CMS of twreporter](https://github.com/twreporter/plate).<br />

### THIRD STEP: edit api config to connect to your own API
edit the api/config.js, and connect to your own API host.<br />

After doing these setups, you can start up your twreporter-react site.

# Development
    $ npm run dev
  
# Production
    $ npm run build; npm run start

## React & Redux
This project is built on Redux framework and rendered by React.
It uses server-side(universal) rendering, and also integrate ```Webpack Hot Middleware``` in Dev environment.

## Redux State
Since Redux see its state as single source of truth, we store our own data like the plain object below.
```
{
  articlesByUuids: {
    73177cb8c0c261000b3f6d2: {
      error: null,
      hasMore: true,
      isFetching: false,
      items: [
        "57ecfc9061fdfb0f009f87a4",
        "57eb6d3361fdfb0f009f879f"
      ],
      lastUpdated: 1475302285419,
      total: 233
    }
  },
  categories: {},
  device: "desktop",
  entities:{
    articles: {
      57ecfc9061fdfb0f009f87a4: {
        ... // fields of article
      },
      57eb6d3361fdfb0f009f879f: {
        ... //fields of article
      }
    },
    categories: {
      573177cb8c0c261000b3f6d2: {
        id: "573177cb8c0c261000b3f6d2",
        key: "573177cb8c0c261000b3f6d2",
        name: "評論",
        sortOrder: 6,
        v: 0
      }
    },
    tags: {},
    topics: {}
  },
  featureArticles: {
    error: null,
    isFetching: false,
    items: [],
    lastUpdated: 1475302285397
  },
  header: {},
  relatedArticles: {},
  routing: {},
  selectedArticle: {
    error: null,
    id: "57ecfc9061fdfb0f009f87a4",
    isFetching: false, 
    lastUpdated: 1475303011138,
    slug: "photo-taichung-flaneur"
  },
  slugToId: {
    photo-taichung-flaneur: "57ecfc9061fdfb0f009f87a4",
    chen-chin-feng-illustrator: "57eb6d3361fdfb0f009f879f"
  },
  tags: {}
}
```
# Reference
[react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example)
[Redux](https://github.com/reactjs/redux)
[React](https://github.com/facebook/react)

# License
* Copyright (C) 2015 - 2016 The Reporter 報導者. All rights reserved.
* Distributed under the GNU AGPL v3.0

