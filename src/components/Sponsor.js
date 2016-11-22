import React from 'react'
import { SPONSOR_TITLE, SPONSOR_TEXT, SPONSOR_BUTTON } from '../constants/sponsor'
import { donatePath } from '../constants/index'
import map from 'lodash/map'
import classNames from 'classnames'
import styles from './Sponsor.scss'

const _ = {
  map
}

const boxClasses = classNames(
  styles['sponsor-box'],
  'center-block'
)

const textClasses = classNames(
  styles['sponsor-text'],
  'center-block'
)

const buttonClasses = classNames(
  styles['sponsor-button']
)

class Sponsor extends React.Component {
  render() {
    return (<div className={boxClasses}>
      <div className={styles['sponsor-title']}>{SPONSOR_TITLE}</div>
      <div className={textClasses}>{_.map(SPONSOR_TEXT, (text,index) => <p key={index}>{text}</p>) }</div>
      <a href={donatePath} target="_blank" className={buttonClasses}>{SPONSOR_BUTTON}</a>
    </div>)
  }
}

export default Sponsor
