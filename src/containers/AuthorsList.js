'use strict'

import { LOADING_MORE_AUTHORS, NO_RESULT, PAGE_TITLE, REQUEST_PAGE_START_FROM } from '../constants/authors-list'
import { fetchNextPageAuthors, sendSearchAuthors } from '../actions/authors'

import { AUTHORS_LIST } from '../constants/page-types'
import AuthorSearchBox from '../components/authors/AuthorSearchBox'
import Footer from '../components/Footer'
import { LIGHT } from '../constants/page-themes'
import { LOAD_MORE_AUTHORS_BTN } from '../constants/authors-list'
import React from 'react'
import ShownAuthors from '../components/authors/ShownAuthors'
import Sponsor from '../components/Sponsor'
import VisibilitySensor from 'react-visibility-sensor'
import authorDefaultImg from '../../static/asset/author-default-img.svg'
import classNames from 'classnames'
import { connect } from 'react-redux'
import get from 'lodash/get'
import map from 'lodash/map'
import { setHeaderInfo } from '../actions/header'
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

  componentDidMount() {
    const { currentPage, setHeaderInfo, fetchNextPageAuthors } = this.props
    if (currentPage === (REQUEST_PAGE_START_FROM -1) ) {
      fetchNextPageAuthors()
    }
    setHeaderInfo({
      pageTheme: LIGHT,
      pageType: AUTHORS_LIST,
      pageTitle: PAGE_TITLE
    })
  }

  render() {
    const { keywords, entities, authorsInList, hasMore, isFetching, currentPage, fetchNextPageAuthors, sendSearchAuthors } = this.props

    // Transform entities.authors into the format: [{ id, authorName, authorImg, authorUrl },{...},...]
    const authorsEntities = entities.authors
    function iteratee(id) {
      const authorName = wrapBeforeFirstFullwidthBracket(_.get(authorsEntities, `${id}.name`, ''))
      let authorImg = _.get(authorsEntities, `${id}.image`)
      // for some authors' api data 'image' may be null
      authorImg = authorImg ? authorImg : authorDefaultImg
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
    const loadmoreBtnDisplay = (currentPage <= REQUEST_PAGE_START_FROM && hasMore && !isFetching)
    const sensorDisplay = ((currentPage > REQUEST_PAGE_START_FROM) && hasMore)
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

function wrapBeforeFirstFullwidthBracket(string) {
  if (typeof string === 'string') {
    const leftBrackets = [ '（', '【', '〔', '《', '〈', '｛', '『', '「' ]
    for (let i=0, length=leftBrackets.length; i<length; i++) {
      let bracketLocation = string.indexOf(leftBrackets[i])
      if (bracketLocation > 0) {
        return string.slice(0, bracketLocation) + '\n' + string.slice(bracketLocation, string.length)
      }
    }
  }
  return string
}

function mapStateToProps(state) {
  const authorsList = _.get(state, 'authorsList', {})
  return {
    entities: state.entities || {},
    authorsInList: authorsList.authorsInList,
    hasMore: authorsList.hasMore,
    isFetching: authorsList.isFetching,
    currentPage: authorsList.currentPage,
    keywords: authorsList.keywords
  }
}

export { AuthorsList }
export default connect(mapStateToProps, { fetchNextPageAuthors, sendSearchAuthors, setHeaderInfo })(AuthorsList)
