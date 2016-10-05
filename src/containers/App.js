'use strict'
import { PHOTOGRAPHY, PHOTOGRAPHY_ARTICLE, SITE_NAME } from '../constants/index'
// import locale data
import { addLocaleData, IntlProvider } from 'react-intl'
import { connect } from 'react-redux'
import DocumentMeta from 'react-document-meta'
import NavBar from '../containers/NavBar'
import React, { Component } from 'react'
import classNames from 'classnames'
import enLocaleData from 'react-intl/locale-data/en'
import zhLocaleData from 'react-intl/locale-data/zh'
import styles from './App.scss'

// lodash
import get from 'lodash/get'

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

  shouldComponentUpdate(nextProps) {
    if (get(this.props, 'location.pathname') !== get(nextProps, 'location.pathname') ||
      get(this.props, 'header.pageType') !== get(nextProps, 'header.pageType')) {
      return true
    }
    return false
  }

  render() {
    const pathname = this.props.location.pathname
    let pageType = get(this.props, [ 'header', 'pageType' ])
    const meta = {
      title: SITE_NAME.FULL
    }

    return (
      <DocumentMeta {...meta}>
        <IntlProvider locale={currentLocale} defaultLocale="zh-Hant">
          <div className={classNames(styles.app, { [styles.photography]: pageType === PHOTOGRAPHY_ARTICLE || pageType === PHOTOGRAPHY })}>
            <NavBar
              bgStyle={pathname === '/photography' ? 'dark' : 'light'}
              path={pathname}/>
            {this.props.children}
          </div>
        </IntlProvider>
      </DocumentMeta>
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
