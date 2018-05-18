import { colors } from '../constants/styles'
import { screen } from '../utils/screen'
import Background from './background'
import CoverTitle from './cover-title'
import Header from './header'
import MobileIntroContainer from './intro-container-mob'
import React, { PureComponent } from 'react'
import smoothScroll from 'smoothscroll'
import startbutton from '../../../../static/asset/about-us/opening_start.png'
import styled from 'styled-components'

const containerWidth = {
  mobile: '100%',
  tablet: '719px',
  desktop: '1024px',
  overDesktop: '1440px'
}

const HeaderContainer = styled.div`
  width: ${containerWidth.mobile};
  background-color: transparent;
  position: absolute;
  top: 0;  
  z-index: 2;
`

const Container = styled.div`
  position: relative;
  overflow: hidden;
  background-color: ${colors.white};
  width: ${containerWidth.mobile};
  margin: 0 auto;
  ${screen.mobile`
    align-items: center;
  `}
  ${screen.desktop`
    width: ${containerWidth.desktop};
  `}
  ${screen.overDesktop`
    width: ${containerWidth.overDesktop};
  `}  
`

const Cover = Container.extend`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  padding: 80px;
  ${screen.tablet`
    display: block;
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
  cursor: pointer;
  ${screen.tabletBelow`
    position: relative;
    left: auto;
    bottom: auto;
    transform: none;
    margin-top: 50px;
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
        <Cover innerRef={(ele) => {this._cover = ele}}>
          <Background />
          <CoverTitle startbtn={DesktopStart} />
          <MobileIntroContainer startbtn={Start}/>
        </Cover>
      </React.Fragment>
    )
  }
}

export default Opening
