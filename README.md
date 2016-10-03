# TW Reporter
New Media foundation in Taiwan.

# Environment
  Install node(https://nodejs.org/en/) v4.x.x or v6.x.x first.

# Installation
    $ npm install

# Pre-process
    $ cp api/config.example.js api/config.js 
    // edit api/config.js to connect to your own api host
    // if you have no api server, you can use this [CMS](https://github.com/twreporter/plate) and this [API SERVER](https://github.com/twreporter/tr-projects-rest) to build your own API layer.
  
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

