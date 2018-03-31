import { font } from '../constants/styles'
import { getMobileSectionTitleStyle } from '../utils/get-section-title-style'
import { screen } from '../utils/screen'
import bigNumber from '../../../../static/asset/about-us/title-05.png'
import mobileTitleImage from '../../../../static/asset/about-us/mobile-title-05.png'
import React, { PureComponent } from 'react'
import styled from 'styled-components'


const sectionTitleStyle = {
  containerWidth: {
    tablet: '571px',
    desktop: '763px',
    hd: '926px'
  },
  number: {
    height: {
      mobile: '281px',
      tablet: '281px',
      desktop: '404px',
      hd: '404px'
    },
    width: {
      tablet: '162px',
      desktop: '233px',
      hd: '233px'
    }
  }
}

const containerWidth = sectionTitleStyle.containerWidth
const numberHeight = sectionTitleStyle.number.height
const numberWidth = sectionTitleStyle.number.width      

const Container = styled.div`
  position: relative;
  background-repeat: no-repeat;
  background-position: right center;
  margin: 0 auto;
  z-index: '5';
  ${screen.mobile`
    ${getMobileSectionTitleStyle(mobileTitleImage, '49px')}
  `}
  ${screen.tablet`
    background-image: url(${bigNumber});
    background-size: ${numberWidth.tablet} ${numberHeight.tablet};
    width: ${containerWidth.tablet};
    height: ${numberHeight.tablet};
  `}
  ${screen.desktopAbove`
    background-image: url(${bigNumber});
    background-size: ${numberWidth.desktop} ${numberHeight.desktop};
    width: ${containerWidth.desktop};
    height: ${numberHeight.desktop};
  `}
  ${screen.overDesktop`
    width: ${containerWidth.hd};
  `}
`

const TitleWrapper = styled.div`
  position: relative;
  ${screen.mobile`
    display: none;
  `}
  ${screen.tablet`
    top: 93px;
  `}
  ${screen.desktop`
    top: 62px;
  `}
  ${screen.overDesktop`
    top: 62px;
  `}
`

const EnglishTitle = styled.div`
  font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};
  font-weight: ${font.weight.bold};
  ${screen.tablet`
    letter-spacing: 17.1px;
    font-size: 31px;
  `}
  ${screen.desktop`
    letter-spacing: 19.8px;
    font-size: 36px;
  `}
  ${screen.overDesktop`
    letter-spacing: 19.8px;
    font-size: 36px;
  `}
`

const Title = styled.div`
  font-family: ${font.family.chinese}, ${font.family.sansSerifFallback};
  font-weight: ${font.weight.bold};
  font-size: 24px;
  letter-spacing: 5.6px;
  margin-top: 29px;
`

export default class SectionTitle extends PureComponent {
  render() {
    return (
      <Container>
        <TitleWrapper>
          <EnglishTitle>HIGHTLIGHT</EnglishTitle>
          <Title>大事紀</Title>
        </TitleWrapper>
      </Container>
    )
  }
}
