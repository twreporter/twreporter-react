// import { screen } from '../utils/screen'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

export const recordStyle = {
  width: 375 // 335px + 20*2 (marginLeft and marginRight)
}

const words = {
  chinese: '《造假．剝削．血淚漁場——直擊台灣遠洋漁業真相》受「國際調查記者聯盟」（GIJN）重視，並採訪《報導者》與《Tempo》團隊',
  english: 'The Reporter and Tempo magazine\'s "Fraud, Exploitation, Blood and Tears in Far Sea Fishery" was reported by GIJN.'
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: ${recordStyle.width}px;
  height: 100%;
  border: solid 1px black;
  &:first-child {
    width: 435px;
  }
`
const WrapperOverlayMask = styled.div`
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(80% - 13px);
  z-index: 1;
`

const LineWrapper = styled.div`
  width: 100%;
  height: 80%;
  /* background: #a67a44; */
  border-bottom: solid 13px #c7000a;
  z-index: 0;
  ${Container}:first-child & {
    padding-left: 80px;
  }
`

const Info = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: 100%;
  margin: 0 20px;
  border: solid 1px pink;
  ${Container}:first-child & {
    margin-left: 80px;
  }
  &:hover{
    background: pink;
  }
`
const InfoContainer = styled.div`
  flex: 1 1 auto;
  img{
    width: 100%;
  }
  h3,p{
    color: #c7000a;
    white-space: normal;
    word-break: break-all;
  }
  h3{
    font-size: 16px;
    margin-top: 17px;
    margin-bottom: 21px;
  }
  p{
    font-size: 14px;
    margin: 0;
  }
  ${Container}:nth-child(odd) & {
    img{
      display: none;
    }
  }
`

const Month = styled.div`
  position: absolute;
  display: none;
  left: 90px;
  top: 0;
  transform: translateX(-50%);
`

const Date = styled.div`
  position: relative;
  width: 100%;
  height: 20%;
  /* border: solid 1px blue; */
  text-align: center;
  ${Container}:first-child & {
    padding-left: 80px;
    padding-right: 20px;
    ${Month} {
      display: block;
    }
  }  
  h2{
    font-size: 61px;
    color: #c7000a;
    margin: 0;
  }
  h3{
    font-size: 20px;
    color: #c7000a;
    margin: 0;
    transform: translateX(50%) rotate(-90deg);    
  }
  p{
    font-size: 20px;
    font-weight: 500;
    color: #c7000a;
  }
`

const PoleBody = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 50%;
  height: 100%;
  border-right: solid 1px #c7000a;
`

const PoleHead = styled.div`
  width: 16px;
  height: 16px;
  transform: translateX(50%);
  background: #c7000a;
  border-radius: 50%;
`

const Pole = styled.div`
  display: flex;
  align-items: flex-end;
  flex: 4 1 200px;
  width: 100%;
`

export class Record extends PureComponent {
  constructor(props) {
    super(props)
  }

  onMouseOver = () => {
    this.props.onHover()
  }

  onMouseOut = () => {
    this.props.onLeave()
  }

  render() {
    return (
      <Container>
        <LineWrapper onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} />
        <Date>
          <Month>
            <h2>5</h2>
            <h3>MAY</h3>
          </Month>
          <p>23</p>
        </Date>
        <WrapperOverlayMask>
          <Info onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
            <InfoContainer>
              <img src="https://storage.googleapis.com/twreporter-multimedia/images/about-us/indonesia.jpg" />
              <h3>{words.chinese}</h3>
              <p>{words.english}</p>
            </InfoContainer>
            <Pole>
              <PoleBody>
                <PoleHead />
              </PoleBody>              
            </Pole>
          </Info>
        </WrapperOverlayMask>
      </Container>
    )
  }
}

export default Record
