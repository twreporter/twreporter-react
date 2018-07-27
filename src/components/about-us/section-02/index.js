
import { colors } from '../../../themes/common-variables'
import { foundationIntro, mediaIntro } from '../constants/section-02/org-intro'
import { gray } from './utils'
import { marginBetweenSections } from '../constants/styles'
import { replaceStorageUrlPrefix } from '@twreporter/react-components/lib/shared/utils'
import { screen } from '../utils/screen'
import { storageUrlPrefix } from '../utils/config'
import CarouselMemberList from './content-carousel-list'
import find from 'lodash/find'
import foundationMembers from '../constants/section-02/fundation-members'
import groupBy from 'lodash/groupBy'
import keys from 'lodash/keys'
import mediaMembers from '../constants/section-02/media-members'
import PaginatedMemberList from './content-paginated-list'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import values from 'lodash/values'

const _ = {
  groupBy, find, values, keys
}

const members = mediaMembers.concat(foundationMembers)
const groupedMembers = _.groupBy( members, member => member.category )
const membersNumberArray = _.values(groupedMembers).map((membersArray) => { return membersArray.length })

const Container = styled.div`
  position: relative;
  background-color: ${colors.white};
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
    width: 1440px;
    padding: 101px 135px 115px 122px;
  `}
  ${screen.desktop`
    width: 1024px;
    padding: 60px 85px 163px 79px;
  `}  
  ${screen.tablet`
    width: 100%;
    padding: 45px 81px 94px 81px;
  `}
  ${screen.mobile`
    width: 100%;
    padding: 50px 35px 64px 35px
  `}
`

const Title = styled.h1`
  background-image: url(${replaceStorageUrlPrefix(`${storageUrlPrefix}/title-section2.png`)});
  background-repeat: no-repeat;
  background-size: contain;
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
    background-image: url(${replaceStorageUrlPrefix(`${storageUrlPrefix}/title-section2-mob.png`)});
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

const Intro = styled.div`
  display: block;
  p{
    font-size: 14px;
    line-height: 1.36;    
  }
  ${screen.overDesktop`
    float: right;
    transform: translateY(-100%);  
  `}
  ${screen.desktopBelow`
    float: left;
    font-size: 13px;
    line-height: 1.46;
    color: ${gray.lightgray};
    margin-top: 40px;
  `}
  ${screen.tabletBelow`
    p:first-child{
      margin-bottom: 1em;
    }
  `}
  ${screen.tablet`
    p{
      text-align: center;
      font-size: 12px;
      line-height: 1.46;
    }
    margin-top: 25px;
  `}
  ${screen.mobile`
    float: none;
  `}
`

const IntroOnOverDesktop = Intro.extend`
  ${screen.desktopBelow`
    display: none;
  `}
`

const IntroOnDesktopBelow = Intro.extend `
  ${screen.overDesktop`
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
  ${screen.tablet`
    margin-top: 44.3px;
  `}
  ${screen.mobile`
    margin-top: 45px;
  `}
`

export default class Section2 extends PureComponent {
  constructor(props) {
    super(props)
  }
  _sendEmail = (email) => {
    if (typeof email !== 'undefined') {
      let url = `mailto:${email}`
      window.open(url, '_blank')
    }
    return
  }
  render() {
    return (
      <Border>
        <Container>
          <SectionWrapper>
            <Title>
              <span>成員</span>
              <span>MEMBERS</span>
            </Title>
            <IntroOnOverDesktop>
              <p>{foundationIntro.chinese}</p>
              <p>{mediaIntro.chinese}</p>
            </IntroOnOverDesktop>
            <Content>
              <CarouselMemberList 
                membersNumberArray = {membersNumberArray}
                groupedMembers = {groupedMembers}
                sendEmail = {this._sendEmail} 
              />
              <PaginatedMemberList
                membersNumberArray = {membersNumberArray}
                groupedMembers = {groupedMembers}
                sendEmail = {this._sendEmail} 
              />              
            </Content>
            <IntroOnDesktopBelow>
              <p>{foundationIntro.chinese}</p>
              <p>{mediaIntro.chinese}</p>
            </IntroOnDesktopBelow>
          </SectionWrapper>
        </Container>
      </Border>
    )
  }
}
