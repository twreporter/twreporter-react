import { connect } from 'react-redux'
import ErrorBoundary from '../components/ErrorBoundary'
import Footer from '@twreporter/react-components/lib/footer'
import Header from '@twreporter/universal-header/lib/containers/header'
import PropTypes from 'prop-types'
import React from 'react'
import WebPush from '../components/web-push'
import styled from 'styled-components'
import twreporterRedux from '@twreporter/redux'
import uiConst from '../constants/ui'
import uiManager from '../managers/ui-manager'

// lodash
import get from 'lodash/get'
import values from 'lodash/values'

const _ = {
  get,
  values,
}

const { reduxStateFields } = twreporterRedux

const AppBox = styled.div`
  background-color: ${props => props.backgroundColor};
`

const ContentBlock = styled.div`
  position: relative;
`

const TransparentHeader = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000; // other component has z-index 999
`

// TODO add `pink` theme to universal-header
const PinkBackgroundHeader = styled.div`
  position: relative;
  background-color: #fabcf0;
`

const renderFooter = (footerType, pathname = '', host = '', releaseBranch) => {
  switch (footerType) {
    case uiConst.footer.none: {
      return null
    }
    case uiConst.footer.default:
    default: {
      return (
        <Footer host={host} pathname={pathname} releaseBranch={releaseBranch} />
      )
    }
  }
}

const renderHeader = (headerType, releaseBranch) => {
  let headerTheme
  switch (headerType) {
    case uiConst.header.none:
      return null
    case uiConst.header.transparent:
    case uiConst.header.pink:
      headerTheme = 'transparent'
      break
    case uiConst.header.photo:
      headerTheme = 'photography'
      break
    default:
      headerTheme = 'normal'
      break
  }

  let headerElement = (
    <Header
      theme={headerTheme}
      releaseBranch={releaseBranch}
      isLinkExternal={false}
    />
  )
  if (headerType === uiConst.header.transparent) {
    headerElement = <TransparentHeader>{headerElement}</TransparentHeader>
  } else if (headerType === uiConst.header.pink) {
    headerElement = <PinkBackgroundHeader>{headerElement}</PinkBackgroundHeader>
  }

  return <div className="hidden-print">{headerElement}</div>
}

class AppShell extends React.PureComponent {
  static propTypes = {
    apiOrigin: PropTypes.string,
    backgroundColor: PropTypes.string,
    footerType: PropTypes.oneOf(_.values(uiConst.footer)),
    headerType: PropTypes.oneOf(_.values(uiConst.header)),
    releaseBranch: PropTypes.string.isRequired,
    userId: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    pathname: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
  }

  static defaultProps = {
    headerType: uiConst.header.default,
    footerType: uiConst.footer.default,
    backgroundColor: '#f1f1f1',
  }

  render() {
    const {
      apiOrigin,
      headerType,
      footerType,
      backgroundColor,
      releaseBranch,
      children,
      userId,
      pathname,
      host,
    } = this.props

    return (
      <ErrorBoundary>
        <AppBox backgroundColor={backgroundColor}>
          <ContentBlock>
            <WebPush apiOrigin={apiOrigin} userId={userId} />
            {renderHeader(headerType, releaseBranch)}
            {children}
            {renderFooter(footerType, pathname, host, releaseBranch)}
          </ContentBlock>
        </AppBox>
      </ErrorBoundary>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return Object.assign(
    {
      apiOrigin: _.get(state, [reduxStateFields.origins, 'api'], ''),
      userId: _.get(state, [reduxStateFields.auth, 'userInfo.id']),
      pathname: _.get(ownProps.location, 'pathname', ''),
      host: _.get(ownProps.location, 'host', ''),
    },
    uiManager.getLayoutObj(state, ownProps.location)
  )
}

export default connect(mapStateToProps)(AppShell)
