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
import styles from '../components/AuthorCollection.scss'
import { LOAD_MORE_ARTICLES } from '../constants/index'
import AuthorData from '../components/AuthorData'

const _ = {
  get,
  uniq
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
    let { entities, collectIndexList, isFinish, isFetching, currentPage } = this.props
    collectIndexList = _.uniq(collectIndexList)
    let authorCollection = denormalizeArticles(collectIndexList, entities)
    let handleClick = () => {
      this.props.fetchAuthorsIfNeeded(authorId)
    }
    const loadmoreBtn = isFinish || isFetching || !currentPage ? null : <div className={classNames(styles['load-more'], 'text-center')} onClick={handleClick}>{LOAD_MORE_ARTICLES}</div>
    return (
    <div>
      <AuthorData authorData={authorData} />
      <div className={classNames('inner-max', 'center-block', commonStyles['components'])}>
        <AuthorCollection relateds={authorCollection} currentId={authorId} />
      </div>
      {loadmoreBtn}
      <Sponsor />
      <button onClick={handleClick}>fetch</button>
    </div>)
  }
}

function mapStateToProps(state) {
  return {
    entities: state.entities || {},
    collectIndexList: state.author.collectIndexList || [],
    isFinish: state.author.isFinish,
    isFetching: state.author.isFetching,
    currentPage: state.author.currentPage
  }
}

export default connect(mapStateToProps, { fetchAuthorsIfNeeded })(Author)
