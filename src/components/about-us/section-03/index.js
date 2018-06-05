import { colors } from '../../../themes/common-variables'
import { font } from '../constants/styles'
import { marginBetweenSections } from '../constants/styles'
import { screen } from '../utils/screen'
import awardJsonData from '../constants/section-03/awards.json'
import awardsName from '../constants/section-03/awards-name.json'
import Content from './content'
import groupBy from 'lodash/groupBy'
import React, { PureComponent } from 'react'
import riceEarBlack from '../../../../static/asset/about-us/rice-ear-black.png'
import riceEarGolden from '../../../../static/asset/about-us/rice-ear-golden.png'
import styled from 'styled-components'
import titleImg from '../../../../static/asset/about-us/title-section3.png'
import titleImgMob from '../../../../static/asset/about-us/title-section3-mob.png'
import Waypoint from 'react-waypoint'

const _ = {
  groupBy
}

const groupedAwards = _.groupBy(awardJsonData, award => award.awardId)
const groupedNames = _.groupBy(awardsName, award => award.awardId)
const awardsData = Object.values(groupedAwards).map(awardsArray =>
  awardsArray.map(award => Object.assign(award, groupedNames[award.awardId][0]))
)
const awardsList = [].concat(...Object.values(awardsData))
const awardsNumberInSinglePage = 4
const pagesLength = Math.ceil( awardsList.length / awardsNumberInSinglePage )
const defaultZIndex = 0

const Container = styled.div`
  position: relative;
  background-color: ${colors.white};
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

const SectionWrapper = styled.div`
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
    padding: 119px 120px 125px 85px;
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
const BorderBottom = styled.div`
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: calc( ${defaultZIndex} + 1 );
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

const Title = styled.h1`
  background-image: url(${titleImg});
  background-repeat: no-repeat;
  background-size: contain;
  float: left;
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
    width: 84px;
    height: 195px;
    border-bottom: solid 18px ${colors.secondaryColor};
  `}
`

const AwardsCount = styled.div`
  position: relative;
  display: block;
  float: left;
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
  } 
  p{
    font-weight: ${font.weight.extraBold};
    margin: 0;
  }
  ${screen.desktopAbove`
    width: 100%;
  `}
  ${screen.overDesktop`
    height: 97px;
    h2{
      font-size: 72px;
      margin: -10px 0 10px 0;
    }
    p{
      font-size: 18px;
      letter-spacing: 0.4px;
    }
  `}
  ${screen.desktop`
    height: 65.3px;  
    h2{
      font-size: 48px;
      margin: -7px 0 7px 0;
    }
    p{
      font-size: 12px;
      letter-spacing: 0.2px;
    }
  `}
  ${screen.tablet`
    width: 138px;
    height: 65.3px;
    h2{
      font-size: 48px;
      margin: 0 0 5px 0;
    }
    p{
      font-size: 12px;
      letter-spacing: 0.2px;
    }
  `}
  ${screen.mobile`
    width: 126.5px;
    height: 56px;
    h2{
      font-size: 36px;
      margin: 0 0 5px 0;
    }
    p{
      font-size: 14px;      
      letter-spacing: 0.3px;
    }
  `}
`

const Achievement = styled.div`
  display: block;
  ${AwardsCount}:last-child{
    h2, p{
      color: ${colors.secondaryColor};      
    }
  }
  ${screen.desktopAbove`
    left: 0;
    bottom: 0;  
  `}
  ${screen.tabletAbove`
    position: absolute;
  `}
  ${screen.overDesktop`
    width: 205px;
    margin: 0 0 145px 146px;
    ${AwardsCount}:last-child{
      margin-top: 57px;
    }
  `}
  ${screen.desktop`
    width: 138px;
    margin: 0 0 125px 85px;
    ${AwardsCount}:last-child{
      margin-top: 47.7px;
    }
  `}
  ${screen.tablet`
    top: 210.4px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 202px);
    ${AwardsCount}:last-child{
      float: right;
    }
  `}
  ${screen.mobile`
    position: relative;
    width: 100%;
    margin-top: 42px;
    ${AwardsCount}:last-child{
      float: right;
    }
  `}
`

const Pagination = styled.div`
  display: inline-block;
  width: calc( 75px / ${pagesLength} );
  height: 2px;
  opacity: ${props => props.isCurrentPage ? 1 : 0.25};
  background: ${colors.black};
  margin: 0 1px;
`

const Navigation = styled.div`
  position: absolute;
  left: 50%;
  bottom: 45px;
  transform: translateX(-50%);
  width: 50%;
  display: block;
  text-align: center;
  padding: 0;
  margin: 0;
  ${screen.tabletAbove`
    display: none;
  `}
`

export default class Section3 extends PureComponent {
  constructor(props) {
    super(props)
    this.clickCtr = 0
    this.state = {
      timelineAutoScrolling: false,
      page: 0,
      isBorderBottomfixed: true
    }
  }
  _gotoNextPage = () => {
    this.setState({ page: ++this.clickCtr % pagesLength })
  }
  _onPositionChange = (prevPos, currPos) => {
    if (prevPos === 'inside' && currPos === 'above') {
      this.setState({ isBorderBottomfixed: false })
    } else if (prevPos === 'above' && currPos === 'inside') {
      this.setState({ isBorderBottomfixed: true })
    } else if (prevPos === 'below' && currPos === 'inside') {
      this.setState({ timelineAutoScrolling: true })
    }
  }

  _createNavigation = () => {
    let navigation = []
    let pagination = []
    for (let i = 0; i < pagesLength; i++) {
      pagination.push(<Pagination key={i} isCurrentPage={i === this.state.page} />)
    }
    navigation.push(<Navigation key="nav">{pagination}</Navigation>)
    return navigation
  }
  render() {
    return (
      <Container>
        <SectionWrapper>
          <Title>
            <span>得獎</span>
            <span>AWARD</span>
          </Title>
          <Achievement>
            <AwardsCount>
              <img src={riceEarBlack} />
              <h2>{awardsList.length}</h2>
              <p>作品</p>
              <img src={riceEarBlack} />            
            </AwardsCount>
            <AwardsCount>
              <img src={riceEarGolden} />
              <h2>{Object.keys(groupedNames).length}</h2>
              <p>獎項</p>
              <img src={riceEarGolden} />            
            </AwardsCount>
          </Achievement>
          <Content
            page={this.state.page}
            awardsNumberInSinglePage={awardsNumberInSinglePage}
            timelineAutoScrolling={this.state.timelineAutoScrolling}
            awardsList={awardsList}
            gotoNextPage={this._gotoNextPage}
          />
          {this._createNavigation()}
        </SectionWrapper>
        <BorderBottom 
          fixed={this.state.isBorderBottomfixed}
        />
        <Waypoint
          onPositionChange={({ previousPosition, currentPosition }) => this._onPositionChange(previousPosition, currentPosition)}
          fireOnRapidScroll
        />
      </Container>
    )
  }
}
