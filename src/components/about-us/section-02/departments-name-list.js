import colors from '../../../constants/colors'
import { font } from '../constants/styles'
import { gray } from './utils'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const DepartmentName = styled.div`
  display: inline-block;
  width: calc(100% / ${props => props.categoriesLength});
  cursor: pointer;
  text-align: center;
  p {
    font-size: 14px;
    font-weight: ${font.weight.bold};
    letter-spacing: 2px;
    color: ${props => props.selected ? colors.black : gray.lightgray};
    width: 14px;
    margin: 6px 0 5px 0;
    border-left: solid 1px rgba(0, 0, 0, 0.2);
    padding-left: calc((100% - 14px) / 2);
  }
  span:first-child:before {
    display: inline-block;
    content: '';
    height: 8px;
    width: 14px;
    background: ${colors.black};
    visibility: ${props => props.selected ? 'visible' : 'hidden'};
  }
  span:last-child:after {
    display: inline-block;
    content: "\u25CF";
    font-size: 14px;
    visibility: ${props => props.selected ? 'visible' : 'hidden'};
  }
`

const Container = styled.div `
  ${DepartmentName}:first-child > p {
    border-left: none;
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
            return (
              <DepartmentName 
                key={category.id} 
                onClick={() => selectDepartment(categoryIndex)}
                selected={selectedDepartmentIndex === categoryIndex}
                categoriesLength={categoriesAll.length}
              >
                <span />
                <p>{category.label.chinese}</p>
                <span />
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

