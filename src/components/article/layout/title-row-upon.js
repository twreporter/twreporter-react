import Link from 'react-router-dom/Link'
import PropTypes from 'prop-types'
import React from 'react'
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
  left: 65px;
  ${screen.overDesktop`
    bottom: 100px;
    width: 45%;
  `}
  ${screen.desktop`
    bottom: 85px;
    width: 55%;
  `}
  ${screen.tablet`
    left: 35px;
    bottom: 37px;
    width: 70%;
  `}
  ${screen.mobile`
    width: 60%;
    bottom: 60px;
    left: 30px;
  `}
`

const HeaderContainer = styled.hgroup`
  > div:first-child {
    margin-bottom: 25px;
  }
  > div:last-child {
    margin-top: 20px;
  }
`

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
  font-size: 50px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  ${screen.mobile`
    font-size: 32px;
  `}
`

const Subtitle = styled(HeaderElementBlock)`
  color: ${props => (colorselector(props, colors.gray.gray50))};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  font-size: ${typography.font.size.medium};
  font-weight: ${typography.font.weight.extraLight};
  ${screen.tabletAbove`
    font-size: 40px;
  `}
  ${screen.mobile`
    font-size: 26px;
  `}
`

const Topic = styled(HeaderElementBlock)`
  display: inline-block;
  padding: 5px;
  background-color: rgba(166, 122, 68, 0.55);
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

    return (
      <Container>
        <HeaderContainer>
          {topicJSX}
          <Title
            color={_.get(styles, 'title.fontColor')}
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
  styles: {}
}

TitleRowUpon.propTypes = {
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


export default TitleRowUpon
