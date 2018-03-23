import { marginBetweenSections } from '../constants/styles'
import { screen } from '../utils/screen'
import Awards from './awards'
import React, { PureComponent } from 'react'
import SectionTitle from './section-title'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  ${screen.mobile`
    margin: ${marginBetweenSections.mobile} auto;
  `}
  ${screen.tablet`
    margin: ${marginBetweenSections.tablet} auto;
  `}
  ${screen.desktop`
    margin: ${marginBetweenSections.desktop} auto;
  `}
  ${screen.overDesktop`
    margin: ${marginBetweenSections.overDesktop} auto;
  `}
`

export default class Section03 extends PureComponent {
  render() {
    return (
      <Container>
        <SectionTitle />
        <Awards />
      </Container>
    )
  }
}
