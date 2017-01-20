/* eslint no-console:0 */
'use strict'
import { Link } from 'react-router'
import { ABOUT_US_FOOTER, BRIGHT, CONTACT_FOOTER, DARK, LONGFORM_ARTICLE_STYLE,  PHOTOGRAPHY_ARTICLE_STYLE, PRIVACY_FOOTER, SITE_META, SITE_NAME, TOPIC, appId } from '../constants/index'
import { connect } from 'react-redux'
import { date2yyyymmdd } from '../lib/date-transformer'
import { denormalizeArticles, getAbsPath } from '../utils/index'
import { fetchArticleIfNeeded } from '../actions/article'
import { fetchArticlesByUuidIfNeeded, fetchFeatureArticles, fetchRelatedArticlesIfNeeded } from '../actions/articles'
import { setHeaderInfo, setReadProgress } from '../actions/header'
import * as ArticleComponents from '../components/article/index'
import Helmet from 'react-helmet'
import PromotionBanner from '../components/shared/PromotionBanner'
import LeadingVideo from '../components/shared/LeadingVideo'
import Footer from '../components/Footer'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SystemError from '../components/SystemError'
import async from 'async'
import backToTopicIcon from '../../static/asset/back-to-topic.svg'
import cx from 'classnames'
import commonStyles from '../components/article/Common.scss'
import fbIcon from '../../static/asset/fb.svg'
import lineIcon from '../../static/asset/line.svg'
import leadingImgStyles from '../components/article/LeadingImage.scss'
import raf from 'raf' // requestAnimationFrame polyfill
import styles from './Article.scss'
import topicRightArrow from '../../static/asset/icon-topic-arrow-right.svg'
import twitterIcon from '../../static/asset/twitter.svg'
import FontChangeButton from '../components/FontChangeButton'
import logoIcon from '../../static/asset/icon-placeholder.svg'

// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import has from 'lodash/has'
import map from 'lodash/map'
import merge from 'lodash/merge'
import set from 'lodash/set'
import sortBy from 'lodash/sortBy'

const _ = {
  forEach,
  get,
  has,
  map,
  merge,
  set,
  sortBy
}

let articlePostition = {
  beginY: 120,
  endY: 200,
  percent: 0
}

const ArticlePlaceholder = () => {
  return (
    <div className={cx(styles['placeholder'])}>
      <div className={cx(styles['title-row'], commonStyles['inner-block'])}>
        <div className={styles['ph-title-1']}></div>
        <div className={styles['ph-title-2']}></div>
        <div className={styles['ph-author']}></div>
      </div>
      <div className={cx(styles['leading-img'], leadingImgStyles['leading-img'])}>
        <div className={styles['ph-image']}>
          <img src={logoIcon} className={styles['logo-icon']}/>
        </div>
      </div>
      <div className={cx(styles.introduction, commonStyles['inner-block'])}>
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
      let error = _.get(state, 'selectedArticle.error')

      if (error !== null) {
        return Promise.reject(error)
      }

      let articleId = _.get(state, 'selectedArticle.id')
      let article = _.get(state, [ 'entities', 'articles', articleId ])
      let topicId = _.get(article, 'topics')
      let relateds = _.get(article, 'relateds', [])

      // fetch related articles and other articles in the same topic
      return new Promise((resolve, reject) => { // eslint-disable-line
        // load in parallel
        async.parallel([
          function (callback) {
            if (_.get(relateds, 'length', 0) > 0) {
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
    this.state = {
      fontSize:'medium',
      isFontSizeSet:false
    }
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  getChildContext() {
    const { entities, selectedArticle } = this.props
    let article = _.get(entities, [ 'articles', selectedArticle.id ], {})
    let style = _.get(article, 'style')
    return {
      isPhotography: style === PHOTOGRAPHY_ARTICLE_STYLE
    }
  }

  changeFontSize(fontSize) {
    this.setState({
      fontSize:fontSize,
      isFontSizeSet:true
    })
    localStorage.setItem('fontSize',fontSize)
  }

  componentDidMount() {
    this._setArticleBounding()
    this._sendPageLevelAction()
    window.addEventListener('resize', this._setArticleBounding)
    // detect sroll position
    window.addEventListener('scroll', this._onScroll)
    let storedfontSize = localStorage.getItem('fontSize')
    if(storedfontSize !== null && !this.state.isFontSizeSet) {
      this.setState({
        fontSize:storedfontSize,
        isFontSizeSet:true
      })
    }
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

  componentWillUnmount() {
    window.removeEventListener('resize', this._setArticleBounding)
    window.removeEventListener('scroll', this._onScroll)
    this._isFeatureArticlesFetched = false
    this._ticking = false
    this.clearRAF()
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
    const { entities, selectedArticle, setHeaderInfo } = this.props

    // normalized article
    let article = _.get(entities, [ 'articles', selectedArticle.id ], {})

    // in normalized article, article.topics is an id
    let topic = _.get(entities, [ 'topics', _.get(article, 'topics') ])
    let topicName = _.get(topic, 'topicName', _.get(topic, 'name'))

    let style = _.get(article, 'style')
    let theme = BRIGHT
    let bookmarks = []

    if (style === PHOTOGRAPHY_ARTICLE_STYLE) {
      theme = DARK
    } else if (style === LONGFORM_ARTICLE_STYLE) {
      let relatedBookmarks = _.get(article, 'relatedBookmarks', [])
      const { bookmark, bookmarkOrder, publishedDate, slug } = article
      let curBookMark = {
        style,
        slug,
        bookmark,
        bookmarkOrder,
        publishedDate,
        isSelected: true
      }
      bookmarks = relatedBookmarks.concat(curBookMark)
      bookmarks = _.sortBy(bookmarks, 'bookmarkOrder')
    }

    const topicSlug = _.get(topic, 'slug', '')

    // WORKAROUND
    // Use title of topic to check if the topic is the new data structure or old one.
    // If topic is the new data structure, we show the backToTopic icon on the header,
    // otherwise show the toc(table of content) icon
    // TBD consolidate the topic data structure
    let topicArr
    let showBackToTopicIcon
    if (_.get(topic, 'title')) {
      showBackToTopicIcon = true
    } else {
      topicArr = this._getTopicArticles(_.get(article, 'topics'))
      showBackToTopicIcon = false
    }

    setHeaderInfo({
      articleId: article.id,
      showBackToTopicIcon,
      bookmarks,
      pageTitle: article.title,
      pageTheme: theme,
      pageTopic: topicName,
      pageType: style,
      readPercent: 0,
      topicArr,
      topicSlug
    })
  }

  // fetch article whole data, including body, related articls and other articles in the same topic
  _fetchData() {
    const { entities, fetchArticleIfNeeded, fetchArticlesByUuidIfNeeded, fetchFeatureArticles, fetchRelatedArticlesIfNeeded, params, slugToId } = this.props
    let slug = _.get(params, 'slug')

    // fetch article
    fetchArticleIfNeeded(slug)

    // normalized article
    let article = _.get(entities, [ 'articles', slugToId[slug] ])

    // in normalized article, article.topics is not an object, just an id.
    let topicId = _.get(article, 'topics')
    // in normalized article, article.relateds is an array of objects, just an array of ids
    let relateds = _.get(article, 'relateds', [])

    //  fetch other articles in the same topic
    // TODO Add loading-more functionality
    fetchArticlesByUuidIfNeeded(topicId, TOPIC, { max_results: 30 })

    // fetch related articles
    fetchRelatedArticlesIfNeeded(_.get(article, 'id'), relateds)

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

  _getFeatureArticles() {
    const { entities, featureArticles } = this.props
    let rtn = []

    if (featureArticles.isFetching) {
      return rtn
    } else if (featureArticles.error !== null) {
      this._isFeatureArticlesFetched = false
      return rtn
    }

    let articles = _.get(entities, 'articles', {})
    let articleIds = _.get(featureArticles, 'items', [])
    _.forEach(articleIds, (id) => {
      if (_.has(articles, id)) {
        rtn.push(_.merge({}, articles[id]))
      }
    })
    return rtn
  }

  render() {
    const { entities, params, selectedArticle } = this.props
    const error = _.get(selectedArticle, 'error', null)

    if (error !== null) {
      return (
        <div>
          <SystemError error={error} />
          <Footer />
        </div>
      )
    }

    const isFetching = _.get(selectedArticle, 'isFetching')

    if (_.get(selectedArticle, 'slug') !== _.get(params, 'slug')) {
      return null
    }

    // unnormalized article
    let article = denormalizeArticles(_.get(selectedArticle, 'id'), entities)[0] || {}
    let relatedArticles = _.get(article, 'relateds')

    let slug = _.get(params, 'slug')
    let useFallback = (slug === ABOUT_US_FOOTER || slug === CONTACT_FOOTER || slug === PRIVACY_FOOTER) ? false : true

    // fallback - use feature article
    if (_.get(relatedArticles, 'length', 0) === 0 && useFallback) {
      relatedArticles = this._getFeatureArticles()
    }

    const authors = this._composeAuthors(article)
    const bodyData = _.get(article, [ 'content', 'apiData' ], [])
    const leadingVideo = _.get(article, 'leadingVideo', null)
    const heroImage = _.get(article, [ 'heroImage' ], null)
    const heroImageSize = _.get(article, [ 'heroImageSize' ], 'normal')
    const introData = _.get(article, [ 'brief', 'apiData' ], [])
    const copyright = _.get(article, [ 'copyright' ], [])
    const cUrl = getAbsPath(this.context.location.pathname, this.context.location.search)
    const outerClass = (article.style===PHOTOGRAPHY_ARTICLE_STYLE) ?
                 cx(styles['article-container'], styles['photo-container']) : styles['article-container']
    const contentClass = (article.style===PHOTOGRAPHY_ARTICLE_STYLE) ?
                 cx(styles['article-inner'], styles['photo-page-inner']) : styles['article-inner']


    const topic = _.get(article, 'topics')
    const topicName = _.get(topic, 'topicName', _.get(topic, 'name'))
    const topicTitle = _.get(topic, 'title')
    const topicBlock = topicName ? <span className={styles['topic-name']}>{topicName} <img src={topicRightArrow} /></span> : null
    const topicArr = this._getTopicArticles(_.get(topic, 'id'))

    const subtitle = _.get(article, 'subtitle', '')
    const subtitleBlock = subtitle ? <span itemProp="alternativeHeadline" className={styles['subtitle']}>{subtitle}</span> : null

    const updatedAt = _.get(article, 'updatedAt') || _.get(article, 'publishedDate')

    // for head tag
    const canonical = SITE_META.URL + 'a/' + _.get(article, [ 'slug' ], '')
    const articleTitle = _.get(article, 'title') + SITE_NAME.SEPARATOR + SITE_NAME.FULL
    const articleDes = _.get(article, 'ogDescription', SITE_META.DESC)
    const articleImg = _.get(article, 'ogImage.image.resizedTargets.desktop.url', SITE_META.LOGO)

    return (
      <div>
        <Helmet
          title={articleTitle}
          link={[
            { rel: 'canonical', href: canonical }
          ]}
          meta={[
            { name: 'description', content: articleDes },
            { name: 'twitter:title', content: articleTitle || SITE_NAME.FULL },
            { name: 'twitter:image', content: articleImg },
            { name: 'twitter:description', content: articleDes },
            { name: 'twitter:card', content: 'summary_large_image' },
            { property: 'og:title', content: articleTitle || SITE_NAME.FULL },
            { property: 'og:description', content: articleDes },
            { property: 'og:image', content: articleImg },
            { property: 'og:type', content: 'article' },
            { property: 'og:url', content: canonical },
            { property: 'og:rich_attachment', content: 'true' }
          ]}
        />
        <div itemScope itemType="http://schema.org/Article">
          {isFetching ? <div className={outerClass}><ArticlePlaceholder /></div> :

          <div className={outerClass}>
            {
              leadingVideo ?
                <LeadingVideo
                  filetype={_.get(leadingVideo, 'video.filetype')}
                  title={_.get(leadingVideo, 'title')}
                  src={_.get(leadingVideo, 'video.url')}
                  poster={_.get(heroImage, [ 'image', 'resizedTargets' ])}
                /> : null
            }
              <article className={contentClass}>
              <div className={cx(styles['title-row'], commonStyles['inner-block'])}>
                <hgroup>
                  <h3>{topicBlock}{subtitleBlock}</h3>
                  <h1 itemProp="headline">{article.title}</h1>
                </hgroup>
                <div itemProp="publisher" itemScope itemType="http://schema.org/Organization">
                  <meta itemProp="name" content="報導者" />
                  <meta itemProp="email" content="contact@twreporter.org" />
                  <link itemProp="logo" href="https://www.twreporter.org/storage/images/logo.png" />
                  <link itemProp="url" href="https://www.twreporter.org/" />
                </div>
                <link itemProp="mainEntityOfPage" href={canonical} />
                <meta itemProp="dateModified" content={date2yyyymmdd(updatedAt, '-')} />
              </div>

              <div ref="progressBegin" className={cx(styles['article-meta'], commonStyles['inner-block'])}>
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
              <FontChangeButton changeFontSize={(fontSize)=>this.changeFontSize(fontSize)} fontSize={this.state.fontSize}/>
              </div>


              {
                !leadingVideo ?
                  <div className={styles['leading-img']}>
                    <ArticleComponents.LeadingImage
                      size={heroImageSize}
                      image={_.get(heroImage, [ 'image', 'resizedTargets' ])}
                      id={_.get(heroImage, 'id')}
                      description={_.get(heroImage, 'description' )}
                    />
                  </div> : null
              }

              <div className={cx(styles.introduction, commonStyles['inner-block'])}>
                <ArticleComponents.Introduction
                  data={introData}
                  fontSize={this.state.fontSize}
                />
              </div>

              <ArticleComponents.Body
                data={bodyData} fontSize={this.state.fontSize}
              />
            </article>

            <div ref="progressEnding"
                className={commonStyles['components']}>
              <div className={cx('inner-max', commonStyles['component'])}>
                <ArticleComponents.BottomTags
                  data={article.tags}
                />
              </div>
              { topicTitle ?
                <Link to={`/topics/${_.get(topic,'slug')}`}>
                  <div className={cx(styles['promotion'], 'center-block')}>
                    <PromotionBanner
                      bgImgSrc={_.get(topic, 'leadingImage.image.resizedTargets.tablet.url')}
                      headline={_.get(topic, 'headline')}
                      iconImgSrc={backToTopicIcon}
                      title={topicTitle}
                      subtitle={_.get(topic, 'subtitle')}
                    />
                  </div>
                </Link>
                : null }
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
            theme={_.get(article, 'style') === PHOTOGRAPHY_ARTICLE_STYLE ? DARK : BRIGHT}
            copyright={copyright}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    articlesByUuids: state.articlesByUuids,
    entities: state.entities,
    featureArticles: state.featureArticles,
    selectedArticle: state.selectedArticle,
    slugToId: state.articleSlugToId
  }
}

Article.childContextTypes = {
  isPhotography: React.PropTypes.bool
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
  fetchArticlesByUuidIfNeeded, setHeaderInfo, setReadProgress })(Article)
