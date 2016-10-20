/* eslint no-console:0 */
'use strict'
import { ABOUT_US_FOOTER, ARTICLE, CONTACT_FOOTER, LONGFORM_ARTICLE_STYLE, PHOTOGRAPHY, PHOTOGRAPHY_ARTICLE, PHOTOGRAPHY_ARTICLE_STYLE, PRIVACY_FOOTER, SITE_META, SITE_NAME, TOPIC, appId } from '../constants/index'
import { LeadingVideo } from '../components/article/LeadingVideo'
import { connect } from 'react-redux'
import { denormalizeArticles, getAbsPath } from '../utils/index'
import { fetchArticleIfNeeded } from '../actions/article'
import { fetchArticlesByUuidIfNeeded, fetchFeatureArticles, fetchRelatedArticlesIfNeeded } from '../actions/articles'
import { setBookmarksOfLongformArticle, setReadProgress, setPageType, setPageTitle, setArticleTopicList } from '../actions/header'
import * as ArticleComponents from '../components/article/index'
import DocumentMeta from 'react-document-meta'
import Footer from '../components/Footer'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import async from 'async'
import classNames from 'classnames'
import commonStyles from '../components/article/Common.scss'
import fbIcon from '../../static/asset/fb.svg'
import lineIcon from '../../static/asset/line.svg'
import leadingImgStyles from '../components/article/LeadingImage.scss'
import raf from 'raf' // requestAnimationFrame polyfill
import styles from './Article.scss'
import topicRightArrow from '../../static/asset/icon-topic-arrow-right.svg'
import twitterIcon from '../../static/asset/twitter.svg'

// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import has from 'lodash/has'
import map from 'lodash/map'
import merge from 'lodash/merge'
import set from 'lodash/set'
import sortBy from 'lodash/sortBy'

let articlePostition = {
  beginY: 120,
  endY: 200,
  percent: 0
}

const ArticlePlaceholder = () => {
  return (
    <div className={classNames(styles['placeholder'])}>
      <div className={classNames(styles['title-row'], commonStyles['inner-block'])}>
        <div className={styles['ph-title-1']}></div>
        <div className={styles['ph-title-2']}></div>
        <div className={styles['ph-author']}></div>
      </div>
      <div className={classNames(styles['leading-img'], leadingImgStyles['leading-img'])}>
        <div className={styles['ph-image']}></div>
      </div>
      <div className={classNames(styles.introduction, commonStyles['inner-block'])}>
        <div className={styles['ph-content']}></div>
        <div className={styles['ph-content']}></div>
        <div className={styles['ph-content-last']}></div>
      </div>
    </div>
  )
}

class Article extends Component {

  // for server side rendering,
  // we get not only the article itself but also get related articles and
  // other articles in the same topic for BETTER SEO
  static fetchData({ params, store }) {
    let slug = params.slug
    if (slug === ABOUT_US_FOOTER || slug === CONTACT_FOOTER || slug === PRIVACY_FOOTER) {
      return store.dispatch(fetchArticleIfNeeded(slug))
    }
    // get article itself first
    return store.dispatch(fetchArticleIfNeeded(slug)).then(() => {
      let state = store.getState()
      let error = get(state, 'selectedArticle.error')

      if (error !== null) {
        return Promise.reject(error)
      }

      let articleId = get(state, 'selectedArticle.id')
      let article = get(state, [ 'entities', 'articles', articleId ])
      let topicId = get(article, 'topics')
      let relateds = get(article, 'relateds', [])

      // fetch related articles and other articles in the same topic
      return new Promise((resolve, reject) => { // eslint-disable-line
        // load in parallel
        async.parallel([
          function (callback) {
            if (get(relateds, 'length', 0) > 0) {
              // fetch related articles
              store.dispatch(fetchRelatedArticlesIfNeeded(articleId, relateds))
                .then(() => {
                  callback(null)
                })
            } else {
              // fallback - fetch feature articles
              store.dispatch(fetchFeatureArticles())
                .then(() => {
                  callback(null)
                })
            }
          },
          function (callback) {
            // TODO Add loading-more functionality
            store.dispatch(fetchArticlesByUuidIfNeeded(topicId, TOPIC, { max_results: 30 }))
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

  constructor(props, context) {
    super(props, context)
    this._isFeatureArticlesFetched = false

    this._setArticleBounding = this._setArticleBounding.bind(this)
    this._onScroll = this._onScroll.bind(this)
    this._handleScroll = this._handleScroll.bind(this)

    // for requestAnimationFrame
    this._ticking = false
  }

  componentDidMount() {
    this._setArticleBounding()
    this._sendPageLevelAction()
    window.addEventListener('resize', this._setArticleBounding)
    // detect sroll position
    window.addEventListener('scroll', this._onScroll)
  }

  componentDidUpdate() {
    this._setArticleBounding()
    this._sendPageLevelAction()
  }

  componentWillMount() {
    const { params, selectedArticle } = this.props
    let slug = get(params, 'slug')

    // Check if selectedArticle is up to date
    if (get(selectedArticle, 'slug') !== slug) {
      // fetch data we need to render the whole article page
      this._fetchData()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._setArticleBounding)
    window.removeEventListener('scroll', this._onScroll)
    this._isFeatureArticlesFetched = false
    this._ticking = false
    this.clearRAF()
  }

  componentWillReceiveProps(nextProps) {
    const { params, selectedArticle } = nextProps
    const slug = get(params, 'slug')

    // Check if selectedArticle is up to date
    if (selectedArticle.slug !== slug) {
      // fetch data we need to render the whole article page
      this._fetchData()
    }
  }

  _requestTick() {
    if (!this._ticking) {
      this._raf = raf(this._handleScroll)
      this._ticking = true
    }
  }

  _onScroll() {
    this._requestTick()
  }

  clearRAF() {
    raf.cancel(this._raf)
  }

  _sendPageLevelAction() {
    const { entities, selectedArticle, setArticleTopicList, setBookmarksOfLongformArticle,  setPageTitle, setPageType } = this.props

    // normalized article
    let article = get(entities, [ 'articles', selectedArticle.id ], {})

    // in normalized article, article.topics is an id
    let topicName = get(entities, [ 'topics', get(article, 'topics'), 'name' ])

    let style = get(article, 'style')

    if (style === PHOTOGRAPHY_ARTICLE_STYLE) {
      setPageType(PHOTOGRAPHY_ARTICLE)
    } else if (style === LONGFORM_ARTICLE_STYLE) {
      setPageType(LONGFORM_ARTICLE_STYLE)
      let relatedBookmarks = get(article, 'relatedBookmarks', [])
      const { bookmark, bookmarkOrder, publishedDate, slug } = article
      let curBookMark = {
        style,
        slug,
        bookmark,
        bookmarkOrder,
        publishedDate,
        isSelected: true
      }
      let bookmarks = relatedBookmarks.concat(curBookMark)
      bookmarks = sortBy(bookmarks, 'bookmarkOrder')
      setBookmarksOfLongformArticle(bookmarks)
    } else {
      setPageType(ARTICLE)
    }

    // set navbar title for this article
    setPageTitle(article.id, article.title, topicName)

    let topicArr = this._getTopicArticles(get(article, 'topics'))
    // dispatch action for the navbar to display article list
    setArticleTopicList(topicArr)
  }

  // fetch article whole data, including body, related articls and other articles in the same topic
  _fetchData() {
    const { entities, fetchArticleIfNeeded, fetchArticlesByUuidIfNeeded, fetchFeatureArticles, fetchRelatedArticlesIfNeeded, params, slugToId } = this.props
    let slug = get(params, 'slug')

    // fetch article
    fetchArticleIfNeeded(slug)

    // normalized article
    let article = get(entities, [ 'articles', slugToId[slug] ])

    // in normalized article, article.topics is not an object, just an id.
    let topicId = get(article, 'topics')
    // in normalized article, article.relateds is an array of objects, just an array of ids
    let relateds = get(article, 'relateds', [])

    //  fetch other articles in the same topic
    // TODO Add loading-more functionality
    fetchArticlesByUuidIfNeeded(topicId, TOPIC, { max_results: 30 })

    // fetch related articles
    fetchRelatedArticlesIfNeeded(get(article, 'id'), relateds)

    if (!this._isFeatureArticlesFetched) {
      // fallback - fetch feature articles
      fetchFeatureArticles()
      this._isFeatureArticlesFetched = true
    }
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
    articlePostition.beginY = get(beginEl, 'offsetTop', articlePostition.beginY)
    articlePostition.endY = get(endEl, 'offsetTop', articlePostition.endY)
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
    if(percent !== curPercent) {
      articlePostition.percent = curPercent
      // update the header progress bar
      this.props.setReadProgress(curPercent)
    }

    // reset the tick so we can
    // capture the next onScroll
    this._ticking = false
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
          authors.push(merge({}, author, { type: type }))
        })
      }
    })
    return authors
  }

  _getTopicArticles(topicId) {
    const { articlesByUuids, entities } = this.props
    let articleIds = get(articlesByUuids, [ topicId, 'items' ], [])
    return map(articleIds, (id) => merge({}, get(entities, [ 'articles', id ])))
  }

  _getFeatureArticles() {
    const { entities, featureArticles } = this.props
    let rtn = []

    if (featureArticles.isFetching) {
      return rtn
    } else if (featureArticles.error !== null) {
      this._isFeatureArticlesFetched = false
      return rtn
    }

    let articles = get(entities, 'articles', {})
    let articleIds = get(featureArticles, 'items', [])
    forEach(articleIds, (id) => {
      if (has(articles, id)) {
        rtn.push(merge({}, articles[id]))
      }
    })
    return rtn
  }

  render() {
    const { entities, params, selectedArticle } = this.props
    const isFetching = get(selectedArticle, 'isFetching')

    if (get(selectedArticle, 'slug') !== get(params, 'slug')) {
      return null
    }

    // unnormalized article
    let article = denormalizeArticles(get(selectedArticle, 'id'), entities)[0] || {}
    let relatedArticles = get(article, 'relateds')

    let slug = get(params, 'slug')
    let useFallback = (slug === ABOUT_US_FOOTER || slug === CONTACT_FOOTER || slug === PRIVACY_FOOTER) ? false : true

    // fallback - use feature article
    if (get(relatedArticles, 'length', 0) === 0 && useFallback) {
      relatedArticles = this._getFeatureArticles()
    }

    let authors = this._composeAuthors(article)
    let bodyData = get(article, [ 'content', 'apiData' ], [])
    let leadingVideo = get(article, 'leadingVideo.video.url', '')
    let leadingVideoTitle = get(article, 'leadingVideo.video.title', '')
    let heroImage = get(article, [ 'heroImage' ], null)
    let heroImageSize = get(article, [ 'heroImageSize' ], 'normal')
    let introData = get(article, [ 'brief', 'apiData' ], [])
    let copyright = get(article, [ 'copyright' ], [])
    const cUrl = getAbsPath(this.context.location.pathname, this.context.location.search)
    const outerClass = (article.style===PHOTOGRAPHY_ARTICLE_STYLE) ?
                 classNames(styles['article-container'], styles['photo-container']) : styles['article-container']
    const contentClass = (article.style===PHOTOGRAPHY_ARTICLE_STYLE) ?
                 classNames(styles['article-inner'], styles['photo-page-inner']) : styles['article-inner']


    let topicName = get(article, 'topics.name')
    let topicBlock = topicName ? <span className={styles['topic-name']}>{topicName} <img src={topicRightArrow} /></span> : null
    let topicArr = this._getTopicArticles(get(article, 'topics.id'))

    let subtitle = get(article, 'subtitle', '')
    let subtitleBlock = subtitle ? <span className={styles['subtitle']}>{subtitle}</span> : null

    const meta = {
      title: get(article, [ 'title' ], SITE_NAME.FULL) + SITE_NAME.SEPARATOR + SITE_NAME.SHORT,
      description: get(article, [ 'ogDescription' ], SITE_META.DESC),
      canonical: SITE_META.URL + 'a/' + get(article, [ 'slug' ], ''),
      meta: { property: {} },
      auto: { ograph: true }
    }

    if (get(article, [ 'ogImage' ], null)) {
      set(meta, [ 'meta', 'property', 'og:image' ], get(article, 'ogImage.image.resizedTargets.desktop.url', ''))
    }

    return (
      <DocumentMeta {...meta}>
        <div itemScope itemType="http://schema.org/Article">
          {isFetching ? <div className={outerClass}><ArticlePlaceholder /></div> :

          <div className={outerClass}>
            { leadingVideo ? <LeadingVideo title={leadingVideoTitle} src={leadingVideo} poster={get(heroImage, [ 'image', 'resizedTargets' ])} /> : null }
            <article className={contentClass}>
              <div className={classNames(styles['title-row'], commonStyles['inner-block'])}>
                <hgroup>
                  <h3 itemProp="about">{topicBlock}{subtitleBlock}</h3>
                  <h1 itemProp="headline">{article.title}</h1>
                </hgroup>
              </div>

              <div ref="progressBegin" className={classNames(styles['article-meta'], commonStyles['inner-block'])}>
                <ArticleComponents.HeadingAuthor
                  authors={authors}
                  extendByline={get(article, 'extendByline')}
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

              {
                !leadingVideo ?
                  <div className={styles['leading-img']}>
                    <ArticleComponents.LeadingImage
                      size={heroImageSize}
                      image={get(heroImage, [ 'image', 'resizedTargets' ])}
                      id={get(heroImage, 'id')}
                      description={get(heroImage, 'description' )}
                    />
                  </div> : null
              }

              <div className={classNames(styles.introduction, commonStyles['inner-block'])}>
                <ArticleComponents.Introduction
                  data={introData}
                />
              </div>

              <ArticleComponents.Body
                data={bodyData}
              />
            </article>

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
          }
          {/*<ArticleComponents.PageNavigation
            article={ get(article, [ 'relateds', 0 ])}
            navigate="next"
          />
          <ArticleComponents.PageNavigation
            article={get(article, [ 'relateds', 1 ])}
            navigate="previous"
          />*/}
          <Footer
            theme={get(article, 'style') === PHOTOGRAPHY_ARTICLE_STYLE ? PHOTOGRAPHY : ARTICLE}
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
    featureArticles: state.featureArticles,
    selectedArticle: state.selectedArticle,
    slugToId: state.slugToId
  }
}

Article.contextTypes = {
  device: React.PropTypes.string,
  location: React.PropTypes.object
}

Article.propTypes = {
  articlesByUuids: React.PropTypes.object,
  entities: React.PropTypes.object,
  featureArticles: React.PropTypes.object,
  params: React.PropTypes.object,
  selectedArticle: React.PropTypes.object,
  slugToId: React.PropTypes.object
}

Article.defaultProps = {
  articlesByUuids: {},
  entities: {},
  featureArticles: {},
  params: {},
  selectedArticle: {},
  slugToId: {}
}

export { Article }
export default connect(mapStateToProps, { fetchArticleIfNeeded, fetchRelatedArticlesIfNeeded, fetchFeatureArticles,
  fetchArticlesByUuidIfNeeded, setBookmarksOfLongformArticle, setReadProgress, setPageType, setPageTitle, setArticleTopicList })(Article)
