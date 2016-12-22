'use strict'

import { LOADING_MORE_AUTHORS, NO_RESULT, REQUEST_PAGE_START_FROM } from '../constants/authors-list'
import { fetchNextPageAuthors, sendSearchAuthors } from '../actions/authors'

import { AUTHORS_LIST } from '../constants/page-types'
import AuthorSearchBox from '../components/authors/AuthorSearchBox'
import Footer from '../components/Footer'
import { LOAD_MORE_AUTHORS_BTN } from '../constants/authors-list'
import React from 'react'
import ShownAuthors from '../components/authors/ShownAuthors'
import Sponsor from '../components/Sponsor'
import VisibilitySensor from 'react-visibility-sensor'
import classNames from 'classnames'
import { connect } from 'react-redux'
import get from 'lodash/get'
import map from 'lodash/map'
import { setPageType } from '../actions/header'
import styles from '../components/authors/AuthorList.scss'
import values from 'lodash/values'

const _ = {
  get: get,
  map: map,
  values: values
}

class AuthorsList extends React.Component {
  static fetchData({ store }) {
    return store.dispatch(fetchNextPageAuthors())
  }

  constructor(props) {
    super(props)
  }

  componentDisMount() {
    if (this.props.currentPage === (REQUEST_PAGE_START_FROM -1) ) {
      this.props.fetchNextPageAuthors()
    }
    setPageType(AUTHORS_LIST)
  }

  render() {
    const { keywords, entities, authorsInList, isFinish, isFetching, currentPage, fetchNextPageAuthors, sendSearchAuthors } = this.props

    // Transform entities.authors into the format: [{ id, authorName, authorImg, authorUrl },{...},...]
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
        fetchNextPageAuthors()
      }
      return
    }

    // Page elements display options
    const loadmoreBtnDisplay = (currentPage <= REQUEST_PAGE_START_FROM && !isFinish && !isFetching)
    const sensorDisplay = ((currentPage > REQUEST_PAGE_START_FROM) && !isFinish)
    const loaderDisply = isFetching
    const isSearchResultEmpty = (authorsArray.length <= 0)
    const loadmoreBtn = <div className={classNames(styles['load-more'], 'text-center')} onClick={fetchNextPageAuthors}>{LOAD_MORE_AUTHORS_BTN}</div>

    return (
      <div className={styles['author-list-container']}>
        <AuthorSearchBox sendSearchAuthors={sendSearchAuthors}/>
        {isSearchResultEmpty ? <div className={styles['no-result']}>{NO_RESULT(keywords)}</div> : <ShownAuthors filteredAuthors={authorsArray} />}
        {!loaderDisply ? null : <div className={styles['loader-container']}><div className={styles['loader']}>{LOADING_MORE_AUTHORS}</div></div>}
        {!loadmoreBtnDisplay ? null : loadmoreBtn}
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
export default connect(mapStateToProps, { fetchNextPageAuthors, sendSearchAuthors })(AuthorsList)
