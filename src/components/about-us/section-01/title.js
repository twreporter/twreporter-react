import React from 'react'
import styled from 'styled-components'
import { screen } from '../utils/screen'


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
  .subtitleWrapper{
    display: none;
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
    .subtitleWrapper{
      display: flex;
      width: 80%;      
    }
    .subtitle{
      flex-direction: column;
      transform: translateY(50%);
    }
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

class Icons extends React.PureComponent {
  render() {
    return (
      <TitleWrapper>
        <div className="subtitleWrapper">
          <div className="subtitle">
            <h2>FEATURE</h2>
            <h2>特色</h2>
          </div>
        </div>
        <h1>1</h1>
      </TitleWrapper>
    )
  }
}

export default Icons
