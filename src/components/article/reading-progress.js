import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(198, 0, 11, 0.35);
  height: 2px;
  width: ${props => {
    return props.percent + '%'
  }};
  transition: 0.2s width linear;
`

class ReadingProgress extends React.PureComponent {
  static propTypes = {
    percent: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.state = {
      percent: props.percent,
    }
    this.updatePercentage = this._updatePercentage.bind(this)
    this._isMount = false
  }

  componentDidMount() {
    this._isMount = true
  }

  componentWillUnMount() {
    this._isMount = false
  }

  _updatePercentage(percent) {
    if (typeof percent === 'number') {
      this.setState({
        percent,
      })
    }
  }

  render() {
    return this._isMount ? (
      <Bar percent={this.props.percent || this.state.percent} />
    ) : null
  }
}

export default ReadingProgress
