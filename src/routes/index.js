import React, { Component } from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import Article from '../containers/Article'
import Category from '../containers/Category'
import Home from '../containers/Home'
import NavBar from '../components/NavBar'
import Photography from '../containers/Photography'


// import locale data
import { addLocaleData, IntlProvider } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import zhLocaleData from 'react-intl/locale-data/zh'
addLocaleData(enLocaleData)
addLocaleData(zhLocaleData)
let currentLocale = 'zh-Hant'


class App extends Component {
  componentWillMount() {
    // set current locale
    if (process.env.BROWSER) {
      currentLocale = navigator.language
      addLocaleData({
        locale: navigator.language,
        parentLocale: navigator.language.split('-')[0]
      })
    }
  }

  render() {
    const pathname = this.props.location.pathname
    return (
      <IntlProvider locale={currentLocale} defaultLocale="zh-Hant">
        <div>
          <NavBar
            bgStyle={pathname === '/photography' ? 'dark' : 'light'}
            path={pathname}/>
          {this.props.children}
        </div>
      </IntlProvider>
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
        <Route path="a/:slug" component={Article}/>
      </Route>
    </Router>
  )
}
