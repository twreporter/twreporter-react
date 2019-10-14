import { SITE_META } from '../../../constants'
import ArrowDownIcon from '../../../../static/asset/arrow-down.svg'
import BottomComponents from './bottom'
import BottomLeftComponents from './bottom-left'
import CenterComponents from './center'
import LeadingImage from './leading-image'
import LeadingVideo from './leading-video'
import predefinedPropTypes from '../../../constants/prop-types'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import smoothScroll from 'smoothscroll'
import styled from 'styled-components'
// @twreporter
import { date2yyyymmdd } from '@twreporter/core/lib/utils/date'
// lodash
import get from 'lodash/get'

const _ = {
  get
}

const Container = styled.div`
  position: relative;
  height: ${props => props.viewportHeight || '100vh' };
`

const themeConsts = {
  center: 'center',
  bottomLeft: 'bottom-left',
  bottom: 'bottom'
}

function selectComponentsByTheme(theme) {
  switch (theme) {
    case themeConsts.center:
      return CenterComponents
    case themeConsts.bottomLeft:
      return BottomLeftComponents
    case themeConsts.bottom:
      return BottomComponents
    default:
      return CenterComponents
  }
}

const defaultViewportHeight = '100vh'

export default class Banner extends PureComponent {
  static propTypes = {
    theme: PropTypes.oneOf([ themeConsts.bottom, themeConsts.bottomLeft, themeConsts.center ]).isRequired,
    headline: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    publishedDate: PropTypes.string,
    leadingVideo: predefinedPropTypes.videoObj,
    leadingImage: predefinedPropTypes.imgObj,
    leadingImagePortrait: predefinedPropTypes.imgObj,
    ogImage: predefinedPropTypes.imgObj
  }

  constructor(props) {
    super(props)
    this.state = {
      viewportHeight: defaultViewportHeight
    }
    this._containerRef = React.createRef()
    this.scrollToNextSection = this._scrollToNextSection.bind(this)
  }

  componentDidMount() {
    this._updateViewportHeight()
  }

  _updateViewportHeight() {
    if (typeof window === 'object') {
      /*
        The height we want is which of the viewport that actually be seen by users.
        But the common used DOM properties have several problems:
          `documentElement.clientHeight` -> In iOS, the return value pretends that the URL and tab bars are visible, even if they are not.
          `window.innerHeight` -> It includes the area covered by scroll bars (user cannot see the area actually)
        The best way to get the value may be: (window.innerHeight - scroll bar height)
        Since this page should not have horizontal scroll bar, we can use `window.innerHeight` directly.
        Reference: https://stackoverflow.com/a/31655549
      */
      const heightString = window.innerHeight ? `${window.innerHeight}px` : '100vh'
      if (this.state.viewportHeight !== heightString) {
        this.setState({
          viewportHeight: heightString
        })
      }
    }
  }

  _scrollToNextSection(e) {
    e.preventDefault()
    const container = this._containerRef.current
    if (container) {
      smoothScroll(container.offsetHeight || container.clientHeight)
    }
  }

  render() {
    const {
      theme,
      headline,
      title,
      subtitle,
      publishedDate,
      leadingVideo,
      leadingImage,
      leadingImagePortrait,
      ogImage
    } = this.props
    const { viewportHeight } = this.state
    const components = selectComponentsByTheme(theme)
    const videoSrc = _.get(leadingVideo, 'url')
    return (
      <Container viewportHeight={viewportHeight} ref={this._containerRef}>
        {videoSrc ? (
          <LeadingVideo
            filetype={_.get(leadingVideo, 'filetype')}
            src={videoSrc}
            title={title}
            uploadDate={new Date(publishedDate).toISOString()}
            description={`報導者專題《${title}》封面影片`}
            poster={_.get(ogImage, 'resized_targets.tablet.url') || _.get(leadingImage, 'resized_targets.tablet.url') || SITE_META.OG_IMAGE}
            viewportHeight={viewportHeight}
          />
        ) : (
          <LeadingImage
            alt={_.get(leadingImage, 'description')}
            imgSet={_.get(leadingImage, 'resized_targets')}
            portraitImgSet={_.get(leadingImagePortrait, 'resized_targets')}
            viewportHeight={viewportHeight}
          />
        )}
        <components.Content>
          {headline ? <components.Headline>{headline}</components.Headline> : null}
          <components.Title>{title}</components.Title>
          {subtitle ? <components.Subtitle>{subtitle}</components.Subtitle> : null}
          <components.Dash />
          <components.PublishDate>{`${date2yyyymmdd(publishedDate, '.')} 最後更新`}</components.PublishDate>
        </components.Content>
        <components.ArrowDown onClick={this.scrollToNextSection} >
          <ArrowDownIcon />
        </components.ArrowDown>
      </Container>
    )
  }
}
