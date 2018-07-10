import { colors } from '../../../themes/common-variables'
import { font } from '../constants/styles'
import { screen } from '../utils/screen'
import ArrowNextIcon from '../../../../static/asset/about-us/arrow-next.svg'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const awardsNumberInSinglePage = 3
const defaultZIndex = 0
const transitionDuration = '.3s'
const borderBottomColor = '#dcdcdc'
const mobileBorderColor = '#e9e9e9'

const Arrow = styled.div`
  position: absolute;
  right: -50px;
  width: 30px;
  height: 70px;
`

const TopArrow = Arrow.extend`
  top: 0;
  transform-origin: 50% 50%;
  transform: translateX(-50%) rotate(-90deg);
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
`

const BottomArrow = Arrow.extend`
  bottom: 0;
  transform-origin: 50% 0;
  transform: translateX(-50%) rotate(90deg);
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
`

const Arrows = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  transform: translateY(10%) scaleY(1.2);
  cursor: pointer;
  ${screen.tabletBelow`
    display: none;
  `}
`

const Container = styled.div `
  position: relative;
  width: 100%;
  height: 100%;
  float: right;
  text-align: center;
  ${screen.overDesktop`
    width: 530px;
  `}
  ${screen.desktop`
    width: 432px;
  `}
  ${screen.desktopAbove`
    background: ${colors.gray.gray96};  
  `}
  ${screen.tablet`
    margin-top: 60.1px;
  `}
  ${screen.mobile`
    margin-top: 37px;
  `}  
`

const SemiTransparentMask = styled.div `
  position: absolute;
  left: 0;
  ${props => props.position === 'top' ? 'top: 0' : 'bottom: 0'};
  width: 100%;
  height: 20px;
  background: ${props => `linear-gradient(to ${props.position}, rgba(255,255,255,0), ${colors.white})`};
  ${screen.tabletBelow`
    display: none;
  `}
`

const PaginatedList = styled.div `
  display: block;
  width: 100%;
  ${screen.desktopAbove`
    height: 100%;
    transform: translate3d(0, ${props => props.shiftY}, 0);
    transition: all ${transitionDuration} ease-in-out;  
  `}
  ${screen.tabletBelow`
    display: none;
  `}
`

const AccordionList = styled.div`
  display: block;
  ${screen.desktopAbove`
    display: none;
  `}
`

const SinglePage = styled.div`
  position: relative;
`

const PageItems = styled.ul`
  display: block;
  width: 100%;
  text-align: left;
  list-style: none;
  margin: 0;
  padding: 0;
  ${screen.tablet`
    padding: 0 0 0 45px;
  `}
  ${screen.mobile`
    padding: 0 0 0 17px;
  `}
  a{
    color: ${colors.black};
  }
  ${screen.tablet`
    li:last-child{
      margin-bottom: -40px;
    }
  `}
  ${screen.mobile`
    li:last-child{
      margin-bottom: -35px;
    }
  `}
`

const AwardItem = styled.div`
  ${screen.desktopAbove`
    border-bottom: solid 1px ${borderBottomColor};
    margin-bottom: 21px;
    padding-bottom: 21px;
  `}
  ${screen.tablet`
    padding-bottom: 40px;
  `}
`

const Ranking = styled.p`
  color: ${colors.secondaryColor};
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1.5px;
  margin-bottom: 15px;
`

const MoreInfo = styled.div`
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

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  ${screen.desktopAbove`
    padding: 40px 46px;
    height: 100%;
    overflow-y: hidden;
  `}
`

const RecordsInaYear = styled.div`
  position: relative;
  width: 100%;
  margin-top: 2px;
  margin-bottom: ${props => props.unfold ? '9px' : '0'};
  padding: 0;
  list-style: none;
`

const Record = styled.div`
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
  transition: all ${transitionDuration} linear;
  p{
    opacity: ${props => props.unfold ? '1' : '0'};
  }
  a{
    color: ${colors.black};
  }
`

const AwardName = styled.div`
  width: 100%;
  border: solid 1px ${mobileBorderColor};
  min-height: ${props => props.unfold ? '53px' : '76px'};
  margin-top: ${props => props.unfold ? '30px' : 0};
  background: ${props => props.unfold ? `${colors.black}` : `${colors.white}`};
  color: ${props => props.unfold ? `${colors.white}` : `${colors.black}`};
  p{
    line-height: ${props => props.unfold ? '53px' : '76px'};
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
  border-bottom: solid 0.5px ${colors.black};
  ${screen.tablet`
    width: 65%;
  `}
  ${screen.mobile`
    width: 80%;
  `}
`

const YearTag = styled.div`
  position: relative;
  background: ${colors.white};
  overflow: hidden;
  height: ${props => props.unfold ? '65px' : '0'};
  transition: height ${transitionDuration} linear;
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

export default class Content extends PureComponent {
  constructor(props) {
    super(props)
    this.singlePages = []
    this.pageContentHeight = []
    this.clickCtr = 0
    this.state = {
      page: 0,
      unfold: true,
      unfoldArray: this.props.awardNamelist.map(() => false)
    }
  }
  /**
   * This callback function is used to scroll the award items page when clicking arrows
   * @param {String} direction
   * @param {Number} pagesLength
   */
  _gotoNextPage = (direction, pagesLength) => {
    let newPage
    switch(direction) {
      case 'next':
        newPage = ++this.clickCtr % pagesLength
        break
      case 'prev':
        if (this.clickCtr === 0) {
          this.clickCtr = pagesLength - 1
          newPage = this.clickCtr
        } else {
          newPage = --this.clickCtr % pagesLength
        }
        break
      default:
        newPage = 0
    }
    this.setState({
      page: newPage
    })
  }
  /**
   * By using the state of current page, this function decides the translateY value of award items page
   * @param {Number} currentPage
   * @returns {String}
   */
  _getShiftY = (currentPage) => {
    if (this.pageContentHeight) {
      let scrollHeight = this.pageContentHeight.reduce((prev, height, index) => {
        if (index < currentPage) {
          return prev + height
        }
        return prev
      }, 0)
      return `-${scrollHeight}px` 
    }
    return 0
  }
  _getPagesHeight = () => {
    let pagesHeight = this.singlePages.map((page) =>{
      if (page) {
        return ReactDOM.findDOMNode(page).getBoundingClientRect().height
      }
    })
    this.pageContentHeight = pagesHeight
  }
  _foldAndUnfold = (index) => {
    let newUnfoldArray = [ ...this.state.unfoldArray ]
    newUnfoldArray[index] = !newUnfoldArray[index]
    this.setState({
      unfoldArray: newUnfoldArray
    })
  }
  componentDidMount() {
    this._getPagesHeight()
  }
  componentDidUpdate() {
    let newPagesHeight = this.singlePages.map((page) => {
      if (page) {
        return ReactDOM.findDOMNode(page).getBoundingClientRect().height
      }
    })
    if (JSON.stringify(this.pageContentHeight) !== JSON.stringify(newPagesHeight)) {
      this._getPagesHeight()
      this.clickCtr = 0
      this.setState({ page: 0 })
    }
  }
  render() {
    const { page } = this.state
    const { selectedDataList, fulldatalist, awardNamelist, awardYearList } = this.props
    const pagesLength = Math.ceil(selectedDataList.length / awardsNumberInSinglePage)
    let paginatedAwardsList = []
    for (let i = 0; i < pagesLength; i++) {
      let cursor = (i + 1) * awardsNumberInSinglePage
      paginatedAwardsList.push(selectedDataList.slice(cursor - awardsNumberInSinglePage, cursor))
    }
    return (
      <Container>
        <PageWrapper>
          <PaginatedList shiftY={() => this._getShiftY(page)}>
            {
              paginatedAwardsList.map((list, listIndex) => {
                return(
                  <SinglePage
                    key={`${list[0].awardId}-${listIndex}`}
                  >
                    <PageItems
                      ref={singlepage => this.singlePages[listIndex] = singlepage}
                    >
                      {
                        list.map((item, itemIndex) => {
                          let groupString = item.group.split('')
                          return (
                            <li
                              key={listIndex + '-' + itemIndex}>
                              <a href={item.titleLink} target="_blank">
                              <AwardItem>
                                <Ranking
                                  display={item.ranking}>
                                  {item.ranking}
                                </Ranking>
                                <MoreInfo>
                                  <p>
                                    {
                                      groupString.map((char, index) => {
                                        return(
                                          <span key={index}>{char}</span>
                                        )
                                      })
                                    }
                                  </p>
                                  <p>{item.title}</p>
                                  <p>{item.prizeman}</p>
                                </MoreInfo>
                              </AwardItem>
                              </a>
                            </li>
                          )
                        })
                      }
                    </PageItems>
                  </SinglePage>
                )
              })
            }
          </PaginatedList>
          <AccordionList>
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
                              unfold={this.state.unfoldArray[awardIdx]}>
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
          </AccordionList>
          <SemiTransparentMask position={"bottom"}/>
        </PageWrapper>
        <Arrows>
          <TopArrow
            visible={pagesLength > 1}
            onClick={() => this._gotoNextPage('prev', pagesLength)}>
            <ArrowNextIcon />
          </TopArrow>
          <BottomArrow
            visible={pagesLength > 1}
            onClick={() => this._gotoNextPage('next', pagesLength)}>
            <ArrowNextIcon />
          </BottomArrow>
        </Arrows>
      </Container>
    )
  }
}

Content.defaultProps = {
  page: 0,
  awardsNumberInSinglePage: 0,
  awardsList: []
}

Content.propTypes = {
  page: PropTypes.number.isRequired,
  awardsNumberInSinglePage: PropTypes.number.isRequired,
  awardsList: PropTypes.array.isRequired
}

