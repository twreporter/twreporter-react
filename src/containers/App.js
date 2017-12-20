'use strict'
import { connect } from 'react-redux'
import { PureComponent } from 'react'
import { signOutAction } from '@twreporter/registration'
import ErrorBoundary from '../components/ErrorBoundary'
import PropTypes from 'prop-types'
import React from 'react'

// lodash
import get from 'lodash/get'

const _ = {
  get
}

class App extends PureComponent {
  getChildContext() {
    const { location, ifAuthenticated, signOutAction } = this.props
    return {
      location,
      ifAuthenticated,
      signOutAction
    }
  }
  render() {
    return <ErrorBoundary>{this.props.children}</ErrorBoundary>
  }
}

App.childContextTypes = {
  location: PropTypes.object,
  ifAuthenticated: PropTypes.bool.isRequired,
  signOutAction: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    header: _.get(state, 'header'),
    ifAuthenticated: _.get(state, [ 'auth', 'authenticated' ], false)
  }
}

export default connect(mapStateToProps, { signOutAction })(App)
