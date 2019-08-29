'use strict'

import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/denormalize-articles'
import { LINK_PREFIX, OG_TYPE, SITE_META, SITE_NAME, TWITTER_CARD } from '../constants/index'
import AuthorCollection from '../components/authorPage/AuthorCollection'
import AuthorData from '../components/authorPage/AuthorData'
import classNames from 'classnames'
import commonStyles from '../components/article/Common.scss'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React from 'react'
import Sponsor from '../components/Sponsor'
// @twreporter
import twreporterRedux from '@twreporter/redux'
// lodash
import get from 'lodash/get'

const { fetchAuthorCollectionIfNeeded, fetchAuthorDetails } = twreporterRedux.actions

const _ = {
  get
}

const authorDefaultImg = {
  url: '/asset/author-default-img.svg',
  width: 500,
  height: 500
}

class Author extends React.Component {
  static propTypes = {
    author: PropTypes.object,
    collections: PropTypes.arrayOf(PropTypes.object),
    collectionMeta: PropTypes.shape({
      hasMore: PropTypes.bool.isRequired,
      isFetching: PropTypes.bool.isRequired,
      currentPage: PropTypes.number.isRequired,
      totalResults: PropTypes.number
    })
  }

  static defaultProps = {
    totalResults: 0,
    author: {},
    collections: []
  }

  componentDidMount() {
    const authorId = _.get(this.props, 'match.params.authorId')
    if (authorId) {
      this.props.fetchAuthorCollectionIfNeeded(authorId)
      const { authorIsFull } = this.props
      if (!authorIsFull) {
        this.props.fetchAuthorDetails(authorId)
      }
    }
  }

  handleLoadmore = () => {
    const { fetchAuthorCollectionIfNeeded, author } = this.props
    fetchAuthorCollectionIfNeeded(author.id)
  }

  render() {
    const { author, collections, collectionMeta } = this.props
    const fullTitle = author.name + SITE_NAME.SEPARATOR + SITE_NAME.FULL
    const canonical = `${SITE_META.URL_NO_SLASH}${LINK_PREFIX.AUTHOR}${author.id}`
    const pureTextBio = author.bio ? author.bio.replace(/<[^>]*>?/gm, '') : '' // pure text only
    return (
      <React.Fragment>
        <Helmet
          title={fullTitle}
          link={[
            { rel: 'canonical', href: canonical }
          ]}
          meta={[
            { name: 'description', content: pureTextBio },
            { name: 'twitter:title', content: fullTitle },
            { name: 'twitter:description', content: pureTextBio },
            { name: 'twitter:image', content: SITE_META.OG_IMAGE },
            { name: 'twitter:card', content: TWITTER_CARD.SUMMARY },
            { property: 'og:title', content: fullTitle },
            { property: 'og:description', content: pureTextBio },
            { property: 'og:image', content: SITE_META.OG_IMAGE },
            { property: 'og:type', content: OG_TYPE.PROFILE },
            { property: 'og:url', content: canonical },
            { property: 'og:rich_attachment', content: 'true' }
          ]}
        />
        <AuthorData authorData={author} />
        <div className={classNames('inner-max', 'center-block', commonStyles['components'])}>
          <AuthorCollection
            relateds={collections}
            currentId={author.id}
            hasMore={collectionMeta.hasMore}
            isFetching={collectionMeta.isFetching}
            currentPage={collectionMeta.currentPage}
            handleLoadmore={this.handleLoadmore}
            totalResults={collectionMeta.totalResults}
          />
        </div>
        <Sponsor />
      </React.Fragment>)
  }
}

function mapStateToProps(state, ownProps) {
  const authorId = _.get(ownProps, 'match.params.authorId')
  const articlesByAuthor = _.get(state, 'articlesByAuthor', {})
  const entities = _.get(state, 'entitiesForAuthors', {})
  const authorIsFull = _.get(entities, [ authorId, 'full' ], false)
  const { hasMore, isFetching, currentPage, collectIndexList, totalResults } = _.get(articlesByAuthor, authorId, {})
  const collections = denormalizeArticles(collectIndexList, entities)
  const authorEntity = _.get(entities, [ 'authors', authorId ], {})
  const author = {
    id: authorId,
    name: _.get(authorEntity, 'name') || '',
    title: _.get(authorEntity, 'jobTitle') || '',
    image: _.get(authorEntity, 'thumbnail.image.resizedTargets.mobile', authorDefaultImg),
    mail: _.get(authorEntity, 'email') || '',
    bio: _.get(authorEntity, 'bio.html' || '')
  }
  return {
    author,
    authorIsFull,
    collections,
    collectionMeta: {
      hasMore,
      isFetching,
      currentPage,
      totalResults
    }
  }
}

export default connect(mapStateToProps, { fetchAuthorCollectionIfNeeded, fetchAuthorDetails })(Author)
