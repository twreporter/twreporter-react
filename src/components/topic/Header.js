'use strict'
import React, { PropTypes } from 'react' // eslint-disable-next-line
import cx from 'classnames'
import { Link } from 'react-router'
import SearchBox from '../navigation/SearchBox'
import backToTopicIcon from '../../../static/asset/back-to-topic.svg'
import donationIcon from '../../../static/asset/donate.svg'
import logoIcon from '../../../static/asset/navbar-fixed-top-logo.svg'
import whiteDonationIcon from '../../../static/asset/white-donation-icon.svg'
import whiteLogoIcon from '../../../static/asset/logo-white-s.svg'
import style from './Header.scss'
import { BRIGHT, DARK, donatePath } from '../../constants/index'


// TBD fixed on the top needs to be implement
export default function Header({ isFixedToTop, title }) {
  const fixedStyle = {
    [style['fixed-top']]: isFixedToTop
  }
  const centerJsx = isFixedToTop ? (
    <div>
      <img src={backToTopicIcon} role="presentation" />
      <span>{title}</span>
    </div>
  ) : (
    <Link to="/">
      <div>
        <img src={whiteLogoIcon} />
      </div>
    </Link>
  )

  const rightJsx = isFixedToTop ? (
    <div className={style.search}>
      <img src={logoIcon} alt="報導者首頁" />
    </div>
  ) : (
    <div className={style.search}>
      <SearchBox
        theme={isFixedToTop ? BRIGHT : DARK}
      />
    </div>
  )


  return (
    <div className={cx(style.container, fixedStyle)}>
      <Link to={donatePath} target="_blank" title="贊助我們">
        <div className={style.donation}>
          <img src={isFixedToTop ? donationIcon : whiteDonationIcon} role="presentation" />
          <span>贊助我們</span>
        </div>
      </Link>
      {centerJsx}
      {rightJsx}
    </div>
  )
}

Header.propTypes = {
  isFixedToTop: PropTypes.bool,
  title: PropTypes.string
}

Header.defaultProps = {
  isFixedToTop: false,
  title: ''
}
