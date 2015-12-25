import React from 'react'
import { Router, Route } from 'react-router'

import Home from '../containers/Home'
import Category from '../containers/Category'
import Photography from '../containers/Photography'

export default function (history) {
  return (
    <Router history={history}>
      <Route path="/" component={Home}/>
      <Route path="/category/:category" component={Category}/>
      <Route path="/photography" component={Photography}/>
    </Router>
  )
}
