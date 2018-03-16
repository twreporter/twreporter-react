import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { screen } from '../utils/screen'
import Background from './background'
import Header from './header'
import CoverTitle from './cover-title'
import sz from '../constants/screen-size'

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

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`

const MobileIntroContainer = ContentContainer.extend`
  height: 100vh;
  align-items: center;
  ${screen.desktopAbove`
    display: none;
  `}  
  ${screen.tablet`
    align-items: center;
    height: 50vh;
  `}      
`

export class Opening extends PureComponent {

  render() {
    return (
      <React.Fragment>
        <HeaderContainer>
          <Header
            isIndex
          />
        </HeaderContainer>
        <CoverWrapper>
          <Background />
          <CoverTitle />
          <MobileIntroContainer />
        </CoverWrapper>
      </React.Fragment>
    )
  }
}

export default Opening
