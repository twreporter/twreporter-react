'use strict'
import { connect } from 'react-redux'
import React from 'react'

export class AuthorList extends React.Component {

  render() {
    return (
      <h1>This is an author list page</h1>
    )
  }
}

export default connect()(AuthorList)
