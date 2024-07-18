import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
// utils
import { formatPostLinkTo, formatPostLinkTarget } from '../../utils/url'
// components
import { More } from './more'
// @twreporter
import { date2yyyymmdd } from '@twreporter/core/lib/utils/date'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import Image from '@twreporter/react-article-components/lib/components/img-with-placeholder'
import { fontWeight, fontFamily } from '@twreporter/core/lib/constants/font'
import {
  colorGrayscale,
  colorOpacity,
} from '@twreporter/core/lib/constants/color'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'
import merge from 'lodash/merge'

const _ = {
  get,
  map,
  merge,
}

const itemWidth = 451
const listingWidth = itemWidth * 2 + 52
const breakPoint = listingWidth

const Container = styled.div`
  padding: 0 15px;
  margin: 0 auto;
`

const Item = styled.li`
  display: inline-block;
  width: ${itemWidth}px;
  font-size: 13px;
  vertical-align: top;
  transition: all 0.3s ease;
  margin: 0;
  padding: 0;
  &:hover {
    background-color: white;
    box-shadow: 0 3px 8px 0 ${colorOpacity['black_0.2']};
  }
  &:nth-child(odd) {
    vertical-align: top;
    margin-bottom: 15px;
  }
  &:nth-child(even) {
    margin: 0 0 15px 20px;
    vertical-align: top;
    @media only screen and (max-width: ${breakPoint}px) {
      margin: 0;
      vertical-align: top;
    }
  }
  @media only screen and (max-width: ${breakPoint}px) {
    width: 100%;
    margin: 0;
    height: auto;
    overflow: hidden;
  }
`

const ImageWrapper = styled.div`
  width: ${itemWidth}px;
  margin: 0;
  height: auto;
  overflow: hidden;
  text-align: center;
  @media only screen and (max-width: ${breakPoint}px) {
    width: 100%;
    height: auto;
  }
`

const ItemDescBox = styled.div`
  width: 100%;
  height: auto;
  margin: 0px auto;
  padding: 0 0.6rem;
  @media only screen and (max-width: ${breakPoint}px) {
    width: 90%;
    margin: 20px auto 25px auto;
    font-size: 16px;
  }
`

const ItemTitle = styled.h3`
  margin: 20px 0;
  padding: 0;
  border: 0;
  font-size: 135%;
  font-weight: ${fontWeight.bold};
  font-family: ${fontFamily.title};
  line-height: 1.25em;
  @media only screen and (max-width: ${breakPoint}px) {
    margin-bottom: 1.5em;
  }
`

const ItemExcerpt = styled.div`
  display: block;
  font-size: 14px;
  font-weight: ${fontWeight.normal};
  line-height: 24px;
  text-align: justify;
  color: ${colorGrayscale.gray600};
  @media only screen and (max-width: ${breakPoint}px) {
    display: none;
  }
`

const Date = styled.time`
  display: block;
  line-height: 1.2;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
  padding-left: 80%;
  @media only screen and (max-width: ${breakPoint}px) {
    display: none;
  }
`

const List = styled.ul`
  list-style: none;
  width: ${listingWidth}px;
  margin: 20px auto;
  padding: 0;
  @media only screen and (max-width: ${breakPoint}px) {
    width: 100%;
    margin-top: 20px;
    -webkit-column-count: 1;
    column-count: 1;
  }

  ${ItemTitle}, ${ItemExcerpt}, ${Date} {
    color: ${colorGrayscale.gray100};
  }
  ${Item}:hover {
    ${ItemTitle}, ${Date} {
      color: ${colorGrayscale.black};
    }
    ${ItemExcerpt} {
      color: ${colorGrayscale.gray600};
    }
  }
`

export default class ListArticleItem extends React.PureComponent {
  static propTypes = {
    articles: PropTypes.array,
    hasMore: PropTypes.bool,
    loadMore: PropTypes.func,
    loadMoreError: PropTypes.object,
  }

  _buildItem(post) {
    const { id, style, slug, title } = post
    const publishedDate = post['published_date']
    const dateString = date2yyyymmdd(publishedDate, '.')
    const url = formatPostLinkTo(slug, style)
    const excerpt = _.get(post, 'og_description', '')
    const imageResizedTargets =
      _.get(post, 'hero_image.resized_targets') ||
      _.get(post, 'og_image.resized_targets')
    const images = [
      _.get(imageResizedTargets, 'tiny'),
      _.get(imageResizedTargets, 'mobile'),
      _.get(imageResizedTargets, 'tablet'),
      _.get(imageResizedTargets, 'desktop'),
    ]
      .filter(Boolean)
      .map(image => ({ ...image, url: replaceGCSUrlOrigin(image.url) }))
    return (
      <Item key={id}>
        <Link to={url} target={formatPostLinkTarget(style)}>
          <ImageWrapper>
            <Image
              alt={
                _.get(post, 'hero_image.description') ||
                _.get(post, 'og_image.description')
              }
              defaultImage={_.get(images, '1')}
              imgPlaceholderSrc={_.get(images, '0.url')}
              imageSet={images}
            />
          </ImageWrapper>
          <ItemDescBox>
            <ItemTitle>{title}</ItemTitle>
            <ItemExcerpt>{excerpt}</ItemExcerpt>
            <Date dateTime={date2yyyymmdd(publishedDate, '-')}>
              {dateString}
            </Date>
          </ItemDescBox>
        </Link>
      </Item>
    )
  }

  _buildItemList(articles) {
    return _.map(articles, this._buildItem)
  }

  render() {
    const { articles, hasMore, loadMore, loadMoreError } = this.props
    if (!articles) return <section />
    return (
      <section>
        <Container>
          <List>{this._buildItemList(articles)}</List>
        </Container>
        {hasMore ? (
          <More loadMore={loadMore}>
            <span style={{ color: loadMoreError ? 'red' : 'white' }}>
              {loadMoreError ? '更多文章（請重試）' : '更多文章'}
            </span>
          </More>
        ) : null}
      </section>
    )
  }
}
