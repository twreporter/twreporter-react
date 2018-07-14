import { colors } from '../../../themes/common-variables'
import { containerStyle, headerStyle } from './section-style'
import { screen } from '../utils/screen'
import Link from 'react-router/lib/Link'
import logo from '../../../../static/asset/about-us/Thereporter-logo-mono-red.png'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: block;
  width: 100%;
  margin: 0 auto;
  ${screen.mobile`
    max-width: ${containerStyle.width.mobile};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: ${props => props.isPanelOpen ? 0 : 9999};
  `}
  ${screen.tablet`
    max-width: ${containerStyle.width.tablet};
  `}
  ${screen.desktop`
    max-width: ${containerStyle.width.desktop};
  `}
  ${screen.overDesktop`
    max-width: ${containerStyle.width.overDesktop};
  `}
`

const TopRow = styled.div`
  display: table;
  margin: 0 auto;
  width: 100%;
  a{
    height: 36.8px;
    display: table-cell;
    text-align: left;
    vertical-align: middle;    
  }  
  ${screen.mobile`
    height: ${headerStyle.height.mobile};
    padding: ${headerStyle.padding.mobile};
  `}
  ${screen.tablet`
    height: ${headerStyle.height.tablet};
    padding: ${headerStyle.padding.tablet};
  `}
  ${screen.desktop`
    height: ${headerStyle.height.desktop};
    padding: ${headerStyle.padding.desktop};
  `}
  ${screen.overDesktop`
    height: ${headerStyle.height.overDesktop};
    padding: ${headerStyle.padding.overDesktop};
  `}
`

const LanguageSwitcher = styled.div`
  display: table-cell;
  text-align: right;
  vertical-align: middle;
  span {
    line-height: 14px;
    a {
      cursor: pointer;
      padding-left: 14px;
      padding-right: 14px;
      color: ${colors.black};
      font-weight: bold;
    }
  }
  span:last-child > a{
    opacity: 0.26;
    padding-right: 0;
  }
  ${screen.tabletBelow`
    display: none;
  `}
`

const Hamburger = styled.div`
  display: table-cell;
  text-align: right;
  vertical-align: middle;
  width: 24px;
  span{
    width: 100%;
    height: 2px;
    background: ${colors.black};
    display: block;
  }
  span:first-child{
    margin-bottom: 8px;
  }
  ${screen.desktopAbove`
    display: none;
  `}
`

class Header extends React.PureComponent {
  render() {
    return (
      <Container
        isPanelOpen={this.props.isPanelOpen}
      >
        <TopRow>
          <Link to="/">
            <img src={logo}/>
          </Link>
          <LanguageSwitcher>
            <span>
              <a href={'.'}>中</a>
            </span>
            <span>|</span>
            <span>
              <a href={"https://www.twreporter.org/a/about-us-english-version"} target="_blank">EN</a>
            </span>
          </LanguageSwitcher>
          <Hamburger onClick={this.props.onHamburgerClick}>
            <span />
            <span />
          </Hamburger>
        </TopRow>
      </Container>
    )
  }
}

Header.defaultProps = {
  onHamburgerClick: () => {},
  isPanelOpen: false
}

Header.propTypes = {
  onHamburgerClick: PropTypes.func.isRequired,
  isPanelOpen: PropTypes.bool.isRequired
}

export default Header
