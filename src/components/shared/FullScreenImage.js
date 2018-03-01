import PropTypes from 'prop-types'
import React from 'react'
import constPropTypes from '../../constants/prop-types'
import styled from 'styled-components'
import { replaceStorageUrlPrefix } from '../../utils/url'
import { getSrcSet } from '../../utils/img'

// lodash
import get from 'lodash/get'

const _ = {
  get
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
  opacity: 1;
  visibility: ${props => props.toShow ? 'visible' : 'hidden'};
  transition: visibility .5s linear 1s;
`

const StyledPicture = styled.picture`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: ${props => props.toShow ? 'visible' : 'hidden'};
  opacity: ${props => props.toShow ? '1' : '0.8' };
  transition: opacity .5s linear 0s;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ImgFallback = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: ${(props) => {
    return `url(${_.get(props, 'url')})`
  }};
  background-position: center center;
`

class FullScreenImage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isObjectFit: true,
      isLoaded: false
    }
    this.onLoad = this._onLoad.bind(this)
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      this.setState({
        isObjectFit: 'objectFit' in _.get(document, 'documentElement.style')
      })
    }
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

  render() {
    const { isLoaded, isObjectFit } = this.state
    const { alt, imgSet, portraitImgSet, useBackgroundImage } = this.props
    const imgJSX = isObjectFit && !useBackgroundImage ? (
      <StyledPicture
        toShow={isLoaded}
      >
        <source media={`(orientation: portrait)`} srcSet={getSrcSet(portraitImgSet)} />
        <source srcSet={getSrcSet(imgSet)} />
        <img
          alt={alt}
          ref={node => { this._imgNode = node }}
          onLoad={this.onLoad}
          src={replaceStorageUrlPrefix(_.get(imgSet, 'mobile.url'))}
        />
      </StyledPicture>
    ) : (
      <ImgFallback
        url={replaceStorageUrlPrefix(_.get(imgSet, 'desktop.url'))}
      />
    )
    return (
      <FullScreenContainer
        itemProp="image"
        itemScop
        itemType="http://schema.org/ImageObject"
      >
        <meta itemProp="url" content={_.get(imgSet, 'desktop.url')} />
        <meta itemProp="description" content={alt} />
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
  useBackgroundImage: false,
  portraitImgSet: {}
}

FullScreenImage.propTypes = {
  alt: PropTypes.string,
  imgSet: constPropTypes.imgSet,
  useBackgroundImage: PropTypes.bool,
  portraitImgSet: constPropTypes.imgSet
}

export default FullScreenImage
