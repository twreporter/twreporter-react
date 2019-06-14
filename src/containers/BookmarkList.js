import { connect } from 'react-redux'
import Bookmarks from '../components/bookmark-list'
import Confirmation from '@twreporter/react-components/lib/confirmation'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import getSignInHref from '../constants/bookmarks/sign-in-href'
import More from '../components/More'
import predefinedPropTypes from '../constants/bookmarks/prop-types'
import PropTypes from 'prop-types'
import React from 'react'
import RedirectToSignIn from '../components/bookmark-list/RedirectToSignIn'
import styled from 'styled-components'
import twreporterRedux from '@twreporter/redux'
// lodash
import findIndex from 'lodash/findIndex'
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  findIndex,
  get,
  map
}

const { deleteSingleBookmark, getMultipleBookmarks } = twreporterRedux.actions
const reduxStatePropKey = twreporterRedux.reduxStateFields

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
    this.checkAuthorization()
    this._defaultBodyOverflow = _.get(document, 'body.style.overflow', this._defaultBodyOverflow)
    const { bookmarks } = this.props
    if (!bookmarks.length) {
      const { jwt, userID, getMultipleBookmarks } = this.props
      const offset = 0
      getMultipleBookmarks(jwt, userID, offset, defaultLimit, defaultSort)
    }
  }

  // Redirect to singin page if user has not been authorized
  checkAuthorization() {
    const { isAuthed, jwt } = this.props
    if (!isAuthed || !jwt) {
      const currentHref = typeof window === 'undefined' ? '' : window.location.href
      window.location.href = getSignInHref(currentHref)
    }
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

  handleDeletingConfirmed() {
    this.hideComfirmation()
    const { idToBeDeleted } = this.state
    if (typeof idToBeDeleted === 'number') {
      const { jwt, userID, deleteSingleBookmark } = this.props
      deleteSingleBookmark(jwt, userID, idToBeDeleted)
    } else {
      console.error(`Deleting bookmark failed. Bookmark id should be a number, but is ${idToBeDeleted}`) // eslint-disable-line no-console
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
    const { isAuthed, jwt } = this.props
    if (!isAuthed || !jwt) return (
      <RedirectToSignIn>
        您尚未登入，將跳轉至登入頁
      </RedirectToSignIn>
    )
    const { bookmarks, total } = this.props
    return (
      <div>
        <Bookmarks
          bookmarks={bookmarks}
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
  const bookmarkEntities = _.get(state, [ reduxStatePropKey.bookmarks, 'entities' ], {})
  const bookmarks = _.map(bookmarkIDList, id => _.get(bookmarkEntities, id))
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
