'use strict'
import React from 'react'
// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'

class AuthorItem extends React.Component {
  render() {
    return (
      <div className="authorItem">
        <img src={this.props.imgUrl} alt={this.props.authorName} />
        <div><p>{this.props.authorName}</p></div>
      </div>
    )
  }
}

class AuthorList extends React.Component {
  constructor() {
    super()
  }
  render() {
    let inHouseReporters = this.props.inHouseReporters
    // Rendering inHouseReporters
    let inHouseListJSX = []
    forEach(inHouseReporters, (ele) => {
      inHouseListJSX.push(
        <AuthorItem authorName={get(ele, 'name')} imgUrl={get(ele, 'imgUrl')} />
      )}
    )
    // Rendering correspondent
    let correspondents = this.props.correspondents
    let corresListJSX =[]
    forEach(correspondents, (ele) => {
      corresListJSX.push(
        <AuthorItem authorName={get(ele, 'name')} imgUrl={get(ele, 'imgUrl')} />
      )}
    )
    return (
      <div>
        {inHouseListJSX}
        {corresListJSX}
      </div>)
  }
}

export default AuthorList
