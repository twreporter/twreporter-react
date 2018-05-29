import { marginBetweenSections } from '../constants/styles'
import { screen } from '../utils/screen'
import LottieAnim from './lottie-animation'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import titleImg from '../../../../static/asset/about-us/title-section1.png'
import titleImgMob from '../../../../static/asset/about-us/title-section1-mob.png'

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;
  border: solid 8px #c71b0c;
  height: 100vh;  
  ${screen.desktopAbove`
    margin: ${marginBetweenSections.desktop} 0;
  `}
  ${screen.overDesktop`
    margin: ${marginBetweenSections.overDesktop} 0;    
  `}
  ${screen.tablet`
    margin: ${marginBetweenSections.tablet} 0;    
  `}  
  ${screen.mobile`
    margin: ${marginBetweenSections.mobile} 0;    
  `}    
`

const SectionWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: block;
  ${screen.desktop`
    width: 1024px;
    height: 547px;
    padding: 0 179px 0 130px;
  `}  
  ${screen.overDesktop`
    width: 1440px;
    height: 586px;
    padding: 0 262px 0 170px;
  `}
  ${screen.tablet`
    width: 432px;
    height: 849px;
  `}
  ${screen.mobile`
    width: 291px;
    height: 571px;
  `}
`

const Title = styled.div`
  background-image: url(${titleImg});
  background-repeat: no-repeat;
  background-size: contain;
  height: 60%;
  float: left;
  border-bottom: solid 27px #a67a44;
  ${screen.desktop`
    width: 193.7px;
    height: 330.3px;
  `}
  ${screen.overDesktop`
    width: 276px;
    height: 475px;
  `}
  ${screen.tabletBelow`
    background-image: url(${titleImgMob});
    background-position: center top;
    float: none;
    margin: 0 auto;
  `}
  ${screen.tablet`
    width: 134px;
    height: 300px;
    border-bottom: solid 18.9px #a67a44;
  `}
  ${screen.mobile`
    width: 84px;
    height: 195px;
    border-bottom: solid 18px #a67a44;
  `}
`

const Introduction = styled.div`
  margin-top: 65px;
  p{
    display: inline;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.89;
    text-align: left;
  }
  ul{
    text-align: left;
    list-style: none;
    margin: 0;
    padding-left: 1em;
  }
  ul>li:before {
    display: inline-block;
    content: "-";
    margin-left: -1em;
  }
  ul>p:first-child{
    margin-left: -1em;
  }
  ${screen.desktopAbove`
    p{
      background-color: #f6f6f6;
      padding: 5px;
    }  
    ul>li:before {
      background-color: #f6f6f6;
      padding: 5px 0 5px 10px;
    }
  `}
  ${screen.tabletBelow`
    ul{
      background: #f6f6f6;
    }
    ul>li:before {
      width: 0.5em;    
    } 
  `}
  ${screen.tablet`
    font-size: 18px;
    font-weight: 500;
    line-height: 1.67;
    text-align: left;
  `}
  ${screen.mobile`
    margin: 0 20px;
    p{
      font-size: 16px;
      line-height: 1.44;
      letter-spacing: 0.5px;
      text-align: left;
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
    margin-bottom: 90px;
    font-size: 28px;
    font-weight: bold;
    letter-spacing: 6.6px;
  }
  ${screen.desktopAbove`
    width: 384px;
  `}
  ${screen.tabletBelow`
    width: 100%;
    float: none;
  `}
  ${screen.tablet`
    height: calc(100% - 134px);
    h2{
      margin-top: 80px;
      margin-bottom: 45px;
      font-size: 20px;
      letter-spacing: 4.7px;
    }  
  `}  
  ${screen.mobile`
    height: calc(100% - 195px);
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
  h2{
    opacity: ${props => props.curCaption === props.index ? '1' : '0.2'};
  }
`

export default class Section1 extends PureComponent {
  constructor(props) {
    super(props)
    this.animCaptions = [ '深度', '開放', '非營利' ]
    this.state = {
      currentAnim: 0
    }
  }
  _animUpdated = (updatedIndex) => {
    this.setState({ currentAnim: updatedIndex })
  }
  render() {
    const Captions = this.animCaptions.map((caption, index) => {
      const dot = () => {
        if (index !== this.animCaptions.length - 1) {
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
            index={index}>
            <h2>{this.animCaptions[index]}</h2>
          </Caption>
          {dot()}
        </React.Fragment>
      )
    })
    return (
      <Container>
        <SectionWrapper>
          <Title />
          <Content>
            {Captions}
            <LottieAnim 
              animDidUpdate={this._animUpdated}
            />
            <Introduction>
              <ul>
                <p>屬於社會的《報導者》</p>
                <li><p>CC授權（ 姓名標示／非商業性／禁止改作</p></li>
                <li><p>OPEN SOURCE開放原始碼</p></li>
                <li><p>全民政策追蹤： 蔡英文勞動政策追蹤平台</p></li>
              </ul>
            </Introduction>    
          </Content>
        </SectionWrapper>
      </Container>
    )
  }
}
