import { createStore, applyMiddleware, compose } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import rootReducer from '../reducers'

const routermiddleware = routerMiddleware(browserHistory)

const finalCreateStore = compose(
  applyMiddleware(thunk, api),
  applyMiddleware(routermiddleware)
)(createStore)

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState)
}
