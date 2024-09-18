'use strict'
import PropTypes from 'prop-types'
import React from 'react'
import { ErrorMessage } from '@twreporter/react-components/lib/error'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const SystemError = ({ error }) => {
  let errorType = '500'
  if (_.get(error, 'statusCode') === 404) {
    errorType = '404'
  }
  return <ErrorMessage errorType={errorType} />
}

SystemError.propTypes = {
  error: PropTypes.object.isRequired,
}

export default SystemError
