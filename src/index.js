import 'babel-core/polyfill'

import React from 'react'
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'

import configureStore from './store/configureStore'
import createRoutes from './routes'
import { Provider } from 'react-redux'
import DeviceProvider from './components/DeviceProvider'
import { createStore, combineReducers } from 'redux'
import { RoutingContext, match } from 'react-router'

const history = createBrowserHistory();

let reduxState;
if (window.__REDUX_STATE__) {
    try {
        reduxState = JSON.parse(unescape(__REDUX_STATE__));
    } catch (e) {
    }
}

const store = configureStore(reduxState);
const device = store.getState().device

ReactDOM.render((
    <Provider store={store}>
      <DeviceProvider device={device}>
         { createRoutes(history) }
      </DeviceProvider>
    </Provider>
), document.getElementById('root'));

