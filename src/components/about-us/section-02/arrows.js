import { replaceStorageUrlPrefix } from '@twreporter/react-components/lib/shared/utils'
import { screen } from '../utils/screen'
import { storageUrlPrefix } from '../utils/config'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  visibility: ${props => props.isvisible ? 'visible' : 'hidden'};
  img{
    height: 45px;
  }
`

const LeftArrow = styled(Arrow)`
  left: 0;
  img{
    transform: translateX(45px) scaleX(-1);
  }
  ${screen.mobile`
    img{
      transform: translateX(-200%) scaleX(-1);
    }
  `}
`

const RightArrow = styled(Arrow)`
  right: 0;
  img{
    transform: translateX(-36px);
  }
  ${screen.mobile`
    img{
      transform: translateX(200%);
    }
  `}
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
            <Container>
              <LeftArrow
                isvisible={visible}
                onClick={() => changePage('prev') }>
                <img src={`${replaceStorageUrlPrefix(`${storageUrlPrefix}/arrow-next.png`)}`} alt={'>'}/>
              </LeftArrow>
              <RightArrow
                isvisible={visible}
                onClick = {() => changePage('next') }>
                <img src={`${replaceStorageUrlPrefix(`${storageUrlPrefix}/arrow-next.png`)}`} alt={'>'}/>
              </RightArrow>
            </Container> : null
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
