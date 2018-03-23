import { content } from '../constants/data/section4-content'
import { screen } from '../utils/screen'
import intlCoMap from '../../../../static/asset/about-us/intl-co-map.png'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { infoCardWidth } from './info-card'

const MapContainer = styled.div`
  background-image: url(${intlCoMap});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  display: block;
  height: 100%;
  float: left;
  ${screen.overDesktop`
    width: calc(100% - ${infoCardWidth.overDesktop});
  `}
  ${screen.desktop`
    width: calc(100% - ${infoCardWidth.desktop});
  `}
  ${screen.tabletBelow`
    display: none;
  `}
`

const PinButton = styled.button`
  border: 2px solid pink;
  transform: ${props => props.isSelected ? 'scale(1.5)' : 'none'};
`

const CloseButton = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  border: 2px solid palevioletred;
`

const PhotoBlock = styled.div`
  background-image: url(${props => props.photo});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: ${props => !props.isOpened ? 'none' : 'block'};
  position: absolute;
  right: 5px;
  top: 5px;
  width: 629px;
  height: 400px;
`

export class Map extends PureComponent {
  render() {
    const { seeingMore, story, storySelector, closePhotoBlock } = this.props
    const PinButtons = content.map((pin, index) => {
      return (
        <li key={index}>
          <PinButton onClick={() => storySelector(index + 1)} isSelected={story === (index + 1)}>{index + 1}</PinButton>
        </li>
      )
    })
    return (
      <MapContainer>
        <ul>
          {PinButtons}
        </ul>
        <PhotoBlock
          isOpened={seeingMore}
          photo={content[story - 1].photo}
        >
          <CloseButton onClick={closePhotoBlock}>close</CloseButton>
        </PhotoBlock>
      </MapContainer>
    )
  }
}

Map.defaultProps = {
  seeingMore: false,
  story: 1
}

Map.propTypes = {
  seeingMore: PropTypes.bool.isRequired,
  story: PropTypes.number.isRequired,
  storySelector: PropTypes.func.isRequired,
  closePhotoBlock: PropTypes.func.isRequired  
}

export default Map
