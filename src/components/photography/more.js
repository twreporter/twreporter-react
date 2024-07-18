import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
// utils
import mq from '../../utils/media-query'
// @twreporter
import { fontWeight } from '@twreporter/core/lib/constants/font'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'

const Container = styled.div`
  cursor: pointer;
  width: 100%;
  height: 105px;
  background-color: ${colorGrayscale.black};
  text-align: center;
  span {
    color: white;
    line-height: 70px;
    font-size: 18px;
    font-weight: ${fontWeight.bold};
  }
  svg {
    width: 50px;
    height: 11px;
    transform: scale(1);
    transition: transform 200ms ease;
  }

  &:hover,
  :focus {
    polyline {
      stroke-width: 3;
    }
  }
  &:active {
    svg {
      transform: scale(1.1);
    }
  }
  ${mq.mobileOnly`
    height: 76px;
    padding-top: 10px;
    span {
      line-height: 30px;
      font-size: 16px;
    }
  `}
`

export default class More extends React.PureComponent {
  render() {
    const { loadMore, children } = this.props
    return (
      <Container onClick={loadMore}>
        {children}
        <div>
          <svg>
            <polyline
              points="0,0 25,10 50,0"
              fill="none"
              stroke={colorGrayscale.white}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Container>
    )
  }
}

More.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  loadMore: PropTypes.func.isRequired,
}

export { More }
