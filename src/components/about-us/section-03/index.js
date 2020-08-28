import colors from '../../../constants/colors'
import { font, marginBetweenSections } from '../constants/styles'

import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import mq from '../utils/media-query'
import { storageUrlPrefix } from '../utils/config'
import awardsList from '../constants/section-03/awards.json'
import awardsName from '../constants/section-03/awards-name.json'
import AwardsNameList from './awards-name-list'
import Content from './content'
import groupBy from 'lodash/groupBy'
import keys from 'lodash/keys'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const _ = {
  groupBy,
  keys,
}

const groupedAwards = _.groupBy(awardsList, award => award.awardId)

const awardGroupByNameAndYear = awardsName.map(name =>
  _.groupBy(groupedAwards[name.awardId], record => record.date.split('/')[0])
)

const awardYearList = awardsName.map(name =>
  _.keys(
    _.groupBy(groupedAwards[name.awardId], record => record.date.split('/')[0])
  ).reverse()
)

const Container = styled.div`
  position: relative;
  background-color: ${colors.white};
  overflow: hidden;
  ${mq.desktopAndAbove`
    min-height: 100vh;
  `}
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
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 1440px;
    height: 950px;
    padding: 97px 162px 145px 146px;
  `}
  ${mq.desktopOnly`
    width: 1024px;
    height: 820px;
    padding: 78px 120px 156.1px 76px;
  `}
  ${mq.tabletOnly`
    width: 100%;
    min-height: 1024px;
    padding: 82px 101px 67px 101px;
  `}
  ${mq.mobileOnly`
    width: 100%;
    min-height: 922px;
    padding: 50px 47.2px 93px 43px
  `}
`

const LeftColumnOnDesktopAbove = styled.div`
  position: relative;
  ${mq.desktopAndAbove`
    display: inline-block;
    height: 100%;
  `}
  ${mq.desktopOnly`
    width: 345px;
  `}
  ${mq.hdOnly`
    width: 423px;
  `}
  ${mq.tabletOnly`
    text-align: center;
  `}
`

const Title = styled.h1`
  background-image: url(${replaceGCSUrlOrigin(
    `${storageUrlPrefix}/title-section3.png`
  )});
  background-repeat: no-repeat;
  background-size: contain;
  display: inline-block;
  margin: 0;
  span{
    display: none;
  }
  ${mq.desktopOnly`
    width: 259px;
    height: 182px;
  `}
  ${mq.hdOnly`
    width: 361px;
    height: 231px;
  `}
  ${mq.tabletAndBelow`
    background-image: url(${replaceGCSUrlOrigin(
      `${storageUrlPrefix}/title-section3-mob.png`
    )});
    background-position: center top;
    float: none;
    margin: 0 auto;
  `}
  ${mq.tabletOnly`
    width: 134px;
    height: 300px;
  `}
  ${mq.mobileOnly`
    display: block;
    margin: 0;
    width: 84px;
    height: 195px;
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
    font-family: ${font.family.english.roboto}, ${
  font.family.sansSerifFallback
};
    font-weight: ${font.weight.bold};
    font-size: 36px;
    margin: 0 0 2px 0;
  }
  p{
    font-weight: ${font.weight.extraBold};
    margin: 0;
    font-size: 14px;
    letter-spacing: 0.2px;
  }

  ${mq.desktopAndAbove`
    width: 100%;
  `}
  ${mq.tabletOnly`
    width: 105px;
  `}
  ${mq.mobileOnly`
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
  ${mq.desktopAndAbove`
    left: 0;
    bottom: 0;
  `}
  ${mq.hdOnly`
    width: 108px;
  `}
  ${mq.desktopOnly`
    width: 108px;
    transform: translateX(-25%);
  `}
  ${mq.tabletOnly`
    left: 0;
    bottom: 0;
  `}
  ${mq.mobileOnly`
    position: relative;
    float: right;
  `}
`

const ListSelector = styled.div`
  position: relative;
  display: block;
  float: right;
  ${mq.hdOnly`
    width: 260px;
    margin-top: 68px;
  `}
  ${mq.desktopOnly`
    width: 250px;
    margin-top: 62px;
  `}
  ${mq.tabletAndBelow`
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
  ${mq.desktopOnly`
    left: -80px;
  `}
  ${mq.hdOnly`
    left: -124px;
  `}
`

const MobCircle = styled(Circle)`
  ${mq.tabletOnly`
    left: calc(105px / 2);
    transform: translateX(-50%);
  `}
  ${mq.mobileOnly`
    right: calc(84px / 2);
    transform: translateX(50%);
  `}
  ${mq.desktopAndAbove`
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
  ${mq.hdOnly`
    transform: translateY(-220px) rotate(90deg);
  `}
  ${mq.mobileOnly`
    transform: translateY(-120px) rotate(90deg);
  `}
`

export default class Section3 extends PureComponent {
  constructor(props) {
    super(props)
    this.minMaxYear = this._getYearRange(awardsList)
    this.state = {
      activeAwardId: awardsName[0].awardId,
      activeAwardIndex: 0,
      activeYearIndex: 0,
      carouselPageIndex: 1,
      currentDataList: groupedAwards[awardsName[0].awardId],
      transitionEffect: true,
    }
  }

  _selectAward = (awardId, awardIndex) => {
    this.setState({
      activeAwardId: awardId,
      activeAwardIndex: awardIndex,
      activeYearIndex: 0,
    })
  }

  _selectYear = yearIndex => {
    this.setState({
      activeYearIndex: yearIndex,
    })
  }

  /**
   *  Given data list and return the max and min year of current data
   *  @param {Array} list
   *  @returns {Array} [maxYear, minYear]
   */
  _getYearRange = list => {
    return list
      .map(item => Number(item.date.split('/')[0]))
      .reduce((accumulator, currentValue) => {
        return [
          !accumulator[0]
            ? currentValue
            : Math.min(currentValue, accumulator[0]),
          !accumulator[1]
            ? currentValue
            : Math.max(currentValue, accumulator[1]),
        ]
      }, [])
  }

  render() {
    const { activeYearIndex, activeAwardIndex, activeAwardId } = this.state
    const currentYear = awardYearList[activeAwardIndex][activeYearIndex]
    const selectedDataList =
      awardGroupByNameAndYear[activeAwardIndex][currentYear]
    return (
      <Container>
        <SectionWrapper>
          <LeftColumnOnDesktopAbove>
            <MobCircle />
            <Title>
              <span>得獎</span>
              <span>AWARD</span>
            </Title>
            <ListSelector>
              <AwardsNameList
                awardsName={awardsName}
                activeAwardId={activeAwardId}
                selectAward={this._selectAward}
                awardYearList={awardYearList}
                selectYear={this._selectYear}
                activeYearIndex={activeYearIndex}
              />
              <Circle />
            </ListSelector>
            <Achievement>
              <AwardsCount>
                <img
                  src={`${replaceGCSUrlOrigin(
                    `${storageUrlPrefix}/rice-ear-black.png`
                  )}`}
                />
                <h2>{awardsList.length}</h2>
                <p>件</p>
                <img
                  src={`${replaceGCSUrlOrigin(
                    `${storageUrlPrefix}/rice-ear-black.png`
                  )}`}
                />
              </AwardsCount>
              <YearRange>
                {this.minMaxYear[0]}-{this.minMaxYear[1]}
              </YearRange>
            </Achievement>
          </LeftColumnOnDesktopAbove>
          <Content
            gotoNextPage={this._gotoNextPage}
            activeAwardId={activeAwardId}
            selectedDataList={selectedDataList}
            fulldatalist={awardGroupByNameAndYear}
            awardNamelist={awardsName}
            awardYearList={awardYearList}
            activeYearIndex={activeYearIndex}
          />
        </SectionWrapper>
      </Container>
    )
  }
}
