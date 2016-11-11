'use strict'

import React from 'react'
import { fetchAuthorsIfNeeded, loadMoreAuthors } from '../actions/authors'
import { connect } from 'react-redux'
import ShownAuthors from '../components/authors/ShownAuthors'
import get from 'lodash/get'
import map from 'lodash/map'
import values from 'lodash/values'
import styles from '../components/authors/AuthorList.scss'
import LoadMore from '../components/authors/LoadMore'

const _ = {
  get: get,
  map: map,
  values: values
}

// import { connect } from 'react-redux'

class AuthorsList extends React.Component {
  // fetchData({ store }) {
  //   return store.dispatch(fetchAuthorsIfNeeded())
  // }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchAuthorsIfNeeded()
  }

  // componentWillReceiveProps(nextProps) {
  //   const { fetchAuthorsIfNeeded } = nextProps
  //   fetchAuthorsIfNeeded()
  // }

  render() {
    const _onIncrement = this.props.onIncrement
    function iteratee(oldValue) {
      let newValue = {
        id: get(oldValue, 'id'),
        authorName: get(oldValue, 'name'),
        authorImg: get(oldValue, 'image', 'http://i.imgur.com/Clyp3sKb.jpg'),
        authorUrl: get(oldValue, [ 'links', 'self', 'href' ])
      }
      return newValue
    }
    const authorsArray = _.map(_.values(this.props.entities.authors), iteratee)
    let isFinish = (this.props.finalPage <= this.props.currentPage) ? true : false
    return (
      <div className={styles['author-list-container']}>
        <ShownAuthors filteredAuthors={authorsArray} />
        <LoadMore isFinish={isFinish} onIncrement={_onIncrement} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const currentPage = _.get(state, [ 'authorsList', 'meta', 'page' ])
  const maxResultsPerPage = _.get(state, [ 'authorsList', 'meta', 'maxResults' ])
  const totalResults = _.get(state, [ 'authorsList', 'meta', 'total' ])
  const finalPage = Math.ceil(totalResults/maxResultsPerPage)
  return {
    entities: state.entities || {},
    currentPage,
    finalPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => {dispatch(loadMoreAuthors())},
    fetchAuthorsIfNeeded: () => {dispatch(fetchAuthorsIfNeeded())}
  }
}

export { AuthorsList }
export default connect(mapStateToProps, mapDispatchToProps)(AuthorsList)
