'use strict'
import Link from 'react-router/lib/Link'
import Hexagon from './Hexagon'
import React, { Component } from 'react'
import Slider from '@twreporter/react-flex-carousel'
import { LINK_PREFIX, INTERACTIVE_ARTICLE_STYLE } from '../constants/index'
import { date2yyyymmdd } from '../utils/index'
import { getArticleImageSrc, getArticleImageSrcSet } from '../utils/index'
import './TopNews.css'

// lodash
import get from 'lodash/get'

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
      <Slider className="topnews" autoPlayInterval={4500} indicator={true} switcher={true}>
        {topnews.map((a) => {
          const pubDate = date2yyyymmdd(a.publishedDate, '.')
          const cats = get(a, 'categories', [])
          const catDisplay = get(cats, [ 0, 'name' ], '專題')
          const imageSet = getArticleImageSrcSet(a)
          const image = getArticleImageSrc(a, 'mobile')
          let prefix = LINK_PREFIX.ARTICLE
          let target = undefined
          if (a.style === INTERACTIVE_ARTICLE_STYLE) {
            prefix = LINK_PREFIX.INTERACTIVE_ARTICLE
            target = '_blank'
          }
          return (
            <Link key={a.id} to={prefix + a.slug} target={target}>
              <img src={image} alt={a.slug} srcSet={imageSet} />
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
