'use strict'
import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import styles from './Layout.scss'
import { DARK } from '../constants/index'
import { Header } from 'twreporter-react-components'
import { Footer } from 'twreporter-react-components'

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
        <Header isIndex={false} pageTheme={pageTheme} pathName={this.props.pathname}/>
        {this.props.children}
        <Footer pageTheme={pageTheme} />
      </div>
    )
  }
}

Layout.propTypes = {
  header: PropTypes.object,
  pathname: PropTypes.string.isRequired
}

Layout.defaultProps = {
  header: {},
  pathname: ''
}

export default Layout
