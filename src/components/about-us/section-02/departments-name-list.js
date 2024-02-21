import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
// utils
import { gray } from './utils'
// constants
import { font } from '../constants/styles'
// @twreporter
import { colorGrayscale } from '@twreporter/core/lib/constants/color'

const DepartmentName = styled.div`
  p {
    font-size: 14px;
    font-weight: ${font.weight.bold};
    word-spacing: -1px;
    color: ${props => (props.selected ? colorGrayscale.black : gray.lightgray)};
    width: max-content;
    margin-right: 20px;
  }
`

const Container = styled.div`
  display: flex;
  overflow: scroll;
  scrollbar-width: none;
  padding: 20px 0;
  &::-webkit-scrollbar {
    display: none;
  }
`

export default class DepartmentsNameList extends PureComponent {
  render() {
    const {
      categoriesAll,
      selectDepartment,
      selectedDepartmentIndex,
    } = this.props
    return (
      <Container>
        {categoriesAll.map((category, categoryIndex) => {
          return (
            <DepartmentName
              key={category.id}
              onClick={() => selectDepartment(categoryIndex)}
              selected={selectedDepartmentIndex === categoryIndex}
            >
              <p>{category.label.chinese}</p>
            </DepartmentName>
          )
        })}
      </Container>
    )
  }
}

DepartmentsNameList.defaultProps = {
  categoriesAll: [],
  selectedDepartmentIndex: 0,
}

DepartmentsNameList.propTypes = {
  categoriesAll: PropTypes.array.isRequired,
  selectDepartment: PropTypes.func.isRequired,
  selectedDepartmentIndex: PropTypes.number.isRequired,
}
