// TODO: Move Border component of each section here for one time declaration

import anchors from './constants/data/sidebar-anchor'
import Footer from '@twreporter/react-components/lib/footer'
import Opening from './opening'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import Section01 from './section-01'
import Section02 from './section-02'
import Section03 from './section-03'
import Section04 from './section-04'
import Section05 from './section-05'
import SideBarFactory from '../side-bar/side-bar-factory'
import smoothScroll from 'smoothscroll'
import WebFont from './web-font'

export class AboutUs extends PureComponent {
  constructor(props) {
    super(props)
    this.sectionRefs = [],
    this.sectionOffset = []
  }
  _handleClickAnchor = (anchorIdx) => {
    return smoothScroll(this.sectionOffset[anchorIdx])
  }
  componentDidMount() {
    this.sectionOffset = this.sectionRefs.map((elem) => {
      return ReactDOM.findDOMNode(elem).getBoundingClientRect().top
    })
  }
  render() {
    const SideBar = SideBarFactory.getAboutUSPageSideBar()
    return (
      <React.Fragment>
        <SideBar
          ref={(node) => this.sidebar = node}
          anchors={anchors}
        >
          <Opening
            ref={(node) => this.sectionRefs[0] = node}
            handleClickAnchor={this._handleClickAnchor}
          />
          <Section01 ref={(node) => this.sectionRefs[1] = node} />
          <Section02 ref={(node) => this.sectionRefs[2] = node} />
          <Section03 ref={(node) => this.sectionRefs[3] = node} />
          <Section04 ref={(node) => this.sectionRefs[4] = node} />
          <Section05 ref={(node) => this.sectionRefs[5] = node} />
        </SideBar>
        <Footer />
        <WebFont />
      </React.Fragment>        
    )
  }
}

export default AboutUs
