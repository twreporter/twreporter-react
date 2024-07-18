import PropTypes from 'prop-types'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
// utils
import mq from '../../../utils/media-query'
// @twreporter
import { fontWeight, fontFamily } from '@twreporter/core/lib/constants/font'
import {
  colorGrayscale,
  colorOpacity,
} from '@twreporter/core/lib/constants/color'

const fadeInSlideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`
const ItemsContainer = styled.div`
  position: relative;
`

const ItemLink = styled(Link)`
  animation: ${fadeInSlideDown} 300ms ease-in-out;
  display: ${props => (props.hide ? 'none' : 'block')};
  position: relative;
  box-shadow: 0 2px 5px 0 ${colorOpacity['black_0.1']};
  ${mq.mobileOnly`
    width: 100%;
    margin: 10px 0;
    min-height: 110px;
    padding: 11px 36px 12px 18px;
    background: ${colorGrayscale.white};
  `}
`

const ItemImageSizing = styled.div`
  ${mq.mobileOnly`
    position: absolute;
    width: 80px;
    height: 80px;
    top: 15px;
    left: 18px;
  `}
`

const ItemMeta = styled.div`
  background: ${colorGrayscale.white};
  ${mq.mobileOnly`
    position: relative;
    left: 110px;
    width: calc(100% - 110px);
  `}
`
const ItemTitle = styled.h3`
  font-family: ${fontFamily.title};
  font-size: 20px;
  color: ${colorGrayscale.gray900};
  letter-spacing: 0.3px;
  font-weight: ${fontWeight.bold};
  margin: 0;
  line-height: 1.4;
  transition: color 0.2s ease;
`

const ItemDescription = styled.div`
  font-family: ${fontFamily.default};
  ${mq.mobileOnly`
    display: none;
  `}
  margin-top: 10px;
  font-size: 15px;
  color: rgb(128, 128, 128);
  letter-spacing: 0.1px;
  font-weight: ${fontWeight.normal};
  line-height: 1.5;
`

const ItemDate = styled.div`
  font-family: ${fontFamily.default};
  ${mq.mobileOnly`
    display: none;
  `}
  font-size: 13px;
  font-weight: ${fontWeight.normal};
  color: rgb(128, 128, 128);
`

const ShowAllButton = styled.div`
  cursor: pointer;
  position: relative;
  margin: 0 auto;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${colorGrayscale.gray900};
  box-shadow: 0 2px 5px 0 ${colorOpacity['black_0.1']};
  transition-property: transform, box-shadow;
  transition-timing-function: ease;
  transition-duration: 0.2s;
  &:hover {
    box-shadow: 0 5px 15px 0 ${colorOpacity['black_0.2']};
    transform: translateY(-5px);
  }
  & > div {
    color: ${colorGrayscale.white};
    font-size: 17px;
    font-weight: ${fontWeight.bold};
    letter-spacing: 1px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
`

const Background = styled.div`
  background: ${props => props.$background || colorGrayscale.gray300};
  ${mq.mobileOnly`
    padding: 30px 0 40px 0;
  `}
  ${mq.tabletAndAbove`
    padding: 60px 0 50px 0;
  `}
`

class Item extends React.PureComponent {
  static propTypes = {
    linkTo: PropTypes.string,
    linkTarget: PropTypes.oneOf(['_self', '_blank']),
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    publishedDate: PropTypes.string,
    hide: PropTypes.bool,
  }
  static defaultProps = {
    linkTo: '',
    linkTarget: '_self',
    title: '',
    description: '',
    publishedDate: '',
    hide: false,
  }
}

export default {
  Item,
  ItemsContainer,
  ItemLink,
  ItemImageSizing,
  ItemMeta,
  ItemTitle,
  ItemDescription,
  ItemDate,
  ShowAllButton,
  Background,
}
