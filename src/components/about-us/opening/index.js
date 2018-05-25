import { colors, font } from '../constants/styles'
import { containerStyle, contentStyle } from './styles'
import { screen } from '../utils/screen'
import aboutusImg from '../../../../static/asset/about-us/aboutus-opening.png'
import Header from './header'
import React, { PureComponent } from 'react'
import smoothScroll from 'smoothscroll'
import styled from 'styled-components'
import titleImg from '../../../../static/asset/about-us/title-opening.png'

const Container = styled.div `
  position: relative;
  height: 100vh;
  overflow-x: hidden;
`

const Footer = styled.div `
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: #c71b0c;  
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
`

const Content = styled.div`
  ${screen.mobile`
    display: block;
    padding: 0;
  `}
  ${screen.tablet`
    display: block;
    padding: 0;
  `}
  ${screen.desktopAbove`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
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
  ${screen.desktopAbove`
    width: 100%;
    h2 {
      font-family: ${font.family.english.roboto};
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(-100%) rotate(90deg);
      transform-origin: bottom left;
      margin: 0;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 11.9px;
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
  `}
`

const Title = styled.div`
  display: block;
  float: left;
  background-image: url(${titleImg});
  background-repeat: no-repeat;
  background-size: contain;
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
  float: right;
  text-align: right;
  p{
    display: inline-block;
    font-weight: bold;
    text-align: right;
    background-color: #f1f1f1;
    box-shadow: -10px 0 0 #f1f1f1;
  }
  span{
    background-color: ${colors.white};    
  }
  ${screen.desktopAbove`
    position: absolute;
    right: 0;
    bottom: 0;
  `}
  ${screen.desktop`
    width: 468px;
    p{
      font-size: 16px;
      line-height: 2;
      letter-spacing: 0.3px;
    }
  `}    
  ${screen.overDesktop`
    width: 628px;
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
    font-family: ${font.family.english.roboto};
    display: inline;
    font-weight: bold;
    letter-spacing: 0.3px;
    position:relative;
    line-height:1;
    display:inline;
    white-space:pre-wrap;
  }
  p > span{
    position:relative;
    z-index:1;
    background: #d8d8d8;
    box-shadow: -10px 0 0 #d8d8d8;
    padding: 5px 0;
    mark{
      background: #f1f1f1;
    }
  }
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
            <Title />
            <AboutUS>
              <h2>ABOUT US</h2>
              <img src={aboutusImg} />
              <SeperateLine>
                <h3>・・・</h3>
              </SeperateLine>
              <Words>
                <p>2015年12月《報導者》正式上線，稟持<span>深度</span>、<span>開放</span>、<span>非</span></p>
                <p><span>營利</span>的精神，致力於公共領域<span>調查報導</span>，為讀者持續追</p>
                <p>蹤各項重要議題，共同打造<span>多元的社會</span>與媒體環境。</p>
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
