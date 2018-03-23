import { content } from '../constants/data/section4-content'
import { screen } from '../utils/screen'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const MobileStyledBillboard = styled.div`
  ${screen.desktopAbove`
    display: none;
  `}
  background: #c7000a;
  position: fixed;
  display: ${props => !props.isOpened ? 'none' : 'block'};
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  min-height: 100vh;  
`

const TextWrapper = styled.div`
  position: relative;
  margin: 0 20px;
  max-width: calc(100%-40px);
  height: 100vh;
  overflow: scroll;
  h1{
    word-break: break-all;
  }
`

const CloseButton = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  border: 2px solid palevioletred;
`

export class InfoBillboard extends PureComponent {
  render() {
    const { isOpened, closeBillboard, story } = this.props
    return (
      <MobileStyledBillboard isOpened={isOpened}>
        <TextWrapper>
          <img src={content[story - 1].photo} />
          <p>{content[story - 1].longerTitle.chinese}</p>
          <p>{content[story - 1].longerTitle.english}</p>
          <p>{content[story - 1].description.chinese}</p>
          <p>{content[story - 1].description.english}</p>
        </TextWrapper>
        <CloseButton onClick={closeBillboard}>close</CloseButton>
      </MobileStyledBillboard>
    )
  }
}

InfoBillboard.defaultProps = {
  isOpened: false,
  story: 1
}

InfoBillboard.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  story: PropTypes.number.isRequired,
  closeBillboard: PropTypes.func.isRequired
}

export default InfoBillboard
