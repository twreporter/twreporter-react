import React from 'react'
import { Router, Route } from 'react-router'

import Home from '../containers/Home'
import Category from '../containers/Category'

export default function (history) {
  return (
    <Router history={history}>
      <Route path="/" component={Home}/>
      <Route path="/category/:category" component={Category}/>
    </Router>
  )
}
