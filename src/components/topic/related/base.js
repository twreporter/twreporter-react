import { sourceHanSansTC as fontWeight } from '@twreporter/core/lib/constants/font-weight'
import Link from 'react-router-dom/Link'
import mq from '../../../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const ItemsContainer = styled.div`
  background: ${props => props.background || '#d8d8d8'};
  position: relative;
  ${mq.mobileOnly`
    padding: 30px 0 40px 0;
  `}
`

const ItemLink = styled(Link)`
  display: block;
  position: relative;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,.1);
  ${mq.mobileOnly`
    width: 100%;
    margin: 10px 0;
    min-height: 110px;
    padding: 11px 36px 12px 18px;
    background: #ffffff;
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
  background: #ffffff;
  ${mq.mobileOnly`
    position: relative;
    left: 110px;
    width: calc(100% - 110px);
  `}
`

const ItemTitle = styled.h3`
  font-size: 20px;
  color: #262626;
  letter-spacing: .3px;
  font-weight: ${fontWeight.bold};
  margin: 0;
  line-height: 1.4;
  transition: color .2s ease;
`

const ItemDescription = styled.div`
  ${mq.mobileOnly`
    display: none;
  `}
  margin-top: 10px;
  font-size: 15px;
  color: rgb(128, 128, 128);
  letter-spacing: .1px;
  font-weight: ${fontWeight.normal};
  line-height: 1.5;
`

const ItemDate = styled.div`
  ${mq.mobileOnly`
    display: none;
  `}
  font-size: 13px;
  font-weight: ${fontWeight.normal};
  color: rgb(128, 128, 128);
`

class Item extends React.PureComponent {
  static propTypes = {
    linkTo: PropTypes.string,
    linkTarget: PropTypes.oneOf([ '_self', '_blank' ]),
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }).isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    publishedDate: PropTypes.string
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
  ItemDate
}
