'use strict'
import React, { PureComponent } from 'react'
import enLocaleData from 'react-intl/locale-data/en'
import zhLocaleData from 'react-intl/locale-data/zh'
// import locale data
import { addLocaleData, IntlProvider } from 'react-intl'
import { connect } from 'react-redux'
import { signOutAction } from '@twreporter/registration'
import Layout from '../components/Layout'

// lodash
import get from 'lodash/get'

const _ = {
  get
}

addLocaleData(enLocaleData)
addLocaleData(zhLocaleData)
let currentLocale = 'zh-Hant'

class App extends PureComponent {
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
    const pathname = _.get(this.props, 'location.pathname')
    return (
      <IntlProvider locale={currentLocale} defaultLocale="zh-Hant">
        <Layout
          header={this.props.header}
          pathname={pathname}
          signOutAction={this.props.signOutAction}
          ifAuthenticated={this.props.ifAuthenticated}
        >
          {this.props.children}
        </Layout>
      </IntlProvider>
    )
  }
}

App.childContextTypes = {
  location: React.PropTypes.object
}

App.defaultProps = {
  signOutAction: () => {},
  ifAuthenticated: false
}

App.propTypes = {
  signOutAction: React.PropTypes.func,
  ifAuthenticated: React.PropTypes.bool
}

function mapStateToProps(state) {
  return {
    header: state.header,
    ifAuthenticated: _.get(state, [ 'auth', 'authenticated' ], false)
  }
}

export default connect(mapStateToProps, { signOutAction })(App)
