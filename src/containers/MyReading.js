import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import {
  Switch,
  Route,
  useLocation,
  matchPath,
  useHistory,
} from 'react-router-dom'

// @twreporter
import { Title2 } from '@twreporter/react-components/lib/title-bar'
import { H2 } from '@twreporter/react-components/lib/text/headline'
import mq from '@twreporter/core/lib/utils/media-query'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { TextButton } from '@twreporter/react-components/lib/button'
import { Arrow } from '@twreporter/react-components/lib/icon'

// constants
import siteMeta from '../constants/site-meta'
import routes from '../constants/routes'

// components
import SavedBookmarks from '../components/my-reading/saved-bookmarks'
import BrowsingHistory from '../components/my-reading/browsing-history'

const GridContainer = styled.div`
  width: 100%;
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

const MyReadingPage = () => {
  const { pathname } = useLocation()
  const navigate = useHistory()

  const getSiteTitle = pathname => {
    if (matchPath(pathname, routes.myReadingPage.savedBookmarksPage.path)) {
      return '已收藏'
    } else {
      return '我的閱讀'
    }
  }

  const titleText = getSiteTitle(pathname)
  const title = titleText + siteMeta.name.separator + siteMeta.name.full
  const canonical = `${siteMeta.urlOrigin}${pathname}`

  const moreSavedBookmarkBtn = (
    <TextButton
      text="查看更多"
      rightIconComponent={<Arrow direction="right" />}
      onClick={() =>
        navigate.push(routes.myReadingPage.savedBookmarksPage.path)
      }
    />
  )

  const moreHistoryBtn = (
    <TextButton
      text="查看更多"
      rightIconComponent={<Arrow direction="right" />}
      onClick={() =>
        navigate.push(routes.myReadingPage.browsingHistoryPage.path)
      }
    />
  )
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
              {/* TODO: move to components */}
              <Title2 title={'已收藏'} buttonComponent={moreSavedBookmarkBtn} />
              <Title2 title={'造訪紀錄'} buttonComponent={moreHistoryBtn} />
            </Route>
            <Route path={routes.myReadingPage.savedBookmarksPage.path}>
              <SavedBookmarks />
            </Route>
            <Route path={routes.myReadingPage.browsingHistoryPage.path}>
              <BrowsingHistory />
            </Route>
          </Switch>
        </ContentContainer>
      </GridContainer>
    </div>
  )
}

export default MyReadingPage
