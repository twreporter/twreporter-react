'use strict'
import PropTypes from 'prop-types'
import React from 'react'
import commonStyles from './article/Common.scss'
import cx from 'classnames'
import refreshBt from '../../static/asset/refresh_bt.svg'
import styles from './SystemError.scss'
import { ERROR_MESSAGE_404, ERROR_MESSAGE_500 } from '../constants/index'

// lodash
import get from 'lodash/get'

const _ = {
  get
}

function SystemError({ error }) {
  const refreshPage = () => {
    // on client side
    if (window) {
      window.location.reload()
    }
  }

  let style = {
    marginTop: 35
  }

  let errorMessageJsx = _.get(error, 'status', 500) === 404  || _.get(error, 'response.status', 500) === 404 ? (
    <h1 style={style}>{ERROR_MESSAGE_404}</h1>
  ) : (
    <div className={commonStyles['inner-block']}>
      <div className={cx('center-block', 'text-center', styles.message)}>
        {ERROR_MESSAGE_500}
      </div>
        <div className={cx(styles['refresh-bt'], 'text-center')}>
          <img src={refreshBt} width="30px" height="30px" onClick={refreshPage} style={{ cursor: 'pointer' }}/>
        </div>
    </div>
  )
  return (
    <div className="container" style={{ height: 300, marginTop: 50 }}>
      {errorMessageJsx}
    </div>
  )
}

SystemError.propTypes = {
  error: PropTypes.object.isRequired
}

export default SystemError
