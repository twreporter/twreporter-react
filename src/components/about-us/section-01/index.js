import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { screen } from '../utils/screen'
import sz from '../constants/screen-size'
import inDepth from '../../../../static/asset/about-us/in-depth.png'
import nonProfit from '../../../../static/asset/about-us/non-profit.png'
import openSource from '../../../../static/asset/about-us/opensource.png'

const content = [
  {
    imgSrc: inDepth,
    title: '深度',
    engTitle: 'IN-DEPTH',
    description: '貼近現場、持續追蹤',
    engDescription: 'On-Scene/On the ground investigative reporting'
  },
  {
    imgSrc: openSource,
    title: '開放',
    engTitle: 'OPEN SOURCE',
    description: '屬於社會的《報導者》',
    engDescription: 'Unrestricted, not exclusive',
    others: [
      'OPEN SOURCE開放原始碼',
      '全民政策追蹤：蔡英文勞動政策追蹤平台',
      'CC授權（姓名標示／非商業性／禁止改作)'
    ]
  },
  {
    imgSrc: nonProfit,
    title: '非營利',
    engTitle: 'NON-PROFIT',
    description: '所有營運經費來自各界贊助',
    engDescription: 'Funded by public donations'
  }
]

const ContainerWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;  
  ${screen.desktopAbove`
    width: ${sz.largeScreenMinWidth}px;
  `}
  ${screen.overDesktop`
    width: ${sz.xLargeScreenMinWidth}px;
  `}
`

const SectionBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  ${screen.mobile`
    flex-direction: column;
    align-items: center;
  `}
`

const Oneblock = styled.div`
  text-align: center;
  width: 30%;
  padding: 10px;
  img{
    width: 100%;
    padding: 20px;
  }
  h2{
    font-size: 28px;
    margin-bottom: 0;
  }
  h3{
    font-size: 20px;
    margin-top: 0;
  }
  p.description{
    font-weight: bold;
    font-size: 16px;
  }
  p.engDescription{
    font-weight: bold;
    font-size: 14px;
  }
  ${screen.mobile`
    width: 90%;
    height: 100vh;
    border-bottom: solid 0.5px #a67a44;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      width: 80%;
      padding: 0;
    }
  `}
`

const Info = styled.div`
  margin-top: 20px;
  text-align: left;
  p:nth-child(2) {
    margin-bottom: 20px;
  }
  ${screen.desktopAbove`
    font-size: 14px;
  `}  
  ${screen.mobile`
    text-align: center;
    font-size: 13px;
  `}
`

const Title = styled.div`
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
      margin: 0 0 0.2em 0;
    }
    h2:nth-child(1){
      letter-spacing: 17px;
    }
  `}  
`

export class Section1 extends PureComponent {
  render() {
    const blocks = content.map((block) => {
      const otherInfo = () => {
        if (!block.others)
          return null
        return (
          block.others.map((words, index) => {
            return (
              <p key={index}><span>- </span>{words}</p>
            )
          })
        )
      }
      return (
        <Oneblock key={block.title}>
          <h2>{block.title}</h2>
          <h3>{block.engTitle}</h3>
          <img src={block.imgSrc} />
          <Info>
            <p className="description">{block.description}</p>
            <p className="engDescription">{block.engDescription}</p>
            {otherInfo()}
          </Info>
        </Oneblock>
      )
    })

    return (
      <React.Fragment>
        <ContainerWrapper>
          <Title>
            <div className="subtitleWrapper">
              <div className="subtitle">
                <h2>FEATURE</h2>
                <h2>特色</h2>
              </div>
            </div>
            <h1>1</h1>
          </Title>
          <SectionBlock>
            {blocks}
          </SectionBlock>
        </ContainerWrapper>
      </React.Fragment>
    )
  }
}

export default Section1
