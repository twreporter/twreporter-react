import Footer from '@twreporter/react-components/lib/footer'
import React, { PureComponent } from 'react'
import Section02 from './section-02'
import WebFont from './web-font'

export class AboutUs extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Section02 />
        <Footer />
        <WebFont />
      </React.Fragment>
    )
  }
}

export default AboutUs
