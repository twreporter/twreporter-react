import React, { PureComponent } from 'react'
import Footer from '@twreporter/react-components/lib/footer'
import WebFont from './web-font'
import Opening from './opening'
import Section01 from './section-01'

export class AboutUs extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Opening />
        <Section01 />
        <Footer />
        <WebFont />
      </React.Fragment>
    )
  }
}

export default AboutUs
