import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { screen } from '../utils/screen'
import aboutusTitle from '../../../../static/asset/about-us/opening_title_desktopHD.png'
import aboutusTitleMobile from '../../../../static/asset/about-us/opening_title_mobile.png'
import openingthereporter from '../../../../static/asset/about-us/opening_thereporter_desktopHD.png'
import startbutton from '../../../../static/asset/about-us/opening_start.png'

const OnlyDisplayOnDesktop = styled.div`
  ${screen.tabletBelow`
    display: none;
  `}  
`

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`

const TitleContainer = ContentContainer.extend`
  align-items: flex-start;
  height: 75vh;
  ${screen.tablet`
    align-items: center;
    height: 50vh;
  `}      
  ${screen.mobile`
    align-items: center;
    height: 100vh;
  `}    
`

const Title = styled.div`
  img{
    width: 100%;
    height: auto;
  }
  ${screen.tablet`
    text-align: center;
    img{
      width: 75%;
    }
  `}
  ${screen.desktopAbove`
    img{ 
      width: 50%; 
    }
  `}

  ${screen.overDesktop`
    img{
      width: 100%;
    }
  `}
`

const Thereporter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  ${screen.tabletBelow`
    display: none;  
  `}

  ${screen.desktopAbove`
    img{ 
      width: 50%; 
    }
  `}

  ${screen.overDesktop`
    img{ 
      width: 100%;
    }
  `}
`

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

export class CoverTitle extends PureComponent {
  render() {
    return(
      <TitleContainer>
        <Title>
          <picture>
            <source media="(max-width: 1023px)" srcSet={aboutusTitleMobile} />
            <img src={aboutusTitle} alt="關於我們" />
          </picture>
        </Title>
        <Thereporter>
          <img src={openingthereporter} />
        </Thereporter>
        <OnlyDisplayOnDesktop>
          <Startbutton>
            <img src={startbutton} />
          </Startbutton>
        </OnlyDisplayOnDesktop>
      </TitleContainer>
    )
  }
}

export default CoverTitle
