import { SITE_NAME, SITE_META } from './constants/data/index'
import anchors from './constants/data/sidebar-anchor'
import colors from '../../constants/colors'
import Footer from '@twreporter/react-components/lib/footer'
import Helmet from 'react-helmet'
import mq from './utils/media-query'
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
import styled from 'styled-components'
import WebFont from './web-font'

const Border = styled.div `
  ${mq.hdOnly`
    border-left: solid 8px ${colors.red.liverRed};
    border-right: solid 8px ${colors.red.liverRed};
  `}
  ${mq.desktopOnly`
    border-left: solid 6px ${colors.red.liverRed};
    border-right: solid 6px ${colors.red.liverRed};
  `}
  ${mq.tabletOnly`
    border-left: solid 7px ${colors.red.liverRed};
    border-right: solid 7px ${colors.red.liverRed};
  `}
  ${mq.mobileOnly`
    border-left: solid 6px ${colors.red.liverRed};
    border-right: solid 6px ${colors.red.liverRed};
  `}
`

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
        <Helmet
          title={SITE_NAME.FULL}
          link={[
            { rel: 'canonical', href: SITE_META.URL }
          ]}
          meta={[
            { name: 'description', content: SITE_META.DESC },
            { name: 'twitter:title', content: SITE_NAME.FULL },
            { name: 'twitter:image', content: SITE_META.OG_IMAGE },
            { name: 'twitter:description', content: SITE_META.DESC },
            { property: 'og:title', content: SITE_NAME.FULL },
            { property: 'og:description', content: SITE_META.DESC },
            { property: 'og:image', content: SITE_META.OG_IMAGE },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: SITE_META.URL }
          ]}
        />
        <Border>
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
        </Border>
        <Footer />
        <WebFont />
      </React.Fragment>
    )
  }
}

export default AboutUs
