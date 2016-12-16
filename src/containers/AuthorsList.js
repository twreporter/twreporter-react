'use strict'

import { LOADING_MORE_AUTHORS, REQUEST_PAGE_START_FROM, NO_RESULT } from '../constants/authors-list'

import Footer from '../components/Footer'
import LoadMore from '../components/authors/LoadMore'
import React from 'react'
import ShownAuthors from '../components/authors/ShownAuthors'
import AuthorSearchBox from '../components/authors/AuthorSearchBox'
import Sponsor from '../components/Sponsor'
import VisibilitySensor from 'react-visibility-sensor'
import { connect } from 'react-redux'
import { fetchAuthorsIfNeeded, sendSearchAuthors } from '../actions/authors'
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
    const { keywords, entities, authorsInList, isFinish, isFetching, currentPage, fetchAuthorsIfNeeded, sendSearchAuthors } = this.props

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

    const loadmoreBtnDisplay = (currentPage <= REQUEST_PAGE_START_FROM && !isFinish)
    const sensorDisplay = ((currentPage > REQUEST_PAGE_START_FROM) && !isFinish)
    const loaderDisply = isFetching
    const isResultEmpty = (authorsArray.length <= 0)

    return (
      <div className={styles['author-list-container']}>
        <AuthorSearchBox sendSearchAuthors={sendSearchAuthors}/>
        {isResultEmpty ? <div className={styles['no-result']}>{NO_RESULT(keywords)}</div> : <ShownAuthors filteredAuthors={authorsArray} />}
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
  const authorsList = _.get(state, 'authorsList', {})
  return {
    entities: state.entities || {},
    authorsInList: authorsList.authorsInList,
    isFinish: authorsList.isFinish,
    isFetching: authorsList.isFetching,
    currentPage: authorsList.currentPage,
    keywords: authorsList.keywords
  }
}

export { AuthorsList }
export default connect(mapStateToProps, { fetchAuthorsIfNeeded, sendSearchAuthors })(AuthorsList)
