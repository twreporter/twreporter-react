import { intro } from '../constants/data/introduction'
import { screen } from '../utils/screen'
import PropTypes from 'prop-types'
import quote from '../../../../static/asset/about-us/opening_quote1.png'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

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
  ${screen.tablet`
    align-self: flex-start;
  `}      
`
const EndQuote = Quote.extend`
  img{
    transform: rotateY(180deg);
  }
  ${screen.tablet`
    align-self: flex-end;
  `}      
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
    width: 548px;
    margin: 0 auto;
    align-items: center;
    height: 50vh;
  `}      
`

export class MobileIntroContainer extends PureComponent {
  render() {
    const { startbtn } = this.props
    return(
      <IntroContainer>
        <Quote>
          <img src={quote} />
        </Quote>
        <Textblock>
          <p>{intro.chinese}</p>
          <br />
          <p>{intro.english}</p>
        </Textblock>
        <EndQuote>
          <img src={quote} />
        </EndQuote>
        {startbtn}
      </IntroContainer>
    )
  }
}

MobileIntroContainer.defaultProps = {
  startbtn: {}
}

MobileIntroContainer.propTypes = {
  startbtn: PropTypes.object.isRequired
}

export default MobileIntroContainer
