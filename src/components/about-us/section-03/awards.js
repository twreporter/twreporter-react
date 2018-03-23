import { colors, section03Styles } from '../constants/styles'
import { screen } from '../utils/screen'
import AwardDetails from './award-details'
import AwardImages from './award-images'
import awardsData from '../constants/section-03/awards'
import AwardTitles from './award-titles'
import map from 'lodash/map'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Swipeable from 'react-swipeable'
import NextPrevButtons from './next-prev-btns'

const _ = {
  map
}

const images = _.map(awardsData, (award) => award.imageSrc)
const titles = _.map(awardsData, (award) => ({ english: award.awardEng, chinese: award.award }))
const awardRedBlockStyles = section03Styles.awardRedBlock

const Container = styled.div`
  ${screen.tablet`
    margin-top: 81px;
  `}
  ${screen.desktop`
    margin-top: -47px;
  `}
  ${screen.overDesktop`
    margin-top: -56px;
  `}
`

const AwardContents = styled.div `
  background-color: ${colors.primary};
  color: ${colors.white};
  position: relative;
  ${screen.mobile `
    padding-bottom: 74px;
  `}
  ${screen.tablet `
    padding-bottom: 82px;
  `}
  ${screen.desktop`
    width: ${awardRedBlockStyles.width.desktop};
    padding-bottom: 158px;
    min-height: 555px;
  `}
  ${screen.overDesktop`
    width: ${awardRedBlockStyles.width.hd};
    padding-bottom: 122px;
    min-height: 677px;
  `}
`

export default class Awards extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }
  _increaseIndex = () => {
    if (this.state.index >= awardsData.length - 1) 
      return
    this.setState({
      index: this.state.index + 1
    })
  }
  _decreaseIndex = () => {
    if (this.state.index <= 0) 
      return
    this.setState({
      index: this.state.index - 1
    })
  }
  render() {
    const { index } = this.state
    return (
      <Container>
        <Swipeable
          onSwipedLeft={this._increaseIndex}
          onSwipedRight={this._decreaseIndex}
        >
          <AwardTitles
            index={index}
            titles={titles}
            increaseIndex={this._increaseIndex}
            decreaseIndex={this._decreaseIndex}
          />
          <AwardContents>
            <AwardImages
              index={index}
              images={images}
            />
            <AwardDetails
              awardsData={awardsData}
              index={index}
            />
          </AwardContents>
        </Swipeable>
        <NextPrevButtons
          isFirst={index === 0}
          isLast={index === awardsData.length - 1}
          increaseIndex={this._increaseIndex}
          decreaseIndex={this._decreaseIndex}
        />
      </Container>
    )
  }
}
