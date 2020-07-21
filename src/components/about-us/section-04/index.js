import MoreInfo from './more-info'
import React, { PureComponent } from 'react'
import VelocityComponent from 'velocity-react/velocity-component'
import axios from 'axios'
import colors from '../../../constants/colors'
import configs, { sections } from '../configs'
import loggerFactory from '../../../logger'
import mq from '../utils/media-query'
import styled from 'styled-components'
import { font, marginBetweenSections } from '../constants/styles'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import { storageUrlPrefix } from '../utils/config'
//lodash
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import keys from 'lodash/keys'
import chunk from 'lodash/chunk'

const _ = {
  chunk, groupBy, keys, get
}

const logoBlockBorderColor = ' #e9e9e9'
const transitioinDuration = 100
const column = {
  desktop: 4,
  mobile: 2,
}

const logger = loggerFactory.getLogger()

const containerWidth = {
  mobile: '100%',
  tablet: '706px',
  desktop: '1024px',
  overDesktop: '1440px',
}

const Container = styled.div`
  position: relative;
  background-color: ${colors.white};
  ${mq.hdOnly`
    margin: ${marginBetweenSections.overDesktop} 0;
  `}
  ${mq.desktopOnly`
    margin: ${marginBetweenSections.desktop} 0;
  `}
  ${mq.tabletOnly`
    margin: ${marginBetweenSections.tablet} 0;
  `}
  ${mq.mobileOnly`
    margin: ${marginBetweenSections.mobile} 0;
  `}
`

const SectionWrapper = styled.section`
  display: block;
  margin: 0 auto;
  ${mq.hdOnly`
    width: ${containerWidth.overDesktop};
    min-height: 1118px;
    padding: 132px 138px 88px 137px;
  `}
  ${mq.desktopOnly`
    width: ${containerWidth.desktop};
    min-height: 820px;
    padding: 142px 86px 98px 86px;
  `}
  ${mq.tabletOnly`
    width: ${containerWidth.tablet};
    min-height: 1024px;
    padding: 80px 93px 80px 93px;
  `}
  ${mq.mobileOnly`
    width: ${containerWidth.mobile};
    min-height: 715px;
    padding: 76px 43px 76px 43px
  `}
`

const Title = styled.h1`
  background-image: url(${replaceGCSUrlOrigin(
    `${storageUrlPrefix}/title-section4.png`
  )});
  background-repeat: no-repeat;
  background-size: contain;
  margin: 0;
  span{
    display: none;
  }
  ${mq.hdOnly`
    width: 408px;
    height: 251px;
  `}
  ${mq.desktopOnly`
    width: 315px;
    height: 194px;
  `}
  ${mq.tabletAndBelow`
    background-position: center top;
    float: none;
    margin: 0 auto;
  `}
  ${mq.tabletOnly`
    width: 408px;
    height: 231px;
  `}
  ${mq.mobileOnly`
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
  ${mq.desktopAndAbove`
    width: calc(100% / ${column.desktop});
  `}
  ${mq.tabletAndBelow`
    margin-bottom: -6px;
    width: calc(100% / ${column.mobile});
    &:nth-child(even) {
      margin-left: -1px;
    }
  `}
  ${mq.mobileOnly`
    height: 160px;
  `}
`

const DisplayInline = styled.div`
  display: inline;
`

const OnlyDisplayOnDesktopAbove = styled(DisplayInline)`
  ${mq.tabletAndBelow`
    display: none;
  `}
`

const OnlyDisplayOnTabletAndBelow = styled(DisplayInline)`
  ${mq.desktopAndAbove`
    display: none;
  `}
`

const Content = styled.div`
  width: 100%;
  ${mq.hdOnly`
    margin-top: 160px;
  `}
  ${mq.desktopOnly`
    margin-top: 75px;
  `}
  ${mq.tabletOnly`
    margin-top: 110px;
  `}
  ${mq.mobileOnly`
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
    font-family: ${font.family.english.roboto}, ${
  font.family.sansSerifFallback
};
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
  ${mq.hdOnly`
    h3{
      font-size: 24px;
      letter-spacing: 0.5px;
      margin-top: 20px;
    }
    img{
      padding-bottom: 19px;
    }
  `}
  ${mq.desktopOnly`
    h3{
      font-size: 18px;
      letter-spacing: 0.4px;
      margin-top: 20px;
    }
    img{
      padding-bottom: 14px;
    }
  `}
  ${mq.tabletAndBelow`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  `}
  ${mq.tabletOnly`
    min-height: 144px;
    h3{
      font-size: 24px;
      letter-spacing: 0.5px;
    }
    img{
      padding-bottom: 19px;
    }
  `}
  ${mq.mobileOnly`
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
      initialState: true,
      config: null
    }
  }
  componentDidMount() {
    this._getConfig() 
  }
  _getConfig = () => {
    return axios.get(configs[sections.section4])
      .then(res => {
        const content = _.get(res, 'data.rows')
        if (Array.isArray(content)) {
          this.setState({
            config: _.groupBy(content, partner => _.get(partner, 'partner.zh-tw'))
          }) 
        }
      })
      .catch((err) => {
        logger.errorReport({
          report: err,
          message: 'Something went wrong during getting configs for about-us page section4'
        })
      })
  }
  _select = (logoIndex) => {
    this.setState({
      selectedLogo: logoIndex,
      selectedRow: Math.floor(logoIndex / column.desktop),
      infoPageNum: 0,
      initialState: false,
    })
  }
  _getLogoBlockWidthOnDesktop = (logoIndex, selectedLogo, selectedRow) => {
    let width = '25%' 
    const logoRow = Math.floor(logoIndex / column.desktop)
    if (selectedLogo === logoIndex && selectedRow === logoRow) {
      width = '40%'
    } else if (selectedRow === logoRow) {
      width = '20%'
    } 
    return {
      duration: transitioinDuration,
      animation: {
        width
      }
    }
  }
  _nextPage = () => {
    this.setState({ infoPageNum: this.state.infoPageNum + 1 })
  }
  _closeInfoBox = () => {
    this.setState({
      selectedLogo: null,
      selectedRow: null,
    })
  }
  _getSelectedContent = () => {
    let { selectedLogo, config } = this.state
    if (selectedLogo === null ) return
    return config[_.keys(config)[selectedLogo]]
  }
  render() {
    let { selectedLogo, selectedRow, infoPageNum, initialState, config } = this.state
    const LogoBlockList = _.keys(config).map((partner, partnerIndex) => {
      let data = _.get(config, `${partner}.0`)
      let animationProps = this._getLogoBlockWidthOnDesktop(partnerIndex, selectedLogo, selectedRow)
      return (
        <React.Fragment
          key={partner}
        >
          <OnlyDisplayOnDesktopAbove>
            <VelocityComponent
              key={partnerIndex}
              {...animationProps}
            >
              <LogoBlock
                selectedLogo={selectedLogo}
                onClick={() => this._select(partnerIndex)}
              >
                <LogoContent>
                  <img src={replaceGCSUrlOrigin(`${storageUrlPrefix}/${_.get(data, 'logo')}`)} />
                  <h3>{_.get(data, 'partner.en')}</h3>
                  <p>{_.get(data, 'partner.zh-tw')}</p>
                </LogoContent>
              </LogoBlock>
            </VelocityComponent>
          </OnlyDisplayOnDesktopAbove>
          <OnlyDisplayOnTabletAndBelow>
            <LogoBlock
              selectedLogo={selectedLogo}
              onClick={() => this._select(partnerIndex)}
            >
              <LogoContent>
                <img src={replaceGCSUrlOrigin(`${storageUrlPrefix}/${data.logo}`)} />
                <div>
                  <h3>{_.get(data, 'partner.en')}</h3>
                  <p>{_.get(data, 'partner.zh-tw')}</p>
                </div>
              </LogoContent>
            </LogoBlock>
          </OnlyDisplayOnTabletAndBelow>
        </React.Fragment>
      )
    })
    const LogoTable = _.chunk(LogoBlockList, column.desktop).map(
      (row, index) => {
        return (
          <React.Fragment key={index}>
            {row}
            <MoreInfo
              ref={infoOverlay => (this.infoOverlay = infoOverlay)}
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
      }
    )
    return (
      <Container>
        <SectionWrapper>
          <Title>
            <span>國際參與</span>
          </Title>
          <Content>{LogoTable}</Content>
        </SectionWrapper>
      </Container>
    )
  }
}
