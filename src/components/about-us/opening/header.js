import { colors } from '../../../themes/common-variables'
import { containerStyle, headerStyle } from './section-style'
import { screen } from '../utils/screen'
import Link from 'react-router/lib/Link'
import Logo from '../../../../static/asset/about-us/twreporter-logo.svg'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: block;
  width: 100%;
  margin: 0 auto;
  ${screen.mobile`
    max-width: ${containerStyle.width.mobile};
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

const Languages = styled.div`
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
`

class Header extends React.PureComponent {
  render() {
    return (
      <Container>
        <TopRow>
          <Link to="/">
            <Logo />
          </Link>
          <Languages>
            <span>
              <a href={'.'}>中</a>
            </span>
            <span>|</span>
            <span>
              <a href={'.'}>EN</a>
            </span>
          </Languages>
        </TopRow>
      </Container>
    )
  }
}

export default Header
