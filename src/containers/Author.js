'use strict'

import { AUTHOR_PAGE } from '../constants/page-types'
import { LIGHT } from '../constants/page-themes'
import AuthorCollection from '../components/authorPage/AuthorCollection'
import AuthorData from '../components/authorPage/AuthorData'
import React from 'react'
import Sponsor from '../components/Sponsor'
import classNames from 'classnames'
import commonStyles from '../components/article/Common.scss'
import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/denormalize-articles'
import { fetchAuthorCollectionIfNeeded } from '../actions/author'
import get from 'lodash/get'
import omit from 'lodash/omit'
import { setHeaderInfo } from '../actions/header'
import uniq from 'lodash/uniq'

const _ = {
  get,
  uniq,
  omit
}

class Author extends React.Component {
  static fetchData({ params, store }) {
    const authorId = _.get(params, 'authorId', '')
    return store.dispatch(fetchAuthorCollectionIfNeeded(authorId))
  }
  componentDidMount() {
    const authorId = this.props.params['authorId']
    let { setHeaderInfo, authorPage, fetchAuthorCollectionIfNeeded } = this.props
    const currentPage = _.get(authorPage, [ authorId, 'currentPage' ], -1)
    if (currentPage < 0) {
      fetchAuthorCollectionIfNeeded(authorId)
    }
    setHeaderInfo({
      pageTheme: LIGHT,
      pageType: AUTHOR_PAGE
    })
  }
  render() {
    const authorId = this.props.params['authorId']
    const { entities, isFetching, authorPage } = this.props
    let { isFinish, currentPage, collectIndexList, totalResults } = _.get(authorPage, authorId, {})
    collectIndexList = _.uniq(collectIndexList) //remove duplicated
    let authorCollection = denormalizeArticles(collectIndexList, entities)
    const thisAuthorInEntities = _.get(entities, [ 'authors', authorId ], {})
    const authorData = {
      authorId: authorId,
      authorName: _.get(thisAuthorInEntities, 'name'),
      authorImg: _.get(thisAuthorInEntities, 'imageUrl', 'http://i.imgur.com/Clyp3sKb.jpg'),
      authorMail: _.get(thisAuthorInEntities, 'email'),
      authorBio: _.get(thisAuthorInEntities, 'bio.md')
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
          isFinish={isFinish}
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
    entities: state.entities || {},
    isFetching: state.author.isFetching,
    authorPage: _.omit(state.author, 'response') || {}
  }
}

export default connect(mapStateToProps, { fetchAuthorCollectionIfNeeded, setHeaderInfo })(Author)
