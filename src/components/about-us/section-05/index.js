import { colors } from '../../../themes/common-variables'
import { content } from '../constants/section-05/records'
import { font, marginBetweenSections } from '../constants/styles'
import { screen } from '../utils/screen'
import arrow from '../../../../static/asset/about-us/section5-arrow.png'
import groupBy from 'lodash/groupBy'
import List from './list'
import orderBy from 'lodash/orderBy'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Timeline from './timeline'
import titleImg from '../../../../static/asset/about-us/title-section5-mob.png'
import titleImgDesktop from '../../../../static/asset/about-us/title-section5.png'
import Waypoint from 'react-waypoint'

const _ = {
  orderBy, groupBy
}

const sortedData = _.orderBy(content, [ 'year', 'month', 'date' ], [ 'asc', 'asc', 'asc' ])
const sortedDataGroupByYear = _.groupBy(sortedData, record => record.year)
const yearList = Object.keys(sortedDataGroupByYear)
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

const SectionWrapper = styled.section`
  position: relative;
  display: block;
  margin: 0 auto;
  ${screen.overDesktop`
    width: ${containerWidth.overDesktop};
    height: 910px;
    padding: 98px 116px 93px 152px;
  `}
  ${screen.desktop`
    width: ${containerWidth.desktop};
    height: 820px;
    padding: 119px 100px 128px 80px;
  `}  
  ${screen.tablet`
    width: ${containerWidth.tablet};
    min-height: 1024px;
    padding: 80px 49px 81px 93px;
  `}
  ${screen.mobile`
    width: ${containerWidth.mobile};
    min-height: 715px;
    padding: 76px 37px 76px 37px
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
  ${screen.desktopAbove`
    float: left;
    background-image: url(${titleImgDesktop});
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
    background-image: url(${titleImg});
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
      height: 46.9px;
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
      line-height: 1.35;
    }
    p:nth-child(2){
      img{
        height: 50px;
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
  margin-bottom: 128px;
  &:first-child {
    margin: 0;
    transform: translateX(50%) translateY(-50%);
  }
  ${screen.overDesktop`
    width: 277px;
    height: 277px;
    margin-left: 152px;
    margin-bottom: 93px;    
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
    this.state = {
      timelineScrolling: true,
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
  /**
   * The function is for Waypoint component which changes states according to client scrolling progress
   * @param {String} prevPos
   * @param {String} currPos
   */
  _onPositionChange = (prevPos, currPos) => {
    if (prevPos === 'inside' && currPos === 'below') {
      this.setState({ isBorderBottomfixed: true })
    } else if (prevPos === 'below' && currPos === 'inside') {
      // unfold the first year
      let newUnfoldArray = [ ...this.state.unfoldArray ]
      newUnfoldArray[0] = true
      this.setState({ 
        isBorderBottomfixed: false,
        unfoldArray: newUnfoldArray
      })
    }
  }
  _startTimelineAutoScrolling = () => {
    this.setState({ timelineScrolling: true })
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
  }
  render() {
    return (
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
                <img src={arrow} />
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
        <Waypoint
          onPositionChange={({ previousPosition, currentPosition }) => this._onPositionChange(previousPosition, currentPosition)}
          fireOnRapidScroll
        />
      </Container>
    )
  }
}
