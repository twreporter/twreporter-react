import React from 'react'
import styles from './authors/AuthorList.scss'
import { SPONSOR_TITLE, SPONSOR_TEXT, SPONSOR_BUTTON } from '../constants/sponsor'
import map from 'lodash/map'

const _ = {
  map
}

const Sponsor = () =>{
  return (<div className={styles['sponsor-box']}>
    <div className={styles['sponsor-title']}>{SPONSOR_TITLE}</div>
    <div className={styles['sponsor-text']}>{_.map(SPONSOR_TEXT, (text,index) => <p key={index}>{text}</p>) }</div>
    <div className={styles['sponsor-button']}>{SPONSOR_BUTTON}</div>
  </div>)
}

export default Sponsor
