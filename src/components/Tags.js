/*eslint no-unused-vars: 1*/

import React, { Component } from 'react'
import Category from './Category'
import More from '../components/More'
import _ from 'lodash'
import { imageComposer } from '../lib/image-composer.js'
import { date2yyyymmdd } from '../lib/date-transformer'

if (process.env.BROWSER) {
  require('./Tags.css')
}

class CategoryName extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { cat_display } = this.props
    return (
      <div className="category-name">
        <Category>{cat_display}</Category>
      </div>
    )
  }
}

export default class Tags extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { fullArticles, hasMore, loadMore } = this.props
    let cat_display = '台灣'
    const bgStyle = {}
    if (this.props.bgStyle === 'dark') {
      bgStyle.backgroundColor = '#2C323E'
      bgStyle.color = '#FFFFFF'
    }
    if (fullArticles && fullArticles.length > 0) {
      return (
        <div className="category-items">
        <cat cat_display={cat_display}/>
          <ul className="tag-listing">
            { _.map(fullArticles, (a) => {
              let image = imageComposer(a).mobileImage
              const d_str = date2yyyymmdd(a.publishedDate , '.')
              let url = '/a/' + a.slug
              let excerpt = (a.content.brief) ? a.content.brief.apiData[0].content[0] : ''
              if (image) {
                return (
                  <li className="tag-item" key={a._id} style={bgStyle}>
                    <a href={url}>
                      <div className="itemimage-wrap">
                        <img className="category-itemimage" src={image}/>
                      </div>
                      <div className="tag-itemdesc" style={bgStyle}>
                        <div className="tag-itemtitle">{a.title}</div>
                        <div className="tag-itemexcerpt">{excerpt}</div>
                        <div className="tag-itempublished">{d_str}</div>
                      </div>
                    </a>
                  </li>
                )
              }
            })}
          </ul>
          {hasMore ? <More loadMore={loadMore} /> : null}
        </div>
      )
    } else {
      return (<div> </div>)
    }
  }
}

export { Tags }
