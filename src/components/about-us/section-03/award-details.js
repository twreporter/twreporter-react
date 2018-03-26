import { screen } from '../utils/screen'
import { section03Styles } from '../constants/styles'
import AwardDetail from './award-detail'
import map from 'lodash/map'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Slides from './slides'
import styled from 'styled-components'
import VelocityComponent from '@twreporter/velocity-react/velocity-component'

const _ = {
  map
}

const viewportWidth = section03Styles.awardDetail.width
const awardRedBlockStyles = section03Styles.awardRedBlock

const Container = styled.div`
  position: relative;
  ${screen.desktop`
    left: ${awardRedBlockStyles.paddingLeft.desktop};
  `}
  ${screen.overDesktop`
    left: ${awardRedBlockStyles.paddingLeft.hd};
  `}
`

const StyledSlides = styled(Slides) `
  flex-grow: 0;
  flex-shrink: 0;
  margin: 0 auto;
  ${screen.desktop`
    margin: 0;
    left: 10%;
  `}
  ${screen.overDesktop`
    margin: 0;
    left: 11.4%;
  `}
`

const AwardWrapper = styled.div `
  opacity: ${props => (props.isOn ? '1' : '0')};
  transition: opacity 500ms ease;
  will-change: opacity;
  ${screen.mobile `
    width: ${viewportWidth.mobile};
  `}
  ${screen.tablet `
    width: ${viewportWidth.tablet};
  `}
  ${screen.desktop `
    width: ${viewportWidth.desktop};
  `}
  ${screen.overDesktop `
    width: ${viewportWidth.hd};
  `}
`

export default class AwardDetails extends PureComponent {
  static propTypes = {
    awardsData: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired
  }
  constructor(props) {
    super(props)
    this._awardDetailHeight = []
  }
  _setAwardDetailHeight = (index) => (ele) => {
    if (ele) {
      this._awardDetailHeight[index] = ele.offsetHeight
    } else {
      this._awardDetailHeight[index] = null
    }
  }
  _getAwardDetailHeight = (index) => {
    const offsetHeight = this._awardDetailHeight[index]
    if (offsetHeight > 0) {
      return `${offsetHeight}px`
    }
    return ''
  }
  _buildAwardDetail = (award, index) => {
    const isOn = this.props.index === index
    const { awardEng, works } = award
    return (
      <AwardWrapper
        key={awardEng}
        isOn={isOn}
        innerRef={this._setAwardDetailHeight(index)}>
        <AwardDetail works={works} />
      </AwardWrapper>
    )
  }
  render() {
    const { awardsData, index } = this.props
    const awardHeight = this._getAwardDetailHeight(index)
    return (
      <Container>
        <VelocityComponent
          animation={!awardHeight ? null : ({ height: awardHeight })}
          duration={500}
        >
          <StyledSlides
            index={index}
            viewportWidth={viewportWidth}
            duration={400}
            delay={100}
          >
            {_.map(awardsData, this._buildAwardDetail)}
          </StyledSlides>
        </VelocityComponent>
      </Container>
    )
  }
}
