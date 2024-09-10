import { Waypoint } from 'react-waypoint'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { keyframes } from 'styled-components'
// utils
import mq from '../../utils/media-query'
import { shortenString } from '../../utils/string'
import { formatPostLinkTarget, formatPostLinkTo } from '../../utils/url'
// components
import LoadingSpinner from '../Spinner'
import Sizing from '../sizing'
// @twreporter
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import Image from '@twreporter/react-article-components/lib/components/img-with-placeholder'
import { fontWeight, fontFamily } from '@twreporter/core/lib/constants/font'
import {
  colorGrayscale,
  colorBrand,
} from '@twreporter/core/lib/constants/color'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map,
}

const WaypointSensor = styled.div`
  height: 0;
  margin: 0 auto;
`

const fadeInDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const CollectionTitle = styled.h3`
  margin: 0 auto 24px auto;
  padding: 0;
  font-size: 18px;
  font-weight: ${fontWeight.bold};
  border: 0;
  color: ${colorGrayscale.gray900};
  text-align: center;
`

const Collections = styled.ul`
  list-style: none;
  padding-left: 0;
`

const Item = styled.li`
  animation: ${fadeInDown} 0.5s;
  width: 100%;
  background-color: ${colorGrayscale.white};
  margin: 16px 0;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 4px 10px 0 hsla(0, 0%, 70%, 0.7);
  }
  ${mq.mobileOnly`
    margin: 10px 0;
    padding: 0 15px;
    width: 100%;
  `}
`

const Anchor = styled(Link)`
  text-decoration: none;
  display: table;
  margin: 0;
`

const ImageSizing = styled.div`
  width: 80px;
  height: 80px;
  margin-top: 28px;
  margin-left: 27px;
  margin-bottom: 27px;
  ${mq.mobileOnly`
    margin-left: 20px;
  `}
`

const Content = styled.div`
  display: table-cell;
  text-align: left;
  vertical-align: top;
  padding: 24px 24px 24px 16px;
`

const ItemTitle = styled.h4`
  color: ${colorGrayscale.gray900};
  vertical-align: text-top;
  display: inline-block;
  font-size: 20px;
  font-weight: ${fontWeight.bold};
  font-family: ${fontFamily.title};
  margin: 0;
`

const ItemDesc = styled.p`
  margin: 0;
  text-align: justify;
  vertical-align: text-bottom;
  color: ${colorGrayscale.gray600};
  font-size: 15px;
  ${mq.mobileOnly`
    display: none;
  `}
`

const LoadMoreDiv = styled.div`
  width: 100%;
  color: ${colorBrand.heavy};
  margin: 0 auto 2rem auto;
  font-weight: ${fontWeight.bold};
  padding: 0.6rem 0;
  cursor: pointer;
  transition: transform 0.2s;
  font-size: 16px;
  text-align: center;
  &:hover {
    transform: translateY(10%);
  }
`

const CenteredSpinner = styled(LoadingSpinner)`
  text-align: center;
  margin: 30px 0;
`

function buildListItem(item) {
  const charLimit = 120
  const image = _.get(item, 'heroImage.resizedTargets.mobile', {})
  image.url = replaceGCSUrlOrigin(image.url)
  const slug = _.get(item, 'slug', '')
  const title = _.get(item, 'title', '')
  const style = _.get(item, 'style', '')
  const description = shortenString(get(item, 'ogDescription', ''), charLimit)
  return (
    <Item key={slug}>
      <Anchor
        to={formatPostLinkTo(slug, style)}
        target={formatPostLinkTarget(style)}
      >
        <ImageSizing>
          <Image
            alt={title}
            defaultImage={image}
            imageSet={[image]}
            objectFit="cover"
          />
        </ImageSizing>
        <Content>
          <ItemTitle>{title}</ItemTitle>
          <ItemDesc>{description}</ItemDesc>
        </Content>
      </Anchor>
    </Item>
  )
}

const LoadMore = ({ currentPage, handleLoadmore }) => {
  const numberOfFirstResponsePage = 0
  if (currentPage > numberOfFirstResponsePage) {
    return (
      <Waypoint
        onEnter={() => {
          if (currentPage > numberOfFirstResponsePage) {
            return handleLoadmore()
          }
        }}
        fireOnRapidScroll
        scrollableAncestor="window"
      >
        <WaypointSensor />
      </Waypoint>
    )
  }
  return <LoadMoreDiv onClick={handleLoadmore}>載入更多文章</LoadMoreDiv>
}
LoadMore.propTypes = {
  currentPage: PropTypes.number.isRequired,
  handleLoadmore: PropTypes.func.isRequired,
}

const AuthorCollection = ({
  collections = [],
  hasMore = false,
  isFetching = false,
  currentPage,
  handleLoadmore,
  totalResults = 0,
}) => {
  const titleText =
    '所有文章' + (typeof totalResults === 'number' ? `（${totalResults}）` : '')

  return (
    <Sizing $size="small">
      <CollectionTitle>{titleText}</CollectionTitle>
      <Collections>{_.map(collections, buildListItem)}</Collections>
      {hasMore && !isFetching ? (
        <LoadMore currentPage={currentPage} handleLoadmore={handleLoadmore} />
      ) : null}
      {isFetching ? <CenteredSpinner alt="載入更多文章" /> : null}
    </Sizing>
  )
}

AuthorCollection.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.object),
  currentPage: PropTypes.number.isRequired,
  handleLoadmore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool,
  isFetching: PropTypes.bool,
  totalResults: PropTypes.number,
}

export default AuthorCollection
