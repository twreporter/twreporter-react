/* eslint no-unused-vars:0*/
'use strict'
import { getAbsPath } from '../lib/url-transformer'
import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/index'
import { fetchArticleIfNeeded } from '../actions/article'
import { fetchArticlesByIdsIfNeeded } from '../actions/articles'
import { setReadProgress, setPageType, setPageTitle } from '../actions/header'
import { ARTICLE, appId } from '../constants/index'
import _ from 'lodash'
import * as ArticleComponents from '../components/article/index'
import Footer from '../components/Footer'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import commonStyles from '../components/article/Common.scss'
import fbIcon from '../../static/asset/fb.svg'
import lineIcon from '../../static/asset/line.svg'
import styles from './Article.scss'
import twitterIcon from '../../static/asset/twitter.svg'

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
    this.props.setPageType(ARTICLE)
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
    const cUrl = getAbsPath(this.context.location.pathname, this.context.location.search)

    return (
      <div>
        <div className={styles['article-container']}>
          <div className={classNames(styles['title-row'], commonStyles['inner-block'])}>
            <hgroup>
              <h1 className={classNames('text-center')}>{article.title}</h1>
            </hgroup>
          </div>

          <div ref="progressBegin" className={classNames(styles['article-meta'], commonStyles['inner-block'])}>
            <ArticleComponents.HeadingAuthor
              authors={authors}
              extendByline={_.get(article, 'extendByline')}
            >
              <ArticleComponents.PublishDate
                date={article.publishedDate}
              />
            </ArticleComponents.HeadingAuthor>
            <ArticleComponents.ShareBt
              appId={appId}
              url={cUrl}
              title={article.title}
              fbIcon={fbIcon}
              twitterIcon={twitterIcon}
              lineIcon={lineIcon}
            />
          </div>

          <div className={styles['leading-img']}>
            <ArticleComponents.LeadingImage
              size={heroImageSize}
              image={_.get(heroImage, [ 'image', 'resizedTargets' ])}
              id={_.get(heroImage, 'id')}
              description={_.get(heroImage, 'description' )}
            />
          </div>

          <div className={classNames(styles.introduction, commonStyles['inner-block'])}>
            <ArticleComponents.Introduction
              data={introData}
            />
          </div>

          <ArticleComponents.Body
            data={bodyData}
          />

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
  device: React.PropTypes.string,
  location: React.PropTypes.object
}

export { Article }
export default connect(mapStateToProps, { fetchArticleIfNeeded, fetchArticlesByIdsIfNeeded, setReadProgress, setPageType, setPageTitle })(Article)
