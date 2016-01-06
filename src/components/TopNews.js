import React, { Component } from 'react'
import Category from './Category'
import Slider from 'react-flex-carousel'
import { ts2yyyymmdd } from '../lib/date-transformer'
import { imageComposer } from '../lib/image-composer.js'

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
          const pubDate = ts2yyyymmdd(a.lastPublish * 1000, '.')
          let tags = a.tags
          let catDisplay = '專題'
          for (let i = 0; i < tags.length; i++) {
            if (tags[i].substring(0,4) === 'cat:') {
              catDisplay = tags[i].substring(4)
              break
            }
          }
          let imageSet = imageComposer(a)
          let image = device === 'desktop' ? imageSet.desktopImage : imageSet.mobileImage
          return (
              <a key={a.id} href={(a.slug) ? '/a/' + a.slug : a.storyLink}>
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
              </a>
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
