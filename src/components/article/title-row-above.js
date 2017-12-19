import { colors, componentMargin, globalColor, layout, typography } from '../../themes/common-variables'

import { LINK_PREFIX } from '../../constants/index'
import Link from 'react-router/lib/Link'
import React from 'react'
import { date2yyyymmdd } from '../../utils/index'
import get from 'lodash/get'
import { screen } from '../../themes/screen'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const _ = {
  get
}

const colorSelector = (props, defaultColor) => {
  if (props.color) {
    return props.color
  }
  return defaultColor
}

// #############################
// Containers
// #############################

const Container = styled.div`
  display: block;
  margin: 0 auto 24px auto;
  ${screen.desktopAbove`
    width: ${layout.desktop.small};
  `}
  ${screen.tablet`
    width: ${layout.tablet.small};
  `}
  ${screen.mobile`
    margin: 0 ${componentMargin.horizontalMargin} 24px ${componentMargin.horizontalMargin};
  `}
`

const HeaderContainer = styled.hgroup``

const FirstRow = styled.div`
  margin-top: 10px;
  margin-bottom: 12.5px;
`

// #############################
// Fundemenatal Elements
// #############################

const HeaderElementBlock = styled.div`
  display: inline-block;
`

const Title = HeaderElementBlock.extend`
  margin: 0;
  font-weight: ${typography.font.weight.bold};
  line-height: 1.4;
  font-size: 42px;
  color: ${props => (colorSelector(props, globalColor.textColor))};
  ${screen.desktop`
    font-size: 38px;
  `}
  ${screen.tablet`
    font-size: 38px;
  `}
  ${screen.mobile`
    font-size: ${typography.font.size.xLarger};
  `}
`

const Subtitle = HeaderElementBlock.extend`
  color: ${props => (colorSelector(props, colors.gray.gray50))};
  font-size: ${typography.font.size.medium};
  font-size: ${typography.font.size.medium};
`

const Topic = HeaderElementBlock.extend`
  > a {
    text-decoration: none !important;
    border: 0 !important;
    transition: all 0s ease 0s !important;
    &:after {
      content: normal !important;
    }
  }
`

const TopicContent = styled.span`
  color: ${props => (colorSelector(props, colors.red.rustyRed))};
  font-size: ${typography.font.size.medium};
  font-weight: ${typography.font.weight.bold};
`

const RightArrow = styled.div`
  border: solid ${props => (props.color ? props.color : colors.red.rustyRed)};
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 4px;
  transform: rotate(-45deg);
  margin: 0 10px 1px 3px;
`

const TopicBlock = ({ topic, color }) => {
  const topicName = _.get(topic, 'topicName')
  const topicSlug = _.get(topic, 'slug')
  if (topicName) {
    return (
      <Topic>
        <Link
          to={`${LINK_PREFIX.TOPICS}${topicSlug}`}
        >
          <TopicContent
            color={color}
          >
            {topicName}
            <RightArrow color={color}/>
          </TopicContent>
        </Link>
      </Topic>
    )
  }
  return null
}

TopicBlock.defaultProps = {
  color: '',
  topic: {}
}

TopicBlock.propTypes = {
  color: PropTypes.string,
  topic: PropTypes.object
}


const SubtitleBlock = ({ subtitle, color }) => {
  if (subtitle) {
    return (
      <Subtitle
        itemProp="alternativeHeadline"
        color={color}
      >
        {subtitle}
      </Subtitle>
    )
  }
  return null
}

SubtitleBlock.defaultProps = {
  color: '',
  subtitle: ''
}

SubtitleBlock.propTypes = {
  color: PropTypes.string,
  subtitle: PropTypes.string
}

const HeaderGroup = ({ fontColorSet, article, topic }) => {
  const subtitle = _.get(article, 'subtitle', '')
  const title = _.get(article, 'title', '')
  const { topicFontColor, titleFontColor, subtitleFontColor } = fontColorSet
  return (
    <HeaderContainer>
      <FirstRow>
        <TopicBlock
          topic={topic}
          color={topicFontColor}
        />
        <SubtitleBlock
          subtitle={subtitle}
          color={subtitleFontColor}
        />
      </FirstRow>
      <Title
        color={titleFontColor}
      >
        {title}
      </Title>
    </HeaderContainer>
  )
}

HeaderGroup.defaultProps = {
  fontColorSet: {},
  topic: {},
  article: {}
}

HeaderGroup.propTypes = {
  fontColorSet: PropTypes.object,
  topic: PropTypes.object,
  article: PropTypes.object
}


const TitleRowAbove = ({ article, canonical, fontColorSet, topic }) => {
  const updatedAt = _.get(article, 'updatedAt') || _.get(article, 'publishedDate')
  return (
    <Container>
      <HeaderGroup
        fontColorSet={fontColorSet}
        topic={topic}
        article={article}
      />
      <div itemProp="publisher" itemScope itemType="http://schema.org/Organization">
        <meta itemProp="name" content="報導者" />
        <meta itemProp="email" content="contact@twreporter.org" />
        <link itemProp="logo" href="https://www.twreporter.org/asset/logo-large.png" />
        <link itemProp="url" href="https://www.twreporter.org/" />
      </div>
      <link itemProp="mainEntityOfPage" href={canonical} />
      <meta itemProp="dateModified" content={date2yyyymmdd(updatedAt, '-')} />
    </Container>
  )
}

TitleRowAbove.defaultProps = {
  article: {},
  topic: {},
  canonical: '',
  fontColorSet: {}
}

TitleRowAbove.propTypes = {
  article: PropTypes.object,
  topic: PropTypes.object,
  canonical: PropTypes.string,
  fontColorSet: PropTypes.object
}

export default TitleRowAbove
