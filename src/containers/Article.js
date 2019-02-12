/* eslint no-console:0 */
'use strict'

import ArticleTools from './ArticleTools'
import Helmet from 'react-helmet'
import License from '../components/shared/License'
import LogoIcon from '../../static/asset/icon-placeholder.svg'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import ReadingProgress from '../components/article/ReadingProgress'
import SystemError from '../components/SystemError'
import commonStyles from '../components/article/Common.scss'
import constPropTypes from '../constants/prop-types'
import cx from 'classnames'
import deviceConst from '../constants/device'
import DonationBox from '../components/shared/DonationBox'
import constPageThemes from '../constants/page-themes'
import constStyledComponents from '../constants/styled-components'
import styled from 'styled-components'
import styles from './Article.scss'
import twreporterRedux from '@twreporter/redux'
import layoutMaker from '../components/article/layout/layout-maker'
import { Body } from '../components/article/Body'
import { BottomRelateds } from '../components/article/BottomRelateds'
import { BottomTags } from '../components/article/BottomTags'
import { Introduction } from '../components/article/Introduction'
import { PHOTOGRAPHY_ARTICLE_STYLE, SITE_META, SITE_NAME } from '../constants/index'
import { articleLayout as layout } from '../themes/layout'
import { camelizeKeys } from 'humps'
import { connect } from 'react-redux'
import { date2yyyymmdd } from '../utils/date'
import { getScreenType } from '../utils/screen'
import { colors } from '../themes/common-variables'
import { screen } from '../themes/screen'

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
    </constStyledComponents.ResponsiveContainerForAritclePage>
  )
}

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
      isPhotography: style === PHOTOGRAPHY_ARTICLE_STYLE,
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
    const { entities, match, selectedPost, theme } = this.props
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
    const article = camelizeKeys(_.get(postEntities, slug))
    const articleStyle = _.get(article, 'style')
    const isFetching = _.get(selectedPost, 'isFetching')

    const relateds = camelizeKeys(utils.denormalizePosts(_.get(article, 'relateds', []), postEntities))
    const topics = camelizeKeys(utils.denormalizeTopics(_.get(article, 'topics', []), topicEntities, postEntities))
    const topic = topics[0]
    const bodyData = _.get(article, [ 'content', 'apiData' ], [])
    const introData = _.get(article, [ 'brief', 'apiData' ], [])
    const topicName = _.get(topic, 'topicName')
    const topicArr = _.get(topic, 'relateds')

    // for head tag
    const canonical = SITE_META.URL + 'a/' + slug
    const ogTitle = (_.get(article, 'ogTitle', '') || _.get(article, 'title', '')) + SITE_NAME.SEPARATOR + SITE_NAME.FULL
    const ogDesc = _.get(article, 'ogDescription', SITE_META.DESC)
    const ogImage = _.get(article, 'ogImage.resizedTargets.mobile.url', SITE_META.OG_IMAGE)

    const license = _.get(article, 'copyright', 'Creative-Commons')


    // render leading components, including
    // title, subtitle, topic name, hero image, leading video, authors and share buttons.
    // Those components will be rendered in different orders on demand
    const layoutJSX = layoutMaker.renderLayout({
      article,
      topic,
      theme,
      fontSize,
      changeFontSize: this.changeFontSize
    })

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
          {isFetching ? <ArticlePlaceholder /> :
            <React.Fragment>
              <ReadingProgress ref={ele => this.rp = ele}/>
              <ArticleContainer
                fontColor={theme.color.font}
                ref={div => {this.progressBegin = div}}
              >
                <div itemProp="publisher" itemScope itemType="http://schema.org/Organization">
                  <meta itemProp="name" content="報導者" />
                  <meta itemProp="email" content="contact@twreporter.org" />
                  <link itemProp="logo" href="https://www.twreporter.org/asset/logo-large.png" />
                  <link itemProp="url" href="https://www.twreporter.org/" />
                </div>
                <link itemProp="mainEntityOfPage" href={canonical} />
                <meta itemProp="dateModified" content={date2yyyymmdd(_.get(article, 'updatedAt'))} />
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
            </React.Fragment>
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
  let theme

  if (!_.get(post, 'theme')) {
    // backwards compatible for photo articles
    if (style === PHOTOGRAPHY_ARTICLE_STYLE) {
      theme = constPageThemes.photoTheme
    } else {
      theme = constPageThemes.defaultTheme
    }
  } else {
    const rawTheme = post.theme
    theme = {
      color: {
        bg: rawTheme.bg_color,
        font: rawTheme.font_color,
        footerBg: rawTheme.footer_bg_color,
        logo: rawTheme.logo_color,
        title: rawTheme.title_color,
        subtitle: rawTheme.subtitle_color,
        topic: rawTheme.topic_color
      },
      position: {
        header: rawTheme.header_position,
        title: rawTheme.title_position
      }
    }
  }

  return {
    entities,
    selectedPost,
    theme
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
  theme: constPropTypes.theme
}

Article.defaultProps = {
  entities: {},
  // react-router `match` object
  match: {},
  selectedPost: {},
  theme: constPageThemes.defaultTheme
}

export { Article }
export default connect(mapStateToProps, { fetchAFullPost })(Article)
