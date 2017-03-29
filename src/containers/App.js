'use strict'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import React, { Component } from 'react'
import enLocaleData from 'react-intl/locale-data/en'
import zhLocaleData from 'react-intl/locale-data/zh'
// import locale data
import { addLocaleData, IntlProvider } from 'react-intl'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import { types } from 'twreporter-registration'

// lodash
import get from 'lodash/get'

const _ = {
  get
}

addLocaleData(enLocaleData)
addLocaleData(zhLocaleData)
let currentLocale = 'zh-Hant'

class App extends Component {
  getChildContext() {
    return { location: this.props.location }
  }

  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
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

    // Check OAuth and store token
    const { oauth, deleteToken } = this.props
    if( typeof localStorage !== 'undefined' ) {
      if(oauth.authenticated) {
        const token = oauth.token
        localStorage.setItem('token', token)
        deleteToken()
      }
    }
  }

  render() {
    const pathname = _.get(this.props, 'location.pathname')

    return (
      <IntlProvider locale={currentLocale} defaultLocale="zh-Hant">
        <Layout
          header={this.props.header}
          pathname={pathname}
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

function mapStateToProps(state) {
  return {
    header: state.header,
    oauth: state.oauth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteToken: () => { dispatch({ type: types.DELETE_OTOKEN }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
