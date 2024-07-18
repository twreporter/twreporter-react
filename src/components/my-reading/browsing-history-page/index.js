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
import requestOrigin from '@twreporter/core/lib/constants/request-origins'
import EmptyState from '@twreporter/react-components/lib/empty-state'
import twreporterRedux from '@twreporter/redux'
import useBookmark from '@twreporter/react-components/lib/hook/use-bookmark'
// components
import Pagination from '../../Pagination'
// context
import { CoreContext } from '../../../contexts'
// utils
import { getBookmarkFromPost } from '../../../utils/bookmark'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const BROWSING_HISTORY_PER_PAGE = 10

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

const EmptyStateConatiner = styled.div`
  margin-top: 72px;
  margin-bottom: 120px;
`

const BrowsingHistory = ({
  isTogglingBookmark,
  isFetching,
  jwt,
  userID,
  getUserFootprints,
  page,
  totalPages,
}) => {
  const [browsingHistory, setBrowsingHistory] = useState([])
  const [showEmptyState, setShowEmptyState] = useState(false)
  const { releaseBranch, toastr } = useContext(CoreContext)
  const { addAction, removeAction } = useBookmark()
  const [isLoading, setIsLoading] = useState(true)

  const updateBrowsingHistory = (targetHistory, isBookmarking) => {
    const handleToggleBookmark = () => {
      isBookmarking ? removeBookmark(targetHistory) : addBookmark(targetHistory)
    }

    setBrowsingHistory(prevHistory =>
      prevHistory.map(history =>
        history.id === targetHistory.id
          ? {
              ...targetHistory,
              is_bookmarked: isBookmarking,
              toggle_bookmark: handleToggleBookmark,
            }
          : history
      )
    )
  }

  const removeBookmark = history => {
    removeAction(history.bookmark_id)
      .then(() => {
        updateBrowsingHistory(history, false)
        toastr({ text: '已取消收藏' })
      })
      .catch(() => {
        toastr({ text: '連線失敗，請再試一次' })
      })
  }

  const addBookmark = history => {
    addAction(getBookmarkFromPost(history))
      .then(res => {
        history.bookmark_id = _.get(res, 'payload.data.record.id')
        updateBrowsingHistory(history, true)
        toastr({ text: '已收藏' })
      })
      .catch(() => {
        toastr({ text: '連線失敗，請再試一次' })
      })
  }

  const filterBrowsingHistory = history => {
    const { bookmark_id: bookmarkID } = history
    const handleToggleBookmark = () => {
      return bookmarkID ? removeBookmark(history) : addBookmark(history)
    }
    return {
      ...history,
      is_bookmarked: !!bookmarkID,
      toggle_bookmark: handleToggleBookmark,
    }
  }

  const getBrowsingHistory = async page => {
    const { payload } = await getUserFootprints(
      jwt,
      userID,
      (page - 1) * BROWSING_HISTORY_PER_PAGE,
      BROWSING_HISTORY_PER_PAGE
    )
    const { records } = _.get(payload, 'data', [])
    if (records.length === 0) {
      setShowEmptyState(true)
    } else {
      setShowEmptyState(false)
      setBrowsingHistory(
        _.map(records, history => filterBrowsingHistory(history))
      )
    }
  }

  useEffect(() => {
    setIsLoading(true)
    getBrowsingHistory(page)
    setIsLoading(false)
  }, [page])

  if (isLoading) {
    return (
      <Container>
        <Title1 title={'造訪紀錄'} />
        <CardList isFetching={true} showSpinner={true} data={[{}]} />
      </Container>
    )
  }

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
              isFetching={!isTogglingBookmark && isFetching}
              showSpinner={!isTogglingBookmark && isFetching}
              data={browsingHistory}
              showIsBookmarked={true}
              width={100}
            />
          </ListContainer>
          <PaginationContainer>
            <Pagination currentPage={page} totalPages={totalPages} />
          </PaginationContainer>
        </>
      )}
    </Container>
  )
}

BrowsingHistory.propTypes = {
  isTogglingBookmark: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  jwt: PropTypes.string,
  userID: PropTypes.number,
  getUserFootprints: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
}

const { reduxStateFields, actions } = twreporterRedux
const { getUserFootprints } = actions

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

const mapStateToProps = (state, props) => {
  const location = _.get(props, 'location')
  const isTogglingBookmark = _.get(
    state,
    [reduxStateFields.bookmarkWidget, 'isRequesting'],
    false
  )
  const isFetching = _.get(
    state,
    [reduxStateFields.footprints, 'isRequesting'],
    false
  )
  const jwt = _.get(state, [reduxStateFields.auth, 'accessToken'])
  const userID = _.get(state, [reduxStateFields.auth, 'userInfo', 'user_id'])
  const totalBrowsingHistory = _.get(
    state,
    [reduxStateFields.footprints, 'total'],
    0
  )

  let currentPage = pageProp(location)
  const totalPages = Math.ceil(totalBrowsingHistory / 10)
  if (currentPage > totalPages) {
    currentPage = Math.max(totalPages, 1)
  }
  return {
    isTogglingBookmark,
    isFetching,
    jwt,
    userID,
    page: currentPage,
    totalPages,
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    { getUserFootprints }
  )(BrowsingHistory)
)
