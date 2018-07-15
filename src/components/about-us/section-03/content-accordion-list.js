import { colors } from '../../../themes/common-variables'
import { font } from '../constants/styles'
import { screen } from '../utils/screen'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const borderBottomColor = '#dcdcdc'
const mobileBorderColor = '#e9e9e9'
const defaultZIndex = 0

const Container = styled.div `
  display: block;
  ${screen.desktopAbove`
    display: none;
  `}
`

const AwardItem = styled.div `
  ${screen.desktopAbove`
    border-bottom: solid 1px ${borderBottomColor};
    margin-bottom: 21px;
    padding-bottom: 21px;
  `}
  ${screen.tablet`
    padding-bottom: 29px;
  `}
`

const Ranking = styled.p `
  color: ${colors.secondaryColor};
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1.5px;
  margin-bottom: 15px;
`

const MoreInfo = styled.div `
  p:first-child{
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1.9px;
    margin-bottom: 15px;
    span:first-child{
      padding-bottom: 10px;
      border-bottom: 0.5px solid ${colors.black};
    }
  }
  p:nth-child(2){
    font-size: 16px;
    font-weight: 500;
  }
  p:last-child{
    opacity: 0.65;
    font-size: 14px;
    line-height: 1.36;
    padding-top: 6px;
  }
`

const RecordsInaYear = styled.div `
  position: relative;
  width: 100%;
  margin-top: 0;
  margin-bottom: ${props => props.unfold ? '9px' : '0'};
  padding: 0;
  list-style: none;
`

const Record = styled.div `
  position: relative;
  width: 100%;
  height: ${props => props.unfold ? 'auto' : '0'};
  margin: auto 0;
  overflow: hidden;
  color: ${colors.black};
  text-align: left;
  border-bottom: solid ${props => props.unfold ? '1px' : '0'} ${borderBottomColor};
  padding: ${props => props.unfold ? '20px 21px 19px 15px' : '0 21px 0 15px'};
  background: ${colors.gray.gray96};
  transition: all ${props => props.transitionDuration} linear;
  &:last-child {
    border-bottom: none;
  }
  p{
    opacity: ${props => props.unfold ? '1' : '0'};
  }
  a{
    color: ${colors.black};
  }
`

const AwardName = styled.div `
  width: 100%;
  border: solid 1px ${mobileBorderColor};
  min-height: ${props => props.unfold ? '53px' : '76px'};
  min-height: 76px;
  margin-top: ${props => props.unfold ? '30px' : 0};
  background: ${props => props.unfold ? `${colors.black}` : `${colors.white}`};
  color: ${props => props.unfold ? `${colors.white}` : `${colors.black}`};
  p{
    line-height: 76px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 1.8px;
  }
`

const SeperatedLine = styled.div `
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 50%;
  border-bottom: solid 0.5px ${colors.black};
  ${screen.tablet`
    width: 65%;
  `}
  ${screen.mobile`
    width: 80%;
  `}
`

const YearTag = styled.div `
  position: relative;
  background: ${colors.white};
  overflow: hidden;
  height: ${props => props.unfold ? '65px' : '0'};
  transition: height ${props => props.transitionDuration} linear;
  p{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    display: inline-block;
    background: ${colors.white};
    color: ${colors.black};
    font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};    
    font-size: 18px;
    font-weight: ${font.weight.bold};
    z-index: calc(${defaultZIndex} + 1);
    padding: 0 5px;
  }
  ${screen.tablet`
    p{
      padding: 0 10px;
    }
  `}
`

export default class AccordionList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      unfoldArray: this.props.awardNamelist.map(() => false)
    }
  }
  _foldAndUnfold = (index) => {
    let newUnfoldArray = [ ...this.state.unfoldArray ]
    newUnfoldArray[index] = !newUnfoldArray[index]
    this.setState({
      unfoldArray: newUnfoldArray
    })
  }

  render() {
    const { awardNamelist, fulldatalist, awardYearList, transitionDuration } = this.props
    return (
      <Container>
        {
          awardNamelist.map((award, awardIdx) => {
            return(
              <React.Fragment
                key={award.award}
              >
                <AwardName 
                  onClick={() => this._foldAndUnfold(awardIdx)}
                  unfold={this.state.unfoldArray[awardIdx]}
                >
                  <p>{award.award}</p>
                </AwardName>
                {
                  awardYearList[awardIdx].map((year) => {
                    return(
                      <React.Fragment
                        key={`${award.award}-${year}`}
                      >
                        <YearTag
                          unfold={this.state.unfoldArray[awardIdx]}
                          transitionDuration={transitionDuration}
                        >
                          <p>{year}</p>
                          <SeperatedLine />
                        </YearTag>
                        <RecordsInaYear
                          unfold={this.state.unfoldArray[awardIdx]}
                        >
                          {
                            fulldatalist[awardIdx][year].map((item, itemIndex) => {
                              return(
                                <Record
                                  key={awardIdx + '-' + itemIndex}
                                  unfold={this.state.unfoldArray[awardIdx]}
                                  transitionDuration={transitionDuration}
                                >
                                  <a href={item.titleLink} target="_blank">
                                    <AwardItem>
                                      <Ranking
                                        display={item.ranking}>
                                        {item.ranking}
                                      </Ranking>
                                      <MoreInfo>
                                        <p>{item.group}</p>
                                        <p>{item.title}</p>
                                        <p>{item.prizeman}</p>
                                      </MoreInfo>
                                    </AwardItem>
                                  </a>
                                </Record>
                              )                              
                            })
                          }
                        </RecordsInaYear>
                      </React.Fragment>
                    )
                  })
                }
              </React.Fragment>
            )
          })
        }
      </Container>
    )
  }
}

AccordionList.defaultProps = {
  fulldatalist: [],
  awardNamelist: [],
  awardYearList: [],
  transitionDuration: '500ms'
}

AccordionList.propTypes = {
  fulldatalist: PropTypes.array.isRequired,
  awardNamelist: PropTypes.array.isRequired,
  awardYearList: PropTypes.array.isRequired,
  transitionDuration: PropTypes.string.isRequired
}
