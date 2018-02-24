import Link from 'react-router/lib/Link'
import PropTypes from 'prop-types'
import React from 'react'
import constPageThemes from '../../../constants/page-themes'
import constPropTypes from '../../../constants/prop-types'
import get from 'lodash/get'
import styled from 'styled-components'
import { LINK_PREFIX } from '../../../constants/index'
import { articleLayout as layout } from '../../../themes/layout'
import { colors, typography } from '../../../themes/common-variables'
import { screen } from '../../../themes/screen'

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
    width: ${layout.desktop.width.small}px;
  `}
  ${screen.tablet`
    width: ${layout.tablet.width.small}px;
  `}
  ${screen.mobile`
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

const Title = HeaderElementBlock.extend`
  margin: 0;
  font-weight: ${typography.font.weight.bold};
  line-height: 1.4;
  font-size: 42px;
  color: ${props => (colorSelector(props, colors.gray.gray25))};
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

class TitleRowAbove extends React.PureComponent {
  render() {
    const { title, subtitle, topicName, topicSlug, theme } = this.props
    const topicJSX = topicName ? (
      <Topic>
        <Link
          to={`${LINK_PREFIX.TOPICS}${topicSlug}`}
        >
          <TopicContent
            color={_.get(theme, 'color.topic')}
          >
            {topicName}
            <RightArrow color={_.get(theme, 'color.topic')}/>
          </TopicContent>
        </Link>
      </Topic>
    ) : null

    const subtitleJSX = subtitle ? (
      <Subtitle
        itemProp="alternativeHeadline"
        color={_.get(theme, 'color.subtitle')}
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
            color={_.get(theme, 'color.title')}
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
  theme: constPageThemes.defaultTheme
}

TitleRowAbove.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  topicName: PropTypes.string,
  topicSlug: PropTypes.string,
  theme: constPropTypes.theme
}

export default TitleRowAbove
