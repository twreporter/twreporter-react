import { colors } from '../../../themes/common-variables'
import { font } from '../constants/styles'
import { screen } from '../utils/screen'
import arrowNextIcon from '../../../../static/asset/about-us/arrow-next.png'
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
    left: 0;
    top: 0;
    bottom: 0;
    display: ${props => props.selectedRow === props.rowNumber && !props.initial ? 'block' : 'none'};
    z-index: calc( ${defaultZIndex} + 1 );
    width: 100vw;
    min-height: 100vh;
    img{
      width: 100%;
    }
    background: ${colors.white};
    overflow: scroll;
  `}
`

const InfoBoxMobile = styled.div`
  background: ${colors.gray.gray96};
  h2, h4{
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
    position: relative;
    width: calc(100% - 157px);
    min-height: calc(100% - 103px);
    margin-top: 103px;
    h2, h3, h4 {
      padding-left: 101px;
    }
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
    h4{
      font-size: 13px;
      letter-spacing: 0.3px;
      margin: 54.4px 0 15px 0;
    }
    p{
      font-size: 18px;
      line-height: 1.67;
      padding: 0 39px 162px 100px;
    }  
  `}
  ${screen.mobile`
    position: relative;
    width: calc(100% - 50px);
    min-height: calc(100% - 61px);
    margin-top: 61px;
    h2, h3, h4 {
      padding-left: 50px;      
    }
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
    h4{
      font-size: 13px;
      font-weight: ${font.weight.bold};
      letter-spacing: 0.3px;
      margin: 32px 0 20px 0;
    }
    p{
      padding: 0 28px 30px 50px;
      font-size: 16px;
      font-weight: 500;
      line-height: 1.63;
    }
  `}
`

const ItemName = styled.div`
  background: ${colors.white};
`

const Pagination = styled.div`
  display: inline-block;
  width: 11px;
  height: 2px;
  opacity: ${props => props.isCurrentPage ? 1 : 0.25};
  background: ${colors.black};
  margin: 0 1px;
  visibility: ${props => props.visible === 'true' ? 'visible' : 'hidden'};
`

const Navigation = styled.div`
  display: block;
  float: right;
  ${screen.desktopAbove`
    transform: translateY(-50%);
  `}
  ${screen.tabletBelow`
    background: ${colors.white};
    width: 100%;
    float: left;
  `}
  ${screen.tablet`
    padding: 0 0 46px 101px;
  `}
  ${screen.mobile`
    padding: 0 0 34px 50px;
  `}
`

const InfoBoxDesktop = styled.div `
  ${screen.tabletBelow`
    display: none;
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

const Info = styled.div`
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

const ArrowNextIcon = styled.div`
  img{
    width: auto;
    height: 100%;
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
      pagination.push(<Pagination key={i} isCurrentPage={i === this.props.infoPageNum % pagesLength} visible={(pagesLength > 1).toString()}/>)
    }
    navigation.push(<Navigation key="nav">{pagination}</Navigation>)
    return navigation
  }
  _getInfoBox = () => {
    let { selectedContent, infoPageNum, nextPage } = this.props
    if (selectedContent.length === 0 ) return
    let page = infoPageNum % selectedContent.length
    let selectedItem = selectedContent[page]
    return (
      <React.Fragment>
        <InfoBoxMobile>
          <ItemName>
            <h2>{selectedItem.name.english}</h2>
            <h3>{selectedItem.name.chinese}</h3>
          </ItemName>
          {this._createNavigation(selectedContent.length)}
          <img src={selectedItem.photo} />
          <h4>{selectedItem.date}</h4>
          <p>
            {selectedItem.description.chinese}
          </p>
          <RightArrow onClick={nextPage} hasNext={(selectedContent.length > 1).toString()}>
            <ArrowNextIcon>
              <img src={arrowNextIcon} />
            </ArrowNextIcon>
          </RightArrow>
        </InfoBoxMobile>
        <InfoBoxDesktop>
          <img src={selectedItem.photo} />
          <Info>
            {this._createNavigation(selectedContent.length)}
            <h4>{selectedItem.date}</h4>
            <p>{selectedItem.description.chinese}</p>
            <RightArrow onClick={nextPage} hasNext={(selectedContent.length > 1).toString()}>
              <ArrowNextIcon>
                <img src={arrowNextIcon} />
              </ArrowNextIcon>
            </RightArrow>
          </Info>
        </InfoBoxDesktop>
      </React.Fragment>      
    )    
  }
  render() {
    let { rowNumber, selectedLogo, selectedRow, closeInfoBox, initial } = this.props
    return (
      <Container
        rowNumber={rowNumber} 
        selectedLogo={selectedLogo} 
        selectedRow={selectedRow}
        initial={initial}
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


