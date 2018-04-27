'use strict'
import BackToTopicIcon from '../../../static/asset/back-to-topic.svg'
import DonationIcon from '../../../static/asset/donate.svg'
import Link from 'react-router/lib/Link'
import LogoIcon from '../../../static/asset/navbar-fixed-top-logo.svg'
import PropTypes from 'prop-types'
import React from 'react' // eslint-disable-next-line
import SearchBox from '../navigation/SearchBox'
import WhiteDonationIcon from '../../../static/asset/white-donation-icon.svg'
import WhiteLogoIcon from '../../../static/asset/logo-white-s.svg'
import cx from 'classnames'
import constPageThemes from '../../constants/page-themes'
import style from './Header.scss'
import { donatePath } from '../../constants/index'


// TBD fixed on the top needs to be implement
export default function Header({ isFixedToTop, title }) {
  const fixedStyle = {
    [style['fixed-top']]: isFixedToTop
  }
  const centerJsx = isFixedToTop ? (
    <div>
      <BackToTopicIcon />
      <span>{title}</span>
    </div>
  ) : (
    <Link to="/">
      <div>
        <WhiteLogoIcon />
      </div>
    </Link>
  )

  const rightJsx = isFixedToTop ? (
    <div className={style.search}>
      <LogoIcon />
    </div>
  ) : (
    <div className={style.search}>
      <SearchBox
        theme={isFixedToTop ? constPageThemes.tone.bright : constPageThemes.tone.dark}
      />
    </div>
  )


  return (
    <div className={cx(style.container, fixedStyle)}>
      <Link to={donatePath} target="_blank" title="贊助我們">
        <div className={style.donation}>
          <div>
            { isFixedToTop ? <DonationIcon /> : <WhiteDonationIcon /> }
          </div>
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
