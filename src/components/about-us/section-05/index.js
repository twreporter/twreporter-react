/* eslint react/no-find-dom-node:1 */
import { Waypoint } from 'react-waypoint'
import colors from '../../../constants/colors'
import { content } from '../constants/section-05/records'
import { font, marginBetweenSections } from '../constants/styles'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import mq, { breakpoint } from '../utils/media-query'
import { storageUrlPrefix } from '../utils/config'
import groupBy from 'lodash/groupBy'
import keys from 'lodash/keys'
import List from './list'
import orderBy from 'lodash/orderBy'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Timeline from './timeline'

const _ = {
  orderBy,
  groupBy,
  keys,
}

const orderedData = _.orderBy(
  content,
  ['year', 'month', 'date'],
  ['desc', 'asc', 'asc']
)
const orderedDataGroupByYear = _.groupBy(orderedData, record => record.year)
const orderedYearList = _.keys(orderedDataGroupByYear)
  // sort by year in desc order
  .sort(function(a, b) {
    return Number(b) - Number(a)
  })

const yearRangebgColor = '#cacaca'
const timelineScrollingPortion = 0.98
const defaultZIndex = 0
const containerWidth = {
  mobile: '100%',
  tablet: '706px',
  desktop: '1024px',
  overDesktop: '1440px',
}

const Container = styled.div`
  position: relative;
  background-color: ${colors.white};
  overflow: hidden;
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
  position: relative;
  display: block;
  margin: 0 auto;
  ${mq.hdOnly`
    width: ${containerWidth.overDesktop};
    height: 1110px;
    padding: 98px 116px 293px 152px;
  `}
  ${mq.desktopOnly`
    width: ${containerWidth.desktop};
    height: 920px;
    padding: 119px 100px 228px 80px;
  `}
  ${mq.tabletOnly`
    width: ${containerWidth.tablet};
    min-height: 1024px;
    padding: 80px 49px 181px 93px;
  `}
  ${mq.mobileOnly`
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
  ${mq.desktopAndAbove`
    position: absolute;
    left: 0;
    top: 0;
    background-image: url(${replaceGCSUrlOrigin(
      `${storageUrlPrefix}/title-section5.png`
    )});
  `}
  ${mq.hdOnly`
    width: 327px;
    height: 384px;
    margin: 98px 0 0 152px;
  `}
  ${mq.desktopOnly`
    width: 257px;
    height: 271px;
    margin: 119px 0 0 80px;
  `}
  ${mq.tabletAndBelow`
    background-image: url(${replaceGCSUrlOrigin(
      `${storageUrlPrefix}/title-section5-mob.png`
    )});
  `}
  ${mq.tabletOnly`
    width: 408px;
    height: 231px;
    background-position: left top;
  `}
  ${mq.mobileOnly`
    background-position: center top;
    width: 247px;
    height: 154px;
    float: none;
    margin: 0 auto;
  `}
`

const Content = styled.div`
  width: 100%;
  ${mq.desktopAndAbove`
    height: 100%;
    float: right;
  `}
  ${mq.hdOnly`
    width: 616px;
    height: calc(100% - 98.7px);
    padding-right: 95px;
    margin-top: 98.7px;
  `}
  ${mq.desktopOnly`
    width: 432px;
    height: calc(100% - 63px);
    padding-right: 61px;
    margin-top: 63px;
  `}
  ${mq.tabletAndAbove`
    position: relative;
  `}
  ${mq.tabletOnly`
    height: 572px;
    padding-right: 71px;
    margin-top: 71px;
  `}
  ${mq.mobileOnly`
    margin-top: 67px;
  `}
`

const BorderBottom = styled.div`
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: ${props => props.zIndex};
  background: ${colors.red.liverRed};
  ${mq.desktopAndAbove`
    position: ${props => (props.fixed ? 'fixed' : 'absolute')};
  `}
  ${mq.tabletAndBelow`
    position: absolute;
  `}
  ${mq.hdOnly`
    height: 8px;
  `}
  ${mq.desktopOnly`
    height: 6px;
  `}
  ${mq.tabletOnly`
    height: 7px;
  `}
  ${mq.mobileOnly`
    height: 6px;
  `}
`

const RunningTimeline = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  background: ${colors.white};
  ${mq.mobileOnly`
    display: none;
  `}
`

const AccordionTimeline = styled.div`
  ${mq.tabletAndAbove`
    display: none;
  `}
`

const YearTag = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-100%) translateY(-100%);
  p {
    font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};
    font-size: 13px;
    font-weight: ${font.weight.bold};
    background: ${colors.black};
    color: ${colors.white};
    padding: 2px;
  }
  ${mq.hdOnly`
    p{
      font-size: 15px;
    }
  `}
  ${mq.mobileOnly`
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
    font-family: ${font.family.english.roboto}, ${
  font.family.sansSerifFallback
};
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
      margin-right: 13.25px;
    }
  }
  ${mq.hdOnly`
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
  ${mq.desktopOnly`
    border: none;
    p:nth-child(2){
      img{
        height: 45px;
      }
    }
  `}
  ${mq.tabletOnly`
    width: 148px;
    height: 148px;
    margin-top: -71px;
    p{
      font-size: 34px;
      letter-spacing: 0.13px;
      span{
        padding: 1px 2.5px;
      }
    }
    p:nth-child(2){
      img{
        height: 48px;
      }
    }
  `}
  ${mq.mobileOnly`
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
  ${mq.hdOnly`
    width: 277px;
    height: 277px;
  `}
  ${mq.tabletAndBelow`
    display: none;
  `}
`

const OuterCircle = styled(Circle)`
  margin-left: 80px;
  margin-bottom: 228px;
  ${mq.hdOnly`
    width: 277px;
    margin-left: 152px;
    margin-bottom: 293px;
  `}
`

const InnerCircle = styled(Circle)`
  margin: 0;
  transform: translateX(50%) translateY(-50%);
`

const Rect = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 30px;
  height: 30px;
  margin: 0 -38px 0 0;
  background: ${props => props.color};
  ${mq.hdOnly`
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
    this.initalOpenUp = true
    this.state = {
      timelineScrolling: false,
      timelineScrollingHeight: 0,
      yearContentHeight: [],
      unfoldArray: orderedYearList.map(() => false),
      currentYear: orderedYearList[0],
      isBorderBottomfixed: true,
    }
  }

  componentDidMount() {
    const timelineScrollingHeight = ReactDOM.findDOMNode(
      this.scrollingContent
    ).getBoundingClientRect().height
    this.setState({ timelineScrollingHeight: timelineScrollingHeight })
    if (
      window.matchMedia(`(max-width: ${breakpoint.tablet.minWidth - 1}px)`)
        .matches
    ) {
      this.isMobile = true
    }
  }

  /**
   * Manages the unfoldArray which represents whether content in each year is folded
   * @param {number} index
   */
  _foldAndUnfold = index => {
    let newUnfoldArray = [...this.state.unfoldArray]
    newUnfoldArray[index] = !newUnfoldArray[index]
    this.setState({ unfoldArray: newUnfoldArray })
  }
  _onLeave = () => {
    this.setState({ isBorderBottomfixed: true })
    this._stopTimelineAutoScrolling()
  }
  _onEnter = () => {
    // unfold the first year
    let newUnfoldArray = [...this.state.unfoldArray]
    if (this.initalOpenUp) {
      newUnfoldArray[0] = true
      this.initalOpenUp = !this.initalOpenUp
    }
    this.setState({
      isBorderBottomfixed: false,
      unfoldArray: newUnfoldArray,
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
  _getYear = currentYearIndex => {
    this.setState({
      currentYear: orderedYearList[currentYearIndex],
    })
  }
  /**
   * The function is used by list.js for computing the height of children in timeline after they are mounted
   * @param {Array} contentHeightArray
   */
  _getYearContentHeight = contentHeightArray => {
    this.setState({ yearContentHeight: contentHeightArray })
  }
  render() {
    return (
      <Waypoint
        onEnter={this._onEnter}
        onLeave={this._onLeave}
        scrollableAncestor="window"
        fireOnRapidScroll
        bottomOffset="80%"
      >
        <div>
          <Container>
            <SectionWrapper>
              <OuterCircle color={`${colors.black}`}>
                <InnerCircle color={`${colors.gray.gray96}`} />
                <Rect color={`${colors.secondaryColor}`} />
              </OuterCircle>
              <Title>
                <span>大事紀</span>
              </Title>
              <Content>
                <AccordionTimeline>
                  <List
                    unfoldArray={this.state.unfoldArray}
                    orderedData={orderedData}
                    orderedDataGroupByYear={orderedDataGroupByYear}
                    foldAndUnfold={this._foldAndUnfold}
                    getYearContentHeight={this._getYearContentHeight}
                    orderedYearList={orderedYearList}
                  />
                </AccordionTimeline>
                <YearRange>
                  <p>
                    <span>{orderedYearList[orderedYearList.length - 1]}</span>
                  </p>
                  <p>
                    <span>{orderedYearList[0]}</span>
                    <img
                      src={`${replaceGCSUrlOrigin(
                        `${storageUrlPrefix}/section5-arrow.png`
                      )}`}
                    />
                  </p>
                </YearRange>
                <RunningTimeline>
                  <Timeline
                    ref={scrollingContent =>
                      (this.scrollingContent = scrollingContent)
                    }
                    childrenHeight={
                      this.state.timelineScrollingHeight *
                      timelineScrollingPortion
                    }
                    autoScrolling={this.state.timelineScrolling}
                    startAutoScroll={this._startTimelineAutoScrolling}
                    stopAutoScroll={this._stopTimelineAutoScrolling}
                    yearContentHeight={this.state.yearContentHeight}
                    getYear={this._getYear}
                  >
                    <List
                      unfoldArray={this.state.unfoldArray}
                      orderedData={orderedData}
                      orderedDataGroupByYear={orderedDataGroupByYear}
                      foldAndUnfold={this._foldAndUnfold}
                      getYearContentHeight={this._getYearContentHeight}
                      orderedYearList={orderedYearList}
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
        </div>
      </Waypoint>
    )
  }
}
