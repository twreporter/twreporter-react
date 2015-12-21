import React, { Component, PropTypes } from 'react'
import Category from './Category';
import More from '../components/More'
import _ from 'lodash';
import { imageComposer } from '../lib/image-composer.js'
if (process.env.BROWSER) {
  require("./Tags.css")
}

export default class Tags extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { articles, device, hasMore, loadMore } = this.props
    let cat_display = "台灣"
    if (articles && articles.length > 0) {
      return (
        <div className="category-items">
          <div className="category-name">
            <Category>{cat_display}</Category>
          </div>
          <ul className="tag-listing">
            { _.map(articles, (a) => {
              let image = imageComposer(a).mobileImage
              var d = new Date()
              d.setTime(a.lastPublish*1000)
              var d_str = d.toISOString().substring(0,10)
              var re = /^[\w\d]/
              var url = "https://www.twreporter.org/a/" + a.slug
              if (image) {
                return (
                  <li className="tag-item" key={a.id}>
                    <a href={url}>
                      <div className="itemimage-wrap">
                        <img className="category-itemimage" src={image}/>
                      </div>
                      <div className="tag-itemdesc">
                        <div className="tag-itemtitle">{a.title}</div>
                        <div className="tag-itemexcerpt">{a.excerpt}</div>
                        <div className="tag-itempublished">{d_str}</div>
                      </div>
                    </a>
                  </li>
                  )
                }
              })
            }
          </ul>
          {hasMore ? <More loadMore={loadMore} device={device} /> : null}
        </div>
      )
    } else {
      return (<div> </div>)
    }
  }
}

export { Tags };
