import React from 'react'
import { IndexRoute, Route } from 'react-router'
import App from './containers/App'
import Category from './containers/Category'
import Home from './containers/Home'
import NotFound from './containers/NotFound'

export default (
    <Route path="/" component={App}>
        { /* Home (main) route */ }
        <IndexRoute component={Home}/>
        { /* Routes requiring login */ }
        { /* <Route onEnter={requireLogin}>
            <Route path="loginSuccess" component={LoginSuccess}/>
        </Route>
        */ }
        { /* Catch all route */ }
        <Route path="*" component={NotFound} status={404} />     
  </Route>
)
