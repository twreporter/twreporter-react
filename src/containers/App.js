'use strict'
import { PHOTOGRAPHY, PHOTOGRAPHY_ARTICLE, SITE_NAME } from '../constants/index'
// import locale data
import { addLocaleData, IntlProvider } from 'react-intl'
import { connect } from 'react-redux'
import _ from 'lodash'
import DocumentTitle from 'react-document-title'
import NavBar from '../containers/NavBar'
import React, { Component } from 'react'
import classNames from 'classnames'
import enLocaleData from 'react-intl/locale-data/en'
import zhLocaleData from 'react-intl/locale-data/zh'
import styles from './App.scss'

addLocaleData(enLocaleData)
addLocaleData(zhLocaleData)
let currentLocale = 'zh-Hant'

class App extends Component {
  getChildContext() {
    return { location: this.props.location }
  }

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
    let pageType = _.get(this.props, [ 'header', 'pageType' ])
    return (
      <DocumentTitle title={SITE_NAME.FULL}>
        <IntlProvider locale={currentLocale} defaultLocale="zh-Hant">
          <div className={classNames(styles.app, { [styles.photography]: pageType === PHOTOGRAPHY_ARTICLE || pageType === PHOTOGRAPHY })}>
            <NavBar
              bgStyle={pathname === '/photography' ? 'dark' : 'light'}
              path={pathname}/>
            {this.props.children}
          </div>
        </IntlProvider>
      </DocumentTitle>
    )
  }
}

App.childContextTypes = {
  location: React.PropTypes.object
}

function mapStateToProps(state) {
  return {
    header: state.header
  }
}

export default connect(mapStateToProps)(App)
