import colors from '../../../constants/colors'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import mq from '../utils/media-query'
import { storageUrlPrefix } from '../utils/config'
import AccordionList from './content-accordion-list'
import PaginatedList from './content-paginated-list'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const awardsNumberInSinglePage = 3
const transitionDuration = '.3s'

const Arrow = styled.div`
  position: absolute;
  ${mq.desktopOnly`
    width: 12.3px;
    height: 60px;
  `}
  ${mq.hdOnly`
    width: 15px;
    height: 73px;
  `}
`

const TopArrow = styled(Arrow)`
  top: 0;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  img {
    transform-origin: 50% 50%;
    transform: translateY(75px) translateX(-50%) rotate(-90deg);
  }
`

const BottomArrow = styled(Arrow)`
  bottom: 0;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  img {
    transform-origin: 50% 50%;
    transform: translateY(40px) scaleY(-1) translateX(-50%) rotate(-90deg);
  }
`

const Arrows = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  cursor: pointer;
  ${mq.tabletAndBelow`
    display: none;
  `}
`

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  float: right;
  text-align: center;
  ${mq.hdOnly`
    width: 530px;
  `}
  ${mq.desktopOnly`
    width: 432px;
  `}
  ${mq.desktopAndAbove`
    background: ${colors.gray.gray96};
  `}
  ${mq.tabletOnly`
    margin-top: 60.1px;
  `}
  ${mq.mobileOnly`
    margin-top: 37px;
  `}
`

const SemiTransparentMask = styled.div`
  position: absolute;
  left: 0;
  ${props => (props.position === 'top' ? 'top: 0' : 'bottom: 0')};
  width: 100%;
  height: 20px;
  background: ${props =>
    `linear-gradient(to ${props.position}, rgba(255,255,255,0), ${colors.white})`};
  ${mq.tabletAndBelow`
    display: none;
  `}
`

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  ${mq.desktopAndAbove`
    padding: 40px 46px;
    height: 100%;
    overflow-y: hidden;
  `}
`

const ArrowNextIcon = styled.div`
  height: 100%;
  img {
    height: 100%;
  }
`

export default class Content extends PureComponent {
  constructor(props) {
    super(props)
    this.singlePages = []
    this.pageContentHeight = []
    this.clickCtr = 0
    this.state = {
      page: 0,
    }
  }

  /**
   * This callback function is used to scroll the award items page when clicking arrows
   * @param {String} direction
   * @param {Number} pagesLength
   */
  _gotoNextPage = (direction, pagesLength) => {
    let newPage
    switch (direction) {
      case 'next':
        this.setState({ page: ++this.clickCtr % pagesLength })
        break
      case 'prev':
        if (this.clickCtr === 0) {
          this.clickCtr = pagesLength - 1
          newPage = this.clickCtr
        } else {
          newPage = --this.clickCtr % pagesLength
        }
        this.setState({ page: newPage })
        break
      default:
    }
  }

  _backToTop = () => {
    this.clickCtr = 0
    this.setState({ page: 0 })
  }
  render() {
    const { page } = this.state
    const { selectedRecords, fullRecords, awardsName, awardYears, activeAward, activeYearIndex } = this.props
    let pagesLength = 0
    let paginatedAwardsList = []
    if (selectedRecords.length > 0) {
      pagesLength = Math.ceil(selectedRecords.length / awardsNumberInSinglePage)
      for (let i = 0; i < pagesLength; i++) {
        let cursor = (i + 1) * awardsNumberInSinglePage
        paginatedAwardsList.push(selectedRecords.slice(cursor - awardsNumberInSinglePage, cursor))
      }
    }

    return (
      <Container>
        <PageWrapper>
          { 
            paginatedAwardsList.length > 0 ?
              <PaginatedList
                currentPage={page}
                paginatedAwardsList={paginatedAwardsList}
                transitionDuration={transitionDuration}
                backToTop={this._backToTop}
                activeAward={activeAward}
                activeYearIndex={activeYearIndex}
              /> : null
          }
          <AccordionList
            awardsName={awardsName}
            fullRecords={fullRecords}
            awardYears={awardYears}
            transitionDuration={transitionDuration}
          />
          <SemiTransparentMask position={'bottom'} />
        </PageWrapper>
        <Arrows>
          <TopArrow
            visible={pagesLength > 1}
            onClick={() => this._gotoNextPage('prev', pagesLength)}
          >
            <ArrowNextIcon>
              <img
                src={`${replaceGCSUrlOrigin(
                  `${storageUrlPrefix}/arrow-next.png`
                )}`}
              />
            </ArrowNextIcon>
          </TopArrow>
          <BottomArrow
            visible={pagesLength > 1}
            onClick={() => this._gotoNextPage('next', pagesLength)}
          >
            <ArrowNextIcon>
              <img
                src={`${replaceGCSUrlOrigin(
                  `${storageUrlPrefix}/arrow-next.png`
                )}`}
              />
            </ArrowNextIcon>
          </BottomArrow>
        </Arrows>
      </Container>
    )
  }
}

Content.defaultProps = {
  transitionDuration: '100ms',
  selectedRecords: [],
  fullRecords: {},
  awardsName: [],
  awardYears: {},
  activeAward: '',
  activeYearIndex:0 
}

Content.propTypes = {
  selectedRecords: PropTypes.array,
  fullRecords: PropTypes.object,
  awardsName: PropTypes.array,
  awardYears: PropTypes.object,
  activeAward: PropTypes.string,
  activeYearIndex: PropTypes.number
}
