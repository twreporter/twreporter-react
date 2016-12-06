'use strict'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import NavBar from './navigation/NavBar'
import styles from './Layout.scss'
import { PHOTOGRAPHY_ARTICLE_STYLE } from '../constants/index'

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
    let pageType = _.get(this.props, 'pageType')

    return (
      <div className={classNames(styles.theme, { [styles.photography]: pageType === PHOTOGRAPHY_ARTICLE_STYLE })}>
        <NavBar
          {...this.props}
        />
        {this.props.children}
      </div>
    )
  }
}

Layout.propTypes = {
  articleId: PropTypes.string,
  readPercent: PropTypes.number,
  pageTopic: PropTypes.string,
  pageType: PropTypes.string,
  pathname: PropTypes.string.isRequired
}

Layout.defaultProps = {
  articleId: '',
  readPercent: 0,
  pageTopic: '',
  pageType: '',
  pathname: ''
}

export default Layout
