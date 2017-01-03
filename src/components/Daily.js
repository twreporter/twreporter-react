import { Link } from 'react-router'
import React, { Component } from 'react'
import { LINK_PREFIX, INTERACTIVE_ARTICLE_STYLE } from '../constants/index'
import { date2yyyymmdd } from '../lib/date-transformer'
import { getArticleImageSrc } from '../utils/index'

// lodash
import get from 'lodash/get'
import map from 'lodash/map'

if (process.env.BROWSER) {
  require('./Daily.css')
}

export default class Daily extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { daily } = this.props
    let dailyTop = []
    if ( daily ) { dailyTop = daily.slice(0, 6) }
    return dailyTop ? (
      <div className="daily">
        <div className="daily-news">
          <div className="what">觀&nbsp;點</div>
        </div>
        <div className="daily-itemlistwrapprt">
          <ul className="daily-itemlist">
          { map(dailyTop, (a, idx) => {
            const pubDate = date2yyyymmdd(a.publishedDate, '.')
            const thumbnail = getArticleImageSrc(a, 'mobile')
            const style = get(a, 'style')
            const url = style === INTERACTIVE_ARTICLE_STYLE ? LINK_PREFIX.INTERACTIVE_ARTICLE + a.slug : LINK_PREFIX.ARTICLE + a.slug
            return (
              <li className="daily-item" key={a.id || idx}>
                <Link to={url} target={style === INTERACTIVE_ARTICLE_STYLE ? '_blank' : undefined}>
                  <div className="daily-image">
                    <div style={{
                      backgroundImage: 'url(' + thumbnail + ')'
                    }} />
                  </div>
                  <div className="daily_lastpublish">{pubDate}</div>
                  {a.title}
                </Link>
              </li>
            )
          })}
          </ul>
        </div>
      </div>
    ) : null
  }
}

export { Daily }
