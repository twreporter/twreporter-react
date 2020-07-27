import CarouselMemberList from './content-carousel-list'
import PaginatedMemberList from './content-paginated-list'
import React, { PureComponent } from 'react'
import axios from 'axios'
import categories from '../constants/section-02/categories'
import colors from '../../../constants/colors'
import configs, { sections } from '../configs'
import loggerFactory from '../../../logger'
import mq from '../utils/media-query'
import styled from 'styled-components'
import { foundationIntro, mediaIntro, rules } from '../constants/section-02/org-intro'
import { gray } from './utils'
import { marginBetweenSections } from '../constants/styles'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import { storageUrlPrefix } from '../utils/config'
//lodash
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'

const _ = {
  get,
  groupBy
}

const logger = loggerFactory.getLogger()

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
  background-image: url(${replaceGCSUrlOrigin(
    `${storageUrlPrefix}/title-section2.png`
  )});
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
    background-image: url(${replaceGCSUrlOrigin(
      `${storageUrlPrefix}/title-section2-mob.png`
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
    this.state = {
      groupedMembers: null
    }
  }
  componentDidMount() {
    this._getConfig()
  }
  _sendEmail = (email) => {
    if (typeof email !== 'undefined') {
      const url = `mailto:${email}`
      window.open(url, '_blank')
    }
  }

  /*
   * Member type definition
   * @typeof {Object} Member
   * @property {string} name.zh-tw - member's name (zh-tw)
   * @property {string} name.en - member's name (en)
   * @property {string} job.zh-tw - member's job (zh-tw)
   * @property {string} job.en - member's job (en)
   * @property {string} profile - image filename of member's profile
   * @property {string} email - member's email
   * @property {string} category - the department name which member belongs to
   */

  /*
   * groupedMembers type definition
   * @typeof {Object} groupedMembers
   * @property {string} category - name of departments
   *
   * For example:
   * {
   *   'fundation': [{}, {}, ...],
   *   'editor': [{}, {}, ...]
   * }
   */
    
  /* 
   * This function converts config to `groupedMembers`
   *
   * @param {Member[]} config
   * 
   */
  _setStateByConfig = (config) => {
    this.setState({ groupedMembers : _.groupBy(config, member => member.category) })
  }
  _getConfig = () => {
    return axios.get(configs[sections.section2])
      .then(res => {
        const config = _.get(res, 'data.rows')
        if (config) {
          this._setStateByConfig(config)
        }
      })
      .catch((err) => {
        logger.errorReport({
          report: err,
          message: 'Something went wrong during getting configs for about-us page section2'
        })
      })
  }
  render() {
    const { groupedMembers } = this.state
    let membersNumberArray = []
    let content
    if (groupedMembers) {
      /*
       * membersNumberArray is an array contains headcounts of each departments
       *
       * membersNumberArray type definition
       * @typeof {number[]} membersNumberArray
       *
       */
      membersNumberArray = [ ...categories.fundation, ...categories.media ].map((category) => {
        if (groupedMembers[category.id]) {
          return groupedMembers[category.id].length 
        }
      })
      content = (
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
      ) 
    }
    return (
      <Container>
        <SectionWrapper>
          <Title>
            <span>成員</span>
            <span>MEMBERS</span>
          </Title>
          {content}
          <Intro>
            <p>{foundationIntro.chinese}</p>
            <p>{mediaIntro.chinese}</p>
            {rules.chinese.map((rule, index) => {
              return <p key={'rule' + index}>{rule}</p>
            })}
          </Intro>
        </SectionWrapper>
      </Container>
    )
  }
}
