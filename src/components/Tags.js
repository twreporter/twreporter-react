/*eslint no-unused-vars: 1*/

import React, { Component } from 'react'
import classNames from 'classnames'
import Category from './Category'
import More from '../components/More'
import Link from './Link'
import { INTERACTIVE_ARTICLE_STYLE, SITE_META } from '../constants/index'
import { date2yyyymmdd } from '../lib/date-transformer'
import { getImageSrc, getImageSrcSet } from '../utils/index'

// lodash
import get from 'lodash/get'
import map from 'lodash/map'

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
    const { articles, hasMore, loadMore } = this.props
    const bgStyle = {}
    let photoClass

    if (this.props.bgStyle === 'dark') {
      photoClass = 'tag-photography'
    }
    if (articles && articles.length > 0) {
      return (
        <section>
          <div className="container">
            <ul className={classNames('tag-listing', photoClass)}>
              { map(articles, (a) => {
                let image = getImageSrc(a)
                let imageSrcSet = getImageSrcSet(a)
                const d_str = date2yyyymmdd(a.publishedDate , '.')
                let url = '/a/' + a.slug
                let excerpt =  get(a, 'ogDescription', '')
                if (image) {
                  return (
                    <li itemScope itemType="http://schema.org/Article" className="tag-item" key={a.id} style={bgStyle}>
                      <meta itemProp="url" content={`${SITE_META.URL_NO_SLASH}${url}`} />
                      <Link to={url} disableReactRouter={a.style === INTERACTIVE_ARTICLE_STYLE}>
                        <div className="itemimage-wrap">
                          <img itemProp="image" className="category-itemimage" src={image} srcSet={imageSrcSet} />
                        </div>
                        <div className="tag-itemdesc" style={bgStyle}>
                          <div className="tag-itemtitle"><h3 itemProp="headline">{a.title}</h3></div>
                          <div itemProp="description" className="tag-itemexcerpt">{excerpt}</div>
                          <time itemProp="datePublished" dateTime={date2yyyymmdd(a.publishedDate, '-')} className="tag-itempublished">{d_str}</time>
                        </div>
                      </Link>
                    </li>
                  )
                }
              })}
            </ul>
          </div>
          {hasMore ? <More loadMore={loadMore} /> : null}
        </section>
      )
    } else {
      return (<div> </div>)
    }
  }
}

export { Tags }
