import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import mq from '../utils/media-query'
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
  visibility: ${props => (props.isvisible ? 'visible' : 'hidden')};
  img {
    height: 45px;
  }
`

const LeftArrow = styled(Arrow)`
  left: 0;
  img{
    transform: translateX(13px) scaleX(-1);
  }
  ${mq.hdOnly`
    img{
      transform: translateX(29px) scaleX(-1);
    }
  `}
  ${mq.tabletOnly`
    img{
      transform: translateX(40px) scaleX(-1);
    }
  `}
  ${mq.mobileOnly`
    img{
      transform: translate(-200%, -50%) scaleX(-1);
    }
  `}
`

const RightArrow = styled(Arrow)`
  right: 0;
  img{
    transform: translateX(-13px);
  }
  ${mq.hdOnly`
    img{
      transform: translateX(-29px);
    }
  `}
  ${mq.tabletOnly`
    img{
      transform: translateX(-40px);
    }
  `}
  ${mq.mobileOnly`
    img{
      transform: translate(200%, -50%);
    }
  `}
`

export default class Arrows extends PureComponent {
  render() {
    const { membersPageLengthArray, visible, changePage } = this.props
    return (
      <React.Fragment>
        {membersPageLengthArray.length > 0 ? (
          <Container>
            <LeftArrow isvisible={visible} onClick={() => changePage('prev')}>
              <img
                src={`${replaceGCSUrlOrigin(
                  `${storageUrlPrefix}/arrow-next.png`
                )}`}
                alt={'>'}
              />
            </LeftArrow>
            <RightArrow isvisible={visible} onClick={() => changePage('next')}>
              <img
                src={`${replaceGCSUrlOrigin(
                  `${storageUrlPrefix}/arrow-next.png`
                )}`}
                alt={'>'}
              />
            </RightArrow>
          </Container>
        ) : null}
      </React.Fragment>
    )
  }
}

Arrows.defaultProps = {
  membersPageLengthArray: [],
  visible: true,
  departmentIndex: 0,
}

Arrows.propTypes = {
  membersPageLengthArray: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  changePage: PropTypes.func.isRequired,
}
