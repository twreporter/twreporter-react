import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import colors from '../../../constants/colors'
import get from 'lodash/get'
import mq from '../utils/media-query'
import styled from 'styled-components'

const _ = {
  get
}

const borderBottomColor = '#dcdcdc'

const Container = styled.div`
  display: block;
  width: 100%;
  ${mq.desktopAndAbove`
    height: 100%;
    transform: translate3d(0, ${props => props.shiftY}, 0);
    transition: all ${props => props.transitionDuration} ease-in-out;
  `}
  ${mq.tabletAndBelow`
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
  ${mq.tabletOnly`
    padding: 0 0 0 45px;
  `}
  ${mq.mobileOnly`
    padding: 0 0 0 17px;
  `}
  a {
    color: ${colors.black};
  }
  ${mq.tabletOnly`
    li:last-child{
      margin-bottom: -40px;
    }
  `}
  ${mq.mobileOnly`
    li:last-child{
      margin-bottom: -35px;
    }
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
  color: ${colors.secondaryColor};
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
      border-bottom: 0.5px solid ${colors.black};
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
  _getShiftY = currentPage => {
    if (this.pageContentHeight) {
      let scrollHeight = this.pageContentHeight.reduce(
        (prev, height, index) => {
          if (index < currentPage) {
            return prev + height
          }
          return prev
        },
        0
      )
      return `-${scrollHeight}px`
    }
    return 0
  }
  _getPagesHeight = () => {
    let pagesHeight = this.singlePages.map(page => {
      if (page) {
        return ReactDOM.findDOMNode(page).getBoundingClientRect().height
      }
    })
    this.pageContentHeight = pagesHeight
  }
  componentDidMount() {
    this._getPagesHeight()
  }
  componentDidUpdate(prevProps) {
    const { activeAward, backToTop, activeYearIndex } = this.props
    if (prevProps.activeAward !== activeAward || prevProps.activeYearIndex !== activeYearIndex) {
      this._getPagesHeight()
      backToTop()
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
                key={`paginatedAwardsList-${listIndex}`}
              >
                <PageItems
                  ref={singlepage => this.singlePages[listIndex] = singlepage}
                >
                  {
                    list.map((item, itemIndex) => {
                      let groupString = _.get(item,'group.zh-tw', '').split('')
                      return (
                        <li
                          key={listIndex + '-' + itemIndex}>
                          <a href={_.get(item,'titlelink', '')} target="_blank">
                            <AwardItem>
                              <Ranking
                                display={_.get(item,'ranking.zh-tw')}>
                                {_.get(item,'ranking.zh-tw', '')}
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
                                <p>{_.get(item,'title.zh-tw', '')}</p>
                                <p>{_.get(item,'prizeman.zh-tw', '')}</p>
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
  transitionDuration: '500ms'
}

PaginatedList.propTypes = {
  currentPage: PropTypes.number.isRequired,
  paginatedAwardsList: PropTypes.array.isRequired,
  transitionDuration: PropTypes.string,
  backToTop: PropTypes.func.isRequired,
  activeAward: PropTypes.string.isRequired,
  activeYearIndex: PropTypes.number.isRequired
}
