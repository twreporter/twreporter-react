import { colors } from '../../../themes/common-variables'
import { font } from '../constants/styles'
import { screen } from '../utils/screen'
import groupBy from 'lodash/groupBy'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const _ = {
  groupBy
}

const defaultZIndex = 0
const dateBorderColor = '#d3d3d3'
const transitionDuration = '.5s'

const OnlyDisplayOnMobile = styled.div `
  ${screen.tabletAbove`
    display: none;
  `}
`

const DisplayOnTabletAbove = styled.div `
  ${screen.mobile`
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
  ${screen.mobile`
    margin: 10px 5px 10px 0;  
  `}
  ${screen.tabletAbove`
    p{
      font-size: 14px;
      line-height: 1.57;
      letter-spacing: 0.9px;
    }  
    p:last-child{
      padding: 15px 42px 20px 12px;
    }
  `}
  ${screen.overDesktop`
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
  height: ${props => props.unfold ? '53px' : '76px'};
  background: ${props => props.unfold ? `${colors.black}` : `${colors.gray.gray96}`};
  color:${props => props.unfold ? `${colors.white}` : `${colors.black}`};
  transition: ease ${transitionDuration} height;
  p{
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};    
    font-size: ${props => props.unfold ? '24px' : '32px'};
    font-weight: bold;
  }
  ${screen.tabletAbove`
    display: none;
  `}
`

const Acomplishments = styled.div `
  width: 100%;
  ${screen.mobile`
    transform-style: preserve-3d;
    margin-top: 2px;
    margin-bottom: ${props => props.unfold ? '9px' : '0'};  
  `}
`

const MonthLabel = styled.div `
  display: block;
  background: ${colors.white};
  width: 54px;
  height: 23px;
  padding: 5px 0;
  text-align: center;
  p{
    font-size: 12px;
    font-weight: bold;
  }
  ${screen.overDesktop`
    p{
      font-size: 14px;
    }
  `}
  ${screen.tabletAbove`
    display: ${props => props.monthOrder === 0 ? 'block' : 'none'};
  `}  
`

const MonthlyAcomplishments = styled.div `
  margin-bottom: 2px;
  background: ${colors.gray.gray96};
  min-height: 76px;
`

const Acomplishment = styled.div `
  width: 100%;
  margin: 0;
  color: ${colors.black};
  ${screen.mobile`
    position: relative;
    min-height: 76px;
    height: ${props => props.unfold ? 'auto' : '76px'};
    transition: ease ${transitionDuration} all;
    border-bottom: solid 1px ${colors.white};
    background: ${colors.gray.gray96};
    &:nth-child(odd) {
      transform-origin: 50% 0 0;
      transform: perspective(300px) ${props => props.unfold ? 'rotateX(0deg)' : 'rotateX(-90deg)'};
      &:before {
        content: '';
        background-image: linear-gradient(to top, ${colors.gray.gray64}, ${colors.gray.gray96} 80%);
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: ${props => props.unfold ? '0' : '100%'};
        z-index: calc(${defaultZIndex} - 1);
        transition: height .25s;      
      }
    }
    &:nth-child(even) {
      transform-origin: 50% 100% 0;
      transform: perspective(300px) ${props => props.unfold ? 'rotateX(0deg)' : 'rotateX(90deg)'};
      margin-top: ${props => props.unfold ? '0' : 'calc(-76px * 2)'};
      &:before {
        content: '';
        background-image: linear-gradient(to bottom, ${colors.gray.gray64}, ${colors.gray.gray96} 80%);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: ${props => props.unfold ? '0' : '100%'};
        z-index: calc(${defaultZIndex} - 1);
        transition: height .25s;      
      }
    }
    &:last-child {
      display: ${props => !props.unfold && props.isOdd ? 'none' : 'block'};
    }  
  `}
`

export default class List extends PureComponent {
  constructor(props) {
    super(props)
    this.yearContent = []
  }
  _getMonth = (month) => {
    switch(month) {
      case 1:  
        return '一月'
      case 2:
        return '二月'
      case 3:
        return '三月'
      case 4:
        return '四月'
      case 5:
        return '五月'
      case 6:
        return '六月'
      case 7:
        return '七月'
      case 8:
        return '八月'
      case 9:
        return '九月'
      case 10:
        return '十月'
      case 11:
        return '十一月'
      case 12:
        return '十二月'
    }
  }

  _getDate = (date) => {
    let dateString = date.toString()
    if (dateString.length < 2) {
      return '0' + dateString
    }
    return dateString
  }
  
  /**
  + * Opens the valid input link in a new window or tab
  + * @param {String} href
  + */
  _openLink = (href) => {
    if (!href) return
    window.open(href, '_blank')
  }

  componentDidMount() {
    const yearContentHeight = this.yearList.map((year, index) => ReactDOM.findDOMNode(this.yearContent[index]).getBoundingClientRect().height)
    this.props.getYearContentHeight(yearContentHeight)
  }

  render() {
    const { unfoldArray, sortedData, sortedDataGroupByYear, foldAndUnfold } = this.props
    this.yearList = Object.keys(sortedDataGroupByYear)
    const sortedDataGroupByYearMonth = Object.values(_.groupBy(sortedData, record => record.year)).map((dataEachYear) => {
      return _.groupBy(dataEachYear, data => data.month)
    })
    const groupedData = this.yearList.reduce((previous, year, index) => {
      previous[year] = sortedDataGroupByYearMonth[index]
      return previous
    }, {})
    const Records = (year, indexOfUnfoldArray) => {
      let isOdd = sortedDataGroupByYear[year].length % 2 === 1
      return (
        <Acomplishments
          unfold={unfoldArray[indexOfUnfoldArray]}
        >
          <OnlyDisplayOnMobile>
            {
              sortedDataGroupByYear[year].map((record, index) => {
                return(
                    <Acomplishment
                      key={index}
                      unfold={unfoldArray[indexOfUnfoldArray]}
                      isOdd={isOdd}
                    >
                      <MonthLabel>
                        <p>{this._getMonth(record.month)}</p>
                      </MonthLabel>
                      <Record>
                        <p>
                          <span>{this._getDate(record.date)}</span>
                        </p>
                        <p onClick={() => this._openLink(record.link)}>{record.text.chinese}</p>
                      </Record>
                    </Acomplishment>
                )            
              })
            }
          </OnlyDisplayOnMobile>
          <DisplayOnTabletAbove>
            {
              Object.values(groupedData[year]).map((yearRecords, index) => {
                return(
                  <MonthlyAcomplishments key={index}>
                    {
                      Object.values(yearRecords).map((monthRecords, index) => {
                        return (
                          <Acomplishment
                            key={index}
                          >
                            <MonthLabel monthOrder={index}>
                              <p>{this._getMonth(monthRecords.month)}</p>
                            </MonthLabel>
                            <Record>
                              <p>
                                <span>{this._getDate(monthRecords.date)}</span>
                              </p>
                              <p onClick={() => this._openLink(monthRecords.link)}>{monthRecords.text.chinese}</p>
                            </Record>
                          </Acomplishment>
                        )
                      })
                    }
                  </MonthlyAcomplishments>
                )            
              })
            }
          </DisplayOnTabletAbove>
        </Acomplishments>
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


