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

// constants
import routes from '../../constants/routes'

// components
import EmptyBox from './empty-box'

// context
import { CoreContext } from '../../contexts'

// lodash
import get from 'lodash/get'
import map from 'lodash/map'
import remove from 'lodash/remove'

const _ = {
  get,
  map,
  remove,
}

const CardListContainer = styled.div`
  padding-top: 24px;
  padding-bottom: 24px;
  width: 100%;
`

const SavedBookmarksSection = () => {
  const { releaseBranch, toastr } = useContext(CoreContext)
  const navigate = useHistory()
  const store = useStore()
  const state = store[0]
  const { removeAction } = useBookmark(store)
  const [bookmarks, setBookmarks] = useState([])
  const [totalBoorkmarks, setTotalBookmarks] = useState(-1)

  const moreSavedBookmarkBtn = () => {
    if (totalBoorkmarks <= 0) return
    return (
      <>
        <DesktopAndAbove>
          <TextButton
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
          <TextButton
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
    const bookmarkIDList = _.get(state, ['bookmarks', 'bookmarkIDList'], [])
    const bookmarkEntities = _.get(state, ['bookmarks', 'entities'], {})
    const totalBookmarks = _.get(state, ['bookmarks', 'total'], 0)
    const bookmarks = _.map(bookmarkIDList, id =>
      filterBookmark(_.get(bookmarkEntities, id))
    )
    setBookmarks(bookmarks)
    setTotalBookmarks(totalBookmarks)
  }, [state.bookmarks])

  if (totalBoorkmarks < 0) {
    return (
      <div>
        <Title2 title={'已收藏'} />
        <CardList isFetching={true} showSpinner={true} data={[{}]} />
      </div>
    )
  }

  return (
    <div>
      <Title2 title={'已收藏'} renderButton={moreSavedBookmarkBtn()} />
      {bookmarks.length === 0 && totalBoorkmarks > 0 && (
        <EmptyBox type={EmptyBox.Type.ShowMoreBookmark} />
      )}
      {totalBoorkmarks === 0 && <EmptyBox type={EmptyBox.Type.Bookmark} />}
      {bookmarks.length > 0 && (
        <CardListContainer>
          <CardList data={bookmarks} width={100} showIsBookmarked={true} />
        </CardListContainer>
      )}
    </div>
  )
}

export default SavedBookmarksSection
