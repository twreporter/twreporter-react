import { marginBetweenSections } from '../constants/styles'
import { screen } from '../utils/screen'
import React, { PureComponent } from 'react'
import SectionTitle from './section-title'
import styled from 'styled-components'
import Timeline from './timeline'
import Year from './year'

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

export class Section5 extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      year: 2018,
      timelineScrolling: false
    }
  }

  _getYear = (currentYear) => {
    this.setState({ year: currentYear })    
  }

  _autoScrollStarter = () => {
    this.setState({ timelineScrolling: true })
  }

  render() {
    return (
      <SectionWrapper>
        <Container>
          <TitleWrapper>
            <SectionTitle />
            <Year year={this.state.year} _autoScrollStarter={this._autoScrollStarter}/>
          </TitleWrapper>
        </Container>
        <Timeline getYear={this._getYear} timelineScrolling={this.state.timelineScrolling}/>
      </SectionWrapper>
    )
  }
}

export default Section5
