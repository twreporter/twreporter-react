import Footer from '@twreporter/react-components/lib/footer'
import React, { PureComponent } from 'react'
import Section02 from './section-02'
import Section03 from './section-03'
import WebFont from './web-font'
import { injectGlobal } from 'styled-components'

export class AboutUs extends PureComponent {
  componentWillMount() {
    // to prevent horizontal overscrolling
    injectGlobal`
      html, body {
        overflow-x: hidden;
      }
    `
  }
  componentWillUnmount() {
    injectGlobal`
      html, body {
        overflow-x: visible;
      }
    `
  }
  
  render() {
    return (
      <React.Fragment>
        <Section02 />
        <Section03 />
        <Footer />
        <WebFont />
      </React.Fragment>
    )
  }
}

export default AboutUs
