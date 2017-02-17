'use strict'

import { AUTHOR_PAGE } from '../constants/page-types'
import AuthorCollection from '../components/authorPage/AuthorCollection'
import AuthorData from '../components/authorPage/AuthorData'
import { LIGHT } from '../constants/page-themes'
import React from 'react'
import Sponsor from '../components/Sponsor'
import authorDefaultImg from '../../static/asset/author-default-img.svg'
import classNames from 'classnames'
import commonStyles from '../components/article/Common.scss'
import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/denormalize-articles'
import { fetchAuthorCollectionIfNeeded } from '../actions/author-articles'
import get from 'lodash/get'
import { setHeaderInfo } from '../actions/header'

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
    let { setHeaderInfo, articlesByAuthor, fetchAuthorCollectionIfNeeded } = this.props
    if (!articlesByAuthor[authorId]) {
      fetchAuthorCollectionIfNeeded(authorId)
    }
    setHeaderInfo({
      pageTheme: LIGHT,
      pageType: AUTHOR_PAGE
    })
  }
  render() {
    const authorId = this.props.params['authorId']
    const { entities, articlesByAuthor } = this.props
    let { hasMore, isFetching, currentPage, collectIndexList, totalResults } = _.get(articlesByAuthor, authorId, {})
    let authorCollection = denormalizeArticles(collectIndexList, entities)
    const authorEntity = _.get(entities, [ 'authors', authorId ], {})
    const authorData = {
      authorId: authorId,
      authorName: _.get(authorEntity, 'name'),
      authorImg: _.get(authorEntity, 'imageUrl', authorDefaultImg),
      authorMail: _.get(authorEntity, 'email'),
      authorBio: _.get(authorEntity, 'bio.md')
    }
    let handleLoadmore = () => {
      return this.props.fetchAuthorCollectionIfNeeded(authorId)
    }
    return (
    <div>
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

function mapStateToProps(state) {
  return {
    entities: _.get(state, 'entities', {}),
    articlesByAuthor: _.get(state, 'articlesByAuthor', {})
  }
}

export default connect(mapStateToProps, { fetchAuthorCollectionIfNeeded, setHeaderInfo })(Author)
