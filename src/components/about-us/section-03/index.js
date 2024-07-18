import React, { PureComponent } from 'react'
import axios from 'axios'
import styled from 'styled-components'
// utils
import loggerFactory from '../../../logger'
import mq from '../utils/media-query'
import { storageUrlPrefix } from '../utils/config'
// configs
import configs, { sections } from '../configs'
// constants
import awardsName from '../constants/section-03/awards-name.json'
import { font, marginBetweenSections } from '../constants/styles'
// components
import AwardsNameList from './awards-name-list'
import Content from './content'
// @twreporter
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const logger = loggerFactory.getLogger()

const Container = styled.div`
  position: relative;
  background-color: ${colorGrayscale.white};
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
  background: ${colorGrayscale.black};
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
    this.state = {
      activeAward: awardsName[0].award,
      activeYearIndex: 0,
      carouselPageIndex: 1,
      transitionEffect: true,
      config: null,
    }
  }

  componentDidMount() {
    this._getConfig()
  }

  _selectAward = award => {
    this.setState({
      activeAward: award,
      activeYearIndex: 0,
    })
  }

  _selectYear = yearIndex => {
    this.setState({
      activeYearIndex: yearIndex,
    })
  }

  _getConfig = () => {
    return axios
      .get(configs[sections.section3])
      .then(res => {
        this.setState({ config: _.get(res, 'data') })
      })
      .catch(err => {
        logger.errorReport({
          report: err,
          message:
            'Something went wrong during getting configs for about-us page section3',
        })
      })
  }

  render() {
    const { config, activeYearIndex, activeAward } = this.state
    const groupedRecords = _.get(config, 'groupedRecords')
    const awardYears = _.get(config, 'awardYears')
    const maxYear = _.get(config, 'yearInterval.max')
    const minYear = _.get(config, 'yearInterval.min')
    const total = _.get(config, 'total', 0)
    const currentYear = _.get(awardYears, `${activeAward}.${activeYearIndex}`)
    const selectedRecords = _.get(
      groupedRecords,
      `${activeAward}.${currentYear}`,
      []
    )

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
                activeAward={activeAward}
                selectAward={this._selectAward}
                awardYears={awardYears}
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
                <h2>{total}</h2>
                <p>件</p>
                <img
                  src={`${replaceGCSUrlOrigin(
                    `${storageUrlPrefix}/rice-ear-black.png`
                  )}`}
                />
              </AwardsCount>
              <YearRange>
                {minYear}-{maxYear}
              </YearRange>
            </Achievement>
          </LeftColumnOnDesktopAbove>
          <Content
            activeAward={activeAward}
            selectedRecords={selectedRecords}
            fullRecords={groupedRecords}
            awardsName={awardsName}
            awardYears={awardYears}
            activeYearIndex={activeYearIndex}
          />
        </SectionWrapper>
      </Container>
    )
  }
}
