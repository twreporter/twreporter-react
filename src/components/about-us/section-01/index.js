import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { screen } from '../utils/screen'
import { content } from '../constants/data/section1Content'
import Title from './title'

const containerWidth = {
  mobile: '100%',
  tablet: '719px',
  desktop: '1024px',
  overDesktop: '1440px'
}

const ContainerWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;  
  ${screen.desktopAbove`
    width: ${containerWidth.desktop};
  `}
  ${screen.overDesktop`
    width: ${containerWidth.overDesktop};
  `}
  ${screen.tablet`
    width: ${containerWidth.tablet}
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
  min-height: 50vh;
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
  ${screen.tablet`
    p{
      font-size: 12px;
    }
  `}

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
    p{
      line-height: 2.25;
      font-size: 14px;
    }
  `}  
  ${screen.mobile`
    text-align: center;
    p{
      font-size: 13px;
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
          <Title />
          <SectionBlock>
            {blocks}
          </SectionBlock>
        </ContainerWrapper>
      </React.Fragment>
    )
  }
}

export default Section1
