import { buildFbShareLink } from '../utils/build-fb-share-link'
import { colors } from '../../../themes/common-variables'
import { css, keyframes } from 'styled-components'
import { font } from '../constants/styles'
import { headerStyle, allPaddingLeft, allPaddingRight } from './section-style'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import { screen } from '../utils/screen'
import { SITE_META } from '../constants/data/index'
import { storageUrlPrefix } from '../utils/config'
import anchorlist from '../constants/data/sidebar-anchor'
import DonationLink from '@twreporter/react-components/lib/donation-link-with-utm'
import hrefs from '../constants/data/sidebar-link'
import Link from 'react-router-dom/Link'
import logo from '../../../../static/asset/about-us/Thereporter-logo-mono-white.png'
import iconEnglishLink from '../../../../static/asset/about-us/icon-englishlink.png'
import PopUpPanel from '../utils/pop-up-panel'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const transitionDuration = 300

const fixedPanelStyle = {
  mob: {
    position: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    width: '100%'
  },
  tablet: {
    position: {
      top: 0,
      bottom: 0,
      right: 0,
      left: 'auto'
    },
    width: '375px'
  }
}

const Container = styled.div`
  ${screen.desktopAbove`
    display: none;
  `}
`

const TopRow = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  padding: ${headerStyle.padding.mobile};
  a{
    height: 30px;
    text-align: left;
    img{
      height: 100%;
    }
  }
  ${screen.mobile`
    height: ${headerStyle.height.mobile};
    padding-left: 40px;
  `}
  ${screen.tablet`
    a{
      visibility: hidden;
    }
    height: ${headerStyle.height.tablet};
  `}
`

const contentShifting = keyframes `
  from {
    transform: translateY(-5%);
  }
  to {
    transform: translateY(0);
  }
`
const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 0 ${allPaddingRight.mobile} 0 ${allPaddingLeft.mobile};
  ${screen.mobile`
    transform: translateY(-5%);
    animation: ${contentShifting} ${transitionDuration}ms linear;
    animation-fill-mode: forwards;
  `}
  ${screen.tablet`
    transform: none;
    padding: 0 31px 0 40px;
  `}
`

const contentShiftingRule = css`
  ${contentShifting} ${transitionDuration}ms linear;
`

const AnchorsContainer = styled.div`
  display: block;
  width: calc(100% - 185px + ${allPaddingRight.mobile});
  color: ${colors.white};
  text-align: left;
  p{
    font-weight: ${font.weight.bold};
    line-height: 86px;
    border-bottom: solid ${colors.white} 0.1px;
  }
  p:nth-child(6){
    border-bottom: none;
  }
  ${screen.mobile`
    animation: ${contentShiftingRule};
    animation-fill-mode: forwards;
    padding: 17px 0 52px 0;
  `}
  ${screen.tablet`
    padding: 45px 0 0 0;
  `}
`

const rotate45deg = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(45deg);
  }
`

const rotate45degRule = css`
  ${rotate45deg} ${transitionDuration}ms linear;
`

const rotateCounterClock45deg = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-45deg);
  }
`

const rotateCounterClock45degRule = css`
  ${rotateCounterClock45deg} ${transitionDuration}ms linear;
`

const CloseBtn = styled.div `
  position: relative;
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
  }
  span:first-child{
    animation: ${rotate45degRule};
    animation-fill-mode: forwards;
  }
  span:last-child{
    animation: ${rotateCounterClock45degRule};
    animation-fill-mode: forwards;
  }
  ${screen.desktopAbove`
    display: none;
  `}
`

const Icons = styled.div`
  position: absolute;
  right: ${allPaddingRight.mobile};
  bottom: 0;
  a{
    display: block;
    margin-bottom: 21px;
    img{
      width: 45px;
    }
  }
  ${screen.tablet`
    margin-top: 236px;
  `}
`

const EnglishVersionLink = styled.a`
  position: absolute;
  top: 0;
  right: ${allPaddingRight.mobile};
  color: ${colors.white};
  padding-left: 17px;
  transform-origin: 0 0;
  transform: translate(100%, 100%) rotate(90deg);
  p {
    font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};
		font-size: 18px;
  	font-weight: bold;
    letter-spacing: 0.7px;
    span {
      padding-left: 15px;
    }
  }
  ${screen.tablet`
    padding-left: 45px;
  `}
`

const IconEnLink = styled.img`
  width: 13.9px;
`

class AnchorsPanel extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { handleClickAnchor, closePanel } = this.props
    const Anchors = anchorlist.map((anchor, anchorIdx) => {
      return (
        <p
          key={anchorIdx}
          onClick={() => handleClickAnchor(anchorIdx)}
        >
          {anchor.label}
        </p>
      )
    })
    return (
      <PopUpPanel
        background={`${colors.red.liverRed}`}
        fixedPanelStyle={fixedPanelStyle}
      >
        <Container>
          <TopRow>
            <Link to="/">
              <img src={logo}/>
            </Link>
            <CloseBtn
              onClick={closePanel}
            >
              <span/>
              <span/>
            </CloseBtn>
          </TopRow>
          <ContentWrapper>
            <AnchorsContainer>
              {Anchors}
            </AnchorsContainer>
            <Icons>
              <DonationLink
                utmMedium="about-us"
              >
                <img src={`${replaceGCSUrlOrigin(`${storageUrlPrefix}/sidebar-icon1-white.png`)}`} />
              </DonationLink>
              <a href={hrefs.subscribe} target="_blank">
                <img src={`${replaceGCSUrlOrigin(`${storageUrlPrefix}/sidebar-icon2-white.png`)}`} />
              </a>
              <a href={buildFbShareLink(SITE_META.URL)} target="_blank">
                <img src={`${replaceGCSUrlOrigin(`${storageUrlPrefix}/sidebar-icon3-white.png`)}`} />
              </a>
            </Icons>
            <EnglishVersionLink href={'https://www.twreporter.org/a/about-us-english-version'} target="_blank">
              <p>English Version<span><IconEnLink src={iconEnglishLink} /></span></p>
            </EnglishVersionLink>
          </ContentWrapper>
        </Container>
      </PopUpPanel>
    )
  }
}

AnchorsPanel.defaultProps = {
  handleClickAnchor: () => {}
}

AnchorsPanel.propTypes = {
  handleClickAnchor: PropTypes.func
}

export default AnchorsPanel
