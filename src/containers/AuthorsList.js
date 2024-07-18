import { connect } from 'react-redux'
import { Waypoint } from 'react-waypoint'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
// utils
import mq from '../utils/media-query'
import loggerFactory from '../logger'
// components
import Authors from '../components/authors/authors'
import AuthorSearchBox from '../components/authors/author-search-box'
import LoadingSpinner from '../components/Spinner'
import Sponsor from '../components/Sponsor'
// constants
import siteMeta from '../constants/site-meta'
// @twreporter
import twreporterRedux from '@twreporter/redux'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import { fontWeight } from '@twreporter/core/lib/constants/font'
import {
  colorGrayscale,
  colorBrand,
} from '@twreporter/core/lib/constants/color'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'
import values from 'lodash/values'

const logger = loggerFactory.getLogger()

const { searchAuthorsIfNeeded } = twreporterRedux.actions
const reduxStateFields = twreporterRedux.reduxStateFields

const _ = {
  get,
  map,
  values,
}

const defaultAuthorImage = {
  url: '/asset/author-default-img.svg',
  width: 500,
  height: 500,
}

const responsePageStartFrom = 0

const ErrorMessage = styled.div`
  font-size: 18px;
  color: ${colorGrayscale.gray600};
  padding: 0 15px 0 15px;
  margin: 40px auto 70px auto;
  text-align: center;
`

const LoadMoreButton = styled.div`
  color: ${colorBrand.heavy};
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
      isSearching: false,
    }
    this.handleLoadmore = this.handleSensorSeen = this._fetchMoreAuthors.bind(
      this
    )
    this.setSearching = this._setSearching.bind(this)
  }

  componentDidMount() {
    if (!_.get(this._getAuthorsList(), 'items.length')) {
      this._fetchMoreAuthors()
    }
  }

  searchAuthorsWithCatch = keywords => {
    const { searchAuthorsIfNeeded } = this.props
    return searchAuthorsIfNeeded(keywords).catch(failAction => {
      // TODO render alter message
      logger.errorReport({
        report: _.get(failAction, 'payload.error'),
        message: `Error to search authors with keywords: '${keywords}'.`,
      })
    })
  }

  _getAuthorsList() {
    const { isSearching } = this.state
    return isSearching
      ? this.props.filteredAuthorsList
      : this.props.allAuthorsList
  }

  _fetchMoreAuthors() {
    return this.searchAuthorsWithCatch('')
  }

  _setSearching(isSearching) {
    this.setState({
      isSearching,
    })
  }

  _renderList() {
    const { isSearching } = this.state
    const authorsList = this._getAuthorsList()
    if (!_.get(authorsList, 'items.length')) {
      return (
        <ErrorMessage>
          {isSearching
            ? `找不到關鍵字為「${authorsList.keywords}」的結果`
            : '資料庫中無資料'}
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
      const sourceImage = _.get(authorEntities, [
        authorId,
        'thumbnail',
        'resizedTargets',
        'mobile',
      ])
      const image = sourceImage
        ? { ...sourceImage, url: replaceGCSUrlOrigin(sourceImage.url) }
        : defaultAuthorImage
      return {
        id: authorId,
        name: _.get(authorEntities, [authorId, 'name'], ''),
        image,
        url: `/author/${authorId}`,
      }
    })
    return <Authors authors={authors} />
  }

  _renderServerError() {
    const errorMessage = _.get(this._getAuthorsList(), 'error.message')
    if (errorMessage) {
      logger.errorReport({
        message: `Fail to render author list page due to server error: ${errorMessage}`,
      })
    }
    return <ErrorMessage>抱歉，資料伺服器錯誤，請稍後再嘗試</ErrorMessage>
  }

  _renderLoadMore() {
    const { hasMore, currentPage, isFetching } = this._getAuthorsList()
    if (isFetching || !hasMore) return null
    return currentPage <= responsePageStartFrom ? (
      <LoadMoreButton onClick={this.handleLoadmore}>
        載入更多作者
      </LoadMoreButton>
    ) : (
      <Waypoint
        onEnter={this.handleSensorSeen}
        fireOnRapidScroll
        scrollableAncestor="window"
      >
        <div></div>
      </Waypoint>
    )
  }

  render() {
    const authorsList = this._getAuthorsList()
    const fullTitle = '作者列表' + siteMeta.name.separator + siteMeta.name.full
    const canonical = `${siteMeta.urlOrigin}/authors`
    return (
      <Fragment>
        <Helmet
          prioritizeSeoTags
          title={fullTitle}
          link={[{ rel: 'canonical', href: canonical }]}
          meta={[
            { name: 'description', content: siteMeta.desc },
            { name: 'twitter:title', content: fullTitle },
            { name: 'twitter:description', content: siteMeta.desc },
            { name: 'twitter:image', content: siteMeta.ogImage.url },
            { name: 'twitter:card', content: 'summary' },
            { property: 'og:title', content: fullTitle },
            { property: 'og:description', content: siteMeta.desc },
            { property: 'og:image', content: siteMeta.ogImage.url },
            { property: 'og:image:width', content: siteMeta.ogImage.width },
            { property: 'og:image:height', content: siteMeta.ogImage.height },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: canonical },
            { property: 'og:rich_attachment', content: 'true' },
          ]}
        />
        <AuthorSearchBox
          sendSearchAuthors={this.searchAuthorsWithCatch}
          setSearching={this.setSearching}
        />
        {this._renderList()}
        {authorsList.error ? this._renderServerError() : null}
        <StyledSpinner
          show={this._getAuthorsList().isFetching}
          alt="載入更多作者"
        />
        <Sponsor />
      </Fragment>
    )
  }
}

AuthorsList.propTypes = {
  // The props below are provided by redux
  allAuthorsList: PropTypes.object.isRequired,
  filteredAuthorsList: PropTypes.object.isRequired,
  authorEntities: PropTypes.object.isRequired,
  searchAuthorsIfNeeded: PropTypes.func,
}

function mapStateToProps(state) {
  const authorEntities = _.get(
    state,
    [reduxStateFields.entitiesForAuthors, 'authors'],
    {}
  )
  const allAuthorsList = _.get(state, reduxStateFields.authorsList, {})
  const filteredAuthorsList = _.get(
    state,
    reduxStateFields.searchedAuthorsList,
    {}
  )
  return {
    authorEntities,
    allAuthorsList,
    filteredAuthorsList,
  }
}

export { AuthorsList }
export default connect(
  mapStateToProps,
  { searchAuthorsIfNeeded }
)(AuthorsList)
