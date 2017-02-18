'use strict'

import { LOADING_MORE_AUTHORS, NO_RESULT, PAGE_TITLE, NUMBER_OF_FIRST_RESPONSE_PAGE } from '../constants/authors-list'
import { searchAuthorsIfNeeded, setAuthorsListType } from '../actions/authors'

import { AUTHORS_LIST } from '../constants/page-types'
import AuthorSearchBox from '../components/authors/AuthorSearchBox'
import Footer from '../components/Footer'
import { LIGHT } from '../constants/page-themes'
import { LOAD_MORE_AUTHORS_BTN } from '../constants/authors-list'
import React, { PropTypes } from 'react'
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
    return store.dispatch(searchAuthorsIfNeeded(''))
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { setHeaderInfo } = this.props
    setHeaderInfo({
      pageTheme: LIGHT,
      pageType: AUTHORS_LIST,
      pageTitle: PAGE_TITLE
    })
  }

  render() {
    const { keywords, entities, authorsInList, hasMore, isFetching, currentPage, searchAuthorsIfNeeded, setAuthorsListType } = this.props

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
      if (currentPage>NUMBER_OF_FIRST_RESPONSE_PAGE && isVisible === true) {
        return searchAuthorsIfNeeded(keywords)
      }
    }

    let handleClickLoadmore = () => {
      return searchAuthorsIfNeeded(keywords)
    }

    // Page elements display options
    const loadmoreBtnDisplay = (currentPage <= NUMBER_OF_FIRST_RESPONSE_PAGE && hasMore && !isFetching)
    const sensorDisplay = ((currentPage > NUMBER_OF_FIRST_RESPONSE_PAGE) && hasMore)
    const loaderDisply = isFetching
    const isSearchResultEmpty = (authorsArray.length <= 0)
    const loadmoreBtn = <div className={classNames(styles['load-more'], 'text-center')} onClick={handleClickLoadmore}>{LOAD_MORE_AUTHORS_BTN}</div>

    return (
      <div className={styles['author-list-container']}>
        <AuthorSearchBox sendSearchAuthors={searchAuthorsIfNeeded} setAuthorsListType={setAuthorsListType}/>
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
  const typeOfAuthorsListToRender = _.get(state, 'authorsList.typeOfAuthorsListToRender', 'allAuthors')
  const authorsList = _.get(state, [ typeOfAuthorsListToRender ], {})
  return {
    entities: state.entities || {},
    authorsInList: _.get(authorsList, 'authorsInList'),
    hasMore: _.get(authorsList, 'hasMore'),
    isFetching: _.get(authorsList, 'isFetching'),
    currentPage: _.get(authorsList, 'currentPage'),
    keywords: _.get(authorsList, 'keywords'),
    typeOfAuthorsListToRender
  }
}

AuthorsList.propTypes = {
  entities: PropTypes.object.isRequired,
  authorsInList: PropTypes.array.isRequired,
  hasMore: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  keywords: PropTypes.string.isRequired
}

export { AuthorsList }
export default connect(mapStateToProps, { searchAuthorsIfNeeded, setHeaderInfo, setAuthorsListType })(AuthorsList)
