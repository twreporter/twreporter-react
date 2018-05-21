/* eslint no-console:0 */
/* global __DEVELOPMENT__ */
import 'babel-polyfill'
import 'normalize.css'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import Router from 'react-router/lib/Router'
import axios from 'axios'
import browserHistory from 'react-router/lib/browserHistory'
import configureStore from './store/configure-store'
import createRoutes from './routes'
import match from 'react-router/lib/match'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { localStorageKeys } from '@twreporter/registration'

// TODO move applicationServerPublicKey to config
const applicationServerPublicKey = 'BHkStXEZjGMSdCHolgJAdmREB75lfi42OLNyRt4NRkLu_FEJYR-7Jv8hho1TSuYxTw2GqpYc3tLrotc55DfaNx0'
let swRegistration
let reduxState

if (window.__REDUX_STATE__) {
  reduxState = window.__REDUX_STATE__
}

function scrollToTopAndFirePageview() {
  if(window) {
    window.scrollTo(0, 0)
    // send Google Analytics Pageview event on router changed
    ReactGA.pageview(window.location.pathname)
  }
}

/**
 * Generate API URL
 * @param {string} path URL path
 * @param {bool} toEncode true for encoding URL
 * @return {string} full URL containing protocol, host, port and path
 */
function formAPIURL(path, toEncode = true) {
  const _path = toEncode ? encodeURI(path) : path
  const protocol = process.env.API_PROTOCOL || 'http'
  const host = process.env.API_HOST || 'localhost'
  const port = process.env.API_PORT || '8080'
  const version = process.env.API_DEFAULT_VERSION || '/v1'
  return `${protocol}://${host}:${port}${version}${_path}`
}

/**
 * The application server's public key is base 64 URL safe encoded.
 * We convert it to a UInt8Array as this is the expected input of the subscribe call.
 * @param {string} base64String Base 64 URL
 * @return {UInt8Array} Array contains uint8 values
 */
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
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
 * @param {Promise} A Promise resolves to true if subscribed, otherwise, false.
 */
function isWebPushSubscribed(endpoint) {
  return axios.get(formAPIURL(`/web-push/subscriptions?endpoint=${endpoint}`))
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

    if (_subscription.expirationTime !== null && typeof _subscription.expirationTime.toString === 'function') {
      data.expirationTime = _subscription.expirationTime.toString()
    }

    const browserLocalStorage = (typeof localStorage === 'undefined') ? null : localStorage
    try {
      const authInfo = JSON.parse(browserLocalStorage.getItem(localStorageKeys.authoInfo))
      if (authInfo.id) {
        data.userID = authInfo.id
      }
    } catch(err) {
      console.log('Getting authoInfo from localStorage and parsing it to JSON occurs error:', err)
    }

    return axios.post(formAPIURL('/web-push/subscriptions'), data)
      .catch((err) => {
        console.error('Sending web push subscription to server occurs error', err)
      })
  }
}

/**
 * Use service worker to subscribe the web push.
 */
function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey)
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
    .then(function (subscription) {
      console.log('Received PushSubscription: ', JSON.stringify(subscription))
      console.log('User is subscribed.')

      updateSubscriptionOnServer(subscription)
    })
    .catch(function (err) {
      console.log('Failed to subscribe the user: ', err)
    })
}


configureStore(browserHistory, reduxState)
  .then((store) => {
    const history = syncHistoryWithStore(browserHistory, store)
    const routes = createRoutes(history)

    // calling `match` is simply for side effects of
    // loading route/component code for the initial location
    // https://github.com/ReactTraining/react-router/blob/v3/docs/guides/ServerRendering.md#async-routes
    match({ history, routes }, (error, redirectLocation, renderProps) => {
      if (typeof window !== 'undefined') {
        // add Google Analytics
        ReactGA.initialize('UA-69336956-1')
        ReactGA.set({ page: window.location.pathname })
      }
      ReactDOM.hydrate((
        <Provider store={store}>
          <Router {...renderProps} onUpdate={scrollToTopAndFirePageview}/>
        </Provider>
      ), document.getElementById('root'))
    })
  })

// Setup service worker if browser supports
if('serviceWorker' in navigator && !__DEVELOPMENT__) {
  // register service worker
  navigator.serviceWorker.register('/sw.js').then(function (registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope)

    if ('Notification' in window) {
      // TODO request notification permission in the response of user gesture
      //if (Notification.permission === 'denied') {
      //  Notification.requestPermission((permission) => {
      //    if (permission === 'granted') {
      //      console.log('User grant the notification request')
      //    } else {
      //      console.log('User deny the notification request')
      //    }
      //  })
      //}
    } else {
      console.log('The browser does not support Notification')
    }

    if ('PushManager' in window) {
      swRegistration = registration
      // Set the initial subscription value
      swRegistration.pushManager.getSubscription()
        .then(function (subscription) {
          if (subscription !== null) {
            return isWebPushSubscribed(subscription.endpoint)
              .then((isSubscribed) => {
                if (!isSubscribed) {
                  subscribeUser()
                }
              })
          }
          subscribeUser()
        })
    } else {
      console.log('The browser does not support PushManager')
    }
  }, function (err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err)
  })
} else {
  console.log('Service worker is not registered.')
}
