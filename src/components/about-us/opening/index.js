import { colors } from '../../../themes/common-variables'
import { containerStyle, contentStyle, headerStyle } from './section-style'
import { font } from '../constants/styles'
import { replaceStorageUrlPrefix } from '@twreporter/react-components/lib/shared/utils'
import { screen } from '../utils/screen'
import { storageUrlPrefix } from '../utils/config'
import AnchorsPanel from './anchors-panel'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import Header from './header'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import smoothScroll from 'smoothscroll'
import styled from 'styled-components'
import sz from '../constants/screen-size'

const transitionDuration = 200

const StyledCSSTransitionGroup = styled(CSSTransitionGroup)`
  ${screen.mobile`
    .effect-enter {
      opacity: 0;
    }
    .effect-enter.effect-enter-active {
      opacity: 1;
      transition: opacity ${transitionDuration}ms ease-in;
    }
    .effect-leave {
      opacity: 1;
    }
    .effect-leave.effect-leave-active {
      opacity: 0;
      transition: opacity ${transitionDuration}ms ease-out;
    }  
  `}
  ${screen.tablet`
    .effect-enter {
      transform: translateX(100%);
    }
    .effect-enter.effect-enter-active {
      transform: translateX(0);
      transition: transform ${transitionDuration}ms ease-in;
    }
    .effect-leave {
      transform: translateX(0);
    }
    .effect-leave.effect-leave-active {
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
  ${screen.overDesktop`
    margin: 0 -8px;
  `}
  ${screen.desktop`
    margin: 0 -6px;
  `}
  ${screen.tablet`
    margin: 0 -7px;
  `}  
  ${screen.mobile`
    overflow: auto;
    height: auto;
    margin: 0 -6px;
  `}
`
const Footer = styled.div`
  position: absolute;
  display: block;
  left: 0;
  bottom: 0;
  width: 100%;
  background: ${colors.red.liverRed}; 
  ${screen.mobile`
    position: relative;
    height: 54px;
  `} 
  ${screen.tablet`
    height: 100px;
  `}
  ${screen.desktop`
    height: 75px;
  `}
  ${screen.overDesktop`
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
  ${screen.mobile`
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
  ${screen.mobile`
    position: relative;
    top: 0;
    left: 0;
    transform: none;
    width: ${containerStyle.width.mobile};
    height: ${contentStyle.height.mobile};
    padding: ${contentStyle.padding.mobile};
    margin-top: calc(${headerStyle.height.mobile} + 20px); 
  `}
  ${screen.tablet`
    width: ${containerStyle.width.tablet};
    height: ${contentStyle.height.tablet};
    padding: ${contentStyle.padding.tablet};
  `}
  ${screen.desktop`
    width: ${containerStyle.width.desktop};
    height: ${contentStyle.height.desktop};
    padding: ${contentStyle.padding.desktop};
  `}
  ${screen.overDesktop`
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
  ${screen.desktopAbove`
    h2{
      left: 0;
    }
  `}
  ${screen.tabletBelow`
    h2{
      right: 0;
    }
  `}
  ${screen.mobile`
    h2{
      font-size: 13px;
      letter-spacing: 5.5px;
      transform: translateY(-100%) translateX(40%) rotate(90deg);
    }
  `}
  ${screen.tablet`
    height: 582px;
    h2{
      font-size: 19px;
      letter-spacing: 8.1px;
      transform: translateY(-100%) translateX(30%) rotate(90deg);
    }
  `}  
  ${screen.desktop`
    height: 230px;
    h2{
      font-size: 19px;
      letter-spacing: 8.1px;
    }
  `}
  ${screen.overDesktop`
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
  background-image: url(${replaceStorageUrlPrefix(`${storageUrlPrefix}/title-opening.png`)});
  background-repeat: no-repeat;
  background-size: contain;
  margin: 0;
  span{
    display: none;
  }
  ${screen.tabletBelow`
  `}
  ${screen.mobile`
    background-image: url(${replaceStorageUrlPrefix(`${storageUrlPrefix}/title-opening-mob.png`)});
    background-position: center center;
    width: 100%;
    height: 114px;
  `}
  ${screen.tablet`
    position: absolute;
    left: 0;
    top: 0;
    width: 342.2px;
    height: 307px;
  `}
  ${screen.desktop`
    width: 253.8px;
    height: 230px;
  `}
  ${screen.overDesktop`
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
  ${screen.mobile`
    h2{
      display: none;
    }
    img{
      width: 100%;
    }
  `}
  ${screen.tablet`
    height: 307px;
    img {
      float: right;
      height: 100%;
    }
  `}
  ${screen.desktop`
    width: 468px;
    height: 230px;
    img{
      float: right;
      width: 392px;
    }
  `}
  ${screen.overDesktop`
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
  ${screen.mobile`
    margin: 0;
    transfrom: translateY(-50%);
    h3{
      text-align: center;
    }
  `}
  ${screen.tablet`
    h3{
      text-align: left;
    }
    margin: 80px 0 55px 0;  
  `}    
  ${screen.desktop`
    width: 392px;
    margin: 24px 0 26px 0;
  `}    
  ${screen.overDesktop`
    width: 538px;
    margin: 39.2px 0 50px 0;
  `}    
`

const SeperateLineOnMobile = SeperateLine.extend`
  ${screen.tabletAbove`
    display: none;
  `}
  h3{
    margin: 52px 0;
  }
`

const SeperateLineOnTabletAbove = SeperateLine.extend `
  ${screen.mobile`
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
  ${screen.tabletBelow`
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
  ${screen.desktopAbove`
    position: absolute;
    right: 0;
    bottom: 0;
    text-align: right;
    float: right;
  `}
  ${screen.mobile`
    width: 100%;
    margin-top: 24px;
    p{
      font-size: 14px;
      line-height: 0.79;
      letter-spacing: 0.3px;
    }
  `}
  ${screen.tablet`
    width: 525px;
    p{
      font-size: 18px;
      line-height: 1.78;
      letter-spacing: 0.4px;
    } 
  `}
  ${screen.desktop`
    width: 404px;
    p{
      font-size: 16px;
      line-height: 2;
      letter-spacing: 0.3px;
    }
  `}    
  ${screen.overDesktop`
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
  ${screen.tabletBelow`
    text-align: left;
    p > span{
      background: ${colors.white};
      box-shadow: none;
      mark{
        background: ${colors.white};
      } 
    } 
  `}
  ${screen.mobile`
    display: none;
    width: 248px;
    p{
      line-height: 0.79;
      font-size: 13px;
      letter-spacing: 0.2px;
      padding: 0;
    }
  `}
  ${screen.tablet`
    width: 525px;
    p{
      font-size: 18px;
      line-height: 1.44;
      letter-spacing: 0.3px;
    }    
  `}
  ${screen.desktop`
    float: right;
    width: 468px;
    margin-top: 27px;
    p{
      font-size: 15px;
      line-height: 26px;
    }
  `}    
  ${screen.overDesktop`
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
      <Container innerRef={(ele) => {this._cover = ele}}>
        <StyledCSSTransitionGroup
          transitionName={{
            enter: 'effect-enter',
            enterActive: 'effect-enter-active',
            leave: 'effect-leave',
            leaveActive: 'effect-leave-active'
          }}
          transitionEnterTimeout={transitionDuration}
          transitionLeaveTimeout={transitionDuration}
        >
          {
            isAnchorPanelOpen ?
              <AnchorsPanel
                ref={(anchorsPanel) => this.anchorsPanel = anchorsPanel} 
                handleClickAnchor={(idx) => this._closePanelAndScrollToAnchor(idx)}
                isOpen={this.state.isAnchorPanelOpen}
                closePanel={this._closeAnchorPanel}
              /> : null
          }
        </StyledCSSTransitionGroup>
        <Header 
          onHamburgerClick={this.state.isAnchorPanelOpen ? this._closeAnchorPanel : this._openAnchorPanel}
          isPanelOpen={this.state.isAnchorPanelOpen}
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
                <source media={`(min-width: ${sz.mediumScreenMinWidth}px) and (max-width: ${sz.mediumScreenMaxWidth}px)`} srcSet={`${storageUrlPrefix}/aboutus-opening-tablet.png`} />
                <source media={`(max-width: ${sz.mediumScreenMinWidth - 1}px)`} srcSet={`${storageUrlPrefix}/aboutus-opening-mob.png`} />
                <img src={`${replaceStorageUrlPrefix(`${storageUrlPrefix}/aboutus-opening.png`)}`} alt={'關於我們'}/>
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

