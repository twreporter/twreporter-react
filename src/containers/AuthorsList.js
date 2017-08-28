'use strict'

import * as constants from '../constants/authors-list'

import { AUTHORS_LIST, BRIGHT, LINK_PREFIX, OG_TYPE, SITE_META, SITE_NAME, TWITTER_CARD } from '../constants/index'
import React, { PropTypes } from 'react'

import AuthorSearchBox from '../components/authors/AuthorSearchBox'
import Helmet from 'react-helmet'
import LoadingSpinner from '../components/Spinner'
import ShownAuthors from '../components/authors/ShownAuthors'
import Sponsor from '../components/Sponsor'
import VisibilitySensor from 'react-visibility-sensor'
import authorDefaultImg from '../../static/asset/author-default-img.svg'
import classNames from 'classnames'
import { connect } from 'react-redux'
import get from 'lodash/get'
import map from 'lodash/map'
import { searchAuthorsIfNeeded } from '../actions/authors'
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
    this._changeListTo = this._changeListTo.bind(this)
    this._handleLoadmore = this._handleLoadmore.bind(this)
    this._handleSeen = this._handleSeen.bind(this)
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

  // Callback for sensor being seen
  _handleSeen(isVisible) {
    const whichAuthorsListToRender = this.state.whichAuthorsListToRender
    const authorsListDataToRender = _.get(this.props, `${whichAuthorsListToRender}`, {})
    const currentPage = _.get(authorsListDataToRender, 'currentPage', 0)
    if ((currentPage > constants.NUMBER_OF_FIRST_RESPONSE_PAGE) && isVisible) {
      return this._handleLoadmore()
    }
  }

  // Callback for loadmore button being clicked
  _handleLoadmore() {
    return this.props.searchAuthorsIfNeeded('')
  }

  _changeListTo(listType) {
    this.setState({ whichAuthorsListToRender: listType })
  }

  render() {
    const whichAuthorsListToRender = _.get(this.state, 'whichAuthorsListToRender', constants.AUTHORS_LIST)
    const authorsListDataToRender = _.get(this.props, `${whichAuthorsListToRender}`, {})
    const currentPage = _.get(authorsListDataToRender, 'currentPage', 0),
      keywords = _.get(authorsListDataToRender, 'keywords', ''),
      hasMore = _.get(authorsListDataToRender, 'hasMore', false),
      isFetching = _.get(authorsListDataToRender, 'isFetching', false),
      authorsIdList = _.get(authorsListDataToRender, 'items', [])
    const authorsEntities = _.get(this.props, 'authorsEntities', {})

    function authorIdToDataObj(id) {
      const authorName = _.get(authorsEntities, `${id}.name`, '')
      const authorImgUrl = _.get(authorsEntities, `${id}.thumbnail.image.resizedTargets.mobile.url`) || authorDefaultImg
      const authorItemObject = {
        id,
        authorName,
        authorImgUrl,
        authorUrl: `/author/${id}`
      }
      return authorItemObject
    }
    const authorsArray = _.map(authorsIdList, authorIdToDataObj)

    // Page elements display options
    const isLoadmoreBtnDisplayed    = (whichAuthorsListToRender === constants.AUTHORS_LIST) && hasMore && !isFetching && (currentPage <= constants.NUMBER_OF_FIRST_RESPONSE_PAGE)
    const isSensorActive         = (whichAuthorsListToRender === constants.AUTHORS_LIST) && hasMore && !isFetching && (currentPage > constants.NUMBER_OF_FIRST_RESPONSE_PAGE)
    const isSearchError = (whichAuthorsListToRender === constants.SEARCHED_AUTHORS_LIST) && _.get(authorsListDataToRender, 'error')
    const isListAllError = (whichAuthorsListToRender === constants.AUTHORS_LIST) && _.get(authorsListDataToRender, 'error')
    const isNoSearchResultDisplayed = (whichAuthorsListToRender === constants.SEARCHED_AUTHORS_LIST) && (authorsArray.length <= 0) && !isFetching && !isSearchError
    const LoadmoreBtn = <div className={classNames(styles['load-more'], 'text-center')} onClick={this._handleLoadmore}>{constants.LOAD_MORE_AUTHORS_BTN}</div>

    const fullTitle = constants.PAGE_TITLE + SITE_NAME.SEPARATOR + SITE_NAME.FULL
    const canonical = `${SITE_META.URL_NO_SLASH}${LINK_PREFIX.AUTHORS}`

    return (
      <div className={styles['author-list-container']}>
        <Helmet
          title={fullTitle}
          link={[
            { rel: 'canonical', href: canonical }
          ]}
          meta={[
            { name: 'description', content: SITE_META.DESC },
            { name: 'twitter:title', content: fullTitle },
            { name: 'twitter:description', content: SITE_META.DESC },
            { name: 'twitter:image', content: SITE_META.OG_IMAGE },
            { name: 'twitter:card', content: TWITTER_CARD.SUMMARY },
            { property: 'og:title', content: fullTitle },
            { property: 'og:description', content: SITE_META.DESC },
            { property: 'og:image', content: SITE_META.OG_IMAGE },
            { property: 'og:type', content: OG_TYPE.WEBSITE },
            { property: 'og:url', content: canonical },
            { property: 'og:rich_attachment', content: 'true' }
          ]}
        />
        <AuthorSearchBox sendSearchAuthors={this.props.searchAuthorsIfNeeded} changeListTo={this._changeListTo} />
        {!isSearchError ? null : <div className={styles['no-result']}>{constants.SEARCH_AUTHORS_FAILURE_MESSAGE}</div>}
        {!isListAllError ? null : <div className={styles['no-result']}>{constants.LIST_ALL_AUTHORS_FAILURE_MESSAGE}</div>}
        {isNoSearchResultDisplayed ? <div className={styles['no-result']}>{constants.NO_RESULT(keywords)}</div> : <ShownAuthors filteredAuthors={authorsArray} />}
        {!isFetching ? null : <LoadingSpinner className={styles['loading-spinner']} alt={constants.LOADING_MORE_AUTHORS} />}
        {!isLoadmoreBtnDisplayed ? null : LoadmoreBtn}
        <VisibilitySensor className={styles['sensor']} onChange={this._handleSeen} partialVisibility={true} active={isSensorActive} />
      <Sponsor />
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
    authorsEntities: _.get(state, 'entitiesForAuthors.authors', {}),
    authorsList: _.get(state, constants.AUTHORS_LIST, {}),
    searchedAuthorsList: _.get(state, constants.SEARCHED_AUTHORS_LIST, {})
  }
}

export { AuthorsList }
export default connect(mapStateToProps, { searchAuthorsIfNeeded, setHeaderInfo })(AuthorsList)
