import { colors } from '../../../themes/common-variables'
import { foundationIntro, mediaIntro } from '../constants/section-02/org-intro'
import { gray, numbersInfullPage, numbersInHalfPage, devices } from './utils'
import { marginBetweenSections } from '../constants/styles'
import { screen } from '../utils/screen'
import Arrows from './arrows'
import categories from '../constants/section-02/categories'
import categoryIds from '../constants/section-02/category-ids'
import DepartmentsNameList from './departments-name-list'
import find from 'lodash/find'
import foundationMembers from '../constants/section-02/fundation-members'
import groupBy from 'lodash/groupBy'
import mail from '../../../../static/asset/about-us/mail.png'
import mediaMembers from '../constants/section-02/media-members'
import Navigation from './navigation'
import PaginatedMemberList from './paginated-list'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import sz from '../constants/screen-size'
import testImg from '../../../../static/asset/about-us/NicoFang.png'
import titleImg from '../../../../static/asset/about-us/title-section2.png'
import titleImgMob from '../../../../static/asset/about-us/title-section2-mob.png'

const _ = {
  groupBy, find
}

const halfPageList = [ 2, 3 ] // index of 2, 3 in categoriesAll are rendered in half page
const members = [ ...mediaMembers, ...foundationMembers ]
const categoriesAll = [ ...categories.media, ...categories.fundation ]
const groupedMembers = _.groupBy( members, member => member.category )
const membersNumberArray = Object.values(groupedMembers).map((membersArray) => { return membersArray.length })
const transitionDuration = 500

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
  background-image: url(${titleImg});
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

const Intro = styled.div`
  display: block;
  p{
    font-size: 14px;
    font-weight: normal;
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

const Department = styled.div`
  position: relative;
  padding: 0 72px 0 90px;
  background: linear-gradient(to bottom, ${colors.white} 25%, ${colors.gray.gray96} 25%);
  ${screen.desktopAbove`
    &:nth-child(3){
      display: inline-block;
      li{
        width: calc(100% / ${numbersInHalfPage});
      }
    }
    &:last-child {
      display: inline-block;
      li{
        width: calc(100% / ${numbersInHalfPage});
      }
    }  
  `}
  ${screen.overDesktop`
    margin-top: 102px;
    height: calc(148px * 4/3);
    &:nth-child(3){
      width: 559px;
    }
    &:last-child {
      width: 583px;
      margin-left: calc(100% - 559px - 583px);
    }  
  `}
  ${screen.desktop`
    margin-top: 35px;
    height: calc(116px * 4/3);
    &:nth-child(3){
      padding: 0 34px 0 43.3px;
      width: 396px;
    }
    &:last-child {
      width: 444px;
      margin-left: calc(100% - 396px - 444px);
    }    
  `}
  ${screen.tablet`
    margin-top: 30px;
    width: 100%;
    height: calc(116px * 4/3);
  `}
`

const PageWrapper = styled.div `
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const MemberList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  height: 100%;
  margin-top: 0;
  margin-bottom: 0;
  white-space: nowrap;
  transform: translate3d(${props => props.shiftx} , 0px, 0px);
  transition: ${props => props.transitionEffect ? `all ${transitionDuration}ms ease-in-out` : `all 1ms ease-in-out`};
`

const Member = styled.li`
  position: relative;
  display: inline-block;
  text-align: center;
  height: 100%;
  ${screen.overDesktop`
    img:first-child{
      width: 76px;
    }
    width: calc(100% / ${numbersInfullPage.overDesktop});
  `}
  ${screen.desktop`
    img:first-child{
      width: 62.6px;
    }
    width: calc(100% / ${numbersInfullPage.desktop});  
  `}
  ${screen.tablet`
    img:first-child{
      width: 70.9px;
    }
    width: calc(100% / ${numbersInfullPage.tablet});  
  `}
`

const Info = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  p:first-child{
    font-size: 13px;
    letter-spacing: 0.9px;
  }
  p:last-child{
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 0.4px;   
  }
  img{
    width: 15px;
  }
  ${screen.overDesktop`
    img{
      margin-top: 34px;
    }  
  `}
  ${screen.desktop`
    img{
      margin-top: 15px;
    }  
  `}
  ${screen.tablet`
    img{
      width: 19px;
      margin-top: 11px;
    }
  `}
`

const Name = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(-90%);
  border-top: solid 11px ${gray.lightgray};
  width: 18px;
  padding-top: 8px;
  p{
    color: ${gray.lightgray};
    font-size: 22px;
    font-weight: bold;
  }
  ${screen.tablet`
    transform: translateX(-75%);
    p{
      font-size: 20px;
    }
  `}
`

const DisplayOnTabletAbove = styled.div`
  ${screen.mobile`
    display: none;
  `}
`

const DisplayOnMobile = styled.div`
  ${screen.tabletAbove`
    display: none;
  `}
`

export default class Section2 extends PureComponent {
  constructor(props) {
    super(props)
    this.memberList = []
    this.membersPageLengthArray = []
    this.numbersInOnePage = 0
    this.device = null
    this.carouselData = {}
    this.state = {
      transitionEffect: true,
      currentPagesArray: [],
      selectedDepartmentIndex: 0 
    }
  }
  /**
   * Given the index of department and flip direction (next or prev), compute the new page number
   * @param {Number} departmentIndex
   * @param {String} direction ('next' or 'prev')
   */
  _changePage = ( departmentIndex, direction ) => {
    let newPageNum = 0
    let { currentPagesArray } = this.state
    let newCurPagesArray = [].concat(currentPagesArray)
    switch (direction) {
      case 'next':
        newPageNum = ++currentPagesArray[departmentIndex] % this.membersPageLengthArray[departmentIndex]
        break
      case 'prev':
        newPageNum = --currentPagesArray[departmentIndex] % this.membersPageLengthArray[departmentIndex]
        if (newPageNum < 0) {
          newPageNum =  this.membersPageLengthArray[departmentIndex] + newPageNum
        }
        break
      default: 
        return
    }
    newCurPagesArray = [].concat(currentPagesArray)
    newCurPagesArray[departmentIndex] = newPageNum
    this.setState({ currentPagesArray: newCurPagesArray })
  }
  /**
   *  Get horizontal shift of member list carousel
   *  @param {Number} categoryIndex
   *  @returns {String} 
   */
  _getShiftX = (categoryIndex) => {
    if (typeof this.membersPageLengthArray !== 'undefined') {
      let pageLength =  this.membersPageLengthArray[categoryIndex]
      let currentPage = this.state.currentPagesArray[categoryIndex]
      let numbersInAPage = (halfPageList.includes(categoryIndex)) ? numbersInHalfPage : this.numbersInOnePage
      let residueOfPages = membersNumberArray[categoryIndex] % numbersInAPage
      let currentShiftNumbers = numbersInAPage
      if (pageLength > 3 && residueOfPages > 0) {
        currentShiftNumbers = (currentPage === pageLength - 2 || currentPage === pageLength - 1) ? residueOfPages : numbersInAPage // For not to have any blank in a page
      }
      let shiftX = ((currentPage - 1) * numbersInAPage + currentShiftNumbers) / numbersInAPage * 100
      if (shiftX !== 0) {
        return `-${shiftX}%`
      }
    }
    return 0
  }
  /**
   *  A callback function of event transitionend, which is used to shift back to start when touch the end here
   *  @param {Number} categoryIndex
   */
  _onMemberListShifted = (event, categoryIndex) => {
    const pageLength =  this.membersPageLengthArray[categoryIndex]
    let currentPage = this.state.currentPagesArray
    if (currentPage[categoryIndex] === pageLength - 1) {
      currentPage[categoryIndex] = 1
      this.setState({
        transitionEffect: false, 
        currentPagesArray: currentPage 
      })
      this.forceUpdate()
    } else if (currentPage[categoryIndex] === 0) {
      currentPage[categoryIndex] = pageLength - 2
      this.setState({
        transitionEffect: false,
        currentPagesArray: currentPage
      })
      this.forceUpdate()
    } else {
      if (!this.state.transitionEffect) {
        this.setState({ transitionEffect: true })
      }
    }
  }
  _selectDepartment = (index) => {
    this.setState({ selectedDepartmentIndex: index })
  }
  componentDidMount() {
    let initialCurrentPages = []
    if (window.matchMedia(`(min-width: ${sz.xLargeScreenMinWidth}px)`).matches) {
      // overDesktop
      this.device = devices.desktop
      this.numbersInOnePage = numbersInfullPage.overDesktop
    } else if (window.matchMedia(`(min-width: ${sz.largeScreenMinWidth}px) and (max-width: ${sz.largeScreenMaxWidth}px)`).matches) {
      // desktop
      this.device = devices.desktop
      this.numbersInOnePage = numbersInfullPage.desktop
    } else if (window.matchMedia(`(min-width: ${sz.mediumScreenMinWidth}px) and (max-width: ${sz.mediumScreenMaxWidth}px)`).matches) {
      // tablet
      this.device = devices.tablet
      this.numbersInOnePage = numbersInfullPage.tablet
    } else {
      // mobile
      this.device = devices.mobile
      this.numbersInOnePage = numbersInfullPage.mobile
    }

    this.membersPageLengthArray = membersNumberArray.map((memberNumber, index) => {
      switch(this.device) {
        case devices.desktop:
          if (halfPageList.includes(index)) {
            return Math.ceil( memberNumber / numbersInHalfPage ) + 2     
          }
          return Math.ceil( memberNumber / this.numbersInOnePage ) + 2
        case devices.tablet:
          return Math.ceil(memberNumber / this.numbersInOnePage) + 2
        case devices.mobile:
          return Math.ceil(memberNumber / this.numbersInOnePage)
        default:
          return
      }
    })

    // Seting initial current pages
    initialCurrentPages = categoriesAll.map((categoryId, categoryIndex) => {
      if (this.device !== devices.mobile && this.membersPageLengthArray[categoryIndex] > 3) {
        return 1
      }
      return 0
    })
    this.setState({ currentPagesArray: initialCurrentPages })

    // Making data for the usage of carousel
    Object.keys(groupedMembers).forEach((categoryId, index) => {
      let members = groupedMembers[categoryId]
      let numbersInAPage = (halfPageList.includes(index)) ? numbersInHalfPage : this.numbersInOnePage
      let newMembers = (this.device !== devices.mobile)?[ ...members.slice(members.length - numbersInAPage, members.length), ...members, ...members.slice(0, numbersInAPage) ] : [ ... members ]
      this.carouselData[categoryId] = newMembers
    })
  }
  render() {
    const Departments = Object.values(categoryIds).map((categoryId, categoryIndex) => {
      let label = _.find(categoriesAll, { id: categoryId }).label
      return(
        <Department key={categoryId}>
          <Name><p>{label.chinese}</p></Name>
          <Arrows
            departmentIndex = {categoryIndex}
            membersPageLengthArray = {this.membersPageLengthArray}
            visible = {this.membersPageLengthArray[categoryIndex] > 3}
            changePage = {this._changePage}
          />
          <PageWrapper>
            <MemberList
              ref={memberList => this.memberList[categoryIndex] = memberList}
              shiftx = {this._getShiftX(categoryIndex)}
              transitionEffect = {this.state.transitionEffect} 
              onTransitionEnd={() => this._onMemberListShifted(event, categoryIndex)}>
              {
                typeof this.carouselData[categoryId] !== 'undefined' ?
                this.carouselData[categoryId].map((member, index) => {
                  return(
                    <Member key={index}>
                      <img src={testImg} />
                      <Info>
                        <p>{member.job}</p>
                        <p>{member.name}</p>
                        <img src={mail} />
                      </Info>
                    </Member>
                  )
                }) : null  
              }
            </MemberList>
          </PageWrapper>
          <Navigation
            departmentIndex = {categoryIndex}
            device = {this.device}
            pagesLength = {this.membersPageLengthArray[categoryIndex]}
            currentPage = {this.state.currentPagesArray[categoryIndex]}
          />
        </Department>
      )
    })

    // make cursor for paginated member list on mobile
    let cursor = (this.state.currentPagesArray[this.state.selectedDepartmentIndex] + 1) * numbersInfullPage.mobile
    let selectedMemberList = groupedMembers[Object.values(categoryIds)[this.state.selectedDepartmentIndex]]
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
              <DisplayOnTabletAbove>
                {Departments}
              </DisplayOnTabletAbove>
              <DisplayOnMobile>
                <DepartmentsNameList 
                  categoriesAll = {categoriesAll}
                  selectDepartment = {this._selectDepartment}
                  selectedDepartmentIndex = {this.state.selectedDepartmentIndex} />
                <PaginatedMemberList 
                    selectedDepartmentIndex = {this.state.selectedDepartmentIndex}
                    membersPageLengthArray = {this.membersPageLengthArray}
                    isArrowVisible = {this.membersPageLengthArray[this.state.selectedDepartmentIndex] > 1}
                    changePage = {this._changePage}
                    cursor = {cursor}
                    selectedMemberList = {selectedMemberList} />
                <Navigation
                  departmentIndex = {this.state.selectedDepartmentIndex}
                  device = {this.device}
                  pagesLength = {this.membersPageLengthArray[this.state.selectedDepartmentIndex]}
                  currentPage = {this.state.currentPagesArray[this.state.selectedDepartmentIndex]}
                />
              </DisplayOnMobile>
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
