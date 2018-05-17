import { marginBetweenSections } from '../constants/styles'
import { screen } from '../utils/screen'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import LottieAnim from './lottie-animation.js'
import titleImg from '../../../../static/asset/about-us/title-section1.png'

const containerWidth = {
  mobile: '100%',
  tablet: '719px',
  desktop: '1024px',
  overDesktop: '1440px'
}

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;  
  ${screen.desktopAbove`
    width: ${containerWidth.desktop};
    margin: ${marginBetweenSections.desktop} auto;
  `}
  ${screen.overDesktop`
    width: ${containerWidth.overDesktop};
    margin: ${marginBetweenSections.overDesktop} auto;    
  `}
  ${screen.tablet`
    width: ${containerWidth.tablet};
    margin: ${marginBetweenSections.tablet} auto;    
  `}  
  ${screen.mobile`
    margin: ${marginBetweenSections.mobile} auto;    
  `}    
`

const SectionBlock = styled.div`
  display: block;
  width: 100%;
  height: 820px;
  border: solid 8px #c71b0c;
  padding: 156px 179px 117px 131px;
  ${screen.overDesktop`
    padding: 150px 262px 84px 172px;
  `}
`

const Title = styled.div`
  background-image: url(${titleImg});
  background-repeat: no-repeat;
  background-size: contain;
  width: 283px;
  height: calc(100% - 111px);
  float: left;
  border-bottom: solid 27px #a67a44;
  width: 194px;
  ${screen.overDesktop`
    width: 283px;
  `}
`

const Introduction = styled.div`
  p{
    font-size: 18px;
    font-weight: 500;
    text-align: left;
    line-height: 1.89;
  }
  margin-top: 65px;
`

const Content = styled.div`
  width: 384px;
  ${screen.overDesktop`
    width: 400px;
  `}
  height: 100%;
  float: right;
  /* border: solid 1px green; */
  text-align: center;
  h2{
    display: inline-block;
    margin-top: 0;
    margin-bottom: 107px;
    font-size: 28px;
    font-weight: bold;
    letter-spacing: 6.6px;
  }
`

const Caption = styled.div`
  display: inline-block;
  h2{
    opacity: ${props => props.curCaption === props.index ? '1' : '0.2'};
  }
`

export class Section1 extends PureComponent {
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
        <SectionBlock>
          <Title />
          <Content>
            {Captions}
            <LottieAnim 
              animDidUpdate={this._animUpdated}
            />
            <Introduction>
              <p>屬於社會的《報導者》</p>
              <p>- CC授權（ 姓名標示／非商業性／禁止改作</p>
              <p>- OPEN SOURCE開放原始碼</p>
              <p>- 全民政策追蹤： 蔡英文勞動政策追蹤平台</p>
            </Introduction>    
          </Content>  
        </SectionBlock>
      </Container>
    )
  }
}

export default Section1
