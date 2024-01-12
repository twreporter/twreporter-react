import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import querystring from 'querystring'
import PropTypes from 'prop-types'
// @twreporters
import { Title1 } from '@twreporter/react-components/lib/title-bar'
import { CardList } from '@twreporter/react-components/lib/listing-page'
import mq from '@twreporter/core/lib/utils/media-query'
import {
  SnackBar,
  useSnackBar,
} from '@twreporter/react-components/lib/snack-bar'
import requestOrigin from '@twreporter/core/lib/constants/request-origins'
import EmptyState from '@twreporter/react-components/lib/empty-state'
// components
import Pagination from '../Pagination'
// context
import { CoreContext } from '../../contexts'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const BROWSING_HISTORY_PER_PAGE = 10

const TEST_POST = {
  slug: 'migrant-workers-return-home-with-ashes',
  title: '從台灣到越南，傷心的屍骨還鄉路 ',
  state: 'published',
  hero_image: {
    resized_targets: {
      mobile: {
        url:
          'https://www.twreporter.org/images/20180413144637-692c1c0eb0c62035867b85c5ad236367-mobile.jpg',
      },
    },
  },
  categories: [
    {
      id: '5951db87507c6a0d00ab063c',
      sort_order: 0,
      name: '人權．社會',
    },
  ],
  category_set: [
    {
      category: {
        id: '63206383207bf7c5f8716234',
        name: '人權司法',
      },
      subcategory: {
        id: '63206383207bf7c5f8716237',
        name: '移工與移民',
      },
    },
  ],
  style: 'article',
  og_description:
    '兩位哥哥分別捧著弟弟的骨灰，離開台灣這處斷魂地。兩個月後，《報導者》重走這條屍骨還鄉的路線⋯⋯',
  published_date: '2018-04-17T00:00:00Z',
}

const _ = {
  get,
  map,
}

const Container = styled.div`
  width: 100%;
`
const ListContainer = styled.div`
  margin-top: 24px;
  margin-bottom: 64px;
  ${mq.mobileOnly`
    margin-bottom: 32px;
  `}
`

const PaginationContainer = styled.div`
  margin-bottom: 120px;
  ${mq.mobileOnly`
    margin-bottom: 64px;
  `}
`

const SnackBarContainer = styled.div`
  z-index: 1;
  position: fixed;
  transition: opacity 100ms;
  opacity: ${props => (props.showSnackBar ? 1 : 0)};
  max-width: 440px;
  width: 100%;
  left: 50%;
  ${mq.desktopAndAbove`
    bottom: 24px;
    transform: translateX(-50%);
  `}
  ${mq.tabletAndBelow`
    bottom: calc(env(safe-area-inset-bottom, 0) + 60px + 8px);
    transform: translateX(-50%);
    padding: 0 16px;
  `}
`

const SnackBarDiv = styled.div`
  display: flex;
  justify-content: center;
`

const EmptyStateConatiner = styled.div`
  margin-top: 72px;
  margin-bottom: 120px;
`

const BrowsingHistory = ({ page, totalPages }) => {
  const [browsingHistory, setBrowsingHistory] = useState([])
  const [fakeBrowsingHistory, setFakeBrowsingHistory] = useState([])
  const [showEmptyState, setShowEmptyState] = useState(false)
  const { releaseBranch } = useContext(CoreContext)
  const { showSnackBar, snackBarText, toastr } = useSnackBar()

  const updateBookmarkStatus = (postID, isBookmarked) => {
    toastr({ text: isBookmarked ? '已收藏' : '已取消收藏' })

    const handleToggleBookmark = () => {
      updateBookmarkStatus(postID, !isBookmarked)
    }

    setBrowsingHistory(prevHistory =>
      prevHistory.map(post =>
        post.id === postID
          ? {
              ...post,
              is_bookmarked: isBookmarked,
              toggle_bookmark: handleToggleBookmark,
            }
          : post
      )
    )

    setFakeBrowsingHistory(prevHistory =>
      prevHistory.map(post =>
        post.id === postID
          ? {
              ...post,
              is_bookmarked: isBookmarked,
              toggle_bookmark: handleToggleBookmark,
            }
          : post
      )
    )
  }

  const removeBookmark = postID => {
    updateBookmarkStatus(postID, false)
  }

  const addBookmark = postID => {
    updateBookmarkStatus(postID, true)
  }

  const filterPost = post => {
    const { id, bookmark_id: bookmarkID } = post
    const handleToggleBookmark = () => {
      return bookmarkID ? removeBookmark(id) : addBookmark(id)
    }
    return {
      ...post,
      id,
      is_bookmarked: !!bookmarkID,
      toggle_bookmark: handleToggleBookmark,
    }
  }

  const paginate = (array, pageSize, pageNumber) => {
    --pageNumber
    return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize)
  }

  const getBrowsingHistory = page => {
    const hasPages = totalPages > 0

    if (hasPages) {
      let historyToPaginate

      if (!fakeBrowsingHistory.length) {
        const record = Array.from(
          { length: totalPages * BROWSING_HISTORY_PER_PAGE },
          (_, i) => {
            const post = { ...TEST_POST, id: i + 1 }
            return filterPost(post)
          }
        )

        setFakeBrowsingHistory(record)
        historyToPaginate = record
      } else {
        historyToPaginate = fakeBrowsingHistory
      }

      setBrowsingHistory(
        paginate(historyToPaginate, BROWSING_HISTORY_PER_PAGE, page)
      )
      setShowEmptyState(false)
    } else {
      setShowEmptyState(true)
    }
  }

  useEffect(() => {
    getBrowsingHistory(page)
  }, [page])

  return (
    <Container>
      <Title1 title={'造訪紀錄'} subtitle={'近六個月造訪過的報導'} />
      {showEmptyState ? (
        <EmptyStateConatiner>
          <EmptyState
            style={EmptyState.Style.DEFAULT}
            title="你還沒有造訪過任何報導"
            guide="前往首頁探索更多內容"
            buttonText="前往首頁"
            buttonUrl={requestOrigin.forClientSideRendering[releaseBranch].main}
            releaseBranch={releaseBranch}
          />
        </EmptyStateConatiner>
      ) : (
        <>
          <ListContainer>
            <CardList
              data={browsingHistory}
              showIsBookmarked={true}
              width={100}
            />
          </ListContainer>
          <PaginationContainer>
            <Pagination currentPage={page} totalPages={totalPages} />
          </PaginationContainer>
          <SnackBarContainer showSnackBar={showSnackBar}>
            <SnackBarDiv>
              <SnackBar text={snackBarText} />
            </SnackBarDiv>
          </SnackBarContainer>
        </>
      )}
    </Container>
  )
}

BrowsingHistory.propTypes = {
  page: PropTypes.number,
  totalPages: PropTypes.number,
}

function pageProp(location = {}) {
  const defaultPage = 1
  const search = _.get(location, 'search', '')
  const searchWithoutPrefix =
    typeof search === 'string' ? search.replace(/^\?/, '') : search
  const pageStr = _.get(querystring.parse(searchWithoutPrefix), 'page', '1')
  let page = parseInt(Array.isArray(pageStr) ? pageStr[0] : pageStr, 10)

  if (isNaN(page) || page < defaultPage) {
    page = defaultPage
  }

  return page
}

// TODO: change after connect to api
function totalPage(location = {}) {
  const defaultTotalPage = 0
  const search = _.get(location, 'search', '')
  const searchWithoutPrefix =
    typeof search === 'string' ? search.replace(/^\?/, '') : search
  const totalPageStr = _.get(
    querystring.parse(searchWithoutPrefix),
    'total_page',
    '0'
  )
  let totalPage = parseInt(
    Array.isArray(totalPageStr) ? totalPageStr[0] : totalPageStr,
    10
  )

  if (isNaN(totalPage) || totalPage < defaultTotalPage) {
    totalPage = defaultTotalPage
  }

  return totalPage
}

const mapStateToProps = (_state, props) => {
  const location = _.get(props, 'location')

  let currentPage = pageProp(location)
  const totalPages = totalPage(location)
  if (currentPage > totalPages) {
    currentPage = totalPages
  }
  return {
    page: currentPage,
    totalPages,
  }
}

export default withRouter(connect(mapStateToProps)(BrowsingHistory))
