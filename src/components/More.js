import React, { Component } from 'react'

if (process.env.BROWSER) {
  require('./More.css')
}

export default class More extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { loadMore } = this.props
    return (
      <div className="more-articles clearfix" onClick={loadMore}>
        <span>更多文章</span>
      </div>
    )
  }
}

export { More }
