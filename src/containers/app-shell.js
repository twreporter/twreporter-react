import ErrorBoundary from '../components/ErrorBoundary'
import PropTypes from 'prop-types'
import React from 'react'
import LayoutManager from '../managers/layout-manager'
import ThemeManager from '../managers/theme-manager'
import styled from 'styled-components'
import WebPush from './web-push'
import { connect } from 'react-redux'
// lodash
import get from 'lodash/get'

const _ = {
  get
}

const AppShellBox = styled.div`
  background-color: ${props => props.backgroundColor};
`

class App extends React.PureComponent {
  static propTypes = {
    // Below props are provided by Redux
    releaseBranch: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired
  }

  render() {
    const {
      releaseBranch,
      theme
    } = this.props

    const layoutManager = new LayoutManager({
      releaseBranch,
      theme
    })
    const header = layoutManager.getHeader()
    const backgroundColor = layoutManager.getBackgroundColor()
    const footer = layoutManager.getFooter()

    return (
      <ErrorBoundary>
        <AppShellBox
          backgroundColor={backgroundColor}
        >
          <WebPush />
          {header}
          {this.props.children}
          {footer}
        </AppShellBox>
      </ErrorBoundary>
    )
  }
}

function mapStateToProps(state, props) {
  const { releaseBranch = 'master' } = props
  // TODO enhance performance (These theme methods will be triggered by every redux state change)
  const themeManager = new ThemeManager()
  themeManager.prepareThemePathArrForAppShell(state)
  // TODO replace location by pathname
  // const pathname = _.get(props, 'location.pathname', '')
  const theme = themeManager.getThemeByParsingPathname(_.get(props, 'location', {}))
  return {
    releaseBranch,
    theme
  }
}

export default connect(mapStateToProps)(App)
