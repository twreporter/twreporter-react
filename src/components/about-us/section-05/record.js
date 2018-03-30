// import { screen } from '../utils/screen'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

export const recordStyle = {
  width: 375, // 335px + 20*2 (marginLeft and marginRight),
  widthIncludesMonth: 435
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: ${recordStyle.width}px;
  height: 100%;
  /* border: solid 1px black; */
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
  /* border: solid 1px pink; */
  ${Container}:first-child & {
    margin-left: 80px;
  }
  /* &:hover{
    background: pink;
  } */
`
const InfoContainer = styled.div`
  flex: 1 1 auto;
  img{
    width: 100%;
  }
  h3,p{
    color: #c7000a;
    white-space: normal;
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
  flex: 4 1 50px;
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

  monthInEng = (number) => {
    switch(number) {
      case 1:  
        return 'JAN'
      case 2:
        return 'FEB'
      case 3:
        return 'MAR'
      case 4:
        return 'APR'
      case 5:
        return 'MAY'
      case 6:
        return 'JUN'
      case 7:
        return 'JUL'
      case 8:
        return 'AUG'
      case 9:
        return 'SEP'
      case 10:
        return 'OCT'
      case 11:
        return 'NOV'
      case 12:
        return 'DEC'
    }
  }

  render() {
    const { month, date, imgSrc, text } = this.props
    return (
      <Container>
        <LineWrapper onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} />
        <Date>
          <Month>
            <h2>{month}</h2>
            <h3>{this.monthInEng(month)}</h3>
          </Month>
          <p>{date}</p>
        </Date>
        <WrapperOverlayMask>
          <Info onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
            <InfoContainer>
              <img src={imgSrc}/>
              <h3>{text.chinese}</h3>
              <p>{text.english}</p>
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
