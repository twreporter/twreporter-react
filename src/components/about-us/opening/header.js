import { colors } from '../constants/styles'
import Icons from './icons'
import Link from 'react-router/lib/Link'
import Logo from '../../../../static/asset/about-us/twreporter-logo.svg'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { screen } from '../utils/screen'

const HEADER_POSITION_UPON = 'header-upon'
const styles = {
  headerHeight: '109px',
  headerHeightIndex: '62px',
  topRowPadding: {
    mobile: '34px 10px 35px 24px',
    tablet: '34px 20px 35px 35px',
    desktop: '34px 58px 35px 70px', 
    index: {
      mobile: '18px 16px 18px 16px',
      tablet: '18px 34px 18px 34px',
      desktop: '18px 47px 18px 47px'
    }
  },
  topRowMaxWidth: {
    tablet: '768px',
    desktop: '1024px',
    hd: '1440px'
  }
}

const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
`

const TopRow = styled.div`
  background-color: ${props => props.bgColor};
  height: ${props => (props.isIndex ? styles.headerHeightIndex : styles.headerHeight)};
  margin-top: 34px;
`

const TopRowContent = styled.div`
  padding: ${props => (!props.isIndex ? styles.topRowPadding.mobile : styles.topRowPadding.index.mobile)};
  ${screen.tablet`
    padding: ${props => (!props.isIndex ? styles.topRowPadding.tablet : styles.topRowPadding.index.tablet)};
  `}
  ${screen.desktopAbove`
    padding: ${props => (!props.isIndex ? styles.topRowPadding.desktop : styles.topRowPadding.index.desktop)};
  `}
  height: ${props => (props.isIndex ? styles.headerHeightIndex : styles.headerHeight)};
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  ${screen.tablet`
    max-width: ${styles.topRowMaxWidth.tablet};
  `}
  ${screen.desktop`
    max-width: ${props => (props.isIndex ? styles.topRowMaxWidth.desktop : styles.topRowMaxWidth.hd)};
  `}
  ${screen.overDesktop`
    max-width: ${props => (props.headerPosition === HEADER_POSITION_UPON ? '100%' : `${styles.topRowMaxWidth.hd}`)};
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
