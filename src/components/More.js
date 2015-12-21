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
    const { device } = this.context
    let points = '0,0 25,10 50,0'
    let width = 50
    let height = 11
    if (device !== 'desktop') {
      points = '0,0 15,5 30,0'
      width = 30
      height = 6
    }
    return (
      <div className="more-articles arrow clearfix" onClick={loadMore}>
        <span>更多文章</span>
        <div>
          <svg width={width} height={height}>
            <polyline points={points} fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    )
  }
}

More.contextTypes = {
  // store: React.PropTypes.object,
  device: React.PropTypes.string
}

export { More }
