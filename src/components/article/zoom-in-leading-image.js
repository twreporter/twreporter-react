import FadeText from '@twreporter/react-components/lib/fade-text'
import Header from '@twreporter/react-components/lib/header'
import PropTypes from 'prop-types'
import React from 'react'
import TitleRowUpon from './title-row-upon'
import get from 'lodash/get'
import styled, { keyframes } from 'styled-components'
import twreporterRedux from '@twreporter/redux'
import { LeadingImage } from './LeadingImage'
import { NAVBAR_POSITION_UPON, TITLE_POSITION_UPON_LEFT } from '../../constants/page-themes'
import { SITE_META } from '../../constants/index'
import { camelizeKeys } from 'humps'
import { screen } from '../../themes/screen'

const { childAnimationStoper, unlockAfterAnimation } = FadeText.scrollManager
const topNavbarHeight = 151

const _ = {
  get
}

const HeaderContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  @media (max-width: 1023px) {
    display: none;
  }
`

const zoomIn = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(1.3); }
`

const fadeOut = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

const ImageContainer = styled.div`
  margin-bottom: 40px;
  img {
    animation: ${zoomIn} ${props => `${props.duration}s`} ease-in-out;
    animation-fill-mode: forwards;
    animation-delay: ${props => (props.delay ? `${props.delay}s` : null)};
    object-fit: cover;
    height: 100vh;
    width: 100%;
  }
  ${screen.tabletBelow`
    img {
      height: ${(props) => {
        if (props.clientHeight) {
          return `${props.clientHeight - topNavbarHeight}px`
        } else {
          return `calc(100vh - ${topNavbarHeight}px)`
        }
      }
    }
  `}
`

const TitleRowContainer = styled.div`
  opacity: 0;
  animation: ${fadeOut} ${props => `${props.duration}s` } ease-in-out;
  animation-fill-mode: forwards;
  animation-delay: ${props => `${props.delay}s`};
`

const elemId = 'pageContainer'
const lockMobileScroll = (e) => {
  e.preventDefault()
  e.stopPropagation()
}


const scrollUnlocker = (e) => {
  if (e) {
    e.stopPropagation()
  }
  const elem = document.getElementById(elemId)
  elem.removeEventListener('touchmove', lockMobileScroll)
  elem.style.height = 'auto'
  elem.style.overflowY = 'visible'
}

class ZoomInImage extends React.Component {
  constructor(props) {
    super(props)
    this.titelRowNode = {}
    this.state = {
      clientHeight: 0
    }
  }

  componentDidMount() {
    this.setState({
      clientHeight: document.documentElement.clientHeight
    })
    const elem = document.getElementById('page-container')
    elem.addEventListener('touchmove', lockMobileScroll)
  }

  componentWillUnmount() {
    scrollUnlocker()
  }

  render() {
    const { entities, params, theme, pathname, totalDelay, imageDuration, textDuration } = this.props
    const { reduxStateFields, utils } = twreporterRedux
    const slug = _.get(params, 'slug', '')
    const postEntities = _.get(entities, reduxStateFields.postsInEntities)
    const topicEntities = _.get(entities, reduxStateFields.topicsInEntities)
    const article = camelizeKeys(_.get(postEntities, slug))
    const topics = camelizeKeys(utils.denormalizeTopics(_.get(article, 'topics', []), topicEntities, postEntities))
    const topic = topics[0]
    const heroImage = _.get(article, [ 'heroImage' ], null)
    const heroImageSize = _.get(article, [ 'heroImageSize' ], 'normal')
    const fontColor = _.get(theme, 'fontColor')
    const titlePosition = _.get(theme, 'titlePosition')
    const headerPosition = _.get(theme, 'headerPosition')
    const titleColor = _.get(theme, 'titleColor')
    const subTitleColor = _.get(theme, 'subtitleColor')
    const topicColor = _.get(theme, 'topicColor')
    const logoColor =  _.get(theme, 'logoColor')
    const fontColorSet = {
      topicFontColor: topicColor,
      titleFontColor: titleColor,
      subtitleFontColor: subTitleColor
    }
    const canonical = SITE_META.URL + 'a/' + slug
    const textDelay = imageDuration - textDuration
    return (
      <ImageContainer
        delay={totalDelay}
        duration={imageDuration}
        clientHeight={this.state.clientHeight}
      >
        <LeadingImage
          size={heroImageSize}
          image={_.get(heroImage, 'resizedTargets')}
          id={_.get(heroImage, 'id')}
          description={_.get(article, 'leadingImageDescription', '')}
          titlePosition={titlePosition}
        >
        {
          headerPosition === NAVBAR_POSITION_UPON ?
            <HeaderContainer>
              <Header
                isIndex={false}
                pathName={pathname}
                fontColor={fontColor}
                bgColor={''}
                logoColor={logoColor}
                headerPosition={headerPosition}
              />
            </HeaderContainer>
          : null
        }
        {
          titlePosition === TITLE_POSITION_UPON_LEFT ?
            <TitleRowContainer
              delay={totalDelay + textDelay}
              duration={textDuration}
              innerRef={(node) => {unlockAfterAnimation(node, scrollUnlocker)}}
            >
              <TitleRowUpon
                article={article}
                topic={topic}
                canonical={canonical}
                fontColorSet={fontColorSet}
                innerRef={childAnimationStoper}
              />
            </TitleRowContainer>
          : null
        }
        </LeadingImage>
      </ImageContainer>
    )
  }
}

ZoomInImage.defaultProps = {
  theme: {},
  entities: {},
  params: {},
  pathname: '',
  totalDelay: 0,
  imageDuration: 5,
  textDuration: 2
}

ZoomInImage.propTypes = {
  theme: PropTypes.object,
  entities: PropTypes.object,
  params: PropTypes.object,
  pathname: PropTypes.string,
  totalDelay: PropTypes.number,
  imageDuration: PropTypes.number,
  textDuration: PropTypes.number
}

export default ZoomInImage
