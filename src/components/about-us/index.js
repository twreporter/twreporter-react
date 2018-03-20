import Footer from '@twreporter/react-components/lib/footer'
import Opening from './opening'
import React, { PureComponent } from 'react'
import Section01 from './section-01'
import WebFont from './web-font'

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
