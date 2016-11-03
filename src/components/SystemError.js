'use strict'
import React from 'react'
// lodash
import get from 'lodash/get'

const _ = {
  get
}

function SystemError({ error }) {
  let style = {
    marginTop: 35
  }
  let errorMessageJsx = _.get(error, 'status', 500) === 404 ? (
    <h1 style={style}>抱歉，網頁不存在，請確認網址是否正確。</h1>
  ) : (
    <h1 style={style}>抱歉，系統繁忙中，請重新整理頁面。</h1>
  )
  return (
    <div className="container">
      {errorMessageJsx}
    </div>
  )
}

SystemError.propTypes = {
  error: React.PropTypes.object.isRequired
}

export default SystemError
