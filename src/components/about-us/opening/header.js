import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Icons from './icons'
import Link from 'react-router/lib/Link'
import Logo from '../../../../static/asset/about-us/twreporter-logo.svg'

import { screen } from '../utils/screen'
import { arrayToCssShorthand } from '../utils/style-utils'
import { colors } from '../constants/styles'

const HEADER_POSITION_UPON = 'header-upon'
const styles = {
  headerHeight: 109, // px
  headerHeightIndex: 62, // px
  topRowPadding: {
    mobile: [ 34, 10, 35, 24 ], // px
    tablet: [ 34, 20, 35, 35 ], // px
    desktop: [ 34, 58, 35, 70 ], // px
    index: {
      mobile: [ 18, 16, 18, 16 ], // px
      tablet: [ 18, 34, 18, 34 ], // px
      desktop: [ 18, 47, 18, 47 ] // px
    }
  },
  topRowMaxWidth: {
    tablet: 768, // px
    desktop: 1024,
    hd: 1440 // px
  }
}

const HeaderContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
`

const TopRow = styled.div`
  background-color: ${props => props.bgColor};
  height: ${props => (props.isIndex ? styles.headerHeightIndex : styles.headerHeight)}px;
  margin-top: 34px;
`

const TopRowContent = styled.div`
  padding: ${props => (!props.isIndex ? arrayToCssShorthand(styles.topRowPadding.mobile) : arrayToCssShorthand(styles.topRowPadding.index.mobile))};
  ${screen.tablet`
    padding: ${props => (!props.isIndex ? arrayToCssShorthand(styles.topRowPadding.tablet) : arrayToCssShorthand(styles.topRowPadding.index.tablet))};
  `}
  ${screen.desktopAbove`
    padding: ${props => (!props.isIndex ? arrayToCssShorthand(styles.topRowPadding.desktop) : arrayToCssShorthand(styles.topRowPadding.index.desktop))};
  `}
  box-sizing: border-box;
  height: ${props => (props.isIndex ? styles.headerHeightIndex : styles.headerHeight)}px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  ${screen.tablet`
    max-width: ${styles.topRowMaxWidth.tablet}px;
  `}
  ${screen.desktop`
    max-width: ${props => (props.isIndex ? styles.topRowMaxWidth.desktop : styles.topRowMaxWidth.hd)}px;
  `}
  ${screen.overDesktop`
    max-width: ${props => (props.headerPosition === HEADER_POSITION_UPON ? '100%' : `${styles.topRowMaxWidth.hd}px`)};
  `}
  margin: 0 auto;
`

class Header extends React.PureComponent {
  render() {
    const { bgColor, isIndex, headerPosition } = this.props
    return (
      <HeaderContainer>
        <TopRow
          bgColor={bgColor}
          isIndex={isIndex}
        >
          <TopRowContent isIndex={isIndex} headerPosition={headerPosition} >
            <Link to="/">
              <Logo />
            </Link>
            <Icons />
          </TopRowContent>
        </TopRow>
      </HeaderContainer>
    )
  }
}

Header.propTypes = {
  bgColor: PropTypes.string,
  fontColor: PropTypes.string,
  pathName: PropTypes.string,
  isIndex: PropTypes.bool,
  headerPosition: PropTypes.string
}

Header.defaultProps = {
  bgColor: '',
  fontColor: colors.black,
  isIndex: false,
  pathName: '',
  headerPosition: ''
}

export default Header
