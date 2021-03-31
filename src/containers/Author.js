import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/denormalize-articles'
import AuthorCollection from '../components/author-page/author-collection'
import AuthorData from '../components/author-page/author-data'
import Helmet from 'react-helmet'
import loggerFactory from '../logger'
import PropTypes from 'prop-types'
import React from 'react'
import Sponsor from '../components/Sponsor'
import siteMeta from '../constants/site-meta'
// @twreporter
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import twreporterRedux from '@twreporter/redux'
// lodash
import get from 'lodash/get'

const {
  fetchAuthorCollectionIfNeeded,
  fetchAuthorDetails,
} = twreporterRedux.actions

const _ = {
  get,
}

const authorDefaultImg = {
  url: '/asset/author-default-img.svg',
  width: 500,
  height: 500,
}

const defaultEmail = 'contact@twreporter.org'

const logger = loggerFactory.getLogger()

class Author extends React.Component {
  static propTypes = {
    author: PropTypes.object,
    collections: PropTypes.arrayOf(PropTypes.object),
    collectionMeta: PropTypes.shape({
      hasMore: PropTypes.bool.isRequired,
      isFetching: PropTypes.bool.isRequired,
      currentPage: PropTypes.number.isRequired,
      totalResults: PropTypes.number,
    }),
    authorIsFull: PropTypes.bool,
    fetchAuthorCollectionIfNeeded: PropTypes.func,
    fetchAuthorDetails: PropTypes.func,
  }

  static defaultProps = {
    totalResults: 0,
    author: {},
    collections: [],
  }

  componentDidMount() {
    const authorId = _.get(this.props, 'match.params.authorId')
    if (authorId) {
      this.fetchAuthorCollectionIfNeededWithCatch(authorId)
      const { authorIsFull } = this.props
      if (!authorIsFull) {
        return this.fetchAuthorDetailsWithCatch(authorId)
      }
    }
  }

  fetchAuthorCollectionIfNeededWithCatch = authorId => {
    return (
      this.props
        .fetchAuthorCollectionIfNeeded(authorId)
        // TODO render alter message
        .catch(failAction => {
          logger.errorReport({
            report: _.get(failAction, 'payload.error'),
            message: `Error to fetch the posts of the author (id: '${authorId}').`,
          })
        })
    )
  }

  fetchAuthorDetailsWithCatch = authorId => {
    return (
      this.props
        .fetchAuthorDetails(authorId)
        // TODO render alter message
        .catch(failAction => {
          logger.errorReport({
            report: _.get(failAction, 'payload.error'),
            message: `Error to fetch description of the author (id: '${authorId}').`,
          })
        })
    )
  }

  handleLoadmore = () => {
    const authorId = _.get(this.props, 'author.id')
    return this.fetchAuthorCollectionIfNeededWithCatch(authorId)
  }

  render() {
    const { author, collections, collectionMeta } = this.props
    const fullTitle = author.name + siteMeta.name.separator + siteMeta.name.full
    const canonical = `${siteMeta.urlOrigin}/authors/${author.id}`
    const pureTextBio = author.bio ? author.bio.replace(/<[^>]*>?/gm, '') : '' // pure text only
    return (
      <React.Fragment>
        <Helmet
          title={fullTitle}
          link={[{ rel: 'canonical', href: canonical }]}
          meta={[
            { name: 'description', content: pureTextBio },
            { name: 'twitter:title', content: fullTitle },
            { name: 'twitter:description', content: pureTextBio },
            { name: 'twitter:image', content: siteMeta.ogImage.url },
            { name: 'twitter:card', content: 'summary' },
            { property: 'og:title', content: fullTitle },
            { property: 'og:description', content: pureTextBio },
            { property: 'og:image', content: siteMeta.ogImage.url },
            { property: 'og:image:width', content: siteMeta.ogImage.width },
            { property: 'og:image:height', content: siteMeta.ogImage.height },
            { property: 'og:type', content: 'profile' },
            { property: 'og:url', content: canonical },
            { property: 'og:rich_attachment', content: 'true' },
          ]}
        />
        <AuthorData authorData={author} />
        <AuthorCollection
          collections={collections}
          currentId={author.id}
          hasMore={collectionMeta.hasMore}
          isFetching={collectionMeta.isFetching}
          currentPage={collectionMeta.currentPage}
          handleLoadmore={this.handleLoadmore}
          totalResults={collectionMeta.totalResults}
        />
        <Sponsor />
      </React.Fragment>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const authorId = _.get(ownProps, 'match.params.authorId')
  const articlesByAuthor = _.get(state, 'articlesByAuthor', {})
  const entities = _.get(state, 'entitiesForAuthors', {})
  const authorIsFull = _.get(entities, [authorId, 'full'], false)
  const {
    hasMore,
    isFetching,
    currentPage,
    collectIndexList,
    totalResults,
  } = _.get(articlesByAuthor, authorId, {})
  const collections = denormalizeArticles(collectIndexList, entities)
  const authorEntity = _.get(entities, ['authors', authorId], {})
  const authorImageSouce = _.get(
    authorEntity,
    'thumbnail.resizedTargets.mobile'
  )
  const authorImage = authorImageSouce
    ? { ...authorImageSouce, url: replaceGCSUrlOrigin(authorImageSouce.url) }
    : authorDefaultImg
  const author = {
    id: authorId,
    name: _.get(authorEntity, 'name') || '',
    title: _.get(authorEntity, 'jobTitle') || '',
    image: authorImage,
    mail: _.get(authorEntity, 'email') || defaultEmail,
    bio: _.get(authorEntity, 'bio' || ''),
  }
  return {
    author,
    authorIsFull,
    collections,
    collectionMeta: {
      hasMore,
      isFetching,
      currentPage,
      totalResults,
    },
  }
}

export default connect(
  mapStateToProps,
  { fetchAuthorCollectionIfNeeded, fetchAuthorDetails }
)(Author)
