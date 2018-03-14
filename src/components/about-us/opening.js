import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { screen } from './utils/screen'
// import { ImgWrapper } from './utils/img-wrapper'
import sz from './constants/screen-size'
import Header from './header'
import aboutusTitle from '../../../static/asset/about-us/opening_title_desktopHD.png'
import aboutusTitleMobile from '../../../static/asset/about-us/opening_title_mobile.png'
import startbutton from '../../../static/asset/about-us/opening_start.png'
import openingthereporter from '../../../static/asset/about-us/opening_thereporter_desktopHD.png'
import billboard from '../../../static/asset/about-us/billboard.png'
import quote from '../../../static/asset/about-us/opening_quote1.png'
// import { start } from 'pretty-error'

const IntroChinese = '2015年12月《報導者》正式上線，稟持深度、開放、非營利的精神，致力於公共領域調查報導，為讀者持續追蹤各項重要議題，共同打造多元的社會與媒體環境。'
const IntroEng = 'December 2015 "The reporter" is officially on the line, with the depth, open, non-profit spirit, committed to the public domain survey reports, for readers to continue to track the important issues, together to create a diverse social and media environment.'

const HeaderContainer = styled.div`
  width: 100%;
  background-color: transparent;
  ${(props) => {
    if (props.ifPinned) {
      return `
        position: absolute;
        bottom: 0;
      `
    }
    return `
      position: fixed;
      top: 0;
    `
  }};
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

const OnlyDisplayOnDesktop = styled.div`
  ${screen.tabletBelow`
    display: none;
  `}  
`

const OnlyDisplayOnMobile = styled.div`
  ${screen.desktopAbove`
    display: none;
  `}  
`

const DesktopTriangles = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
`

const MobileTriangles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
`

const Triangle = styled.div`
  width: 653px;
  height: 112px;
  border-top: solid 80px #c7000a;
  border-left: solid calc(653px*3/8) transparent;
  border-right: solid calc(653px*5/8) transparent;
  &:before,&:after{
    box-sizing: border-box;
  }  
`

const TriangleRightTop = Triangle.extend`
  position: absolute;
  right: 0;
  top: 0;
`

const TriangleRightBottom = Triangle.extend`
  position: absolute;
  right: 0;
  bottom: 0;
  transform: rotateX(180deg);  
`
// Need refactor
const MobileTriangle = styled.div`
  width: 43px;
  height: 276px;
  border-left: solid 43px #c7000a;
  border-top: solid calc(276px*3/8) transparent;
  border-bottom: solid calc(276px*5/8) transparent;
  &:before,&:after{
    box-sizing: border-box;
  }  
`
const TriangleRight = MobileTriangle.extend`
  position: absolute;
  right: 0;
  top: calc(50% + 276px*1/8);
  transform: translateY(-50%) rotateY(180deg);
`

const TriangleLeft = MobileTriangle.extend`
  position: absolute;
  left: 0;
  top: calc(50% + 276px*1/8);
  transform: translateY(-50%);
`

const Divider = styled.div`
  position: absolute;
  right: 0;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-left: solid 1px #c7000a;
  width: calc(653px*5/8);
  ${screen.tabletBelow`
    top: 0;
    width: 100%;
    height: 50%;
    border-left: none;
    border-bottom: solid 1px #c7000a;
  `}  
`

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`

const TitleContainer = ContentContainer.extend`
  align-items: flex-start;
  height: 75vh;
  ${screen.tablet`
    align-items: center;
    height: 50vh;
  `}      
  ${screen.mobile`
    align-items: center;
    height: 100vh;
  `}    
`

const IntroContainer = ContentContainer.extend`
  height: 100vh;
  align-items: center;
  ${screen.tablet`
    align-items: center;
    height: 50vh;
  `}      
`

const Title = styled.div`
  img{
    width: 100%;
    height: auto;
  }
  ${screen.tablet`
    text-align: center;
    img{
      width: 75%;
    }
  `}
  ${screen.desktopAbove`
    img{ 
      width: 50%; 
    }
  `}

  ${screen.overDesktop`
    img{
      width: 100%;
    }
  `}
`

const Thereporter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  ${screen.tabletBelow`
    display: none;  
  `}

  ${screen.desktopAbove`
    img{ 
      width: 50%; 
    }
  `}

  ${screen.overDesktop`
    img{ 
      width: 100%;
    }
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

const Billboard = styled.div`
  position: absolute;
  display: flex;
  jusify-content: center;
  align-items: center;
  right: 0;
  margin: 10% 5%;
  img{
    width: 100%;
  }
`

const Textblock = styled.div`
  position: absolute;
  padding: 25px 40px 25px 25px;
  word-wrap: break-word;
  p{
    font-size: 11px;
    color: #c7000a;
  }
  ${screen.tabletBelow`
    position: relative;
    padding: 25px;
    p{
      font-size: 16px;
    }
  `}
`
const Quote = styled.div`
  width: 25px;
  img{
    width: 100%;
  }
`
const EndQuote = Quote.extend`
  img{
    transform: rotateY(180deg);
  }
`

export class Opening extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ifPinned: false
    }
  }
  
  render() {    
    return (
      <React.Fragment>
        <HeaderContainer ifPinned={this.state.ifPinned}>
          <Header 
            isIndex
          />
        </HeaderContainer>
        <CoverWrapper>
          <OnlyDisplayOnDesktop>
            <DesktopTriangles>
              <TriangleRightTop />
              <TriangleRightBottom />
              <Divider>
                <Billboard>
                  <img src={billboard} />
                  <Textblock>
                    <p>{IntroChinese}</p>
                    <br />
                    <p>{IntroEng}</p>
                  </Textblock>
                </Billboard>                     
              </Divider>
            </DesktopTriangles>
          </OnlyDisplayOnDesktop>
          <OnlyDisplayOnMobile>
            <MobileTriangles>
              <TriangleLeft />
              <TriangleRight />
              <Divider />
            </MobileTriangles>
          </OnlyDisplayOnMobile>
          <TitleContainer>
            <Title>
              <picture>
                <source media="(max-width: 1023px)" srcSet={aboutusTitleMobile} />
                <img src={aboutusTitle} alt="關於我們" />
              </picture>
            </Title>
            <Thereporter>
              <img src={openingthereporter} />
            </Thereporter>
            <OnlyDisplayOnDesktop>
              <Startbutton>
                <img src={startbutton} />
              </Startbutton>            
            </OnlyDisplayOnDesktop>
          </TitleContainer>
          <OnlyDisplayOnMobile>
            <IntroContainer>
              <Quote>
                <img src={quote} />                
              </Quote>
              <Textblock>
                <p>{IntroChinese}</p>
                <br />
                <p>{IntroEng}</p>
              </Textblock>              
              <EndQuote>
                <img src={quote} />
              </EndQuote>       
              <Startbutton>
                <img src={startbutton} />
              </Startbutton>     
            </IntroContainer>
          </OnlyDisplayOnMobile>
        </CoverWrapper>
      </React.Fragment>
    )
  }  
}

export default Opening
