import More from '../components/More'
import React from 'react'
import styled from 'styled-components'
import styles from './BookmarkList.scss'
import twreporterRedux from 'twreporter-redux'
import { Bookmark, Confirmation } from 'twreporter-react-components'
import { CSSTransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import { setHeaderInfo } from '../actions/header'
import { AUTHOR_PAGE, LIGHT } from '../constants/index'

// lodash
import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

const _ = {
  get,
  findIndex
}

const DEFAULT_LIMIT = 6
const SORT = 'created_at'
const DIALOG_CONTENT = '您確定要刪除這篇文章書籤？'
const DIALOG_CONFIRM = '確定'
const DIALOG_CANCEL = '取消'

const { actions } = twreporterRedux
const { getBookmarks, createBookmark, deleteBookmark } = actions

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
    this.bookmarkData = []
    this.total = 0
    this.targetSlug = ''
  }

  componentWillMount() {
    this.getNextPage()
    const { setHeaderInfo } = this.props
    setHeaderInfo({
      pageTheme: LIGHT,
      pageType: AUTHOR_PAGE
    })
  }

  _getNextPage() {
    const offset = this.bookmarkData.length
    this.props.getBookmarks(offset, DEFAULT_LIMIT, SORT)
      .then(({ data, total }) => {
        this.total = total
        if (this.bookmarkData.length <= total) {
          data.forEach((bookmark) => {
            this.bookmarkData.push(bookmark)
          })
          this.forceUpdate()
        }
      })
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

  _onConfirm() {
    const index = _.findIndex(this.bookmarkData, (obj) => {
      return obj.slug == this.targetSlug
    })
    const boomarkId = _.get(this.bookmarkData[index], 'id')
    if (index > -1) {
      this.bookmarkData.splice(index, 1)
      this.total = this.total - 1
    }
    this._afterClick()
    this.props.deleteBookmark(boomarkId)
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
    return (
      <div>
        <Bookmark
          bookmarkData={this.bookmarkData}
          handleBookmarkIconOnClick={this.handleBookmarkIconOnClick}
          total={this.total}
        />
        <MoreContainer hasMore={this.bookmarkData.length < this.total}>
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
  getBookmarks: React.PropTypes.func.isRequired,
  setHeaderInfo: React.PropTypes.func.isRequired,
  createBookmark: React.PropTypes.func.isRequired
}

export default connect(null, { getBookmarks, setHeaderInfo, createBookmark, deleteBookmark })(BookmarkList)
