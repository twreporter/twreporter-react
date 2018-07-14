import { colors } from '../../../themes/common-variables'
import { replaceStorageUrlPrefix } from '@twreporter/react-components/lib/shared/utils'
import { screen } from '../utils/screen'
import { storageUrlPrefix } from '../utils/config'
import anchorlist from '../constants/data/sidebar-anchor'
import Link from 'react-router/lib/Link'
import logo from '../../../../static/asset/about-us/Thereporter-logo-mono-white.png'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const opacityTransitionDuration = '300ms'
const defaultZIndex = 1

const Panel = styled.div`
  z-index: calc(${defaultZIndex} + 1);
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100vw;
  min-height: 100vh;
  overflow: scroll;
  background: ${colors.red.liverRed};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  opacity: ${props => props.visible ? '1' : '0'};
  transition: all ${opacityTransitionDuration} linear;
  a{
    position: absolute;
    top: 20px;
    left: 30px;
    height: 36.8px;
  }
  ${screen.mobile`
    left: 0;  
  `}
  ${screen.tablet`
    right: 0;
    width: 375px;
    transform: ${props => props.visible ? 'translateX(0)' : 'translateX(100%)'};
  `}
  ${screen.desktopAbove`
    display: none;
  `}
`

const AnchorsContainer = styled.div`
  display: block;
  padding: 77px 0 52px 0;
  width: 200px;
  margin: 0 auto;
  color: ${colors.white};
  text-align: center;
  transition: transform ${opacityTransitionDuration} ease-in-out;
  ${screen.mobile`
    transform: ${props => props.visible ? 'translateY(0)' : 'translateY(-5%)'};
  `}
  ${screen.tablet`
    padding: 170px 0 45px 0;
    transform: ${props => props.visible ? 'translateX(0)' : 'translateX(5%)'};
  `}
`

const Anchor = styled.div`
  height: 86px;
  border-bottom: solid ${colors.white} 0.2px;
  p{
    line-height: 86px;
  }
  &:last-child{
    border-bottom: none;
  }
`

const CloseBtn = styled.div `
  position: absolute;
  right: 30px;
  top: 20px; 
  width: 24px;
  height: 24px;
  transform: translateY(50%);
  span{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 3px;
    background: ${colors.white};
    transition: transform ${opacityTransitionDuration} linear;
  }
  span:first-child{
    transform: ${props => props.isOpen ? 'rotate(-45deg)' : 'none'};
  }
  span:last-child{
    transform: ${props => props.isOpen ? 'rotate(45deg)' : 'none'};
  }
  ${screen.desktopAbove`
    display: none;
  `}
`

const Icons = styled.div`
  img{
    width: 45px;
    &:first-child{
      float: left;
    }
    &:last-child{
      float: right;
    }
  }
  ${screen.mobile`
    margin-top: 90px;
  `}
  ${screen.tablet`
    margin-top: 236px;
  `}
`

class AnchorsPanel extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Panel
        visible={this.props.isOpen}
        >
        <Link to="/">
          <img src={logo}/>
        </Link>
        <AnchorsContainer
          visible={this.props.isOpen}        
        >
          {
            anchorlist.map((anchor, anchorIdx) => {
              return (
                <Anchor
                  key={anchorIdx}
                  onClick={() => this.props.handleClickAnchor(anchorIdx)}
                >
                  <p>{anchor.label}</p>
                </Anchor>
              )
            })
          }
          <Icons>
            <img src={`${replaceStorageUrlPrefix(`${storageUrlPrefix}/sidebar-icon1-white.png`)}`} />
            <img src={`${replaceStorageUrlPrefix(`${storageUrlPrefix}/sidebar-icon2-white.png`)}`} />
            <img src={`${replaceStorageUrlPrefix(`${storageUrlPrefix}/sidebar-icon3-white.png`)}`} />
          </Icons>
        </AnchorsContainer>
        <CloseBtn
          onClick={this.props.closePanel}
          isOpen={this.props.isOpen}
        >
          <span/>
          <span/>
        </CloseBtn>
      </Panel>
    )
  }
}

AnchorsPanel.defaultProps = {
  currentAnchorId: '',
  handleClickAnchor: () => {}
}

AnchorsPanel.propTypes = {
  sectionRefs: PropTypes.array,
  currentAnchorId: PropTypes.string,
  handleClickAnchor: PropTypes.func
}

export default AnchorsPanel
