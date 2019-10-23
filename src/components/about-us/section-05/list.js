import { colors } from '../../../themes/common-variables'
import { font } from '../constants/styles'
import { months } from '../constants/section-05/months'
import mq from '../utils/media-query'
import groupBy from 'lodash/groupBy'
import keys from 'lodash/keys'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import values from 'lodash/values'
import VelocityComponent from 'velocity-react/velocity-component'

const _ = {
  groupBy, values, keys
}

const defaultZIndex = 0
const dateBorderColor = '#d3d3d3'
const transitionDuration = 300

const OnlyDisplayOnMobile = styled.div `
  ${mq.tabletAndAbove`
    display: none;
  `}
`

const DisplayOnTabletAbove = styled.div `
  ${mq.mobileOnly`
    display: none;
  `}
`

const Record = styled.div `
  display: table;
  p{
    display: table-cell;
    vertical-align: middle;
    font-size: 13px;
    font-weight: ${font.weight.medium};
    line-height: 1.69;
    letter-spacing: 0.8px;
    &:first-child{
      width: 47px;
      text-align: right;
      font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};
      font-size: 14px;
      font-weight: bold;
      span{
        border-right: solid 1px ${dateBorderColor};
        padding-right: 10px;
      }
    }
    &:last-child{
      width: calc(100% - 47px);
      padding-left: 12px;
      text-align: left;
    }
  }
  ${mq.mobileOnly`
    margin: 10px 5px 10px 0;  
  `}
  ${mq.tabletAndAbove`
    p{
      font-size: 14px;
      line-height: 1.57;
      letter-spacing: 0.9px;
    }  
    p:last-child{
      padding: 15px 42px 20px 12px;
    }
  `}
  ${mq.hdOnly`
    p{
      font-size: 16px;
      line-height: 1.38;
      letter-spacing: 1px;
      &:first-child{
        width: 65px;
        font-weight: bold;
        span{
          padding-right: 12px;
        }
      }
      &:last-child{
        width: calc(100% - 65px);
        padding-left: 11px;
      }
    }
  `}
`

const Year = styled.div `
  margin: 0;
`

const YearLabel = styled.div `
  display: table;
  width: 100%;
  height: 76px;
  background: ${props => props.unfold ? `${colors.black}` : `${colors.gray.gray96}`};
  color:${props => props.unfold ? `${colors.white}` : `${colors.black}`};
  transition: ease ${transitionDuration}ms height;
  p{
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};    
    font-size: 32px;
    font-weight: bold;
  }
  ${mq.tabletAndAbove`
    display: none;
  `}
`

const Accomplishments = styled.div `
  width: 100%;
  ${mq.mobileOnly`
    transform-style: preserve-3d;
    margin-top: 2px;
  `}
`

const MonthLabel = styled.div `
  display: block;
  background: ${colors.white};
  width: 54px;
  height: 23px;
  text-align: center;
  p{
    font-size: 12px;
    font-weight: bold;
    line-height: 23px;
  }
  ${mq.hdOnly`
    p{
      font-size: 14px;
    }
  `}
  ${mq.tabletAndAbove`
    display: ${props => props.monthOrder === 0 ? 'block' : 'none'};
  `}  
`

const MonthlyAccomplishments = styled.div `
  margin-bottom: 2px;
  background: ${colors.gray.gray96};
  min-height: 76px;
`

const Accomplishment = styled.div `
  width: 100%;
  margin: 0;
  color: ${colors.black};
  ${mq.mobileOnly`
    position: relative;
    border-bottom: solid 1px ${colors.white};
    background: ${colors.gray.gray96};
    &:nth-child(odd) {
      &:before {
        content: '';
        background-image: linear-gradient(to top, ${colors.gray.gray64}, ${colors.gray.gray96} 80%);
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: ${props => props.unfold ? '0' : '1'};
        z-index: calc(${defaultZIndex} - 1);
        transition: opacity ${transitionDuration}ms ease-in-out;      
      }
    }
    &:nth-child(even) {
      &:before {
        content: '';
        background-image: linear-gradient(to bottom, ${colors.gray.gray64}, ${colors.gray.gray96} 80%);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: ${props => props.unfold ? '0' : '1'};
        z-index: calc(${defaultZIndex} - 1);
        transition: opacity ${transitionDuration}ms ease-in-out;     
      }
    }
  `}
`

const MockAccomplishment = styled.div`
  width: 100%;
  transform-origin: 50% 100% 0;
  position: relative;
  display: ${props => props.isOdd ? 'block' : 'none'};
`

export default class List extends PureComponent {
  constructor(props) {
    super(props)
    this.yearContent = []
  }

  componentDidMount() {
    const yearContentHeight = this.yearList.map((year, index) => ReactDOM.findDOMNode(this.yearContent[index]).getBoundingClientRect().height)
    this.props.getYearContentHeight(yearContentHeight)
  }

  _getDate = (date) => {
    let dateString = date.toString()
    if (dateString.length < 2) {
      return '0' + dateString
    }
    return dateString
  }
  _foldAnimation = (isUnfold, index, mockItem = false) => {
    let isOdd = index % 2 === 1
    let animationObj = {}
    if (isUnfold) {
      animationObj = {
        duration: transitionDuration,
        animation: {
          transformPerspective: 300,
          transformOriginX: '50%',
          transformOriginY: isOdd ? '100%' : 0,
          rotateX: 0,
          marginTop: 0,
          maxHeight: '100%',
          minHeight: mockItem ? 0 : 76
        }
      }
    } else {
      animationObj = {
        duration: transitionDuration,
        animation: {
          transformPerspective: 300,
          transformOriginX: '50%',
          transformOriginY: isOdd ? '100%' : 0,
          rotateX: isOdd ? 90 : -90,
          marginTop: isOdd ? -152 : 0,
          maxHeight: 76,
          minHeight: 76
        }
      }
    }
    return animationObj
  }
  
  render() {
    const { unfoldArray, sortedData, sortedDataGroupByYear, foldAndUnfold } = this.props
    this.yearList = _.keys(sortedDataGroupByYear)
    const sortedDataGroupByYearMonth = _.values(_.groupBy(sortedData, record => record.year)).map((dataEachYear) => {
      return _.groupBy(dataEachYear, data => data.month)
    })
    const groupedData = this.yearList.reduce((previous, year, index) => {
      previous[year] = sortedDataGroupByYearMonth[index]
      return previous
    }, {})
    const Records = (year, indexOfUnfoldArray) => {
      let isOdd = sortedDataGroupByYear[year].length % 2 === 1
      return (
        <Accomplishments
          unfold={unfoldArray[indexOfUnfoldArray]}
        >
          <OnlyDisplayOnMobile>
            {
              sortedDataGroupByYear[year].map((record, index) => {
                let unfold = unfoldArray[indexOfUnfoldArray]
                let animationProps = this._foldAnimation(unfold, index)
                return(
                  <VelocityComponent 
                    key={index + '-' + unfold.toString}
                    {...animationProps}
                  >
                    <Accomplishment
                      unfold={unfold}
                    >
                      <MonthLabel>
                        <p>{months[record.month - 1]}</p>
                      </MonthLabel>
                      <Record>
                        <p>
                          <span>{this._getDate(record.date)}</span>
                        </p>
                        <p>{record.text.chinese}</p>
                      </Record>
                    </Accomplishment>
                  </VelocityComponent>
                )            
              })
            }
            <VelocityComponent
              {...this._foldAnimation(unfoldArray[indexOfUnfoldArray], 1, true)}
            >
              <MockAccomplishment
                isOdd={isOdd}
                unfold={unfoldArray[indexOfUnfoldArray]}
              />
            </VelocityComponent>
          </OnlyDisplayOnMobile>
          <DisplayOnTabletAbove>
            {
              _.values(groupedData[year]).map((yearRecords, index) => {
                return(
                  <MonthlyAccomplishments key={index}>
                    {
                      _.values(yearRecords).map((monthRecords, index) => {
                        return (
                          <Accomplishment
                            key={index}
                          >
                            <MonthLabel monthOrder={index}>
                              <p>{months[monthRecords.month - 1]}</p>
                            </MonthLabel>
                            <Record>
                              <p>
                                <span>{this._getDate(monthRecords.date)}</span>
                              </p>
                              <p>{monthRecords.text.chinese}</p>
                            </Record>
                          </Accomplishment>
                        )
                      })
                    }
                  </MonthlyAccomplishments>
                )            
              })
            }
          </DisplayOnTabletAbove>
        </Accomplishments>
      )
    }

    const ListAll = this.yearList.map((year, index) => {
      return (
        <Year 
          key={year} 
          unfold={unfoldArray[index]}
          ref={yearContent => this.yearContent[index] = yearContent}
        >
          <YearLabel
            unfold={unfoldArray[index]}
            onClick={() => foldAndUnfold(index)}>
            <p>{year}</p>
          </YearLabel>
          {Records(year, index)}
        </Year>
      )
    })

    return (
      <React.Fragment>
        {ListAll}
      </React.Fragment>
    )
  }
}

List.defaultProps = {
  unfoldArray: [],
  sortedData: [],
  sortedDataGroupByYear: {}
}

List.propTypes = {
  unfoldArray: PropTypes.array.isRequired,
  sortedData: PropTypes.array.isRequired,
  sortedDataGroupByYear: PropTypes.object.isRequired,
  foldAndUnfold: PropTypes.func.isRequired,
  getYearContentHeight: PropTypes.func
}


