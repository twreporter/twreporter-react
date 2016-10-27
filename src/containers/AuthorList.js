'use strict'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import AuthorList from '../components/authors/AuthorList'
import AuthorFilter from '../components/authors/AuthorFilter'
import concat from 'lodash/concat'
import forEach from 'lodash/forEach'

const _ = {
  forEach: forEach,
  concat: concat
}

class AuthorListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // the input keyword for filtering
      keyword: ''
    }
  }

  render() {
    const mockData = {
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

    let filteredData = {}
    // console.log('state:', this.state)
    if (this.state.keyword) {
      filteredData = this.filter(mockData, this.state.keyword)
    } else {
      filteredData = mockData
    }

    // console.log(filteredData.inHouse)

    return (
      <div>
        <AuthorFilter
          passKeyword={this.passKeyword.bind(this)}
          />
        <AuthorList
          inHouseReporters={filteredData.inHouse}
          correspondents={filteredData.outSource}
        />
      </div>
    )
  }

  /* Callback function to change the state of the container */
  passKeyword(input) {
    const k = { keyword: input }
    this.setState(k)
  }

  /* Use keyword from state to filter the data for listing */
  filter(originData, keyword) {
    // Make new filtered data object that will be returned
    // Make new propieties(array) that all item.name contain keyword
    let inHouseReporters = []
    inHouseReporters = filterArray(originData.inHouse, keyword)
    // console.log('inHouseReporters:', inHouseReporters)
    let correspondents = []
    correspondents = filterArray(originData.outSource, keyword)
    // console.log('correspondents:', correspondents)
    return { inHouse: inHouseReporters, outSource: correspondents }

    // If item of inputArray contains keyowrd, then concat it to outputArray (Won't change the oring array)
    function filterArray(inputArray,keyword) {
      let outputArray = []
      _.forEach(inputArray, function (value) {
        if (value.name.indexOf(keyword) !== -1) {
          outputArray = _.concat(outputArray, value)
        }
      })
      return outputArray
    }
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
