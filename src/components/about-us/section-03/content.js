import PropTypes from 'prop-types'
import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
// utils
import mq from '../utils/media-query'
import { storageUrlPrefix } from '../utils/config'
// components
import AccordionList from './content-accordion-list'
import PaginatedList from './content-paginated-list'
// @twreporter
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'

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
  visibility: ${props => (props.$visible ? 'visible' : 'hidden')};
  img {
    transform-origin: 50% 50%;
    transform: translateY(75px) translateX(-50%) rotate(-90deg);
  }
`

const BottomArrow = styled(Arrow)`
  bottom: 0;
  visibility: ${props => (props.$visible ? 'visible' : 'hidden')};
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
    background: ${colorGrayscale.gray100};
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
  ${props => (props.$position === 'top' ? 'top: 0' : 'bottom: 0')};
  width: 100%;
  height: 20px;
  background: ${props =>
    `linear-gradient(to ${props.$position}, ${colorGrayscale.white}, ${colorGrayscale.white})`};
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

const Content = ({
  selectedRecords = [],
  fullRecords = [],
  awardYears = {},
  awardsName = [],
  activeAward = '',
  activeYearIndex = 0,
}) => {
  const clickCtr = useRef(0)
  const [page, setPage] = useState(0)
  const [pagesLength, setPagesLength] = useState(0)
  const [paginatedAwardsList, setPaginatedAwardsList] = useState([])

  useEffect(() => {
    if (selectedRecords.length > 0) {
      let newPagesLength = Math.ceil(
        selectedRecords.length / awardsNumberInSinglePage
      )
      if (selectedRecords.length % awardsNumberInSinglePage === 0) {
        newPagesLength += 1
      }
      let newPaginatedAwardsList = []
      for (let i = 0; i < newPagesLength; i++) {
        let cursor = (i + 1) * awardsNumberInSinglePage
        newPaginatedAwardsList.push(
          selectedRecords.slice(cursor - awardsNumberInSinglePage, cursor)
        )
      }

      setPagesLength(newPagesLength)
      setPaginatedAwardsList(newPaginatedAwardsList)
    }
  }, [selectedRecords, awardsNumberInSinglePage])

  /**
   * This callback function is used to scroll the award items page when clicking arrows
   * @param {String} direction
   * @param {Number} pagesLength
   */
  const gotoNextPage = (direction, pagesLength) => {
    switch (direction) {
      case 'next':
        setPage(++clickCtr.current % pagesLength)
        break
      case 'prev':
        let newPage
        if (clickCtr.current === 0) {
          clickCtr.current = pagesLength - 1
          newPage = clickCtr.current
        } else {
          newPage = --clickCtr.current % pagesLength
        }
        setPage(newPage)
        break
      default:
    }
  }

  const backToTop = () => {
    clickCtr.current = 0
    setPage(0)
  }

  return (
    <Container>
      <PageWrapper>
        {paginatedAwardsList.length > 0 ? (
          <PaginatedList
            currentPage={page}
            paginatedAwardsList={paginatedAwardsList}
            transitionDuration={transitionDuration}
            backToTop={backToTop}
            activeAward={activeAward}
            activeYearIndex={activeYearIndex}
          />
        ) : null}
        <AccordionList
          awardsName={awardsName}
          fullRecords={fullRecords}
          awardYears={awardYears}
          transitionDuration={transitionDuration}
        />
        <SemiTransparentMask $position={'bottom'} />
      </PageWrapper>
      <Arrows>
        <TopArrow
          $visible={pagesLength > 1}
          onClick={() => gotoNextPage('prev', pagesLength)}
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
          $visible={pagesLength > 1}
          onClick={() => gotoNextPage('next', pagesLength)}
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

Content.propTypes = {
  selectedRecords: PropTypes.array,
  fullRecords: PropTypes.object,
  awardYears: PropTypes.object,
  awardsName: PropTypes.array,
  activeAward: PropTypes.string,
  activeYearIndex: PropTypes.number,
}

export default Content
