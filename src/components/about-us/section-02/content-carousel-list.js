import Arrows from './arrows'
import Navigation from '../utils/navigation'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import carouselMarkup from '../constants/section-02/carousel-markup'
import categories from '../constants/section-02/categories'
import colors from '../../../constants/colors'
import mq from '../utils/media-query'
import screen from '../utils/screen'
import styled from 'styled-components'
import { font } from '../constants/styles'
import { gray } from './utils'
import { headcountPerPage } from '../constants/section-02/headcount-per-page'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import { storageUrlPrefix } from '../utils/config'
// lodash
import assign from 'lodash/assign'
import debounce from 'lodash/debounce'
import groupBy from 'lodash/groupBy'
import isEqual from 'lodash/isEqual'
import values from 'lodash/values'

const profileUrlPrefix = `${storageUrlPrefix}/member/`

const _ = {
  assign,
  debounce,
  groupBy,
  isEqual,
  values,
}

const categoriesAll = categories.fundation.concat(categories.media)
const transitionDuration = 500

const Container = styled.div`
  ${mq.mobileOnly`
    display: none;
  `}
`

const Department = styled.div`
  position: relative;
  background: linear-gradient(to bottom, ${colors.white} 30%, ${
  colors.gray.gray96
} 30%);
  display: inline-block;
  ${mq.hdOnly`
    margin-top: 102px;
    height: calc(148px * 3/2);
    padding: 0px 72px;
    ${props => props.markup[screen.hd]}
  `}
  ${mq.desktopOnly`
    margin-top: 35px;
    height: calc(116px * 3/2);
    padding: 0 30px;
    ${props => props.markup[screen.desktop]}
  `}
  ${mq.tabletOnly`
    margin-top: 30px;
    height: calc(116px * 3/2);
    padding: 0px 95px;
    ${props => props.markup[screen.tablet]}
  `}
`

const PageWrapper = styled.div`
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
  transform: translate3d(${props => props.shiftx}, 0px, 0px);
  transition: ${props =>
    props.transitionEffect
      ? `all ${transitionDuration}ms ease-in-out`
      : 'all 1ms ease-in-out'};
`

const Member = styled.li`
  position: relative;
  display: inline-block;
  text-align: center;
  height: 100%;
  ${mq.hdOnly`
    img:first-child{
      width: 114px;
      margin-bottom: 19px;
    }
    width: calc(100% / ${props => props.numPerPage[screen.hd]});
  `}
  ${mq.desktopOnly`
    img:first-child{
      width: 85px;
      margin-bottom: 15px;
    }
    width: calc(100% / ${props => props.numPerPage[screen.desktop]});
  `}
  ${mq.tabletOnly`
    img:first-child{
      width: 94px;
    }
    width: calc(100% / ${props => props.numPerPage[screen.tablet]});
  `}
`

const Info = styled.div`
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
    visibility: ${props => (props.isMailIconVisible ? 'visible' : 'hidden')};
    width: 15px;
    cursor: pointer;
  }
  ${mq.hdOnly`
    img{
      margin-top: 34px;
    }
  `}
  ${mq.desktopOnly`
    img{
      margin-top: 10px;
    }
  `}
  ${mq.tabletOnly`
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
  p {
    color: ${gray.lightgray};
    font-size: 20px;
    font-weight: ${font.weight.medium};
  }
  ${mq.hdOnly`
    p{
      font-size: 22px;
    } 
  `}
  ${mq.tabletOnly`
    transform: translateX(-75%);
  `}
`

const StyledArrows = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  ${mq.tabletAndAbove`
    top: calc(50% + 50% / 3);
    height: 116px;
  `}
  ${mq.hdOnly`
    height: 148px;
  `}
`

const NavigationWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  margin-bottom: -5px;
`

export default class CarouselMemberList extends PureComponent {
  constructor(props) {
    super(props)
    this.memberList = []
    this.membersPageLengthArray = []
    this.membersResidueArray = []
    this.membersNumPerPageArray = []
    this.carouselData = _.assign({}, this.props.groupedMembers)
    this.state = {
      transitionEffect: true,
      currentPagesArray: [],
    }
  }
  componentDidMount() {
    this._membersPageMaker()
    window.addEventListener('resize', _.debounce(this._membersPageMaker, 500))
  }
  componentWillUnmount() {
    window.removeEventListener(
      'resize',
      _.debounce(this._membersPageMaker, 500)
    )
    this.membersPageLengthArray = null
    this.membersResidueArray = null
    this.membersNumPerPageArray = null
  }
  /**
   *  Get horizontal shift of member list carousel
   *  @param {Number} categoryIndex
   *  @returns {String}
   */
  _getShiftX = categoryIndex => {
    const { currentPagesArray } = this.state
    if (typeof this.membersPageLengthArray !== 'undefined') {
      const pageLength = this.membersPageLengthArray[categoryIndex]
      const currentPage = currentPagesArray[categoryIndex]
      const numbersInAPage = this.membersNumPerPageArray[categoryIndex]
      const residueOfPages = this.membersResidueArray[categoryIndex]
      let currentShiftNumbers = numbersInAPage
      if (pageLength > 3 && residueOfPages > 0) {
        // For not to have any blank in a page
        currentShiftNumbers =
          currentPage === pageLength - 2 || currentPage === pageLength - 1
            ? residueOfPages
            : numbersInAPage
      }
      let shiftX =
        (((currentPage - 1) * numbersInAPage + currentShiftNumbers) /
          numbersInAPage) *
        100
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
    const pageLength = this.membersPageLengthArray[categoryIndex]
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

    const newMembersNumPerPageArray = this.memberList.map(list => {
      return (
        Math.round((list.offsetWidth / list.childNodes[0].offsetWidth) * 10) /
        10
      )
    })

    if (_.isEqual(this.membersNumPerPageArray, newMembersNumPerPageArray))
      return

    this.membersNumPerPageArray = newMembersNumPerPageArray

    this.membersPageLengthArray = this.memberList.map(
      (list, departmentIndex) => {
        return (
          Math.ceil(
            membersNumberArray[departmentIndex] /
              this.membersNumPerPageArray[departmentIndex]
          ) + 2
        )
      }
    )

    this.membersResidueArray = this.memberList.map((list, departmentIndex) => {
      return (
        membersNumberArray[departmentIndex] %
        this.membersNumPerPageArray[departmentIndex]
      )
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
    categoriesAll.forEach((category, index) => {
      const categoryId = category.id
      const members = groupedMembers[categoryId]
      const numbersInAPage = this.membersNumPerPageArray[index]
      const newMembers = [
        ...members.slice(members.length - numbersInAPage, members.length),
        ...members,
        ...members.slice(0, numbersInAPage),
      ]
      this.carouselData[categoryId] = newMembers
    })
  }

  _setCurrentPages = newCurPagesArray => {
    this.setState({
      currentPagesArray: newCurPagesArray,
    })
  }
  /**
   * Given the index of department and flip direction (next or prev), compute the new page number
   * @param {Number} departmentIndex
   * @param {String} direction ('next' or 'prev')
   */
  _changePage = (departmentIndex, direction) => {
    const { currentPagesArray } = this.state
    let newPageNum = 0
    let newCurPagesArray = [].concat(currentPagesArray)
    switch (direction) {
      case 'next':
        newPageNum =
          ++currentPagesArray[departmentIndex] %
          this.membersPageLengthArray[departmentIndex]
        break
      case 'prev':
        newPageNum =
          --currentPagesArray[departmentIndex] %
          this.membersPageLengthArray[departmentIndex]
        if (newPageNum < 0) {
          newPageNum = this.membersPageLengthArray[departmentIndex] + newPageNum
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
    const departments = categoriesAll.map((category, categoryIndex) => {
      const categoryId = category.id
      const label = category.label
      return (
        <Department key={categoryId} markup={carouselMarkup[categoryId]}>
          <Name>
            <p>{label.chinese}</p>
          </Name>
          <StyledArrows>
            <Arrows
              membersPageLengthArray={this.membersPageLengthArray}
              visible={this.membersPageLengthArray[categoryIndex] > 3}
              changePage={this._changePage.bind(null, categoryIndex)}
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
                      <Member key={index} numPerPage={headcountPerPage[categoryId]}>
                        <img
                          src={`${replaceGCSUrlOrigin(`${profileUrlPrefix}${member.profile}`)}`}
                        />
                        <Info
                          isMailIconVisible={Boolean(member.email)}
                        >
                          <p>{member['job.zh-tw']}</p>
                          <p>{member['name.zh-tw']}</p>
                          <img
                            onClick={() => sendEmail(member.email)}
                            src={`${replaceGCSUrlOrigin(
                              `${storageUrlPrefix}/mail.png`
                            )}`}
                          />
                        </Info>
                      </Member>
                    )
                  })
                : null}
            </MemberList>
          </PageWrapper>
          <NavigationWrapper>
            <Navigation
              pagesLength={this.membersPageLengthArray[categoryIndex]}
              currentPage={currentPagesArray[categoryIndex]}
              startPage={1}
              endPage={this.membersPageLengthArray[categoryIndex] - 1}
              navigationWidth={65}
            />
          </NavigationWrapper>
        </Department>
      )
    })
    return <Container>{departments}</Container>
  }
}

CarouselMemberList.defaultProps = {
  sendEmail: () => {},
  membersNumberArray: [],
  groupedMembers: {},
}

CarouselMemberList.propTypes = {
  sendEmail: PropTypes.func,
  membersNumberArray: PropTypes.array,
  groupedMembers: PropTypes.object
}
