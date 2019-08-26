import ArticleMeta from './meta'
import FullScreenImage from '../../shared/FullScreenImage'
import HeroImage from '../HeroImage'
import LeadingVideo from '../../shared/LeadingVideo'
import React from 'react'
import TitleRowAbove from './title-row-above'
import TitleRowUpon from './title-row-upon'
import constStyledComponents from '../../../constants/styled-components'
import get from 'lodash/get'
import merge from 'lodash/merge'
import styled from 'styled-components'
import mq from '../../../utils/media-query'

const _ = {
  get,
  merge
}

const MetaContainer = styled.div`
  margin-top: ${props => props.isLeadingAssetFullScreen ? '60px' : '24px'};
  margin-bottom: 40px;
`

const LayoutContainer = styled.div`
  ${mq.mobileOnly`
    margin-top: ${props => {
    // -110px is the header's height
    return props.isLeadingAssetFullScreen ? '-110px' : '0px'
  }};
  `}

  position: relative;
  width: 100%;
  height: 100%;
`

const FullScreenContainer = styled.div`
  position: relative;
`

const FullScreenOverlayMask = styled.div`
  position: absolute;
  height: 50%;
  width: 100%;
  bottom: 0;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), #000000);
`


/**
 * Compose an array of authors from article object
 *
 * @param {Object} article
 * @returns {Array} an array of authors
 */
function composeAuthors(article) {
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

/**
 * LayoutStyle type definition
 * @typedef {Object} LayoutStyle
 * @property {Object} title - title styles object
 * @property {string} title.fontColor - font-color of title
 * @property {Object} subtitle - subtitle styles object
 * @property {string} subtitle.fontColor - font-color of subtitle
 * @property {Object} topic - topic styles object
 * @property {string} topic.fontColor - font-color of topic
 * /

/**
 * Render `TitleRowAbove` or `TitleRowUpon` according to title's position.
 * If position is 'above', which means title is above the hero image/leading video.
 * If position is 'upon-left', which means title overlays left on the hero image/leading video.
 *
 * @param {boolean} [isLeadingAssetFullScreen=false] - indicate if the leading asset to be the full screen or not
 * @param {Object} [props={}] - Properties `TitleRowAbove` and `TitleRowUpon` needed
 * @param {string} props.title
 * @param {string} props.subtitle
 * @param {string} props.topicName
 * @param {string} props.topicSlug
 * @param {LayoutStyle} props.styles - styles for layout
 *
 * @returns {Object} React component, either `TitleRowAbove` or `TitleRowUpon`
 */
function renderTitleOnDemand(isLeadingAssetFullScreen, props={}) {
  const { title, subtitle, topicName, topicSlug, styles } = props

  let Component = TitleRowAbove
  if (isLeadingAssetFullScreen) {
    Component = TitleRowUpon
  }

  return (
    <Component
      title={title}
      subtitle={subtitle}
      topicName={topicName}
      topicSlug={topicSlug}
      styles={styles}
    />
  )
}

/**
 * Render `LeadingVideo`, `HeroImage` or `FullScreenImage` according to title's position.
 * If video is provided, render `LeadingVideo`.
 * If position is 'above', render `HeroImage`.
 * If position is 'upon-left', render `FullScreenImage`
*
 * @param {boolean} [isLeadingAssetFullScreen=false] - indicate if the leading asset to be full screen or not
 * @param {Object} [props={}] - Properties `LeadingVideo`, `HeroImage` or `FullScreenImage` needed
 * @param {Object} props.video - video object, details are specified in `videoObj` of `src/constants/prop-types.js`
 * @param {Object} props.heroImage - image object, details are specified in `imgObj` of `src/constants/prop-types.js`
 * @param {Object} props.portraitHeroImage - image object, details are specified in `imgObj` of `src/constants/prop-types.js`
 * @param {string} props.alt
 * @param {string} props.size - hero image size, could be 'small', 'medium' and 'extend'
 * @returns {Object} React component
 */
function renderLeadingMediaAssetOnDemand(isLeadingAssetFullScreen, props={}) {
  const { heroImage, portraitHeroImage, alt, size, video } = props
  if (video) {
    return (
      <constStyledComponents.ResponsiveContainerForAritclePage
        size="medium"
      >
        <LeadingVideo
          filetype={_.get(video, 'filetype')}
          title={_.get(video, 'title')}
          src={_.get(video, 'url')}
          poster={_.get(heroImage, 'resizedTargets.desktop.url')}
          viewportHeight="auto"
        />
      </constStyledComponents.ResponsiveContainerForAritclePage>
    )
  }

  if (isLeadingAssetFullScreen) {
    return (
      <FullScreenContainer>
        <FullScreenImage
          alt={alt}
          imgSet={_.get(heroImage, 'resizedTargets')}
          portraitImgSet={_.get(portraitHeroImage, 'resizedTargets')}
        />
        <FullScreenOverlayMask />
      </FullScreenContainer>
    )
  }
  return (
    <HeroImage
      alt={alt}
      size={size}
      imgObj={heroImage}
    />
  )
}

/**
 * Render components(title block, subtitle block, topic block, hero image, leading video, authors block, share buttons)
 * in the certain orders according to different themes.
 *
 * @param {Object} props - default value is {}
 * @param {Object} props.article - article object
 * @param {Object} props.topic - topic object
 * @param {boolean} props.isLeadingAssetFullScreen - indicate if the leading video/image to be full screen or not
 * @param {string} props.fontSize
 * @param {LayoutStyle} props.styles - styles for layout
 *
 * @param {function} props.changeFontSize
 * @returns {Object} React components in order
 */
function renderLayout(props={}) {
  const {
    article,
    changeFontSize,
    fontSize,
    isLeadingAssetFullScreen,
    styles,
    topic
  } = props

  const _article = article || {}
  const _topic = topic || {}

  const leadingMediaAssetJSX = renderLeadingMediaAssetOnDemand(isLeadingAssetFullScreen, {
    alt: _article.leadingImageDescription,
    heroImage: _article.heroImage,
    portraitHeroImage: _article.leadingImagePortrait,
    video: _article.leadingVideo,
    size: _article.heroImageSize
  })

  const metaJSX = (
    <MetaContainer
      isLeadingAssetFullScreen={isLeadingAssetFullScreen}
    >
      <ArticleMeta
        authors={composeAuthors(_article)}
        changeFontSize={changeFontSize}
        extendByline={_article.extendByline}
        fontSize={fontSize}
        publishedDate={_article.publishedDate}
        title={_article.title}
      />
    </MetaContainer>
  )

  const order = isLeadingAssetFullScreen ? [ leadingMediaAssetJSX, metaJSX ] :
    [ metaJSX, leadingMediaAssetJSX ]

  return (
    <div
      style={{
        marginBottom: '40px'
      }}
    >
      <LayoutContainer
        isLeadingAssetFullScreen={isLeadingAssetFullScreen}
      >
        {renderTitleOnDemand(isLeadingAssetFullScreen, {
          subtitle: _article.subtitle,
          title: _article.title,
          styles,
          topicName: _topic.topicName,
          topicSlug: _topic.slug
        })}
        {order[0]}
      </LayoutContainer>
      {order[1]}
    </div>
  )
}

export default {
  renderLayout
}
