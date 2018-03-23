import { colors, section03Styles } from '../constants/styles'
import { screen } from '../utils/screen'
import arrowRedLeft from '../../../../static/asset/about-us/award-arrow-red-left.png'
import arrowRedRight from '../../../../static/asset/about-us/award-arrow-red-right.png'
import AwardTitle from './award-title'
import map from 'lodash/map'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Slides from './slides'
import styled from 'styled-components'

const _ = {
  map
}

const viewportWidth = section03Styles.awardTitle.width
const awardRedBlockStyles = section03Styles.awardRedBlock

const Container = styled.div`
  background-color:${colors.primary};
  ${screen.tabletBelow`
    background-color:${colors.white};
  `}
  ${screen.desktopAbove`
    padding-top: 116px;
  `}
  ${screen.desktop`
    width: ${awardRedBlockStyles.width.desktop};
  `}
  ${screen.overDesktop`
    width: ${awardRedBlockStyles.width.hd};
  `}
`

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  ${screen.tabletBelow`
    justify-content: center;
  `}
  ${screen.desktop`
    position: relative;
    left: ${awardRedBlockStyles.paddingLeft.desktop};
  `}
  ${screen.overDesktop`
    position: relative;
    left: ${awardRedBlockStyles.paddingLeft.hd};
  `}
`

const Btn = styled.div`
  opacity: ${props => (props.disable ? '0.3' : '1')};
  transition: opacity 200ms ease;
  width: 18px;
  padding: 20px;
  background-image: url(${props => props.imageSrc});
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
  ${screen.desktopAbove`
    display: none;
  `}
`

const StyledSlides = styled(Slides)`
  flex-grow: 0;
  flex-shrink: 0;
`

const TitleWrapper = styled.div`
  position: relative;
  opacity: ${props => (props.isOn ? '1' : '0')};
  transition: opacity 500ms ease;
  will-change: opacity;
  ${screen.mobile`
    width: ${viewportWidth.mobile};
  `}
  ${screen.tablet`
    width: ${viewportWidth.tablet};
  `}
  ${screen.desktop`
    width: ${viewportWidth.desktop};
  `}
  ${screen.overDesktop`
    width: ${viewportWidth.hd};
  `}
  
  ${screen.desktopAbove`
    background-color:${colors.primary};
    justify-content: flex-start;
  `}
  ${screen.tabletBelow`
    text-align: center;
    >div {
      display: inline-flex;
    }
  `}
`

export default class AwardTitles extends PureComponent {
  static propTypes = {
    titles: PropTypes.arrayOf(PropTypes.shape({
      chinese: PropTypes.string.isRequired,
      english: PropTypes.string.isRequired
    })),
    increaseIndex: PropTypes.func.isRequired,
    decreaseIndex: PropTypes.func.isRequired
  }
  _buildTitle = (title, index) => (
    <TitleWrapper key={title.english} isOn={index === this.props.index}>
      <AwardTitle {...title} />
    </TitleWrapper>
  )
  render() {
    const { decreaseIndex, increaseIndex, titles, index } = this.props
    return (
      <Container>
        <Wrapper>
          <Btn
            imageSrc={arrowRedLeft}
            onClick={decreaseIndex}
            disable={index === 0}
          />
          <StyledSlides
            viewportWidth={viewportWidth}
            index={index}
            duration={500}
          >
            {_.map(titles, this._buildTitle)}
          </StyledSlides>
          <Btn
            imageSrc={arrowRedRight}
            onClick={increaseIndex}
            disable={index === titles.length - 1}
          />
        </Wrapper>
      </Container>
    )
  }
}
