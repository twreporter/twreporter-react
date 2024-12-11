import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import querystring from 'querystring'
// @twreporters
import { Title1 } from '@twreporter/react-components/lib/title-bar'
import { CardList } from '@twreporter/react-components/lib/listing-page'
import mq from '@twreporter/core/lib/utils/media-query'
import twreporterRedux from '@twreporter/redux'
import useBookmark from '@twreporter/react-components/lib/hook/use-bookmark'
import requestOrigin from '@twreporter/core/lib/constants/request-origins'
import EmptyState from '@twreporter/react-components/lib/empty-state'
import { Bookmark } from '@twreporter/react-components/lib/icon'
import { P2 } from '@twreporter/react-components/lib/text/paragraph'
// components
import Pagination from '../../Pagination'
// context
import { CoreContext } from '../../../contexts'
// constants
import routes from '../../../constants/routes'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'
import remove from 'lodash/remove'

const BOOKMARK_PER_PAGE = 10

const _ = {
  get,
  map,
  remove,
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

const EmptyStateConatiner = styled.div`
  margin-top: 72px;
  margin-bottom: 120px;
`

const { reduxStateFields, actions } = twreporterRedux
const { getMultipleBookmarks } = actions

const SavedBookmarks = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const isDeleting = useSelector(state =>
    _.get(state, [reduxStateFields.bookmarkWidget, 'isRequesting'], false)
  )
  const isFetching = useSelector(state =>
    _.get(state, [reduxStateFields.bookmarks, 'isRequesting'], false)
  )
  const jwt = useSelector(state =>
    _.get(state, [reduxStateFields.auth, 'accessToken'])
  )
  const userID = useSelector(state =>
    _.get(state, [reduxStateFields.auth, 'userInfo', 'user_id'])
  )
  const totalSavedBookmark = useSelector(state =>
    _.get(state, [reduxStateFields.bookmarks, 'total'], 0)
  )
  let currentPage = pageProp(location)
  const totalPages = Math.ceil(totalSavedBookmark / 10)
  if (currentPage > totalPages) {
    currentPage = Math.max(totalPages, 1)
  }

  const [totalSavedBookmarkCount, setTotalSavedBookmarkCount] = useState(
    totalSavedBookmark
  )
  const [bookmarks, setBookmarks] = useState([])
  const [showEmptyState, setShowEmptyState] = useState(false)
  const { releaseBranch, toastr } = useContext(CoreContext)
  const { removeAction } = useBookmark()
  const [isLoading, setIsLoading] = useState(true)

  const removeBookmark = bookmarkID => {
    removeAction(bookmarkID)
      .then(() => {
        toastr({ text: '已取消收藏' })
        setBookmarks(prevBookmarks => {
          _.remove(prevBookmarks, bookmark => bookmark.id === bookmarkID)
          if (prevBookmarks.length === 0) {
            const redirectPage = Math.max(
              currentPage === totalPages ? currentPage - 1 : currentPage,
              1
            )
            window.location.replace(
              `${routes.myReadingPage.savedBookmarksPage.path}?page=${redirectPage}`
            )
          }
          return prevBookmarks
        })
        setTotalSavedBookmarkCount(
          prevTotalSavedBookmark => prevTotalSavedBookmark - 1
        )
      })
      .catch(_error => {
        toastr({ text: '連線失敗，請再試一次' })
      })
  }

  const filterBookmark = bookmark => {
    const {
      title,
      desc,
      thumbnail,
      slug,
      published_date: publishedDate,
      id: bookmarkID,
      category,
    } = bookmark
    const handleToggleBookmark = () => {
      removeBookmark(bookmarkID)
    }
    return {
      id: bookmarkID,
      title,
      og_description: desc,
      hero_image: {
        resized_targets: {
          mobile: {
            url: thumbnail,
          },
        },
      },
      category,
      category_set: [{ category: { name: category } }],
      published_date: Number(`${publishedDate}000`),
      releaseBranch,
      slug,
      is_bookmarked: true,
      toggle_bookmark: handleToggleBookmark,
    }
  }

  const getBookmarks = async page => {
    const { payload } = await dispatch(
      getMultipleBookmarks(
        jwt,
        userID,
        (page - 1) * BOOKMARK_PER_PAGE,
        BOOKMARK_PER_PAGE
      )
    )
    setTotalSavedBookmarkCount(_.get(payload, 'data.meta.total', 0))
    const { records } = _.get(payload, 'data', [])
    if (records.length === 0) {
      setShowEmptyState(true)
    } else {
      setShowEmptyState(false)
      setBookmarks(_.map(records, bookmark => filterBookmark(bookmark)))
    }
  }

  useEffect(() => {
    setIsLoading(true)
    getBookmarks(currentPage)
    setIsLoading(false)
  }, [currentPage])

  if (isLoading) {
    return (
      <Container>
        <Title1 title={'已收藏'} />
        <CardList isFetching={true} showSpinner={true} data={[{}]} />
      </Container>
    )
  }

  return (
    <Container>
      <Title1
        title={'已收藏'}
        subtitle={
          totalSavedBookmarkCount ? `共${totalSavedBookmarkCount}篇` : null
        }
      />
      {showEmptyState ? (
        <EmptyStateConatiner>
          <EmptyState
            style={EmptyState.Style.DEFAULT}
            title="你還沒有收藏任何報導"
            guide={
              <>
                <P2 text="點擊" />
                <Bookmark
                  type={Bookmark.Type.ADD}
                  releaseBranch={releaseBranch}
                />
                <P2 text="將喜愛的文章加入我的書籤" />
              </>
            }
            buttonText="前往首頁"
            buttonUrl={requestOrigin.forClientSideRendering[releaseBranch].main}
            releaseBranch={releaseBranch}
          />
        </EmptyStateConatiner>
      ) : (
        <>
          <ListContainer>
            <CardList
              isFetching={!isDeleting && isFetching}
              showSpinner={!isDeleting && isFetching}
              data={bookmarks}
              showIsBookmarked={true}
              width={100}
            />
          </ListContainer>
          <PaginationContainer>
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </PaginationContainer>
        </>
      )}
    </Container>
  )
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

export default SavedBookmarks
