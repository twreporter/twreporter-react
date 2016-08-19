/*eslint no-unused-vars: 1*/

import React, { Component } from 'react'
import classNames from 'classnames'
import Category from './Category'
import More from '../components/More'
import _ from 'lodash'
import { Link } from 'react-router'
import { date2yyyymmdd } from '../lib/date-transformer'
import { imageComposer } from '../utils/index'

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
              { _.map(articles, (a) => {
                let image = imageComposer(a).mobileImage
                const d_str = date2yyyymmdd(a.publishedDate , '.')
                let url = '/a/' + a.slug
                let excerpt =  _.get(a, 'ogDescription', '')
                if (image) {
                  return (
                    <li className="tag-item" key={a.id} style={bgStyle}>
                      <Link to={url}>
                        <div className="itemimage-wrap">
                          <img className="category-itemimage" src={image}/>
                        </div>
                        <div className="tag-itemdesc" style={bgStyle}>
                          <div className="tag-itemtitle"><h3>{a.title}</h3></div>
                          <div className="tag-itemexcerpt">{excerpt}</div>
                          <div className="tag-itempublished">{d_str}</div>
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
