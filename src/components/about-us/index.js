import Footer from '@twreporter/react-components/lib/footer'
import Opening from './opening'
import React, { PureComponent } from 'react'
import Section01 from './section-01'
import Section02 from './section-02'
import Section03 from './section-03'
import Section04 from './section-04'
import Section05 from './section-05'
import SideBarFactory from '../side-bar/side-bar-factory'
import WebFont from './web-font'

const anchors = [
  {
    id: 'opening',
    label: '0'
  }, {
    id: 'section1',
    label: '1'
  }, {
    id: 'section2',
    label: '2'
  }, {
    id: 'section3',
    label: '3'
  }, {
    id: 'section4',
    label: '4'
  }, {
    id: 'section5',
    label: '5'
  }
]

export class AboutUs extends PureComponent {
  render() {
    const SideBar = SideBarFactory.getAboutUSPageSideBar()
    return (
      <React.Fragment>
        <SideBar
          ref={(node) => this.sidebar = node}
          anchors={anchors}
        >        
          <Opening />
          <Section01 />
          <Section02 />
          <Section03 />
          <Section04 />
          <Section05 />
        </SideBar>
        <Footer />
        <WebFont />
      </React.Fragment>        
    )
  }
}

export default AboutUs
