import { screen } from '../utils/screen'
import React from 'react'
import styled from 'styled-components'

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  h1{
    font-family: Roboto;
    font-size: 600px;
    margin: 0.2em 0;
  }
  ${screen.tablet`
    h1{
      font-size: 300px;
    }
  `}
  ${screen.mobile`
    position: relative;
    margin: 0 auto;
    height: 60vh;
    h1{
      font-size: 300px;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateX(35%) translateY(-50%);
      margin: 0;
    }
    h2{
      margin: 0;
    }
    h2:nth-child(1){
      letter-spacing: 17px;
    }
  `}  
`

const SubtitleWrapper = styled.div`
  display: none;
  ${screen.mobile`
    display: inline-block;
    width: 80%;          
  `}  
`

const Subtitle = styled.div`
  ${screen.mobile`
    flex-direction: column;
    transform: translateY(50%);
  `}  
`

class Icons extends React.PureComponent {
  render() {
    return (
      <TitleWrapper>
        <SubtitleWrapper>
          <Subtitle>
            <h2>FEATURE</h2>
            <h2>特色</h2>
          </Subtitle>
        </SubtitleWrapper>
        <h1>1</h1>
      </TitleWrapper>
    )
  }
}

export default Icons
