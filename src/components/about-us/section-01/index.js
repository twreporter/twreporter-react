import { content } from '../constants/data/section1Content'
import { marginBetweenSections } from '../constants/styles'
import { screen } from '../utils/screen'
import React, { PureComponent } from 'react'
import SectionTitle from './section-title' 
import styled from 'styled-components'

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
  display: flex;
  justify-content: space-between;
  width: 100%;
  ${screen.mobile`
    flex-direction: column;
    align-items: center;
  `}
  ${screen.tablet`
    margin-top: 100px;
  `}
  ${screen.desktop`
    margin-top: 200px;
  `}
  ${screen.overDesktop`
    margin-top: 200px;
  `}  
`

const FeatureBlock = styled.div`
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
    const FeatureBlocks = content.map((block) => {
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
        <FeatureBlock key={block.title}>
          <h2>{block.title}</h2>
          <h3>{block.engTitle}</h3>
          <img src={block.imgSrc} />
          <Info>
            <p className="description">{block.description}</p>
            <p className="engDescription">{block.engDescription}</p>
            {otherInfo()}
          </Info>
        </FeatureBlock>
      )
    })

    return (
      <ContainerWrapper>
        <SectionTitle />
        <SectionBlock>
          {FeatureBlocks}
        </SectionBlock>
      </ContainerWrapper>
    )
  }
}

export default Section1
