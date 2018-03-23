import { colors, font, section03Styles } from '../constants/styles'
import { screen } from '../utils/screen'
import palmLeftRed from '../../../../static/asset/about-us/palm-left-red.png'
import palmLeftWhite from '../../../../static/asset/about-us/palm-left-white.png'
import palmRightRed from '../../../../static/asset/about-us/palm-right-red.png'
import palmRightWhite from '../../../../static/asset/about-us/palm-right-white.png'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

const toWidth = (height) => `${parseInt(height, 10) * 0.506}px`

const boxHeight = section03Styles.awardTitle.height

const Conatiner = styled.div`
  display: flex;
  height: ${boxHeight.mobile};
  ${screen.desktop`
    height: ${boxHeight.desktop};
  `}
  ${screen.overDesktop`
    height: ${boxHeight.hd};
  `}
`

const Palm = styled.div`
  display: block;
  background-image: url(${props => props.redPalm});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  height: ${boxHeight.mobile};
  width: ${toWidth(boxHeight.mobile)};
  flex-basis: ${toWidth(boxHeight.mobile)};
  flex-grow: 0;
  flex-shrink: 1;
  ${screen.desktopAbove`
    background-image: url(${props => props.whitePalm});
    height: ${boxHeight.desktop};
    width: ${toWidth(boxHeight.desktop)};
    flex-basis: ${toWidth(boxHeight.desktop)};
  `}
  ${screen.overDesktop`
    height: ${boxHeight.hd};
    width: ${toWidth(boxHeight.hd)};
    flex-basis: ${toWidth(boxHeight.hd)};
  `}
`

const TitleWrapper = styled.h3`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0;
  margin: 0;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  height: ${boxHeight.mobile};
  ${screen.desktop`
    height: ${boxHeight.desktop};
  `}
  ${screen.overDesktop`
    height: ${boxHeight.hd};
  `}
  color: ${colors.primary};
  ${screen.desktopAbove`
    color: ${colors.white};
  `}
`

const Chinese = styled.div`
  font-family: ${font.family.chinese}, ${font.family.sansSerifFallback};
  font-weight: ${font.weight.bold};
  margin-bottom: 5px;
  ${screen.tabletBelow`
    font-size: 20px;
    letter-spacing: 4.7px;
    margin-right: -4.7px;
    margin-bottom: 0;
  `}
  ${screen.desktop`
    font-size: 24px;
    letter-spacing: 5.6px;
    margin-right: -5.6px;
  `}
  ${screen.overDesktop`
    font-size: 28px;
    letter-spacing: 6.6px;
    margin-right: -6.6px;
  `}
`

const English = styled.div`
  font-family: ${font.family.english.din}, ${font.family.sansSerifFallback};
  font-weight: ${font.weight.medium};
  ${screen.desktopBelow`
    font-size: 16px;
    letter-spacing: 0.3px;
  `}
  ${screen.overDesktop`
    font-size: 20px;
    letter-spacing: 0.4px;
  `}
`

export default class AwardTitle extends Component {
  static propTypes = {
    chinese: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired
  }

  render() {
    const { chinese, english } = this.props
    return (
      <Conatiner>
        <Palm redPalm={palmLeftRed} whitePalm={palmLeftWhite} />
        <TitleWrapper>
          <Chinese>{chinese}</Chinese>
          <English>{english}</English>
        </TitleWrapper>
        <Palm redPalm={palmRightRed} whitePalm={palmRightWhite} />
      </Conatiner>
    )
  }
}
