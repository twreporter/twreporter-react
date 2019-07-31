import { connect } from 'react-redux'
import mq from '@twreporter/core/lib/utils/media-query'
import styled from 'styled-components'
import uiConst from './constants/ui'
import values from 'lodash/values'
import ErrorBoundary from './components/ErrorBoundary'
import Footer from '@twreporter/react-components/lib/footer'
import Header from '@twreporter/universal-header/dist/containers/header'
import PropTypes from 'prop-types'
import WebPush from './containers/web-push'
import uiManager from './managers/ui-manager'
import React from 'react'

const _ = {
  values
}

const AppBox = styled.div`
  background-color: ${props => props.backgroundColor};
`

const ContentBlock = styled.div`
  position: relative;
`

const TransparentHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  ${mq.mobileOnly`
    position: relative;
  `}
`

// TODO add `pink` theme to universal-header
const PinkBackgroundHeader = styled.div`
  position: relative;
  background-color: #fabcf0;
`


class AppShell extends React.PureComponent {
  static propTypes = {
    releaseBranch: PropTypes.string.isRequired,
    header: PropTypes.oneOf(
      _.values(uiConst.header)
    ),
    footer: PropTypes.oneOf(
      _.values(uiConst.footer)
    ),
    backgroundColor: PropTypes.string
  }

  static defaultProps = {
    header: uiConst.header.default,
    footer: uiConst.footer.default,
    backgroundColor: '#f1f1f1'
  }

  renderHeader() {
    const { layoutObj, releaseBranch } = this.props

    switch(layoutObj.header) {
      case uiConst.header.none: {
        return null
      }
      case uiConst.header.pink: {
        return (
          <PinkBackgroundHeader>
            <Header
              theme="transparent"
              releaseBranch={releaseBranch}
              isLinkExternal={false}
            />
          </PinkBackgroundHeader>
        )
      }
      case uiConst.header.photo: {
        return (
          <Header
            theme="photography"
            releaseBranch={releaseBranch}
            isLinkExternal={false}
          />
        )
      }
      case uiConst.header.transparent: {
        return (
          <TransparentHeader>
            <Header
              theme="transparent"
              releaseBranch={releaseBranch}
              isLinkExternal={false}
            />
          </TransparentHeader>
        )
      }
      default: {
        return (
          <Header
            theme="normal"
            releaseBranch={releaseBranch}
            isLinkExternal={false}
          />
        )
      }
    }
  }

  renderFooter() {
    const { layoutObj } = this.props

    switch(layoutObj.footer) {
      case uiConst.footer.none: {
        return null
      }
      case uiConst.footer.default:
      default: {
        return <Footer />
      }
    }
  }

  render() {
    const {
      layoutObj,
      children
    } = this.props

    return (
      <ErrorBoundary>
        <AppBox
          backgroundColor={layoutObj.backgroundColor}
        >
          <WebPush />
          <ContentBlock>
            {this.renderHeader()}
            {children}
            {this.renderFooter()}
          </ContentBlock>
        </AppBox>
      </ErrorBoundary>
    )
  }
}


function mapStateToProps(state, ownProps) {
  const { header, footer, backgroundColor } = uiManager.getLayoutObj(state, ownProps.location)
  return {
    header,
    footer,
    backgroundColor
  }
}

export default connect(mapStateToProps)(AppShell)
