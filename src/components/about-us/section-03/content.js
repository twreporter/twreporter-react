import { colors } from '../../../themes/common-variables'
import { font } from '../constants/styles'
import { screen } from '../utils/screen'
import ArrowNextIcon from '../../../../static/asset/about-us/arrow-next.svg'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const mockupString = '金獎'
const awardsNumberInSinglePage = 3

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
`

const BottomArrow = Arrow.extend`
  bottom: 0;
  transform-origin: 50% 0;
  transform: translateX(-50%) rotate(90deg);
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
  background: ${colors.gray.gray96};
  ${screen.overDesktop`
    width: 530px;
  `}
  ${screen.desktop`
    width: 432px;
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

const Pages = styled.div`
  display: block;
  width: 100%;
  ${screen.desktopAbove`
    height: 100%;
    transform: translate3d(0, ${props => props.shiftY}, 0);
    transition: all 500ms ease-in-out;  
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
  display: flex;
  flex-direction: row;
  padding-bottom: 44px;
  ${screen.tablet`
    padding-bottom: 40px;
  `}
  ${screen.mobile`
    padding-bottom: 35px;
  `}
`

const Ranking = styled.p`
  white-space: nowrap;
  visibility: ${props => props.display ? 'visible' : 'hidden'};
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1.9px;
  color: ${colors.secondaryColor};
  margin-right: 10px;
  text-align: right;
`

const MoreInfo = styled.div`
  p:first-child{
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1.9px;
    margin-bottom: 10px;
    span:first-child{
      padding-bottom: 10px;
      border-bottom: 0.5px solid ${colors.black};
    }
  }
  p:nth-child(2){
    font-size: 16px;
    font-weight: 500;
    padding-top: 10px;
  }
  p:last-child{
    opacity: 0.65;
    font-size: 14px;
    line-height: 1.36;
    padding-top: 6px;
  }
`

const YearTag = styled.p`
  position: absolute;
  left: 0;
  top: 0;
  font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};
  font-weight: ${font.weight.bold};
`

const YearTagOnDesktopAbove = YearTag.extend`
  ${screen.desktopAbove`
    transform: translateX(-100%);
    color: ${colors.white};
    background: ${colors.black};
    padding: 2px;
  `}
  ${screen.overDesktop`
    font-size: 15px;
  `}
  ${screen.desktop`
    font-size: 13px;  
  `}
  ${screen.tabletBelow`
    display: none;
  `}
`

const YearTagOnTabletBelow = YearTag.extend`
  position: relative;
  text-align: left;
  ${screen.tablet`
    padding-bottom: 10px;
  `}
  ${screen.mobile`
    font-size: 14px;
    padding-bottom: 21px;
  `}
  ${screen.desktopAbove`
    display: none;
  `}
`

const PagesWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 40px 46px;
  ${screen.desktopAbove`
    height: 100%;
    overflow-y: hidden;
  `}
  ${screen.tablet`
    padding: 0 116px 20px 31px;
  `}
  ${screen.mobile`
    padding: 0 7px 29px 0; 
  `}
`

export default class Content extends PureComponent {
  constructor(props) {
    super(props)
    this.singlePages = []
    this.clickCtr = 0
    this.state = {
      page: 0,
      pageContentHeight: []
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
    if (this.state.pageContentHeight) {
      let scrollHeight = this.state.pageContentHeight.reduce((prev, height, index) => {
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
    this.setState({ pageContentHeight: pagesHeight })
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
    if (JSON.stringify(this.state.pageContentHeight) !== JSON.stringify(newPagesHeight)) {
      this._getPagesHeight()
      this.clickCtr = 0
      this.setState({ page: 0 })
    }
  }
  render() {
    const { page } = this.state
    const { selectedDatalist } = this.props
    const pagesLength = Math.ceil(selectedDatalist.length / awardsNumberInSinglePage)
    let paginatedAwardsList = []
    for (let i = 0; i < pagesLength; i++) {
      let cursor = (i + 1) * awardsNumberInSinglePage
      paginatedAwardsList.push(selectedDatalist.slice(cursor - awardsNumberInSinglePage, cursor))
    }
    return (
      <Container>
        <YearTagOnDesktopAbove>
          {
            typeof paginatedAwardsList[page] !== 'undefined' ?
            paginatedAwardsList[page][0].date.split('/')[0]
            : null
          }
        </YearTagOnDesktopAbove>
        <PagesWrapper>
          <Pages shiftY={() => this._getShiftY(page)}>
          {
            paginatedAwardsList.map((list, listIndex) => {
              return(
                <SinglePage
                  key={`${list[0].awardId}-${listIndex}`}
                >
                  <YearTagOnTabletBelow>
                    {list[0].date.split('/')[0]}
                  </YearTagOnTabletBelow>
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
                                {item.ranking || mockupString}
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
          </Pages>
          <SemiTransparentMask position={"bottom"}/>
        </PagesWrapper>
        <Arrows>
          <TopArrow
            onClick={() => this._gotoNextPage('prev', pagesLength)}>
            <ArrowNextIcon />
          </TopArrow>
          <BottomArrow
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

