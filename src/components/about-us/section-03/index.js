import { font } from '../constants/styles'
import { colors } from '../../../themes/common-variables'
import { marginBetweenSections } from '../constants/styles'
import { screen } from '../utils/screen'
import awardJsonData from '../constants/section-03/awards.json'
import awardsName from '../constants/section-03/awards-name.json'
import groupBy from 'lodash/groupBy'
import React, { PureComponent } from 'react'
import riceEarBlack from '../../../../static/asset/about-us/rice-ear-black.png'
import riceEarGolden from '../../../../static/asset/about-us/rice-ear-golden.png'
import styled from 'styled-components'
import Timeline from './timeline'
import titleImg from '../../../../static/asset/about-us/title-section3.png'
import titleImgMob from '../../../../static/asset/about-us/title-section1-mob.png'

const _ = {
  groupBy
}

const groupedAwards = _.groupBy(awardJsonData, award => award.awardId)
const groupedNames = _.groupBy(awardsName, award => award.awardId)
const awardsData = Object.values(groupedAwards).map(awardsArray => 
  awardsArray.map(award => Object.assign(groupedNames[award.awardId][0], award))
)
const awardsList = [].concat(...Object.values(awardsData))

const defaultZIndex = 0
const Container = styled.div`
  position: relative;
  background-color: ${colors.white};
  ${screen.desktopAbove`
    min-height: 100vh;
  `}
  ${screen.overDesktop`
    border: solid 8px ${colors.red.liverRed};
    margin: ${marginBetweenSections.overDesktop} 0;
  `}
  ${screen.desktop`
    border: solid 6px ${colors.red.liverRed};
    margin: ${marginBetweenSections.desktop} 0;
  `}
  ${screen.tablet`
    border: solid 7px ${colors.red.liverRed};
    margin: ${marginBetweenSections.tablet} 0;    
  `}  
  ${screen.mobile`
    border: solid 6px ${colors.red.liverRed};
    margin: ${marginBetweenSections.mobile} 0;    
  `}
`

const SectionWrapper = styled.div`
  position: relative;
  display: block;
  margin: 0 auto;
  ${screen.desktop`
    width: 1024px;
    height: 820px;
    padding: 119px 120px 125px 85px;
  `}  
  ${screen.overDesktop`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 1440px;
    height: 950px;
    padding: 97px 162px 145px 146px;
  `}
  ${screen.tablet`
    width: 432px;
    height: 849px;
  `}
  ${screen.mobile`
    width: 291px;
    height: 571px;
  `}
`

const Title = styled.div`
  background-image: url(${titleImg});
  background-repeat: no-repeat;
  background-size: contain;
  float: left;
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
  `}
  ${screen.mobile`
    width: 84px;
    height: 195px;
  `}
`

const Content = styled.div`
  position: relative;
  height: 100%;
  float: right;
  text-align: center;
  overflow-y: hidden;
  z-index: ${defaultZIndex};
  background: ${colors.gray.gray96};
  background-clip: content-box;
  padding: 54px 0 54px 24px;
  ${screen.overDesktop`
    width: 530px;
  `}
  ${screen.desktop`
    width: 432px;
  `}
  ul{
    text-align: left;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  a{
    color: ${colors.black};
  }
  p, h2{
    display: block;
    margin: 0;
  }
  li{
    margin: 10px;
    p:first-child{
      margin-left: -24px;
      span{
        font-size: 13px;
        letter-spacing: 2.2px;
        text-align: left;
      }
      span:first-child{
        font-weight: bold;
      }
    }
    h2{
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 0.8px;
    }
    p:last-child{
      font-size: 14px;
      font-weight: bold;
      line-height: 2.71;
      letter-spacing: 1px;
      color: ${colors.secondaryColor};
    }
  }

`

const SemiTransparentMask = styled.div`
  position: absolute;
  left: 0;
  ${props => props.position === 'top' ? 'top: 0' : 'bottom: 0'};
  width: 100%;
  height: 20px;
  background: ${props => props.position === 'top' ? 'linear-gradient(white, transparent)' : 'linear-gradient(transparent, white)'};
  z-index: calc( ${defaultZIndex} + 1 );
`

const AwardsCount = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 97px;
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
    font-family: ${font.family.english.roboto};    
    font-weight: bold;
  } 
  p{
    font-weight: 900;
    margin: 0;
  }
  ${screen.desktop`  
    h2{
      font-size: 48px;
      margin: 0 0 10px 0;
    }
    p{
      font-size: 12px;
      letter-spacing: 0.2px;
    }
  `}
  ${screen.overDesktop`
    h2{
      font-size: 72px;
      margin: -10px 0 10px 0;
    }
    p{
      font-size: 18px;
      letter-spacing: 0.4px;
    }
  `}
`

const Achievement = styled.div`
  position: absolute;
  display: block;
  left: 0;
  bottom: 0;
  width: 205px;
  ${AwardsCount}:last-child{
    h2, p{
      color: ${colors.secondaryColor};      
    }
  }
  ${screen.desktop`
    margin: 0 0 125px 85px;
    ${AwardsCount}:last-child{
      margin-top: 47.7px;
    }
  `}
  ${screen.overDesktop`
    margin: 0 0 145px 146px;
    ${AwardsCount}:last-child{
      margin-top: 57px;
    }
  `}
`

export default class Section3 extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentAnim: 0
    }
  }
  _animUpdated = (updatedIndex) => {
    this.setState({ currentAnim: updatedIndex })
  }
  componentDidMount() {
    const scrollingHeight = this.refs.scrollingContent.getBoundingClientRect().height
    this.setState({ scrollingHeight: scrollingHeight })
  }
  render() {
    const awardsItems = awardsList.map((item) => {
      return (
        <li>
          <a href={item.titleLink} target="_blank">
            <p><span>{item.ranking}</span>  <span>{item.group}</span></p>
            <h2>{item.title}</h2>
            <p>{item.award}</p>
          </a>
        </li>
      )
    })    
    return (
      <Container>
        <SectionWrapper>
          <Title />
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
          <Content>
            <Timeline childrenHeight={this.state.scrollingHeight}>
              <ul ref="scrollingContent" >              
                {awardsItems}
              </ul>
            </Timeline>
            <SemiTransparentMask position={'top'}/>
            <SemiTransparentMask position={'bottom'}/>
          </Content>
        </SectionWrapper>
      </Container>
    )
  }
}
