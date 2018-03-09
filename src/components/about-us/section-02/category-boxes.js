import { colors, font } from '../constants/styles'
import { screen } from '../utils/screen'
import get from 'lodash/get'
import map from 'lodash/map'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const _ = {
  map,
  get
}

const Container = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: ${colors.white};
`

const setWidthAndMarginByNOfRow = (nOfRow) => {
  let widthCss, marginCss
  switch (nOfRow) {
    case 1:
      widthCss = 'width: 100%'
      marginCss = ''
      break
    case 2:
      widthCss =  `width: calc((100% - 1px) / 2 - 1px);`
      marginCss = `
        margin: 1px 0 0 0;
        &:nth-of-type(even) {
          margin-left: 1px;
        }
        &:nth-of-type(1), &:nth-of-type(2) {
          margin-top: 0;
        }
      `
      break
    case 3:
      widthCss =  `width: calc((100% - 2px) / 3 - 1px);`
      marginCss = `
        margin: 0;
        &:nth-of-type(3n+2) {
          margin: 0 1px;
        }
      `
      break
    default:
      widthCss = ''
      marginCss = ''
      break
  }
  return `
    ${widthCss}
    ${marginCss}
  `
}

const CategoryBox = styled.li`
  position: relative;
  list-style-type: none;
  display: inline-block;
  margin: 0;
  background-color: ${props => (props.isActive ? '#916B40' : colors.secondary)};
  color: ${colors.white};
  transition: background-color 500ms ease;
  cursor: pointer;
  ${screen.mobile`
    text-align: center;
    padding: 17px 0;
    ${props => (props.nOfChildren === 1 ? setWidthAndMarginByNOfRow(1) : setWidthAndMarginByNOfRow(2))}
  `}
  ${screen.tabletAbove`
    text-align: left;
    padding: 17px 21px;
    ${props => (props.nOfChildren === 1 ? setWidthAndMarginByNOfRow(1) : setWidthAndMarginByNOfRow(3))}
  `}
`

const Label = styled.span`
  font-weight: ${font.weight.medium};
  vertical-align: baseline;
  white-space: nowrap;
`

const ChineseLabel = Label.extend`
  font-family: ${font.family.chinese}, ${font.family.sansSerifFallback};
  font-size: 14px;
  letter-spacing: 1px;
`
const EnglishLabel = Label.extend`
  font-family: ${font.family.english.din}, ${font.family.sansSerifFallback};
  font-size: 11px;
  margin-left: .4em;
  letter-spacing: 0;
`

export default class CategoryBoxes extends PureComponent {
  static propTypes = {
    setOpenedCategory: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.shape({
          chinese: PropTypes.string,
          english: PropTypes.string
        })
      })
    ).isRequired
  }

  _buildCategories = (category, key, categories) => {
    const { openedCategory, setOpenedCategory } = this.props
    const { id, label } = category
    const { chinese, english } = label
    return (
      <CategoryBox
        key={id}
        onClick={() => setOpenedCategory(id)}
        nOfChildren={_.get(categories, 'length')}
        isActive={openedCategory === id}
      >
        {!chinese ? null : <ChineseLabel>{chinese}</ChineseLabel>}
        {!english ? null : <EnglishLabel>{english}</EnglishLabel>}
      </CategoryBox>
    )
  }

  render() {
    const { categories } = this.props
    if (!_.get(categories, 'length')) {
      return null
    }
    return (
      <Container>
        {_.map(categories, this._buildCategories)}
      </Container>
    )
  }
}
