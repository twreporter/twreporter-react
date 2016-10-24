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
        imgUrl: 'http://i.imgur.com/Clyp3sKb.jpg'
      },{
        name: '王文彥',
        imgUrl: 'http://i.imgur.com/Clyp3sKb.jpg'
      },{
        name: '王珣沛',
        imgUrl: 'http://i.imgur.com/Clyp3sKb.jpg'
      } ],
      outSource: [ {
        name: '野島剛',
        imgUrl: 'http://i.imgur.com/Clyp3sKb.jpg'
      },{
        name: '黃一峰',
        imgUrl: 'http://i.imgur.com/Clyp3sKb.jpg'
      },{
        name: 'George Chien',
        imgUrl: 'http://i.imgur.com/Clyp3sKb.jpg'
      } ]
    }

    return (
      <AuthorList
        inHouseReporters={mockData.inHouse}
        correspondents={mockData.outSource}
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
