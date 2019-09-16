import Link from 'react-router-dom/Link'
import Hexagon from './Hexagon'
import React from 'react'
import Slider from './slider'
import { LINK_PREFIX, INTERACTIVE_ARTICLE_STYLE } from '../../constants'
import { date2yyyymmdd } from '@twreporter/core/lib/utils/date'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import { getSrcSet } from '../../utils/img'
import './TopNews.css'

// lodash
import get from 'lodash/get'

const _ = {
  get
}

export default class TopNews extends React.PureComponent {
  render() {
    const { topnews } = this.props
    return Array.isArray(topnews) && topnews.length > 0 ? (
      <Slider className="topnews" autoPlayInterval={4500} indicator={true} switcher={true}>
        {topnews.map((a) => {
          const pubDate = date2yyyymmdd(a.publishedDate, '.')
          const cats = _.get(a, 'categories', [])
          const catDisplay = _.get(cats, [ 0, 'name' ], '專題')
          let prefix = LINK_PREFIX.ARTICLE
          let target = undefined
          if (a.style === INTERACTIVE_ARTICLE_STYLE) {
            prefix = LINK_PREFIX.INTERACTIVE_ARTICLE
            target = '_blank'
          }
          return (
            <Link key={a.id} to={prefix + a.slug} target={target}>
              <img
                alt={_.get(a, 'heroImage.description') || _.get(a, 'ogImage.description')}
                src={replaceGCSUrlOrigin(_.get(a, 'heroImage.resizedTargets.mobile.url') || _.get(a, 'ogImage.resizedTargets.mobile.url'))}
                srcSet={getSrcSet(_.get(a, 'heroImage.resizedTargets') || _.get(a, 'ogImage.resizedTargets'))} />
              <div className="topnews_categorycontainer">
                <Hexagon>{catDisplay}</Hexagon>
              </div>
              <div className="carousel-item">
                <div className="carousel-itemsubtitle">{a.subtitle}</div>
                <div className="carousel-itemtitle">{a.title}</div>
                <time dateTime={date2yyyymmdd(a.publishedDate, '-')} className="carousel-published">{pubDate}</time>
              </div>
            </Link>
          )
        })}
      </Slider>
    ) : null
  }
}
export { TopNews }
