import { colors } from '../../../themes/common-variables'
import { font } from '../constants/styles'
import { gray, numbersInfullPage, numbersInHalfPage } from './utils'
import { replaceStorageUrlPrefix } from '@twreporter/react-components/lib/shared/utils'
import { screen } from '../utils/screen'
import { storageUrlPrefix } from '../utils/config'
import Arrows from './arrows'
import assign from 'lodash/assign'
import categories from '../constants/section-02/categories'
import categoryIds from '../constants/section-02/category-ids'
import find from 'lodash/find'
import groupBy from 'lodash/groupBy'
import keys from 'lodash/keys'
import Navigation from '../utils/navigation'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import values from 'lodash/values'

const _ = {
  groupBy, find, values, keys, assign
}

const categoriesAll = categories.fundation.concat(categories.media)
const transitionDuration = 500

const Container = styled.div`
  ${screen.mobile`
    display: none;
  `}
`

const Department = styled.div`
  position: relative;
  padding: 0 72px 5px 90px;
  background: linear-gradient(to bottom, ${colors.white} 30%, ${colors.gray.gray96} 30%);
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
    height: calc(148px * 3/2);
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
    height: calc(116px * 3/2);
    &:nth-child(3){
      padding: 0 34px 0 43.3px;
      width: 396px;
    }
    &:last-child{
      margin-left: calc(100% - 396px - 444px);
      width: 444px;
    }
  `}
  ${screen.tablet`
    margin-top: 30px;
    width: 100%;
    height: calc(116px * 3/2);
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
  transition: ${props => props.transitionEffect ? `all ${transitionDuration}ms ease-in-out` : 'all 1ms ease-in-out'};
`

const Member = styled.li`
  position: relative;
  display: inline-block;
  text-align: center;
  height: 100%;
  ${screen.overDesktop`
    img:first-child{
      width: calc(76px * 1.5);
    }
    width: calc(100% / ${numbersInfullPage.overDesktop});
  `}
  ${screen.desktop`
    img:first-child{
      width: calc(62.6px * 1.5);
    }
    width: calc(100% / ${numbersInfullPage.desktop});
  `}
  ${screen.tablet`
    img:first-child{
      width: calc(62.6px * 1.5);
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
  p:nth-child(2){
    font-size: 18px;
    font-weight: ${font.weight.bold};
    letter-spacing: 0.4px;
  }
  img{
    visibility: ${props => props.isMailIconVisible ? 'visible' : 'hidden'};
    width: 15px;
    cursor: pointer;
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
    font-weight: ${font.weight.medium};
  }
  ${screen.tablet`
    transform: translateX(-75%);
    p{
      font-size: 20px;
    }
  `}
`

const StyledArrows = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  ${screen.mobile`
    height: calc(465px - 49px);
  `}
  ${screen.tabletAbove`
    top: calc(50% + 50% / 3);
    height: 116px;
  `}
  ${screen.overDesktop`
    height: 148px;
  `}
`

const NavigationWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  margin-bottom: -5px;
  ${screen.mobile`
    position: relative;
    text-align: center;
    margin: 0 auto;
  `}
`

export default class CarouselMemberList extends PureComponent {
  constructor(props) {
    super(props)
    this.memberList = []
    this.membersPageLengthArray = []
    this.membersResidueArray = []
    this.membersNumInAFullPageArray = []
    this.carouselData = _.assign({},this.props.groupedMembers)
    this.state = {
      transitionEffect: true,
      currentPagesArray: []
    }
  }
  componentDidMount() {
    this._membersPageMaker()
    window.addEventListener('resize', this._membersPageMaker)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this._membersPageMaker)
    this.membersPageLengthArray = null
    this.membersResidueArray = null
    this.membersNumInAFullPageArray = null
  }
  /**
   *  Get horizontal shift of member list carousel
   *  @param {Number} categoryIndex
   *  @returns {String}
   */
  _getShiftX = (categoryIndex) => {
    const { currentPagesArray } = this.state
    if (typeof this.membersPageLengthArray !== 'undefined') {
      const pageLength =  this.membersPageLengthArray[categoryIndex]
      const currentPage = currentPagesArray[categoryIndex]
      const numbersInAPage = this.membersNumInAFullPageArray[categoryIndex]
      const residueOfPages = this.membersResidueArray[categoryIndex]
      let currentShiftNumbers = numbersInAPage
      if (pageLength > 3 && residueOfPages > 0) {
        // For not to have any blank in a page
        currentShiftNumbers = (currentPage === pageLength - 2 || currentPage === pageLength - 1) ? residueOfPages : numbersInAPage
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
    const { currentPagesArray } = this.state
    const pageLength =  this.membersPageLengthArray[categoryIndex]
    let currentPage = currentPagesArray
    if (currentPage[categoryIndex] === pageLength - 1) {
      currentPage[categoryIndex] = 1
      this.setState({ transitionEffect: false })
      this._setCurrentPages(currentPage)
    } else if (currentPage[categoryIndex] === 0) {
      currentPage[categoryIndex] = pageLength - 2
      this.setState({ transitionEffect: false })
      this._setCurrentPages(currentPage)
    } else {
      if (!this.state.transitionEffect) {
        this.setState({ transitionEffect: true })
      }
    }
  }
  _membersPageMaker = () => {
    const { groupedMembers, membersNumberArray } = this.props
    let initialCurrentPages = []
    this.membersPageLengthArray = this.memberList.map((list) => {
      return Math.ceil(list.scrollWidth / list.offsetWidth) + 2
    })

    this.membersNumInAFullPageArray = this.memberList.map((list) => {
      return Math.round(list.offsetWidth / list.childNodes[0].offsetWidth * 10) / 10
    })

    this.membersResidueArray = this.memberList.map((list, departmentIndex) => {
      return  membersNumberArray[departmentIndex] % this.membersNumInAFullPageArray[departmentIndex]
    })

    // Seting initial current pages
    initialCurrentPages = categoriesAll.map((categoryId, categoryIndex) => {
      if (this.membersPageLengthArray[categoryIndex] > 3) {
        return 1
      }
      return 0
    })
    this._setCurrentPages(initialCurrentPages)

    // Making data for the usage of carousel
    _.keys(groupedMembers).forEach((categoryId, index) => {
      const members = groupedMembers[categoryId]
      const numbersInAPage = this.membersNumInAFullPageArray[index]
      const newMembers = [ ...members.slice(members.length - numbersInAPage, members.length), ...members, ...members.slice(0, numbersInAPage) ]
      this.carouselData[categoryId] = newMembers
    })
  }

  _setCurrentPages = (newCurPagesArray) => {
    this.setState({
      currentPagesArray: newCurPagesArray
    })
  }
  /**
   * Given the index of department and flip direction (next or prev), compute the new page number
   * @param {Number} departmentIndex
   * @param {String} direction ('next' or 'prev')
   */
  _changePage = ( departmentIndex, direction ) => {
    const { currentPagesArray } = this.state
    let newPageNum = 0
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
  render() {
    const { sendEmail } = this.props
    const { currentPagesArray } = this.state
    const Departments = _.values(categoryIds).map((categoryId, categoryIndex) => {
      let label = _.find(categoriesAll, { id: categoryId }).label
      return(
        <Department key={categoryId}>
          <Name><p>{label.chinese}</p></Name>
          <StyledArrows>
            <Arrows
              membersPageLengthArray = {this.membersPageLengthArray}
              visible = {this.membersPageLengthArray[categoryIndex] > 3}
              changePage = {this._changePage.bind(null, categoryIndex)}
            />
          </StyledArrows>
          <PageWrapper>
            <MemberList
              ref={memberList => this.memberList[categoryIndex] = memberList}
              shiftx = {this._getShiftX(categoryIndex)}
              transitionEffect = {this.state.transitionEffect}
              onTransitionEnd={(event) => this._onMemberListShifted(event, categoryIndex)}>
              {
                typeof this.carouselData[categoryId] !== 'undefined' ?
                  this.carouselData[categoryId].map((member, index) => {
                    return(
                      <Member key={index}>
                        <img
                          src={`${replaceStorageUrlPrefix(member.profile)}`}
                        />
                        <Info
                          isMailIconVisible={typeof member.email !== 'undefined'}
                        >
                          <p>{member.job}</p>
                          <p>{member.name}</p>
                          <img
                            onClick={() => sendEmail(member.email)}
                            src={`${replaceStorageUrlPrefix(`${storageUrlPrefix}/mail.png`)}`}
                          />
                        </Info>
                      </Member>
                    )
                  }) : null
              }
            </MemberList>
          </PageWrapper>
          <NavigationWrapper>
            <Navigation
              pagesLength = {this.membersPageLengthArray[categoryIndex]}
              currentPage = {currentPagesArray[categoryIndex]}
              startPage = {1}
              endPage = {this.membersPageLengthArray[categoryIndex] - 1}
              navigationWidth = {65}
            />
          </NavigationWrapper>
        </Department>
      )
    })
    return (
      <Container>
        {Departments}
      </Container>
    )
  }
}

CarouselMemberList.defaultProps = {
  sendEmail: () => {},
  membersNumberArray: [],
  groupedMembers: {}
}

CarouselMemberList.propTypes = {
  sendEmail: PropTypes.func.isRequired,
  membersNumberArray: PropTypes.array.isRequired,
  groupedMembers: PropTypes.object.isRequired
}

