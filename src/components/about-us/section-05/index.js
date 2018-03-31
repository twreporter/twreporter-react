import { colors, marginBetweenSections } from '../constants/styles'
import { screen } from '../utils/screen'
import Timeline from './timeline'
import React, { PureComponent } from 'react'
import SectionTitle from './section-title'
import styled from 'styled-components'

const containerWidth = {
  mobile: '100%',
  tablet: '706px',
  desktop: '1024px',
  overDesktop: '1440px'
}

const titleWrapperWidth = {
  mobile: '100%',
  tablet: '100%',
  desktop: '855px',
  overDesktop: '1072px'
}

const SectionWrapper = styled.section`
  position: relative;
  overflow: hidden;
`

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;
  ${screen.desktopAbove`
    width: ${containerWidth.desktop};
    margin-top: ${marginBetweenSections.desktop};
  `}
  ${screen.overDesktop`
    width: ${containerWidth.overDesktop};
    margin-top: ${marginBetweenSections.overDesktop};    
  `}
  ${screen.tablet`
    width: ${containerWidth.tablet};
    margin-top: ${marginBetweenSections.tablet};    
  `}  
  ${screen.mobile`
    margin-top: ${marginBetweenSections.mobile};    
  `}    
`

const TitleWrapper = styled.div`
  margin: 0 auto;
  ${screen.overDesktop`
    width: ${titleWrapperWidth.overDesktop};
  `}
  ${screen.desktop`
    width: ${titleWrapperWidth.desktop};
  `}
  ${screen.tablet`
    width: 100%;
  `}  
  ${screen.mobile`
    width: 100%;
  `}      
`

const YearLabel = styled.div`
  background: #c7000a;
  color: ${colors.white};
  border-radius: 50%;
  text-align: center;
  ${screen.desktopAbove`
    width: 207px;
    height: 207px;
    h1{
      line-height: 207px;
    }
  `}
  ${screen.tabletBelow`
    width: 220px;
    height: 220px;
    h1{
      font-size: 36px;
      line-height: 220px;
    }
  `}
  ${screen.mobile`
    transform: translateX(-20%);    
  `}  
`

export class Section5 extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      year: 2018
    }
  }

  _getYear = (currentYear) => {
    this.setState({ year: currentYear })    
  }

  render() {
    return (
      <SectionWrapper>
        <Container>
          <TitleWrapper>
            <SectionTitle />
            <YearLabel><h1>{this.state.year}</h1></YearLabel>
          </TitleWrapper>
        </Container>
        <Timeline getYear={this._getYear}/>
      </SectionWrapper>
    )
  }
}

export default Section5
