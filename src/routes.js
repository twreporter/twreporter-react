import FallbackPage from './containers/ServiceWorkerFallbackPage'
import Loadable from 'react-loadable'
import React from 'react'
import SystemError from './components/SystemError'
import dataLoaders from './data-loaders/index'
import get from 'lodash/get'
import routesConst from './constants/routes'
import statusCodeConst from './constants/status-code'

const _ = {
  get
}

class LoadingComponent extends React.Component {
  render() {
    const { error } = this.props
    if (error) {
      // error should be caught by scr/components/ErrorBoundary component
      throw error
    }
    return null
  }
}

const loadablePages = {
  home: Loadable({
    loader: () => import(
      /* webpackChunkName: "index-page" */
      './containers/Home'
    ),
    loading: LoadingComponent
  }),
  topic: Loadable({
    loader: () => import(
      /* webpackChunkName: "topic-page" */
      './containers/TopicLandingPage'
    ),
    loading: LoadingComponent
  }),
  topics: Loadable({
    loader: () => import(
      /* webpackChunkName: "topic-list-page" */
      './containers/Topics'
    ),
    loading: LoadingComponent
  }),
  category: Loadable({
    loader: () => import(
      /* webpackChunkName: "category-list-page" */
      './containers/Category'
    ),
    loading: LoadingComponent
  }),
  tag: Loadable({
    loader: () => import(
      /* webpackChunkName: "tag-list-page" */
      './containers/Tag'
    ),
    loading: LoadingComponent
  }),
  article: Loadable({
    loader: () => import(
      /* webpackChunkName: "article-page" */
      './containers/Article'
    ),
    loading: LoadingComponent
  }),
  author: Loadable({
    loader: () => import(
      /* webpackChunkName: "author-page" */
      './containers/Author'
    ),
    loading: LoadingComponent
  }),
  authors: Loadable({
    loader: () => import(
      /* webpackChunkName: "author-list-page" */
      './containers/AuthorsList'
    ),
    loading: LoadingComponent
  }),
  photography: Loadable({
    loader: () => import(
      /* webpackChunkName: "photography-page" */
      './containers/Photography'
    ),
    loading: LoadingComponent
  }),
  search: Loadable({
    loader: () => import(
      /* webpackChunkName: "search-page" */
      './containers/Search'
    ),
    loading: LoadingComponent
  }),
  aboutUs: Loadable({
    loader: () => import(
      /* webpackChunkName: "about-us-page" */
      './components/about-us'
    ),
    loading: LoadingComponent
  }),
  bookmarkList: Loadable({
    loader: () => import(
      /* webpackChunkName: "bookmark-list" */
      './containers/BookmarkList'
    ),
    loading: LoadingComponent
  })
}

/**
 *  getRoutes function
 *  uses `react-loadable` to do the code splitting,
 *  and adopts react-router
 *  to render the corresponding React components
 *
 *  @returns {object} Switch component of react-router v4
 */
export default function getRoutes() {
  return [
    {
      component: loadablePages.home,
      exact: true,
      loadData: dataLoaders.loadIndexPageData,
      path: routesConst.homePage.path
    },
    {
      component: FallbackPage,
      path: routesConst.serviceWorkerFallBackPage.path
    },
    {
      component: loadablePages.topic,
      loadData: dataLoaders.loadTopicPageData,
      path: routesConst.topicPage.path
    },
    {
      component: loadablePages.topics,
      loadData: dataLoaders.loadTopicListPageData,
      path: routesConst.topicListPage.path
    },
    {
      component: loadablePages.category,
      loadData: dataLoaders.loadCategoryListPageData,
      path: routesConst.categoryListPage.path
    },
    {
      component: loadablePages.tag,
      loadData: dataLoaders.loadTagListPageData,
      path: routesConst.tagListPage.path
    },
    {
      component: loadablePages.photography,
      loadData: dataLoaders.loadPhotographyPageData,
      path: routesConst.photographyPage.path
    },
    {
      component:loadablePages.search,
      path: routesConst.searchPage.path
    },
    {
      component: loadablePages.article,
      loadData: () => Promise.all([ dataLoaders.loadArticlePageData, dataLoaders.loadBookmarkWidgetData ]),
      path: routesConst.articlePage.path
    },
    {
      component: loadablePages.author,
      loadData: dataLoaders.loadAuthorPageData,
      path: routesConst.authorPage.path
    },
    {
      component: loadablePages.authors,
      loadData: dataLoaders.loadAuthorListPageData,
      path: routesConst.authorListPage.path
    },
    {
      component: loadablePages.aboutUs,
      path: routesConst.aboutUsPage.path
    },
    {
      component: loadablePages.bookmarkList,
      loadData: dataLoaders.loadBookmarkListData,
      path: routesConst.bookmarkListPage.path,
      authorizationRequired: true
    },
    // error  page
    {
      path: routesConst.errorPage.path,
      render: ({ match, staticContext }) => {
        let statusCode

        const errorType = _.get(match, 'params.errorType')
        switch (errorType) {
          case '404': {
            statusCode = statusCodeConst.notFound
            break
          }
          case '500':
          default: {
            statusCode = statusCodeConst.internalServerError
          }
        }

        // there is no `staticContext` on the client,
        // so we need to guard against that here
        if (staticContext) {
          staticContext.statusCode = statusCode
        }

        return (
          <SystemError
            error={{
              status: statusCode
            }}
          />
        )
      }
    },
    // no routes match
    {
      render: ( { staticContext } ) => {
        // there is no `staticContext` on the client,
        // so we need to guard against that here
        if (staticContext) {
          staticContext.statusCode = 404
        }

        return (
          <SystemError
            error={{
              status: 404
            }}
          />
        )
      }
    }
  ]
}
