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
import SavedBookmarksPage from '../components/my-reading/saved-bookmarks'
import BrowsingHistoryPage from '../components/my-reading/browsing-history'

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

const SavedBookmarks = styled.div`
  width: 100%;
  padding-bottom: 24px;
`

const BrowsingHistory = styled.div`
  width: 100%;
  padding-bottom: 24px;
`

const EmptyBox = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  height: 300px;
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

  const SavedBookmarksContent = () => {
    const moreSavedBookmarkBtn = size => {
      return (
        <TextButton
          text="查看更多"
          rightIconComponent={<Arrow direction="right" />}
          onClick={() =>
            navigate.push(routes.myReadingPage.savedBookmarksPage.path)
          }
          size={size}
        />
      )
    }
    return (
      <div>
        <Title2
          title={'已收藏'}
          renderButton={size => moreSavedBookmarkBtn(size)}
        />
        <EmptyBox>空無一物</EmptyBox>
      </div>
    )
  }

  const BrowsingHistoryContent = () => {
    const moreHistoryBtn = size => {
      return (
        <TextButton
          text="查看更多"
          rightIconComponent={<Arrow direction="right" />}
          onClick={() =>
            navigate.push(routes.myReadingPage.browsingHistoryPage.path)
          }
          size={size}
        />
      )
    }
    return (
      <div>
        <Title2
          title={'造訪紀錄'}
          renderButton={size => moreHistoryBtn(size)}
        />
        <EmptyBox>空無一物</EmptyBox>
      </div>
    )
  }

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
              <SavedBookmarks>
                <SavedBookmarksContent />
              </SavedBookmarks>
              <BrowsingHistory>
                <BrowsingHistoryContent />
              </BrowsingHistory>
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
