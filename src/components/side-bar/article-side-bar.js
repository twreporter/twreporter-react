import PropTypes from 'prop-types'
import React from 'react'
import baseComponents from './base-components'
import get from 'lodash/get'
import styled from 'styled-components'
import { colors, globalColor, typography } from '../../themes/common-variables'
import { screen } from '../../themes/screen'
import { articleLayout } from '../../themes/layout'

const _ = {
  get
}

const Anchor = baseComponents.Anchor.extend`
  position: relative;
  height: 100%;
  color: ${props => props.highlight ? globalColor.textColor : colors.gray.gray50};
  border-right: 2px solid ${props => props.highlight ? globalColor.textColor : colors.gray.gray50};
  opacity: ${props => props.highlight ? '1' : '0.6'};
  padding-right: 17px;
  padding-top: 18px;
  padding-bottom: 18px;
  transition: all 200ms linear;
`

const Order = styled.div`
  font-size: ${typography.font.size.xSmall};
  position: absolute;
  top: 18px;
  left: -18px;
  transform: translateX(-50%);
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
    data.forEach((anchorObj, index) => {
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
            <Order>{`0${index}`}</Order>
            <div>{AssembleWord(moduleLabel)}</div>
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

const sideBarBgWidth = '145'

const AnchorsContainer = styled.div`
  z-index: 200;
  position: fixed;
  color: ${colors.gray.gray50};
  left: 50%;
  top: 50%;
  transform: translate(-${(articleLayout.hd.width.large - articleLayout.hd.offset.sidebar)/2}px, -50%);
  visibility: ${props => (props.toShow ? 'visible' : 'hidden')};
  opacity: ${props => (props.toShow ? 1 : 0)};
  transition: opacity 0.5s linear;

  ${screen.desktop`
    transform: translate(-${(articleLayout.desktop.width.large - articleLayout.desktop.offset.sidebar)/2}px, -50%);
  `}

  ${screen.tabletBelow`
    left: 3%;
    transform: translate(-50%, -50%);
  `}

  ${screen.mobile`
    display: block;
    left: 0;
    transform: translate(${props => (props.isToggled ? (sideBarBgWidth / 2) + 'px, -50%' :
      '-' + (sideBarBgWidth/2) + 'px, -50%')});
    transition: transform 0.3s ease-in;
  `}
`

const MobileSideBarController = styled.img`
  display: none;
  ${screen.mobile`
    z-index: 200;
    position: fixed;
    top: 0;
    left: 0;
    width: 30px;
    height: 43px;
    cursor: pointer;
    display: ${props => props.toShow ? 'block' : 'none'};
    transform: translateX(${props => (props.isToggled ? sideBarBgWidth : '0')}px);
    transition: transform 300ms linear;
  `};
`

const MobileBackground = styled.div`
  ${screen.mobile`
    display: ${props => props.toShow ? 'block' : 'none'};
    z-index: 199;
    position: fixed;
    top: 50%;
    left: -${sideBarBgWidth}px;
    width: ${sideBarBgWidth}px;
    height: 100%;
    top: 0%;
    background-color: white;
    border-right: 1px solid #f2f2f2;
    transform: translateX(${props => props.isToggled ? '145px' : '0px'});
    transition: transform 300ms linear;
  `}
`

class ArticleSideBar extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isToggled: false
    }

    this.toggleMobileSideBar = this._toggleMobileSideBar.bind(this)
  }

  _toggleMobileSideBar() {
    this.setState({
      isToggled: !this.state.isToggled
    })
  }

  render() {
    // currentAnchorId and handleClickAnchor are passed from `SideBarHOC`
    const { anchors, children, currentAnchorId, handleClickAnchor, toShow } = this.props
    const { isToggled } = this.state
    // TODO change button and backButton after gina re-design
    const button = 'https://storage.googleapis.com/twreporter-infographics/walk-with-survivor-of-suicide-gcs/static/sidebar_button.png'
    const backButton = 'https://storage.googleapis.com/twreporter-infographics/walk-with-survivor-of-suicide-gcs/static/sidebar_button_back.png'
    return (
      <div>
          <AnchorsContainer
            toShow={isToggled || toShow}
            isToggled={isToggled}
          >
            <Anchors
              data={anchors}
              handleClickAnchor={handleClickAnchor}
              currentAnchorId={currentAnchorId}
            />
          </AnchorsContainer>
          <MobileSideBarController
						isToggled={isToggled}
						onClick={this.toggleMobileSideBar}
            src={isToggled ? backButton : button}
            toShow={isToggled || toShow}
					/>
          <MobileBackground
            isToggled={isToggled}
            toShow={isToggled || toShow}
          >
          </MobileBackground>
        {children}
      </div>
    )
  }
}

ArticleSideBar.defaultProps = {
  currentAnchorId: '',
  handleClickAnchor: () => {},
  toShow: true
}

ArticleSideBar.propTypes = {
  anchors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  currentAnchorId: PropTypes.string,
  handleClickAnchor: PropTypes.func,
  toShow: PropTypes.bool
}

export default ArticleSideBar
