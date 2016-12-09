'use strict'

import { LOADING_MORE_AUTHORS, REQUEST_PAGE_START_FROM, SEARCHING_AUTHOR_NAME } from '../constants/authors-list'

import Footer from '../components/Footer'
import LoadMore from '../components/authors/LoadMore'
import React from 'react'
import ShownAuthors from '../components/authors/ShownAuthors'
import Sponsor from '../components/Sponsor'
import VisibilitySensor from 'react-visibility-sensor'
import { connect } from 'react-redux'
import { fetchAuthorsIfNeeded } from '../actions/authors'
import get from 'lodash/get'
import map from 'lodash/map'
import styles from '../components/authors/AuthorList.scss'
import values from 'lodash/values'

const _ = {
  get: get,
  map: map,
  values: values
}

class AuthorsList extends React.Component {
  static fetchData({ store }) {
    return store.dispatch(fetchAuthorsIfNeeded())
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.currentPage === (REQUEST_PAGE_START_FROM -1) ) {
      this.props.fetchAuthorsIfNeeded()
    }
  }

  render() {
    const { entities, authorsInList, isFinish, isFetching, currentPage, fetchAuthorsIfNeeded } = this.props // eslint-disable-line no-unused-vars

    //Tran entities.authors to the format: [{ id, authorName, authorImg, authorUrl },{...},...]
    const authorsEntities = entities.authors
    function iteratee(id) {
      const authorName = _.get(authorsEntities, `${id}.name`, '')
      let authorImg = _.get(authorsEntities, `${id}.image`)
      // for some authors' api data 'image' may be null
      authorImg = authorImg ? authorImg : 'http://i.imgur.com/Clyp3sKb.jpg'
      let authorItemObject = {
        id,
        authorName,
        authorImg,
        authorUrl: id ? `/author/${id}` : ''
      }
      return authorItemObject
    }
    const authorsArray = _.map(authorsInList, iteratee)

    // Callback for sensor is triggered to seen
    let handleSeen = (isVisible) => {
      if (currentPage>REQUEST_PAGE_START_FROM && isVisible === true) {
        fetchAuthorsIfNeeded()
      }
      return
    }

    // Page bottom display options

    let loadmoreBtnDisplay = false
    let sensorDisplay = false
    let loaderDisply = false

    loadmoreBtnDisplay = (currentPage <= REQUEST_PAGE_START_FROM) ? true : false
    console.log(`loadmoreBtnDisplay: ${loadmoreBtnDisplay}`)
    sensorDisplay = ((currentPage > REQUEST_PAGE_START_FROM) && !isFinish) ? true : false
    loaderDisply = isFetching ? true : false

    // function handleClickLoadmore() {
    //   ReactDOM.findDOMNode(this.bt)
    //   fetchAuthorsIfNeeded()
    // }
    return (
      <div className={styles['author-list-container']}>
        <input className={styles['filter-input']} placeholder={SEARCHING_AUTHOR_NAME} ></input>
        <ShownAuthors filteredAuthors={authorsArray} />
        {!loaderDisply ? null : <div className={styles['loader']}>{LOADING_MORE_AUTHORS}</div>}
        {!loadmoreBtnDisplay ? null : <LoadMore fetchAuthorsIfNeeded={fetchAuthorsIfNeeded}/>}
        {!sensorDisplay ? null :
        <VisibilitySensor onChange={handleSeen} partialVisibility={true}>
          <div className={styles['sensor']}></div>
        </VisibilitySensor>}
      <Sponsor />
      <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    entities: state.entities || {},
    authorsInList: state.authorsList.authorsInList,
    isFinish: state.authorsList.isFinish,
    isFetching: state.authorsList.isFetching,
    currentPage: state.authorsList.currentPage
  }
}

export { AuthorsList }
export default connect(mapStateToProps, { fetchAuthorsIfNeeded })(AuthorsList)
