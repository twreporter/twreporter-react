/* eslint no-unused-vars:0*/
'use strict'
import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/index'
import { fetchArticleIfNeeded } from '../actions/article'
import * as ArticleComponents from '../components/article/index'
import _ from 'lodash'
import classNames from 'classnames'
import styles from './Article.scss'
import Footer from '../components/Footer'
import React, { Component } from 'react'

export default class Article extends Component {
  static fetchData({ params, store }) {
    return store.dispatch(fetchArticleIfNeeded(params.slug))
  }
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const slug = this.props.params.slug
    const { fetchArticleIfNeeded, selectedArticle } = this.props
    if (selectedArticle.slug !== slug || ( selectedArticle.isFetching === false && selectedArticle.error !== null) ) {
      fetchArticleIfNeeded(slug)
    }
  }

  componentWillReceiveProps(nextProps) {
    const slug = nextProps.params.slug
    const { fetchArticleIfNeeded, selectedArticle } = nextProps
    if (selectedArticle.slug !== slug || ( selectedArticle.isFetching === false && selectedArticle.error !== null) ) {
      fetchArticleIfNeeded(slug)
    }
  }

  shouldComponentUpdate(nextProps, nextState) { // eslint-disable-line
    if (this.props.selectedArticle.slug === nextProps.selectedArticle.slug) {
      return false
    }
    return true
  }

  _composeAuthors(article) {
    article = article || {}
    let authors = []
    const list = [ 'writters', 'photographers', 'designers', 'engineers' ]
    list.forEach((item) => {
      if (Array.isArray(article[item])) {
        article[item].forEach((author) => {
          // remove 's'. writters -> writter
          author.type = item.slice(0, -1)
          authors.push(author)
        })
      }
    })
    return authors
  }

  render() {
    const { selectedArticle, entities } = this.props
    let article = denormalizeArticles(selectedArticle.slug, entities)[0]
    let authors = this._composeAuthors(article)
    let bodyData = _.get(article, [ 'content', 'extended', 'apiData' ], [])
    let deduppedAuthors = _.uniq(authors, 'id')
    let heroImage = _.get(article, [ 'heroImage' ], null)
    let heroImageSize = _.get(article, [ 'heroImageSize' ], 'normal')
    let introData = _.get(article, [ 'content', 'brief', 'apiData' ], [])
    let copyright = _.get(article, [ 'copyright' ], [])
    return (
      <div className={styles.article}>
        <div ref="articleContainer">
          <div className={classNames('row', styles.titleRow, 'outer-max', 'center-block')}>
            <div className="col-md-12 text-center">
              <hgroup>
                <h1>{article.title}</h1>
              </hgroup>
            </div>
          </div>

          <div className="row outer-max center-block">
            <div className="col-md-10 text-left">
              <ArticleComponents.HeadingAuthor
                authors={authors}
              />
            </div>
            <div className="col-md-2 text-right">
              <ArticleComponents.PublishDate
                date={article.publishedDate}
              />
            </div>
          </div>

          <div className="row centrer-block">
            <div className="col-md-12">
              <ArticleComponents.LeadingImage
                size={heroImageSize}
                image={_.get(heroImage, [ 'image', 'resizedTargets' ])}
                id={_.get(heroImage, 'id')}
                description={_.get(heroImage, 'description' )}
              />
            </div>
          </div>

          <div className="row outer-max center-block">
            <div className="col-md-12">
              <ArticleComponents.Body
                data={bodyData}
              />
            </div>
          </div>

          <div className="inner-max center-block">
            <div className="row">
              <div className="col-md-12">
                <ArticleComponents.BottomTags
                  data={article.tags}
                />
              </div>
            </div>
            <ArticleComponents.BottomAuthor
              authors={deduppedAuthors}
            />
          </div>
        </div>
        <Footer copyright={copyright}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedArticle: state.selectedArticle,
    entities: state.entities
  }
}

Article.contextTypes = {
  device: React.PropTypes.string
}

export { Article }
export default connect(mapStateToProps, { fetchArticleIfNeeded })(Article)
