'use strict'
import React from 'React'
import printIcon from '../../../static/asset/print.svg'
import styles from '../article/ShareBt.scss'
import { PRINT_CH_STR } from '../../constants/'

const PrintButton = () =>{
  function _print() {
    window.print()
  }

  return (
    <div className={styles['share-bt-container']} onClick={_print}>
      <button className={styles.bt}>
        <img src={printIcon} alt={PRINT_CH_STR} />
      </button>
    </div>
  )
}

export default PrintButton
