import { Link } from 'react-router'
import { date2yyyymmdd } from '../lib/date-transformer'
import { imageComposer } from '../utils/index'
import _ from 'lodash'
import React, { Component } from 'react'
import Category from './Category'
import Slider from 'react-flex-carousel'

if (process.env.BROWSER) {
  require('./TopNews.css')
}

export default class TopNews extends Component {
  constructor(props, context) {
    super(props, context)
  }
  componentDidMount() {
    // this.handleResize()
    // window.addEventListener('resize', this.handleResize);
  }
  render() {
    const { topnews } = this.props
    const { device } = this.context
    return Array.isArray(topnews) && topnews.length > 0 ? (
      <Slider className="topnews" autoplayInteval={4500} indicator={true} switcher={true}>
        {topnews.map((a) => {
          const pubDate = date2yyyymmdd(a.publishedDate * 1000, '.')
          let cats = _.get(a, 'categories', [])
          let catDisplay = _.get(cats, [ 0, 'name' ], '專題')
          let imageSet = imageComposer(a)
          let image = device === 'desktop' ? imageSet.desktopImage : imageSet.mobileImage
          return (
              <Link key={a.id} to={'/a/' + a.slug}>
                <img src={image} alt={a.slug} />
                <div className="topnews_categorycontainer">
                  <Category>{catDisplay}</Category>
                </div>
                <div className="carousel-item">
                  <div className="carousel-itemsubtitle">{a.subtitle}</div>
                  <div className="carousel-itemtitle">{a.title}</div>
                  <div className="carousel-excerpt">{a.excerpt}</div>
                  <time className="carousel-published">{pubDate}</time>
                </div>
              </Link>
          )
        })}
      </Slider>
    ) : null
  }
}

TopNews.contextTypes = {
  //  store: React.PropTypes.object,
  device: React.PropTypes.string
}
export { TopNews }
