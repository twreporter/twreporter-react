import React, { Component } from 'react'

export default class SearchBox extends Component {
  constructor(props, context) {
    super(props, context)
  }
  render() {
    return (
      <div className={this.props.class} style={this.props.style}>
        <div dangerouslySetInnerHTML={{ __html: '<gcse:search></gcse:search>' }} />
      </div>
    )
  }
}
