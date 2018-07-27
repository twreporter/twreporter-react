import { colors } from '../../../themes/common-variables'
import { font, marginBetweenSections } from '../constants/styles'
import { replaceStorageUrlPrefix } from '@twreporter/react-components/lib/shared/utils'
import { screen } from '../utils/screen'
import { storageUrlPrefix } from '../utils/config'
import chunk from 'lodash/chunk'
import data from '../constants/section-04/partners'
import groupBy from 'lodash/groupBy'
import keys from 'lodash/keys'
import MoreInfo from './more-info'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import VelocityComponent from '@twreporter/velocity-react/velocity-component'

const _ = {
  chunk, groupBy, keys
}
const content = [ ...data ]
const groupedContent = _.groupBy(content, partner => partner.partnerId)
const logoBlockBorderColor = ' #e9e9e9'
const logoBlockWidthOnDesktop = '40%'
const transitioinDuration = 100
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
  background-image: url(${replaceStorageUrlPrefix(`${storageUrlPrefix}/title-section4.png`)});
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
  ${screen.tabletBelow`
    margin-bottom: -6px;
    width: calc(100% / ${column.mobile});
    &:nth-child(even) {
      margin-left: -1px;
    }
  `}
  ${screen.mobile`
    height: 160px;
  `}
`

const LogoBlockOnDesktop = LogoBlock.extend`
  ${screen.tabletBelow`
    display: none;
  `}
`

const LogoBlockOnTabletAbove = LogoBlock.extend`
  ${screen.desktopAbove`
    display: none;
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
  ${screen.tabletBelow`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  `}
  ${screen.tablet`
    min-height: 144px;
    h3{
      font-size: 24px;
      letter-spacing: 0.5px;
    }    
    img{
      padding-bottom: 19px;
    }
  `}
  ${screen.mobile`
    min-height: 124px;
    img{
      width: 64px;
      border-bottom: none;
    }
    h3{
      font-size: 18px;
      letter-spacing: 0.6px;
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
  }
  _getLogoBlockWidthOnDesktop = (logoIndex, selectedLogo, selectedRow) => {
    let getWidth
    let logoRow = Math.floor(logoIndex / column.desktop)
    if (selectedLogo === logoIndex && selectedRow === logoRow) {
      getWidth = logoBlockWidthOnDesktop
    } else if (selectedRow === logoRow) {
      getWidth = '20%'
    } else {
      getWidth = '25%'
    }
    return {
      duration: transitioinDuration,
      animation: {
        width: getWidth
      }
    }
  }
  _nextPage = () => {
    this.setState({ infoPageNum: this.state.infoPageNum + 1 })
  }  
  _closeInfoBox = () => {
    this.setState({ 
      selectedLogo: null,
      selectedRow: null
    })
  }
  _getSelectedContent = () => {
    let { selectedLogo } = this.state
    if (selectedLogo === null ) return
    return groupedContent[_.keys(groupedContent)[selectedLogo]]
  }
  render() {
    let { selectedLogo, selectedRow, infoPageNum, initialState } = this.state
    const LogoBlockList = _.keys(groupedContent).map((key, index) => {
      let data = groupedContent[key][0]
      let animationProps = this._getLogoBlockWidthOnDesktop(index, selectedLogo, selectedRow)
      return (
        <React.Fragment
          key={'logo' + index}
        >
          <VelocityComponent 
            key={index} 
            {...animationProps}
          >
            <LogoBlockOnDesktop 
              selectedLogo={selectedLogo}
              onClick={() => this._select(index)}
            >
              <LogoContent>
                <img src={replaceStorageUrlPrefix(data.logo)} />
                <h3>{data.name.english}</h3>
                <p>{data.name.chinese}</p>
              </LogoContent>
            </LogoBlockOnDesktop>
          </VelocityComponent>
          <LogoBlockOnTabletAbove 
            selectedLogo={selectedLogo}
            onClick={() => this._select(index)}
          >
            <LogoContent>
              <img src={replaceStorageUrlPrefix(data.logo)} />
              <div>
                <h3>{data.name.english}</h3>
                <p>{data.name.chinese}</p>
              </div>
            </LogoContent>
          </LogoBlockOnTabletAbove>
        </React.Fragment>
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
      <Container>
        <SectionWrapper>
          <Title><span>國際參與</span></Title>
          <Content>
            {LogoTable}
          </Content>
        </SectionWrapper>
      </Container>
    )
  }
}
