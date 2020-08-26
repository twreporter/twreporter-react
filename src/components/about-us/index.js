/* eslint react/no-find-dom-node:1 */
import anchors from './constants/data/sidebar-anchor'
import colors from '../../constants/colors'
import Footer from '@twreporter/react-components/lib/footer'
import Helmet from 'react-helmet'
import mq from './utils/media-query'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import Section01 from './section-01'
import Section02 from './section-02'
import Section03 from './section-03'
import Section04 from './section-04'
import Section05 from './section-05'
import SideBarFactory from '../side-bar/side-bar-factory'
import siteMeta from '../../constants/site-meta'
import smoothScroll from 'smoothscroll'
import styled from 'styled-components'
import WebFont from './web-font'
import { Opening } from './opening'

const Border = styled.div`
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
    this.sectionRefs = []
    this.sectionOffset = []
  }
  _handleClickAnchor = anchorIdx => {
    return smoothScroll(this.sectionOffset[anchorIdx])
  }
  componentDidMount() {
    this.sectionOffset = this.sectionRefs.map(elem => {
      return ReactDOM.findDOMNode(elem).getBoundingClientRect().top
    })
  }
  render() {
    const SideBar = SideBarFactory.getAboutUSPageSideBar()
    return (
      <React.Fragment>
        <Helmet
          title={siteMeta.name.full}
          link={[{ rel: 'canonical', href: siteMeta.urlOrigin + '/about-us' }]}
          meta={[
            { name: 'description', content: siteMeta.desc },
            {
              name: 'twitter:title',
              content: '關於我們 - 報導者 The Reporter',
            },
            { name: 'twitter:image', content: siteMeta.ogImage.url },
            { name: 'twitter:description', content: siteMeta.desc },
            { property: 'og:title', content: '關於我們 - 報導者 The Reporter' },
            { property: 'og:description', content: siteMeta.desc },
            { property: 'og:image', content: siteMeta.ogImage.url },
            { property: 'og:image:width', content: siteMeta.ogImage.width },
            { property: 'og:image:height', content: siteMeta.ogImage.height },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: siteMeta.urlOrigin + '/about-us' },
          ]}
        />
        <Border>
          <SideBar ref={node => (this.sidebar = node)} anchors={anchors}>
            <Opening
              ref={node => (this.sectionRefs[0] = node)}
              handleClickAnchor={this._handleClickAnchor}
            />
            <Section01 ref={node => (this.sectionRefs[1] = node)} />
            <Section02 ref={node => (this.sectionRefs[2] = node)} />
            <Section03 ref={node => (this.sectionRefs[3] = node)} />
            <Section04 ref={node => (this.sectionRefs[4] = node)} />
            <Section05 ref={node => (this.sectionRefs[5] = node)} />
          </SideBar>
        </Border>
        <Footer />
        <WebFont />
      </React.Fragment>
    )
  }
}

export default AboutUs
