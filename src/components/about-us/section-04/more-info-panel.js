import InfoPanel from './more-info-panel'
import Navigation from '../utils/navigation'
import PopUpPanel from '../utils/pop-up-panel'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import colors from '../../../constants/colors'
import get from 'lodash/get'
import mq from '../utils/media-query'
import styled from 'styled-components'
import { font } from '../constants/styles'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import { storageUrlPrefix } from '../utils/config'

const _ = {
  get
}

const fixedPanelStyle = {
  mob: {
    position: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    width: '100%',
  },
  tablet: {
    position: {
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },
    width: '100%',
  },
}

const Container = styled.div`
  background: ${colors.gray.gray96};
  h2, h4{
    font-family: ${font.family.english.roboto}, ${
  font.family.sansSerifFallback
};
  }
  h3{
    margin: 0;
    font-weight: normal;
  }
  img{
    width: 100%;
  }
  ${mq.desktopAndAbove`
    display: none;
  `}
  ${mq.tabletOnly`
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
  ${mq.mobileOnly`
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

const NavigationWrapper = styled.div`
  display: block;
  text-align: left;
  background: ${colors.white};
  margin: 0;
  ${mq.tabletOnly`
    padding: 0 0 46px 101px;
  `}
  ${mq.mobileOnly`
    padding: 0 0 34px 50px;
  `}
`

const InfoWrapper = styled.div`
  position: relative;
`

const RightArrow = styled.div`
  width: 15px;
  height: 71.8px;
  line-height: 71.8px;
  position: absolute;
  right: 39px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: ${props => (props.hasNext === 'true' ? 'block' : 'none')};
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

const ArrowNextIcon = styled.div`
  height: 100%;
  img {
    width: auto;
    height: 100%;
  }
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
  ${mq.tabletOnly`
    right: 49px;
    top: 42.2px;
  `}
  ${mq.mobileOnly`
    right: 19px;
    top: 24px;
  `}
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

export default class MoreInfo extends PureComponent {
  render() {
    let { selectedContent, infoPageNum, nextPage, closeInfoBox } = this.props
    if (selectedContent.length === 0) return
    let page = infoPageNum % selectedContent.length
    let selectedItem = selectedContent[page]
    return (
      <PopUpPanel
        background={`${colors.white}`}
        fixedPanelStyle={fixedPanelStyle}
      >
        <Container>
          <ItemName>
            <h2>{_.get(selectedItem, 'partner.en')}</h2>
            <h3>{_.get(selectedItem, 'partner.zh-tw')}</h3>
          </ItemName>
          <NavigationWrapper>
            <Navigation
              pagesLength={selectedContent.length}
              currentPage={page}
              startPage={0}
              endPage={selectedContent.length}
              navigationWidth={22}
            />
          </NavigationWrapper>
          <img src={replaceGCSUrlOrigin(storageUrlPrefix + '/' + _.get(selectedItem, 'photo'))} />
          <InfoWrapper>
            <h4>{_.get(selectedItem, 'date')}</h4>
            <p>{_.get(selectedItem, 'description.zh-tw')}</p>
            <RightArrow onClick={nextPage} hasNext={(selectedContent.length > 1).toString()}>
              <ArrowNextIcon>
                <img
                  src={`${replaceGCSUrlOrigin(
                    `${storageUrlPrefix}/arrow-next.png`
                  )}`}
                  alt={'>'}
                />
              </ArrowNextIcon>
            </RightArrow>
          </InfoWrapper>
        </Container>
        <CloseBtn onClick={closeInfoBox} />
      </PopUpPanel>
    )
  }
}

MoreInfo.defaultProps = {
  rowNumber: 0,
  selectedContent: [],
  infoPageNum: 0,
  selectedLogo: 0,
  selectedRow: 0,
  initial: false,
  closeInfoBox: () => {},
}

MoreInfo.propTypes = {
  rowNumber: PropTypes.number.isRequired,
  selectedContent: PropTypes.array.isRequired,
  infoPageNum: PropTypes.number.isRequired,
  selectedLogo: PropTypes.number,
  selectedRow: PropTypes.number,
  closeInfoBox: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  initial: PropTypes.bool.isRequired,
}
