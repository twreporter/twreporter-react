'use strict'

import React from 'react'
import Sponsor from '../components/Sponsor'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { fetchAuthorsIfNeeded } from '../actions/author'
import { AuthorCollection } from '../components/AuthorCollection'
import commonStyles from '../components/article/Common.scss'
import classNames from 'classnames'
import uniq from 'lodash/uniq'
import { denormalizeArticles } from '../utils/denormalize-articles'
import AuthorData from '../components/AuthorData'
import omit from 'lodash/omit'
const _ = {
  get,
  uniq,
  omit
}


class Author extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    const authorId = this.props.params['authorId']
    this.props.fetchAuthorsIfNeeded(authorId)
  }
  render() {
    // mock data
    const mockData = {
      id: '571dd6e3dae62379576d7ef9',
      name: '卞中佩',
      email: 'contact@twreporter.org',
      bio: {
        md: '美國德州農工大學社會系博士候選人，關注社會運動、企業行為、中國議題，部落格：遊走......觀察......紀錄 。',
        html: '<p>美國德州農工大學社會系博士候選人，關注社會運動、企業行為、中國議題，部落格：遊走......觀察......紀錄 。</p>'
      },
      relatedArticles: [ '57317d488c0c261000b3f6d9', '5734235a3fac3c7322005b25', '5733f1248c0c261000b3f6ff' ]
    }
    const authorData = {
      authorId: _.get(mockData, 'id'),
      authorName: _.get(mockData, 'name'),
      authorImg: _.get(mockData, 'imageUrl', 'http://i.imgur.com/Clyp3sKb.jpg'),
      authorMail: _.get(mockData, 'email'),
      authorBio: _.get(mockData, 'bio.md')
    }
    // const relatedArticles = _.get(mockData, 'relatedArticles')
    const authorId = this.props.params['authorId']
    let { entities, isFetching, authorPage } = this.props
    let { isFinish, currentPage, collectIndexList } = _.get(authorPage, authorId, {})
    collectIndexList = _.uniq(collectIndexList)
    let authorCollection = denormalizeArticles(collectIndexList, entities)
    let handleClick = () => {
      this.props.fetchAuthorsIfNeeded(authorId)
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
          handleClick={handleClick}
        />
      </div>
      <Sponsor />
      <button onClick={handleClick}>fetch</button>
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

export default connect(mapStateToProps, { fetchAuthorsIfNeeded })(Author)
