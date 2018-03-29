// import { screen } from '../utils/screen'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

export const recordStyle = {
  width: 300
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: ${recordStyle.width}px;
  height: 100%;
  border: solid 1px black;
`
const WrapperOverlayMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(80% - 13px);
  z-index: 1;
`

const LineWrapper = styled.div`
  width: 100%;
  height: 80%;
  background: #a67a44;
  border-bottom: solid 13px #c7000a;
  z-index: 0;
`

const Info = styled.div`
  height: 100%;
  margin: 0 20px;
  border: solid 1px pink;
  &:hover{
    background: pink;
  }
`

const Date = styled.div`
  width: 100%;
  height: 20%;
  border: solid 1px blue;
`

export class Record extends PureComponent {
  constructor(props) {
    super(props)
  }

  onMouseOver = () => {
    this.props.onHover()
  }

  onMouseOut = () => {
    this.props.onLeave()
  }

  render() {
    return (
      <Container>
        <LineWrapper onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} />
        <Date />
        <WrapperOverlayMask>
          <Info onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} />
        </WrapperOverlayMask>
      </Container>
    )
  }
}

export default Record
