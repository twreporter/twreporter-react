/* eslint no-console: 0 */
import { connect } from 'react-redux'
import { screen } from '../themes/screen'
import axios from 'axios'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import statusCodeConst from '../constants/status-code'
import styled from 'styled-components'
import twreporterRedux from '@twreporter/redux'

// lodash
import get from 'lodash/get'

const _ = {
  get
}

const formURL = twreporterRedux.utils.formURL
const actionTypes = twreporterRedux.actionTypes
const reduxStateFields = twreporterRedux.reduxStateFields

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

const NotifyBackground = styled.div`
  background-color: #fff;

  /* z-index and position are set for covering header */
  z-index: 1;
  position: relative;
`

const NotifyBox = styled.div`
  position: relative;
  color: #404040;
  font-size: 14px;

  ${screen.mobile`
    padding: 20px 22px 45px 22px;
  `}

  ${screen.tablet`
    padding: 20px 50px 50px 50px;
  `}

  ${screen.desktop`
    width: calc(875/1024*100%);
  `}

  ${screen.desktopAbove`
    padding: 20px 0;
    margin: 0 auto;
  `}

  ${screen.overDesktop`
    width: calc(992/1440*100%);
  `}
`

const MegaphoneEmoji = styled.div`
  display: inline-block;

  /* flip the emoji */
  transform: scaleX(-1);
  margin-right: 6px;
  &:before {
    content: '📣';
    line-height: 1.5;
  }
`

const NotifyTitle = styled.div`
  font-size: 16px;
  display: inline-block;
  font-weight: bold;

  ${screen.mobile`
    margin-bottom: 12px;
  `}

  ${screen.tablet`
    margin-bottom: 12px;
  `}

  ${screen.tabletAbove`
    font-size: 14px;
  `}
`

const CloseButton = styled.div`
  position: absolute;
  cursor: pointer;
  top: 20px;
  right: 22px;
`

const NotifyText = styled.p`
  line-height: 1.43;
  position: relative;

  ${screen.mobile`
    margin-bottom: 12px;
  `}

  ${screen.tablet`
    margin-left: 15px;
    margin-bottom: 20px;
  `}

  ${screen.tabletAbove`
    display: inline-block;
  `}
`

const NotifyHighLightRow = styled.div`
  ${screen.desktopAbove`
    display: inline-block;
  `}
`

const NotifyHighLight = styled.span`
  color: #a67a44;
`

const NotifyLink = styled.a`
  font-weight: bold;
  color: #a67a44;
`

const NotifyButton = styled.div`
  background-color: #fff;
  border: 1px solid #a67a44;
  color: #a67a44;
  cursor: pointer;
  font-size: 14px;
  position: absolute;

  ${screen.mobile`
    right: 20px;
    bottom: 12px;
    padding: 10px 20px;
  `}

  ${screen.tablet`
    text-align: center;
    width: calc(514/768*100%);
    padding: 10px 0;
    right: calc(52/768*100%);
    bottom: 23px;
  `}

  ${screen.desktopAbove`
    padding: 10px 20px;
    bottom: 11px;
    right: 60px;
  `}

  &:hover {
    background-color: #a67a44;
    color: #fff;
    transition: background-color .2s linear;
  }
`

const closeSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
  >
    <path style={ { stroke: '#808080' } } d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
)

class WebPush extends PureComponent {
  static propTypes = {
    // Below props are provided by Redux
    apiOrigin: PropTypes.string.isRequired,
    setNextPopupTS: PropTypes.func.isRequired,
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
            if (reg) {
              return this._isNotificationSubscribed(reg)
            }
            console.warn('No service worker registration was found')
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

  /**
  * Check if the web push endpoint is subscribed o not
  * @param {string} endpoint - Web push subscription endpoint
  * @return {Promise} A Promise resolves to true if subscribed, otherwise, false.
  */
  _isSubscriptionExisted(endpoint) {
    return axios.get(formURL(this.props.apiOrigin, '/web-push/subscriptions', { endpoint }, false))
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
  _updateSubscription(subscription, userID) {
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

      return axios.post(formURL(this.props.apiOrigin, '/web-push/subscriptions'), data)
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
  _createSubscription(registration) {
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
  * Check if service worker registration is already subscribed
  * @param {Object} reg - Service worker registration
  * @return {Object} Promise resovles to true
  */
  _isNotificationSubscribed(reg) {
    return reg.pushManager.getSubscription()
      .then((subscription) => {
        if (subscription !== null) {
          return this._isSubscriptionExisted(subscription.endpoint)
        }
        return false
      })
  }

  /**
  * Subscribe to receive notifications
  * @param {number} userID - id of user
  * @return {Object} Promise
  */
  _subscribeNotification(userID) {
    if (isPushSupported() && isServiceWorkerSupported()) {
      return navigator.serviceWorker.getRegistration()
        .then((reg) => {
          return this._createSubscription(reg)
        })
        .then((subscription) => {
          return this._updateSubscription(subscription, userID)
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
  _requestNotificationPermission(userID) {
    return new Promise((resolve, reject) => {
      if (isNotificationSupported()) {
        if (Notification.permission === 'denied') {
          Notification.requestPermission((permission) => {
            if (permission === 'grant') {
              console.log('User grant the notification request')
              return this._subscribeNotification(userID)
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
          return this._subscribeNotification(userID)
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
    this._requestNotificationPermission(userID)
      .then(() => {
        console.log('Accept web push notification successfully')
        this.setState({
          toShowNotify: false
        })
        this._setNextPopupToNextMonth()
      })
      .catch((err) => {
        console.warn('Fail to accept web push notification')
        if (err) {
          console.warn(err)
        }
        this.setState({
          toShowInstruction: true
        })
      })

  }

  _denyNotification() {
    this.setState({
      toShowNotify: false,
      toShowInstruction: false
    })

    this._setNextPopupToNextMonth()
  }


  /**
   *  @param {string} title - notify box title
   *  @param {string} desc - notify box description
   *  @param {string} btText - notify box button text
   *  @param {Function} btClickCallback - callback function of button click
   *  @return {Object} React node containing notify box view
   */
  _renderNotifyBox(title, desc, btText, btClickCallback) {
    return (
      <NotifyBackground>
        <NotifyBox>
          <MegaphoneEmoji />
          <NotifyTitle>
            {title}
          </NotifyTitle>
          <CloseButton
            onClick={this.denyNotification}
          >
            {closeSVG}
          </CloseButton>
          <NotifyText>
            {desc}
          </NotifyText>
          <NotifyHighLightRow>
            <NotifyHighLight>該如何操作？</NotifyHighLight>
            <NotifyLink href="/a/help-notification-instruction" target="_blank">看教學</NotifyLink>
          </NotifyHighLightRow>
          <NotifyButton onClick={btClickCallback}>
            {btText}
          </NotifyButton>
        </NotifyBox>
      </NotifyBackground>
    )
  }

  _renderAcceptanceBox() {
    return this._renderNotifyBox('想即時追蹤最新報導？',
      '開啟文章推播功能得到報導者第一手消息！', '開啟通知', this.acceptNotification)
  }

  _renderInstructionBox() {
    return this._renderNotifyBox('請更改瀏覽器設定來啟動推播通知',
      '您的瀏覽器目前封鎖推播通知，請更改瀏覽器設定。', '略過', this.denyNotification)
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
    return boxJSX
  }
}

function mapStateToProps(state) {
  const ts = _.get(state, reduxStateFields.nextNotifyPopupTS, 0)
  const apiOrigin = _.get(state, [ reduxStateFields.origins, 'api' ], '')
  return {
    apiOrigin,
    userID: _.get(state, [ 'auth', 'userInfo.id' ]),
    toShowNotifyPopup: ts < Date.now()
  }
}


function setNextPopupTS(ts) {
  return {
    type: actionTypes.SET_NEXT_POPUP_TIME_STAMP,
    payload: ts
  }
}

export default connect(mapStateToProps, { setNextPopupTS })(WebPush)
