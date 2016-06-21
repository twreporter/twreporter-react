/* eslint no-unused-vars:0*/
'use strict'
import _ from 'lodash'
import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/index'
import { fetchArticleIfNeeded } from '../actions/article'
import { fetchArticlesByIdsIfNeeded } from '../actions/articles'
import { setReadProgress, setPageType, setPageTitle } from '../actions/header'
import * as ArticleComponents from '../components/article/index'
import * as page from '../constants/page-types'
import classNames from 'classnames'
import Footer from '../components/Footer'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styles from './Article.scss'

let articlePostition = {
  beginY: 100,
  endY: 200,
  percent: 0
}

export default class Article extends Component {
  static fetchData({ params, store }) {
    return store.dispatch(fetchArticleIfNeeded(params.slug))
  }

  constructor(props) {
    super(props)

    this._setArticleBounding = this._setArticleBounding.bind(this)
    this._handleScroll = this._handleScroll.bind(this)
  }

  componentDidMount() {
    this.props.setPageType(page.ARTICLE)
    this._setArticleBounding()
    window.addEventListener('resize', this._setArticleBounding)

    // detect sroll position
    window.addEventListener('scroll', this._handleScroll)

    const { fetchArticlesByIdsIfNeeded, setPageTitle, selectedArticle, entities } = this.props
    if (!selectedArticle.error && !selectedArticle.isFetching) {
      // set navbar title for this article
      setPageTitle(_.get(entities, [ 'articles', selectedArticle.id, 'title' ], ''))
      // fetch related articles
      let relatedIds = _.get(entities, [ 'articles', selectedArticle.id, 'relateds' ], [])
      fetchArticlesByIdsIfNeeded(relatedIds)
    }
  }

  componentDidUpdate() {
    this._setArticleBounding()
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

  componentWillUnmount() {
    window.removeEventListener('resize', this._setArticleBounding)
    window.removeEventListener('scroll', this._handleScroll)
  }

  _getCumulativeOffset(element) {
    let top = 0
    do {
      top += element.offsetTop  || 0
      element = element.offsetParent
    } while(element)

    return top
  }

  _setArticleBounding() {
    const beginEl = ReactDOM.findDOMNode(this.refs.progressBegin)
    const endEl = ReactDOM.findDOMNode(this.refs.progressEnding)
    articlePostition.beginY = beginEl.offsetTop
    articlePostition.endY = endEl.offsetTop
  }

  _handleScroll() {
    const { beginY, endY, percent } = articlePostition
    let scrollRatio = Math.abs((window.scrollY-beginY) / (endY-beginY))
    if(window.scrollY < beginY) {
      scrollRatio = 0
    } else if (scrollRatio > 1) {
      scrollRatio = 1
    }
    let curPercent = Math.round(scrollRatio*100)
    if(percent!== curPercent) {
      articlePostition.percent = curPercent
      // update the header progress bar
      this.props.setReadProgress(curPercent)
    }
  }

  _composeAuthors(article) {
    article = article || {}
    let authors = []
    const list = [ 'writters', 'photographers', 'designers', 'engineers' ]
    list.forEach((item) => {
      if (Array.isArray(article[item])) {
        article[item].forEach((author) => {
          // remove 's'. writters -> writter
          let type = item.slice(0, -1)
          authors.push(_.merge({}, author, { type: type }))
        })
      }
    })
    return authors
  }

  render() {
    const { selectedArticle, entities } = this.props
    let article = denormalizeArticles(selectedArticle.id, entities)[0]
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
            <div ref="progressBegin" className="col-md-2 text-right">
              <ArticleComponents.PublishDate
                date={article.publishedDate}
              />
            </div>
            <div className="col-md-12">
              <ArticleComponents.Introduction
                data={introData}
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

          <div ref="progressEnding" className="inner-max center-block">
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
          <ArticleComponents.BottomRelateds
            relateds={article.relateds}
          />
        </div>
        <ArticleComponents.PageNavigation
          article={ _.get(article, [ 'relateds', 0 ])}
          navigate="next"
        />
        <ArticleComponents.PageNavigation
          article={_.get(article, [ 'relateds', 1 ])}
          navigate="previous"
        />
        <Footer
          copyright={copyright}/>
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
export default connect(mapStateToProps, { fetchArticleIfNeeded, fetchArticlesByIdsIfNeeded, setReadProgress, setPageType, setPageTitle })(Article)
