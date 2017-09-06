import { Pagination } from 'twreporter-react-components'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import get from 'lodash/get'

const _ = {
  get
}

class EnhancedPagination extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClickPage = this._handleClickPage.bind(this)
    this.handleClickPrev = this._handleClickPrev.bind(this)
    this.handleClickNext = this._handleClickNext.bind(this)
    this.pushLocation = this._pushLocation.bind(this)
  }
  _pushLocation(to) {
    /* work with react-router */
    const routerPush = _.get(this.context, 'router.push')
    if (typeof routerPush === 'function') {
      return routerPush(to)
    }
  }
  _handleClickPage(e) {
    e.preventDefault()
    const text = _.get(e, 'target.innerText')
    const page = parseInt(text, 10)
    return this.pushLocation({
      pathname: this.props.pathname,
      query: {
        page
      }
    })
  }
  _handleClickPrev(e) {
    e.preventDefault()
    return this.pushLocation({
      pathname: this.props.pathname,
      query: {
        page: this.props.currentPage - 1
      }
    })
  }
  _handleClickNext(e) {
    e.preventDefault()
    return this.pushLocation({
      pathname: this.props.pathname,
      query: {
        page: this.props.currentPage + 1
      }
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

EnhancedPagination.contextTypes = {
  router: PropTypes.object.isRequired
}

EnhancedPagination.propTypes = {
  pathname: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
}

export default EnhancedPagination
