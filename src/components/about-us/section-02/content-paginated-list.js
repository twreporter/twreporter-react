import Arrows from './arrows'
import DepartmentsNameList from './departments-name-list'
import Navigation from '../utils/navigation'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import categories from '../constants/section-02/categories'
import categoryIds from '../constants/section-02/category-ids'
import colors from '../../../constants/colors'
import mq from '../utils/media-query'
import screen from '../utils/screen'
import styled from 'styled-components'
import values from 'lodash/values'
import { gray } from './utils'
import { headcountPerPage } from '../constants/section-02/headcount-per-page'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import { storageUrlPrefix } from '../utils/config'

const _ = {
  values
}

const categoriesAll = categories.fundation.concat(categories.media)

const Container = styled.div`
  position: relative;
  display: block;
  width: 100%;
  ${mq.tabletAndAbove`
    display: none;
  `}
`

const MemberBlockList = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 465px;
  padding: 0 13px 0 13px;
  margin-top: 49px;
  background: ${colors.gray.gray96};
`

const MemberBlock = styled.div `
  position: relative;
  width: 100%;
  height: calc(100% / 4);
  padding: 0 20px; 
  span{
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
  img{
    vertical-align: middle;
    width: calc(60.5px * 1.2);
  }
`

const MemberBorder = styled.div `
  width: 100%;
  height: 100%;
  padding: 20px 0;
  border-bottom: solid 1px ${gray.bordergray};
`

const ProfileWrapper = styled.div `
  position: relative;
  display: table;
  float: right;
  width: calc(100% - ( 60.5px * 1.2));
  height: 100%;
  padding-left: 3.9%;
  img{
    visibility: ${props => props.isMailIconVisible ? 'visible' : 'hidden'};
    width: 16.9% ;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`

const Profile = styled.div `
  display: table-cell; 
  vertical-align: middle; 
  text-align: left;
  p:first-child{
    padding-right: 30%;
    font-size: 14px;
    letter-spacing: 1px;
  }
  p:last-child{
    font-size: 22px;
    font-weight: bold;
    letter-spacing: 0.5px;
  }
`

const StyledArrows = styled.div `
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  ${mq.mobileOnly`
    height: calc(465px - 49px);
  `}
  ${mq.tabletAndAbove`
    top: calc(50% + 50% / 3);
    height: 116px;
  `}
  ${mq.hdOnly`
    height: 148px;
  `}  
`

const NavigationWrapper = styled.div `
  position: absolute;
  right: 0;
  bottom: 0;
  margin-bottom: -5px;
  ${mq.mobileOnly`
    position: relative;
    text-align: center;
    margin: 0 auto;
  `}
`

export default class PaginatedMemberList extends PureComponent {
  constructor(props) {
    super(props)
    this.membersPageLengthArray = []
    this.state = {
      selectedDepartmentIndex: 0,
      currentPagesArray: categoriesAll.map(() => 0)
    }
  }

  componentDidMount() {
    this._pageMaker()
    window.addEventListener('resize', this._pageMaker)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._pageMaker)
    this.membersPageLengthArray = null
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

  _pageMaker = () => {
    const { membersNumberArray } = this.props
    const { selectedDepartmentIndex } = this.state
    const selectedCategoryId = _.values(categoryIds)[selectedDepartmentIndex]
    const numberPerPage = headcountPerPage[selectedCategoryId][screen.mobile]
    this.membersPageLengthArray = membersNumberArray.map((memberNumber) => Math.ceil(memberNumber / numberPerPage))
  }

  _selectDepartment = (index) => {
    this.setState({ selectedDepartmentIndex: index })
  }

  render() {
    const { selectedDepartmentIndex, currentPagesArray } = this.state
    const { groupedMembers } = this.props
    const selectedCategoryId = _.values(categoryIds)[selectedDepartmentIndex]
    const numberPerPage = headcountPerPage[selectedCategoryId][screen.mobile]
    const cursor = (currentPagesArray[selectedDepartmentIndex] + 1) * numberPerPage 
    const selectedMemberList = groupedMembers[selectedCategoryId]
    const memberBlocks = selectedMemberList.slice(cursor - numberPerPage, cursor).map((member) => {
      return(
        <MemberBlock key={member.name}>
          <MemberBorder>
            <span />
            <img src={member.profile} />
            <ProfileWrapper
              isMailIconVisible={typeof member.email !== 'undefined'}
            >
              <Profile>
                <p>{member.job}</p>
                <p>{member.name}</p>
              </Profile>
              <img 
                onClick={() => this.props.sendEmail(member.email)} 
                src={`${replaceGCSUrlOrigin(`${storageUrlPrefix}/mail.png`)}`}
              />
            </ProfileWrapper>
          </MemberBorder>          
        </MemberBlock>
      )
    })
    return (
      <Container>
        <DepartmentsNameList 
          categoriesAll = {categoriesAll}
          selectDepartment = {this._selectDepartment}
          selectedDepartmentIndex = {selectedDepartmentIndex} />
        <StyledArrows>
          <Arrows
            departmentIndex = {selectedDepartmentIndex}
            membersPageLengthArray = {this.membersPageLengthArray}
            visible = {this.membersPageLengthArray[selectedDepartmentIndex] > 1}
            changePage = {this._changePage.bind(null,selectedDepartmentIndex)}
          />           
        </StyledArrows>       
        <MemberBlockList>
          {memberBlocks}
        </MemberBlockList>
        <NavigationWrapper>
          <Navigation
            pagesLength = {this.membersPageLengthArray[selectedDepartmentIndex]}
            currentPage = {currentPagesArray[selectedDepartmentIndex]}
            startPage = {0}
            endPage = {this.membersPageLengthArray[selectedDepartmentIndex]}
            navigationWidth = {65}
          />
        </NavigationWrapper>
      </Container>
    )
  }
}

PaginatedMemberList.defaultProps = {
  groupedMembers: {},
  sendEmail: () => {},
  membersNumberArray: []
}

PaginatedMemberList.propTypes = {
  groupedMembers: PropTypes.object.isRequired,
  sendEmail: PropTypes.func.isRequired,
  membersNumberArray: PropTypes.array.isRequired
}
