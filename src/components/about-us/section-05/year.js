import { colors } from '../constants/styles'
import { screen } from '../utils/screen'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Waypoint from 'react-waypoint'

const YearLabel = styled.div`
  background: #c7000a;
  color: ${colors.white};
  border-radius: 50%;
  text-align: center;
  ${screen.desktopAbove`
    width: 207px;
    height: 207px;
    h1{
      line-height: 207px;
    }
  `}
  ${screen.tabletBelow`
    width: 220px;
    height: 220px;
    h1{
      font-size: 36px;
      line-height: 220px;
    }
  `}
  ${screen.mobile`
    transform: translateX(-20%);    
  `}  
`
export class Year extends PureComponent {
  render() {
    return (
      <Waypoint
        onEnter={this.props.autoScrollStarter}
        bottomOffset="60%"
        fireOnRapidScroll
      >
        <YearLabel>
          <h1>{this.props.year}</h1>
        </YearLabel>
      </Waypoint>
    )
  }
}

export default Year
