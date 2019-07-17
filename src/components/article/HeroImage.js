/* eslint no-unused-vars:0 */
'use strict'
import PropTypes from 'prop-types'
import React from 'react' // eslint-disable-line
import ResolutionSwitchingImage from '../shared/Image'
import constPropTypes from '../../constants/prop-types'
import constStyledComponents from '../../constants/styled-components'
import styled from 'styled-components'
import { articleLayout as layout } from '../../themes/layout'
import { getSrcSet } from '../../utils/img'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import { screen } from '../../themes/screen'

// lodash
import get from 'lodash/get'
import merge from 'lodash/merge'

const _ = {
  get,
  merge
}

const getMaxWidthBySize = (size, device) => {
  const deviceLayout = _.get(layout, device, {})
  switch(size) {
    case 'normal':
      return _.get(deviceLayout, 'width.medium') + 'px'
    case 'small':
      return _.get(deviceLayout, 'width.small') + 'px'
    case 'extend':
      return _.get(deviceLayout, 'width.large') + 'px'
    default:
      return '100%'
  }
}

const ImgPlaceholder = styled.img`
  width: calc(100% - 5px);
  display: block;
  filter: blur(5px);
  position: absolute;
  top: 2.5px;
  left: 2.5px;
  display: ${props => props.toShow ? 'block' : 'none'};
`

class Image extends ResolutionSwitchingImage {
  constructor(props) {
    super(props)
    this._renderImgPlaceHolder = this._renderImgPlaceHolder.bind(this)
  }

  _renderImgPlaceHolder(toShow) {
    const src = replaceGCSUrlOrigin(_.get(this.props, 'imgSet.tiny.url'))
    return (
      <ImgPlaceholder
        src={src}
        toShow={toShow}
      />
    )
  }

  _onLoad() {
    // Progressive image
    // Let user see the blur image,
    // and slowly make the blur image clearer

    // in order to make sure users see the blur image,
    // delay the clear image rendering
    setTimeout(() => {
      this.setState({
        isLoaded: true
      })
    }, 1500)

    // after clear image rendered, not display placeholder anymore
    setTimeout(() => {
      this.setState({
        toShowPlaceholder: false
      })
    }, 3000)
  }
}

class HeroImage extends React.PureComponent {
  render() {
    const { alt, imgObj, size } = this.props

    const imgSet = {
      ..._.get(imgObj, 'resizedTargets', {}),
      original: {
        url: _.get(imgObj, 'url'),
        width: _.get(imgObj, 'width'),
        height: _.get(imgObj, 'height')
      }
    }

    const imgSizes = {
      mobile: '95vw',
      tablet: getMaxWidthBySize(size, 'tablet'),
      desktop: getMaxWidthBySize(size, 'desktop'),
      hd: getMaxWidthBySize(size, 'hd')
    }

    let _size
    switch(size) {
      case 'normal':
        _size = 'medium'
        break
      case 'extend':
        _size = 'large'
        break
      default:
        _size = 'small'
    }

    return (
      <constStyledComponents.ResponsiveContainerForAritclePage
        size={_size}
      >
        <Image
          imgSizes={imgSizes}
          imgSet={imgSet}
          toShowCaption={!!alt}
          alt={alt}
        />
      </constStyledComponents.ResponsiveContainerForAritclePage>
    )
  }
}

HeroImage.propTypes = {
  alt: PropTypes.string,
  imgObj: constPropTypes.imgObj.isRequired,
  size: PropTypes.string
}

HeroImage.defaultProps =  {
  alt: '',
  size: 'normal'
}

export default HeroImage
