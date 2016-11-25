'use strict'

import React from 'react'
import Sponsor from '../components/Sponsor'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { fetchAuthorCollection } from '../actions/author'

const _ = {
  get
}


class Author extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const authorId = this.props.params['authorId']
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
    let handleClick = () => {
      this.props.fetchAuthorCollection()
    }
    return (
    <div>
      <div>Author page of: {authorId}</div>
      <AuthorData authorData={authorData} />
      <Sponsor />
      <button onClick={handleClick}>fetch</button>
    </div>)
  }
}

const AuthorData = (props) => {
  const authorData = props.authorData
  return (
  <div>
    <div>{authorData.authorId}</div>
    <div>{authorData.authorName}</div>
    <div>{authorData.authorMail}</div>
    <div>{authorData.authorImg}</div>
    <div>{authorData.authorBio}</div>
  </div>
)}

AuthorData.propTypes = {
  authorData: React.PropTypes.shape({
    authorId: React.PropTypes.string,
    authorName: React.PropTypes.string,
    authorImg: React.PropTypes.string,
    authorMail: React.PropTypes.string,
    authorBio: React.PropTypes.string
  })
}

function mapStateToProps(state) {
  return {
    entities: state.entities || {}
  }
}

export default connect(mapStateToProps, { fetchAuthorCollection })(Author)
