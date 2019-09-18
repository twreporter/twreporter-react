import { shortenString } from '../../../utils/string'
import base from './base'
import Image from '@twreporter/react-article-components/lib/components/img-with-placeholder'
import mq from '../../../utils/media-query'
import React from 'react'
import styled from 'styled-components'

const ItemsContainer = styled(base.ItemsContainer)`
  ${mq.tabletAndAbove`
    padding: 60px 0 50px 0;
  `}
`

const ItemLink = styled(base.ItemLink)`
  ${mq.tabletAndAbove`
    width: 92%;
    max-width: 780px;
    min-height: 200px;
    margin: 0 auto 50px;
  `}
  ${mq.desktopAndAbove`
    transition: transform .2s ease,box-shadow .2s ease;
    &:hover {
      transform: translate(-5px, -5px);
      box-shadow: 0 8px 12px 0 rgba(0,0,0,.25);
      ${base.ItemTitle} {
        color: #c71b0a;
      }
    }
  `}
`

const ItemImageSizing = styled(base.ItemImageSizing)`
  ${mq.tabletAndAbove`
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    height: 100%;
  `}
`

const ItemMeta = styled(base.ItemMeta)`
  ${mq.tabletAndAbove`
    position: relative;
    left: 300px;
    min-height: 200px;
    max-width: 480px;
    padding: 25px 20px;
  `}
`

const Date = styled(base.ItemDate)`
  position: absolute;
  right: 25px;
  bottom: 10px;
`

const textLimit = {
  desc: 78
}

class Item extends base.Item {
  render() {
    const {
      linkTo,
      linkTarget,
      image,
      title,
      description,
      publishedDate
    } = this.props
    return (
      <ItemLink
        to={linkTo}
        target={linkTarget}
      >
        <ItemImageSizing>
          <Image
            alt={title}
            defaultImage={image}
            imageSet={[ image ]}
            objectFit="cover"
          />
        </ItemImageSizing>
        <ItemMeta>
          <base.ItemTitle>{title}</base.ItemTitle>
          <base.ItemDescription>{shortenString(description, textLimit.desc)}</base.ItemDescription>
          <Date>{publishedDate}</Date>
        </ItemMeta>
      </ItemLink>
    )
  }
}

export default {
  ItemsContainer,
  Item
}
