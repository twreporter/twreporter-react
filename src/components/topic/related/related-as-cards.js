import React from 'react'
import styled from 'styled-components'
// utils
import mq from '../../../utils/media-query'
import { shortenString } from '../../../utils/string'
// components
import base from './base'
// @twreporter
import Image from '@twreporter/react-article-components/lib/components/img-with-placeholder'
import {
  colorGrayscale,
  colorOpacity,
} from '@twreporter/core/lib/constants/color'

const ImageBorder = styled.div`
  ${mq.tabletAndAbove`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0 solid ${colorGrayscale.white};
    transition: border .1s ease;
  `}
`

const ItemsContainer = styled(base.ItemsContainer)`
  ${mq.tabletAndAbove`
    padding: 0 5%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
  `}
`

const ItemLink = styled(base.ItemLink)`
  ${mq.tabletAndAbove`
    flex: 0 0 300px;
    width: 300px;
    margin: 0 10px 50px 10px;
    box-shadow: none;
    transition: top .1s ease, box-shadow .2s ease, transform .1s ease;
    display: ${props => (props.hide ? 'none' : 'flex')};
    flex-direction: column;
    &::before {
      transition: border-width .1s ease-out;
      content: "";
      width: 0;
      height: 0;
      top: -2px;
      left: -2px;
      position: absolute;
      z-index: 5;
      border-style: solid;
      border-width: 25px 25px 0 0;
      border-color: ${colorGrayscale.white} transparent transparent;
    }
    &:hover {
      &::before {
        border-width: 0;
      }
      transform: translateY(-5px);
      box-shadow: 0 5px 15px 0 ${colorOpacity['black_0.2']};
      ${base.ItemMeta} {
        transform: translateY(0);
      }
      ${ImageBorder} {
        border: 5px solid ${colorGrayscale.white};
      }
      ${base.ItemImageSizing}, ${base.ItemMeta} {
        box-shadow: none;
      }
    }
  `}
`

const ItemImageSizing = styled(base.ItemImageSizing)`
  ${mq.tabletAndAbove`
    width: 100%;
    height: 200px;
    flex: 0 0 200px;
    position: relative;
    box-shadow: 0 2px 5px 0 ${colorOpacity['black_0.1']};
    transition: box-shadow .1s ease, transform .2s ease;
  `}
`

const ItemMeta = styled(base.ItemMeta)`
  ${mq.tabletAndAbove`
    width: 100%;
    height: 222px;
    flex: 1 0 222px;
    position: relative;
    transform: translateY(5px);
    padding: 17px 12px 2.5em 20px;
    box-shadow: 0 2px 5px 0 ${colorOpacity['black_0.1']};
    transition: box-shadow .1s ease, transform .2s ease;
  `}
`

const Date = styled(base.ItemDate)`
  position: absolute;
  right: 15px;
  bottom: 18px;
`

const textLimit = {
  desc: 59,
}

class Item extends base.Item {
  render() {
    const {
      linkTo,
      linkTarget,
      image,
      title,
      description,
      publishedDate,
      hide,
    } = this.props
    return (
      <ItemLink
        to={linkTo}
        target={linkTarget}
        hide={
          hide || undefined
        } /* passing hide={false} to react-router Link will cause warning */
      >
        <ItemImageSizing>
          <Image
            alt={title}
            defaultImage={image}
            imageSet={[image]}
            objectFit="cover"
          />
          <ImageBorder />
        </ItemImageSizing>
        <ItemMeta>
          <base.ItemTitle>{title}</base.ItemTitle>
          <base.ItemDescription>
            {shortenString(description, textLimit.desc)}
          </base.ItemDescription>
          <Date>{publishedDate}</Date>
        </ItemMeta>
      </ItemLink>
    )
  }
}

export default {
  ItemsContainer,
  Item,
}
