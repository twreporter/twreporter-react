import { font, section03Styles } from '../constants/styles'
import { getMobileSectionTitleStyle } from '../utils/get-section-title-style'
import { screen } from '../utils/screen'
import bigNumber from '../../../../static/asset/about-us/title-03.png'
import mobileTitleImage from '../../../../static/asset/about-us/mobile-title-03.png'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const containerWidth = section03Styles.sectionTitle.containerWidth
const numberHeight = section03Styles.sectionTitle.number.height
const numberWidth = section03Styles.sectionTitle.number.width

const Container = styled.div`
  position: relative;
  background-repeat: no-repeat;
  background-position: right center;
  margin: 0 auto;
  z-index: '5';
  ${screen.mobile`
    ${getMobileSectionTitleStyle(mobileTitleImage, '101px')}
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
          <EnglishTitle>AWARDS</EnglishTitle>
          <Title>得獎</Title>
        </TitleWrapper>
      </Container>
    )
  }
}
