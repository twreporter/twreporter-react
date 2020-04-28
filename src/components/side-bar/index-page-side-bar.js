import PropTypes from 'prop-types'
import React from 'react'
import baseComponents from './base-components'
import colors from '../../constants/colors'
import mq from '../../utils/media-query'
import styled from 'styled-components'

// writing-mode: vertical-rl;
// letter-spacing: 2px;
const StyledAnchor = styled(baseComponents.StyledAnchor)`
  margin-bottom: 18px;
  color: ${props => (props.highlight ? 'white' : `${colors.primaryColor}`)};
  background: ${props => (props.highlight ? `${colors.primaryColor}` : 'none')};
`

class Anchors extends baseComponents.Anchors {
  constructor(props) {
    super(props)
    this.Anchor = StyledAnchor
  }
}

const SideBarContainer = styled.div`
  position: fixed;
  top: 50%;
  z-index: 100;
  transform: translateY(-50%);
  color: ${colors.primaryColor};
  right: 16px;
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
      <div>
        <SideBarContainer>
          <Anchors
            data={anchors}
            handleClickAnchor={handleClickAnchor}
            currentAnchorId={currentAnchorId}
          />
        </SideBarContainer>
        {children}
      </div>
    )
  }
}

HomePageSideBar.defaultProps = {
  currentAnchorId: '',
  handleClickAnchor: () => {}
}

HomePageSideBar.propTypes = {
  anchors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string
  })).isRequired,
  currentAnchorId: PropTypes.string,
  handleClickAnchor: PropTypes.func
}

export default HomePageSideBar
