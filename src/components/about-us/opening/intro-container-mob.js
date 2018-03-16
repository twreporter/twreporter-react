import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { screen } from '../utils/screen'
import quote from '../../../../static/asset/about-us/opening_quote1.png'
import startbutton from '../../../../static/asset/about-us/opening_start.png'

const IntroChinese = '2015年12月《報導者》正式上線，稟持深度、開放、非營利的精神，致力於公共領域調查報導，為讀者持續追蹤各項重要議題，共同打造多元的社會與媒體環境。'
const IntroEng = 'December 2015 "The reporter" is officially on the line, with the depth, open, non-profit spirit, committed to the public domain survey reports, for readers to continue to track the important issues, together to create a diverse social and media environment.'


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

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`

const IntroContainer = ContentContainer.extend`
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

export class MobileIntroContainer extends PureComponent {
  render() {
    return(
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
    )
  }
}

export default MobileIntroContainer
