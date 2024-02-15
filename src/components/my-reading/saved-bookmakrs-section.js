import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

// @twreporter
import { Title2 } from '@twreporter/react-components/lib/title-bar'
import { TextButton } from '@twreporter/react-components/lib/button'
import { Arrow } from '@twreporter/react-components/lib/icon'
import {
  DesktopAndAbove,
  TabletAndBelow,
} from '@twreporter/react-components/lib/rwd'
import useStore from '@twreporter/react-components/lib/hook/use-store'
import useBookmark from '@twreporter/react-components/lib/hook/use-bookmark'
import { CardList } from '@twreporter/react-components/lib/listing-page'
import twreporterRedux from '@twreporter/redux'

// constants
import routes from '../../constants/routes'

// components
import EmptyBox from './empty-box'

// context
import { CoreContext } from '../../contexts'

// hooks
import { useWidthDetector } from '../../hooks'

// lodash
import get from 'lodash/get'
import map from 'lodash/map'
import remove from 'lodash/remove'

const _ = {
  get,
  map,
  remove,
}

const { actions, reduxStateFields } = twreporterRedux
const { getMultipleBookmarks } = actions

const MobileMaxWidth = 767

const CardListContainer = styled.div`
  padding-top: 24px;
  padding-bottom: 24px;
  width: 100%;
`

const StyledTextButton = styled(TextButton)`
  height: 100%;
`

const SavedBookmarksSection = () => {
  const { releaseBranch, toastr } = useContext(CoreContext)
  const navigate = useHistory()
  const store = useStore()
  const [state, dispatch] = store
  const { removeAction } = useBookmark(store)
  const [bookmarks, setBookmarks] = useState([])
  const [totalBoorkmarks, setTotalBookmarks] = useState(-1)
  const isMobile = useWidthDetector(MobileMaxWidth)

  const moreSavedBookmarkBtn = () => {
    if (totalBoorkmarks <= 0) return
    return (
      <>
        <DesktopAndAbove>
          <StyledTextButton
            text="查看更多"
            rightIconComponent={<Arrow direction="right" />}
            onClick={() =>
              navigate.push(routes.myReadingPage.savedBookmarksPage.path)
            }
            size={TextButton.Size.L}
            releaseBranch={releaseBranch}
          />
        </DesktopAndAbove>
        <TabletAndBelow>
          <StyledTextButton
            text="查看更多"
            rightIconComponent={<Arrow direction="right" />}
            onClick={() =>
              navigate.push(routes.myReadingPage.savedBookmarksPage.path)
            }
            size={TextButton.Size.S}
            releaseBranch={releaseBranch}
          />
        </TabletAndBelow>
      </>
    )
  }

  const removeBookmark = bookmarkID => {
    removeAction(bookmarkID)
      .then(() => {
        toastr({ text: '已取消收藏' })
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

  useEffect(() => {
    const bookmarkIDList = _.get(
      state,
      [reduxStateFields.bookmarks, 'bookmarkIDList'],
      []
    )
    const bookmarkEntities = _.get(
      state,
      [reduxStateFields.bookmarks, 'entities'],
      {}
    )
    const totalBookmarks = _.get(
      state,
      [reduxStateFields.bookmarks, 'total'],
      0
    )
    const bookmarks = _.map(bookmarkIDList, id =>
      filterBookmark(_.get(bookmarkEntities, id))
    )
    setBookmarks(bookmarks)
    setTotalBookmarks(totalBookmarks)
  }, [state[reduxStateFields.bookmarks]])

  useEffect(() => {
    const jwt = _.get(state, [reduxStateFields.auth, 'accessToken'])
    const userID = _.get(state, [reduxStateFields.auth, 'userInfo', 'user_id'])
    dispatch(getMultipleBookmarks(jwt, userID, 0, isMobile ? 4 : 6))
  }, [isMobile])

  if (state[reduxStateFields.bookmarks].isRequesting) {
    return (
      <div>
        <Title2 title={'已收藏'} />
        <CardList isFetching={true} showSpinner={true} data={[{}]} />
      </div>
    )
  }

  const BookmarksJSX = () => {
    if (bookmarks.length === 0) {
      if (totalBoorkmarks > 0) {
        return (
          <EmptyBox type={EmptyBox.Type.ShowMoreBookmark} isMobile={isMobile} />
        )
      }
      if (totalBoorkmarks === 0) {
        return <EmptyBox type={EmptyBox.Type.Bookmark} />
      }
    } else {
      return (
        <CardListContainer>
          <CardList data={bookmarks} width={100} showIsBookmarked={true} />
        </CardListContainer>
      )
    }
  }

  return (
    <div>
      <Title2 title={'已收藏'} renderButton={moreSavedBookmarkBtn()} />
      {BookmarksJSX()}
    </div>
  )
}

export default SavedBookmarksSection
