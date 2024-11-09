import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { Switch, Route, useLocation, matchPath } from 'react-router-dom'
import { useSelector } from 'react-redux'

// @twreporter
import { H2 } from '@twreporter/react-components/lib/text/headline'
import mq from '@twreporter/core/lib/utils/media-query'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import twreporterRedux from '@twreporter/redux'
import RedirectToSignIn from '@twreporter/react-components/lib/bookmark-list/redirect-to-sign-in'
import { getSignInHref } from '@twreporter/core/lib/utils/sign-in-href'

// constants
import siteMeta from '../constants/site-meta'
import routes from '../constants/routes'

// components
import SavedBookmarksPage from '../components/my-reading/saved-bookmarks-page'
import BrowsingHistoryPage from '../components/my-reading/browsing-history-page'
import SavedBookmarksSection from '../components/my-reading/saved-bookmakrs-section'
import BrowsingHistorySection from '../components/my-reading/browsing-history-section'
import ReviewingArticleSection from '../components/my-reading/reviewing-article-section'
import { ArticleTrackingSection } from '../components/my-reading/article-tracking-section'

// lodash
import get from 'lodash/get'
const _ = {
  get,
}

const GridContainer = styled.div`
  width: 100%;
  overflow: hidden;
  ${mq.mobileOnly`
    padding: 24px 24px 120px;
  `}
  ${mq.tabletAndAbove`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  `}
  ${mq.tabletOnly`
    padding: 32px 32px 120px;
    grid-column-gap: 24px;
  `}
  ${mq.desktopAndAbove`
    padding: 64px 48px 120px;
    grid-column-gap: 32px;
  `}
  ${mq.hdOnly`
    padding: 64px 0px 120px;
    width: 1280px;
    margin: auto;
  `}
`

const ContentContainer = styled.div`
  grid-column: 2 / 12;
`

const PageTitle = styled(H2)`
  color: ${colorGrayscale.gray800};
  width: 100%;
  margin-bottom: 24px;
`

const ArticleTracking = styled.div`
  width: 100%;
  padding-bottom: 24px;
`

const SavedBookmarks = styled.div`
  width: 100%;
  padding-bottom: 24px;
`

const BrowsingHistory = styled.div`
  width: 100%;
  padding-bottom: 24px;
`

const ReviewingArticles = styled.div`
  width: 100%;
  padding-bottom: 24px;
`

const { reduxStateFields } = twreporterRedux

const MyReadingPage = () => {
  const { pathname } = useLocation()
  const isAuthed = useSelector(state =>
    _.get(state, [reduxStateFields.auth, 'isAuthed'], false)
  )
  const jwt = useSelector(state =>
    _.get(state, [reduxStateFields.auth, 'accessToken'], '')
  )

  useEffect(() => {
    // check authorization
    // redirect to singin page if user has not been authorized
    if (!isAuthed || !jwt) {
      setTimeout(() => {
        const currentHref =
          typeof window === 'undefined' ? '' : window.location.href
        window.location.href = getSignInHref(currentHref)
      }, 2000)
    }
  }, [])

  if (!isAuthed || !jwt) {
    return <RedirectToSignIn>您尚未登入，將跳轉至登入頁</RedirectToSignIn>
  }

  const getSiteTitle = pathname => {
    if (matchPath(pathname, routes.myReadingPage.savedBookmarksPage.path)) {
      return '已收藏'
    } else if (
      matchPath(pathname, routes.myReadingPage.browsingHistoryPage.path)
    ) {
      return '造訪紀錄'
    } else {
      return '我的閱讀'
    }
  }

  const titleText = getSiteTitle(pathname)
  const title = titleText + siteMeta.name.separator + siteMeta.name.full
  const canonical = `${siteMeta.urlOrigin}${pathname}`

  return (
    <div>
      <Helmet
        title={title}
        link={[{ rel: 'canonical', href: canonical }]}
        meta={[
          { name: 'description', content: siteMeta.desc },
          { name: 'twitter:title', content: title },
          { name: 'twitter:description', content: siteMeta.desc },
          { name: 'twitter:image', content: siteMeta.ogImage.url },
          { property: 'og:title', content: title },
          { property: 'og:description', content: siteMeta.desc },
          { property: 'og:image', content: siteMeta.ogImage.url },
          { property: 'og:image:width', content: siteMeta.ogImage.width },
          { property: 'og:image:height', content: siteMeta.ogImage.height },
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: canonical },
        ]}
      />
      <GridContainer>
        <ContentContainer>
          <Switch>
            <Route exact path={routes.myReadingPage.path}>
              <PageTitle text={'我的閱讀'} />
              <ArticleTracking>
                <ArticleTrackingSection />
              </ArticleTracking>
              <SavedBookmarks>
                <SavedBookmarksSection />
              </SavedBookmarks>
              <BrowsingHistory>
                <BrowsingHistorySection />
              </BrowsingHistory>
              <ReviewingArticles>
                <ReviewingArticleSection />
              </ReviewingArticles>
            </Route>
            <Route path={routes.myReadingPage.savedBookmarksPage.path}>
              <SavedBookmarksPage />
            </Route>
            <Route path={routes.myReadingPage.browsingHistoryPage.path}>
              <BrowsingHistoryPage />
            </Route>
          </Switch>
        </ContentContainer>
      </GridContainer>
    </div>
  )
}

export default MyReadingPage
