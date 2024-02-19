import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import styled from 'styled-components'
// utils
import mq from '../../utils/media-query'
// components
import baseComponents from './base-components'
// @twreporter
import {
  colorGrayscale,
  colorBrand,
} from '@twreporter/core/lib/constants/color'

const StyledAnchor = styled(baseComponents.StyledAnchor)`
  margin-bottom: 18px;
  color: ${props =>
    props.highlight ? colorGrayscale.white : colorBrand.heavy};
  background: ${props => (props.highlight ? colorBrand.heavy : 'none')};
`

class Anchors extends baseComponents.Anchors {
  constructor(props) {
    super(props)
    this.Anchor = StyledAnchor
  }
}

const SideBarContainer = styled.div`
  position: fixed;
  @supports (position: sticky) {
    position: sticky;
  }

  float: right;
  right: 16px;
  top: 50vh;
  z-index: 100;
  transform: translateY(-50%);
  color: ${colorBrand.heavy};
  will-change: transform;
  ${mq.tabletOnly`
    right: 3px;
  `}
  ${mq.mobileOnly`
    display: none;
  `}
`

class HomePageSideBar extends React.PureComponent {
  render() {
    // currentAnchorId and handleClickAnchor are passed from `SideBarHOC`
    const { anchors, children, currentAnchorId, handleClickAnchor } = this.props
    return (
      <Fragment>
        <SideBarContainer>
          <Anchors
            data={anchors}
            handleClickAnchor={handleClickAnchor}
            currentAnchorId={currentAnchorId}
          />
        </SideBarContainer>
        {children}
      </Fragment>
    )
  }
}

HomePageSideBar.defaultProps = {
  currentAnchorId: '',
  handleClickAnchor: () => {},
}

HomePageSideBar.propTypes = {
  anchors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  currentAnchorId: PropTypes.string,
  handleClickAnchor: PropTypes.func,
}

export default HomePageSideBar
