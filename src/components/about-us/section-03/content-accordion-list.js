import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
// constants
import { font } from '../constants/styles'
// utils
import mq from '../utils/media-query'
// components
import { VelocityTransitionGroup } from 'velocity-react'
// @twreporter
import {
  colorGrayscale,
  colorSupportive,
} from '@twreporter/core/lib/constants/color'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const borderBottomColor = colorGrayscale.gray300
const mobileBorderColor = colorGrayscale.gray200
const defaultZIndex = 0

const Container = styled.div`
  display: block;
  ${mq.desktopAndAbove`
    display: none;
  `}
`

const AwardItem = styled.div`
  ${mq.desktopAndAbove`
    border-bottom: solid 1px ${borderBottomColor};
    margin-bottom: 21px;
    padding-bottom: 21px;
  `}
  ${mq.tabletOnly`
    padding-bottom: 29px;
  `}
`

const Ranking = styled.p`
  color: ${colorSupportive.heavy};
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1.5px;
  margin-bottom: 15px;
`

const MoreInfo = styled.div`
  p:first-child {
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1.9px;
    margin-bottom: 15px;
    span:first-child {
      padding-bottom: 10px;
      border-bottom: 0.5px solid ${colorGrayscale.black};
    }
  }
  p:nth-child(2) {
    font-size: 16px;
    font-weight: 500;
  }
  p:last-child {
    opacity: 0.65;
    font-size: 14px;
    line-height: 1.36;
    padding-top: 6px;
  }
`

const RecordsInaYear = styled.div`
  position: relative;
  width: 100%;
  margin-top: 0;
  margin-bottom: ${props => (props.$unfold ? '9px' : '0')};
  padding: 0;
  list-style: none;
`

const StyledVelocityTransitionGroup = styled(VelocityTransitionGroup)``

const Record = styled.div`
  position: relative;
  width: 100%;
  margin: auto 0;
  overflow: hidden;
  color: ${colorGrayscale.black};
  text-align: left;
  border-bottom: solid ${props => (props.$unfold ? '1px' : '0')}
    ${borderBottomColor};
  background: ${colorGrayscale.gray100};
  padding: 20px 21px 19px 15px;
  a {
    color: ${colorGrayscale.black};
  }
  ${StyledVelocityTransitionGroup}:last-child & {
    border-bottom: none;
  }
`

const AwardName = styled.div`
  width: 100%;
  border: solid 1px ${mobileBorderColor};
  &:not(:first-child) {
    border-top: none;
  }
  min-height: 76px;
  background: ${props =>
    props.$unfold ? `${colorGrayscale.black}` : `${colorGrayscale.white}`};
  color: ${props =>
    props.$unfold ? `${colorGrayscale.white}` : `${colorGrayscale.black}`};
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    line-height: 125%;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 1.8px;
  }
`

const SeperatedLine = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 50%;
  border-bottom: solid 0.5px ${colorGrayscale.black};
  ${mq.tabletOnly`
    width: 65%;
  `}
  ${mq.mobileOnly`
    width: 80%;
  `}
`

const YearTag = styled.div`
  position: relative;
  background: ${colorGrayscale.white};
  overflow: hidden;
  height: 65px;
  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    display: inline-block;
    background: ${colorGrayscale.white};
    color: ${colorGrayscale.black};
    font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};
    font-size: 18px;
    font-weight: ${font.weight.bold};
    z-index: calc(${defaultZIndex} + 1);
    padding: 0 5px;
  }
  ${mq.tabletOnly`
    p{
      padding: 0 10px;
    }
  `}
`

export default class AccordionList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      unfoldArray: this.props.awardsName.map(() => false),
    }
  }
  _foldAndUnfold = index => {
    let newUnfoldArray = [...this.state.unfoldArray]
    newUnfoldArray[index] = !newUnfoldArray[index]
    this.setState({
      unfoldArray: newUnfoldArray,
    })
  }

  _renderRecords = (awardName, awardIdx) => {
    const { fullRecords, awardYears } = this.props
    if (!awardYears[awardName]) return
    return awardYears[awardName].map(year => {
      let unfold = this.state.unfoldArray[awardIdx]
      return (
        <React.Fragment key={`${awardName}-${year}`}>
          <VelocityTransitionGroup
            component="div"
            enter="slideDown"
            leave="slideUp"
          >
            {unfold ? (
              <YearTag>
                <p>{year}</p>
                <SeperatedLine />
              </YearTag>
            ) : null}
          </VelocityTransitionGroup>
          <RecordsInaYear $unfold={unfold}>
            {fullRecords[awardName][year].map((item, itemIndex) => {
              return (
                <StyledVelocityTransitionGroup
                  key={itemIndex}
                  component="div"
                  enter="slideDown"
                  leave="slideUp"
                >
                  {unfold ? (
                    <Record $unfold={unfold}>
                      <a
                        href={_.get(item, 'titlelink', '')}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <AwardItem>
                          <Ranking display={_.get(item, 'ranking.zh-tw')}>
                            {_.get(item, 'ranking.zh-tw', '')}
                          </Ranking>
                          <MoreInfo>
                            <p>{_.get(item, 'group.zh-tw', '')}</p>
                            <p>{_.get(item, 'title.zh-tw', '')}</p>
                            <p>{_.get(item, 'prizeman.zh-tw', '')}</p>
                          </MoreInfo>
                        </AwardItem>
                      </a>
                    </Record>
                  ) : null}
                </StyledVelocityTransitionGroup>
              )
            })}
          </RecordsInaYear>
        </React.Fragment>
      )
    })
  }

  render() {
    const { awardsName, fullRecords, awardYears } = this.props
    return (
      <Container>
        {awardsName.map((name, awardIdx) => {
          return (
            <React.Fragment key={name.award}>
              <AwardName
                onClick={() => this._foldAndUnfold(awardIdx)}
                $unfold={this.state.unfoldArray[awardIdx]}
              >
                <p>{name.award}</p>
              </AwardName>
              {fullRecords && awardYears
                ? this._renderRecords(name.award, awardIdx)
                : null}
            </React.Fragment>
          )
        })}
      </Container>
    )
  }
}

AccordionList.defaultProps = {
  fullRecords: {},
  awardsName: [],
  awardsYears: [],
}

AccordionList.propTypes = {
  fullRecords: PropTypes.object,
  awardsName: PropTypes.array,
  awardYears: PropTypes.object,
}
