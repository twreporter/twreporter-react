import { colors } from '../../../themes/common-variables'
import { font } from '../constants/styles'
import { replaceStorageUrlPrefix } from '@twreporter/react-components/lib/shared/utils'
import { screen } from '../utils/screen'
import { storageUrlPrefix } from '../utils/config'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

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
    display: none;
  `}
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
    top: 170px;
    right: -69px;
  `}
  ${screen.mobile`
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
  _createNavigation = (pagesLength) => {
    let navigation = []
    let pagination = []
    for (let i = 0; i < pagesLength; i++) {
      pagination.push(<Pagination key={i} isCurrentPage={i === this.props.infoPageNum % pagesLength} visible={(pagesLength > 1).toString()}/>)
    }
    navigation.push(<Navigation key="nav">{pagination}</Navigation>)
    return navigation
  }
  render() {
    const { selectedContent, infoPageNum, nextPage, closeInfoBox } = this.props
    if (selectedContent.length === 0 ) return
    let page = infoPageNum % selectedContent.length
    let selectedItem = selectedContent[page]
    return (
      <Container>
        <img src={replaceStorageUrlPrefix(selectedItem.photo)} />
        <Info>
          {this._createNavigation(selectedContent.length)}
          <h4>{selectedItem.date}</h4>
          <p>{selectedItem.description.chinese}</p>
          <RightArrow onClick={nextPage} hasNext={(selectedContent.length > 1).toString()}>
            <ArrowNextIcon>
              <img src={`${replaceStorageUrlPrefix(`${storageUrlPrefix}/arrow-next.png`)}`} alt={'>'}/>
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


