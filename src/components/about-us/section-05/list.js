/* eslint react/no-find-dom-node: 1 */
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import VelocityComponent from 'velocity-react/velocity-component'
import colors from '../../../constants/colors'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import keys from 'lodash/keys'
import mq from '../utils/media-query'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import { font } from '../constants/styles'
import { months } from '../constants/section-05/months'

const _ = {
  get,
  groupBy,
  keys,
  orderBy,
}

const defaultZIndex = 0
const dateBorderColor = '#d3d3d3'
const transitionDuration = 300

const OnlyDisplayOnMobile = styled.div`
  ${mq.tabletAndAbove`
    display: none;
  `}
`

const DisplayOnTabletAbove = styled.div`
  ${mq.mobileOnly`
    display: none;
  `}
`

const Record = styled.div`
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
      font-family: ${font.family.english.roboto}, ${
  font.family.sansSerifFallback
};
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

const Year = styled.div`
  margin: 0;
`

const YearLabel = styled.div`
  display: table;
  width: 100%;
  height: 76px;
  background: ${props =>
    props.unfold ? `${colors.black}` : `${colors.gray.gray96}`};
  color: ${props => (props.unfold ? `${colors.white}` : `${colors.black}`)};
  transition: ease ${transitionDuration}ms height;
  p {
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

const Accomplishments = styled.div`
  width: 100%;
  ${mq.mobileOnly`
    transform-style: preserve-3d;
    margin-top: 2px;
  `}
`

const MonthLabel = styled.div`
  display: block;
  background: ${colors.white};
  width: 54px;
  height: 23px;
  text-align: center;
  p {
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
    display: ${props => (props.monthOrder === 0 ? 'block' : 'none')};
  `}
`

const MonthlyAccomplishments = styled.div`
  margin-bottom: 2px;
  background: ${colors.gray.gray96};
  min-height: 76px;
`

const Accomplishment = styled.div`
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
        background-image: linear-gradient(to top, ${colors.gray.gray64}, ${
    colors.gray.gray96
  } 80%);
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: ${props => (props.unfold ? '0' : '1')};
        z-index: calc(${defaultZIndex} - 1);
        transition: opacity ${transitionDuration}ms ease-in-out;
      }
    }
    &:nth-child(even) {
      &:before {
        content: '';
        background-image: linear-gradient(to bottom, ${colors.gray.gray64}, ${
    colors.gray.gray96
  } 80%);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: ${props => (props.unfold ? '0' : '1')};
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
  display: ${props => (props.show ? 'block' : 'none')};
`

export default class List extends PureComponent {
  constructor(props) {
    super(props)
    this.yearContent = []
  }
  componentDidMount() {
    const { getYearContentHeight, orderedYears } = this.props

    if (
      Array.isArray(orderedYears) &&
      orderedYears.length > 0 &&
      this.yearContent.length > 0
    ) {
      const yearContentHeight = orderedYears.map((year, index) => {
        if (this.yearContent[index]) {
          return ReactDOM.findDOMNode(
            this.yearContent[index]
          ).getBoundingClientRect().height
        }
      })
      getYearContentHeight(yearContentHeight)
    }
  }
  componentWillUnmount() {
    this.yearContent = undefined
  }
  _getDate = date => {
    if (date) {
      let dateString = date.toString()
      if (dateString.length < 2) {
        return '0' + dateString
      }
      return dateString
    }
  }
  _foldAnimation = (isUnfold, index, mockItem = false) => {
    const isOdd = index % 2 === 1
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
          minHeight: mockItem ? 0 : 76,
        },
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
          minHeight: 76,
        },
      }
    }
    return animationObj
  }

  render() {
    const {
      foldAndUnfold,
      orderedYears,
      unfoldArray,
      yearlyRecords,
    } = this.props

    const annualAcomplishmentsOnMobile = (annualRecords, isUnfold) => {
      const isOdd = annualRecords.length % 2 === 1
      const orderedRecord = _.orderBy(
        annualRecords,
        [
          record => {
            return parseInt(record.month, 10)
          },
          record => {
            return parseInt(record.date, 10)
          },
        ],
        ['asc', 'asc']
      )
      return (
        <React.Fragment>
          {orderedRecord.map((record, index) => {
            const animationProps = this._foldAnimation(isUnfold, index)
            return (
              <VelocityComponent key={index} {...animationProps}>
                <Accomplishment unfold={isUnfold}>
                  <MonthLabel>
                    <p>{months[record.month - 1]}</p>
                  </MonthLabel>
                  <Record>
                    <p>
                      <span>{this._getDate(record.date)}</span>
                    </p>
                    <p>{record['text.zh-tw']}</p>
                  </Record>
                </Accomplishment>
              </VelocityComponent>
            )
          })}
          <VelocityComponent {...this._foldAnimation(isUnfold, 1, true)}>
            <MockAccomplishment show={isOdd} />
          </VelocityComponent>
        </React.Fragment>
      )
    }

    /*
     * Record type definition
     * @typeof {Object} Record
     * @property {string} year
     * @property {string} month
     * @property {string} date
     * @property {string} text.zh-tw - description of record (zh-tw)
     * @property {string} text.en - description of record (en)
     * @property {string} link - link of record
     */

    /*
     * annualRecord contains records have the same property `year`
     *
     * annualRecord type definition
     * @typeof {Record[]} annualRecord
     */

    /*
     * monthlyRecords is assigned by annualRecord grouped by month
     *
     * monthlyRecords type definition
     * @typeof {Object{}} monthlyRecords
     * @property {string} month
     *
     * For example:
     * {
     *   '2': [{}, {}, {}, ...],
     *   '5': [{}, {}, {}, ...]
     * }
     *
     */
    const annualAcomplishments = annualRecords => {
      const monthlyRecords = _.groupBy(annualRecords, data => data.month)
      const orderedMonths = _.keys(monthlyRecords)
        // sort by year in asc order
        .sort((a, b) => Number(a) - Number(b))
      return orderedMonths.map((month, monthIndex) => {
        const records = _.orderBy(
          _.get(monthlyRecords, month),
          record => {
            return parseInt(record.date, 10)
          },
          'asc'
        )
        return (
          <MonthlyAccomplishments key={monthIndex}>
            {records.map((record, index) => {
              return (
                <Accomplishment key={`${month}-${index}`}>
                  <MonthLabel monthOrder={index}>
                    <p>{months[record.month - 1]}</p>
                  </MonthLabel>
                  <Record>
                    <p>
                      <span>{this._getDate(record.date)}</span>
                    </p>
                    <p>{record['text.zh-tw']}</p>
                  </Record>
                </Accomplishment>
              )
            })}
          </MonthlyAccomplishments>
        )
      })
    }

    return (
      <React.Fragment>
        {orderedYears.map((year, index) => {
          const annualRecords = _.get(yearlyRecords, year)
          const unfold = unfoldArray[index]
          return (
            <Year
              key={index}
              unfold={unfold}
              ref={yearContent => {
                this.yearContent[index] = yearContent
              }}
            >
              <YearLabel unfold={unfold} onClick={() => foldAndUnfold(index)}>
                <p>{year}</p>
              </YearLabel>
              <Accomplishments unfold={unfold}>
                <OnlyDisplayOnMobile>
                  {annualAcomplishmentsOnMobile(annualRecords, unfold)}
                </OnlyDisplayOnMobile>
                <DisplayOnTabletAbove>
                  {annualAcomplishments(annualRecords)}
                </DisplayOnTabletAbove>
              </Accomplishments>
            </Year>
          )
        })}
      </React.Fragment>
    )
  }
}

List.propTypes = {
  unfoldArray: PropTypes.array.isRequired,
  yearlyRecords: PropTypes.object.isRequired,
  foldAndUnfold: PropTypes.func.isRequired,
  getYearContentHeight: PropTypes.func,
  orderedYears: PropTypes.array.isRequired,
}
