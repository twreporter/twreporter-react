'use strict'
import styles from './PromotionBanner.scss'
import PropTypes from 'prop-types'
import React from 'react' // eslint-disable-next-line

export default function PromotionBanner({ headline, iconImgSrc, bgImgSrc, subtitle, title }) {
  const bgStyle = {
    background: bgImgSrc ? `url(${bgImgSrc}) no-repeat center center` : '',
    backgroundSize: 'cover'
  }
  return (
    <div className={styles.container} style={bgStyle}>
      <div>
        { headline ? <div className={styles.headline}>{headline}</div> : null}
        <div className={styles['title-block']}>
          { iconImgSrc ? <img src={iconImgSrc} /> : null }
          <span>{title}</span>
        </div>
        <div>{subtitle}</div>
      </div>
    </div>
  )
}

PromotionBanner.propTypes = {
  headline: PropTypes.string,
  iconImgSrc: PropTypes.string,
  bgImgSrc: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string
}

PromotionBanner.defaultProps = {
  headline: '',
  iconImgSrc: '',
  bgImgSrc: '',
  subtitle: '',
  title: ''
}
