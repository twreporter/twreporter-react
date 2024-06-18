/* global Notification */

import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// constants
import statusCodeConst from '../constants/status-code'
// utils
import loggerFactory from '../logger'
// contexts
import { CoreContext, WebpushPromoContext } from '../contexts'
// hooks
import useWebpush from '../hooks/use-web-push'
// components
import { DesktopBanner, MobileBanner } from './notify-and-promo/notify-banner'
// twreporter
import twreporterRedux from '@twreporter/redux'
import zIndexConst from '@twreporter/core/lib/constants/z-index'
import {
  DesktopAndAbove,
  TabletAndBelow,
} from '@twreporter/react-components/lib/rwd'
import requestOrigins from '@twreporter/core/lib/constants/request-origins'

// lodash
import get from 'lodash/get'

const logger = loggerFactory.getLogger()

const _ = {
  get,
}

const formURL = twreporterRedux.utils.formURL

// TODO move applicationServerPublicKey to config
const applicationServerPublicKey =
  'BHkStXEZjGMSdCHolgJAdmREB75lfi42OLNyRt4NRkLu_FEJYR-7Jv8hho1TSuYxTw2GqpYc3tLrotc55DfaNx0'

/**
 * The application server's public key is base 64 URL safe encoded.
 * We convert it to a UInt8Array as this is the expected input of the subscribe call.
 * @param {string} base64String Base 64 URL
 * @return {Uint8Array} Array contains uint8 values
 */
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

/**
 * @return {boolean}
 */
function isNotificationSupported() {
  return 'Notification' in window
}

/**
 * @return {boolean}
 */
function isPushSupported() {
  return 'PushManager' in window
}

/**
 * @return {boolean}
 */
function isServiceWorkerSupported() {
  return 'serviceWorker' in navigator
}

const Box = styled.div`
  z-index: ${zIndexConst.webPush};
  visibility: ${props => (props.$show ? 'visible' : 'hidden')};
  ${props => (props.$show ? '' : 'transition: visibility 0.5s linear 0.5s;')}
`

const defaultSubscribed = true
const apiPath = '/v1/web-push/subscriptions'
const WebPush = ({ userId, pathname, showHamburger }) => {
  const [isSubscribed, setIsSubscribed] = useState(defaultSubscribed)
  const [isShowInstruction, setIsShowInstruction] = useState(false)
  const { isShowPromo, closePromo } = useWebpush(
    pathname,
    isSubscribed,
    showHamburger
  )
  const { releaseBranch } = useContext(CoreContext)
  const apiOrigin = requestOrigins.forServerSideRendering[releaseBranch].api

  useEffect(() => {
    const initialize = async () => {
      try {
        const subscribedStatus = await getIsSubscribed()
        setIsSubscribed(subscribedStatus)
      } catch (err) {
        logger.warn(err)
      }
    }
    initialize()
  }, [])

  const getIsSubscribed = async () => {
    // check service support
    // push manager and service worker only existed on client side
    if (!isServiceWorkerSupported() || !isPushSupported()) {
      logger.info('Browser does not support web push or service worker')
      return defaultSubscribed
    }

    // check if service worker registered web push notification or not
    try {
      const reg = await navigator.serviceWorker.getRegistration()
      const subscription = reg ? reg.pushManager.getSubscription() : null
      if (!subscription) {
        return false
      }

      const endpoint = subscription.endpoint
      const url = formURL(apiOrigin, apiPath, { endpoint }, false)
      try {
        const axiosRes = await axios.get(url)
        if (_.get(axiosRes, 'status') === statusCodeConst.ok) {
          return true
        }
        return false
      } catch (err) {
        const statusCode = _.get(err, 'response.status')
        if (statusCode === statusCodeConst.notFound) {
          return false
        }
        return Promise.reject(err)
      }
    } catch (err) {
      logger.errorReport({
        report: err,
        message:
          'Something went wrong during checking web push subscription is existed or not',
      })
      return defaultSubscribed
    }
  }

  const requestNotificationPermission = () => {
    return new Promise((resolve, reject) => {
      Notification.requestPermission(permission => {
        const isGrant = permission === 'granted'
        if (isGrant) {
          return resolve(isGrant)
        }
        return reject(new Error('User denies Notification request permission'))
      })
    })
  }

  const acceptNotification = async () => {
    if (
      !isNotificationSupported() ||
      !isPushSupported() ||
      !isServiceWorkerSupported()
    ) {
      logger.info(
        'Browser does not support `Notification`, `PushManager` or `serviceWorker`.'
      )
      return
    }

    if (Notification.permission !== 'denied') {
      return true
    }

    const breakHere = () => {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('BREAK')
    }
    try {
      // request permission on client side
      const isGrant = await requestNotificationPermission()
      if (!isGrant) {
        breakHere()
      }
      const reg = await navigator.serviceWorker.getRegistration()
      if (!reg) {
        breakHere()
      }
      const applicationServerKey = urlB64ToUint8Array(
        applicationServerPublicKey
      )
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey,
      })
      if (!subscription || typeof subscription.toJSON !== 'function') {
        breakHere()
      }
      // update subscription data to twreporter backend
      const _subscription = subscription.toJSON()
      const data = {
        endpoint: _subscription.endpoint,
        keys: JSON.stringify(_subscription.keys),
        user_id: userId,
      }
      if (
        _subscription.expirationTime &&
        typeof _subscription.expirationTime.toString === 'function'
      ) {
        data.expirationTime = _subscription.expirationTime.toString()
      }
      const axiosRes = await axios.post(formURL(apiOrigin, apiPath), data)
      let accepted = false
      if (_.get(axiosRes, 'status') === statusCodeConst.created) {
        accepted = true
      }
      closePromo()
      return accepted
    } catch (err) {
      if (err === 'BREAK') {
        return
      }
      logger.errorReport({
        report: err,
        message: 'Fail to accept web push notification',
      })
      setIsShowInstruction(true)
    }
  }

  const contextValue = { isShowPromo, closePromo }
  const description = isShowInstruction
    ? ['您的瀏覽器目前封鎖推播通知，需先更改瀏覽器設定！']
    : ['開啟文章推播功能得到報導者第一手消息！']
  const buttonText = isShowInstruction ? '前往操作教學' : '開啟通知'
  const onClickButton = async () => {
    if (isShowInstruction) {
      window.open(
        'https://www.twreporter.org/a/how-to-follow-the-reporter#方法2：設定文章推播',
        '_blank'
      )
    } else {
      await acceptNotification()
    }
    closePromo()
  }
  return (
    <Box $show={isShowPromo}>
      <WebpushPromoContext.Provider value={contextValue}>
        <DesktopAndAbove>
          <DesktopBanner
            customContext={WebpushPromoContext}
            imageUrl={`https://www.twreporter.org/assets/membership-promo/${releaseBranch}/banner_desktop.png`}
            title="即時追蹤最新報導"
            description={description}
            buttonText={buttonText}
            onClickButton={onClickButton}
          />
        </DesktopAndAbove>
        <TabletAndBelow>
          <MobileBanner
            customContext={WebpushPromoContext}
            title="即時追蹤最新報導"
            description={description}
            buttonText={buttonText}
            onClickButton={onClickButton}
          />
        </TabletAndBelow>
      </WebpushPromoContext.Provider>
    </Box>
  )
}
WebPush.propTypes = {
  // props from redux state
  userId: PropTypes.number,
  // props pass by parent
  pathname: PropTypes.string.isRequired,
  showHamburger: PropTypes.bool.isRequired,
}

const { reduxStateFields } = twreporterRedux
const mapStateToProps = state => {
  const userId = _.get(state, [reduxStateFields.auth, 'userInfo', 'user_id'])
  return { userId }
}

export default connect(mapStateToProps)(WebPush)
