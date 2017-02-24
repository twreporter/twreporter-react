'use strict'

import * as constants from '../constants/authors-list'
import { searchAuthorsIfNeeded } from '../actions/authors'
import { AUTHORS_LIST } from '../constants/page-types'
import AuthorSearchBox from '../components/authors/AuthorSearchBox'
import Footer from '../components/Footer'
import { BRIGHT } from '../constants/page-themes'
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
    this.state = {
      whichAuthorsListToRender: constants.AUTHORS_LIST
    }
  }

  componentWillMount() {
    return this.props.setHeaderInfo({
      pageTheme: BRIGHT,
      pageType: AUTHORS_LIST,
      pageTitle: constants.PAGE_TITLE
    })
  }

  componentDidMount() {
    const { authorsList, searchAuthorsIfNeeded } = this.props
    if (!authorsList.isFetching && authorsList.currentPage < constants.NUMBER_OF_FIRST_RESPONSE_PAGE) {
      return searchAuthorsIfNeeded('') // Fetch first page of authors list if server rendering was not trigger or didn't get the data
    }
  }

  render() {
    const searchAuthorsIfNeeded = this.props.searchAuthorsIfNeeded
    const whichAuthorsListToRender = _.get(this.state, 'whichAuthorsListToRender', constants.AUTHORS_LIST)
    const authorsListDataToRender = _.get(this.props, `${whichAuthorsListToRender}`, {})
    const currentPage = _.get(authorsListDataToRender, 'currentPage', 0),
      keywords = _.get(authorsListDataToRender, 'keywords', ''),
      hasMore = _.get(authorsListDataToRender, 'hasMore', false),
      isFetching = _.get(authorsListDataToRender, 'isFetching', false),
      authorsIdList = _.get(authorsListDataToRender, 'items', [])
    const authorsEntities = _.get(this.props, 'authorsEntities', {})
    // Transform entities.authors into the format: [{ id, authorName, authorImg, authorUrl },{...},...]
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
    function iteratee(id) {
      const authorName = wrapBeforeFirstFullwidthBracket(_.get(authorsEntities, `${id}.name`, ''))
      let authorImg = _.get(authorsEntities, `${id}.image`, '')
      authorImg = authorImg ? authorImg : authorDefaultImg // for some authors' api data 'image' may be null
      let authorItemObject = {
        id,
        authorName,
        authorImg,
        authorUrl: id ? `/author/${id}` : ''
      }
      return authorItemObject
    }
    const authorsArray = _.map(authorsIdList, iteratee)

    // Callback for sensor being seen
    let handleSeen = (isVisible) => {
      if (currentPage>constants.NUMBER_OF_FIRST_RESPONSE_PAGE && isVisible === true) {
        return handleLoadmore()
      }
    }
    // Callback for loadmore button being clicked
    let handleLoadmore = () => {
      return searchAuthorsIfNeeded('')
    }

    let changeListTo = (listType) => {
      this.setState({ whichAuthorsListToRender: listType })
    }

    // Page elements display options
    const shouldLoadmoreBtnDisplay    = (whichAuthorsListToRender === constants.AUTHORS_LIST) && hasMore && !isFetching && (currentPage <= constants.NUMBER_OF_FIRST_RESPONSE_PAGE)
    const shouldSensorDisplay         = (whichAuthorsListToRender === constants.AUTHORS_LIST) && hasMore && !isFetching && (currentPage > constants.NUMBER_OF_FIRST_RESPONSE_PAGE)
    const shouldLoaderDisplay         = isFetching  // For displaying the loading spinner (loader)
    const isSearchError = (whichAuthorsListToRender === constants.SEARCHED_AUTHORS_LIST) && _.get(authorsListDataToRender, 'error') 
    const isListAllError = (whichAuthorsListToRender === constants.AUTHORS_LIST) && _.get(authorsListDataToRender, 'error')
    const shouldNoSearchResultDisplay = (whichAuthorsListToRender === constants.SEARCHED_AUTHORS_LIST) && (authorsArray.length <= 0) && !isFetching && !isSearchError
    const loadmoreBtn = <div className={classNames(styles['load-more'], 'text-center')} onClick={handleLoadmore}>{constants.LOAD_MORE_AUTHORS_BTN}</div>

    return (
      <div className={styles['author-list-container']}>
        <AuthorSearchBox sendSearchAuthors={searchAuthorsIfNeeded} changeListTo={changeListTo} />
        {!isSearchError ? null : <div className={styles['no-result']}>{constants.SEARCH_AUTHORS_FAILURE_MESSAGE}</div>}
        {!isListAllError ? null : <div className={styles['no-result']}>{constants.LIST_ALL_AUTHORS_FAILURE_MESSAGE}</div>}
        {shouldNoSearchResultDisplay ? <div className={styles['no-result']}>{constants.NO_RESULT(keywords)}</div> : <ShownAuthors filteredAuthors={authorsArray} />}
        {!shouldLoaderDisplay ? null : <div className={styles['loader-container']}><div className={styles['loader']}>{constants.LOADING_MORE_AUTHORS}</div></div>}  
        {!shouldLoadmoreBtnDisplay ? null : loadmoreBtn}
        {!shouldSensorDisplay ? null :
        <VisibilitySensor onChange={handleSeen} partialVisibility={true}>
          <div className={styles['sensor']}></div>
        </VisibilitySensor>}
      <Sponsor />
      <Footer />
      </div>
    )
  }
}

AuthorsList.propTypes = {
  authorsList: PropTypes.object.isRequired,
  searchedAuthorsList: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    authorsEntities: _.get(state, 'entities.authors', {}),
    authorsList: _.get(state, constants.AUTHORS_LIST, {}),
    searchedAuthorsList: _.get(state, constants.SEARCHED_AUTHORS_LIST, {})
  }
}

export { AuthorsList }
export default connect(mapStateToProps, { searchAuthorsIfNeeded, setHeaderInfo })(AuthorsList)
