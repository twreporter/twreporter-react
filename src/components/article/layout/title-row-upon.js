import Link from 'react-router-dom/Link'
import PropTypes from 'prop-types'
import React from 'react'
import constPageThemes  from '../../../constants/page-themes'
import constPropTypes from '../../../constants/prop-types'
import get from 'lodash/get'
import styled from 'styled-components'
import { LINK_PREFIX } from '../../../constants/index'
import { screen } from '../../../themes/screen'
import { typography, colors } from '../../../themes/common-variables'
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
  z-index: 100;
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

const Title = styled(HeaderElementBlock)`
  margin: 0;
  font-weight: ${typography.font.weight.bold};
  line-height: 1.4;
  color: ${props => (colorselector(props, colors.gray.gray25))};
  font-size: 60px;
  ${screen.mobile`
    font-size: 36px;
  `}
`

const Subtitle = styled(HeaderElementBlock)`
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

class TitleRowUpon extends React.PureComponent {
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

    return (
      <Container>
        <HeaderContainer>
          {topicJSX}
          <Title
            color={_.get(theme, 'color.title')}
          >
            {title}
          </Title>
          {subtitleJSX}
        </HeaderContainer>
      </Container>
    )
  }
}

TitleRowUpon.defaultProps = {
  subtitle: '',
  topicName: '',
  topicSlug: '',
  theme: constPageThemes.defaultTheme
}

TitleRowUpon.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  topicName: PropTypes.string,
  topicSlug: PropTypes.string,
  theme: constPropTypes.theme
}


export default TitleRowUpon
