import { content } from '../constants/data/section4-content'
import { screen } from '../utils/screen'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

export const infoCardWidth = {
  desktop: '362px',
  overDesktop: '560px'
}

export const MoreButton = styled.button`
  border: 2px solid palevioletred;
`

export const StyledCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  float: right;
  ${screen.overDesktop`
    width: ${infoCardWidth.overDesktop};
  `}
  ${screen.desktop`
    width: ${infoCardWidth.desktop};
  `}
  ${screen.tablet`
    margin: 7.8px;
    width: calc(50% - 15.6px);
    float: left;
  `}    
  ${screen.mobile`
    margin: 20px auto;
    width: 100%;
  `}  
`

const DesktopStyledCard = StyledCard.extend`
  ${screen.tabletBelow`
    display: none;
  `}
`

const StyledCardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const StyledCardBackground = StyledCardOverlay.extend`
  background: ${props => !props.seeingMore ? 'none' : '#c7000a'};
  background-image: ${props => !props.seeingMore ? `url(${props.photo})` : 'none'};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  opacity: 0.8;
`

const StyledCardContent = StyledCardOverlay.extend`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

// Desktop InfoCard
export class InfoCard extends PureComponent {
  render() {
    const { story, seeingMore, showPhoto } = this.props
    return (
      <React.Fragment>
        {seeingMore ? (
          <DesktopStyledCard >
            <StyledCardBackground photo={content[story - 1].cardPhoto} seeingMore={seeingMore} />
            <StyledCardContent>
              <p>{content[story - 1].longerTitle.chinese}</p>
              <p>{content[story - 1].longerTitle.english}</p>
              <p>{content[story - 1].description.chinese}</p>
              <p>{content[story - 1].description.english}</p>
            </StyledCardContent>
          </DesktopStyledCard>
        ) : (
            <DesktopStyledCard>
              <StyledCardBackground photo={content[story - 1].cardPhoto} seeingMore={seeingMore} />
              <StyledCardContent>
                <p>{content[story - 1].title.chinese}</p>
                <p>{content[story - 1].title.english}</p>
                <p><br /></p>
                <p><br /></p>
                <MoreButton onClick={showPhoto}>更多資訊</MoreButton>
              </StyledCardContent>
            </DesktopStyledCard>
          )}
      </React.Fragment>
    )
  }
}

InfoCard.defaultProps = {
  seeingMore: false,
  story: 1
}

InfoCard.propTypes = {
  seeingMore: PropTypes.bool.isRequired,
  story: PropTypes.number.isRequired,
  showPhoto: PropTypes.func.isRequired  
}

export default InfoCard
