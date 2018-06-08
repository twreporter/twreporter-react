import { colors } from '../../../themes/common-variables'
import { font } from '../constants/styles'
import { screen } from '../utils/screen'
import ArrowNextIcon from '../../../../static/asset/about-us/arrow-next.svg'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const defaultZIndex = 0
const logoBlockWidthOnDesktop = '39%'

const Container = styled.div `
  ${screen.desktopAbove`
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
  ${screen.overDesktop`
    height: 278px;
  `}
  ${screen.desktop`
    height: 220px;
  `}
  ${screen.tabletBelow`
    position: fixed;
    display: ${props => props.selectedRow === props.rowNumber ? 'block' : 'none'};
    top: 0;
    left: 0;
    z-index: calc( ${defaultZIndex} + 1 );
    width: 100vw;
    height: 100vh;
    img{
      width: 100%;
    }
    background: ${colors.white};
  `}
`

const InfoBoxMobileWrapper = styled.div`
  ${screen.tabletBelow`
    position: absolute;
    bottom: 0;
    left: 0;
  `}
  ${screen.tablet`
    width: calc((610 / 768) * 100%);   
  `}
  ${screen.mobile`
    width: calc((325 / 375) * 100%);   
  `}
`

const Pagination = styled.div`
  display: inline-block;
  width: 11px;
  height: 2px;
  opacity: ${props => props.isCurrentPage ? 1 : 0.25};
  background: ${colors.black};
  margin: 0 1px;
`

const Navigation = styled.div`
  display: block;
  float: right;
  visibility: ${props => props.visible === 'true' ? 'visible' : 'hidden'};
  ${screen.desktopAbove`
    transform: translateY(-50%);
  `}
  ${screen.tabletBelow`
    float: left;
  `}
`

const OnlyDisplayOnDesktopAbove = styled.div `
  ${screen.tabletBelow`
    display: none;
  `}
`

const OnlyDisplayOnTabletBelow = styled.div`
  h2{
    font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};
  }
  h3{
    margin: 0;
    font-weight: normal;
  }
  ${screen.desktopAbove`
    display: none;
  `}
  ${screen.tablet`
    padding-left: 100px;
    h2{
      font-size: 26px;
      font-weight: bold;
      letter-spacing: 0.8px;
      margin-bottom: 11px;
    }
    h3{
      font-size: 24px;
      letter-spacing: 1.7px;      
    }
  `}
  ${screen.mobile`
    padding-left: 50px;
    h2{
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 0.8px;
      margin-bottom: 5px;
    }
    h3{
      font-size: 22px;
      letter-spacing: 1.6px;      
    }
  `}
  ${Navigation}{
    ${screen.tablet`
      margin-bottom: 46px;
    `}
    ${screen.mobile`
      margin-bottom: 23px;
    `}
  }
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
  ${screen.tabletBelow`
    transform: translateX(100%) translateY(-50%);    
  `}
  ${screen.tablet`
    right: -69px;
  `}
  ${screen.mobile`
    right: -18px;
  `}
`

const InfoBox = styled.div`
  background: ${colors.gray.gray96};
  h4 {
    font-family: ${font.family.english.roboto}, ${font.family.sansSerifFallback};
    font-weight: bold;
  }
  p {
    font-weight: ${font.weight.medium};    
  }
  ${screen.desktopAbove`
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
  ${screen.overDesktop`
    min-height: 214px;
    max-height: 248px;
    padding-top: 46px;
    padding-bottom: 38px;
    h4 {
      margin: 0 0 16px 0;
    }
  `}
  ${screen.desktop`
    min-height: 170px;
    max-height: 190px;    
    padding-top: 23px;
    padding-bottom: 19px;
    h4 {
      margin: 0 0 8px 0;
    }
  `}
  ${screen.tabletBelow`
    position: relative;
    h4 {
      font-size: 13px;
      letter-spacing: 0.3px;
    }
  `}
  ${screen.tablet`
    padding: 54px 39px 160px 100px;
    height: 388.4px;
    p {
      font-size: 18px;
      line-height: 1.67;
    }  
  `}
  ${screen.mobile`
    padding: 32px 28px 30px 50px;
    height: 292px;
    p {
      font-size: 16px;
      line-height: 1.63;
    }
    h4 {
      margin-top: 0;
      margin-bottom: 20px;
    }   
  `}
`

const CloseBtn = styled.div`
  position: absolute;
  right: 3px;
  top: 8px;
  display: inline-block;
  width: 20px;
  height: 20px;
  overflow: hidden;
  cursor: pointer;
  ${screen.tablet`
    right: 49px;
    top: 42.2px;
  `}
  ${screen.mobile`
    right: 19px;
    top: 24px;
  `}
  &:before, &:after {
    content: '';
    position: absolute;
    height: 1px;
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

export default class MoreInfo extends PureComponent {
  constructor(props) {
    super(props)
  }

  _createNavigation = (pagesLength) => {
    let navigation = []
    let pagination = []
    for (let i = 0; i < pagesLength; i++) {
      pagination.push(<Pagination key={i} isCurrentPage={i === this.props.infoPageNum % pagesLength} />)
    }
    navigation.push(<Navigation key="nav" visible={(pagesLength > 1).toString()}>{pagination}</Navigation>)
    return navigation
  }
  _getInfoBox = () => {
    let { selectedContent, infoPageNum, nextPage } = this.props
    if (selectedContent.length === 0 ) return
    let page = infoPageNum % selectedContent.length
    let selectedItem = selectedContent[page]
    return (
      <InfoBoxMobileWrapper>
        <OnlyDisplayOnTabletBelow>
          <h2>{selectedItem.name.english}</h2>
          <h3>{selectedItem.name.chinese}</h3>
          {this._createNavigation(selectedContent.length)}
        </OnlyDisplayOnTabletBelow>
        <img src={selectedItem.photo} />
        <InfoBox>
          <OnlyDisplayOnDesktopAbove>
            {this._createNavigation(selectedContent.length)}
          </OnlyDisplayOnDesktopAbove>
          <h4>{selectedItem.date}</h4>
          <p>{selectedItem.description.chinese}</p>
          <RightArrow onClick={nextPage} hasNext={(selectedContent.length > 1).toString()}>
            <ArrowNextIcon />
          </RightArrow>
        </InfoBox>
      </InfoBoxMobileWrapper>      
    )    
  }
  render() {
    let { rowNumber, selectedLogo, selectedRow, closeInfoBox } = this.props
    return (
      <Container
        rowNumber={rowNumber} 
        selectedLogo={selectedLogo} 
        selectedRow={selectedRow}
        onWheel={(e) => e.preventDefault()}
      >
        {this._getInfoBox()}
        <CloseBtn onClick={closeInfoBox} />
      </Container>
    )
  }
}

MoreInfo.defaultProps = {
  rowNumber: 0,
  selectedContent: [],
  infoPageNum: 0,
  selectedLogo: 0,
  selectedRow: 0
}

MoreInfo.propTypes = {
  rowNumber: PropTypes.number.isRequired,
  selectedContent: PropTypes.array.isRequired,
  infoPageNum: PropTypes.number.isRequired,
  selectedLogo: PropTypes.number,
  selectedRow: PropTypes.number,
  closeInfoBox: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired
}


