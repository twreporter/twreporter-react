import { colors } from '../../../themes/common-variables'
import { containerStyle, contentStyle } from './section-style'
import { font } from '../constants/styles'
import { screen } from '../utils/screen'
import aboutusImg from '../../../../static/asset/about-us/aboutus-opening.png'
import aboutusImgMobile from '../../../../static/asset/about-us/aboutus-opening-tablet.png'
import Header from './header'
import React, { PureComponent } from 'react'
import smoothScroll from 'smoothscroll'
import styled from 'styled-components'
import sz from '../constants/screen-size'
import titleImg from '../../../../static/asset/about-us/title-opening.png'

const Container = styled.section`
  position: relative;
  overflow-x: hidden;
  height: 100vh;
`

const Footer = styled.div`
  position: absolute;
  display: block;
  left: 0;
  bottom: 0;
  width: 100%;
  background: ${colors.red.liverRed}; 
  ${screen.mobile`
    height: 44px;
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
    width: ${containerStyle.width.mobile};
    height: ${contentStyle.height.mobile};
    padding: ${contentStyle.padding.mobile};
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
    height: 335px;
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
  background-image: url(${titleImg});
  background-repeat: no-repeat;
  background-size: contain;
  span{
    display: none;
  }
  ${screen.tabletBelow`
    position: absolute;
    left: 0;
    top: 0;  
  `}
  ${screen.mobile`
    width: 170.2px;
    height: 153px;
  `}
  ${screen.tablet`
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
  ${screen.tabletBelow`
    img{
      float: right;
      height: 100%;
    }  
  `}
  ${screen.mobile`
    height: 177px;
  `}
  ${screen.tablet`
    height: 307px;
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
  ${screen.tabletBelow`
    h3{
      text-align: left;
    }
    margin: 80px 0 55px 0;
  `}
  ${screen.mobile`
    margin: 0;
    transfrom: translateY(-50%);
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
    width: 248px;
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
    this._handleClick = this._handleClick.bind(this)
  }
  
  _handleClick(event) {
    event.preventDefault()
    const coverBottom = this._cover.scrollHeight
    return smoothScroll(coverBottom)
  }
    
  render() {
    return (
      <Container innerRef={(ele) => {this._cover = ele}}>
        <Header />
        <Content>
          <ChineseIntro>          
            <Title>
              <span>關於我們</span>
              <span>ABOUT US</span>
            </Title>
            <AboutUS>
              <h2>ABOUT US</h2>
              <picture>
                <source media={`(max-width: ${sz.mediumScreenMaxWidth}px)`} srcSet={aboutusImgMobile} />
                <img src={aboutusImg} />
              </picture>
              <SeperateLine>
                <h3>・・・</h3>
              </SeperateLine>
              <Words>
                <p><span>2015年12月《報導者》正式上線，稟持<mark>深度</mark>、<mark>開放</mark>、<mark>非營利</mark>的精神，致力於公共領域<mark>調查報導</mark>，為讀者持續追蹤各項重要議題，共同打造<mark>多元的社會</mark>與媒體環境。</span></p>
              </Words>
            </AboutUS>
          </ChineseIntro>
          <EnglishIntro>
            <p><span>December 2015 "The reporter" is officially on the line, with the <mark>depth</mark>, <mark>open</mark>, <mark>non-profit spirit</mark>, committed to the public domain <mark>survey reports</mark>, for readers to continue to track the importantissues, together to create a <mark>diverse social</mark> and media environment.</span></p>
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
