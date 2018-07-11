import { colors } from '../../../themes/common-variables'
import { screen } from '../utils/screen'
import AccordionList from './content-accordion-list'
import ArrowNextIcon from '../../../../static/asset/about-us/arrow-next.svg'
import PaginatedList from './content-paginated-list'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const awardsNumberInSinglePage = 3
const transitionDuration = '.3s'

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

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  ${screen.desktopAbove`
    padding: 40px 46px;
    height: 100%;
    overflow-y: hidden;
  `}
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

  _backToTop = () => {
    this.clickCtr = 0
    this.setState({ page: 0 })    
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
          <PaginatedList
            currentPage={page}
            paginatedAwardsList={paginatedAwardsList}
            transitionDuration={transitionDuration}
            backToTop={this._backToTop}
          />
          <AccordionList 
            awardNamelist={awardNamelist}
            fulldatalist={fulldatalist}
            awardYearList={awardYearList}
            transitionDuration={transitionDuration}
          />
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
  selectedDataList: [],
  fulldatalist: [],
  awardNamelist: [],
  awardYearlist: []
}

Content.propTypes = {
  selectedDataList: PropTypes.array.isRequired,
  fulldatalist: PropTypes.array.isRequired,
  awardNamelist: PropTypes.array.isRequired,
  awardYearlist: PropTypes.array.isRequired
}

