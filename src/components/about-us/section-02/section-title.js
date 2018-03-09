import { font } from '../constants/styles'
import { getMobileSectionTitleStyle } from '../utils/get-section-title-style'
import { screen } from '../utils/screen'
import bigNumber from '../../../../static/asset/about-us/title-02.png'
import mobileTitleImage from '../../../../static/asset/about-us/mobile-title-02.png'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const numberHeight = {
  mobile: '276px',
  tablet: '281px',
  desktop: '404px',
  hd: '404px'
}

const numberWidth = {
  tablet: '168px',
  desktop: '241px',
  hd: '241px'
}

const titleMarginLeft = {
  tablet: '300px',
  desktop: '380px'
}

const Container = styled.div`
  position: relative;
  background-repeat: no-repeat;
  flex-grow: 0;
  flex-shrink: 0;
  ${screen.mobile`
    ${getMobileSectionTitleStyle(mobileTitleImage, '101px')}
  `}
  ${screen.tablet`
    background-image: url(${bigNumber});
    background-size: ${numberWidth.tablet} ${numberHeight.tablet};
    background-position: left center;
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
    letter-spacing: 17.1px;
  `}
  ${screen.desktop`
    margin-left: ${titleMarginLeft.desktop};
    letter-spacing: 19.8px;
  `}
  ${screen.overDesktop`
    letter-spacing: 19.8px;
    margin-top: 500px;
  `}
`

const Title = styled.div`
  font-family: ${font.family.chinese}, ${font.family.sansSerifFallback};
  font-weight: ${font.weight.bold};
  font-size: 36px;
  letter-spacing: 5.6px;
  ${screen.mobile`
    display: none;
  `}
  ${screen.tablet`
    margin-left: ${titleMarginLeft.tablet};
  `}
  ${screen.desktop`
    margin-left: ${titleMarginLeft.desktop};
  `}
`

export default class SectionTitle extends PureComponent {
  static propTypes = {

  }

  render() {
    return (
      <Container>
        <EnglishTitle>MEMBER</EnglishTitle>
        <Title>成員</Title>
      </Container>
    )
  }
}
