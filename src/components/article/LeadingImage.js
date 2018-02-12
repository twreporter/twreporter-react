/* eslint no-unused-vars:0 */
'use strict'
import SharedImage from '../shared/Image'
import PropTypes from 'prop-types'
import React from 'react' // eslint-disable-line
import styled from 'styled-components'
import { TITLE_POSITION_UPON_LEFT } from '../../constants/page-themes'
import { articleLayout as layout } from '../../themes/layout'
import { screen } from '../../themes/screen'
import { replaceStorageUrlPrefix } from '../../utils/index'

// lodash
import get from 'lodash/get'

const _ = {
  get
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

const LeadingImgContainer = styled.figure`
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
  opacity: ${props => props.toShow ? '1' : '0'};
  visibility: ${props => props.toShow ? 'visible' : 'hidden'};
  transition: opacity .5s linear, visibility .5s linear;
`

class LeadingImage extends SharedImage {
  render() {
    const { isLoaded } = this.state
    const { alt, imgObj, size } = this.props
    const { ImgBox, ImgContainer, ImgPlaceholder }  = this._styledComponetns

    const imgSet = {
      ..._.get(imgObj, 'resizedTargets', {}),
      original: {
        url: _.get(imgObj, 'url'),
        width: _.get(imgObj, 'width'),
        height: _.get(imgObj, 'height')
      }
    }
    const srcset = this._getSrcset(imgSet)

    const imgSizes = {
      mobile: '95vw',
      tablet: getMaxWidthBySize(size, 'tablet'),
      desktop: getMaxWidthBySize(size, 'desktop'),
      hd: getMaxWidthBySize(size, 'hd')
    }
    const sizes = this._getSizes(imgSizes)

    return (
      <LeadingImgContainer
        size={size}
      >
        <ImgContainer
          height={_.get(imgSet, 'tiny.height')}
          width={_.get(imgSet, 'tiny.width')}
        >
          <ImgPlaceholder
            src={_.get(imgSet, 'tiny.url')}
            toShow={!isLoaded}
          />
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
      </LeadingImgContainer>
    )
  }
}

LeadingImage.propTypes.size = PropTypes.string
LeadingImage.propTypes.imgObj = PropTypes.object.isRequired

LeadingImage.defaultProps.size = 'normal'

export default LeadingImage
