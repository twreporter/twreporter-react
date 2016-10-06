/*eslint no-unused-vars:0, no-console:0 */
'use strict'
import { connect } from 'react-redux'
import React, { Component } from 'react'

class Blank extends Component {
  static fetchData({ store }) {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }
  render() {
    return (
      <div>server is working</div>
    )
  }
}

export { Blank }
export default connect()(Blank)
