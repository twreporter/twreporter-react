import _ from 'lodash'
import React, { Component } from 'react'
import { ts2yyyymmdd } from '../lib/date-transformer'
import { imageComposer } from '../lib/image-composer'

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
          { _.map(dailyTop, (a) => {
            const pubDate = ts2yyyymmdd(a.lastPublish * 1000, '.')
            if (a.isPublishedVersion) {
              let imageSet = imageComposer(a)
              let thumbnail = imageSet.mobileImage
              let url = (a.storyLink) ? a.storyLink : '/a/' + a.slug
              return (
                <a href={url} key={a.id}>
                  <li className="daily-item">
                    <div className="daily-image" >
                      <div style={{
                        backgroundImage: 'url(' + thumbnail + ')',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        height: '100%'
                      }}/>
                    </div>
                    <div className="daily_lastpublish">{pubDate}</div>
                    <div className="daily-title">{a.title}</div>
                  </li>
                </a>
              )
            }
          })}
          </ul>
        </div>
      </div>
    ) : null
  }
}

export { Daily }
