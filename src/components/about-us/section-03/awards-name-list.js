import { colors } from '../../../themes/common-variables'
import { font } from '../constants/styles'
import { screen } from '../utils/screen'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const AwardItem = styled.div`
  display: inline-block;
  ${screen.desktopAbove`
    display: block;
    width: 100%;
    p{
      text-align: left;
      font-weight: bold;
      opacity: ${props => props.currentIndex === 'true' ? '1' : '0.31'};
      font-weight: bold;
      transition: all 200ms ease-in-out;
    }
    cursor: pointer;
    ul{
      display: ${props => props.currentIndex === 'true' ? 'block' : 'none'};
      list-style: none;
      padding: 0;
      margin-top: 0;
      margin-bottom: 25px;
      li>p{
        font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};    
        font-weight: ${font.weight.bold};
        font-size: 15px;
        letter-spacing: 0.5px;
        margin: 0;        
      }
    }
  `}
  ${screen.overDesktop`
    p{
      margin-bottom: ${props => props.currentIndex === 'true' ? '25px' : '11px'};
      letter-spacing: ${props => props.currentIndex === 'true' ? '0.8px' : '0.5px'};
      font-size: ${props => props.currentIndex === 'true' ? '24px' : '16px'};
    }  
  `}
  ${screen.desktop`
    p{
      margin-bottom: ${props => props.currentIndex === 'true' ? '25px' : '11px'};
      letter-spacing: ${props => props.currentIndex === 'true' ? '0.7px' : '0.5px'};
      font-size: ${props => props.currentIndex === 'true' ? '22px' : '16px'};
    }  
  `}
`

const Bullet = styled.span `
  display: inline-block;
  visibility: ${props => props.display === 'true' ? 'visible' : 'hidden'};
  margin-left: 9px;
  width: 0;
  height: 0;
	border-top: 9px solid transparent;
	border-left: 10px solid ${colors.black};
  border-bottom: 9px solid transparent;
  ${screen.tabletBelow`
    display: none;
  `}
`

const Cursor = styled.span`
  display: inline-block;
  visibility: ${props => props.isCurrentYear === 'true' ? 'visible' : 'hidden'};
  width: 12px;
  height: 4px;
  background: ${colors.black};
  vertical-align: middle;
  margin-right: 5px;
`

export default class AwardNameList extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const { awardsName, activeAwardId, selectAward, awardYearList, selectYear, activeYearIndex } = this.props
    return (
      <React.Fragment>
        {
          awardsName.map((name, index) => {
            return (
              <AwardItem
                key={index}
                currentIndex={(activeAwardId === name.awardId).toString()}
              >
                <p onClick={() => selectAward(name.awardId, index)}>
                  {name.award}
                  <span>
                    <Bullet display={(activeAwardId === name.awardId).toString()} />
                  </span>
                </p>
                <ul>
                  { 
                    typeof awardYearList[index] !== 'undefined' ?
                    awardYearList[index].map((year, yearIndex) => {
                      return(
                        <li
                          key={year}
                          onClick={() => selectYear(yearIndex)}>
                          <p><Cursor isCurrentYear={(activeYearIndex === yearIndex).toString()}/>{year}</p>
                        </li>
                      )
                    }): null
                  }
                </ul>
              </AwardItem>
            )
          })
        }
      </React.Fragment>    
    )
  }
}

AwardNameList.defaultProps = {
  awardsName: [],
  activeAwardId: '',
  awardYearList: [],
  activeYearIndex: 0
}

AwardNameList.propTypes = {
  awardsName: PropTypes.array.isRequired,
  activeAwardId: PropTypes.string.isRequired,
  selectAward: PropTypes.func,
  awardYearList: PropTypes.array.isRequired,
  selectYear: PropTypes.func,
  activeYearIndex: PropTypes.number.isRequired
}
