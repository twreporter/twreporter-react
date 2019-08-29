import { AUTHOR_COLLECTION, LOADING_MORE_ARTICLES, LOAD_MORE_ARTICLES, NUMBER_OF_FIRST_RESPONSE_PAGE } from '../../constants/author-page'
import { CHARACTERS_LIMIT } from '../../constants/index'
import { formatPostLinkTarget, formatPostLinkTo } from '../../utils/url'
import { shortenString } from '../../utils/string'
import { Waypoint } from 'react-waypoint'
import Link from 'react-router-dom/Link'
import LoadingSpinner from '../Spinner'
import mq from '../../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import Sizing from '../sizing'
import styled, { keyframes } from 'styled-components'
// @twreporter
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import Image from '@twreporter/react-article-components/lib/components/img-with-placeholder'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map
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
  font-weight: 700;
  border: 0;
  color: #262626;
  text-align: center;
`

const Collections = styled.ul`
  list-style: none;
  padding-left: 0;
`

const Item = styled.li`
  animation: ${fadeInDown} 0.5s;
  width: 100%;
  background-color: #ffffff;
  margin: 16px 0;
  transition: box-shadow .2s;
  &:hover {
    box-shadow: 0 4px 10px 0 hsla(0,0%,70%,.7);
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
  color: #101010;
  vertical-align: text-top;
  display: inline-block;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
`

const ItemDesc = styled.p`
  margin: 0;
  text-align: justify;
  vertical-align: text-bottom;
  color: #808080;
  font-size: 15px;
  ${mq.mobileOnly`
    display: none;
  `}
`


const LoadMore = styled.div`
  width: 100%;
  color: #c71b0a;
  margin: 0 auto 2rem auto;
  font-weight: 700;
  padding: .6rem 0;
  cursor: pointer;
  transition: transform .2s;
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
  const image = _.get(item, 'heroImage.image.resizedTargets.mobile', {})
  image.url = replaceGCSUrlOrigin(image.url)
  const slug = _.get(item, 'slug', '')
  const title = _.get(item, 'title', '')
  const style = _.get(item, 'style', '')
  const description = shortenString(get(item, 'ogDescription', ''), CHARACTERS_LIMIT.BOTTOM_RELATED_DESC)
  return (
    <Item key={slug}>
      <Anchor to={formatPostLinkTo(slug, style)} target={formatPostLinkTarget(style)}>
        <ImageSizing>
          <Image
            alt={title}
            defaultImage={image}
            imageSet={[ image ]}
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

const AuthorCollection = (props) => {
  const { relateds, hasMore, isFetching, currentPage, handleLoadmore, totalResults } = props
  const titleText = AUTHOR_COLLECTION + (totalResults ?  `（${totalResults}）`: '')

  // Page bottom display options
  const isLoadmoreBtnDisplayed = (currentPage <= NUMBER_OF_FIRST_RESPONSE_PAGE && hasMore && !isFetching)
  const isSensorActive = (currentPage > NUMBER_OF_FIRST_RESPONSE_PAGE && hasMore)

  return (
    <Sizing size="small">
      <CollectionTitle>{titleText}</CollectionTitle>
      <Collections>
        {_.map(relateds, buildListItem)}
      </Collections>
      {isLoadmoreBtnDisplayed ? <LoadMore onClick={handleLoadmore}>{LOAD_MORE_ARTICLES}</LoadMore> : null}
      {isSensorActive ? (
        <Waypoint
          onEnter={() => {
            if ((currentPage > NUMBER_OF_FIRST_RESPONSE_PAGE)) {
              return handleLoadmore()
            }
          }}
          fireOnRapidScroll
          scrollableAncestor="window"
        >
          <WaypointSensor />
        </Waypoint>
      ) : null}
      {isFetching ? <CenteredSpinner alt={LOADING_MORE_ARTICLES} /> : null}
    </Sizing>
  )
}

AuthorCollection.propTypes = {
  currentPage: PropTypes.number,
  handleLoadmore: PropTypes.func,
  isFetching: PropTypes.bool,
  hasMore: PropTypes.bool,
  related: PropTypes.array,
  totalResults: PropTypes.number
}

export default AuthorCollection
