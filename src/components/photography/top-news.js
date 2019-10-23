import { date2yyyymmdd } from '@twreporter/core/lib/utils/date'
import { LINK_PREFIX, INTERACTIVE_ARTICLE_STYLE } from '../../constants'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import { sourceHanSansTC as fontWeight } from '@twreporter/core/lib/constants/font-weight'
import Image from '@twreporter/react-article-components/lib/components/img-with-placeholder'
import { Link } from 'react-router-dom'
import mq from '../../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import Slider from './slider'
import styled from 'styled-components'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map
}

const Hexagon = styled.div`
  width: 2.6em;
	background-image: url('/asset/photography/polygon.svg');
  background-size: 100%;
  background-repeat: repeat-y;
  text-align: center;
  line-height: 2.63em;
  padding: 0 0.4em;
  color: black;
`

const StyledLink = styled(Link)`
  height: 100%;
  display: block;
  position: relative;
`

const CategoryContainer = styled.div`
  position: absolute;
  top: 50px;
  left: 50px;
  font-size: 16px;
  ${mq.mobileOnly`
    font-size: 12px;
    top: 12px;
    left: 12px;
  `}
`

const Card = styled.div`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.9);
  border: 2px solid black;
  ${mq.tabletAndAbove`
    padding: 30px 30px 0;
    width: 475px;
    right: 50px;
    bottom: 6%;
  `}
  ${mq.mobileOnly`
    padding: 15px 15px 0;
    top: 88%;
    left: 15px;
    right: 15px;
    width: auto;
  `}
`

const CardTitle = styled.div`
  font-weight: ${fontWeight.bold};
  font-size: 28px;
  color: black;
  line-height: 36px;
  word-spacing: 20px;
  padding-bottom: 20px;
  ${mq.mobileOnly`
    font-size: 17px;
    line-height: 26px;
    padding-bottom: 15px;
  `}
`

const CardSubtitle = styled.div`
	color: black;
  font-size: 20px;
  word-spacing: 20px;
  padding-top: 8px;
  padding-bottom: 8px;
  ${mq.mobileOnly`
    font-size: 14px;
    word-spacing: 14px;
    padding-top: 4px;
    padding-bottom: 4px;
  `}
`

const CardDate = styled.time`
  display: none;
  ${mq.tabletAndAbove`
    display: block;
    font-family: "Times New Roman";
    font-style: italic;
    color: black;
    word-spacing: 20px;
    padding-bottom: 30px;
    font-size: 12px;
  `}
`

function _buildSlideFromPost(post) {
  const cats = _.get(post, 'categories', [])
  const catDisplay = _.get(cats, [ 0, 'name' ], '專題')
  let prefix = LINK_PREFIX.ARTICLE
  let target = undefined
  if (post.style === INTERACTIVE_ARTICLE_STYLE) {
    prefix = LINK_PREFIX.INTERACTIVE_ARTICLE
    target = '_blank'
  }
  const imageResizedTargets = _.get(post, 'heroImage.resizedTargets') || _.get(post, 'ogImage.resizedTargets')
  const images = [
    _.get(imageResizedTargets, 'tiny'),
    _.get(imageResizedTargets, 'mobile'),
    _.get(imageResizedTargets, 'tablet'),
    _.get(imageResizedTargets, 'desktop'),
    _.get(imageResizedTargets, 'original')
  ].filter(Boolean).map(image => ({ ...image, url: replaceGCSUrlOrigin(image.url) }))
  return (
    <StyledLink key={post.id} to={prefix + post.slug} target={target}>
      <Image
        alt={_.get(post, 'heroImage.description') || _.get(post, 'ogImage.description')}
        defaultImage={images[1]}
        imgPlaceholderSrc={images[0].url}
        imageSet={images}
        objectFit="cover"
      />
      <CategoryContainer>
        <Hexagon>{catDisplay}</Hexagon>
      </CategoryContainer>
      <Card>
        {post.subtitle ? <CardSubtitle>{post.subtitle}</CardSubtitle> : null}
        <CardTitle>{post.title}</CardTitle>
        <CardDate dateTime={date2yyyymmdd(post.publishedDate, '-')}>{date2yyyymmdd(post.publishedDate, '.')}</CardDate>
      </Card>
    </StyledLink>
  )
}

export default class TopNews extends React.PureComponent {
  static propTypes = {
    posts: PropTypes.array
  }
  static defaultProps = {
    posts: []
  }

  render() {
    const { posts } = this.props
    return Array.isArray(posts) && posts.length > 0 ? (
      <Slider
        className="topnews"
        autoPlayInterval={4500}
        showIndicator
        showSwitcher
      >
        {_.map(posts, _buildSlideFromPost)}
      </Slider>
    ) : null
  }
}
export { TopNews }
