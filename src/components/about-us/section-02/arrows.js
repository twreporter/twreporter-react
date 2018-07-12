// TODO: This component should be standalone, which means it should be in style of position: relative, width: 100%, height: 100%;
import { replaceStorageUrlPrefix } from '@twreporter/react-components/lib/shared/utils'
import { screen } from '../utils/screen'
import { storageUrlPrefix } from '../utils/config'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Arrow = styled.div`
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

const LeftArrow = Arrow.extend`
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

const ArrowNextIcon = styled.div`
  img{
    height: 100%;
  }
`

export default class Arrows extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const { membersPageLengthArray, visible, changePage } = this.props
    return (
      <React.Fragment>
      {
        membersPageLengthArray.length > 0 ?
        <React.Fragment>
          <LeftArrow
            isvisible={visible}
            onClick={() => changePage('prev') }>
            <ArrowNextIcon>
              <img src={`${replaceStorageUrlPrefix(`${storageUrlPrefix}/arrow-next.png`)}`} alt={">"}/>
            </ArrowNextIcon>
          </LeftArrow>
          <RightArrow
            isvisible={visible}
            onClick = {() => changePage('next') }>
            <ArrowNextIcon>
              <img src={`${replaceStorageUrlPrefix(`${storageUrlPrefix}/arrow-next.png`)}`} alt={">"}/>
            </ArrowNextIcon>
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
  changePage: PropTypes.func.isRequired
}
