import PlaceholderSVG from '../../../static/asset/img-loading-placeholder.svg'
import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash/get'
import styled from 'styled-components'
import { articleLayout as layout } from '../../themes/layout'
import { colors, lineHeight, typography } from '../../themes/common-variables'
import { replaceStorageUrlPrefix } from '../../utils/url'
import { getSrcSet } from '../../utils/img'

const _ = {
  get
}

const _imageProp = PropTypes.shape({
  height: PropTypes.number,
  width: PropTypes.number,
  url: PropTypes.string
})

const _imgSetProp = PropTypes.shape({
  tiny: _imageProp,
  mobile: _imageProp,
  desktop: _imageProp,
  tablet: _imageProp,
  original: _imageProp
})

const _imgSizesProp = PropTypes.shape({
  tablet: PropTypes.string,
  desktop: PropTypes.string,
  hd: PropTypes.string
})

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
  visibility: ${props => props.toShow ? 'visible' : 'hidden'};
`

const ImgBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: ${props => props.toShow ? 'visible' : 'hidden'};
  opacity: ${props => props.toShow ? '1' : '0.8' };
  transition: visibility 0s linear 0s, opacity .5s linear 0s;

  > img {
    width: 100%;
  }
`

class Image extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false
    }
    this.onLoad = this._onLoad.bind(this)
  }

  componentDidMount() {
    // Check if img is already loaded, and cached on the browser.
    // If cached, React.img won't trigger onLoad event.
    // Hence, we need to trigger re-rendering.
    if (this._imgNode) {
      this.onLoad()
    }
  }

  _onLoad() {
    this.setState({
      isLoaded: true
    })
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

  render() {
    const { isLoaded } = this.state
    const { alt, imgSet, imgSizes } = this.props
    const srcset = getSrcSet(imgSet)
    const sizes = this._getSizes(imgSizes)

    return (
      <figure
        itemProp="associateMedia image"
        itemScope
        itemType="http://schema.org/ImageObject"
      >
        <ImgContainer
          height={_.get(imgSet, 'tiny.height')}
          width={_.get(imgSet, 'tiny.width')}
        >
          <ImgPlaceholder
            toShow={!isLoaded}
          >
            <PlaceholderSVG />
          </ImgPlaceholder>
          <ImgBox
            toShow={isLoaded}
          >
            <img
              alt={alt}
              sizes={sizes}
              onLoad={this.onLoad}
              src={replaceStorageUrlPrefix(_.get(imgSet, 'mobile.url'))}
              srcSet={srcset}
              ref={node => { this._imgNode = node }}
            />
          </ImgBox>
        </ImgContainer>
        <Caption
          itemProp="description"
          toShow={this.props.toShowCaption}
        >
          {alt}
        </Caption>
      </figure>
    )
  }
}

Image.ImgBox = ImgBox
Image.ImgPlaceholder = ImgPlaceholder
Image.ImgContainer = ImgContainer

Image.propTypes = {
  alt: PropTypes.string,
  imgSet: _imgSetProp,
  imgSizes: _imgSizesProp,
  toShowCaption: PropTypes.bool
}

Image.defaultProps = {
  alt: '',
  imgSet: {},
  imgSizes: {},
  toShowCaption: true
}

export default Image
