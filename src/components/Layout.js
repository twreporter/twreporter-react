'use strict'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import NavBar from './navigation/NavBar'
import styles from './Layout.scss'
import { DARK } from '../constants/index'

// lodash
import get from 'lodash/get'

const _ = {
  get
}

class Layout extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    let pageTheme = _.get(this.props, 'header.pageTheme')

    return (
      <div className={classNames(styles.theme, { [styles.photography]: pageTheme === DARK })}>
        <NavBar
          {...this.props}
        />
        {this.props.children}
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
