# TW Reporter
New Media foundation in Taiwan.

# Environment
  Install node(https://nodejs.org/en/) v5.x.x first.

# Installation
    $ npm install

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
  selectedArticle: {
    isFetching: true,
    slug: 'i-am-a-article-slug',
  }
  entities: {
    athours: {
      2: {
        id: 2,
        name: 'Mika',
        email: 'contact@twreporter.org'
      },
      3: {
        id: 3,
        name: 'HC',
        email: 'contact@twreporter.org'
      }
    },
    articles: {
      'i-am-a-article-slug': {
        id: '4',
        slug: 'i-am-a-article-slug',
        title: 'show me the twreporter article',
        authors: [2, 3]
      },
      'i-am-a-article-slug-2': {
        id: 14,
        slug: 'i-am-a-article-slug-2',
        title: 'this is another article',
        authors: [2]
      }
    }
  },
  articlesByTags: {
    index: {
      isFetching: false,
      total: 2,
      current: 2,
      items: ['i-am-a-article-slug', 'i-am-a-article-slug-2']
    },
    intl: {
      isFetching: true,
      total: 0,
      current: 0,
      items: []
    },
    taiwan: {
      isFetching: false,
      total: 1,
      current: 1,
      items: ['i-am-a-article-slug-2']
    }
  }
}

```

# Reference
[react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example)
[Redux](https://github.com/reactjs/redux)
[React](https://github.com/facebook/react)

# License

MIT http://mit-license.org
