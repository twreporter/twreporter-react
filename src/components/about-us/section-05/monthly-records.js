// import { screen } from '../utils/screen'
import React, { PureComponent } from 'react'
import Record from './record'
import styled from 'styled-components'

const Container = styled.div`
  display: inline-block;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
  /* border: solid 2px black; */
`

export class MonthlyRecords extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const { stopAutoScroll, resumeAutoScroll, data } = this.props
    const Records = data.map((record, index) => {
      return (
        <Record
          key={index}
          onHover={stopAutoScroll}
          onLeave={resumeAutoScroll}
          month={record.month}
          date={record.date}
          imgSrc={record.image}
          text={record.text}
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
