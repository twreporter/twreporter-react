import { buildFbShareLink } from '../utils/build-fb-share-link'
import { colors } from '../../../themes/common-variables'
import { font } from '../constants/styles'
import { headerStyle } from './section-style'
import { keyframes } from 'styled-components'
import { replaceStorageUrlPrefix } from '@twreporter/react-components/lib/shared/utils'
import { screen } from '../utils/screen'
import { SITE_META } from '../constants/data/index'
import { storageUrlPrefix } from '../utils/config'
import anchorlist from '../constants/data/sidebar-anchor'
import hrefs from '../constants/data/sidebar-link'
import Link from 'react-router/lib/Link'
import logo from '../../../../static/asset/about-us/Thereporter-logo-mono-white.png'
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
  a{
    height: 30px;
    text-align: left;
    img{
      height: 100%;
    }
  }
  ${screen.mobile`
    height: ${headerStyle.height.mobile};
    padding: ${headerStyle.padding.mobile};
  `}
  ${screen.tablet`
    a{
      visibility: hidden;
    }
    height: ${headerStyle.height.tablet};
    padding: 20px 30px;
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

const AnchorsContainer = styled.div`
  display: block;
  width: 200px;
  margin: 0 auto;
  color: ${colors.white};
  text-align: center;
  transform: translateY(-5%);
  p{
    font-weight: ${font.weight.bold};
    line-height: 86px;
    border-bottom: solid ${colors.white} 0.1px;
  }
  p:nth-child(6){
    border-bottom: none;
  }
  ${screen.mobile`
    animation: ${contentShifting} ${transitionDuration}ms linear;
    animation-fill-mode: forwards;
    padding: 17px 0 52px 0;
  `}
  ${screen.tablet`
    transform: none;
    padding: 77px 0 45px 0;
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

const rotateCounterClock45deg = keyframes `
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-45deg);
  }
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
    animation: ${rotate45deg} ${transitionDuration}ms linear;
    animation-fill-mode: forwards;
  }
  span:last-child{
    animation: ${rotateCounterClock45deg} ${transitionDuration}ms linear;
    animation-fill-mode: forwards;
  }
  ${screen.desktopAbove`
    display: none;
  `}
`

const Icons = styled.div`
  a{
    img{
      width: 45px;
    }
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
          <AnchorsContainer>
            {Anchors}
            <Icons>
              <a href={hrefs.donate} target="_blank">
                <img src={`${replaceStorageUrlPrefix(`${storageUrlPrefix}/sidebar-icon1-white.png`)}`} />
              </a>
              <a href={hrefs.subscribe} target="_blank">
                <img src={`${replaceStorageUrlPrefix(`${storageUrlPrefix}/sidebar-icon2-white.png`)}`} />
              </a>
              <a href={buildFbShareLink(SITE_META.URL)} target="_blank">
                <img src={`${replaceStorageUrlPrefix(`${storageUrlPrefix}/sidebar-icon3-white.png`)}`} />
              </a>
            </Icons>
          </AnchorsContainer>
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
