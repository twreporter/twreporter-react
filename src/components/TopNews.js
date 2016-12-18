'use strict'
import { INTERACTIVE_ARTICLE_STYLE } from '../constants/index'
import { date2yyyymmdd } from '../lib/date-transformer'
import { getArticleImageSrc, getArticleImageSrcSet } from '../utils/index'
import { Link } from 'react-router'
import Hexagon from './Hexagon'
import Slider from 'react-flex-carousel'
import React, { Component } from 'react'

// lodash
import get from 'lodash/get'

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
    return Array.isArray(topnews) && topnews.length > 0 ? (
      <Slider className="topnews" autoplayInteval={4500} indicator={true} switcher={true}>
        {topnews.map((a) => {
          const pubDate = date2yyyymmdd(a.publishedDate, '.')
          let cats = get(a, 'categories', [])
          let catDisplay = get(cats, [ 0, 'name' ], '專題')
          let imageSet = getArticleImageSrcSet(a)
          let image = getArticleImageSrc(a)
          return (
            <Link key={a.id} to={'/a/' + a.slug} target={a.style === INTERACTIVE_ARTICLE_STYLE ? '_self' : undefined}>
              <img src={image} alt={a.slug} srcSet={imageSet} />
              <div className="topnews_categorycontainer">
                <Hexagon>{catDisplay}</Hexagon>
              </div>
              <div className="carousel-item">
                <div className="carousel-itemsubtitle">{a.subtitle}</div>
                <div className="carousel-itemtitle">{a.title}</div>
                <div className="carousel-excerpt">{a.excerpt}</div>
                <time dateTime={date2yyyymmdd(a.publishedDate, '-')} className="carousel-published">{pubDate}</time>
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
