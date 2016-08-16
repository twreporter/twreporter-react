/* eslint no-console:0 */
'use strict'
import { connect } from 'react-redux'
import { denormalizeArticles, getAbsPath } from '../utils/index'
import { fetchArticleIfNeeded } from '../actions/article'
import { fetchArticlesByUuidIfNeeded, fetchRelatedArticlesIfNeeded } from '../actions/articles'
import { setReadProgress, setPageType, setPageTitle, setArticleTopicList } from '../actions/header'
import { ARTICLE, TOPIC, appId } from '../constants/index'
import _ from 'lodash'
import * as ArticleComponents from '../components/article/index'
import Footer from '../components/Footer'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import commonStyles from '../components/article/Common.scss'
import DocumentMeta from 'react-document-meta'
import async from 'async'
import fbIcon from '../../static/asset/fb.svg'
import lineIcon from '../../static/asset/line.svg'
import styles from './Article.scss'
import twitterIcon from '../../static/asset/twitter.svg'

let articlePostition = {
  beginY: 120,
  endY: 200,
  percent: 0
}

class Article extends Component {

  // for server side rendering,
  // we get not only the article itself but also get related articles and
  // other articles in the same topic for BETTER SEO
  static fetchData({ params, store }) {
    // get article itself first
    return store.dispatch(fetchArticleIfNeeded(params.slug)).then(() => {
      let state = store.getState()
      let articleId = _.get(state, 'selectedArticle.id')
      let article = _.get(state, [ 'entities', 'articles', articleId ])
      let topicId = _.get(article, 'topics')
      let relateds = _.get(article, 'relateds')

      // fetch related articles and other articles in the same topic
      return new Promise((resolve, reject) => { // eslint-disable-line
        // load in parallel
        async.parallel([
          function (callback) {
            store.dispatch(fetchRelatedArticlesIfNeeded(articleId, relateds))
              .then(() => {
                callback(null)
              })
          },
          function (callback) {
            store.dispatch(fetchArticlesByUuidIfNeeded(topicId, TOPIC))
              .then(() => {
                callback(null)
              })
          }
        ], (err, results) => { // eslint-disable-line
          if (err) {
            console.warn('fetchData occurs error:', err)
          }
          resolve()
        })
      })
    })
  }

  constructor(props) {
    super(props)
    this._setArticleBounding = this._setArticleBounding.bind(this)
    this._handleScroll = this._handleScroll.bind(this)
  }

  componentDidMount() {
    this.props.setPageType(ARTICLE)
    this._setArticleBounding()
    this._sendPageLevelAction()
    window.addEventListener('resize', this._setArticleBounding)

    // detect sroll position
    window.addEventListener('scroll', this._handleScroll)
  }

  componentDidUpdate() {
    this._setArticleBounding()
    this._sendPageLevelAction()
  }

  componentWillMount() {
    const { params, selectedArticle } = this.props
    let slug = _.get(params, 'slug')

    // Check if selectedArticle is up to date
    if (_.get(selectedArticle, 'slug') !== slug) {
      // fetch data we need to render the whole article page
      this._fetchData()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { params, selectedArticle } = nextProps
    const slug = _.get(params, 'slug')

    // Check if selectedArticle is up to date
    if (selectedArticle.slug !== slug) {
      // fetch data we need to render the whole article page
      this._fetchData()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._setArticleBounding)
    window.removeEventListener('scroll', this._handleScroll)
  }

  _sendPageLevelAction() {
    const { entities, selectedArticle, setArticleTopicList, setPageTitle } = this.props

    let article = _.get(entities, [ 'articles', selectedArticle.id ], {})
    let topicName = _.get(entities, [ 'topics', _.get(article, 'topics'), 'name' ])

    // set navbar title for this article
    setPageTitle(article.id, article.title, topicName)

    let topicArr = this._getTopicArticles(_.get(article, 'topics'))
    // dispatch action for the navbar to display article list
    setArticleTopicList(topicArr)
  }

  // fetch article whole data, including body, related articls and other articles in the same topic
  _fetchData() {
    const { entities, fetchArticleIfNeeded, fetchArticlesByUuidIfNeeded, fetchRelatedArticlesIfNeeded, params, slugToId } = this.props
    let slug = _.get(params, 'slug')

    // fetch article
    fetchArticleIfNeeded(slug)

    let article = _.get(entities, [ 'articles', slugToId[slug] ])
    let topicId = _.get(article, 'topics')
    let relateds = _.get(article, 'relateds')

    //  fetch other articles in the same topic
    fetchArticlesByUuidIfNeeded(topicId, TOPIC)

    // fetch related articles
    fetchRelatedArticlesIfNeeded(_.get(article, 'id'), relateds)
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
    articlePostition.beginY = _.get(beginEl, 'offsetTop', articlePostition.beginY)
    articlePostition.endY = _.get(endEl, 'offsetTop', articlePostition.endY)
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

  _getTopicArticles(topicId) {
    const { articlesByUuids, entities } = this.props
    let articleIds = _.get(articlesByUuids, [ topicId, 'items' ], [])
    return _.map(articleIds, (id) => _.merge({}, _.get(entities, [ 'articles', id ])))
  }

  render() {
    const { entities, params, selectedArticle } = this.props

    if (_.get(selectedArticle, 'slug') !== _.get(params, 'slug')) {
      return null
    }

    let article = denormalizeArticles(_.get(selectedArticle, 'id'), entities)[0] || {}
    let topicArr = this._getTopicArticles(_.get(article, 'topics.id'))
    let topicName = _.get(article, 'topics.name')
    let relatedArticles = _.get(article, 'relateds')
    let authors = this._composeAuthors(article)
    let bodyData = _.get(article, [ 'content', 'apiData' ], [])
    let heroImage = _.get(article, [ 'heroImage' ], null)
    let heroImageSize = _.get(article, [ 'heroImageSize' ], 'normal')
    let introData = _.get(article, [ 'brief', 'apiData' ], [])
    let copyright = _.get(article, [ 'copyright' ], [])
    const cUrl = getAbsPath(this.context.location.pathname, this.context.location.search)

    let topicBox = topicName ? <h3 className={commonStyles['topic-box']}>{topicName}</h3> : null
    const meta = {
      title: _.get(article, [ 'title' ], '報導者'),
      description: _.get(article, [ 'ogDescription' ], ''),
      canonical: 'https://www.twreporter.org/a/' + _.get(article, [ 'slug' ], []),
      meta: { property: {} },
      auto: { ograph: true }
    }

    if (_.get(heroImage, [ 'image', 'url' ])) {
      _.set(meta, [ 'meta', 'property', 'og:image' ], _.get(heroImage, [ 'image', 'url' ]))
    }

    return (
      <DocumentMeta {...meta}>
        <div>
          <div className={styles['article-container']}>
            <div className={classNames(styles['title-row'], commonStyles['inner-block'])}>
              <hgroup>
                {topicBox}
                <h1>{article.title}</h1>
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

            <div ref="progressEnding"
                className={classNames('inner-max', 'center-block', commonStyles['components'])}>
              <div className={classNames('inner-max', commonStyles['component'])}>
                <ArticleComponents.BottomTags
                  data={article.tags}
                />
              </div>
              <ArticleComponents.BottomRelateds
                relateds={relatedArticles}
                currentId={article.id}
                topicName={topicName}
                topicArr={topicArr}
              />
            </div>
          </div>
          {/*<ArticleComponents.PageNavigation
            article={ _.get(article, [ 'relateds', 0 ])}
            navigate="next"
          />
          <ArticleComponents.PageNavigation
            article={_.get(article, [ 'relateds', 1 ])}
            navigate="previous"
          />*/}
          <Footer
            copyright={copyright}/>
        </div>
      </DocumentMeta>
    )
  }
}

function mapStateToProps(state) {
  return {
    articlesByUuids: state.articlesByUuids,
    entities: state.entities,
    selectedArticle: state.selectedArticle,
    slugToId: state.slugToId
  }
}

Article.contextTypes = {
  device: React.PropTypes.string,
  location: React.PropTypes.object
}

export { Article }
export default connect(mapStateToProps, { fetchArticleIfNeeded, fetchRelatedArticlesIfNeeded,
  fetchArticlesByUuidIfNeeded, setReadProgress, setPageType, setPageTitle, setArticleTopicList })(Article)
