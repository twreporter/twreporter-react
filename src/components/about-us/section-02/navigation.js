import { colors } from '../../../themes/common-variables'
import { devices } from './utils'
import { screen } from '../utils/screen'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Pagination = styled.div `
  display: inline-block;
  width: calc(65px / ${props => props.pagesLength});
  height: 2px;
  opacity: ${props => props.isCurrentPage ? 1 : 0.25};
  background: ${colors.black};
  margin: 0 1px;
  ${screen.mobile`
    width: 11px;
    height: 3px;
  `}
`

const Container = styled.div `
  display: block;
  position: absolute;
  text-align: right;
  right: 0;
  bottom: 0;
  width: 65px;
  padding: 0;
  margin: 0 0 -5px 0;
  ${screen.mobile`
    position: relative;
    margin: 0 auto;
    text-align: center;
  `}
`

export default class Navigation extends PureComponent {
  constructor(props) {
    super(props)
  }

  /**
   * A Navigation maker by giving department index (categoryIndex) and client device
   *  @param {Number} categoryIndex
   *  @param {String} device
   */
  _createNavigation = (categoryIndex, device) => {
    let navigation = []
    let pagination = []
    let { pagesLength, currentPage } = this.props
    const startPage = device === devices.mobile ? 0 : 1
    const endPage = device === devices.mobile ? pagesLength : pagesLength - 1
    for (let i = startPage; i < endPage; i++) {
      pagination.push(
        <Pagination key={i} isCurrentPage={i === currentPage} pagesLength={pagesLength}/>
      )
    }
    if (pagination.length > 1) {
      navigation.push(<Container key={'nav-' + categoryIndex} >{pagination}</Container>)
    }
    return navigation
  }

  render() {
    let { departmentIndex, device } = this.props
    return (
      <React.Fragment>
        {
          this._createNavigation(departmentIndex, device)
        }
      </React.Fragment>
    )
  }
}

Navigation.defaultProps = {
  departmentIndex: 0,
  device: devices.desktop,
  pagesLength: 0,
  currentPage: 0
}

Navigation.propTypes = {
  departmentIndex: PropTypes.number.isRequired,
  device: PropTypes.string,
  pagesLength: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
}

