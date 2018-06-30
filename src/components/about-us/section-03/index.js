import { colors } from '../../../themes/common-variables'
import { font } from '../constants/styles'
import { marginBetweenSections } from '../constants/styles'
import { screen } from '../utils/screen'
import ArrowNextIcon from '../../../../static/asset/about-us/arrow-next.svg'
import awardJsonData from '../constants/section-03/awards.json'
import awardsName from '../constants/section-03/awards-name.json'
import AwardsNameList from './awards-name-list'
import Content from './content'
import groupBy from 'lodash/groupBy'
import React, { PureComponent } from 'react'
import riceEarBlack from '../../../../static/asset/about-us/rice-ear-black.png'
import styled from 'styled-components'
import titleImg from '../../../../static/asset/about-us/title-section3.png'
import titleImgMob from '../../../../static/asset/about-us/title-section3-mob.png'

const _ = {
  groupBy
}

const groupedAwards = _.groupBy(awardJsonData, award => award.awardId)
const groupedNames = _.groupBy(awardsName, award => award.awardId)
const awardsData = Object.values(groupedAwards).map(awardsArray =>
  awardsArray.map(award => Object.assign(award, groupedNames[award.awardId][0]))
)
const awardsList = [].concat(...Object.values(awardsData))
const awardsNameForCarousel = [ 
  ...awardsName.slice(awardsName.length - 2, awardsName.length), 
  ...awardsName, 
  ...awardsName.slice(0, 2) 
]

const Container = styled.div`
  position: relative;
  background-color: ${colors.white};
  overflow: hidden;
  ${screen.desktopAbove`
    min-height: 100vh;
  `}
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
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 1440px;
    height: 950px;
    padding: 97px 162px 145px 146px;
  `}
  ${screen.desktop`
    width: 1024px;
    height: 820px;
    padding: 78px 120px 156.1px 76px;
  `}  
  ${screen.tablet`
    width: 100%;
    min-height: 1024px;
    padding: 82px 101px 67px 101px;
  `}
  ${screen.mobile`
    width: 100%;
    min-height: 922px;
    padding: 50px 47.2px 93px 43px
  `}
`

const LeftColumn = styled.div`
  position: relative;
  ${screen.desktopAbove`
    display: inline-block;
    height: 100%;  
  `}
  ${screen.desktop`
    width: 345px;
  `}
  ${screen.overDesktop`
    width: 423px;
  `}
  ${screen.tablet`
    text-align: center;
  `}
`

const Title = styled.h1`
  background-image: url(${titleImg});
  background-repeat: no-repeat;
  background-size: contain;
  display: inline-block;
  margin: 0;
  span{
    display: none;
  }
  ${screen.desktop`
    width: 259px;
    height: 182px;
  `}
  ${screen.overDesktop`
    width: 361px;
    height: 231px;
  `}
  ${screen.tabletBelow`
    background-image: url(${titleImgMob});
    background-position: center top;
    float: none;
    margin: 0 auto;
  `}
  ${screen.tablet`
    width: 134px;
    height: 300px;
    border-bottom: solid 18.9px ${colors.secondaryColor};
  `}
  ${screen.mobile`
    display: block;
    margin: 0;
    width: 84px;
    height: 195px;
    border-bottom: solid 18px ${colors.secondaryColor};
  `}
`

const AwardsCount = styled.div`
  position: relative;
  display: block;
  float: left;
  height: 61px;
  img{
    position: absolute;
    height: 100%;
  }
  img:first-child{
    left: 0;
    top: 0;
  }
  img:last-child{
    transform: scaleX(-1);
    right: 0;
    top: 0;
  }
  p, h2{
    display: block;
    text-align: center;
    line-height: 1;
  }
  h2{
    font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};    
    font-weight: bold;
    font-size: 36px;
    margin: 0 0 2px 0;
  } 
  p{
    font-weight: ${font.weight.extraBold};
    margin: 0;
    font-size: 14px;
    letter-spacing: 0.2px;
  }

  ${screen.desktopAbove`
    width: 100%;
  `}
  ${screen.tablet`
    width: 138px;
  `}
  ${screen.mobile`
    width: 92px;
    h2{
      font-size: 24px;
      margin: 3px 0 3px 0;
    }
  `}
`

const Achievement = styled.div`
  display: block;
  position: absolute;
  ${screen.desktopAbove`
    left: 0;
    bottom: 0;
  `}
  ${screen.overDesktop`
    width: 108px;
  `}
  ${screen.desktop`
    width: 108px;
    transform: translateX(-25%);
  `}
  ${screen.tablet`
    left: 0;
    bottom: 0;
  `}
  ${screen.mobile`
    position: relative;
    float: right;
  `}
`

const CarouselSelector = styled.div`
  position: relative;
  width: 100%;
  height: 45px;
  display: block;
  margin-top: 100px;
  ${screen.desktopAbove`
    display: none;
  `}
`

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const AwardsSelector = styled.div `
  width: 100%;
  height: 100%;
  white-space: nowrap;
  ${screen.tablet`
    transition: all ${props => props.transitionEffect ? '250ms' : '1ms'} ease-in-out;
    transform: translate3d(calc(-25% + ${props => props.pageNumber * -100 / 2}%), 0, 0);  
  `}
  ${screen.mobile`
    position: relative;
  `}
`

const Arrow = styled.div `
  position: absolute;
  top: 50%;
  width: 30px;
  height: 45px;
`

const LeftArrow = Arrow.extend `
  left: 0;
  transform: translateX(-200%) translateY(-50%) scaleX(-1);
  ${screen.mobile`
    transform: translateX(-100%) translateY(-50%) scaleX(-1);  
  `}
`

const RightArrow = Arrow.extend `
  right: 0;
  transform: translateX(200%) translateY(-50%);
  ${screen.mobile`
    transform: translateX(100%) translateY(-50%);    
  `}
`

const ListSelector = styled.div`
  position: relative;
  display: block;
  float: right;
  ${screen.overDesktop`
    width: 260px;
    margin-top: 68px;
  `}
  ${screen.desktop`
    width: 250px;
    margin-top: 62px;
  `}
  ${screen.tabletBelow`
    display: none;
  `}
`

const Circle = styled.div`
  position: absolute;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${colors.black};
  ${screen.desktop`
    left: -80px;  
  `}
  ${screen.overDesktop`
    left: -124px;  
  `}
`

const MobCircle = Circle.extend`
  ${screen.tablet`
    left: calc(138px / 2);
    transform: translateX(-50%);
  `}
  ${screen.mobile`
    right: calc(84px / 2);
    transform: translateX(50%);
  `}
  ${screen.desktopAbove`
    display: none;
  `}
`

const YearRange = styled.p`
  font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  transform: translateY(-160px) rotate(90deg);
  font-size: 12px;
  font-weight: bold;
  line-height: 3.17;
  ${screen.overDesktop`
    transform: translateY(-220px) rotate(90deg);
  `}
  ${screen.mobile`
    transform: translateY(-120px) rotate(90deg);
  `}
`

const SemiTransparentMask = styled.div `
  position: absolute;
  top: 0;
  ${props => props.position === 'left' ? 'left: 0' : 'right: 0'};
  width: 50px;
  height: 100%;
  background: ${props => `linear-gradient(to ${props.position}, rgba(255,255,255,0), ${colors.white})`};
  ${screen.mobile`
    display: none;
  `}
`

export default class Section3 extends PureComponent {
  constructor(props) {
    super(props)
    this.minMaxYear = this._getYearRange(awardsList)
    this.state = {
      activeAwardId: awardsName[0].awardId,
      carouselPageIndex: 1,
      currentDataList: groupedAwards[awardsName[0].awardId],
      transitionEffect: true
    }
  }
  /**
   *  Callback function when clicking carousel arrows for changing page index ( Only on tablet and mobile )
   *  @param {String} direction
   */
  _gotoNextAward = (direction) => {
    let newPageIndex = 0
    let { carouselPageIndex } = this.state
    switch(direction) {
      case 'next':
        newPageIndex = ++carouselPageIndex % awardsNameForCarousel.length
        break
      case 'prev':
        newPageIndex = --carouselPageIndex % awardsNameForCarousel.length
        break
      default:
        return
    }
    this.setState({ 
      carouselPageIndex: newPageIndex,
      activeAwardId: awardsNameForCarousel[newPageIndex + 1].awardId
    })
  }
  _selectAward = (awardId) => {
    this.setState({
      activeAwardId: awardId
    })
  }
  /**
   *  Given data list and return the max and min year of current data
   *  @param {Array} list
   *  @returns {Array} [maxYear, minYear]
   */
  _getYearRange = (list) => {
    return list.map(item => Number(item.date.split('/')[0])).reduce((accumulator, currentValue) => {
      return [
        (!accumulator[0]) ? currentValue : Math.min(currentValue, accumulator[0]),
        (!accumulator[1]) ? currentValue : Math.max(currentValue, accumulator[1])
      ]
    },[])
  }
  /**
   *  A callback function of event transitionend, which is used to shift back to start when touch the end here
   */
  _onItemShifted = () => {
    const itemLength = awardsNameForCarousel.length
    let pageIndex = this.state.carouselPageIndex
    if (pageIndex === itemLength - 2) {
      pageIndex = 2
      this.setState({
        transitionEffect: false,
        carouselPageIndex: pageIndex
      })
      this.forceUpdate()
    } else if (pageIndex === 0) {
      pageIndex = itemLength - 4
      this.setState({
        transitionEffect: false,
        carouselPageIndex: pageIndex
      })
      this.forceUpdate()
    } else {
      if (!this.state.transitionEffect) {
        this.setState({
          transitionEffect: true
        })
      }
    }
  }

  render() {
    const selectedDatalist = groupedAwards[this.state.activeAwardId]
    return (
    <Container>
      <SectionWrapper>
        <LeftColumn>
          <MobCircle />
          <Title>
            <span>得獎</span>
            <span>AWARD</span>
          </Title>
          <ListSelector>
            <AwardsNameList
              awardsName={awardsName}
              activeAwardId={this.state.activeAwardId}
              selectAward={this._selectAward}
            />
            <Circle />
          </ListSelector>
          <Achievement>
            <AwardsCount>
              <img src={riceEarBlack} />
              <h2>{awardsList.length}</h2>
              <p>件</p>
              <img src={riceEarBlack} />            
            </AwardsCount>
            <YearRange>{this.minMaxYear[0]}-{this.minMaxYear[1]}</YearRange>
          </Achievement>
        </LeftColumn>
        <CarouselSelector>
          <LeftArrow
            onClick={() => this._gotoNextAward('prev')}>
            <ArrowNextIcon />
          </LeftArrow>
          <RightArrow
            onClick={() => this._gotoNextAward('next')}>
            <ArrowNextIcon />
          </RightArrow>
          <PageWrapper>
            <AwardsSelector
              transitionEffect={this.state.transitionEffect}
              pageNumber={this.state.carouselPageIndex}
              onTransitionEnd={this._onItemShifted}
            >
              <AwardsNameList
                awardsName={awardsNameForCarousel}
                activeAwardId={this.state.activeAwardId}
                selectAward={() => {}}
              />
            </AwardsSelector>
            <SemiTransparentMask position={'left'}/>
            <SemiTransparentMask position={'right'}/>
          </PageWrapper>
        </CarouselSelector>
        <Content
          gotoNextPage={this._gotoNextPage}
          selectedDatalist={selectedDatalist}
        />
      </SectionWrapper>
    </Container>
  )
  }
}
