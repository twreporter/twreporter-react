import PropTypes from 'prop-types'
import React from 'react'
import SharedImage from './Image'
import styled from 'styled-components'
import { replaceStorageUrlPrefix } from '../../utils/url'
import { getSrcSet } from '../../utils/img'

// lodash
import get from 'lodash/get'
import merge from 'lodash/merge'

const _ = {
  get,
  merge
}

const FullScreenContainer = styled.figure`
  position: relative;
  width: 100vw;
  height: 100vh;
`

const ImgPlaceholder = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: blur(5px);
  position: absolute;
  opacity: ${props => props.toShow ? '1' : '0'};
  visibility: ${props => props.toShow ? 'visible' : 'hidden'};
  transition: opacity .5s linear, visibility .5s linear;
`

const StyledPicture = SharedImage.ImgBox.extend`
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`.withComponent('picture')

const ImgFallback = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: ${(props) => {
    return `url(${_.get(props, 'url')})`
  }};
  background-position: center center;
`

class FullScreenImage extends SharedImage {
  constructor(props) {
    super(props)
    this.state = {
      isObjectFit: true
    }
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      this.setState({
        isObjectFit: 'objectFit' in _.get(document, 'documentElement.style')
      })
    }
  }

  render() {
    const { isLoaded } = this.state
    const { alt, imgSet, portraitImgSet } = this.props
    const imgSrc = replaceStorageUrlPrefix(_.get(imgSet, 'mobile.url'))
    const imgJSX = this.state.isObjectFit ? (
      <StyledPicture
        toShow={isLoaded}
      >
        <source media={`(orientation: portrait)`} srcSet={getSrcSet(portraitImgSet)} />
        <source srcSet={getSrcSet(imgSet)} />
        <img
          alt={alt}
          ref={node => { this._imgNode = node }}
          onLoad={this.onLoad}
          src={imgSrc}
        />
      </StyledPicture>
    ) : (
      <ImgFallback
        url={imgJSX}
      />
    )
    return (
      <FullScreenContainer>
        <ImgPlaceholder
          src={_.get(imgSet, 'tiny.url')}
          toShow={!isLoaded}
        />
        {imgJSX}
      </FullScreenContainer>
    )
  }
}

FullScreenImage.defaultProps = {
  alt: '',
  imgSet: {},
  portraitImgSet: {}
}

FullScreenImage.propTypes = {
  alt: PropTypes.string,
  imgSet: SharedImage.propTypes.imgSet,
  portraitImgSet: SharedImage.propTypes.imgSet
}

export default FullScreenImage
