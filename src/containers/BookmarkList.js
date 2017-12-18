/* eslint-disable no-console */
import Bookmark  from '@twreporter/react-components/lib/bookmarks'
import Confirmation from '@twreporter/react-components/lib/confirmation'
import More from '../components/More'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import styles from './BookmarkList.scss'
import twreporterRedux from '@twreporter/redux'
import withLayout from '../helpers/with-layout'
import { CSSTransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'

// lodash
import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

const _ = {
  get,
  findIndex
}

const DEFAULT_LIMIT = 5
const SORT = 'created_at'
const DIALOG_CONTENT = '您確定要刪除這篇文章書籤？'
const DIALOG_CONFIRM = '確定'
const DIALOG_CANCEL = '取消'

const { actions } = twreporterRedux
const { getBookmarks, deleteBookmark } = actions

const MoreContainer = styled.div`
  display: ${props => (props.hasMore ? 'inline' : 'none')}
`

class BookmarkList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showConfirmation: false
    }
    this.getNextPage = this._getNextPage.bind(this)
    this.handleLoadMore = this._handleLoadMore.bind(this)
    this.handleBookmarkIconOnClick = this._handleBookmarkIconOnClick.bind(this)
    this.onCancel = this._onCancel.bind(this)
    this.onConfirm = this._onConfirm.bind(this)
    this.total = 0
    this.targetSlug = ''
  }

  componentWillMount() {
    const { bookmarkData, initialized } = this.props
    const offset = bookmarkData.length
    if ( !initialized ) {
      this._toGetBookmarks(offset, DEFAULT_LIMIT - offset, SORT)
    }
  }

  _toGetBookmarks(offset, defaultLimit, sort) {
    try {
      this.props.getBookmarks(offset, defaultLimit, sort)
    } catch(err) {
      console.log(err)
    }
  }

  _getNextPage() {
    this._toGetBookmarks(this.props.bookmarkData.length, DEFAULT_LIMIT, SORT)
  }

  _handleLoadMore() {
    this.getNextPage()
  }

  _afterClick() {
    this.setState({
      showConfirmation: false
    }, () => {
      document.body.style.overflow = 'scroll'
    })
  }

  _onCancel() {
    this._afterClick()
  }

  async _toDeleteBookmark(bookmarkId, target_index) {
    try {
      await this.props.deleteBookmark(bookmarkId, target_index)
    } catch (error) {
      console.error(error)
    }
  }

  _onConfirm() {
    const { bookmarkData } = this.props
    const target_index = _.findIndex(bookmarkData, (obj) => {
      return obj.slug == this.targetSlug
    })
    const boomarkId = _.get(bookmarkData[target_index], 'id')
    this._afterClick()
    this._toDeleteBookmark(boomarkId)
  }

  _handleBookmarkIconOnClick(slug) {
    this.setState({
      showConfirmation: true
    }, () => {
      document.body.style.overflow = 'hidden'
    })
    this.targetSlug = slug
  }

  render() {
    const { bookmarkData, total } = this.props
    return (
      <div>
        <Bookmark
          bookmarkData={bookmarkData}
          handleBookmarkIconOnClick={this.handleBookmarkIconOnClick}
          total={total}
        />
        <MoreContainer hasMore={bookmarkData.length < total}>
          <More loadMore={this.handleLoadMore}>
            <span >{'載入更多'}</span>
          </More>
        </MoreContainer>
        <CSSTransitionGroup
          transitionName={{
            enter: styles['effect-enter'],
            enterActive: styles['effect-enter-active'],
            leave: styles['effect-leave'],
            leaveActive: styles['effect-leave-active']
          }}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          { this.state.showConfirmation
            ?
              <Confirmation
                onCancel={this.onCancel}
                onConfirm={this.onConfirm}
                content={DIALOG_CONTENT}
                confirm={DIALOG_CONFIRM}
                cancel={DIALOG_CANCEL}
              />
            :
              null
          }
        </CSSTransitionGroup>
      </div>
    )
  }
}


BookmarkList.propTypes = {
  getBookmarks: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    bookmarkData: _.get(state, 'bookmarks.data', []),
    total: _.get(state, 'bookmarks.total', 0),
    initialized: _.get(state, 'bookmarks.initialized')
  }
}

export default connect(mapStateToProps, { getBookmarks, deleteBookmark })(withLayout(BookmarkList))
