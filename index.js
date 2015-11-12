import 'babel-core/polyfill'

import React from 'react'
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'

import configureStore from './store/configureStore'
import createRoutes from './routes'
import { Provider } from 'react-redux'
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

ReactDOM.render((
    <Provider store={store}>
         { createRoutes(history) }
    </Provider>
), document.getElementById('root'));

