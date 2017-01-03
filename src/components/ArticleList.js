/*eslint no-unused-vars: 1*/

import React, { Component } from 'react'
import classNames from 'classnames'
import More from '../components/More'
import { Link } from 'react-router'
import { LINK_PREFIX, INTERACTIVE_ARTICLE_STYLE } from '../constants/index'
import { date2yyyymmdd } from '../lib/date-transformer'
import { getArticleImageSrc, getArticleImageSrcSet } from '../utils/index'

// lodash
import get from 'lodash/get'
import map from 'lodash/map'

if (process.env.BROWSER) {
  require('./ArticleList.css')
}

export default class ListArticleItem extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { articles, hasMore, loadMore, loadMoreError } = this.props
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
                const image = getArticleImageSrc(a)
                const imageSrcSet = getArticleImageSrcSet(a)
                const d_str = date2yyyymmdd(a.publishedDate , '.')
                const style = get(a, 'style')
                let url = style === INTERACTIVE_ARTICLE_STYLE ? LINK_PREFIX.INTERACTIVE_ARTICLE + a.slug : LINK_PREFIX.ARTICLE + a.slug
                let excerpt =  get(a, 'ogDescription', '')
                if (image) {
                  return (
                    <li className="tag-item" key={a.id} style={bgStyle}>
                      <Link to={url} target={style === INTERACTIVE_ARTICLE_STYLE ? '_blank' : undefined}>
                        <div className="itemimage-wrap">
                          <img className="category-itemimage" src={image} srcSet={imageSrcSet}/>
                        </div>
                        <div className="tag-itemdesc" style={bgStyle}>
                          <div className="tag-itemtitle"><h3>{a.title}</h3></div>
                          <div className="tag-itemexcerpt">{excerpt}</div>
                          <time dateTime={date2yyyymmdd(a.publishedDate, '-')} className="tag-itempublished">{d_str}</time>
                        </div>
                      </Link>
                    </li>
                  )
                }
              })}
            </ul>
          </div>
          {
            hasMore ? (
              <div>
                <More loadMore={loadMore}>
                  <span style={{ color: loadMoreError ? 'red' : 'white' }}>{loadMoreError ? '更多文章（請重試）' : '更多文章'}</span>
                </More>
              </div>
            )
            : null
          }
        </section>
      )
    } else {
      return (<div> </div>)
    }
  }
}
