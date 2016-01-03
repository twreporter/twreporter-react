import React, { Component } from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import Home from '../containers/Home'
import Category from '../containers/Category'
import Photography from '../containers/Photography'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

class App extends Component {
  render() {
    const pathname = this.props.location.pathname
    return (
      <div>
        <NavBar
          bgStyle={pathname === '/photography' ? 'dark' : 'light'}
          path={pathname}/>
          {this.props.children}
          <Footer/>
      </div>
    )
  }
}

export default function (history) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="category/:category" component={Category}/>
        <Route path="photography" component={Photography}/>
      </Route>
    </Router>
  )
}
