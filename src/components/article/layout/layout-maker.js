import ArticleMeta from './meta'
import FullScreenImage from '../../shared/FullScreenImage'
import HeroImage from '../HeroImage'
import LeadingVideo from '../../shared/LeadingVideo'
import React from 'react'
import TitleRowAbove from './title-row-above'
import TitleRowUpon from './title-row-upon'
import constPageThemes from '../../../constants/page-themes'
import constStyledComponents from '../../../constants/styled-components'
import get from 'lodash/get'
import merge from 'lodash/merge'
import styled from 'styled-components'
import { screen } from '../../../themes/screen'


const _ = {
  get,
  merge
}

const MetaContainer = styled.div`
  margin-top: ${props => props.titlePosition === constPageThemes.position.title.uponLeft ? '60px' : '24px'};
  margin-bottom: 40px;
`

const LayoutContainer = styled.div`
  margin-top: ${props => {
    // -110px is the header's height
    return props.headerPosition === constPageThemes.position.header.upon ? '-110px' : '0px'
  }};

  ${screen.desktopBelow`
    margin-top: 0px;
  `}
  position: relative;
  width: 100%;
  height: 100%;
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
 * Render `TitleRowAbove` or `TitleRowUpon` according to title's position.
 * If position is 'above', which means title is above the hero image/leading video.
 * If position is 'upon-left', which means title overlays left on the hero image/leading video.
 *
 * @param {string} [position='above'] - Title's position
 * @param {Object} [props={}] - Properties `TitleRowAbove` and `TitleRowUpon` needed
 * @param {string} props.title
 * @param {string} props.subtitle
 * @param {string} props.topicName
 * @param {string} props.topicSlug
 * @param {Object} props.theme - theme object
 * @returns {Object} React component, either `TitleRowAbove` or `TitleRowUpon`
 */
function renderTitleOnDemand(position=constPageThemes.position.title.above, props={}) {
  const { title, subtitle, topicName, topicSlug, theme } = props

  let Component = TitleRowAbove
  if (position === constPageThemes.position.title.uponLeft) {
    Component = TitleRowUpon
  }
  return (
    <Component
      title={title}
      subtitle={subtitle}
      topicName={topicName}
      topicSlug={topicSlug}
      theme={theme}
    />
  )
}

/**
 * Render `LeadingVideo`, `HeroImage` or `FullScreenImage` according to title's position.
 * If video is provided, render `LeadingVideo`.
 * If position is 'above', render `HeroImage`.
 * If position is 'upon-left', render `FullScreenImage`
*
 * @param {Object} [props={}] - Properties `LeadingVideo`, `HeroImage` or `FullScreenImage` needed
 * @param {Object} props.video - video object, details are specified in `videoObj` of `src/constants/prop-types.js`
 * @param {Object} props.heroImage - image object, details are specified in `imgObj` of `src/constants/prop-types.js`
 * @param {Object} props.portraitHeroImage - image object, details are specified in `imgObj` of `src/constants/prop-types.js`
 * @param {string} [position='above'] - Title's position
 * @param {string} props.alt
 * @param {string} props.size - hero image size, could be 'small', 'medium' and 'extend'
 * @param {Object} props.theme - theme object
 * @returns {Object} React component, either `TitleRowAbove` or `TitleRowUpon`
 */
function renderLeadingMediaAssetOnDemand(position=constPageThemes.position.title.above, props={}) {
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
        />
      </constStyledComponents.ResponsiveContainerForAritclePage>
    )
  }

  if (position === constPageThemes.position.title.uponLeft) {
    return (
      <FullScreenImage
        alt={alt}
        imgSet={_.get(heroImage, 'resizedTargets')}
        portraitImgSet={_.get(portraitHeroImage, 'resizedTargets')}
      />
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
 * @param {Object} props.theme - theme object
 * @param {string} props.fontSize
 * @param {function} props.changeFontSize
 * @returns {Object} React components in order
 */
function renderLayout(props={}) {
  const { article, topic, theme, fontSize, changeFontSize } = props

  const _article = article || {}
  const _topic = topic || {}

  const leadingMediaAssetJSX = renderLeadingMediaAssetOnDemand(_.get(theme, 'position.title'), {
    alt: _article.leadingImageDescription,
    heroImage: _article.heroImage,
    portraitHeroImage: _article.leadingImagePortrait,
    video: _article.leadingVideo,
    size: _article.heroImageSize
  })

  const metaJSX = (
    <MetaContainer
      titlePosition={_.get(theme, 'position.title')}
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

  const order = _.get(theme, 'position.title') === constPageThemes.position.title.uponLeft ?
    [ leadingMediaAssetJSX, metaJSX ] : [ metaJSX, leadingMediaAssetJSX ]

  return (
    <div
      style={{
        marginBottom: '40px'
      }}
    >
      <LayoutContainer
        headerPosition={_.get(theme, 'position.header')}
      >
        {renderTitleOnDemand(_.get(theme, 'position.title'), {
          subtitle: _article.subtitle,
          theme,
          title: _article.title,
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
