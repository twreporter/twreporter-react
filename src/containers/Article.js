/* eslint no-console:0 */
'use strict'

import ArticleTools from './ArticleTools'
import Helmet from 'react-helmet'
import License from '../components/shared/License'
import Loadable from 'react-loadable'
import LogoIcon from '../../static/asset/icon-placeholder.svg'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import ReadingProgress from '../components/article/ReadingProgress'
import SystemError from '../components/SystemError'
import commonClassNames from '../components/article/Common.scss'
import cx from 'classnames'
import deviceConst from '../constants/device'
import DonationBox from '../components/shared/DonationBox'
import constStyledComponents from '../constants/styled-components'
import styled from 'styled-components'
import classNames from './Article.scss'
import twreporterRedux from '@twreporter/redux'
import layoutMaker from '../components/article/layout/layout-maker'
import { Body } from '../components/article/Body'
import { BottomRelateds } from '../components/article/BottomRelateds'
import { BottomTags } from '../components/article/BottomTags'
import { Introduction } from '../components/article/Introduction'
import { SITE_META, SITE_NAME } from '../constants/index'
import { articleLayout as layout } from '../themes/layout'
import { camelizeKeys } from 'humps'
import { connect } from 'react-redux'
import { date2yyyymmdd } from '@twreporter/core/lib/utils/date'
import { getScreenType } from '../utils/screen'
import { colors } from '../themes/common-variables'
import { screen } from '../themes/screen'
import { themesConst } from '../managers/theme-manager'

// dependencies of article component v2
import Link from 'react-router-dom/Link'

// lodash
import get from 'lodash/get'
import throttle from 'lodash/throttle'

const _ = {
  throttle,
  get
}

const { actions, reduxStateFields, utils } = twreporterRedux
const { fetchAFullPost } = actions

const ArticleContainer = styled.article`
  color: ${props => props.fontColor ? props.fontColor : colors.gray.gray25};
  a {
      border-bottom: 1px ${colors.primaryColor} solid;
      cursor: pointer;
      transition: 0.5s color ease;
      position: relative;
      color: ${ props => (props.fontColor ? props.fontColor : colors.gray.gray25)};
      &:hover {
        color: ${colors.primaryColor};
      }
  }

  u {
    text-decoration: none;
  }
`

const IntroductionContainer = styled.div`
  display: block;
  margin: 0 auto 80px auto;
  ${screen.desktopAbove`
    width: ${layout.desktop.width.small}px;
  `};
  ${screen.tablet`
    width: ${layout.tablet.width.small}px;
  `};
  ${screen.mobile`
    margin: 0 24px 80px 24px;
  `};
`

const scrollPosition = {
  y: 0
}


const ArticlePlaceholder = () => {
  return (
    <constStyledComponents.ResponsiveContainerForAritclePage>
      <div className={classNames['placeholder']}>
        <div className={cx(classNames['title-row'], commonClassNames['inner-block'])}>
          <div className={classNames['ph-title-1']}></div>
          <div className={classNames['ph-title-2']}></div>
          <div className={classNames['ph-author']}></div>
        </div>
        <div className={classNames['leading-img']}>
          <div className={classNames['ph-image']}>
            <LogoIcon className={classNames['logo-icon']} />
          </div>
        </div>
        <IntroductionContainer>
          <div className={classNames['ph-content']}></div>
          <div className={classNames['ph-content']}></div>
          <div className={classNames['ph-content-last']}></div>
        </IntroductionContainer>
      </div>
    </constStyledComponents.ResponsiveContainerForAritclePage>
  )
}

const V2ArticleComponent = Loadable({
  loader: () => import(
    /* webpackChunkName: "v2-article" */
    '@twreporter/react-article-components'
  ),
  loading: ArticlePlaceholder
})

class Article extends PureComponent {
  constructor(props, context) {
    super(props, context)
    this.state = {
      fontSize:'medium',
      isFontSizeSet:false
    }

    this._onScroll = _.throttle(this._handleScroll, 300).bind(this)
    this._handleScroll = this._handleScroll.bind(this)
    this.changeFontSize = this._changeFontSize.bind(this)

    // reading progress component
    this.rp = null

    // article tools
    this._toolsRef = null

    this.articleBody = null
  }

  getChildContext() {
    const { location, entities, selectedPost } = this.props
    const slug = _.get(selectedPost, 'slug', '')
    let post = _.get(entities, [ reduxStateFields.postsInEntities, slug ], {})
    let style = _.get(post, 'style')
    return {
      isPhotography: style === themesConst.photography,
      location
    }
  }

  _changeFontSize(fontSize) {
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
    const { match } = this.props
    const slug = _.get(match, 'params.slug')
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
    const { match } = nextProps
    const slug = _.get(match, 'params.slug')
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
        const tools = this._toolsRef

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

  render() {
    const { entities, match, selectedPost, isLeadingAssetFullScreen, styles } = this.props
    const { fontSize } = this.state
    const error = _.get(selectedPost, 'error')
    if (error) {
      return (
        <div>
          <SystemError error={error} />
        </div>
      )
    }

    if (_.get(selectedPost, 'slug') !== _.get(match, 'params.slug')) {
      return null
    }

    const postEntities = _.get(entities, reduxStateFields.postsInEntities)
    const topicEntities = _.get(entities, reduxStateFields.topicsInEntities)
    const slug = _.get(selectedPost, 'slug', '')
    const isFetching = _.get(selectedPost, 'isFetching')

    // prepare related posts and that topic which post belongs to
    // for v2 article
    const v2Article = _.get(postEntities, slug, {})
    let v2RelatedPosts = utils.denormalizePosts(_.get(v2Article, 'relateds', []), postEntities)
    const v2Topics = utils.denormalizeTopics(_.get(v2Article, 'topics', []), topicEntities, postEntities)
    const v2Topic = _.get(v2Topics, '0', {})
    v2RelatedPosts = v2RelatedPosts.concat(_.get(v2Topic, 'relateds', []))

    // for v1 article
    const article = camelizeKeys(v2Article)
    const relateds = camelizeKeys(v2RelatedPosts)
    const topic = camelizeKeys(v2Topic)
    const bodyData = _.get(article, [ 'content', 'apiData' ], [])
    const introData = _.get(article, [ 'brief', 'apiData' ], [])
    const topicName = _.get(topic, 'topicName')
    const topicArr = _.get(topic, 'relateds')
    const articleStyle = _.get(article, 'style')

    // for head tag
    const canonical = SITE_META.URL + 'a/' + slug
    const ogTitle = (_.get(article, 'ogTitle', '') || _.get(article, 'title', '')) + SITE_NAME.SEPARATOR + SITE_NAME.FULL
    const ogDesc = _.get(article, 'ogDescription', SITE_META.DESC)
    const ogImage = _.get(article, 'ogImage.resizedTargets.mobile.url', SITE_META.OG_IMAGE)

    const license = _.get(article, 'copyright', 'Creative-Commons')

    let articleComponentJSX = null

    if (isFetching) {
      articleComponentJSX = <ArticlePlaceholder />
    } else if (articleStyle === themesConst.articlePage.v2.pink) {
      articleComponentJSX = (
        <div
          id="article-body"
          ref={node => this.articleBody = node}
        >
          <V2ArticleComponent
            colors={styles.colors}
            post={v2Article}
            relatedTopic={v2Topic}
            relatedPosts={v2RelatedPosts}
            LinkComponent={Link}
          />
        </div>
      )
    } else {
      // render leading components, including
      // title, subtitle, topic name, hero image, leading video, authors and share buttons.
      // Those components will be rendered in different orders on demand
      const layoutJSX = layoutMaker.renderLayout({
        article,
        topic,
        isLeadingAssetFullScreen,
        styles,
        fontSize,
        changeFontSize: this.changeFontSize
      })

      articleComponentJSX = (
        <React.Fragment>
          <ArticleContainer
            fontColor={styles.text.fontColor}
            ref={div => {this.progressBegin = div}}
          >
            {layoutJSX}
            <div
              id="article-body"
              ref={node => this.articleBody = node}
            >
              <IntroductionContainer>
                <Introduction
                  data={introData}
                  fontSize={fontSize}
                />
              </IntroductionContainer>
              <Body
                data={bodyData}
                fontSize={fontSize}
                articleStyle={articleStyle}
              />
            </div>
          </ArticleContainer>
          <DonationBox />
          <License license={license} publishedDate={article.publishedDate}/>
          <constStyledComponents.ResponsiveContainerForAritclePage
            size="small"
          >
            <BottomTags
              data={article.tags}
            />
            <BottomRelateds
              relateds={relateds}
              currentId={article.id}
              topicName={topicName}
              topicArr={topicArr}
            />
          </constStyledComponents.ResponsiveContainerForAritclePage>
          {/* TODO move ArticleTools into react-article-components */}
          <ArticleTools
            ref={ ele => this._toolsRef = ele }
          />
        </React.Fragment>
      )
    }

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
          <div itemProp="publisher" itemScope itemType="http://schema.org/Organization">
            <meta itemProp="name" content="報導者" />
            <meta itemProp="email" content="contact@twreporter.org" />
            <link itemProp="logo" href="https://www.twreporter.org/asset/logo-large.png" />
            <link itemProp="url" href="https://www.twreporter.org/" />
          </div>
          <link itemProp="mainEntityOfPage" href={canonical} />
          <meta itemProp="dateModified" content={date2yyyymmdd(_.get(article, 'updatedAt'))} />
          <ReadingProgress ref={ele => this.rp = ele}/>
          { articleComponentJSX }

        </div>
      </div>
    )
  }
}

Article.childContextTypes = {
  location: PropTypes.object,
  isPhotography: PropTypes.bool
}

Article.propTypes = {
  entities: PropTypes.object,
  match: PropTypes.object,
  selectedPost: PropTypes.object,
  styles: PropTypes.shape({
    text: PropTypes.shape({
      fontColor: PropTypes.string
    }),
    title: PropTypes.shape({
      fontColor: PropTypes.string
    }),
    subtitle: PropTypes.shape({
      fontColor: PropTypes.string
    }),
    topic: PropTypes.shape({
      fontColor: PropTypes.string
    })
  }).isRequired,
  isLeadingAssetFullScreen: PropTypes.bool.isRequired
}

Article.defaultProps = {
  entities: {},
  // react-router `match` object
  match: {},
  selectedPost: {}
}

function chooseStyles(articleStyle) {
  let styles = {
    text: {
      fontColor: colors.gray.gray25
    },
    title: {
      fontColor: colors.gray.gray25
    },
    subtitle: {
      fontColor: 'gray'
    },
    topic: {
      fontColor: colors.primaryColor
    }
  }

  switch(articleStyle) {
    case themesConst.articlePage.fullscreen.normal: {
      styles.title.fontColor = colors.white
      styles.subtitle.fontColor = colors.white
      styles.topic.fontColor = colors.white
      break
    }
    case themesConst.articlePage.fullscreen.dark: {
      styles.text.fontColor = 'rgba(255, 255, 255, 0.8)'
      styles.title.fontColor = colors.white
      styles.subtitle.fontColor = colors.white
      styles.topic.fontColor = colors.white
      break
    }
    case themesConst.photography: {
      styles.text.fontColor = 'rgba(255, 255, 255, 0.8)'
      styles.title.fontColor = colors.white
      break
    }
    case themesConst.articlePage.v2.pink: {
      styles.colors = {
        primary: {
          text: '#355ed3',
          accent: '#ef7ede',
          support: '#fbafef',
          background: '#fadaf5'
        },
        secondary: {
          text: '#a67a44',
          accent: '#a67a44',
          support: '#d0a67d',
          background: '#c9af8e'
        },
        base: {
          text: '#404040',
          lightText: '#808080',
          button: '#808080',
          line: '#afafaf',
          background: '#fff'
        }
      }
      break
    }
    default: {
      break
    }
  }
  return styles
}

function isLeadingAssetFullScreen(articleStyle) {
  let isLeadingAssetFullScreen = false

  switch(articleStyle) {
    case themesConst.articlePage.fullscreen.dark:
    case themesConst.articlePage.fullscreen.normal: {
      isLeadingAssetFullScreen = true
      break
    }
    default: {
      break
    }
  }
  return isLeadingAssetFullScreen
}

export function mapStateToProps(state) {
  const entities = state[reduxStateFields.entities]
  const selectedPost = state[reduxStateFields.selectedPost]
  const post = _.get(entities, [ reduxStateFields.postsInEntities, selectedPost.slug ], {})
  const style = post.style

  return {
    entities,
    selectedPost,
    styles: chooseStyles(style),
    isLeadingAssetFullScreen: isLeadingAssetFullScreen(style)
  }
}

export { Article }
export default connect(mapStateToProps, { fetchAFullPost })(Article)
