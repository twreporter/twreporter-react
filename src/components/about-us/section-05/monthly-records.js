import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Record from './record'
import styled from 'styled-components'

const Container = styled.div`
  display: inline-block;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
`

export class MonthlyRecords extends PureComponent {
  render() {
    const { stopAutoScroll, startAutoScroll, data, isTriggered, monthlyNum } = this.props
    const Records = data.map((record, index) => {
      return (
        <Record
          key={index}
          onHover={stopAutoScroll}
          onLeave={startAutoScroll}
          month={record.month}
          date={record.date}
          imgSrc={record.image}
          text={record.text}
          link={record.link}
          isTriggered={isTriggered[monthlyNum][index].poped}
        />      
      )
    })
    return (
      <Container>
        {Records}
      </Container>  
    )
  }
}

MonthlyRecords.defaultProps = {
  monthlyNum: 0,
  data: [],
  isTriggered: []
}

MonthlyRecords.propTypes = {
  monthlyNum: PropTypes.number.isRequired,
  stopAutoScroll: PropTypes.func.isRequired,
  startAutoScroll: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  isTriggered: PropTypes.array.isRequired
}

export default MonthlyRecords
