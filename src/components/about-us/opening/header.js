import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
// utils
import mq from '../utils/media-query'
// style
import { containerStyle, headerStyle } from './section-style'
// assets
import logo from '../../../../static/asset/about-us/Thereporter-logo-mono-red.png'
// @twreporter
import { colorGrayscale } from '@twreporter/core/lib/constants/color'

const defaultZIndex = 0

const Container = styled.div`
  display: block;
  width: 100%;
  margin: 0 auto;
  ${mq.mobileOnly`
    max-width: ${containerStyle.width.mobile};
  `}
  ${mq.tabletOnly`
    max-width: ${containerStyle.width.tablet};
  `}
  ${mq.tabletAndBelow`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: ${props =>
      props.$isPanelOpen ? defaultZIndex : defaultZIndex + 3};
  `}
  ${mq.desktopOnly`
    max-width: ${containerStyle.width.desktop};
  `}
  ${mq.hdOnly`
    max-width: ${containerStyle.width.overDesktop};
  `}
`

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  a{
    height: 30px;
    text-align: left;
    img{
      height: 100%;
    }
  }
  ${mq.mobileOnly`
    height: ${headerStyle.height.mobile};
    padding: ${headerStyle.padding.mobile};
  `}
  ${mq.tabletOnly`
    height: ${headerStyle.height.tablet};
    padding: ${headerStyle.padding.tablet};
  `}
  ${mq.desktopOnly`
    height: ${headerStyle.height.desktop};
    padding: ${headerStyle.padding.desktop};
  `}
  ${mq.hdOnly`
    height: ${headerStyle.height.overDesktop};
    padding: ${headerStyle.padding.overDesktop};
  `}
`

const LanguageSwitcher = styled.div`
  text-align: right;
  span {
    line-height: 14px;
    a {
      cursor: pointer;
      padding-left: 14px;
      padding-right: 14px;
      color: ${colorGrayscale.black};
      font-weight: bold;
    }
  }
  span:last-child > a {
    opacity: 0.26;
    padding-right: 0;
  }
  ${mq.tabletAndBelow`
    display: none;
  `}
`

const Hamburger = styled.div`
  width: 24px;
  span {
    width: 100%;
    height: 2px;
    background: ${colorGrayscale.black};
    display: block;
  }
  span:first-child {
    margin-bottom: 8px;
  }
  ${mq.desktopAndAbove`
    display: none;
  `}
`

class Header extends React.PureComponent {
  render() {
    return (
      <Container $isPanelOpen={this.props.isPanelOpen}>
        <TopRow>
          <Link to="/">
            <img src={logo} />
          </Link>
          <LanguageSwitcher>
            <span>
              <a href={'.'}>中</a>
            </span>
            <span>|</span>
            <span>
              <a
                href={'https://www.twreporter.org/a/about-us-english-version'}
                target="_blank"
                rel="noopener noreferrer"
              >
                EN
              </a>
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
  isPanelOpen: false,
}

Header.propTypes = {
  onHamburgerClick: PropTypes.func.isRequired,
  isPanelOpen: PropTypes.bool.isRequired,
}

export default Header
