/* eslint no-unused-vars:0 */
'use strict'
import PropTypes from 'prop-types'
import React from 'react' // eslint-disable-line
import SharedImage from '../shared/Image'
import constPt from '../../constants/prop-types'
import styled from 'styled-components'
import { articleLayout as layout } from '../../themes/layout'
import { getSrcSet } from '../../utils/img'
import { replaceStorageUrlPrefix } from '../../utils/url'
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

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;

  ${screen.tablet`
    max-width: ${props => getMaxWidthBySize(props.size, 'tablet')};
  `}

  ${screen.desktop`
    max-width: ${props => getMaxWidthBySize(props.size, 'desktop')};
  `}

  ${screen.overDesktop`
    max-width: ${props => getMaxWidthBySize(props.size, 'hd')};
  `}
`

const ImgPlaceholder = styled.img`
  width: 100%;
  display: block;
  filter: blur(5px);
  position: absolute;
  opacity: 1;
  visibility: ${props => props.toShow ? 'visible' : 'hidden'};
  transition: visibility .5s linear 1s;
`

class ExtendingSharedImage extends SharedImage {
  constructor(props) {
    super(props)
    this._renderImgPlaceHolder = this._renderImgPlaceHolder.bind(this)
  }

  _renderImgPlaceHolder(toShow) {
    const src = replaceStorageUrlPrefix(_.get(this.props, 'imgSet.tiny.url'))
    return (
      <ImgPlaceholder
        src={src}
        toShow={toShow}
      />
    )
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

    return (
      <Container
        size={size}
      >
        <ExtendingSharedImage
          imgSizes={imgSizes}
          imgSet={imgSet}
          toShowCaption={!!alt}
          alt={alt}
        />
      </Container>
    )
  }
}

HeroImage.propTypes = _.merge({}, SharedImage.propTypes, {
  alt: PropTypes.string,
  imgObj: constPt.imgObjPt.isRequired,
  size: PropTypes.string
})

HeroImage.defaultProps = _.merge({}, SharedImage.defaultProps, {
  size: 'normal'
})

export default HeroImage
