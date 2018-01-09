'use strict'
import { connect } from 'react-redux'
import { PureComponent } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'
import PropTypes from 'prop-types'
import React from 'react'
import { setupTokenInLocalStorage, deletAuthInfoAction, authUserByTokenAction, localStorageKeys, renewToken, getItem, scheduleRenewToken, signOutAction } from '@twreporter/registration'

// lodash
import get from 'lodash/get'

const _ = {
  get
}

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ifAuthenticated: false
    }
  }

  getChildContext() {
    const { location, ifAuthenticated, signOutAction } = this.props
    return {
      location,
      ifAuthenticated,
      signOutAction
    }
  }

  componentDidMount() {
    // token can be stored in localStorage in two scenario
    // 1. TWReporter account sign in
    // 2. oAuth
    // Acount: store auth info during signin action
    // oAuth: cookie -> redux state -> localStorage -> delete authinfo in redux state
    // The following procedure is only for oAuth
    // const { auth } = store.getState()
    const { ifAuthenticated, authInfo, authType, deletAuthInfoAction } = this.props
    if(ifAuthenticated && authInfo && (authType === 'facebook' || authType === 'google')) {
      setupTokenInLocalStorage(authInfo, localStorageKeys.authInfo)
      deletAuthInfoAction()
      // store.dispatch(deletAuthInfoAction())
    }

    // 1. Renew token when user brows our website
    // 2. ScheduleRenewToken if user keep the tab open forever
    const { authConfigure, renewToken } = this.props
    const authInfoString = getItem(localStorageKeys.authInfo)
    if(authInfoString) {
      const authObj = JSON.parse(authInfoString)
      // const { authConfigure } = store.getState()
      const { apiUrl, renew } = authConfigure
      renewToken(apiUrl, renew, authObj)
      scheduleRenewToken(
        6,
        () => {
          if (getItem(localStorageKeys.authInfo)) {
            renewToken(apiUrl, renew, JSON.parse(getItem(localStorageKeys.authInfo)))
          }
        }
      )
    }

    // Check if token existed in localStorage and expired
    // following preocedure is for both accoutn and oAuth SignIn
    // 7 = 7 days
    const { authUserByTokenAction } = this.props
    authUserByTokenAction(7, authType)
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
    ifAuthenticated: _.get(state, [ 'auth', 'authenticated' ], false),
    authInfo: _.get(state, [ 'auth', 'authInfo' ], {}),
    authType: _.get(state, [ 'auth', 'authType' ], ''),
    authConfigure: _.get(state, 'authConfigure', {})
  }
}

const actions = { signOutAction, deletAuthInfoAction, renewToken, authUserByTokenAction }

export default connect(mapStateToProps, actions)(App)
