import { screen } from '../utils/screen'
import categories from '../constants/section-02/categories'
import CategoriesTitle from './categories-title'
import CategoryBoxes from './category-boxes'
import categoryIds from '../constants/section-02/category-ids'
import categoryTitles from '../constants/section-02/category-titles'
import fundationMembers from '../constants/section-02/fundation-members'
import map from 'lodash/map'
import mediaMembers from '../constants/section-02/media-members'
import Member from './member'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const nTotal = fundationMembers.length + mediaMembers.length

const _ = {
  map
}

const MembersContainer = styled.div`
  margin-top: 56px;
  margin-bottom: 50px;
  ${screen.tabletAbove`
    display: flex;
    flex-wrap: wrap;
  `}
  ${screen.tablet`
    margin-top: 47px;
    margin-bottom: 53px;
  `}
  ${screen.desktop`
    margin-top: 68px;
    margin-bottom: 70px;
  `}
  ${screen.overDesktop`
    margin-top: 47px;
    margin-bottom: 70px;
  `}
`


const PanelContainer = styled.div`
  ${screen.tabletAbove`
    display: flex;
    justify-content: space-between;
  `}
`

const PanelGroup = styled.div`
  ${screen.mobile`
    margin-bottom: 66px;
    &:last-child {
      margin-bottom: 0;
    }
  `}
  ${screen.tabletAbove`
    flex-basis: ${props => props.baseWidth};
    flex-grow: 0;
    flex-shrink: 0;
  `}
  ${screen.desktopAbove`
    flex-basis: calc(${props => props.baseWidth} + 16px);
  `}
`


export default class MembersBlock extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      openedCategory: categoryIds.all
    }
  }

  _setOpenedCategory = (categoryId) => {
    this.setState({
      openedCategory: (this.state.openedCategory === categoryId) ? categoryIds.all : categoryId
    })
  }

  render() {
    const { openedCategory } = this.state
    return (
      <div>
        <PanelContainer>
          <PanelGroup baseWidth="254px">
            <CategoriesTitle
              chinese={categoryTitles.fundation.chinese}
              english={categoryTitles.fundation.english}
            />
            <CategoryBoxes
              openedCategory={openedCategory}
              categories={categories.fundation}
              setOpenedCategory={this._setOpenedCategory}
            />
          </PanelGroup>
          <PanelGroup baseWidth="450px">
            <CategoriesTitle
              chinese={categoryTitles.media.chinese}
              english={categoryTitles.media.english}
            />
            <CategoryBoxes
              openedCategory={openedCategory}
              categories={categories.media}
              setOpenedCategory={this._setOpenedCategory}
            />
          </PanelGroup>
        </PanelContainer>
        <MembersContainer>
          {_.map(fundationMembers, (member) => (
            <Member
              isActive={openedCategory === member.category}
              key={`board-${member.nameEng}`}
              nTotal={nTotal}
              {...member}
            />
          ))}
          {_.map(mediaMembers, (member) => (
            <Member
              isActive={openedCategory === categoryIds.all || openedCategory === member.category}
              key={member.nameEng}
              nTotal={nTotal}
              {...member}
            />
          ))}
        </MembersContainer>
      </div>
    )
  }
}
