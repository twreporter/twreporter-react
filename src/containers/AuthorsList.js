'use strict'

import { LOADING_MORE_AUTHORS, NO_RESULT, PAGE_TITLE, NUMBER_OF_FIRST_RESPONSE_PAGE } from '../constants/authors-list'
import { searchAuthorsIfNeeded } from '../actions/authors'

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
    this.state = {
      whichAuthorsListToRender: 'authorsList'
    }
  }

  componentDidMount() {
    const { setHeaderInfo, authorsList, searchAuthorsIfNeeded } = this.props
    setHeaderInfo({
      pageTheme: LIGHT,
      pageType: AUTHORS_LIST,
      pageTitle: PAGE_TITLE
    })
    if ((this.state.whichAuthorsListToRender==='authorsList') && !authorsList.isFetching && authorsList.currentPage < NUMBER_OF_FIRST_RESPONSE_PAGE) {
      searchAuthorsIfNeeded('')
    }
  }

  render() {
    const searchAuthorsIfNeeded = this.props.searchAuthorsIfNeeded
    const whichAuthorsListToRender = _.get(this.state, 'whichAuthorsListToRender', 'authorsList')
    const authorsListData = _.get(this.props, `${whichAuthorsListToRender}`, {})
    const currentPage = _.get(authorsListData, 'currentPage', 0),
      keywords = _.get(authorsListData, 'keywords', ''),
      hasMore = _.get(authorsListData, 'hasMore', false),
      isFetching = _.get(authorsListData, 'isFetching', false)
    const authorsIdList = _.get(authorsListData, 'items', [])
    const authorsEntities = _.get(this.props, 'authorsEntities', {})
    // Transform entities.authors into the format: [{ id, authorName, authorImg, authorUrl },{...},...]
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
      if (currentPage>NUMBER_OF_FIRST_RESPONSE_PAGE && isVisible === true) {
        return searchAuthorsIfNeeded('')
      }
    }
    // Callback for loadmore button being clicked
    let handleClickLoadmore = () => {
      return searchAuthorsIfNeeded('')
    }
    
    let changeListTo = (listType) => {
      if (listType === 'authorsList' || listType === 'searchedAuthorsList') {
        this.setState({ whichAuthorsListToRender: listType })
      }
    }

    // Page elements display options
    const shouldLoadmoreBtnDisplay    = (whichAuthorsListToRender === 'authorsList') && hasMore && !isFetching && (currentPage <= NUMBER_OF_FIRST_RESPONSE_PAGE)
    const shouldSensorDisplay         = (whichAuthorsListToRender === 'authorsList') && hasMore && !isFetching && (currentPage > NUMBER_OF_FIRST_RESPONSE_PAGE)
    const shouldLoaderDisplay         = isFetching
    const shouldNoSearchResultDisplay = (whichAuthorsListToRender === 'searchedAuthorsList') && (authorsArray.length <= 0) && !isFetching
    const loadmoreBtn = <div className={classNames(styles['load-more'], 'text-center')} onClick={handleClickLoadmore}>{LOAD_MORE_AUTHORS_BTN}</div>

    return (
      <div className={styles['author-list-container']}>
        <AuthorSearchBox sendSearchAuthors={searchAuthorsIfNeeded} changeListTo={changeListTo} />
        {shouldNoSearchResultDisplay ? <div className={styles['no-result']}>{NO_RESULT(keywords)}</div> : <ShownAuthors filteredAuthors={authorsArray} />}
        {!shouldLoaderDisplay ? null : <div className={styles['loader-container']}><div className={styles['loader']}>{LOADING_MORE_AUTHORS}</div></div>}
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

AuthorsList.propTypes = {
  authorsList: PropTypes.object.isRequired,
  searchedAuthorsList: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    authorsEntities: _.get(state, 'entities.authors', {}),
    authorsList: _.get(state, 'authorsList', {}),
    searchedAuthorsList: _.get(state, 'searchedAuthorsList', {})
  }
}

export { AuthorsList }
export default connect(mapStateToProps, { searchAuthorsIfNeeded, setHeaderInfo })(AuthorsList)
