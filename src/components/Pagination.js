import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import qs from 'qs'
// utils
import loggerFactory from '../logger'
// @twreporter
import Pagination from '@twreporter/react-components/lib/pagination'
// lodash
import get from 'lodash/get'
import merge from 'lodash/merge'

const logger = loggerFactory.getLogger()

const _ = {
  get,
  merge,
}

const EnhancedPagination = ({
  history,
  location,
  currentPage,
  totalPages,
  ...props
}) => {
  const pathname = useMemo(() => _.get(location, 'pathname'), [location])
  const pushTo = to => {
    try {
      history.push(to)
    } catch (err) {
      logger.errorReport({
        report: err,
        message: `Error on history.push(${to}).`,
      })
    }
  }

  /**
   *
   * @param {Object} query
   * @returns {string} search string as `?q=xxx`
   * @memberof EnhancedPagination
   */
  const mergeQueryToSearch = query => {
    const currentSearch = _.get(location, 'search', '')
    const currentQuery = qs.parse(currentSearch, { ignoreQueryPrefix: true })
    const nextQuery = _.merge({}, currentQuery, query)
    const nextSearch = qs.stringify(nextQuery, { addQueryPrefix: true })
    return nextSearch
  }

  const handleClickPage = e => {
    e.preventDefault()
    const text = _.get(e, 'target.innerText')
    const page = parseInt(text, 10)
    return pushTo({
      pathname,
      search: mergeQueryToSearch({ page }),
    })
  }

  const handleClickPrev = e => {
    e.preventDefault()
    return pushTo({
      pathname,
      search: mergeQueryToSearch({ page: currentPage - 1 }),
    })
  }

  const handleClickNext = e => {
    e.preventDefault()
    return pushTo({
      pathname,
      search: mergeQueryToSearch({ page: currentPage + 1 }),
    })
  }

  return (
    <Pagination
      handleClickPrev={handleClickPrev}
      handleClickPage={handleClickPage}
      handleClickNext={handleClickNext}
      currentPage={currentPage}
      totalPages={totalPages}
      {...props}
    />
  )
}

EnhancedPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  // The props below are provided by `withRouter`
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(EnhancedPagination)
