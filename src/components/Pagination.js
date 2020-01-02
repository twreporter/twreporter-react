import { withRouter } from 'react-router-dom'
import Pagination from '@twreporter/react-components/lib/pagination'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import loggerFactory from '../logger'
import qs from 'qs'
// lodash
import get from 'lodash/get'
import merge from 'lodash/merge'

const logger = loggerFactory.getLogger()

const _ = {
  get,
  merge
}

class EnhancedPagination extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClickPage = this._handleClickPage.bind(this)
    this.handleClickPrev = this._handleClickPrev.bind(this)
    this.handleClickNext = this._handleClickNext.bind(this)
  }

  _pushTo(to) {
    try {
      this.props.history.push(to)
    } catch (err) {
      logger.errorReport({
        report:err,
        message: `Error on history.push(${to}).`
      })
    }
  }

  /**
   *
   * @param {Object} query
   * @returns {string} search string as `?q=xxx`
   * @memberof EnhancedPagination
   */
  _mergeQueryToSearch(query) {
    const currentSearch = _.get(this.props, 'location.search', '')
    const currentQuery = qs.parse(currentSearch, { ignoreQueryPrefix: true })
    const nextQuery = _.merge({}, currentQuery, query)
    const nextSearch = qs.stringify(nextQuery, { addQueryPrefix: true })
    return nextSearch
  }

  _handleClickPage(e) {
    e.preventDefault()
    const text = _.get(e, 'target.innerText')
    const page = parseInt(text, 10)
    return this._pushTo({
      pathname: _.get(this.props, 'location.pathname'),
      search: this._mergeQueryToSearch({ page })
    })
  }

  _handleClickPrev(e) {
    e.preventDefault()
    return this._pushTo({
      pathname: _.get(this.props, 'location.pathname'),
      search: this._mergeQueryToSearch({ page: this.props.currentPage - 1 })
    })
  }

  _handleClickNext(e) {
    e.preventDefault()
    return this._pushTo({
      pathname: _.get(this.props, 'location.pathname'),
      search: this._mergeQueryToSearch({ page: this.props.currentPage + 1 })
    })
  }

  render() {
    return (
      <Pagination
        handleClickPrev={this.handleClickPrev}
        handleClickPage={this.handleClickPage}
        handleClickNext={this.handleClickNext}
        {...this.props}
      />)
  }
}

EnhancedPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  // The props below are provided by `withRouter`
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(EnhancedPagination)
