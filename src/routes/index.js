import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from '../containers/App'
import Article from '../containers/Article'
import Blank from '../containers/Blank'
import Category from '../containers/Category'
import Home from '../containers/Home'
import Photography from '../containers/Photography'

export default function (history = browserHistory) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="category/:category" component={Category}/>
        <Route path="photography" component={Photography}/>
        <Route path="check" component={Blank}/>
        <Route path="a/:slug" component={Article}/>
      </Route>
    </Router>
  )
}
