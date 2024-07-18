import Loadable from '@loadable/component'
import PropTypes from 'prop-types'
import React from 'react'
// utils
import dataLoaders from './data-loaders/index'
// constants
import routesConst from './constants/routes'
import statusCodeConst from './constants/status-code'
// components
import FallbackPage from './containers/ServiceWorkerFallbackPage'
import Article from './containers/Article.js'
import SystemError from './components/SystemError'
// lodash
import get from 'lodash/get'
const _ = {
  get,
}

class LoadingComponent extends React.Component {
  static propTypes = {
    error: PropTypes.object,
  }

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
  home: Loadable(
    () =>
      import(
        /* webpackChunkName: "index-page" */
        './containers/Home'
      ),
    { fallback: LoadingComponent }
  ),
  topic: Loadable(
    () =>
      import(
        /* webpackChunkName: "topic-page" */
        './containers/TopicLandingPage'
      ),
    { fallback: LoadingComponent }
  ),
  topics: Loadable(
    () =>
      import(
        /* webpackChunkName: "topic-list-page" */
        './containers/Topics'
      ),
    { fallback: LoadingComponent }
  ),
  category: Loadable(
    () =>
      import(
        /* webpackChunkName: "category-list-page" */
        './containers/Category'
      ),
    { fallback: LoadingComponent }
  ),
  tag: Loadable(
    () =>
      import(
        /* webpackChunkName: "tag-list-page" */
        './containers/Tag'
      ),
    { fallback: LoadingComponent }
  ),
  author: Loadable(
    () =>
      import(
        /* webpackChunkName: "author-page" */
        './containers/Author'
      ),
    { fallback: LoadingComponent }
  ),
  authors: Loadable(
    () =>
      import(
        /* webpackChunkName: "author-list-page" */
        './containers/AuthorsList'
      ),
    { fallback: LoadingComponent }
  ),
  photography: Loadable(
    () =>
      import(
        /* webpackChunkName: "photography-page" */
        './containers/Photography'
      ),
    { fallback: LoadingComponent }
  ),
  search: Loadable(
    () =>
      import(
        /* webpackChunkName: "search-page" */
        './containers/Search'
      ),
    { fallback: LoadingComponent }
  ),
  aboutUs: Loadable(
    () =>
      import(
        /* webpackChunkName: "about-us-page" */
        './components/about-us'
      ),
    { fallback: LoadingComponent }
  ),
  myReading: Loadable(
    () =>
      import(
        /* webpackChunkName: "my-reading" */
        './containers/MyReading'
      ),
    { fallback: LoadingComponent }
  ),
  latest: Loadable(
    () =>
      import(
        /* webpackChunkName: "latest" */
        './containers/Latest'
      ),
    { fallback: LoadingComponent }
  ),
  member: Loadable(
    () =>
      import(
        /* webpackChunkName: "member" */
        './containers/Member'
      ),
    { fallback: LoadingComponent }
  ),
}

function ErrorPage({ match, staticContext }) {
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
        statusCode,
      }}
    />
  )
}

ErrorPage.propTypes = {
  match: PropTypes.object,
  staticContext: PropTypes.object,
}

function NotFoundErrorPage({ staticContext }) {
  // there is no `staticContext` on the client,
  // so we need to guard against that here
  if (staticContext) {
    staticContext.statusCode = 404
  }

  return (
    <SystemError
      error={{
        statusCode: 404,
      }}
    />
  )
}

NotFoundErrorPage.propTypes = {
  staticContext: PropTypes.object,
}

/**
 *  getRoutes function
 *  uses `@loadable/component` to do the code splitting,
 *  and adopts react-router
 *  to render the corresponding React components
 *
 *  @returns {object} Switch component of react-router v4
 */
export default function getRoutes() {
  return [
    {
      renderWithProps: loadablePages.home,
      exact: true,
      loadData: dataLoaders.loadIndexPageData,
      path: routesConst.homePage.path,
    },
    {
      component: FallbackPage,
      path: routesConst.serviceWorkerFallBackPage.path,
    },
    {
      component: loadablePages.topic,
      loadData: dataLoaders.loadTopicPageData,
      path: routesConst.topicPage.path,
    },
    {
      component: loadablePages.topics,
      loadData: dataLoaders.loadTopicListPageData,
      path: routesConst.topicListPage.path,
    },
    {
      component: loadablePages.category,
      loadData: dataLoaders.loadCategoryListPageData,
      path: routesConst.categoryListPage.path,
    },
    {
      component: loadablePages.tag,
      loadData: dataLoaders.loadTagListPageData,
      path: routesConst.tagListPage.path,
    },
    {
      component: loadablePages.photography,
      loadData: dataLoaders.loadPhotographyPageData,
      path: routesConst.photographyPage.path,
    },
    {
      component: loadablePages.search,
      path: routesConst.searchPage.path,
    },
    {
      renderWithProps: Article,
      loadData: props =>
        Promise.all([
          dataLoaders.loadArticlePageData(props),
          dataLoaders.loadBookmarkWidgetData(props),
        ]),
      path: routesConst.articlePage.path,
    },
    {
      component: loadablePages.author,
      loadData: dataLoaders.loadAuthorPageData,
      path: routesConst.authorPage.path,
    },
    {
      component: loadablePages.authors,
      loadData: dataLoaders.loadAuthorListPageData,
      path: routesConst.authorListPage.path,
    },
    {
      component: loadablePages.aboutUs,
      path: routesConst.aboutUsPage.path,
    },
    {
      component: loadablePages.myReading,
      path: routesConst.myReadingPage.path,
      authorizationRequired: true,
    },
    {
      component: loadablePages.latest,
      loadData: dataLoaders.loadLatestPageData,
      path: routesConst.latestPage.path,
    },
    {
      component: loadablePages.member,
      loadData: dataLoaders.loadMemberPageData,
      path: routesConst.memberPage.path,
    },
    {
      path: routesConst.download.donationHistory.path,
      authorizationRequired: true,
    },
    // error  page
    {
      path: routesConst.errorPage.path,
      component: ErrorPage,
    },
    {
      component: NotFoundErrorPage,
    },
  ]
}
