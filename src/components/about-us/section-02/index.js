import { marginBetweenSections } from '../constants/styles'
import { screen } from '../utils/screen'
import OrgIntro from './org-intro'
import MembersBlock from './members-block'
import React, { PureComponent } from 'react'
import SectionTitle from './section-title'
import styled from 'styled-components'

const containerWidth = {
  mobile: '100%',
  tablet: '719px',
  desktop: '840px',
  overDesktop: '1224px'
}

const Container = styled.div`
  position: relative;
  width: ${containerWidth.mobile};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  ${screen.mobile`
    margin: ${marginBetweenSections.mobile} auto;
    align-items: center;
  `}
  ${screen.tablet`
    width: ${containerWidth.tablet};
    margin: ${marginBetweenSections.tablet} auto;
  `}
  ${screen.desktop`
    width: ${containerWidth.desktop};
    margin: ${marginBetweenSections.desktop} auto;
  `}
  ${screen.overDesktop`
    flex-direction: row;
    width: ${containerWidth.overDesktop};
    margin: ${marginBetweenSections.overDesktop} auto;
  `}
`

const ContentContainer = styled.div`
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  ${screen.mobile`
    width: 92.2%;
    min-width: 295px;
  `}
  ${screen.tablet`
    margin-top: 87px;
  `}
  ${screen.desktop`
    margin-top: 173px;
  `}
  ${screen.overDesktop`
    margin-top: 29px;
    margin-left: 137px;
    width: 820px;
    flex-grow: 1;
  `}
`

export class Section02 extends PureComponent {
  render() {
    return (
      <Container>
        <SectionTitle />
        <ContentContainer>
          <MembersBlock />
          <OrgIntro />
        </ContentContainer>
      </Container>
    )
  }
}

export default Section02
