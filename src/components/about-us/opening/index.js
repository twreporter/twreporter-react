import colors from '../../../constants/colors'
import { containerStyle, contentStyle, headerStyle } from './section-style'
import { font } from '../constants/styles'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import mq, { screen } from '../utils/media-query'
import { storageUrlPrefix } from '../utils/config'
import AnchorsPanel from './anchors-panel'
import CSSTransition from 'react-transition-group/CSSTransition'
import Header from './header'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import smoothScroll from 'smoothscroll'
import styled, { css } from 'styled-components'

const transitionDuration = 200

const reactTransitionCSS = css`
  ${mq.mobileOnly`
    .effect-enter {
      opacity: 0;
    }
    .effect-enter-active {
      opacity: 1;
      transition: opacity ${transitionDuration}ms ease-in;
    }
    .effect-exit {
      opacity: 1;
    }
    .effect-exit-active {
      opacity: 0;
      transition: opacity ${transitionDuration}ms ease-out;
    }
  `}
  ${mq.tabletOnly`
    .effect-enter {
      transform: translateX(100%);
    }
    .effect-enter-active {
      transform: translateX(0);
      transition: transform ${transitionDuration}ms ease-in;
    }
    .effect-exit {
      transform: translateX(0);
    }
    .effect-exit-active {
      transform: translateX(100%);
      transition: transform ${transitionDuration}ms ease-out;
    }
  `}
`

const Container = styled.section`
  position: relative;
  overflow: hidden;
  height: 100vh;
  background: ${colors.white};
  ${mq.hdOnly`
    margin: 0 -8px;
  `}
  ${mq.desktopOnly`
    margin: 0 -6px;
  `}
  ${mq.tabletAndBelow`
    overflow: auto;
    height: auto;
  `}
  ${mq.tabletOnly`
    margin: 0 -7px;
  `}
  ${mq.mobileOnly`
    margin: 0 -6px;
  `}
  ${reactTransitionCSS}
`
const Footer = styled.div`
  position: absolute;
  display: block;
  left: 0;
  bottom: 0;
  width: 100%;
  background: ${colors.red.liverRed};
  ${mq.mobileOnly`
    height: 54px;
  `}
  ${mq.tabletOnly`
    height: 100px;
  `}
  ${mq.tabletAndBelow`
    position: relative;
  `}
  ${mq.desktopOnly`
    height: 75px;
  `}
  ${mq.hdOnly`
    height: 103px;
  `}
`

const Navigator = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50%;
  height: 50%;
  border-right: solid 0.5px ${colors.white};
  p{
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(50%) translateY(-150%);
    font-size: 13px;
    font-weight: bold;
    line-height: 1.54;
    letter-spacing: 1.4px;
    color: ${colors.white};
    cursor: pointer;
  }
  ${mq.mobileOnly`
    p{
      transform: translateX(50%) translateY(-100%);
    }
  `}
`

const Content = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  ${mq.mobileOnly`
    width: ${containerStyle.width.mobile};
    height: ${contentStyle.height.mobile};
    padding: ${contentStyle.padding.mobile};
    margin-top: calc(${headerStyle.height.mobile} + 20px);
  `}
  ${mq.tabletOnly`
    margin: calc(${headerStyle.height.tablet} + 20px) auto calc(${headerStyle.height.tablet} + 20px) auto;
    width: ${containerStyle.width.tablet};
    height: ${contentStyle.height.tablet};
    padding: ${contentStyle.padding.tablet};
  `}
  ${mq.tabletAndBelow`
    position: relative;
    top: 0;
    left: 0;
    transform: none;
  `}
  ${mq.desktopOnly`
    width: ${containerStyle.width.desktop};
    height: ${contentStyle.height.desktop};
    padding: ${contentStyle.padding.desktop};
  `}
  ${mq.hdOnly`
    width: ${containerStyle.width.overDesktop};
    height: ${contentStyle.height.overDesktop};
    padding: ${contentStyle.padding.overDesktop};
  `}
`

const ChineseIntro = styled.div`
  position: relative;
  text-align: center;
  display: block;
  width: 100%;
  h2 {
    font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};
    margin: 0;
    font-weight: bold;
    position: absolute;
    top: 0;
    transform: translateY(-100%) rotate(90deg);
    transform-origin: bottom left;
  }
  ${mq.desktopAndAbove`
    h2{
      left: 0;
    }
  `}
  ${mq.tabletAndBelow`
    h2{
      right: 0;
    }
  `}
  ${mq.mobileOnly`
    h2{
      font-size: 13px;
      letter-spacing: 5.5px;
      transform: translateY(-100%) translateX(40%) rotate(90deg);
    }
  `}
  ${mq.tabletOnly`
    height: 582px;
    h2{
      font-size: 19px;
      letter-spacing: 8.1px;
      transform: translateY(-100%) translateX(30%) rotate(90deg);
    }
  `}
  ${mq.desktopOnly`
    height: 230px;
    h2{
      font-size: 19px;
      letter-spacing: 8.1px;
    }
  `}
  ${mq.hdOnly`
    height: 322px;
    h2{
      font-size: 28px;
      letter-spacing: 11.9px;
    }
  `}
`

const Title = styled.h1`
  display: block;
  float: left;
  background-image: url(${replaceGCSUrlOrigin(`${storageUrlPrefix}/title-opening.png`)});
  background-repeat: no-repeat;
  background-size: contain;
  margin: 0;
  span{
    display: none;
  }
  ${mq.tabletAndBelow`
  `}
  ${mq.mobileOnly`
    background-image: url(${replaceGCSUrlOrigin(`${storageUrlPrefix}/title-opening-mob.png`)});
    background-position: center center;
    width: 100%;
    height: 114px;
  `}
  ${mq.tabletOnly`
    position: absolute;
    left: 0;
    top: 0;
    width: 342.2px;
    height: 307px;
  `}
  ${mq.desktopOnly`
    width: 253.8px;
    height: 230px;
  `}
  ${mq.hdOnly`
    margin-left: 75px;
    width: 497px;
    height: 322px;
  `}
`

const AboutUS = styled.div`
  position: relative;
  display: block;
  float: right;
  width: 100%;
  ${mq.mobileOnly`
    h2{
      display: none;
    }
    img{
      width: 100%;
    }
  `}
  ${mq.tabletOnly`
    height: 307px;
    img {
      float: right;
      height: 100%;
    }
  `}
  ${mq.desktopOnly`
    width: 468px;
    height: 230px;
    img{
      float: right;
      width: 392px;
    }
  `}
  ${mq.hdOnly`
    width: 628px;
    height: 322px;
    img{
      float: right;
      width: 538px;
    }
  `}
`

const SeperateLine = styled.div`
  display: block;
  width: 100%;
  float: right;
  h3{
    margin: 0;
  }
  ${mq.mobileOnly`
    margin: 0;
    transfrom: translateY(-50%);
    h3{
      text-align: center;
    }
  `}
  ${mq.tabletOnly`
    h3{
      text-align: left;
    }
    margin: 80px 0 55px 0;
  `}
  ${mq.desktopOnly`
    width: 392px;
    margin: 24px 0 26px 0;
  `}
  ${mq.hdOnly`
    width: 538px;
    margin: 39.2px 0 50px 0;
  `}
`

const SeperateLineOnMobile = styled(SeperateLine)`
  ${mq.tabletAndAbove`
    display: none;
  `}
  h3{
    margin: 52px 0;
  }
`

const SeperateLineOnTabletAbove = styled(SeperateLine) `
  ${mq.mobileOnly`
    display: none;
  `}
`

const Words = styled.div`
  display: block;
  p{
    font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};
    display: inline;
    font-weight: bold;
    letter-spacing: 0.3px;
    display: inline;
    white-space: pre-wrap;
  }
  p>span{
    background: ${colors.gray.lightGray};
    box-shadow: -10px 0 0 ${colors.gray.lightGray};
    padding: 5px 0;
    mark{
      background: ${colors.white};
    }
  }
  ${mq.tabletAndBelow`
    position: relative;
    float: left;
    text-align: left;
    p > span{
      background: ${colors.white};;
      box-shadow: none;
      mark{
        background: ${colors.white};
      }
    }
  `}
  ${mq.desktopAndAbove`
    position: absolute;
    right: 0;
    bottom: 0;
    text-align: right;
    float: right;
  `}
  ${mq.mobileOnly`
    width: 100%;
    margin-top: 24px;
    p{
      font-size: 14px;
      line-height: 0.79;
      letter-spacing: 0.3px;
    }
  `}
  ${mq.tabletOnly`
    width: 525px;
    p{
      font-size: 18px;
      line-height: 1.78;
      letter-spacing: 0.4px;
    }
  `}
  ${mq.desktopOnly`
    width: 404px;
    p{
      font-size: 16px;
      line-height: 2;
      letter-spacing: 0.3px;
    }
  `}
  ${mq.hdOnly`
    width: 481px;
    p{
      font-size: 19px;
      line-height: 2.32;
      letter-spacing: 0.4px;
    }
  `}
`

const EnglishIntro = styled.div`
  position: relative;
  display: block;
  text-align: right;
  p{
    font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};
    display: inline;
    font-weight: bold;
    letter-spacing: 0.3px;
    display: inline;
    white-space:pre-wrap;
  }
  p > span{
    background: #d8d8d8;
    box-shadow: -10px 0 0 #d8d8d8;
    padding: 5px 0;
    mark{
      background: ${colors.gray.lightGray};
    }
  }
  ${mq.tabletAndBelow`
    text-align: left;
    p > span{
      background: ${colors.white};
      box-shadow: none;
      mark{
        background: ${colors.white};
      }
    }
  `}
  ${mq.mobileOnly`
    display: none;
    width: 248px;
    p{
      line-height: 0.79;
      font-size: 13px;
      letter-spacing: 0.2px;
      padding: 0;
    }
  `}
  ${mq.tabletOnly`
    width: 525px;
    p{
      font-size: 18px;
      line-height: 1.44;
      letter-spacing: 0.3px;
    }
  `}
  ${mq.desktopOnly`
    float: right;
    width: 468px;
    margin-top: 27px;
    p{
      font-size: 15px;
      line-height: 26px;
    }
  `}
  ${mq.hdOnly`
    float: right;
    width: 628px;
    margin-top: 40px;
    p{
      font-size: 18px;
      line-height: 2.06;
    }
  `}
`

export class Opening extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isAnchorPanelOpen: false
    }
  }

  _handleClick = (event) => {
    event.preventDefault()
    const coverBottom = this._cover.scrollHeight
    return smoothScroll(coverBottom)
  }
  _closeAnchorPanel = () => {
    this.setState({
      isAnchorPanelOpen: false
    })
  }
  _openAnchorPanel = () => {
    this.setState({
      isAnchorPanelOpen: true
    })
  }
  _closePanelAndScrollToAnchor = (idx) => {
    this._closeAnchorPanel()
    setTimeout(() => this.props.handleClickAnchor(idx), transitionDuration + 100)
  }
  render() {
    const { isAnchorPanelOpen } = this.state
    return (
      <Container ref={(ele) => {this._cover = ele}}>
        <CSSTransition
          in={isAnchorPanelOpen}
          classNames="effect"
          timeout={transitionDuration}
          mountOnEnter
          unmountOnExit
        >
          <AnchorsPanel
            ref={(anchorsPanel) => this.anchorsPanel = anchorsPanel}
            handleClickAnchor={(idx) => this._closePanelAndScrollToAnchor(idx)}
            isOpen={isAnchorPanelOpen}
            closePanel={this._closeAnchorPanel}
          />
        </CSSTransition>
        <Header
          onHamburgerClick={isAnchorPanelOpen ? this._closeAnchorPanel : this._openAnchorPanel}
          isPanelOpen={isAnchorPanelOpen}
        />
        <Content>
          <ChineseIntro>
            <Title>
              <span>關於我們</span>
              <span>ABOUT US</span>
            </Title>
            <AboutUS>
              <h2>ABOUT US</h2>
              <SeperateLineOnMobile>
                <h3>・・・</h3>
              </SeperateLineOnMobile>
              <picture>
                <source media={`(min-width: ${screen.tablet.minWidth}px) and (max-width: ${screen.desktop.minWidth - 1}px)`} srcSet={`${storageUrlPrefix}/aboutus-opening-tablet.png`} />
                <source media={`(max-width: ${screen.tablet.minWidth - 1}px)`} srcSet={`${storageUrlPrefix}/aboutus-opening-mob.png`} />
                <img src={`${replaceGCSUrlOrigin(`${storageUrlPrefix}/aboutus-opening.png`)}`} alt={'關於我們'}/>
              </picture>
              <SeperateLineOnTabletAbove>
                <h3>・・・</h3>
              </SeperateLineOnTabletAbove>
              <Words>
                <p><span>《報導者》是台灣第一個由公益基金會成立的網路媒體。秉持<mark>深度</mark>、<mark>開放</mark>、<mark>非營利</mark>的精神，致力於公共領域<mark>調查報導</mark>，共同打造<mark>多元進步的社會</mark>與媒體環境。</span></p>
              </Words>
            </AboutUS>
          </ChineseIntro>
          <EnglishIntro>
            <p><span>The Reporter is a <mark>non-profit</mark> media organization founded by The Reporter Cultural Foundation. We focus on <mark>in-depth</mark> reportage and <mark>investigative journalism</mark>, publishing our works on an <mark>open-source</mark> website. We are dedicated to probing issues at stake, and to building <mark>diverse modern society</mark> and media environment as a whole.</span></p>
          </EnglishIntro>
        </Content>
        <Footer>
          <Navigator>
            <p onClick={this._handleClick}>探索</p>
          </Navigator>
        </Footer>
      </Container>
    )
  }
}

export default Opening

Opening.contextTypes = {
  lockBackgroundScrolling: PropTypes.func,
  unlockBackgroundScrolling: PropTypes.func
}

