import { connect } from 'react-redux'
import ErrorBoundary from '../components/ErrorBoundary'
import Footer from '@twreporter/react-components/lib/footer'
import Header from '@twreporter/universal-header/lib/containers/header'
import mq from '@twreporter/core/lib/utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import uiConst from '../constants/ui'
import uiManager from '../managers/ui-manager'
import WebPush from '../containers/web-push'
// lodash
import values from 'lodash/values'

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

const renderFooter = (footerType) => {
  switch(footerType) {
    case uiConst.footer.none: {
      return null
    }
    case uiConst.footer.default:
    default: {
      return <Footer />
    }
  }
}

const renderHeader = (headerType, releaseBranch) => {
  switch(headerType) {
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

class AppShell extends React.PureComponent {
  static propTypes = {
    backgroundColor: PropTypes.string,
    footerType: PropTypes.oneOf(_.values(uiConst.footer)),
    headerType: PropTypes.oneOf(_.values(uiConst.header)),
    releaseBranch: PropTypes.string.isRequired
  }

  static defaultProps = {
    headerType: uiConst.header.default,
    footerType: uiConst.footer.default,
    backgroundColor: '#f1f1f1'
  }

  render() {
    const {
      headerType,
      footerType,
      backgroundColor,
      releaseBranch,
      children
    } = this.props

    return (
      <ErrorBoundary>
        <AppBox
          backgroundColor={backgroundColor}
        >
          <ContentBlock>
            <WebPush />
            {renderHeader(headerType, releaseBranch)}
            {children}
            {renderFooter(footerType)}
          </ContentBlock>
        </AppBox>
      </ErrorBoundary>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return uiManager.getLayoutObj(state, ownProps.location)
}

export default connect(mapStateToProps)(AppShell)
