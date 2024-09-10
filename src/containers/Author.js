import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import React, { Fragment, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
// utils
import { denormalizeArticles } from '../utils/denormalize-articles'
import loggerFactory from '../logger'
// constants
import siteMeta from '../constants/site-meta'
// components
import AuthorCollection from '../components/author-page/author-collection'
import AuthorData from '../components/author-page/author-data'
import Sponsor from '../components/Sponsor'
// @twreporter
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import twreporterRedux from '@twreporter/redux'
// lodash
import get from 'lodash/get'
const _ = {
  get,
}

const {
  fetchAuthorCollectionIfNeeded,
  fetchAuthorDetails,
} = twreporterRedux.actions

const authorDefaultImg = {
  url: '/asset/author-default-img.svg',
  width: 500,
  height: 500,
}

const logger = loggerFactory.getLogger()

const Author = ({ match }) => {
  const articlesByAuthor = useSelector(state =>
    _.get(state, 'articlesByAuthor', {})
  )
  const entities = useSelector(state => _.get(state, 'entitiesForAuthors', {}))
  const authorId = useMemo(() => _.get(match, 'params.authorId'), [match])
  const authorIsFull = useMemo(
    () => _.get(entities, [authorId, 'full'], false),
    [entities]
  )
  const authorEntity = useMemo(
    () => _.get(entities, ['authors', authorId], {}),
    [entities]
  )
  const {
    hasMore,
    isFetching,
    currentPage,
    collectIndexList,
    totalResults = 0,
  } = _.get(articlesByAuthor, authorId, {})
  const collections = denormalizeArticles(collectIndexList, entities)
  const authorImageSouce = _.get(
    authorEntity,
    'thumbnail.resizedTargets.mobile'
  )
  const authorImage = authorImageSouce
    ? { ...authorImageSouce, url: replaceGCSUrlOrigin(authorImageSouce.url) }
    : authorDefaultImg
  const author = {
    id: authorId,
    name: _.get(authorEntity, 'name', ''),
    title: _.get(authorEntity, 'jobTitle', ''),
    image: authorImage,
    mail: _.get(authorEntity, 'email', ''),
    bio: _.get(authorEntity, 'bio', ''),
  }

  const dispatch = useDispatch()
  const fetchAuthorCollectionIfNeededWithCatch = async authorId => {
    try {
      await dispatch(fetchAuthorCollectionIfNeeded(authorId))
    } catch (err) {
      logger.errorReport({
        report: _.get(err, 'payload.error'),
        message: `Error to fetch the posts of the author (id: '${authorId}').`,
      })
    }
  }

  const fetchAuthorDetailsWithCatch = async authorId => {
    try {
      await dispatch(fetchAuthorDetails(authorId))
    } catch (err) {
      logger.errorReport({
        report: _.get(err, 'payload.error'),
        message: `Error to fetch description of the author (id: '${authorId}').`,
      })
    }
  }

  useEffect(() => {
    if (authorId) {
      fetchAuthorCollectionIfNeededWithCatch(authorId)
      if (!authorIsFull) {
        fetchAuthorDetailsWithCatch(authorId)
      }
    }
  }, [])

  const handleLoadmore = () => {
    return fetchAuthorCollectionIfNeededWithCatch(authorId)
  }

  const fullTitle = author.name + siteMeta.name.separator + siteMeta.name.full
  const canonical = `${siteMeta.urlOrigin}/authors/${author.id}`
  const pureTextBio = author.bio ? author.bio.replace(/<[^>]*>?/gm, '') : '' // pure text only
  return (
    <Fragment>
      <Helmet
        prioritizeSeoTags
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
        hasMore={hasMore}
        isFetching={isFetching}
        currentPage={currentPage}
        handleLoadmore={handleLoadmore}
        totalResults={totalResults}
      />
      <Sponsor />
    </Fragment>
  )
}
Author.propTypes = {
  match: PropTypes.object.isRequired,
}

export default withRouter(Author)
