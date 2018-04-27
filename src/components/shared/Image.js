import PlaceholderSVG from '../../../static/asset/img-loading-placeholder.svg'
import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash/get'
import constPropTypes from '../../constants/prop-types'
import styled from 'styled-components'
import { articleLayout as layout } from '../../themes/layout'
import { colors, lineHeight, typography } from '../../themes/common-variables'
import { getSrcSet } from '../../utils/img'
import { replaceStorageUrlPrefix } from '../../utils/url'

const _ = {
  get
}

const Caption = styled.figcaption`
  display: ${props => props.toShow ? 'block': 'none' };
  text-align: justify;
  color: ${colors.gray.gray50};
  font-size: ${typography.font.size.medium};
  line-height: ${lineHeight.large};
  margin: 16px 24px 0 24px;
`

const ImgContainer = styled.div`
  position: relative;
  padding-bottom: ${(props) => {
    const height = props.height
    const width = props.width
    return ((height / width) * 100 ) + '%'
  }}
`

const ImgPlaceholder = styled.div`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${props => props.toShow ? 'block' : 'none'};
`

const ImgBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.toShow ? '1' : '0' };
  transition:  opacity .5s;

  > img {
    width: 100%;
  }
`

class Image extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      toShowPlaceholder: true
    }
    this.onLoad = this._onLoad.bind(this)
    this._imgNode = null
    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true

    // Check if img is already loaded, and cached on the browser.
    // If cached, React.img won't trigger onLoad event.
    // Hence, we need to trigger re-rendering.
    if (this._imgNode) {
      this.onLoad()
    }
  }

  componentWillUnmount() {
    this._isMounted = false
    this._imgNode = null
  }

  _onLoad() {
    this.setState({
      isLoaded: true
    })

    setTimeout(() => {
      if (this._isMounted) {
        this.setState({
          toShowPlaceholder: false
        })
      }
    }, 1000)
  }

  _getSizes(imgSizes) {
    if (!imgSizes) {
      return null
    }

    const hdSize = _.get(imgSizes, 'hd')
    const desktopSize = _.get(imgSizes, 'desktop')
    const tabletSize = _.get(imgSizes, 'tablet')
    const mobileSize = _.get(imgSizes, 'mobile')

    return `(min-width: ${layout.hd.width.large}px) ${hdSize}, ` +
      `(min-width: ${layout.desktop.width.large}px) ${desktopSize}, ` +
      `(min-width: ${layout.tablet.width.large}px) ${tabletSize}, ` +
      `(min-width: 0px)  ${mobileSize}`
  }

  _renderImgPlaceHolder(toShow) {
    return (
      <ImgPlaceholder
        toShow={toShow}
      >
        <PlaceholderSVG />
      </ImgPlaceholder>
    )
  }

  render() {
    const { isLoaded, toShowPlaceholder } = this.state
    const { alt, imgSet, imgSizes } = this.props
    const srcSet = getSrcSet(imgSet)
    const sizes = this._getSizes(imgSizes)

    return (
      <figure
        itemProp="image"
        itemScope
        itemType="http://schema.org/ImageObject"
      >
        <ImgContainer
          height={_.get(imgSet, 'tiny.height')}
          width={_.get(imgSet, 'tiny.width')}
        >
          {this._renderImgPlaceHolder(toShowPlaceholder)}
          <ImgBox
            toShow={isLoaded}
          >
            <img
              alt={alt}
              sizes={sizes}
              onLoad={this.onLoad}
              src={replaceStorageUrlPrefix(_.get(imgSet, 'mobile.url'))}
              srcSet={srcSet}
              ref={node => { this._imgNode = node }}
              itemProp="contentUrl"
            />
          </ImgBox>
        </ImgContainer>
        <Caption
          toShow={this.props.toShowCaption}
          itemProp="description"
        >
          {alt}
        </Caption>
      </figure>
    )
  }
}

Image.propTypes = {
  alt: PropTypes.string,
  imgSet: constPropTypes.img,
  imgSizes: constPropTypes.imgSizes,
  toShowCaption: PropTypes.bool
}

Image.defaultProps = {
  alt: '',
  imgSet: {},
  imgSizes: {},
  toShowCaption: true
}

export default Image
