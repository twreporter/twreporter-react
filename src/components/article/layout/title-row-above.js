import Link from 'react-router-dom/Link'
import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash/get'
import styled from 'styled-components'
import { LINK_PREFIX } from '../../../constants/index'
import { articleLayout as layout } from '../../../themes/layout'
import { colors, typography } from '../../../themes/common-variables'
import mq from '../../../utils/media-query'

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
  ${mq.desktopAndAbove`
    width: ${layout.desktop.width.small}px;
  `}
  ${mq.tabletOnly`
    margin: 24px auto;
    width: ${layout.tablet.width.small}px;
  `}
  ${mq.mobileOnly`
    margin: 0 24px 24px 24px;
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

const Title = styled(HeaderElementBlock)`
  margin: 0;
  font-weight: ${typography.font.weight.bold};
  line-height: 1.4;
  font-size: 42px;
  color: ${props => (colorSelector(props, colors.gray.gray25))};
  ${mq.desktopOnly`
    font-size: 38px;
  `}
  ${mq.tabletOnly`
    font-size: 38px;
  `}
  ${mq.mobileOnly`
    font-size: ${typography.font.size.xLarger};
  `}
`

const Subtitle = styled(HeaderElementBlock)`
  color: ${props => (colorSelector(props, colors.gray.gray50))};
  font-size: ${typography.font.size.medium};
  font-size: ${typography.font.size.medium};
`

const Topic = styled(HeaderElementBlock)`
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

class TitleRowAbove extends React.PureComponent {
  render() {
    const { title, subtitle, topicName, topicSlug, styles } = this.props
    const topicJSX = topicName ? (
      <Topic>
        <Link
          to={`${LINK_PREFIX.TOPICS}${topicSlug}`}
        >
          <TopicContent
            color={_.get(styles, 'topic.fontColor')}
          >
            {topicName}
            <RightArrow color={_.get(styles, 'topic.fontColor')}/>
          </TopicContent>
        </Link>
      </Topic>
    ) : null

    const subtitleJSX = subtitle ? (
      <Subtitle
        itemProp="alternativeHeadline"
        color={_.get(styles, 'subtitle.fontColor')}
      >
        {subtitle}
      </Subtitle>
    ) : null

    const firstRowJSX = topicJSX || subtitleJSX ? (
      <FirstRow>
        {topicJSX}
        {subtitleJSX}
      </FirstRow>
    ) : null

    return (
      <Container>
        <HeaderContainer>
          {firstRowJSX}
          <Title
            color={_.get(styles, 'title.fontColor')}
          >
            {title}
          </Title>
        </HeaderContainer>
      </Container>
    )
  }
}

TitleRowAbove.defaultProps = {
  subtitle: '',
  topicName: '',
  topicSlug: '',
  styles: {}
}

TitleRowAbove.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  topicName: PropTypes.string,
  topicSlug: PropTypes.string,
  styles: PropTypes.shape({
    subtitle: PropTypes.shape({
      fontColor: PropTypes.string
    }),
    title: PropTypes.shape({
      fontColor: PropTypes.string
    }),
    topic: PropTypes.shape({
      fontColor: PropTypes.string
    })
  })
}

export default TitleRowAbove
