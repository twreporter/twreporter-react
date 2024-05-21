/* eslint react/no-find-dom-node:1 */
import TagManager from 'react-gtm-module'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import React, { PureComponent, Fragment } from 'react'
import ReactDOM from 'react-dom'
// utils
import mq from './utils/media-query'
import ErrorBoundary from './utils/error-boundary'
// constants
import siteMeta from '../../constants/site-meta'
// components
import Section01 from './section-01'
import Section02 from './section-02'
import Section03 from './section-03'
import Section04 from './section-04'
import Section05 from './section-05'
import SideBarFactory from '../side-bar/side-bar-factory'
import WebFont from './web-font'
import { Opening } from './opening'
// @twreporter
import smoothScroll from '@twreporter/core/lib/utils/smooth-scroll'
import Footer from '@twreporter/react-components/lib/footer'
import { AnchorWrapper as Anchor } from '@twreporter/react-components/lib/side-bar'
import { colorBrand } from '@twreporter/core/lib/constants/color'
// env
import globalEnv from '../../global-env'

const Border = styled.div`
  ${mq.hdOnly`
    border-left: solid 8px ${colorBrand.heavy};
    border-right: solid 8px ${colorBrand.heavy};
  `}
  ${mq.desktopOnly`
    border-left: solid 6px ${colorBrand.heavy};
    border-right: solid 6px ${colorBrand.heavy};
  `}
  ${mq.tabletOnly`
    border-left: solid 7px ${colorBrand.heavy};
    border-right: solid 7px ${colorBrand.heavy};
  `}
  ${mq.mobileOnly`
    border-left: solid 6px ${colorBrand.heavy};
    border-right: solid 6px ${colorBrand.heavy};
  `}
`

export class AboutUs extends PureComponent {
  constructor(props) {
    super(props)
    this.sectionRefs = []
    this.sectionOffset = []
  }
  _handleClickAnchor = anchorIdx => {
    smoothScroll(this.sectionOffset[anchorIdx])
  }
  componentDidMount() {
    // For client-side rendering, we notify GTM that the new component is ready
    TagManager.dataLayer({
      dataLayer: {
        event: 'gtm.load',
      },
    })
    this.sectionOffset = this.sectionRefs.map(elem => {
      return ReactDOM.findDOMNode(elem).getBoundingClientRect().top
    })
  }
  render() {
    const SideBar = SideBarFactory.getAboutUSPageSideBar()
    return (
      <Fragment>
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
        <ErrorBoundary>
          <Border>
            <SideBar ref={node => (this.sidebar = node)}>
              <Anchor anchorId="opening" anchorLabel="簡介" showAnchor>
                <Opening
                  ref={node => (this.sectionRefs[0] = node)}
                  handleClickAnchor={this._handleClickAnchor}
                />
              </Anchor>
              <Anchor anchorId="section1" anchorLabel="特色" showAnchor>
                <Section01 ref={node => (this.sectionRefs[1] = node)} />
              </Anchor>
              <Anchor anchorId="section2" anchorLabel="成員" showAnchor>
                <Section02 ref={node => (this.sectionRefs[2] = node)} />
              </Anchor>
              <Anchor anchorId="section3" anchorLabel="得獎" showAnchor>
                <Section03 ref={node => (this.sectionRefs[3] = node)} />
              </Anchor>
              <Anchor anchorId="section4" anchorLabel="國際參與" showAnchor>
                <Section04 ref={node => (this.sectionRefs[4] = node)} />
              </Anchor>
              <Anchor anchorId="section5" anchorLabel="大事紀" showAnchor>
                <Section05 ref={node => (this.sectionRefs[5] = node)} />
              </Anchor>
            </SideBar>
          </Border>
        </ErrorBoundary>
        <Footer releaseBranch={globalEnv.releaseBranch} />
        <WebFont />
      </Fragment>
    )
  }
}

export default AboutUs
