import { colors } from '../../../themes/common-variables'
import { screen } from '../utils/screen'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const borderBottomColor = '#dcdcdc'

const Container = styled.div `
  display: block;
  width: 100%;
  ${screen.desktopAbove`
    height: 100%;
    transform: translate3d(0, ${props => props.shiftY}, 0);
    transition: all ${props => props.transitionDuration} ease-in-out;  
  `}
  ${screen.tabletBelow`
    display: none;
  `}
`

const SinglePage = styled.div `
  position: relative;
`

const PageItems = styled.ul `
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

export default class PaginatedList extends PureComponent {
  constructor(props) {
    super(props)
    this.singlePages = []
    this.pageContentHeight = []
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
    let pagesHeight = this.singlePages.map((page) => {
      if (page) {
        return ReactDOM.findDOMNode(page).getBoundingClientRect().height
      }
    })
    this.pageContentHeight = pagesHeight
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
      this.props.backToTop()
    }
  }
  render() {
    const { currentPage, paginatedAwardsList, transitionDuration } = this.props
    return (
      <Container
        shiftY={() => this._getShiftY(currentPage)}
        transitionDuration={transitionDuration}
      >
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
      </Container>
    )
  }
}

PaginatedList.defaultProps = {
  currentPage: 0,
  paginatedAwardsList: [],
  transitionDuration: '500ms',
  backToTop: () => {}
}

PaginatedList.propTypes = {
  currentPage: PropTypes.number.isRequired,
  paginatedAwardsList: PropTypes.array.isRequired,
  transitionDuration: PropTypes.string,
  backToTop: PropTypes.func.isRequired
}
