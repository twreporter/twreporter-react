/* eslint no-console:0 */
'use strict'

import ArticleMeta from '../components/article/article-meta'
import ArticleTools from './ArticleTools'
import Header from '@twreporter/react-components/lib/header'
import Helmet from 'react-helmet'
import LeadingImage from '../components/article/LeadingImage'
import LeadingVideo from '../components/shared/LeadingVideo'
import License from '../components/shared/License'
import LogoIcon from '../../static/asset/icon-placeholder.svg'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import ReadingProgress from '../components/article/ReadingProgress'
import SystemError from '../components/SystemError'
import TitleRowAbove from '../components/article/title-row-above'
import TitleRowUpon from '../components/article/title-row-upon'
import commonStyles from '../components/article/Common.scss'
import cx from 'classnames'
import deviceConst from '../constants/device'
import styled from 'styled-components'
import styles from './Article.scss'
import twreporterRedux from '@twreporter/redux'
import withLayout, { defaultTheme, photoTheme } from '../helpers/with-layout'
import { Body } from '../components/article/Body'
import { BottomRelateds } from '../components/article/BottomRelateds'
import { BottomTags } from '../components/article/BottomTags'
import { Introduction } from '../components/article/Introduction'
import { PHOTOGRAPHY_ARTICLE_STYLE, SITE_META, SITE_NAME, appId } from '../constants/index'
import { camelizeKeys } from 'humps'
import { connect } from 'react-redux'
import { getAbsPath, getScreenType } from '../utils/index'
import { globalColor, colors, componentMargin, letterSpace } from '../themes/common-variables'
import { screen } from '../themes/screen'
import { articleLayout as layout } from '../themes/layout'
//testing
import { TITLE_POSITION_ABOVE, TITLE_POSITION_UPON_LEFT,  NAVBAR_POSITION_UPON } from '../constants/page-themes'

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

const ArticleContainer = styled.div`
  background-color: ${ props => (props.bgColor ? props.bgColor : colors.gray.lightGray) };
  min-height: 20em;
  padding-top: ${ props => (props.titlePosition === TITLE_POSITION_UPON_LEFT ? '0' : '20px') };
`

const Content = styled.div`
  color: ${ props => (props.fontColor ? props.fontColor : globalColor.textColor)};
  a {
      border-bottom: 1px ${globalColor.primaryColor} solid;
      cursor: pointer;
      transition: 0.5s color ease;
      position: relative;
      color: ${ props => (props.fontColor ? props.fontColor : globalColor.textColor)};
      letter-spacing: ${letterSpace.generalLetterSpace};
      &:hover {
        color: ${globalColor.primaryColor};
      }
  }
`

const IntroductionContainer = styled.div`
  display: block;
  margin: 0 auto ${componentMargin.doubleMarginBottom} auto;
  ${screen.desktopAbove`
    width: ${layout.desktop.width.small}px;
  `}
  ${screen.tablet`
    width: ${layout.tablet.width.small}px;
  `}
  ${screen.mobile`
    margin: 0 ${componentMargin.horizontalMargin} ${componentMargin.doubleMarginBottom} ${componentMargin.horizontalMargin};
  `}
`

const HeaderContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  @media (max-width: 1023px) {
    display: none;
  }
`

const scrollPosition = {
  y: 0
}


const ArticlePlaceholder = () => {
  return (
    <div className={cx(styles['placeholder'])}>
      <div className={cx(styles['title-row'], commonStyles['inner-block'])}>
        <div className={styles['ph-title-1']}></div>
        <div className={styles['ph-title-2']}></div>
        <div className={styles['ph-author']}></div>
      </div>
      <div className={styles['leading-img']}>
        <div className={styles['ph-image']}>
          <LogoIcon className={styles['logo-icon']} />
        </div>
      </div>
      <IntroductionContainer>
        <div className={styles['ph-content']}></div>
        <div className={styles['ph-content']}></div>
        <div className={styles['ph-content-last']}></div>
      </IntroductionContainer>
    </div>
  )
}

class Article extends PureComponent {

  static fetchData({ params, store }) {
    const slug = params.slug
    return store.dispatch(fetchAFullPost(slug)).then(() => {
      const state = store.getState()
      const selectedPost = _.get(state, reduxStateFields.selectedPost, {})
      if (_.get(selectedPost, 'error')) {
        return Promise.reject(_.get(selectedPost, 'error'))
      }
      return Promise.resolve()
    })
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      fontSize:'medium',
      isFontSizeSet:false
    }

    this._onScroll = _.throttle(this._handleScroll, 300).bind(this)
    this._handleScroll = this._handleScroll.bind(this)

    // reading progress component
    this.rp = null

    // article tools
    this._toolsRef = null

    this.articleBody = null
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

  componentWillMount() {
    const { params } = this.props
    let slug = _.get(params, 'slug')
    this.props.fetchAFullPost(slug)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onScroll)

    scrollPosition.y = 0

    // unset global variables
    this.rp = null
    this._toolsRef = null
    this.articleBody = null
  }

  componentWillReceiveProps(nextProps) {
    const { params } = nextProps
    const slug = _.get(params, 'slug')
    const isFetching = _.get(nextProps, 'selectedPost.isFetching') || _.get(this.props, 'selectedPost.isFetching')
    if (slug !== _.get(this.props, 'selectedPost.slug') && !isFetching) {
      this.props.fetchAFullPost(slug)
    }
  }

  /**
   * Calculating the reading progress percentage.
   *
   * @param {number} top - the distance between the top of the element and the viewport top.
   * @param {number} height - the element's height
   */
  _handleReadingPercentage(top, height) {
    if (this.rp) {
      let scrollRatio = 0

      // top is less than 0,
      // which means the element is in the viewport now
      if (top < 0) {
        scrollRatio = Math.abs(top) / height
      }
      const curPercent = Math.round(scrollRatio * 100)
      // update the header progress bar
      this.rp.updatePercentage(curPercent)
    }
  }

  /**
   * According to scroll behavior and viewport width, it will render ArticleTools differnetly.
   * If viewport width is larger than desktop,
   * `ArticleTools` will show up when the top of element(`elementTop`) is approaching the viewport top,
   * and will be still there until the bottom of element(`elementBottom`) is approaching the viewport top.
   *
   * If viewport width is smaller than desktop,
   * `ArticleTools` will show up if users scroll up, and the scrolling distance is more than a certain distance as well.
   * Hides the `ArticleTools` if users scroll down.
   *
   * @param {number} elementTop - the distance between the top of the element and the viewport top.
   * @param {number} elementBottom - the distance between the bottom of the element and the viewport top
   * @param {Object} tools - instance of ArticleTools
   *
   * If elementTop/elementBottom is negative, which means element is already scrolled over the viewport top.
   */
  _handleDesktopToolBars(elementTop, elementBottom, tools) {
    const viewportHeight = window.innerHeight

    // set offset as 10%(refer to `topOffset` in the src/components/article/Body.js) of viewport height,
    // element  will be in the viewport when elementTop approaches the offset
    const offset = Math.round(viewportHeight * 0.1)
    // the top of element is approaching the top of the viewport,
    // render tools
    if (elementTop < offset) {
      tools.toggleTools(true)
    } else {
      // the top of element is far from the viewport top,
      // not render tools
      tools.toggleTools(false)
    }
    // the bottom of element is approaching the top of the viewport,
    // which means the content is almost out of the viewport,
    // no render tools
    if (elementBottom < offset) {
      tools.toggleTools(false)
    }
  }

  _handleNonDesktopToolBars(tools) {
    const currentTopY = window.scrollY

    // Calculate scrolling distance to determine whether tools are displayed
    const lastY = scrollPosition.y
    const distance = currentTopY - lastY
    if (distance > 30) {
      scrollPosition.y = currentTopY
      tools.toggleTools(false)
    } else {
      if (Math.abs(distance) > 150) {
        scrollPosition.y = currentTopY
        tools.toggleTools(true)
      }
    }
  }

  _handleScroll() {
    if (this.articleBody) {
      // top will be the distance between the top of body and the viewport top
      // bottom will be the distance between the bottom of body and the viewport top
      // height is the height of articleBody
      const { top, bottom, height } = this.articleBody.getBoundingClientRect()

      // render reading progress percentage
      this._handleReadingPercentage(top, height)

      // render tool bars
      if (this._toolsRef) {
        const screenType = getScreenType(window.innerWidth)

        // get ArticleTools react component
        const tools = this._toolsRef.getWrappedInstance()

        // set screen type
        tools.setScreenType(screenType)

        if (screenType === deviceConst.type.desktop) {
          this._handleDesktopToolBars(top, bottom, tools)
        } else {
          this._handleNonDesktopToolBars(tools)
        }
      }
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
    const { entities, params, selectedPost, theme } = this.props
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

    const postEntities = _.get(entities, reduxStateFields.postsInEntities)
    const topicEntities = _.get(entities, reduxStateFields.topicsInEntities)
    const slug = _.get(selectedPost, 'slug', '')
    const article = camelizeKeys(_.get(postEntities, slug))
    const articleStyle = _.get(article, 'style')
    // const outerClass = (articleStyle===PHOTOGRAPHY_ARTICLE_STYLE) ?
                //  cx(styles['article-container'], styles['photo-container']) : styles['article-container']
    const contentClass = (articleStyle===PHOTOGRAPHY_ARTICLE_STYLE) ?
                 cx(styles['article-inner'], styles['photo-page-inner']) : styles['article-inner']
    const isFetching = _.get(selectedPost, 'isFetching')

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

    const topicName = _.get(topic, 'topicName')
    const topicArr = _.get(topic, 'relateds')

    // const updatedAt = _.get(article, 'updatedAt') || _.get(article, 'publishedDate')

    // for head tag
    const canonical = SITE_META.URL + 'a/' + slug
    const articleTitle = _.get(article, 'title', '')
    const ogTitle = articleTitle + SITE_NAME.SEPARATOR + SITE_NAME.FULL
    const ogDesc = _.get(article, 'ogDescription', SITE_META.DESC)
    const ogImage = _.get(article, 'ogImage.resizedTargets.mobile.url', SITE_META.OG_IMAGE)

    const pathname = _.get(this.props, 'location.pathname')

    // theme
    const _theme = camelizeKeys(theme)
    const bgColor = _.get(_theme, 'bgColor')
    // const footerBgColor = _.get(_theme, 'footer_bg_color')
    const fontColor = _.get(_theme, 'fontColor')
    const titlePosition = _.get(_theme, 'titlePosition')
    const headerPosition = _.get(_theme, 'headerPosition')
    const titleColor = _.get(_theme, 'titleColor')
    const subTitleColor = _.get(_theme, 'subtitleColor')
    const topicColor = _.get(_theme, 'topicColor')
    const logoColor =  _.get(_theme, 'logoColor')
    const fontColorSet = {
      topicFontColor: topicColor,
      titleFontColor: titleColor,
      subtitleFontColor: subTitleColor
    }

    const license = _.get(article, 'copyright', 'Creative-Commons')

    return (
      <div>
        <Helmet
          title={ogTitle}
          link={[
            { rel: 'canonical', href: canonical }
          ]}
          meta={[
            { name: 'description', content: ogDesc },
            { name: 'twitter:title', content: ogTitle },
            { name: 'twitter:image', content: ogImage },
            { name: 'twitter:description', content: ogDesc },
            { name: 'twitter:card', content: 'summary_large_image' },
            { property: 'og:title', content: ogTitle },
            { property: 'og:description', content: ogDesc },
            { property: 'og:image', content: ogImage },
            { property: 'og:type', content: 'article' },
            { property: 'og:url', content: canonical },
            { property: 'og:rich_attachment', content: 'true' }
          ]}
        />
        <div itemScope itemType="http://schema.org/Article">
          {isFetching ? <ArticleContainer bgColor="transparent"><ArticlePlaceholder /></ArticleContainer> :
          <ArticleContainer
            bgColor={bgColor}
            titlePosition={titlePosition}
          >
            {
              leadingVideo ?
                <LeadingVideo
                  filetype={_.get(leadingVideo, 'filetype')}
                  title={_.get(leadingVideo, 'title')}
                  src={_.get(leadingVideo, 'url')}
                  poster={_.get(heroImage, 'resizedTargets')}
                /> : null
            }
            <ReadingProgress ref={ele => this.rp = ele}/>
            <Content
              fontColor={fontColor}
            >
              <article ref={div => {this.progressBegin = div}} className={contentClass}>
                {
                  titlePosition === TITLE_POSITION_ABOVE ?
                  <div>
                    <TitleRowAbove
                      article={article}
                      topic={topic}
                      canonical={canonical}
                      fontColorSet={fontColorSet}
                    />
                    <ArticleMeta
                      authors={authors}
                      extendByline={_.get(article, 'extendByline')}
                      publishedDate={article.publishedDate}
                      appId={appId}
                      url={cUrl}
                      title={article.title}
                      changeFontSize={(fontSize)=>this.changeFontSize(fontSize)}
                      fontSize={this.state.fontSize}
                    />
                  </div>
                : null
                }

                {
                  !leadingVideo && !this.props.ifDelegateImage ?
                    <div className={styles['leading-img']}>
                      <LeadingImage
                        size={heroImageSize}
                        description={_.get(article, 'leadingImageDescription', '')}
                        imgObj={heroImage}
                        titlePosition={titlePosition}
                      >
                        {
                          headerPosition === NAVBAR_POSITION_UPON ?
                            <HeaderContainer>
                              <Header
                                isIndex={false}
                                pathName={pathname}
                                fontColor={fontColor}
                                bgColor={''}
                                logoColor={logoColor}
                                headerPosition={headerPosition}
                              />
                            </HeaderContainer>
                          : null
                        }
                        {
                          titlePosition === TITLE_POSITION_UPON_LEFT ?
                            <TitleRowUpon
                              article={article}
                              topic={topic}
                              canonical={canonical}
                              fontColorSet={fontColorSet}
                            />
                          : null
                        }
                      </LeadingImage>
                    </div> : null
                }

                {
                  titlePosition === TITLE_POSITION_UPON_LEFT ?
                    <ArticleMeta
                      authors={authors}
                      extendByline={_.get(article, 'extendByline')}
                      publishedDate={article.publishedDate}
                      appId={appId}
                      url={cUrl}
                      title={article.title}
                      changeFontSize={(fontSize)=>this.changeFontSize(fontSize)}
                      fontSize={this.state.fontSize}
                    />
                  : null
                }
                <div
                  id="article-body"
                  ref={node => this.articleBody = node}
                >
                  <IntroductionContainer>
                    <Introduction
                      data={introData}
                      fontSize={this.state.fontSize}
                    />
                  </IntroductionContainer>
                  <Body
                    data={bodyData}
                    fontSize={this.state.fontSize}
                    articleStyle={articleStyle}
                  />
                </div>
              </article>
            </Content>
            <License license={license} publishedDate={article.publishedDate}/>
            <div className={cx(commonStyles['components'], 'hidden-print', styles['padding-patch'])}>
              <div className={cx('inner-max', commonStyles['component'])}>
                <BottomTags
                  data={article.tags}
                />
              </div>
              <BottomRelateds
                relateds={relateds}
                currentId={article.id}
                topicName={topicName}
                topicArr={topicArr}
              />
            </div>
          </ArticleContainer>
          }
          <div className="hidden-print">
            <ArticleTools
              ref={ ele => this._toolsRef = ele }
            />
          </div>
        </div>
      </div>
    )
  }
}

export function mapStateToProps(state) {
  const entities = state[reduxStateFields.entities]
  const selectedPost = state[reduxStateFields.selectedPost]
  const post = _.get(entities, [ reduxStateFields.postsInEntities, selectedPost.slug ], {})
  const style = post.style
  let theme = defaultTheme
  // backwards compatible for photo articles
  if (style === PHOTOGRAPHY_ARTICLE_STYLE) {
    theme = photoTheme
  }
  theme = post.theme || theme

  return {
    entities,
    selectedPost,
    theme
  }
}

Article.childContextTypes = {
  isPhotography: PropTypes.bool
}

Article.contextTypes = {
  location: PropTypes.object
}

Article.propTypes = {
  entities: PropTypes.object,
  ifDelegateImage: PropTypes.bool,
  params: PropTypes.object,
  selectedPost: PropTypes.object,
  theme: PropTypes.object
}

Article.defaultProps = {
  entities: {},
  ifDelegateImage: false,
  params: {},
  selectedPost: {},
  theme: defaultTheme
}

export { Article }
export default connect(mapStateToProps, { fetchAFullPost })(withLayout(Article))
