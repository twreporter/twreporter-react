'use strict'
import React from 'react'
import PrintIcon from '../../../static/asset/print.svg'
import styled from 'styled-components'
import mq from '../../utils/media-query'

const PrintBt = styled.button`
  border: none;
  background: none;
  margin-right: 15px;
  cursor: pointer;
  outline: none;
  padding: 0;
  img {
    width: 100%;
    height: auto;
  }

  ${mq.mobileOnly`
    display: none;
  `}
`


class PrintButton extends React.PureComponent {
  _print() {
    window.print()
  }

  render() {
    return (
      <PrintBt onClick={this._print}>
        <PrintIcon />
      </PrintBt>
    )
  }
}

export default PrintButton
