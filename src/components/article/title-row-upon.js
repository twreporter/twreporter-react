// import topicRightArrow from '../../../static/asset/icon-topic-arrow-right.svg'
import { date2yyyymmdd } from '../../utils/index'
import Link from 'react-router/lib/Link'
import { LINK_PREFIX } from '../../constants/index'
import { screen } from '../../themes/screen'
import { typography, colors } from '../../themes/common-variables'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const _ = {
  get
}

const colorselector = (props, defaultColor) => {
  if (props.color) {
    return props.color
  }
  return defaultColor
}

// #############################
// Containers
// #############################

const Container = styled.div`
  position: absolute;
  left: 70px;
  ${screen.overDesktop`
    top: 35%;
    width: 45%;
  `}
  ${screen.desktop`
    top: 29%;
    width: 55%;
  `}
  ${screen.tablet`
    left: 7%;
    top: 23%;
    width: 70%;
  `}
  ${screen.mobile`
    width: 60%;
    top: 27%;
    left: 9%;
  `}
`

const HeaderContainer = styled.hgroup``

// #############################
// Fundemenatal Elements
// #############################

const HeaderElementBlock = styled.div`
  display: block;
`

const Title = HeaderElementBlock.extend`
  margin: 0;
  font-weight: ${typography.font.weight.bold};
  line-height: 1.4;
  color: ${props => (colorselector(props, colors.gray.gray25))};
  font-size: 60px;
  ${screen.mobile`
    font-size: 36px;
  `}
`

const Subtitle = HeaderElementBlock.extend`
  color: ${props => (colorselector(props, colors.gray.gray50))};
  font-size: ${typography.font.size.medium};
  font-weight: ${typography.font.weight.extraLight};
  ${screen.tabletAbove`
    font-size: 50px;
  `}
  ${screen.mobile`
    font-size: 30px;
  `}
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
  color: ${props => (colorselector(props, colors.red.rustyRed))};
  font-size: ${typography.font.size.medium};
  font-weight: ${typography.font.weight.bold};
  padding-left: 3px;
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
  const title = _.get(article, 'title', '')
  const subtitle = _.get(article, 'subtitle', '')
  const { topicFontColor, titleFontColor, subtitleFontColor } = fontColorSet
  return (
    <HeaderContainer>
      <TopicBlock
        topic={topic}
        color={topicFontColor}
      />
      <Title
        color={titleFontColor}
      >
        {title}
      </Title>
      <SubtitleBlock
        subtitle={subtitle}
        color={subtitleFontColor}
      />
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


const TitleRowUpon = ({ article, canonical, fontColorSet, topic }) => {
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

TitleRowUpon.defaultProps = {
  article: {},
  topic: {},
  canonical: '',
  fontColorSet: {}
}

TitleRowUpon.propTypes = {
  article: PropTypes.object,
  topic: PropTypes.object,
  canonical: PropTypes.string,
  fontColorSet: PropTypes.object
}


export default TitleRowUpon
