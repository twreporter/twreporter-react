import PropTypes from 'prop-types'
import React from 'react'
import baseComponents from './base-components'
import styled from 'styled-components'
import { colors, typography } from '../../themes/common-variables'
import { screen } from '../../themes/screen'
import { articleLayout } from '../../themes/layout'

const StyledAnchor = baseComponents.StyledAnchor.extend`
  position: relative;
  height: 100%;
  color: ${props => props.highlight ? colors.gray.gray25 : colors.gray.gray50};
  border-right: 2px solid ${props => props.highlight ? colors.gray.gray25 : colors.gray.gray50};
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

class Anchors extends baseComponents.Anchors {
  constructor(props) {
    super(props)
    this.Anchor = StyledAnchor
  }

  _renderAnchor(anchorObj) {
    const Anchor = this.Anchor
    return (
      <Anchor
        highlight={anchorObj.highlight}
        onClick={(e) => { anchorObj.handleClick(anchorObj.id, e) }}
        key={`SectionButton_${anchorObj.id}`}
      >
        <Order>{`0${anchorObj.index}`}</Order>
        <div>{this._assembleWord(anchorObj.label)}</div>
      </Anchor>
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

const sideBarBgWidth = 145

const sideBarOffset = 50

const AnchorsContainer = styled.div`
  z-index: 200;
  position: fixed;
  color: ${colors.gray.gray50};
  left: 50%;
  top: 50%;
  transform: translate(-${(articleLayout.hd.width.large - sideBarOffset)/2}px, -50%);
  visibility: ${props => (props.toShow ? 'visible' : 'hidden')};
  opacity: ${props => (props.toShow ? 1 : 0)};
  transition: opacity 0.5s linear;

  ${screen.desktop`
    transform: translate(-${(articleLayout.desktop.width.large - sideBarOffset)/2}px, -50%);
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
