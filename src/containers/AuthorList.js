'use strict'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import AuthorList from '../components/authors/AuthorList'
import AuthorFilter from '../components/authors/AuthorFilter'
import Footer from '../components/Footer'
import LoadMore from '../components/authors/LoadMore'
import concat from 'lodash/concat'
import forEach from 'lodash/forEach'
import lowerCase from 'lodash/lowerCase'
import slice from 'lodash/slice'

const _ = {
  forEach: forEach,
  concat: concat,
  lowerCase: lowerCase,
  slice: slice
}

class AuthorListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //The input keyword for filtering
      keyword: '',
      //The defaut litmit of authors when load the page
      limit: 12
    }
  }

  _addLimit() {
    let newLimit = this.state.limit + 12
    this.setState({ limit: newLimit })
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
      //Unify keyword to lowercase
      keyword = _.lowerCase(keyword)
      _.forEach(inputArray, function (value) {
        //Unify author name to lowercase
        let checkValue = _.lowerCase(value.name)
        if (checkValue.indexOf(keyword) !== -1) {
          outputArray = _.concat(outputArray, value)
        }
      })
      return outputArray
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
        name: '王立柔',
        imgUrl: 'http://i.imgur.com/Clyp3sKb.jpg'
      },{
        name: '王文彥',
        imgUrl: 'http://i.imgur.com/Clyp3sKb.jpg'
      },{
        name: '王立柔',
        imgUrl: 'http://i.imgur.com/Clyp3sKb.jpg'
      },{
        name: '王文彥',
        imgUrl: 'http://i.imgur.com/Clyp3sKb.jpg'
      },{
        name: '王立柔',
        imgUrl: 'http://i.imgur.com/Clyp3sKb.jpg'
      },{
        name: '王文彥',
        imgUrl: 'http://i.imgur.com/Clyp3sKb.jpg'
      },{
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
        imgUrl: 'http://i.imgur.com/bH6zB10.png'
      },{
        name: '黃一峰',
        imgUrl: 'http://i.imgur.com/bH6zB10.png'
      },{
        name: '野島剛',
        imgUrl: 'http://i.imgur.com/bH6zB10.png'
      },{
        name: '黃一峰',
        imgUrl: 'http://i.imgur.com/bH6zB10.png'
      },{
        name: '野島剛',
        imgUrl: 'http://i.imgur.com/bH6zB10.png'
      },{
        name: '黃一峰',
        imgUrl: 'http://i.imgur.com/bH6zB10.png'
      },{
        name: '野島剛',
        imgUrl: 'http://i.imgur.com/bH6zB10.png'
      },{
        name: '黃一峰',
        imgUrl: 'http://i.imgur.com/bH6zB10.png'
      },{
        name: '野島剛',
        imgUrl: 'http://i.imgur.com/bH6zB10.png'
      },{
        name: '黃一峰',
        imgUrl: 'http://i.imgur.com/bH6zB10.png'
      },{
        name: '野島剛',
        imgUrl: 'http://i.imgur.com/bH6zB10.png'
      },{
        name: '黃一峰',
        imgUrl: 'http://i.imgur.com/bH6zB10.png'
      },{
        name: '野島剛',
        imgUrl: 'http://i.imgur.com/bH6zB10.png'
      },{
        name: '黃一峰',
        imgUrl: 'http://i.imgur.com/bH6zB10.png'
      },{
        name: 'George Chien',
        imgUrl: 'http://i.imgur.com/bH6zB10.png'
      } ]
    }

    //Filtering Data
    let filteredData = {}
    // console.log('state:', this.state)
    if (this.state.keyword) {
      filteredData = this.filter(mockData, this.state.keyword)
    } else {
      filteredData = mockData
    }

    // Limiting Data
    let limitedData = {}
    let isFinish = false

    if (filteredData.inHouse.length>this.state.limit) {
      // inHouse > limit => load limited / not finish
      isFinish = false
      limitedData.outSource = []
      limitedData.inHouse = _.slice(filteredData.inHouse, 0, this.state.limit)
    } else if (filteredData.inHouse.length+filteredData.outSource.length>this.state.limit) {
      // inHouse + outSource > limit  => load limited / not finish
      isFinish = false
      limitedData.inHouse = filteredData.inHouse
      limitedData.outSource = _.slice(filteredData.outSource, 0, this.state.limit-filteredData.inHouse.length)
    } else {
      // inHouse + outSource < limit  => load all / finish
      isFinish = true
      limitedData.inHouse = filteredData.inHouse
      limitedData.outSource = filteredData.outSource
    }
    // console.log(filteredData.inHouse)

    // Sum of the author items send to AuthorList to display

    let displayCount = limitedData.inHouse.length + limitedData.outSource.length

    return (
      <div>
        <AuthorFilter
          keyword={this.state.keyword}
          passKeyword={this.passKeyword.bind(this)}
          />
        <AuthorList
          inHouseReporters={limitedData.inHouse}
          correspondents={limitedData.outSource}
          displayCount={displayCount}
          keyword={this.state.keyword}
        />
        <LoadMore
          addLimit={this._addLimit.bind(this)}
          displayCount={displayCount}
          isFinish={isFinish}
        />
        <Footer/>
      </div>
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
