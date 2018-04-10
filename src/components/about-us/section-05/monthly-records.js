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
  constructor(props) {
    super(props)
  }
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

export default MonthlyRecords
