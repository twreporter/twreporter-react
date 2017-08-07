/* eslint no-console:0 */
'use strict'
import MobileArticleTools from '../components/article/tools/MobileArticleTools'
import DesktopArticleTools from '../components/article/tools/DesktopArticleTools'
import FontChangeButton from '../components/FontChangeButton'
import Helmet from 'react-helmet'
import PrintButton from '../components/shared/PrintButton'
import PromotionBanner from '../components/shared/PromotionBanner'
import LeadingVideo from '../components/shared/LeadingVideo'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SystemError from '../components/SystemError'
import backToTopicIcon from '../../static/asset/back-to-topic.svg'
import cx from 'classnames'
import commonStyles from '../components/article/Common.scss'
import fbIcon from '../../static/asset/fb.svg'
import leadingImgStyles from '../components/article/LeadingImage.scss'
import lineIcon from '../../static/asset/line.svg'
import logoIcon from '../../static/asset/icon-placeholder.svg'
import raf from 'raf' // requestAnimationFrame polyfill
import styles from './Article.scss'
import topicRightArrow from '../../static/asset/icon-topic-arrow-right.svg'
import twitterIcon from '../../static/asset/twitter.svg'
import twreporterRedux from 'twreporter-redux'

import { ABOUT_US_FOOTER, ARTICLE_STYLE, BRIGHT, CONTACT_FOOTER, DARK,  PHOTOGRAPHY_ARTICLE_STYLE, PRIVACY_FOOTER, SITE_META, SITE_NAME, appId, LINK_PREFIX } from '../constants/index'
import { Link } from 'react-router'
import { camelizeKeys } from 'humps'
import { connect } from 'react-redux'
import { date2yyyymmdd } from '../utils/index'
import { getAbsPath } from '../utils/index'
import { setHeaderInfo, setReadProgress, setArticleTools } from '../actions/header'
import * as ArticleComponents from '../components/article/index'

// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import has from 'lodash/has'
import map from 'lodash/map'
import merge from 'lodash/merge'
import set from 'lodash/set'
import sortBy from 'lodash/sortBy'
import throttle from 'lodash/throttle'

const _ = {
  throttle,
  forEach,
  get,
  has,
  map,
  merge,
  set,
  sortBy
}

const { actions, reduxStateFields, utils } = twreporterRedux
const { fetchAFullPost } = actions

/* Issue need to be solved: _setArticleBounding doesn't get right endY if there are lazyload imgs or embedded items */
let articlePostition = {
  beginY: 120,
  endY: 200,
  percent: 0
}

let scrollPosition = {
  y: 0
}

let viewportHeight = 0

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
    const slug = params.slug
    if (slug === ABOUT_US_FOOTER || slug === CONTACT_FOOTER || slug === PRIVACY_FOOTER) {
      store.dispatch(setHeaderInfo({
        pageTheme: BRIGHT,
        pageType: ARTICLE_STYLE
      }))
      return store.dispatch(fetchAFullPost(slug))
    }
    // get article itself first
    return store.dispatch(fetchAFullPost(slug)).then(() => {
      const state = store.getState()
      const entities = _.get(state, reduxStateFields.entities, {})
      const selectedPost = _.get(state, reduxStateFields.selectedPost, {})
      const style = _.get(entities, [ reduxStateFields.postsInEntities, slug, 'style' ])

      if (_.get(selectedPost, 'error')) {
        return Promise.reject(_.get(selectedPost, 'error'))
      }

      store.dispatch(setHeaderInfo({
        pageTheme: style !== PHOTOGRAPHY_ARTICLE_STYLE ? BRIGHT : DARK,
        pageType: style
      }))
    })
  }

  constructor(props, context) {
    super(props, context)

    this._setArticleBounding = this._setArticleBounding.bind(this)
    this._onScroll = _.throttle(this._onScroll, 200).bind(this)
    this._handleScroll = this._handleScroll.bind(this)
    this._onResize = this._onResize.bind(this)

    // for requestAnimationFrame
    this._ticking = false
    this.state = {
      fontSize:'medium',
      isFontSizeSet:false
    }
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  getChildContext() {
    const { entities, selectedPost } = this.props
    const slug = _.get(selectedPost, 'slug', '')
    let post = _.get(entities, [ reduxStateFields.postsInEntities, slug ], {})
    let style = _.get(post, 'style')
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
    viewportHeight = window.innerHeight
    this._setArticleBounding()
    window.addEventListener('resize', this._onResize)
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
    const { params } = this.props
    let slug = _.get(params, 'slug')

    this.props.fetchAFullPost(slug)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._onResize)
    window.removeEventListener('scroll', this._onScroll)
    scrollPosition.y = 0
    this._ticking = false
    this.clearRAF()
  }

  componentWillReceiveProps(nextProps) {
    const { params } = nextProps
    const slug = _.get(params, 'slug')
    if (slug !== _.get(this.props, 'selectedPost.slug')) {
      this.props.fetchAFullPost(slug)
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
    const { entities, selectedPost, setHeaderInfo } = this.props
    const slug = _.get(selectedPost, 'slug')
    if (!slug) {
      return
    }

    const post = _.get(entities, [ reduxStateFields.postsInEntities, slug ], {})

    const topic = _.get(entities, [ reduxStateFields.topicsInEntities, _.get(post, 'topics') ])
    const topicName = _.get(topic, 'topic_name')
    const topicSlug = _.get(topic, 'slug')

    let style = _.get(post, 'style')
    let theme = BRIGHT

    if (style === PHOTOGRAPHY_ARTICLE_STYLE) {
      theme = DARK
    }

    setHeaderInfo({
      articleId: post.id,
      showBackToTopicIcon: topicSlug ? true : false,
      pageTitle: post.title,
      pageTheme: theme,
      pageTopic: topicName,
      pageType: style,
      readPercent: 0,
      topicSlug
    })
  }

  _getCumulativeOffset(element) {
    let top = 0
    do {
      top += element.offsetTop  || 0
      element = element.offsetParent
    } while(element)

    return top
  }

  _onResize() {
    this._setArticleBounding()
    viewportHeight = window.innerHeight
  }

  _setArticleBounding() {
    const beginEl = ReactDOM.findDOMNode(this.refs.progressBegin)
    const endEl = ReactDOM.findDOMNode(this.refs.progressEnding)
    articlePostition.beginY = _.get(beginEl, 'offsetTop', articlePostition.beginY)
    articlePostition.endY = _.get(endEl, 'offsetTop', articlePostition.endY)
  }

  _handleScroll() {
    const currentTopY = window.scrollY
    const currentBottomY = currentTopY + viewportHeight
    const { beginY, endY, percent } = articlePostition

    /* Calculate reading progress */
    let scrollRatio = Math.abs((currentTopY-beginY) / (endY-beginY))
    if(currentTopY < beginY) {
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

    /* Handle Article Tools */
    const { articleTools, setArticleTools } = this.props
    const { isMobileToolsDisplayed, isDesktopToolsDisplayed } = articleTools

    const isInTopRegion = currentTopY < beginY + 600
    const isInBottomRegion = currentBottomY > endY + 150
  
    if (isInTopRegion || isInBottomRegion) {
      if (isMobileToolsDisplayed || isDesktopToolsDisplayed) {
        setArticleTools({
          isMobileToolsDisplayed: false,
          isDesktopToolsDisplayed: false
        })
      }
    } else {
      if (!isDesktopToolsDisplayed) {
        setArticleTools({
          isDesktopToolsDisplayed: true
        })
      }
    }
    // Calculate scrolling distance to determine whether tools are displayed
    const lastY = scrollPosition.y
    const distance = currentTopY - lastY
    if (distance > 30) {
      scrollPosition.y = currentTopY
      if (isMobileToolsDisplayed) {
        setArticleTools({
          isMobileToolsDisplayed: false
        })
      }
    } else {
      if (Math.abs(distance) > 180) {
        scrollPosition.y = currentTopY
        if (!isMobileToolsDisplayed && !isInTopRegion && !isInBottomRegion) {
          setArticleTools({
            isMobileToolsDisplayed: true
          })
        }
      }
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

  render() {
    const { entities, params, selectedPost, articleTools } = this.props
    
    const error = _.get(selectedPost, 'error')

    if (error) {
      return (
        <div>
          <SystemError error={error} />
        </div>
      )
    }

    if (_.get(selectedPost, 'slug') !== _.get(params, 'slug')) {
      return null
    }

    const isFetching = _.get(selectedPost, 'isFetching')
    if (isFetching) {
      return (
        <div className={outerClass}><ArticlePlaceholder /></div>
      )
    }

    const { isMobileToolsDisplayed, isDesktopToolsDisplayed } = articleTools

    const postEntities = _.get(entities, reduxStateFields.postsInEntities)
    const topicEntities = _.get(entities, reduxStateFields.topicsInEntities)
    // const topicSlugOfSelectedPost = _.get(postEntities, [ selectedPost.slug, 'topics' ], '')
    const slug = _.get(selectedPost, 'slug', '')
    const article = camelizeKeys(_.get(postEntities, slug))
    const relateds = camelizeKeys(utils.denormalizePosts(_.get(article, 'relateds', []), postEntities))
    const topics = camelizeKeys(utils.denormalizeTopics(_.get(article, 'topics', []), topicEntities, postEntities))
    const topic = topics[0]
    const authors = this._composeAuthors(article)
    const bodyData = _.get(article, [ 'content', 'apiData' ], [])
    const leadingVideo = _.get(article, 'leadingVideo', null)
    const heroImage = _.get(article, [ 'heroImage' ], null)
    const heroImageSize = _.get(article, [ 'heroImageSize' ], 'normal')
    const introData = _.get(article, [ 'brief', 'apiData' ], [])
    const cUrl = getAbsPath(this.context.location.pathname, this.context.location.search)
    const outerClass = (article.style===PHOTOGRAPHY_ARTICLE_STYLE) ?
                 cx(styles['article-container'], styles['photo-container']) : styles['article-container']
    const contentClass = (article.style===PHOTOGRAPHY_ARTICLE_STYLE) ?
                 cx(styles['article-inner'], styles['photo-page-inner']) : styles['article-inner']

    
    const topicName = _.get(topic, 'topicName')
    const topicTitle = _.get(topic, 'title')
    const topicSlug = _.get(topic, 'slug')
    const topicBlock = topicName ? <Link className={styles['topic-block']} to={`${LINK_PREFIX.TOPICS}${topicSlug}`}><span className={styles['topic-name']}>{topicName} <img src={topicRightArrow} /></span></Link> : null
    const topicArr = _.get(topic, 'relateds')

    const subtitle = _.get(article, 'subtitle', '')
    const subtitleBlock = subtitle ? <span itemProp="alternativeHeadline" className={styles['subtitle']}>{subtitle}</span> : null

    const updatedAt = _.get(article, 'updatedAt') || _.get(article, 'publishedDate')

    // for head tag
    const canonical = SITE_META.URL + 'a/' + slug
    const articleTitle = _.get(article, 'title', '') + SITE_NAME.SEPARATOR + SITE_NAME.FULL
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
                  filetype={_.get(leadingVideo, 'filetype')}
                  title={_.get(leadingVideo, 'title')}
                  src={_.get(leadingVideo, 'url')}
                  poster={_.get(heroImage, 'resizedTargets')}
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
                <div className={cx(styles['icons'], 'hidden-print')}>
                  <ArticleComponents.ShareBt
                    appId={appId}
                    url={cUrl}
                    title={article.title}
                    fbIcon={fbIcon}
                    twitterIcon={twitterIcon}
                    lineIcon={lineIcon}
                  />
                  <PrintButton />
                  <FontChangeButton changeFontSize={(fontSize)=>this.changeFontSize(fontSize)} fontSize={this.state.fontSize}/>
                </div>
              </div>


              {
                !leadingVideo ?
                  <div className={styles['leading-img']}>
                    <ArticleComponents.LeadingImage
                      size={heroImageSize}
                      image={_.get(heroImage, 'resizedTargets')}
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
                className={cx(commonStyles['components'], 'hidden-print')}>
              <div className={cx('inner-max', commonStyles['component'])}>
                <ArticleComponents.BottomTags
                  data={article.tags}
                />
              </div>
              { topicTitle ?
                <Link to={`${LINK_PREFIX.TOPICS}${topicSlug}`}>
                  <div className={cx(styles['promotion'], 'center-block')}>
                    <PromotionBanner
                      bgImgSrc={_.get(topic, 'leadingImage.resizedTargets.tablet.url')}
                      headline={_.get(topic, 'headline')}
                      iconImgSrc={backToTopicIcon}
                      title={topicTitle}
                      subtitle={_.get(topic, 'subtitle')}
                    />
                  </div>
                </Link>
                : null }
              <ArticleComponents.BottomRelateds
                relateds={relateds}
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
          <div className="hidden-print">
          </div>
        </div>
        <MobileArticleTools topicTitle={topicTitle} topicSlug={topicSlug} isMobileToolsDisplayed={isMobileToolsDisplayed}/>
        <DesktopArticleTools topicTitle={topicTitle} topicSlug={topicSlug} isDesktopToolsDisplayed={isDesktopToolsDisplayed} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const entities = state[reduxStateFields.entities]
  const selectedPost = state[reduxStateFields.selectedPost]
  return {
    entities,
    selectedPost,
    articleTools: state.header.articleTools
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
  entities: React.PropTypes.object,
  selectedPost: React.PropTypes.object,
  params: React.PropTypes.object,
  articleTools: React.PropTypes.shape({
    isDesktopToolsDisplayed: React.PropTypes.bool,
    isMobileToolsDisplayed: React.PropTypes.bool
  })
}

Article.defaultProps = {
  entities: {},
  selectedPost: {},
  params: {}
}

export { Article }
export default connect(mapStateToProps, { fetchAFullPost, setHeaderInfo, setReadProgress, setArticleTools })(Article)
