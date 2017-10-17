'use strict'
import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import styles from './Layout.scss'
import { DARK } from '../constants/index'
import { Header } from '@twreporter/react-components'
import { Footer } from '@twreporter/react-components'

// lodash
import get from 'lodash/get'

const _ = {
  get
}

//testing
import { NAVBAR_POSITION_UPON } from '../constants/page-themes'
import { mockArticle } from '../constants/mock-data'

// Remember to pass following params to header and footer
// fontColor, pgcolor
// isIndex, logoColor to header,
// LogoColor: 'dark' or 'bright'


class Layout extends PureComponent {
  render() {
    const pageTheme = _.get(this.props, 'header.pageTheme')

    return (
      <div className={classNames(styles.theme, { [styles.photography]: pageTheme === DARK })}>
        { mockArticle.theme.headerPosition === NAVBAR_POSITION_UPON && this.props.device === 'desktop' ?  null : <Header isIndex={false} pageTheme={pageTheme} pathName={this.props.pathname} headerPosition={mockArticle.theme.headerPosition} /> }
        {this.props.children}
        <Footer pageTheme={pageTheme} />
      </div>
    )
  }
}

Layout.propTypes = {
  header: PropTypes.object,
  pathname: PropTypes.string.isRequired,
  device: PropTypes.string
}

Layout.defaultProps = {
  header: {},
  pathname: '',
  device: ''
}

export default Layout
