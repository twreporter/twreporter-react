'use strict'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import AuthorList from '../components/authors/AuthorList'

class AuthorListContainer extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    let mockData = {
      inHouse: [ {
        name: '王立柔',
        imgUrl: '/asset/authorPhoto.jpg'
      },{
        name: '王文彥',
        imgUrl: '/asset/authorPhoto.jpg'
      },{
        name: '王珣沛',
        imgUrl: '/asset/authorPhoto.jpg'
      } ],
      outSource: [ {
        name: '野島剛',
        imgUrl: '/asset/authorPhoto.jpg'
      },{
        name: '黃一峰',
        imgUrl: '/asset/authorPhoto.jpg'
      },{
        name: 'George Chien',
        imgUrl: '/asset/authorPhoto.jpg'
      } ]
    }

    return (
      <AuthorList
        inHouseReporter={mockData.inHouse}
        correspondent={mockData.outSource}
      />
    )
  }
}

function mapStateToProps() {
  return {
  }
}

AuthorListContainer.contextTypes = {
  device: React.PropTypes.string
}

export { AuthorListContainer }
export default connect(mapStateToProps)(AuthorListContainer)
