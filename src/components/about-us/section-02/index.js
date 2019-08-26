
import { colors } from '../../../themes/common-variables'
import { foundationIntro, mediaIntro, rules } from '../constants/section-02/org-intro'
import { gray } from './utils'
import { marginBetweenSections } from '../constants/styles'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import mq from '../utils/media-query'
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
import categories from '../constants/section-02/categories'

const _ = {
  groupBy, find, keys
}

const members = foundationMembers.concat(mediaMembers)
const groupedMembers = _.groupBy( members, member => member.category )
const membersNumberArray = [ ...categories.fundation, ...categories.media ].map((category) => { return groupedMembers[category.id].length})

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
  position: relative;
  display: block;
  margin: 0 auto;
  ${mq.hdOnly`
    width: 1440px;
    padding: 101px 135px 115px 122px;
  `}
  ${mq.desktopOnly`
    width: 1024px;
    padding: 60px 85px 163px 79px;
  `}  
  ${mq.tabletOnly`
    width: 100%;
    padding: 45px 81px 94px 81px;
  `}
  ${mq.mobileOnly`
    width: 100%;
    padding: 50px 35px 64px 35px
  `}
`

const Title = styled.h1`
  background-image: url(${replaceGCSUrlOrigin(`${storageUrlPrefix}/title-section2.png`)});
  background-repeat: no-repeat;
  background-size: contain;
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
    background-image: url(${replaceGCSUrlOrigin(`${storageUrlPrefix}/title-section2-mob.png`)});
    background-position: center top;
    float: none;
    margin: 0 auto;
  `}
  ${mq.tabletOnly`
    width: 134px;
    height: 300px;
  `}
  ${mq.mobileOnly`
    width: 84px;
    height: 195px;
  `}
`

const Intro = styled.div`
  display: block;
  margin-top: 40px;
  p{
    font-size: 14px;
    line-height: 1.6;
    color: ${gray.lightgray};
  }
  ${mq.desktopAndBelow`
    line-height: 1.46;
    font-size: 13px;
  `}
  ${mq.tabletOnly`
    p{
      font-size: 12px;
    }
    margin-top: 25px;
  `}
  ${mq.mobileOnly`
    float: none;
    p{
      margin-bottom: 1em;
    }
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
  ${mq.tabletOnly`
    margin-top: 44.3px;
  `}
  ${mq.mobileOnly`
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
      <Container>
        <SectionWrapper>
          <Title>
            <span>成員</span>
            <span>MEMBERS</span>
          </Title>
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
          <Intro>
            <p>{foundationIntro.chinese}</p>
            <p>{mediaIntro.chinese}</p>
            {
              rules.chinese.map((rule, index) => {
                return <p key={'rule' + index}>{rule}</p>
              })
            }
          </Intro>
        </SectionWrapper>
      </Container>
    )
  }
}
