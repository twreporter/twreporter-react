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
    isFetching: false,
    slug: 'article-slug-1',
    error: null,
    lastUpdated: 1461656746427
  }
  entities: {
    athours: {
      'author-id-2': {
        id: 'author-id-2',
        name: 'Mika',
        bio: ''
        email: 'contact@twreporter.org'
      },
      'author-id-3': {
        id: 'author-id-3',
        name: 'HC',
        bio: '',
        email: 'contact@twreporter.org'
      }
    },
    categories: {
      'category-id-1': {
        id: "category-id-1",
        key: "category-1",
        name: "category-1",
        _v: 0,
        sortOrder: 1
      }, 
      'category-id-2': {        
        id: "category-id-2",
        key: "category-2",
        name: "category-2",
        _v: 0,
        sortOrder: 2
      }
    },
    tags: {
      'tag-id-1': {
        id: "tag-id-1",
        key: "tag-1",
        v: 0,
        name: "tag-1"
      }, 
      'tag-id-2': {
        id: "tag-id-2",
        key: "tag-2",
        v: 0,
        name: "tag-2"
      }
    },
    articles: {
      'article-slug-1': {
        relateds: ['article-slug-2'],
        _updated: "Thu, 01 Jan 1970 00:00:00 GMT",
        style: "article",
        byline: "文/mika 攝/HC",
        subtitle: "",
        name: "article-slug-1",
        tags: ['tag-id-1'],
        title: "測試文章",
        publishedDate: "Fri, 29 Apr 2016 08:05:25 GMT",
        content: {
          brief: {
            html: "",
            draft: {...},
            apiData: [...]
          },
          extend: {
            html: "",
            draft: {...},
            apiData: [...]
          }
        },
        state: "published",
        og_description: "",
        authors: ['author-id-2', 'author-id-3'],
        og_title: "",
        id: "article-id-1",
        slug: "article-slug-1",
        categories: ['category-id-1'],
        created: "Thu, 01 Jan 1970 00:00:00 GMT"
      },
      'article-slug-2': {
        ...
      }
    }
  },
  tags: {
    'tag-1': {
      isFetching: false,
      error: null, 
      id: 'tag-id-1'
    },
    'tag-2': {
      isFetching: false,
      error: null, 
      id: 'tag-id-2'
    }
  },
  categories: {
    'category-1': {
      isFetching: false,
      error: null, 
      id: 'category-id-1'
    },
    'category-2': {
      isFetching: false,
      error: null, 
      id: 'category-id-2'
    }
  },
  articlesByCats: {
    'category-1': {
      isFetching: false,
      error: null,
      nextUrl: "http://104.199.134.142:8080/posts?where={%22categories%22:{%22$in%22:%22category-id-1%22}}embedded={%22categories%22:1,%20%22tags%22:1}&max_results=1&page=3",
      items: ['article-slug-1', 'article-slug-2'],
      lastUpdated: 1234567890
    },
    'category-2': {
      isFetching: true,
      error: null,
      nextUrl: null,
      items: []
    },
    'category-3': {
      isFetching: false,
      error: Error("API return 500"),
      nextUrl: null,
      items: []
    }
  },
  articlesByTags: {
    'tag-1': {
      isFetching: false,
      error: null,
      nextUrl: "http://104.199.134.142:8080/posts?where={%22tags%22:{%22$in%22:%22tag-id-1%22}}embedded={%22categories%22:1,%20%22tags%22:1}&max_results=1&page=3",
      items: ['article-slug-1', 'article-slug-2'],
      lastUpdated: 1234567890
    },
    'tag-2': {
      isFetching: true,
      error: null,
      nextUrl: null,
      items: []
    },
    'tag-3': {
      isFetching: false,
      error: Error("API return 500"),
      nextUrl: null,
      items: []
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
