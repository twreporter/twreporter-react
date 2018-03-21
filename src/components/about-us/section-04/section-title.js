import { font } from '../constants/styles'
import { getMobileSectionTitleStyle } from '../utils/get-section-title-style'
import { screen } from '../utils/screen'
import bigNumber from '../../../../static/asset/about-us/title-04.png'
import mobileTitleImage from '../../../../static/asset/about-us/mobile-title-04.png'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const numberHeight = {
  mobile: '277px',
  tablet: '277px',
  desktop: '398px',
  hd: '398px'
}

const numberWidth = {
  tablet: '172px',
  desktop: '247px',
  hd: '247px'
}

const titleMarginLeft = {
  tablet: '300px',
  desktop: '340px',
  hd: '538px'
}

const Container = styled.div`
  position: relative;
  background-repeat: no-repeat;
  background-position: left center;
  flex-grow: 0;
  flex-shrink: 0;
  ${screen.mobile`
    ${getMobileSectionTitleStyle(mobileTitleImage, '101px')}
  `}
  ${screen.tablet`
    background-image: url(${bigNumber});
    background-size: ${numberWidth.tablet} ${numberHeight.tablet};
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

const EnglishTitle = styled.div`
  font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};
  font-weight: ${font.weight.bold};
  font-size: 36px;
  ${screen.mobile`
    display: none;
  `}
  ${screen.tablet`
    margin-left: ${titleMarginLeft.tablet};
    margin-bottom: 10px;
    letter-spacing: 17.1px;
  `}
  ${screen.desktop`
    margin-left: ${titleMarginLeft.desktop};
    margin-bottom: 10px;
    letter-spacing: 19.8px;
  `}
  ${screen.overDesktop`
    margin-left: ${titleMarginLeft.hd};
    margin-bottom: 10px;
    letter-spacing: 19.8px;
  `}
`

const Title = styled.div`
  font-family: ${font.family.chinese}, ${font.family.sansSerifFallback};
  font-weight: ${font.weight.bold};
  font-size: 24px;
  letter-spacing: 5.6px;
  ${screen.mobile`
    display: none;
  `}
  ${screen.tablet`
    margin-left: ${titleMarginLeft.tablet};
    margin-top: 30px;
  `}
  ${screen.desktop`
    margin-left: ${titleMarginLeft.desktop};
    margin-top: 30px;
  `}
  ${screen.overDesktop`
    margin-left: ${titleMarginLeft.hd};
    margin-top: 30px;
  `}
`

export default class SectionTitle extends PureComponent {
  render() {
    return (
      <Container>
        <EnglishTitle>INTERNATIONAL</EnglishTitle>
        <EnglishTitle>COOPERATION</EnglishTitle>
        <Title>國際合作</Title>
      </Container>
    )
  }
}
