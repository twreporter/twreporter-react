import Link from './Link'
import React, { Component } from 'react'
import { INTERACTIVE_ARTICLE_STYLE } from '../constants/index'
import { date2yyyymmdd } from '../lib/date-transformer'
import { imageComposer } from '../utils/index'

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
            let imageSet = imageComposer(a)
            let thumbnail = imageSet.mobileImage
            let url = '/a/' + a.slug
            return (
              <li className="daily-item" key={a.id || idx}>
                <Link to={url} disableReactRouter={get(a, 'style') === INTERACTIVE_ARTICLE_STYLE }>
                  <div className="daily-image" >
                    <div style={{
                      backgroundImage: 'url(' + thumbnail + ')'
                    }}/>
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
