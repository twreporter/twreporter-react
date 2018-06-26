import { screen } from '../utils/screen'
import ArrowNextIcon from '../../../../static/asset/about-us/arrow-next.svg'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Arrow = styled.div `
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: calc(75% / 2);
  cursor: pointer;
  visibility: ${props => props.isvisible ? 'visible' : 'hidden'};
  ${screen.mobile`
    position: absolute;
    top: 50%;
  `}
`

const LeftArrow = Arrow.extend `
  left: 30px;
  transform: translateY(50%) scaleX(-1);
  ${screen.mobile`
    left: 0;
    transform: translateX(-100%) translateY(-50%) scaleX(-1);
  `}
`

const RightArrow = Arrow.extend `
  right: 30px;
  transform: translateY(50%);
  ${screen.mobile`
    right: 0;
    transform: translateX(100%) translateY(-50%);
  `}
`


export default class Arrows extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const { membersPageLengthArray, visible, changePage, departmentIndex } = this.props
    return (
      <React.Fragment>
      {
        membersPageLengthArray.length > 0 ?
        <React.Fragment>
          <LeftArrow
            isvisible={visible}
            onClick={() => changePage(departmentIndex, 'prev') }>
            <ArrowNextIcon />
          </LeftArrow>
          <RightArrow
            isvisible={visible}
            onClick = {() => changePage(this.props.departmentIndex, 'next') }>
            <ArrowNextIcon />
          </RightArrow> 
        </React.Fragment> : null
      }
      </React.Fragment>
    )
  }
}

Arrows.defaultProps = {
  membersPageLengthArray: [],
  visible: true,
  departmentIndex: 0
}

Arrows.propTypes = {
  membersPageLengthArray: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  changePage: PropTypes.func.isRequired,
  departmentIndex: PropTypes.number.isRequired
}
