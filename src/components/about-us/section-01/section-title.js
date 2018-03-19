import bigNumber from '../../../../static/asset/about-us/title-01.png'
import { getMobileSectionTitleStyle } from '../utils/get-section-title-style'
import mobileTitleImage from '../../../../static/asset/about-us/mobile-title-01.png'
import React, { PureComponent } from 'react'
import { screen } from '../utils/screen'
import styled from 'styled-components'

const numberHeight = {
  mobile: '276px',
  tablet: '276px',
  desktop: '399px',
  hd: '399px'
}

const numberWidth = {
  tablet: '106px',
  desktop: '153px',
  hd: '153px'
}

const Container = styled.div`
  position: relative;
  background-repeat: no-repeat;
  background-position: center center;
  flex-grow: 0;
  flex-shrink: 0;
  ${screen.mobile`
    ${getMobileSectionTitleStyle(mobileTitleImage, '101px')}
  `}
  ${screen.tablet`
    background-image: url(${bigNumber});
    background-size: ${numberWidth.tablet} ${numberHeight.tablet};
    background-position: center center;
    width: 100%;
    height: ${numberHeight.tablet};
    display: flex;
    flex-direction: column;
    justify-content: center;
  `}
  ${screen.desktop`
    background-image: url(${bigNumber});
    background-size: ${numberWidth.desktop} ${numberHeight.desktop};
    width: 100%;
    height: ${numberHeight.desktop};
    display: flex;
    flex-direction: column;
    justify-content: center;
  `}
  ${screen.overDesktop`
    background-image: url(${bigNumber});
    background-size: ${numberWidth.hd} ${numberHeight.hd};
    width: 100%;
    height: ${numberHeight.hd};
    display: flex;
    flex-direction: column;
    justify-content: center;
  `}
`

export default class SectionTitle extends PureComponent {
  render() {
    return (
      <Container />
    )
  }
}
