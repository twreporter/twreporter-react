import { connect } from 'react-redux'
import { LINK_PREFIX, OG_TYPE, SITE_META, SITE_NAME, TWITTER_CARD } from '../constants/index'
import { Waypoint } from 'react-waypoint'
import Authors from '../components/authors/authors'
import AuthorSearchBox from '../components/authors/author-search-box'
import Helmet from 'react-helmet'
import LoadingSpinner from '../components/Spinner'
import mq from '../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import Sponsor from '../components/Sponsor'
import styled from 'styled-components'
import twreporterRedux from '@twreporter/redux'
// @twreporter
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import { sourceHanSansTC as fontWeight } from '@twreporter/core/lib/constants/font-weight'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'
import values from 'lodash/values'

const { searchAuthorsIfNeeded } = twreporterRedux.actions
const reduxStateFields = twreporterRedux.reduxStateFields

const _ = {
  get,
  map,
  values
}

const defaultAuthorImage = {
  url: '/asset/author-default-img.svg',
  width: 500,
  height: 500
}

const responsePageStartFrom = 0

const ErrorMessage = styled.div`
  font-size: 18px;
  color: #808080;
  padding: 0 15px 0 15px;
  margin: 40px auto 70px auto;
  text-align: center;
`

const LoadMoreButton = styled.div`
  color: #c71b0a;
  cursor: pointer;
  font-size: 16px;
  font-weight: ${fontWeight.bold};
  margin: 20px auto 50px auto;
  padding: 0.6rem 0;
  text-align: center;
  transition: transform 0.2s;
  width: 10em;
  &:hover {
    transform: translateY(10%);
  }
`

const StyledSpinner = styled(LoadingSpinner)`
  margin: 30px auto;
  width: 40px;
  ${mq.desktopAndAbove`
    width: 66px;
  `}
  img {
    width: 100%;
    height: auto;
  }
`

class AuthorsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSearching: false
    }
    this.handleLoadmore = this.handleSensorSeen = this._fetchMoreAuthors.bind(this)
    this.setSearching = this._setSearching.bind(this)
  }

  componentDidMount() {
    if (!_.get(this._getAuthorsList(), 'items.length')) {
      this._fetchMoreAuthors()
    }
  }

  _getAuthorsList() {
    const { isSearching } = this.state
    return isSearching ? this.props.filteredAuthorsList : this.props.allAuthorsList
  }

  _fetchMoreAuthors() {
    return this.props.searchAuthorsIfNeeded('')
  }

  _setSearching(isSearching) {
    this.setState({
      isSearching
    })
  }

  _renderList() {
    const { isSearching } = this.state
    const authorsList = this._getAuthorsList()
    if (!_.get(authorsList, 'items.length')) {
      return (
        <ErrorMessage>
          {isSearching ? `找不到關鍵字為「${authorsList.keywords}」的結果` : '資料庫中無資料'}
        </ErrorMessage>
      )
    }
    return (
      <React.Fragment>
        {this._renderAuthors()}
        {isSearching ? null : this._renderLoadMore()}
      </React.Fragment>
    )
  }

  _renderAuthors() {
    const authorsList = this._getAuthorsList()
    const authorIds = _.get(authorsList, 'items', [])
    const { authorEntities } = this.props
    const authors = _.map(authorIds, authorId => {
      const sourceImage = _.get(authorEntities, [ authorId, 'thumbnail', 'image', 'resizedTargets', 'mobile' ])
      const image = sourceImage ? { ...sourceImage, url: replaceGCSUrlOrigin(sourceImage.url) } : defaultAuthorImage
      return {
        id: authorId,
        name: _.get(authorEntities, [ authorId, 'name' ], ''),
        image,
        url: `/author/${authorId}`
      }
    })
    return (
      <Authors authors={authors} />
    )
  }

  _renderServerError() {
    const errorMessage = _.get(this._getAuthorsList(), 'error.message')
    if (errorMessage) { console.error(errorMessage) } // eslint-disable-line no-console
    return (
      <ErrorMessage>
        抱歉，資料伺服器錯誤，請稍後再嘗試
      </ErrorMessage>
    )
  }

  _renderLoadMore() {
    const { hasMore, currentPage, isFetching } = this._getAuthorsList()
    if (isFetching || !hasMore) return null
    return (currentPage <= responsePageStartFrom) ?
      <LoadMoreButton onClick={this.handleLoadmore}>載入更多作者</LoadMoreButton> :
      <Waypoint
        onEnter={this.handleSensorSeen}
        fireOnRapidScroll
        scrollableAncestor="window"
      >
        <div></div>
      </Waypoint>
  }

  render() {
    const authorsList = this._getAuthorsList()
    const fullTitle = '作者列表' + SITE_NAME.SEPARATOR + SITE_NAME.FULL
    const canonical = `${SITE_META.URL_NO_SLASH}${LINK_PREFIX.AUTHORS}`
    return (
      <React.Fragment>
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
        <AuthorSearchBox
          sendSearchAuthors={this.props.searchAuthorsIfNeeded}
          setSearching={this.setSearching}
        />
        {this._renderList()}
        {authorsList.error ? this._renderServerError() : null}
        <StyledSpinner show={this._getAuthorsList().isFetching} alt="載入更多作者" />
        <Sponsor />
      </React.Fragment>
    )
  }
}

AuthorsList.propTypes = {
  // The props below are provided by redux
  allAuthorsList: PropTypes.object.isRequired,
  filteredAuthorsList: PropTypes.object.isRequired,
  authorEntities: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const authorEntities = _.get(state, [ reduxStateFields.entitiesForAuthors, 'authors' ], {})
  const allAuthorsList = _.get(state, reduxStateFields.authorsList, {})
  const filteredAuthorsList = _.get(state, reduxStateFields.searchedAuthorsList, {})
  return {
    authorEntities,
    allAuthorsList,
    filteredAuthorsList
  }
}

export { AuthorsList }
export default connect(mapStateToProps, { searchAuthorsIfNeeded })(AuthorsList)
