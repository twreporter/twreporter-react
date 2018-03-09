import React, { PureComponent } from 'react'
import Footer from '@twreporter/react-components/lib/footer'
import WebFont from './web-font'
import Opening from './opening'

export class AboutUs extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Opening />
        <Footer />
        <WebFont />
      </React.Fragment>
    )
  }
}

export default AboutUs
