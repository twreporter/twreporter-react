'use strict'
import Footer from '@twreporter/react-components/lib/footer'
import Header from '@twreporter/react-components/lib/header'
import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import styles from './Layout.scss'
import { DARK } from '../constants/index'

// lodash
import get from 'lodash/get'

const _ = {
  get
}

class Layout extends PureComponent {
  render() {
    const pageTheme = _.get(this.props, 'header.pageTheme')


    return (
      <div className={classNames(styles.theme, { [styles.photography]: pageTheme === DARK })}>
        <Header
          isIndex={false}
          pageTheme={pageTheme}
          pathName={this.props.pathname}
          signOutAction={this.props.signOutAction}
          ifAuthenticated={this.props.ifAuthenticated}
        />
        {this.props.children}
        <Footer pageTheme={pageTheme} />
      </div>
    )
  }
}

// ifAuthenticate and SignOutAction are required for Header component
Layout.propTypes = {
  header: PropTypes.object,
  pathname: PropTypes.string.isRequired,
  ifAuthenticated: PropTypes.bool.isRequired,
  signOutAction: PropTypes.func.isRequired
}

Layout.defaultProps = {
  header: {},
  pathname: ''
}

export default Layout
