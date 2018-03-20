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

export class Section4 extends PureComponent {
  render() {
    return (
      <ContainerWrapper>
        <SectionTitle />
      </ContainerWrapper>
    )
  }
}

export default Section4
