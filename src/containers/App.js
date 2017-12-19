'use strict'
import PropTypes from 'prop-types'
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import { signOutAction } from '@twreporter/registration'

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
    return this.props.children
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
