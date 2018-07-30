import { colors } from '../../../themes/common-variables'
import { replaceStorageUrlPrefix } from '@twreporter/react-components/lib/shared/utils'
import { screen } from '../utils/screen'
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
  ${screen.desktop`
    width: 12.3px;
    height: 60px;
  `}
  ${screen.overDesktop`
    width: 15px;
    height: 73px;  
  `}
`

const TopArrow = Arrow.extend`
  top: 0;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  img{
    transform-origin: 50% 50%;
    transform: translateY(75px) translateX(-50%) rotate(-90deg);
  }
`

const BottomArrow = Arrow.extend`
  bottom: 0;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  img{
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

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  ${screen.desktopAbove`
    padding: 40px 46px;
    height: 100%;
    overflow-y: hidden;
  `}
`

const ArrowNextIcon = styled.div`
  height: 100%;
  img{
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
      page: 0
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
        return
    }

  }

  _backToTop = () => {
    this.clickCtr = 0
    this.setState({ page: 0 })    
  }
  render() {
    const { page } = this.state
    const { selectedDataList, fulldatalist, awardNamelist, awardYearList, activeAwardId, activeYearIndex } = this.props
    const pagesLength = Math.ceil(selectedDataList.length / awardsNumberInSinglePage)
    let paginatedAwardsList = []
    for (let i = 0; i < pagesLength; i++) {
      let cursor = (i + 1) * awardsNumberInSinglePage
      paginatedAwardsList.push(selectedDataList.slice(cursor - awardsNumberInSinglePage, cursor))
    }
    return (
      <Container>
        <PageWrapper>
          <PaginatedList
            currentPage={page}
            paginatedAwardsList={paginatedAwardsList}
            transitionDuration={transitionDuration}
            backToTop={this._backToTop}
            activeAwardId={activeAwardId}
            activeYearIndex={activeYearIndex}
          />
          <AccordionList 
            awardNamelist={awardNamelist}
            fulldatalist={fulldatalist}
            awardYearList={awardYearList}
            transitionDuration={transitionDuration}
          />
          <SemiTransparentMask position={'bottom'}/>
        </PageWrapper>
        <Arrows>
          <TopArrow
            visible={pagesLength > 1}
            onClick={() => this._gotoNextPage('prev', pagesLength)}>
            <ArrowNextIcon>
              <img src={`${replaceStorageUrlPrefix(`${storageUrlPrefix}/arrow-next.png`)}`}/>
            </ArrowNextIcon>
          </TopArrow>
          <BottomArrow
            visible={pagesLength > 1}
            onClick={() => this._gotoNextPage('next', pagesLength)}>
            <ArrowNextIcon>
              <img src={`${replaceStorageUrlPrefix(`${storageUrlPrefix}/arrow-next.png`)}`}/>
            </ArrowNextIcon>
          </BottomArrow>
        </Arrows>
      </Container>
    )
  }
}

Content.defaultProps = {
  selectedDataList: [],
  fulldatalist: [],
  awardNamelist: [],
  awardYearlist: [],
  activeAwardId: '',
  activeYearIndex: 0
}

Content.propTypes = {
  selectedDataList: PropTypes.array.isRequired,
  fulldatalist: PropTypes.array.isRequired,
  awardNamelist: PropTypes.array.isRequired,
  awardYearlist: PropTypes.array.isRequired,
  activeAwardId: PropTypes.string.isRequired,
  activeYearIndex: PropTypes.number.isRequired
}

