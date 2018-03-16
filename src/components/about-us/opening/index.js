import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { screen } from '../utils/screen'
import Background from './background'
import Header from './header'
import CoverTitle from './cover-title'
import MobileIntroContainer from './intro-container-mob'
import sz from '../constants/screen-size'
import startbutton from '../../../../static/asset/about-us/opening_start.png'
import smoothScroll from 'smoothscroll'

const HeaderContainer = styled.div`
  width: 100%;
  background-color: transparent;
  position: absolute;
  top: 0;  
  z-index: 2;
`

const ContainerWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;  
  ${screen.desktopAbove`
    width: ${sz.largeScreenMinWidth}px;
  `}
  ${screen.overDesktop`
    width: ${sz.xLargeScreenMinWidth}px;
  `}
`

const CoverWrapper = ContainerWrapper.extend`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  padding: 80px;
  ${screen.tablet`
    display: block;
    height: 100vh;
    padding: 0;
  `}
  ${screen.mobile`
    display: block;
    height: 200vh;
    padding: 0;
  `}
`

const Startbutton = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  ${screen.tabletBelow`
    position: relative;
    left: auto;
    bottom: auto;
    transform: none;
    margin-top: 20px;
  `}  
`

const DesktopStartbutton = Startbutton.extend`
  ${screen.tabletBelow`
    display: none;
  `}     
`

export class Opening extends PureComponent {
  constructor(props) {
    super(props)
    this._handleClick = this._handleClick.bind(this)
  }
  
  _handleClick(event) {
    event.preventDefault()
    if (typeof window === 'undefined') return
    const coverBottom = this._cover.scrollHeight
    return smoothScroll(coverBottom)
  }
    
  render() {
    const Start = <Startbutton onClick={this._handleClick}><img src={startbutton} /></Startbutton>
    const DesktopStart = <DesktopStartbutton onClick={this._handleClick}><img src={startbutton} /></DesktopStartbutton>
    return (
      <React.Fragment>
        <HeaderContainer>
          <Header
            isIndex
          />
        </HeaderContainer>
        <CoverWrapper innerRef={(ele) => {this._cover = ele}}>
          <Background />
          <CoverTitle startbtn={DesktopStart} />
          <MobileIntroContainer startbtn={Start}/>
        </CoverWrapper>
      </React.Fragment>
    )
  }
}

export default Opening
