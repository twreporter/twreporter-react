// TODO: Use velocity-react to change width of selected info box more smoothly  

import { chunk } from 'lodash'
import { colors } from '../../../themes/common-variables'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { font, marginBetweenSections } from '../constants/styles'
import { screen } from '../utils/screen'
import data from '../constants/section-04/partners'
import groupBy from 'lodash/groupBy'
import keys from 'lodash/keys'
import MoreInfo from './more-info'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import sz from '../constants/screen-size'
import titleImg from '../../../../static/asset/about-us/title-section4.png'

const _ = {
  chunk, groupBy, keys
}
const content = [ ...data ]
const groupedContent = _.groupBy(content, partner => partner.partnerId)
const logoBlockBorderColor = ' #e9e9e9'
const logoBlockWidthOnDesktop = '39%'
const column = {
  desktop: 4,
  mobile: 2
}

const containerWidth = {
  mobile: '100%',
  tablet: '706px',
  desktop: '1024px',
  overDesktop: '1440px'
}

const Container = styled.div`
  position: relative;
  ${screen.overDesktop`
    margin: ${marginBetweenSections.overDesktop} 0;
  `}
  ${screen.desktop`
    margin: ${marginBetweenSections.desktop} 0;
  `}
  ${screen.tablet`
    margin: ${marginBetweenSections.tablet} 0;    
  `}  
  ${screen.mobile`
    margin: ${marginBetweenSections.mobile} 0;    
  `}
`

const Border = styled.div `
  ${screen.overDesktop`
    border-left: solid 8px ${colors.red.liverRed};
    border-right: solid 8px ${colors.red.liverRed};
  `}
  ${screen.desktop`
    border-left: solid 6px ${colors.red.liverRed};
    border-right: solid 6px ${colors.red.liverRed};
  `}
  ${screen.tablet`
    border-left: solid 7px ${colors.red.liverRed};
    border-right: solid 7px ${colors.red.liverRed};
  `}  
  ${screen.mobile`
    border-left: solid 6px ${colors.red.liverRed};
    border-right: solid 6px ${colors.red.liverRed};
  `}    
`

const SectionWrapper = styled.section`
  display: block;
  margin: 0 auto;
  ${screen.overDesktop`
    width: ${containerWidth.overDesktop};
    min-height: 1118px;
    padding: 132px 138px 88px 137px;
  `}
  ${screen.desktop`
    width: ${containerWidth.desktop};
    min-height: 820px;
    padding: 142px 86px 98px 86px;
  `}  
  ${screen.tablet`
    width: ${containerWidth.tablet};
    min-height: 1024px;
    padding: 80px 93px 80px 93px;
  `}
  ${screen.mobile`
    width: ${containerWidth.mobile};
    min-height: 715px;
    padding: 76px 43px 76px 43px
  `}
`

const Title = styled.h1`
  background-image: url(${titleImg});
  background-repeat: no-repeat;
  background-size: contain;
  margin: 0;
  span{
    display: none;
  }
  ${screen.overDesktop`
    width: 408px;
    height: 251px;
  `}
  ${screen.desktop`
    width: 315px;
    height: 194px;
  `}
  ${screen.tabletBelow`
    background-image: url(${titleImg});
    background-position: center top;
    float: none;
    margin: 0 auto;
  `}
  ${screen.tablet`
    width: 408px;
    height: 231px;
  `}
  ${screen.mobile`
    width: 247px;
    height: 154px;
  `}
`

const LogoBlock = styled.div`
  position: relative;
  display: inline-block;
  border: solid 1px ${logoBlockBorderColor};
  height: 189px;
  cursor: pointer;
  ${screen.desktopAbove`
    width: ${props => props.widthOnDesktop};
    transition: width 100ms linear;
  `}
  ${screen.tabletBelow`
    width: calc(100% / ${column.mobile});
  `}
  ${screen.mobile`
    height: 160px;
  `}
`

const Content = styled.div`
  width: 100%;
  ${screen.overDesktop`
    margin-top: 160px;
  `}
  ${screen.desktop`
    margin-top: 75px;
  `}
  ${screen.tablet`
    margin-top: 110px;
  `}
  ${screen.mobile`
    margin-top: 67px;
  `}
`

const LogoContent = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  h3{
    font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};
    font-weight: bold;
    margin: 0;
  }
  p{
    font-size: 16px;
    letter-spacing: 1.1px;
  }    
  img{
    width: 49px;
    border-bottom: solid 1px ${logoBlockBorderColor};
  }
  ${screen.overDesktop`
    h3{
      font-size: 24px;
      letter-spacing: 0.5px;
      margin-top: 20px;
    }
    img{
      padding-bottom: 19px;
    }
  `}
  ${screen.desktop`
    h3{
      font-size: 18px;
      letter-spacing: 0.4px;
      margin-top: 20px;
    }
    img{
      padding-bottom: 14px; 
    }
  `}
  ${screen.tablet`
    h3{
      font-size: 24px;
      letter-spacing: 0.5px;
      margin-top: 20px;
    }    
    img{
      padding-bottom: 19px;
    }
  `}
  ${screen.mobile`
    img{
      width: 64px;
      border-bottom: none;
    }
    h3{
      font-size: 18px;
      letter-spacing: 0.6px;
      margin-top: 17px;
    }
    p{
      font-size: 13px;
      letter-spacing: 0.9px;
    }        
  `}
`

export default class Section4 extends PureComponent {
  constructor(props) {
    super(props)
    this.isTabletBelow = false
    this.state = {
      selectedLogo: 0,
      selectedRow: 0,
      infoPageNum: 0,
      initialState: true
    }
  }
  _select = (logoIndex) => {
    this.setState({ 
      selectedLogo: logoIndex,
      selectedRow: Math.floor(logoIndex / column.desktop),
      infoPageNum: 0,
      initialState: false
    })
    if (this.isTabletBelow) {
      disableBodyScroll(this.infoOverlay)
    }
  }
  _getLogoBlockWidthOnDesktop = (logoIndex, selectedLogo, selectedRow) => {
    let logoRow = Math.floor(logoIndex / column.desktop)
    if (selectedLogo === logoIndex && selectedRow === logoRow) {
      return logoBlockWidthOnDesktop
    } else if (selectedRow === logoRow) {
      return `calc((100% - ${logoBlockWidthOnDesktop}) / ${column.desktop - 1})`
    }
    return `calc(100% / ${column.desktop})`
  }
  _nextPage = () => {
    this.setState({ infoPageNum: this.state.infoPageNum + 1 })
  }  
  _closeInfoBox = () => {
    this.setState({ 
      selectedLogo: null,
      selectedRow: null
    })
    if (this.isTabletBelow) {
      enableBodyScroll(this.infoOverlay)
    }
  }
  _getSelectedContent = () => {
    let { selectedLogo } = this.state
    if (selectedLogo === null ) return
    return groupedContent[_.keys(groupedContent)[selectedLogo]]
  }
  componentDidMount() {
    // Check if the device is tabletBelow
    if (window.matchMedia(`(max-width: ${sz.mediumScreenMaxWidth}px)`).matches) {
      this.isTabletBelow = true
    }
  }
  componentWillUnmount() {
    clearAllBodyScrollLocks()
  }
  render() {
    let { selectedLogo, selectedRow, infoPageNum, initialState } = this.state
    const LogoBlockList = _.keys(groupedContent).map((key, index) => {
      let data = groupedContent[key][0]
      return (
        <LogoBlock 
          key={index} 
          selectedLogo={selectedLogo}
          onClick={() => this._select(index)}
          widthOnDesktop={() => this._getLogoBlockWidthOnDesktop(index, selectedLogo, selectedRow)}
        >
          <LogoContent>
            <img src={data.logo} />
            <h3>{data.name.english}</h3>
            <p>{data.name.chinese}</p>
          </LogoContent>
        </LogoBlock>
      )
    })
    const LogoTable = _.chunk(LogoBlockList, column.desktop).map((row, index) => {
      return (
        <React.Fragment key={index}>
          {row}
          <MoreInfo
            ref={infoOverlay => this.infoOverlay = infoOverlay}
            rowNumber={index} 
            selectedContent={this._getSelectedContent()}
            infoPageNum={infoPageNum}
            selectedLogo={selectedLogo} 
            selectedRow={selectedRow}
            closeInfoBox={this._closeInfoBox}
            nextPage={this._nextPage}
            initial={initialState}
          />
        </React.Fragment>          
      )
    })
    return (
      <Border>
        <Container>
          <SectionWrapper>
            <Title><span>國際參與</span></Title>
            <Content>
              {LogoTable}
            </Content>
          </SectionWrapper>
        </Container>
      </Border>
    )
  }
}
