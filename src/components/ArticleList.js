import React from 'react'
import More from '../components/More'
import Link from 'react-router/lib/Link'
import { DARK, LINK_PREFIX, INTERACTIVE_ARTICLE_STYLE } from '../constants/index'
import { date2yyyymmdd } from '../utils/index'
import { getArticleImageSrc, getArticleImageSrcSet } from '../utils/index'
import styled, { css } from 'styled-components'

// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map
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
    box-shadow: 0 3px 8px 0 rgba(102, 102, 102, 0.5);
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

const ItemImage = styled.img`
  width: 100%;
  height: auto;
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
  font-weight: 700;
  line-height: 1.25em;
  @media only screen and (max-width: ${breakPoint}px) {
    margin-bottom: 1.5em;
  }
`

const ItemExcerpt = styled.div`
  display: block;
  font-size: 14px;
  font-weight: light;
  line-height: 24px;
  text-align: justify;
  color: #808080;
  @media only screen and (max-width: ${breakPoint}px) {
    display: none;
  }
`

const Date = styled.time`
  display: block;
  line-height: 1.2;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
  font-family: Roboto;
  padding-left: 80%;
  @media only screen and (max-width: ${breakPoint}px) {
    display: none;
  }
`

const bgStyleSelector = bgStyle => {
  switch (bgStyle) {
    case DARK:
      return css`
        ${ItemTitle}, ${ItemExcerpt}, ${Date} {
          color: #F7F7F7;
        }
        ${Item}:hover {
          ${ItemTitle}, ${Date} {
            color: black;
          }
          ${ItemExcerpt} {
            color: #808080;
          }
        }
      `
    default:
      return ''
  }
}

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
  ${props => bgStyleSelector(props.bgStyle)}
`

export default class ListArticleItem extends React.PureComponent {
  _buildItem(article) {
    const { id, publishedDate, style, slug, title } = article
    const image = getArticleImageSrc(article)
    const imageSrcSet = getArticleImageSrcSet(article)
    const dateString = date2yyyymmdd(publishedDate , '.')
    const url = `${style === INTERACTIVE_ARTICLE_STYLE ? LINK_PREFIX.INTERACTIVE_ARTICLE : LINK_PREFIX.ARTICLE}${slug}`
    const excerpt =  _.get(article, 'ogDescription', '')
    if (image) {
      return (
        <Item key={id}>
          <Link to={url} target={style === INTERACTIVE_ARTICLE_STYLE ? '_blank' : undefined}>
            <ImageWrapper>
              <ItemImage src={image} srcSet={imageSrcSet}/>
            </ImageWrapper>
            <ItemDescBox>
              <ItemTitle>{title}</ItemTitle>
              <ItemExcerpt>{excerpt}</ItemExcerpt>
              <Date dateTime={date2yyyymmdd(publishedDate, '-')}>{dateString}</Date>
            </ItemDescBox>
          </Link>
        </Item>
      )
    }
  }

  _buildItemList(articles) {
    return _.map(articles, this._buildItem)
  }

  render() {
    const { articles, bgStyle, hasMore, loadMore, loadMoreError } = this.props
    if (!articles) return (<section />)
    return (
      <section>
        <Container>
          <List bgStyle={bgStyle}>
            {this._buildItemList(articles)}
          </List>
        </Container>
        {
          hasMore ? (
            <div>
              <More loadMore={loadMore}>
                <span style={{ color: loadMoreError ? 'red' : 'white' }}>{loadMoreError ? '更多文章（請重試）' : '更多文章'}</span>
              </More>
            </div>
          )
          : null
        }
      </section>
    )
  }
}
