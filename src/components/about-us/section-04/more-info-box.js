import colors from '../../../constants/colors'
import { font } from '../constants/styles'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import mq from '../utils/media-query'
import { storageUrlPrefix } from '../utils/config'
import Navigation from '../utils/navigation'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const logoBlockWidthOnDesktop = '39%'

const Container = styled.div `
  ${mq.desktopAndAbove`
    position: relative;
    display: ${props => props.selectedRow === props.rowNumber ? 'inline-block' : 'none'};
    width: 100%;
    margin-bottom: 10px;
    h2{
      float: right;
    }
    img{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 39%;
    }
  `}
  ${mq.hdOnly`
    height: 278px;
  `}
  ${mq.desktopOnly`
    height: 220px;
  `}
  ${mq.tabletAndBelow`
    display: none;
  `}
`

const NavigationWrapper = styled.div`
  display: block;
  float: right;
  ${mq.desktopAndAbove`
    transform: translateY(-50%);
  `}
`

const RightArrow = styled.div `
  width: 15px;
  height: 71.8px;
  line-height: 71.8px;
  position: absolute;
  right: 39px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: ${props => props.hasNext === 'true' ? 'block' : 'none'};
  ${mq.tabletAndBelow`
    transform: translateX(100%) translateY(-50%);    
  `}
  ${mq.tabletOnly`
    top: 170px;
    right: -69px;
  `}
  ${mq.mobileOnly`
    top: 105px;
    right: -18px;
  `}
`

const Info = styled.div`
  background: ${colors.gray.gray96};
  h4 {
    font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};
    font-weight: bold;
  }
  p {
    font-weight: ${font.weight.medium};    
  }
  ${mq.desktopAndAbove`
    position: absolute;
    right: 0;
    bottom: 0;
    width: calc(100% - ${logoBlockWidthOnDesktop});
    padding-right: 87px;
    padding-left: 38px;
    h4 {
      font-size: 13px;
      letter-spacing: 0.3px;
    }
    p {
      font-size: 16px;
      line-height: 1.63;
    }
  `}
  ${mq.hdOnly`
    min-height: 214px;
    max-height: 248px;
    padding-top: 46px;
    padding-bottom: 38px;
    h4 {
      margin: 0 0 16px 0;
    }
  `}
  ${mq.desktopOnly`
    min-height: 170px;
    max-height: 190px;    
    padding-top: 23px;
    padding-bottom: 19px;
    h4 {
      margin: 0 0 8px 0;
    }
  `}
`

const ArrowNextIcon = styled.div`
  height: 100%;
  img{
    width: auto;
    height: 100%;
  }
`

const CloseBtn = styled.div `
  position: absolute;
  right: 3px;
  top: 8px;
  display: inline-block;
  width: 20px;
  height: 20px;
  overflow: hidden;
  cursor: pointer;
  &:before, &:after {
    content: '';
    position: absolute;
    height: 2px;
    width: 100%;
    top: 50%;
    left: 0;
    margin-top: -1px;
    background: #000;
  }
  &:before {
  transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`

export default class InfoBox extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const { selectedContent, infoPageNum, nextPage, closeInfoBox } = this.props
    if (selectedContent.length === 0 ) return
    let page = infoPageNum % selectedContent.length
    let selectedItem = selectedContent[page]
    return (
      <Container>
        <img src={replaceGCSUrlOrigin(selectedItem.photo)} />
        <Info>
          <NavigationWrapper>
            <Navigation
              pagesLength = {selectedContent.length}
              currentPage = {page}
              startPage = {0}
              endPage = {selectedContent.length}
              navigationWidth = {22}                          
            />
          </NavigationWrapper>
          <h4>{selectedItem.date}</h4>
          <p>{selectedItem.description.chinese}</p>
          <RightArrow onClick={nextPage} hasNext={(selectedContent.length > 1).toString()}>
            <ArrowNextIcon>
              <img src={`${replaceGCSUrlOrigin(`${storageUrlPrefix}/arrow-next.png`)}`} alt={'>'}/>
            </ArrowNextIcon>
          </RightArrow>
        </Info>
        <CloseBtn onClick={closeInfoBox} />          
      </Container>
    )
  }
}

InfoBox.defaultProps = {
  selectedContent: [],
  infoPageNum: 0,
  nextPage: () => {},
  closeInfoBox: () => {}
}

InfoBox.propTypes = {
  selectedContent: PropTypes.array.isRequired,
  infoPageNum: PropTypes.number.isRequired,
  nextPage: PropTypes.func.isRequired,
  closeInfoBox: PropTypes.func.isRequired
}


