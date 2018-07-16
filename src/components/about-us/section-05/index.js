import { colors } from '../../../themes/common-variables'
import { content } from '../constants/section-05/records'
import { font, marginBetweenSections } from '../constants/styles'
import { replaceStorageUrlPrefix } from '@twreporter/react-components/lib/shared/utils'
import { screen } from '../utils/screen'
import { storageUrlPrefix } from '../utils/config'
import groupBy from 'lodash/groupBy'
import keys from 'lodash/keys'
import List from './list'
import orderBy from 'lodash/orderBy'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import sz from '../constants/screen-size'
import Timeline from './timeline'
import Waypoint from 'react-waypoint'

const _ = {
  orderBy, groupBy, keys
}

const sortedData = _.orderBy(content, [ 'year', 'month', 'date' ], [ 'asc', 'asc', 'asc' ])
const sortedDataGroupByYear = _.groupBy(sortedData, record => record.year)
const yearList = _.keys(sortedDataGroupByYear)
const yearRangebgColor = '#cacaca'
const timelineScrollingPortion = 0.95
const defaultZIndex = 0
const containerWidth = {
  mobile: '100%',
  tablet: '706px',
  desktop: '1024px',
  overDesktop: '1440px'
}

const Container = styled.div`
  position: relative;
  overflow: hidden;
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
  position: relative;
  display: block;
  margin: 0 auto;
  ${screen.overDesktop`
    width: ${containerWidth.overDesktop};
    height: 1110px;
    padding: 98px 116px 293px 152px;
  `}
  ${screen.desktop`
    width: ${containerWidth.desktop};
    height: 920px;
    padding: 119px 100px 228px 80px;
  `}  
  ${screen.tablet`
    width: ${containerWidth.tablet};
    min-height: 1024px;
    padding: 80px 49px 181px 93px;
  `}
  ${screen.mobile`
    width: ${containerWidth.mobile};
    min-height: 715px;
    padding: 76px 37px 126px 37px
  `}
`

const Title = styled.div`
  background-repeat: no-repeat;
  background-size: contain;
  margin: 0;
  span{
    display: none;
  }
  ${screen.desktopAbove`
    float: left;
    background-image: url(${replaceStorageUrlPrefix(`${storageUrlPrefix}/title-section5.png`)});
  `}
  ${screen.overDesktop`
    width: 327px;
    height: 384px;
  `}
  ${screen.desktop`
    width: 257px;
    height: 271px;
  `}
  ${screen.tabletBelow`
    background-image: url(${replaceStorageUrlPrefix(`${storageUrlPrefix}/title-section5-mob.png`)});
  `}
  ${screen.tablet`
    width: 408px;
    height: 231px;
    background-position: left top;
  `}
  ${screen.mobile`
    background-position: center top;
    width: 247px;
    height: 154px;
    float: none;
    margin: 0 auto;
  `}
`

const Content = styled.div`
  width: 100%;
  ${screen.desktopAbove`
    height: 100%;
    float: right;
  `}
  ${screen.overDesktop`
    width: 616px;
    height: calc(100% - 98.7px);
    padding-right: 95px;
    margin-top: 98.7px;
  `}
  ${screen.desktop`
    width: 432px;
    height: calc(100% - 63px);
    padding-right: 61px;
    margin-top: 63px;
  `}
  ${screen.tabletAbove`
    position: relative;
  `}
  ${screen.tablet`
    height: 572px;
    padding-right: 71px;
    margin-top: 71px;
  `}
  ${screen.mobile`
    margin-top: 67px;
  `}
`

const BorderBottom = styled.div `
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: ${props => props.zIndex};
  background: ${colors.red.liverRed};
  ${screen.desktopAbove`
    position: ${props => props.fixed ? 'fixed' : 'absolute'};  
  `}
  ${screen.tabletBelow`
    position: absolute;
  `}
  ${screen.overDesktop`
    height: 8px;
  `}
  ${screen.desktop`
    height: 6px;
  `}
  ${screen.tablet`
    height: 7px;
  `}  
  ${screen.mobile`
    height: 6px;
  `}
`

const RunningTimeline = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  background: ${colors.white};
  ${screen.mobile`
    display: none;
  `}
`

const AccordionTimeline = styled.div`
  ${screen.tabletAbove`
    display: none;
  `}
`

const YearTag = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-100%) translateY(-100%);
  p{
    font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};
    font-size: 13px;
    font-weight: ${font.weight.bold};
    background: ${colors.black};
    color: ${colors.white};
    padding: 2px;
  }
  ${screen.overDesktop`
    p{
      font-size: 15px;
    }
  `}
  ${screen.mobile`
    display: none;
  `}
`

const YearRange = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 140px;
  height: 140px;
  margin-top: -61px;
  border-top: solid 1px ${yearRangebgColor};
  border-right: solid 1px ${yearRangebgColor};
  p{
    display: block;
    width: 100%;
    font-size: 32px;
    letter-spacing: 0.2px;    
    font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};
    font-weight: ${font.weight.thin};
    background: ${yearRangebgColor};
    span{
      padding: 0 2.5px;
    }
  }
  p:first-child{
    position: absolute;
    right: 0;
    bottom: 0;
    transform-origin: right top;
    text-align: right;
    transform: translateY(100%) rotate(90deg);
    span{
      background: ${colors.black};
      color: ${colors.white};
    }
  }
  p:nth-child(2){
    position: absolute;
    left: 0;
    top: 0;
    span{
      background: ${colors.white};
      color: ${yearRangebgColor};
      border-collapse: collapse;
      box-shadow: inset 0 0 0 1px ${yearRangebgColor};
    }
    img{
      position: absolute;
      right: 0;
      top: 50%;
      height: 41px;
      margin-right: 13.25px;
    }
  }
  ${screen.overDesktop`
    width: 230px;
    height: 230px;
    margin-top: -95px;
    p{
      font-size: 53px;
      letter-spacing: 0.5px;
      line-height: 1.35;
    }
    p:nth-child(2){
      img{
        height: 78px;
        margin-right: 22.6px;
      }
    }
  `}
  ${screen.tablet`
    width: 148px;
    height: 148px;
    margin-top: -71px;
    p{
      font-size: 34px;
      letter-spacing: 0.13px;
    }
    p:nth-child(2){
      img{
        height: 45px;
      }
    }
  `}
  ${screen.mobile`
    display: none;
  `}
`

const Circle = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 218px;
  height: 218px;
  border-radius: 50%;
  background: ${props => props.color};
  margin-left: 80px;
  margin-bottom: 228px;
  z-index: calc(${defaultZIndex} - 1);
  &:first-child {
    margin: 0;
    transform: translateX(50%) translateY(-50%);
  }
  ${screen.overDesktop`
    width: 277px;
    height: 277px;
    margin-left: 152px;
    margin-bottom: 293px;    
  `}
  ${screen.tabletBelow`
    display: none;
  `}
`

const Rect = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 30px;
  height: 30px;
  margin: 0 -38px 0 0;
  background: ${props => props.color};
  ${screen.overDesktop`
    width: 45px;
    height: 45px;
    margin: 0 -51.5px 0 0;
  `}
`

export default class Section5 extends PureComponent {
  constructor(props) {
    super(props)
    this.yearContent = []
    this.isMobile = false
    this.state = {
      timelineScrolling: false,
      timelineScrollingHeight: 0,
      yearContentHeight: [],
      unfoldArray: yearList.map(() => false),
      currentYear: yearList[0],
      isBorderBottomfixed: true
    }
  }
  /**
   * Manages the unfoldArray which represents whether content in each year is folded
   * @param {number} index
   */
  _foldAndUnfold = (index) => {
    let newUnfoldArray = [ ...this.state.unfoldArray ]
    newUnfoldArray[index] = !newUnfoldArray[index]
    this.setState({ unfoldArray: newUnfoldArray })
  }
  _onLeave = () => {
    this.setState({ isBorderBottomfixed: true })
    this._stopTimelineAutoScrolling()
  }
  _onEnter = () => {
    // unfold the first year
    let newUnfoldArray = [ ...this.state.unfoldArray ]
    newUnfoldArray[0] = true
    this.setState({
      isBorderBottomfixed: false,
      unfoldArray: newUnfoldArray
    })

    // to start or resume auto-scrolling
    this._startTimelineAutoScrolling()
  }
  _startTimelineAutoScrolling = () => {
    if (!this.isMobile) {
      this.setState({ timelineScrolling: true })
    }
  }
  _stopTimelineAutoScrolling = () => {
    this.setState({ timelineScrolling: false })
  }
  _getBorderZIndex = () => {
    return defaultZIndex + 2
  }
  /**
   * Set year which will be displayed on title according to parameter
   * @param {number} currentYear
   */
  _getYear = (currentYearIndex) => {
    this.setState({
      currentYear: yearList[currentYearIndex]
    })
  }
  /**
   * The function is used by list.js for computing the height of children in timeline after they are mounted
   * @param {Array} contentHeightArray
   */
  _getYearContentHeight = (contentHeightArray) => {
    this.setState({ yearContentHeight: contentHeightArray })
  }
  componentDidMount() {
    const timelineScrollingHeight = ReactDOM.findDOMNode(this.scrollingContent).getBoundingClientRect().height
    this.setState({ timelineScrollingHeight: timelineScrollingHeight })
    if (window.matchMedia(`(max-width: ${sz.mediumScreenMinWidth - 1}px)`).matches) {
      this.isMobile = true
    }
  }
  render() {
    return (
      <Border>
        <Container>
          <SectionWrapper>
            <Title><span>大事紀</span></Title>
            <Circle color={`${colors.black}`}>
              <Circle color={`${colors.gray.gray96}`}/>
              <Rect color={`${colors.secondaryColor}`}/>
            </Circle>
            <Content>
              <AccordionTimeline>
                <List
                  unfoldArray={this.state.unfoldArray}
                  sortedData={sortedData}
                  sortedDataGroupByYear={sortedDataGroupByYear}
                  foldAndUnfold={this._foldAndUnfold}
                  getYearContentHeight={this._getYearContentHeight}  
                />
              </AccordionTimeline>
              <YearRange>
                <p><span>{yearList[yearList.length - 1]}</span></p>
                <p>
                  <span>{yearList[0]}</span>
                  <img 
                    src={`${replaceStorageUrlPrefix(`${storageUrlPrefix}/section5-arrow.png`)}`}
                  />
                </p>
              </YearRange>
              <RunningTimeline>
                <Timeline
                  ref={scrollingContent => this.scrollingContent = scrollingContent}
                  childrenHeight={this.state.timelineScrollingHeight * timelineScrollingPortion} 
                  autoScrolling={this.state.timelineScrolling}
                  startAutoScroll={this._startTimelineAutoScrolling}
                  stopAutoScroll={this._stopTimelineAutoScrolling}
                  yearContentHeight={this.state.yearContentHeight}
                  getYear={this._getYear}>
                  <List
                    unfoldArray={this.state.unfoldArray}
                    sortedData={sortedData}
                    sortedDataGroupByYear={sortedDataGroupByYear}
                    foldAndUnfold={this._foldAndUnfold}
                    getYearContentHeight={this._getYearContentHeight}  
                  />
                </Timeline>
              </RunningTimeline>
              <YearTag>
                <p>{this.state.currentYear}</p>
              </YearTag>
            </Content>
          </SectionWrapper>
          <BorderBottom 
            fixed={this.state.isBorderBottomfixed}
            zIndex={this._getBorderZIndex()}
          />
        </Container>
        <Waypoint
          onEnter={this._onEnter}
          onLeave={this._onLeave}
          scrollableAncestor="window"
          fireOnRapidScroll
        />
      </Border>
    )
  }
}
