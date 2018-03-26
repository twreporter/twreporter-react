import Footer from '@twreporter/react-components/lib/footer'
import React, { PureComponent } from 'react'
import Section02 from './section-02'
import Section03 from './section-03'
import WebFont from './web-font'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
`

export class AboutUs extends PureComponent {
  render() {
    return (
      <Container>
        <Section02 />
        <Section03 />
        <Footer />
        <WebFont />
      </Container>
    )
  }
}

export default AboutUs
