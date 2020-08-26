import colors from '../../../constants/colors'
import { font } from '../constants/styles'
import mq from '../utils/media-query'
import map from 'lodash/map'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const _ = {
  map,
}

const AwardItem = styled.div`
  display: inline-block;
  ${mq.desktopAndAbove`
    display: block;
    width: 100%;
    p{
      text-align: left;
      font-weight: bold;
      opacity: ${props => (props.currentIndex === 'true' ? '1' : '0.31')};
      font-weight: bold;
      transition: all 200ms ease-in-out;
    }
    cursor: pointer;
    ul{
      display: ${props => (props.currentIndex === 'true' ? 'block' : 'none')};
      list-style: none;
      padding: 0;
      margin-top: 0;
      margin-bottom: 25px;
      li>p{
        font-family: ${font.family.english.roboto}, ${
    font.family.sansSerifFallback
  };
        font-weight: ${font.weight.bold};
        font-size: 15px;
        letter-spacing: 0.5px;
        margin: 0;
      }
    }
  `}
  ${mq.hdOnly`
    p{
      margin-bottom: ${props =>
        props.currentIndex === 'true' ? '25px' : '11px'};
      letter-spacing: ${props =>
        props.currentIndex === 'true' ? '0.8px' : '0.5px'};
      font-size: ${props => (props.currentIndex === 'true' ? '24px' : '16px')};
    }
  `}
  ${mq.desktopOnly`
    p{
      margin-bottom: ${props =>
        props.currentIndex === 'true' ? '25px' : '11px'};
      letter-spacing: ${props =>
        props.currentIndex === 'true' ? '0.7px' : '0.5px'};
      font-size: ${props => (props.currentIndex === 'true' ? '22px' : '16px')};
    }
  `}
`

const Cursor = styled.span`
  display: inline-block;
  visibility: ${props =>
    props.isCurrentYear === 'true' ? 'visible' : 'hidden'};
  width: 12px;
  height: 4px;
  background: ${colors.black};
  vertical-align: middle;
  margin-right: 5px;
`

export default class AwardNameList extends PureComponent {
  render() {
    const {
      awardsName,
      activeAwardId,
      selectAward,
      awardYearList,
      selectYear,
      activeYearIndex,
    } = this.props
    return (
      <React.Fragment>
        {awardsName.map((name, index) => {
          return (
            <AwardItem
              key={index}
              currentIndex={(activeAwardId === name.awardId).toString()}
            >
              <p onClick={() => selectAward(name.awardId, index)}>
                {name.award}
              </p>
              <ul>
                {_.map(awardYearList[index], (year, yearIndex) => {
                  return (
                    <li key={year} onClick={() => selectYear(yearIndex)}>
                      <p>
                        <Cursor
                          isCurrentYear={(
                            activeYearIndex === yearIndex
                          ).toString()}
                        />
                        {year}
                      </p>
                    </li>
                  )
                })}
              </ul>
            </AwardItem>
          )
        })}
      </React.Fragment>
    )
  }
}

AwardNameList.defaultProps = {
  awardsName: [],
  activeAwardId: '',
  awardYearList: [],
  activeYearIndex: 0,
  selectAward: () => {},
  selectYear: () => {},
}

AwardNameList.propTypes = {
  awardsName: PropTypes.array.isRequired,
  activeAwardId: PropTypes.string.isRequired,
  selectAward: PropTypes.func,
  awardYearList: PropTypes.array.isRequired,
  selectYear: PropTypes.func,
  activeYearIndex: PropTypes.number.isRequired,
}
