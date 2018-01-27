import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash/get'
import styled from 'styled-components'
import baseComponents from './base-components'
import { globalColor } from '../../themes/common-variables'
import { screen } from '../../themes/screen'

const _ = {
  get
}

// writing-mode: vertical-rl;
// letter-spacing: 2px;
const Anchor = baseComponents.Anchor.extend`
  margin-bottom: 18px;
  color: ${props => (props.highlight ? 'white' : `${globalColor.primaryColor}`)};
  background: ${props => (props.highlight ? `${globalColor.primaryColor}` : 'none')};
`

class Anchors extends React.PureComponent {
  render() {
    const AssembleWord = (words) => {
      return words.split('').map((word) => {
        return (
          <baseComponents.Label key={`anchor_label_${word}`}>
            {word}
          </baseComponents.Label>
        )
      })
    }
    const anchorBts = []
    const { data, currentAnchorId, handleClickAnchor } = this.props
    data.forEach((anchorObj) => {
      const moduleID = _.get(anchorObj, 'id', '')
      const moduleLabel = _.get(anchorObj, 'label', '')

      // moduleID and moduleLable are not empty string
      if (moduleID && moduleLabel) {
        anchorBts.push(
          <Anchor
            highlight={moduleID === currentAnchorId}
            onClick={(e) => { handleClickAnchor(moduleID, e) }}
            key={`SectionButton_${moduleID}`}
          >
            {AssembleWord(moduleLabel)}
          </Anchor>,
        )
      }
    })
    return (
      <div>
        { anchorBts }
      </div>
    )
  }
}

Anchors.defaultProps = {
  handleClickAnchor: () => {},
  data: []
}

Anchors.propTypes = {
  handleClickAnchor: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string
  }))
}

const SideBarContainer = styled.div`
  position: fixed;
  top: 50%;
  z-index: 100;
  transform: translateY(-50%);
  color: ${globalColor.primaryColor};
  right: 16px;
  ${screen.tablet`
    right: 3px;
  `}
  ${screen.mobile`
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
            ref={(node) => { this.anchorsNode = node }}
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
