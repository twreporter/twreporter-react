import { screen } from '../utils/screen'
import { section03Styles } from '../constants/styles'
import map from 'lodash/map'
import React, { PureComponent } from 'react'
import Slides from './slides'
import styled from 'styled-components'

const _ = {
  map
}

const { containerSize, mainSize } = section03Styles.awardImage

const imageAboveRedRegion = {
  mobile: 254,
  tablet: 400
}

const marginTop = 28

const Container = styled.div`
  position: relative;
  overflow: hidden;
  ${screen.mobile`
    width: ${containerSize.mobile};
    height: ${containerSize.mobile};
    margin: ${imageAboveRedRegion.mobile + marginTop}px auto -${imageAboveRedRegion.mobile}px auto;
    transform: translateY(-${imageAboveRedRegion.mobile}px);
  `}
  ${screen.tablet`
    width: ${containerSize.tablet};
    height: ${containerSize.tablet};
    margin: ${imageAboveRedRegion.tablet + marginTop}px auto -${imageAboveRedRegion.tablet}px auto;
    transform: translateY(-${imageAboveRedRegion.tablet}px);
  `}
  ${screen.desktop`
    position: absolute;
    top: ${12+29+52}px;
    right: -103px;
    width: ${containerSize.desktop};
    height: ${containerSize.desktop};
  `}
  ${screen.overDesktop`
    position: absolute;
    top: ${12+29+41}px;
    right: -146px;
    width: ${containerSize.hd};
    height: ${containerSize.hd};
  `}
`

const Image = styled.div`
  background-image: url(${props => props.imageSrc});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`

const CenteredSlides = styled(Slides)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const BluredImage = Image.extend`
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(7.7px);
  opacity: 0.85;
  top: 0;
  left: 0;
  transition: background 500ms ease;
  will-change: background;
`

const WhiteMask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: .85;
  background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.67));
`

const MainImage = Image.extend`
  width: ${mainSize.mobile};
  height: ${mainSize.mobile};
  ${screen.tablet`
    width: ${mainSize.tablet};
    height: ${mainSize.tablet};
  `}
  ${screen.desktop`
    width: ${mainSize.desktop};
    height: ${mainSize.desktop};
  `}
  ${screen.overDesktop`
    width: ${mainSize.hd};
    height: ${mainSize.hd};
  `}
`

export default class ImagesBlock extends PureComponent {
  _buildImage = (imageSrc, index) => (
    <MainImage key={index} imageSrc={imageSrc} />
  )
  _buildImages = (images) => {
    if (!this._imagesJsxArray) {
      this._imagesJsxArray = _.map(images, this._buildImage)
    }
    return this._imagesJsxArray
  }
  render() {
    const { images, index } = this.props
    return (
      <Container>
        <BluredImage imageSrc={images[index]} />
        <WhiteMask />
        <CenteredSlides
          index={index}
          viewportWidth={mainSize}
          duration={500}
        >
          {this._buildImages(images)}
        </CenteredSlides>
      </Container>
    )
  }
}
