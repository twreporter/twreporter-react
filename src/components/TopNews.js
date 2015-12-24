import React, { Component } from 'react'
import Category from './Category'
import Slider from 'react-slick'
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
    let settings = {
      dots: true,
      infinite: true,
      speed: 1500,
      autoplay: true,
      autoplaySpeed: 4500,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: false,
      useCSS: true
    }

    return Array.isArray(topnews) ? (
      <Slider {...settings}>
        {topnews.map((a) => {
          const pubDate = ts2yyyymmdd(a.lastPublish * 1000, '.')
          let tags = a.tags
          let catDisplay = '專題'
          for (let i = 0; i < tags.length; i++) {
            if (tags[i].substring(0,4) == 'cat:') {
              catDisplay = tags[i].substring(4)
              break
            }
          }
          let imageSet = imageComposer(a)
          let image = device === 'desktop' ? imageSet.desktopImage : imageSet.mobileImage
          return (
            <div key={a.id}>
              <a
                href={(a.slug) ? '/a/' + a.slug : a.storyLink}
                className="topnewsimage-wrap"
                style={{
                  backgroundImage: 'url(' + image + ')'
                }}
              >
                <div className="topnews_categorycontainer">
                  <Category>{catDisplay}</Category>
                </div>
                <div className="carousel-item">
                  <div className="carousel-itemsubtitle">{a.subtitle}</div>
                  <div className="carousel-itemtitle">{a.title}</div>
                  <div className="carousel-excerpt">{a.excerpt}</div>
                  <div className="carousel-published">
                    {pubDate}
                  </div>
                </div>
              </a>
            </div>
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
