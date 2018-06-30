import { colors } from '../../themes/common-variables'
import { screen } from '../about-us/utils/screen'
import baseComponents from './base-components'
import icon1 from '../../../static/asset/about-us/sidebar-icon1.png'
import icon2 from '../../../static/asset/about-us/sidebar-icon2.png'
import icon3 from '../../../static/asset/about-us/sidebar-icon3.png'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledAnchor = baseComponents.StyledAnchor.extend`
  position: relative;
  height: 100%;
  color: ${props => props.highlight ? colors.black : colors.gray.gray50};
  border-right: 2px solid ${props => props.highlight ? colors.black : colors.gray.gray50};
  opacity: ${props => props.highlight ? '2' : '0.5'};
  padding-right: 17px;
  padding-top: calc((170px / 6) / 2);
  padding-bottom: calc((170px / 6) / 2);
  transition: all 200ms linear;
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
      />
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

const AnchorsContainer = styled.div`
  z-index: 200;
  position: fixed;
  color: ${colors.gray.gray50};
  right: 0;
  top: 50%;
  transform: translate(-49px, -50%);
  visibility: ${props => (props.toShow ? 'visible' : 'hidden')};
  opacity: ${props => (props.toShow ? 1 : 0)};
  transition: opacity 0.5s linear;
  
  ${screen.desktop`
    transform: translate(-47px, -50%);
  `}

  ${screen.tabletBelow`
    display: none;
  `}
`

const Icons = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  ${screen.desktop`
    transform: translate(50%, calc(100% + 95px));
    img{
      width: 30px;
      margin-bottom: 16.7px;
    }
  `}

  ${screen.overDesktop`
    transform: translate(50%, calc(100% + 106px));
    img{
      width: 45px;
      margin-bottom: 25px;
    }  
  `}
`

class AboutusPageSideBar extends React.PureComponent {
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
            <Icons>
              <img src={icon1} />
              <img src={icon2} />
              <img src={icon3} />
            </Icons>
          </AnchorsContainer>
        {children}
      </div>
    )
  }
}

AboutusPageSideBar.defaultProps = {
  currentAnchorId: '',
  handleClickAnchor: () => {},
  toShow: true
}

AboutusPageSideBar.propTypes = {
  anchors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  currentAnchorId: PropTypes.string,
  handleClickAnchor: PropTypes.func,
  toShow: PropTypes.bool
}

export default AboutusPageSideBar
