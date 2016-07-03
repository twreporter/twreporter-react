import NavBar from '../containers/NavBar'
import React, { Component } from 'react'

// import locale data
import { addLocaleData, IntlProvider } from 'react-intl'
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
    return (
      <IntlProvider locale={currentLocale} defaultLocale="zh-Hant">
        <div className={styles.app}>
          <NavBar
            bgStyle={pathname === '/photography' ? 'dark' : 'light'}
            path={pathname}/>
          {this.props.children}
        </div>
      </IntlProvider>
    )
  }
}

App.childContextTypes = {
    location: React.PropTypes.object
}

export default App
