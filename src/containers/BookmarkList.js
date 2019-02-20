import { connect } from 'react-redux'
import { deleteSingleBookmark, getMultipleBookmarks } from '../actions/bookmarks'
import Bookmarks from '../components/bookmark-list'
import Confirmation from '@twreporter/react-components/lib/confirmation'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import More from '../components/More'
import predefinedPropTypes from '../constants/bookmarks/prop-types'
import PropTypes from 'prop-types'
import React from 'react'
import RedirectToSignIn from '../components/bookmark-list/RedirectToSignIn'
import reduxStatePropKey from '../constants/redux-state-prop-key'
import signInHref from '../constants/bookmarks/sign-in-href'
import styled from 'styled-components'
// lodash
import findIndex from 'lodash/findIndex'
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  findIndex,
  get,
  map
}

const defaultLimit = 5
const defaultSort = 'created_at'
const text = {
  dialog: {
    content: '您確定要刪除這篇文章書籤？',
    confirm: '確定',
    cancel: '取消'
  },
  loadMore: '載入更多'
}

const transitionName = {
  enter: 'effect-enter',
  enterActive: 'effect-enter-active',
  leave: 'effect-leave',
  leaveActive: 'effect-leave-active'
}

const transitionDuration = {
  enter: 400,
  leave: 300
}

const MoreContainer = styled.div`
  display: ${props => (props.hasMore ? 'inline' : 'none')};
`

const StyledTransitionGroup = styled(CSSTransitionGroup)`
  .${transitionName.enter} {
    opacity: 0.01;
  }
  .${transitionName.enterActive} {
    opacity: 1;
    transition: opacity ${transitionDuration.enter}ms ease;
  }
  .${transitionName.leave} {
    opacity: 1;
  }
  .${transitionName.leaveActive} {
    opacity: 0.01;
    transition: opacity ${transitionDuration.leave}ms ease;
  }
`

class BookmarkList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showConfirmation: false,
      idToBeDeleted: null
    }
    this.loadMoreBookmarks = this.loadMoreBookmarks.bind(this)
    this.handleDeleteButtonClicked = this.handleDeleteButtonClicked.bind(this)
    this.hideComfirmation = this.hideComfirmation.bind(this)
    this.handleDeletingConfirmed = this.handleDeletingConfirmed.bind(this)
    this._defaultBodyOverflow = 'scroll'
  }

  componentDidMount() {
    // Redirect to singin page if user has not been authenticated
    if (!this.props.isAuthed) {
      const currentHref = window.location.href
      return window.location.replace(`${signInHref.protocal}://${signInHref.host}${signInHref.pathname}?${signInHref.searchKeys.destination}=${currentHref}`)
    }
    this._defaultBodyOverflow = _.get(document, 'body.style.overflow', this._defaultBodyOverflow)
    const { bookmarks, jwt, userID, getMultipleBookmarks } = this.props
    const offset = 0
    if (bookmarks.length > 0) return
    getMultipleBookmarks(jwt, userID, offset, defaultLimit, defaultSort)
  }

  loadMoreBookmarks() {
    const { total, bookmarks, jwt, userID, getMultipleBookmarks } = this.props
    const offset = bookmarks.length
    if (offset < total) {
      getMultipleBookmarks(jwt, userID, offset, defaultLimit, defaultSort)
    }
  }

  handleDeleteButtonClicked(bookmarkID) {
    this.setRecordToBeDeleted(bookmarkID)
    this.showConfirmation()
  }

  setRecordToBeDeleted(bookmarkID) {
    this.setState({
      idToBeDeleted: bookmarkID
    })
  }

  deleteSingleBookmark(bookmarkID) {
    const { jwt, userID, deleteSingleBookmark } = this.props
    deleteSingleBookmark(jwt, userID, bookmarkID)
  }

  handleDeletingConfirmed() {
    this.hideComfirmation()
    const { idToBeDeleted } = this.state
    if (typeof idToBeDeleted === 'number') {
      this.props.deleteSingleBookmark(this.state.idToBeDeleted)
    } else {
      console.warn(`Deleting bookmark failed. Bookmark id should be a number, but is ${idToBeDeleted}`) // eslint-disable-line no-console
    }
    this.setRecordToBeDeleted(null)
  }

  hideComfirmation() {
    this.setState({
      showConfirmation: false
    }, () => {
      document.body.style.overflow = this._defaultBodyOverflow
    })
  }

  showConfirmation() {
    this.setState({
      showConfirmation: true
    }, () => {
      document.body.style.overflow = 'hidden'
    })
  }

  render() {
    if (!this.props.isAuthed) return (
      <RedirectToSignIn>
        您尚未登入，將跳轉至登入頁
      </RedirectToSignIn>
    )
    const { bookmarks, total } = this.props
    return (
      <div>
        <Bookmarks
          bookmarkData={bookmarks}
          handleDelete={this.handleDeleteButtonClicked}
          total={total}
        />
        <MoreContainer hasMore={bookmarks.length < total}>
          <More loadMore={this.loadMoreBookmarks}>
            <span >{text.loadMore}</span>
          </More>
        </MoreContainer>
        <StyledTransitionGroup
          transitionName={transitionName}
          transitionEnterTimeout={transitionDuration.enter}
          transitionLeaveTimeout={transitionDuration.leave}
        >
          { this.state.showConfirmation
            ?
            <Confirmation
              onCancel={this.hideComfirmation}
              onConfirm={this.handleDeletingConfirmed}
              content={text.dialog.content}
              confirm={text.dialog.confirm}
              cancel={text.dialog.cancel}
            />
            :
            null
          }
        </StyledTransitionGroup>
      </div>
    )
  }
}


BookmarkList.propTypes = {
  // Props below are provided by redux
  bookmarks: PropTypes.arrayOf(predefinedPropTypes.bookmark).isRequired,
  total: PropTypes.number.isRequired,
  getMultipleBookmarks: PropTypes.func.isRequired,
  deleteSingleBookmark: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  jwt: PropTypes.string.isRequired,
  userID: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
  const bookmarkIDList = _.get(state, [ reduxStatePropKey.bookmarks, 'bookmarkIDList' ], [])
  const bookmarkEntities = _.get(state, [ reduxStatePropKey.bookmarks, 'entities' ], new Map())
  const bookmarks = _.map(bookmarkIDList, id => bookmarkEntities.get(id))
  const total = _.get(state, [ reduxStatePropKey.bookmarks, 'total' ], 0)
  const jwt = _.get(state, [ reduxStatePropKey.auth, 'accessToken' ])
  const userID = _.get(state, [ reduxStatePropKey.auth, 'userInfo', 'user_id' ])
  const isAuthed = _.get(state, [ reduxStatePropKey.auth, 'isAuthed' ])
  return {
    bookmarks,
    isAuthed,
    jwt,
    total,
    userID
  }
}

export default connect(mapStateToProps, { getMultipleBookmarks, deleteSingleBookmark })(BookmarkList)
