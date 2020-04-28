import { Link } from 'react-router-dom'
import mq from '../../utils/media-query'
import React from 'react' // eslint-disable-next-line
import SearchBox from './search-box'
import styled from 'styled-components'
import WhiteDonationIcon from '../../../static/asset/white-donation-icon.svg'
import WhiteLogoIcon from '../../../static/asset/logo-white-s.svg'
// @twreporter
import { sourceHanSansTC as fontWeight } from '@twreporter/core/lib/constants/font-weight'
import DonationLink from '@twreporter/react-components/lib/donation-link-with-utm'


const Container = styled.div`
  position: absolute;
  z-index: 100;
  top: 24px;
  left: 0;
  width: 100%;
  text-align: center;
  >*:nth-child(1) {
    position: absolute;
    left: 34px;
    top: 50%;
    transform: translateY(-50%);
  }
  >*:nth-child(2) {
    display: inline-block;
  }
  >*:nth-child(3) {
    position: absolute;
    right: 34px;
    top: 50%;
    transform: translateY(-50%);
  }
`

const DonationBtn = styled.div`
  >svg {
    margin-right: 8px;
    width: 24px;
  }
  >span {
    ${mq.mobileOnly`
      display: none;
    `}
    vertical-align: 22%;
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 1px;
    font-weight: ${fontWeight.normal};
  }
`
const LogoLink = styled(Link)`
  svg {
    height: 48px;
    width: auto;
  }
`

// TBD fixed on the top needs to be implement
function Header() {
  return (
    <Container>
      <DonationLink utmMedium="topic">
        <DonationBtn>
          <WhiteDonationIcon />
          <span>贊助我們</span>
        </DonationBtn>
      </DonationLink>
      <LogoLink to="/">
        <WhiteLogoIcon />
      </LogoLink>
      <SearchBox />
    </Container>
  )
}

export default Header
