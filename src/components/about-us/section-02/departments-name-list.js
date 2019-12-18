import colors from '../../../constants/colors'
import { font } from '../constants/styles'
import { gray } from './utils'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const DepartmentName = styled.p `
  display: inline-block;
  border-right: solid 1px rgba(0, 0, 0, 0.2);
  width: calc( 100% / ${props => props.categoriesLength});
  text-align: center;
  font-size: 16px;
  font-weight: ${font.weight.bold};
  letter-spacing: 2px;
  cursor: pointer;
  color: ${props => props.selected ? `${colors.black}` : `${gray.lightgray}`};
  span:first-child{
    padding-bottom: 5px;
    border-bottom: ${props => props.selected ? `solid 8px ${colors.black}` : 'none'};
  }
`

const Container = styled.div `
  ${DepartmentName}:last-child{
    border-right: none;
  }
`

export default class DepartmentsNameList extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const { categoriesAll, selectDepartment, selectedDepartmentIndex } = this.props
    return (
      <Container>
        {
          categoriesAll.map((category, categoryIndex) => {
            const categoryName = category.label.chinese.split('')
            return (
              <DepartmentName 
                key={category.id} 
                onClick={() => selectDepartment(categoryIndex)}
                selected={selectedDepartmentIndex === categoryIndex}
                categoriesLength={categoriesAll.length}
              >
                {
                  categoryName.map((word, index) => {
                    return (
                      <span key={index}>{word}</span>
                    )
                  })
                }
              </DepartmentName>
            )
          })
        }

      </Container>
    )
  }
}

DepartmentsNameList.defaultProps = {
  categoriesAll: [],
  selectedDepartmentIndex: 0
}

DepartmentsNameList.propTypes = {
  categoriesAll: PropTypes.array.isRequired,
  selectDepartment: PropTypes.func.isRequired,
  selectedDepartmentIndex: PropTypes.number.isRequired
}

