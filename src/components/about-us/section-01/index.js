import { Waypoint } from 'react-waypoint'
import { colors } from '../../../themes/common-variables'
import { marginBetweenSections } from '../constants/styles'
import { replaceStorageUrlPrefix } from '@twreporter/core/lib/utils/storage-url-processor'
import { screen } from '../utils/screen'
import { storageUrlPrefix } from '../utils/config'
import LottieAnim from './lottie-animation'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const defaultZIndex = 0
const animCaptions = [ '深度', '開放', '非營利' ]

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  background-color: ${colors.white};
  overflow: hidden;
  ${screen.overDesktop`
    margin: 0 0 ${marginBetweenSections.overDesktop} 0;
  `}
  ${screen.desktop`
    margin: 0 0 ${marginBetweenSections.desktop} 0;
  `}
  ${screen.tablet`
    margin: 0 0 ${marginBetweenSections.tablet} 0;
  `}
  ${screen.mobile`
    margin: 0 0 ${marginBetweenSections.mobile} 0;
  `}
`

const BorderTop = styled.div`
  position: ${props => props.fixed ? 'fixed' : 'absolute'};
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${props => props.zIndex};
  background: ${colors.red.liverRed};
  ${screen.overDesktop`
    height: 8px;
  `}
  ${screen.desktop`
    height: 6px;
  `}
  ${screen.tablet`
    height: 7px;
  `}
  ${screen.mobile`
    height: 6px;
  `}
`

const SectionWrapper = styled.section`
  display: block;
  margin: 0 auto;
  ${screen.overDesktop`
    width: 1440px;
    min-height: 1120px;
    padding: 200px 115px 200px 101px;
  `}
  ${screen.desktop`
    width: 1024px;
    min-height: 820px;
    padding: 118px 85px 118px 79px;
  `}
  ${screen.tablet`
    width: 100%;
    padding: 100.9px 96px 67px 90px;
  `}
  ${screen.mobile`
    width: 100%;
    padding: 50.9px 40.5px 45px 41.5px;
  `}
`

const Title = styled.h1`
  background-image: url(${replaceStorageUrlPrefix(`${storageUrlPrefix}/title-section1.png`)});
  background-repeat: no-repeat;
  background-size: contain;
  float: left;
  span{
    display: none;
  }
  ${screen.desktop`
    width: 193.7px;
    height: 330.3px;
  `}
  ${screen.overDesktop`
    width: 276px;
    height: 475px;
  `}
  ${screen.tabletBelow`
    background-image: url(${replaceStorageUrlPrefix(`${storageUrlPrefix}/title-section1-mob.png`)});
    background-position: center top;
    float: none;
    margin: 0 auto;
  `}
  ${screen.tablet`
    width: 134px;
    height: 300px;
  `}
  ${screen.mobile`
    width: 84px;
    height: 195px;
  `}
`

const IntroWords = styled.div`
  margin: 0;
  padding: 15px;
  ${screen.tabletBelow`
    padding: 15px;
    background: ${colors.gray.gray96};
    br {
      display: none;
    }
  `}
`

const Introduction = styled.div`
  p{
    display: inline;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.89;
    text-align: center;
  }
  ${screen.desktopAbove`
    p{
      background-color: ${colors.gray.gray96};
      padding: 5px;
    }
  `}
  ${screen.tabletBelow`
    p{
      display: block;
      line-height: 1.89;
    }
  `}
  ${screen.tablet`
    width: 440px;
    margin-left: auto;
    margin-right: auto;
    p{
      font-size: 18px;
      line-height: 1.6;
    }
  `}
  ${screen.mobile`
    margin-left: 20px;
    margin-right: 20px;
    p{
      font-size: 16px;
      line-height: 1.44;
      letter-spacing: 0.5px;
    }
  `}
`

const Content = styled.div`
  height: 100%;
  float: right;
  text-align: center;
  h2{
    display: inline-block;
    margin-top: 0;
    font-size: 28px;
    font-weight: bold;
    letter-spacing: 6.6px;
  }
  ${screen.desktopAbove`
    width: 390px;
  `}
  ${screen.tabletBelow`
    width: 100%;
    float: none;
  `}
  ${screen.tablet`
    height: 650px;
    h2{
      margin-top: 80px;
      font-size: 20px;
      letter-spacing: 4.7px;
    }
  `}
  ${screen.mobile`
    height: 380px;
    margin-top: 50px;
    h2{
      margin: 0;
      font-size: 20px;
      letter-spacing: 4.7px;
    }
  `}
`

const Caption = styled.div`
  display: inline-block;
  cursor: pointer;
  h2{
    opacity: ${props => props.curCaption === props.index ? '1' : '0.2'};
  }
`

const LottieWrapper = styled.div`
  ${screen.overDesktop`
    margin: 100px 0;
  `}
  ${screen.desktop`
    margin: 50px 0;
  `}
  ${screen.tablet`
    margin: 45px 0;
  `}
  ${screen.mobile`
    margin: 30px 0;
  `}
`

export default class Section1 extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentAnim: 0,
      isBorderTopfixed: false
    }
  }
  _onPositionChange = (prevPos, currPos) => {
    if (prevPos === 'inside' && currPos === 'above') {
      this.setState({ isBorderTopfixed: true })
    } else if (prevPos === 'above' && currPos === 'inside') {
      this.setState({ isBorderTopfixed: false })
    }
  }
  _getIntroWords = (idx) => {
    switch(idx) {
      case 0:
        return (
          <IntroWords>
            <p>走進現場、持續追蹤</p>
            <br />
            <p>讓重要議題不被遺忘</p>
          </IntroWords>
        )
      case 1:
        return (
          <IntroWords>
            <p><b>屬於社會的《報導者》</b></p>
            <br />
            <p>報導CC授權：網站多數報導採創用CC授權</p>
            <br />
            <p>網站程式開源：官網程式碼皆開放於GitHub平台</p>
          </IntroWords>
        )
      case 2:
        return (
          <IntroWords>
            <p><b>追求公益價值</b></p>
            <br />
            <p>沒有廣告：不受廣告主影響</p>
            <br />
            <p>沒有點閱數字：不受點擊率左右</p>
          </IntroWords>
        )
    }
  }
  _animUpdated = (updatedIndex) => {
    this.setState({ currentAnim: updatedIndex })
  }
  _getBorderZIndex = () => {
    return defaultZIndex + 1
  }
  render() {
    const Captions = animCaptions.map((caption, index) => {
      const dot = () => {
        if (index !== animCaptions.length - 1) {
          return (
            <h2>・</h2>
          )
        }
      }
      return (
        <React.Fragment
          key={index}>
          <Caption
            curCaption={this.state.currentAnim}
            index={index}
            onClick={() => this._animUpdated(index)} >
            <h2>{animCaptions[index]}</h2>
          </Caption>
          {dot()}
        </React.Fragment>
      )
    })
    return (
      <Container>
        <Waypoint
          onPositionChange={({ previousPosition, currentPosition }) => this._onPositionChange(previousPosition, currentPosition)}
          fireOnRapidScroll
        />
        <BorderTop
          fixed={this.state.isBorderTopfixed}
          zIndex={this._getBorderZIndex()}
        />
        <SectionWrapper>
          <Title>
            <span>特色</span>
          </Title>
          <Content>
            {Captions}
            <LottieWrapper>
              <LottieAnim
                currentAnimIndex={this.state.currentAnim}
                animDidUpdate={this._animUpdated}
              />
            </LottieWrapper>
            <Introduction>
              {this._getIntroWords(this.state.currentAnim)}
            </Introduction>
          </Content>
        </SectionWrapper>
      </Container>
    )
  }
}
