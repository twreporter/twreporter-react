'use strict'
import React, { Component } from 'react' // eslint-disable-line
import styled from 'styled-components'

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(198, 0, 11, 0.35);
  height: 2px;
  width: ${(props) => { return props.percent + '%'}};
  transition: .2s width linear;
`

class ReadingProgress extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      percent: props.percent
    }
    this.updatePercentage = this._updatePercentage.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      percent: nextProps.percent
    })
  }

  _updatePercentage(percent) {
    if (typeof percent === 'number') {
      this.setState({
        percent
      })
    }
  }

  render() {
    const { percent } = this.state
    return (
      <Bar percent={percent} />
    )
  }
}

export default ReadingProgress
