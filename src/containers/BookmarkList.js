import React from 'react'
import Helmet from 'react-helmet'
import { useLocation } from 'react-router-dom'

// twreporters
import BookmarkList from '@twreporter/react-components/lib/bookmark-list'

// constants
import siteMeta from '../constants/site-meta'

const BookmarkListPage = () => {
  const { pathname } = useLocation()
  const titleText = '最新'
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
      <BookmarkList />
    </div>
  )
}

export default BookmarkListPage
