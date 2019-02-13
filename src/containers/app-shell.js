/* eslint no-console: 0 */
import * as types from '../constants/action-types'
import ErrorBoundary from '../components/ErrorBoundary'
import PropTypes from 'prop-types'
import React from 'react'
import axios from 'axios'
import LayoutManager from '../managers/layout-manager'
import ThemeManager from '../managers/theme-manager'
import reduxStatePropKey from '../constants/redux-state-prop-key'
import statusCodeConst from '../constants/status-code'
import styled from 'styled-components'
import twreporterRedux from '@twreporter/redux'
import { colors, typography } from '../themes/common-variables'
import { connect } from 'react-redux'
import { screen } from '../themes/screen'

// lodash
import get from 'lodash/get'

const _ = {
  get
}

const { utils } = twreporterRedux
const formAPIURL = utils.formAPIURL

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
 * @param {string} endpoint - Web push subscription endpoint
 * @return {Promise} A Promise resolves to true if subscribed, otherwise, false.
 */
function isSubscriptionExisted(endpoint) {
  return axios.get(formAPIURL(`web-push/subscriptions?endpoint=${endpoint}`))
    .then(() => {
      return true
    })
    .catch((err) => {
      const statusCode = _.get(err, 'response.status', statusCodeConst.internalServerError)
      if (statusCode === statusCodeConst.notFound) {
        console.log('Web push subscription is not existed')
        return false
      }
      console.warn('Sending GET request to /wep-push endpoint occurs error')
      return Promise.reject(err)
    })
}

/**
 * Send request to API server to subscribe the web push.
 * @param {Object} subscription - A instance of `PushSubscription`
 * See MDN doc about PushSubscription (https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription)
 * @parma {number} userID - id of user
 * @return {Promise}
 */
function updateSubscription(subscription, userID) {
  if (subscription && typeof subscription.toJSON === 'function') {
    const _subscription = subscription.toJSON()
    const data = {
      endpoint: _subscription.endpoint,
      keys: JSON.stringify(_subscription.keys),
      userID
    }

    if (_subscription.expirationTime && typeof _subscription.expirationTime.toString === 'function') {
      data.expirationTime = _subscription.expirationTime.toString()
    }

    return axios.post(formAPIURL('web-push/subscriptions'), data)
      .catch((err) => {
        console.warn('Sending POST request to /web-push endpoint occurs error')
        return Promise.reject(err)
      })
  }
}

/**
 * Use service worker to subscribe the web push.
 * @param {Object} registration - Service worker registration
 */
function createSubscription(registration) {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey)
  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
    .then(function (subscription) {
      console.log('Received web push subscription: ', JSON.stringify(subscription))
      console.log('User is subscribed.')
      return subscription
    })
    .catch(function (err) {
      console.warn('Failed to subscribe web push by service worker registration')
      return Promise.reject(err)
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
 * @param {Object} reg - Service worker registration
 * @return {Object} Promise resovles to true
 */
function isNotificationSubscribed(reg) {
  return reg.pushManager.getSubscription()
    .then((subscription) => {
      if (subscription !== null) {
        return isSubscriptionExisted(subscription.endpoint)
      }
      return false
    })
}

/**
 * Subscribe to receive notifications
 * @param {number} userID - id of user
 * @return {Object} Promise
 */
function subscribeNotification(userID) {
  if (isPushSupported() && isServiceWorkerSupported()) {
    return navigator.serviceWorker.getRegistration()
      .then((reg) => {
        return createSubscription(reg)
      })
      .then((subscription) => {
        return updateSubscription(subscription, userID)
      })
  } else {
    console.log('Browser does not support web push or service worker')
  }
}

/**
 * request permission of sending notifications
 * @param {number} userID - id of user
 * @return {Object} Promise
 */
function requestNotificationPermission(userID) {
  return new Promise((resolve, reject) => {
    if (isNotificationSupported()) {
      if (Notification.permission === 'denied') {
        Notification.requestPermission((permission) => {
          if (permission === 'grant') {
            console.log('User grant the notification request')
            return subscribeNotification(userID)
              .then(resolve)
              .catch((err) => {
                console.warn('Subscribing web push notification fails')
                reject(err)
              })
          }

          console.log('User deny the notification request')
          return reject()
        })
      } else {
        return subscribeNotification(userID)
          .then(resolve)
          .catch((err) => {
            console.warn('Subscribing web push notification fails')
            reject(err)
          })
      }
    } else {
      console.log('Notification is not support')
      return resolve()
    }
  })
}

const AppShellBox = styled.div`
  background-color: ${props => props.backgroundColor};
`

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

class App extends React.PureComponent {
  static propTypes = {
    theme: PropTypes.string.isRequired,
    toShowNotifyPopup: PropTypes.bool.isRequired,
    userID: PropTypes.number
  }

  constructor(props) {
    super(props)
    this.state = {
      toShowNotify: false,
      toShowInstruction: false
    }
    this.acceptNotification = this._acceptNotification.bind(this)
    this.denyNotification = this._denyNotification.bind(this)
  }

  componentDidMount() {
    if (this.props.toShowNotifyPopup) {
      // push manager and service worker only existed on client side
      if (isServiceWorkerSupported() && isPushSupported())  {
        // check if service worker registered web push notification or not
        return navigator.serviceWorker.getRegistration()
          .then((reg) => {
            return isNotificationSubscribed(reg)
          })
          .then((isSubscribed) => {
            this.setState({
              toShowNotify: !isSubscribed
            })
          })
          .catch((err) => {
            console.warn('Something went wrong during checking web push subscription is existed or not')
            if (err) {
              console.warn(err)
            }
          })
      } else {
        console.log('Browser does not support web push or service worker')
      }
    }
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
    const { userID } = this.props
    const _this = this
    requestNotificationPermission(userID)
      .then(() => {
        console.log('Accept web push notification successfully')
        _this.setState({
          toShowNotify: false
        })
      })
      .catch((err) => {
        console.warn('Fail to accept web push notification')
        if (err) {
          console.warn(err)
        }
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
    const {
      releaseBranch,
      theme,
      toShowNotifyPopup
    } = this.props

    let boxJSX = null
    if (toShowNotifyPopup) {
      if (this.state.toShowInstruction) {
        boxJSX = this._renderInstructionBox()
      } else if (this.state.toShowNotify) {
        boxJSX = this._renderAcceptanceBox()
      }
    }

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
          {header}
          {boxJSX}
          {this.props.children}
          {footer}
        </AppShellBox>
      </ErrorBoundary>
    )
  }
}

function mapStateToProps(state, props) {
  const { releaseBranch='master' } = props
  const ts = _.get(state, reduxStatePropKey.nextNotifyPopupTS, 0)
  const pathname = _.get(props, 'location.pathname', '')
  const themeManager = new ThemeManager()
  themeManager.prepareThemePathArrForAppShell(state)
  const theme = themeManager.getThemeByParsingPathname(pathname)
  return {
    theme,
    releaseBranch,
    userID: _.get(state, [ 'auth', 'userInfo.id' ]),
    toShowNotifyPopup: ts < Date.now()
  }
}

function setNextPopupTS(ts) {
  return {
    type: types.SET_NEXT_POPUP_TIME_STAMP,
    payload: ts
  }
}

const actions = { setNextPopupTS }

export default connect(mapStateToProps, actions)(App)
