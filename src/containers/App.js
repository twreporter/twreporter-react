/* global __CLIENT__ */
/* eslint no-console: 0 */
import * as types from '../constants/action-types'
import ErrorBoundary from '../components/ErrorBoundary'
import PropTypes from 'prop-types'
import React from 'react'
import axios from 'axios'
import reduxStatePropKey from '../constants/redux-state-prop-key'
import styled from 'styled-components'
import twreporterRedux from '@twreporter/redux'
import { AuthenticationContext } from '@twreporter/react-components/lib/header'
import { PureComponent } from 'react'
import { authUserByTokenAction, deletAuthInfoAction, localStorageKeys, renewToken, getItem, scheduleRenewToken, setupTokenInLocalStorage, signOutAction } from '@twreporter/registration'
import { colors, typography } from '../themes/common-variables'
import { connect } from 'react-redux'
import { screen } from '../themes/screen'

// lodash
import get from 'lodash/get'

const _ = {
  get
}

const formAPIURL = twreporterRedux.utils.formAPIURL

// TODO move applicationServerPublicKey to config
const applicationServerPublicKey = 'BHkStXEZjGMSdCHolgJAdmREB75lfi42OLNyRt4NRkLu_FEJYR-7Jv8hho1TSuYxTw2GqpYc3tLrotc55DfaNx0'

/**
 * The application server's public key is base 64 URL safe encoded.
 * We convert it to a UInt8Array as this is the expected input of the subscribe call.
 * @param {string} base64String Base 64 URL
 * @return {UInt8Array} Array contains uint8 values
 */
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

/**
 * Check if the web push endpoint is subscribed o not
 * @param {string} endpoint Web push subscription endpoint
 * @return {Promise} A Promise resolves to true if subscribed, otherwise, false.
 */
function isWebPushSubscribed(endpoint) {
  return axios.get(formAPIURL(`web-push/subscriptions?endpoint=${endpoint}`))
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}

/**
 * Send request to API server to subscribe the web push.
 * @param {Object} subscription A instance of `PushSubscription`
 * See MDN doc about PushSubscription (https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription)
 * @return {Promise}
 */
function updateSubscriptionOnServer(subscription) {
  if (subscription !== null) {
    const _subscription = subscription.toJSON()
    const data = {
      endpoint: _subscription.endpoint,
      keys: JSON.stringify(_subscription.keys)
    }

    if (_subscription.expirationTime && typeof _subscription.expirationTime.toString === 'function') {
      data.expirationTime = _subscription.expirationTime.toString()
    }

    const browserLocalStorage = (typeof localStorage === 'undefined') ? null : localStorage
    try {
      const authInfo = JSON.parse(browserLocalStorage.getItem(localStorageKeys.authInfo))
      if (authInfo.id) {
        data.userID = authInfo.id
      }
    } catch(err) {
      console.log('Getting authoInfo from localStorage and parsing it to JSON occurs error:', err)
    }

    return axios.post(formAPIURL('web-push/subscriptions'), data)
      .catch((err) => {
        console.error('Sending web push subscription to server occurs error', err)
      })
  }
}

/**
 * Use service worker to subscribe the web push.
 * @param {Object} registration - Service worker registration
 */
function subscribeUser(registration) {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey)
  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
    .then(function (subscription) {
      console.log('Received PushSubscription: ', JSON.stringify(subscription))
      console.log('User is subscribed.')

      return updateSubscriptionOnServer(subscription)
    })
    .catch(function (err) {
      console.log('Failed to subscribe the user: ', err)
    })
}

/**
 * @return {bool}
 */
function isNotificationSupported() {
  return 'Notification' in window
}

/**
 * @return {bool}
 */
function isPushSupported() {
  return 'PushManager' in window
}

/**
 * @return {bool}
 */
function isServiceWorkerSupported() {
  return 'serviceWorker' in navigator
}

/**
 * Check if service worker registration is already subscribed
 * @return {Object} Promise resovles to true
 */
function isRegistrationSubscribed(reg) {
  return reg.pushManager.getSubscription()
    .then(function (subscription) {
      if (subscription !== null) {
        return isWebPushSubscribed(subscription.endpoint)
      }
      return false
    })
}

/**
 * Subscribe to receive notifications
 * @return {Object} Promise
 */
function subscribeNotification() {
  if (isPushSupported() && isServiceWorkerSupported()) {
    return navigator.serviceWorker.getRegistration()
      .then((reg) => {
        if (reg !== undefined) {
          return isRegistrationSubscribed(reg)
            .then((isSubscribed) => {
              if (!isSubscribed) {
                return subscribeUser(reg)
              }
            })
        }
      })
  }
}

/**
 * request permission of sending notifications
 * @return {Object} Promise
 */
function requestNotificationPermission() {
  return new Promise((resolve, reject) => {
    if (isNotificationSupported()) {
      if (Notification.permission === 'denied') {
        Notification.requestPermission((permission) => {
          if (permission === 'grant') {
            console.log('User grant the notification request')
            return subscribeNotification()
              .then(resolve)
              .catch(reject)
          }

          console.log('User deny the notification request')
          return reject()
        })
      } else {
        return subscribeNotification()
          .then(resolve)
          .catch(reject)
      }
    } else {
      console.log('Notification is not support')
      return resolve()
    }
  })
}

const NoticePopup = styled.div`
  z-index: 1000;
  position: fixed;
  right: 40px;
  bottom: 40px;
  width: 320px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
  padding: 20px 24px 15px 24px;
  text-align: right;

  > p:first-child {
    font-size: 20px;
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: 6px;
    color: rgba(0, 0, 0, 0.87);
  }

  > p:last-of-type{
    margin-bottom: 15px;
  }

  > p {
    text-align: left;
    font-size: ${typography.font.size.medium};
    line-height: 1.38;
    color: rgba(0, 0, 0, 0.54);
  }

  span {
    color: ${colors.secondaryColor};
    letter-spacing: 0.5px;
    font-size: ${typography.font.size.xSmall};
    font-weight: 500;
    cursor: pointer;
  }

  span:last-of-type {
    margin-left: 20px;
  }

  ${screen.mobile`
    left: 50%;
    transform: translateX(-50%);
  `}
`

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.authenticationContext = new AuthenticationContext(props.ifAuthenticated, props.signOutAction)
    this.state = {
      toShowNotify: false,
      toShowInstruction: false
    }
    this.acceptNotification = this._acceptNotification.bind(this)
    this.denyNotification = this._denyNotification.bind(this)
  }

  getChildContext() {
    const { location } = this.props
    return {
      location,
      authenticationContext: this.authenticationContext
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.ifAuthenticated !== this.props.ifAuthenticated) {
      this.authenticationContext.setIfAuthenticated(nextProps.ifAuthenticated)
    }
  }

  componentWillMount() {
    const _this = this
    if (__CLIENT__) {
      if (isPushSupported() && isServiceWorkerSupported()) {
        return navigator.serviceWorker.getRegistration()
          .then((reg) => {
            if (reg !== undefined) {
              return isRegistrationSubscribed(reg)
                .then((isSubscribed) => {
                  _this.setState({
                    toShowNotify: !isSubscribed
                  })
                })
            }
          })
      }
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

  _setNextPopupToNextMonth() {
    // In order to reduce the interference,
    // if the user deny accepting notification,
    // and then we ask them next month.
    // 1000 * 60 * 60 * 24 * 30 is one month in ms format
    const oneMonthInterval = 1000 * 60 * 60 * 24 * 30
    const oneMonthLater = Date.now() + oneMonthInterval
    this.props.setNextPopupTS(oneMonthLater)
  }

  _acceptNotification() {
    const _this = this
    requestNotificationPermission()
      .then(() => {
        _this.setState({
          toShowNotify: false
        })
      })
      .catch(() => {
        _this.setState({
          toShowInstruction: true
        })
      })

    this._setNextPopupToNextMonth()
  }

  _denyNotification() {
    this.setState({
      toShowNotify: false,
      toShowInstruction: false
    })

    this._setNextPopupToNextMonth()
  }

  _renderAcceptanceBox() {
    return (
      <NoticePopup>
        <p>點擊「同意」即刻開啟推播功能</p>
        <p>您將在第一時間收到《報導者》最新消息（文章、專題、活動等訊息）</p>
        <span onClick={this.denyNotification}>不同意</span>
        <span onClick={this.acceptNotification}>同意</span>
      </NoticePopup>
    )
  }

  _renderInstructionBox() {
    return (
      <NoticePopup>
        <p>請將更改瀏覽器設定來啟動推播通知</p>
        <p>您的瀏覽器目前封鎖推播通知，請更改瀏覽器設定。</p>
        <span onClick={this.denyNotification}>略過</span>
        <a href="/a/help-notification-instruction" target="_blank"><span>如何操作？</span></a>
      </NoticePopup>
    )
  }

  render() {
    const { toShowNotifyPopup } = this.props
    let boxJSX = null
    if (toShowNotifyPopup) {
      if (this.state.toShowInstruction) {
        boxJSX = this._renderInstructionBox()
      } else if (this.state.toShowNotify) {
        boxJSX = this._renderAcceptanceBox()
      }
    }
    return <ErrorBoundary>{boxJSX}{this.props.children}</ErrorBoundary>
  }
}

App.childContextTypes = {
  location: PropTypes.object,
  authenticationContext: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const ts = _.get(state, reduxStatePropKey.nextNotifyPopupTS, 0)
  return {
    header: _.get(state, 'header'),
    ifAuthenticated: _.get(state, [ 'auth', 'authenticated' ], false),
    authInfo: _.get(state, [ 'auth', 'authInfo' ], {}),
    authType: _.get(state, [ 'auth', 'authType' ], ''),
    authConfigure: _.get(state, 'authConfigure', {}),
    toShowNotifyPopup: ts < Date.now()
  }
}

function setNextPopupTS(ts) {
  return {
    type: types.SET_NEXT_POPUP_TIME_STAMP,
    payload: ts
  }
}

const actions = { signOutAction, deletAuthInfoAction, renewToken, authUserByTokenAction, setNextPopupTS }

export default connect(mapStateToProps, actions)(App)
