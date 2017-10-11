'use strict'

import AuthorCollection from '../components/authorPage/AuthorCollection'
import AuthorData from '../components/authorPage/AuthorData'
import Helmet from 'react-helmet'
import React, { PropTypes } from 'react'
import Sponsor from '../components/Sponsor'
import authorDefaultImg from '../../static/asset/author-default-img.svg'
import classNames from 'classnames'
import commonStyles from '../components/article/Common.scss'
import get from 'lodash/get'
import withLayout from '../helpers/with-layout'
import { LINK_PREFIX, OG_TYPE, SITE_META, SITE_NAME, TWITTER_CARD } from '../constants/index'
import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/denormalize-articles'
import { fetchAuthorCollectionIfNeeded } from '../actions/author-articles'

const _ = {
  get
}

class Author extends React.Component {
  static fetchData({ params, store }) {
    const authorId = _.get(params, 'authorId', '')
    return store.dispatch(fetchAuthorCollectionIfNeeded(authorId))
  }
  componentDidMount() {
    const authorId = this.props.params['authorId']
    let { articlesByAuthor, fetchAuthorCollectionIfNeeded } = this.props
    if (!articlesByAuthor[authorId]) {
      fetchAuthorCollectionIfNeeded(authorId)
    }
  }
  render() {
    const authorId = this.props.params['authorId']
    const { entities, articlesByAuthor } = this.props
    let { hasMore, isFetching, currentPage, collectIndexList, totalResults } = _.get(articlesByAuthor, authorId, {})
    let authorCollection = denormalizeArticles(collectIndexList, entities)
    const authorEntity = _.get(entities, [ 'authors', authorId ], {})
    const authorData = {
      authorId: authorId,
      authorName: _.get(authorEntity, 'name') || '',
      authorTitle: _.get(authorEntity, 'jobTitle') || '',
      authorImgUrl: _.get(authorEntity, 'thumbnail.image.resizedTargets.mobile.url') || authorDefaultImg,
      authorMail: _.get(authorEntity, 'email') || '',
      authorBio: _.get(authorEntity, 'bio.md' || '')
    }
    let handleLoadmore = () => {
      return this.props.fetchAuthorCollectionIfNeeded(authorId)
    }

    const fullTitle = authorData.authorName + SITE_NAME.SEPARATOR + SITE_NAME.FULL
    const canonical = `${SITE_META.URL_NO_SLASH}${LINK_PREFIX.AUTHOR}${authorData.authorId}`

    return (
    <div>
      <Helmet
        title={fullTitle}
        link={[
          { rel: 'canonical', href: canonical }
        ]}
        meta={[
          { name: 'description', content: authorData.authorBio },
          { name: 'twitter:title', content: fullTitle },
          { name: 'twitter:description', content: authorData.authorBio },
          { name: 'twitter:image', content: authorData.authorImgUrl },
          { name: 'twitter:card', content: TWITTER_CARD.SUMMARY },
          { property: 'og:title', content: fullTitle },
          { property: 'og:description', content: authorData.authorBio },
          { property: 'og:image', content: authorData.authorImgUrl || SITE_META.OG_IMAGE },
          { property: 'og:type', content: OG_TYPE.PROFILE },
          { property: 'og:url', content: canonical },
          { property: 'og:rich_attachment', content: 'true' }
        ]}
      />
      <AuthorData authorData={authorData} />
      <div className={classNames('inner-max', 'center-block', commonStyles['components'])}>
        <AuthorCollection
          relateds={authorCollection}
          currentId={authorId}
          hasMore={hasMore}
          isFetching={isFetching}
          currentPage={currentPage}
          handleLoadmore={handleLoadmore}
          totalResults={totalResults}
        />
      </div>
      <Sponsor />
    </div>)
  }
}

Author.propTypes = {
  entities: PropTypes.object.isRequired,
  articlesByAuthor: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    entities: _.get(state, 'entitiesForAuthors', {}),
    articlesByAuthor: _.get(state, 'articlesByAuthor', {})
  }
}

export default connect(mapStateToProps, { fetchAuthorCollectionIfNeeded })(withLayout(Author))
