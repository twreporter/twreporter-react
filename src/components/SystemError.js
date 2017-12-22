'use strict'
import PropTypes from 'prop-types'
import React from 'react'
import { ErrorMessage } from '@twreporter/react-components/lib/error'
// lodash
import get from 'lodash/get'

const _ = {
  get
}

function SystemError({ error }) {
  let errorType = '500'
  if (_.get(error, 'status') === 404 || _.get(error, 'response.status') === 404) {
    errorType = '400'
  }
  return (
    <ErrorMessage errorType={errorType} />
  )
}

SystemError.propTypes = {
  error: PropTypes.object.isRequired
}

export default SystemError
