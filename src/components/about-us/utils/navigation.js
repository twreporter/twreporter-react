import colors from '../../../constants/colors'
import mq from './media-query'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Pagination = styled.div `
  display: inline-block;
  width: calc(((${props => props.navigationWidth}px - ${props => props.pagesLength}px) / ${props => props.pagesLength}));
  height: 2px;
  opacity: ${props => props.isCurrentPage ? 1 : 0.25};
  background: ${colors.black};
  margin-left: 1px;
  ${mq.mobileOnly`
    width: 11px;
    height: 3px;
  `}
`

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

export default class Navigation extends PureComponent {
  constructor(props) {
    super(props)
  }
  _createNavigation = () => {
    const { pagesLength, currentPage, startPage, endPage, navigationWidth } = this.props
    let pagination = []
    let navigation = []
    for (let i = startPage; i < endPage; i++) {
      pagination.push(
        <Pagination 
          key={i} 
          isCurrentPage={i === currentPage} 
          pagesLength={pagesLength}
          navigationWidth={navigationWidth}
        />
      )
    }
    if (pagination.length > 1) {
      navigation.push(
        <Container 
          key={'nav'}
          navigationWidth={navigationWidth}
          pagesLength={pagesLength}
        >
          {pagination}
        </Container>
      )
    }
    return navigation
  }

  render() {
    return (
      <React.Fragment>
        { this._createNavigation() }
      </React.Fragment>
    )
  }
}

Navigation.defaultProps = {
  pagesLength: 0,
  currentPage: 0,
  startPage: 0,
  endPage: 0,
  navigationWidth: 0
}

Navigation.propTypes = {
  pagesLength: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  startPage: PropTypes.number,
  endPage: PropTypes.number,
  navigationWidth: PropTypes.number
}

