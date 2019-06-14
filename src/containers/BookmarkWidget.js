import { connect } from 'react-redux'
import BookmarkAddedIconDesktop from '../../static/asset/bookmarks/added-bookmark-desktop.svg'
import BookmarkAddedIconMobile from '../../static/asset/bookmarks/added-bookmark-mobile.svg'
import BookmarkUnaddedIconDesktop from '../../static/asset/bookmarks/add-bookmark-desktop.svg'
import BookmarkUnaddedIconMobile from '../../static/asset/bookmarks/add-bookmark-mobile.svg'
import getSignInHref from '../constants/bookmarks/sign-in-href'
import predefinedPropTypes from '../constants/bookmarks/prop-types'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import twreporterRedux from '@twreporter/redux'
// lodash
import get from 'lodash/get'

const _ = {
  get
}

const { createSingleBookmark, deleteSingleBookmark, getSingleBookmark } = twreporterRedux.actions
const reduxStatePropKey = twreporterRedux.reduxStateFields

const buttonWidth = 52
const buttonHeight = 52

const MobileIconContainer = styled.div`
  position: relative;
  border-radius: 50%;
  width: ${buttonWidth}px;
  height: ${buttonHeight}px;
  background-color: rgba(255, 255, 255, .8);
  overflow: hidden;
  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  cursor: pointer;
`

const BookmarkImg = styled.div`
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 200ms linear;
  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

// Desktop
const DesktopIconContainer = styled.div`
  cursor: pointer;
  display: inline-block;
  width: 20px;
  height: 20px;
  position: relative;
  ${(props) => {
    if (props.svgColor !== '') {
      return `
        path {
          fill: ${props.svgColor};
        }
      `
    }
    return ''
  }};
`

const BookmarkImgDesktop = styled.div`
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 200ms linear;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
`

class BookmarkWidget extends React.PureComponent {
  constructor(props) {
    super(props)
    this.addCurrentPageToBookmarks = this.addCurrentPageToBookmarks.bind(this)
    this.removeCurrentPageFromBookmarks = this.removeCurrentPageFromBookmarks.bind(this)
  }

  componentDidMount() {
    const { bookmark } = this.props
    if (!bookmark || bookmark.slug !== this.getCurrentSlug() || !bookmark.host === this.getCurrentHost()) {
      const { jwt, userID, getSingleBookmark } = this.props
      getSingleBookmark(jwt, userID, this.getCurrentSlug(), this.getCurrentHost())
    }
  }

  getCurrentHost() {
    const hostFromProps = _.get(this.props, 'articleMeta.host')
    if (hostFromProps) return hostFromProps
    if (typeof window !== 'undefined') {
      const location = _.get(window, 'location') || {}
      const { host = '', protocol = '' } = location
      return (host && protocol) ? `${protocol}//${host}` : 'https://www.twreporter.org'
    }
  }

  getCurrentSlug() {
    const slugFromProps = _.get(this.props, 'articleMeta.slug')
    if (slugFromProps) return slugFromProps
    if (typeof window !== 'undefined') {
      const location = _.get(window, 'location') || {}
      const { pathname = '' } = location
      return pathname.match(/(?:\w+-)*\w+$/)[0] || '' // take 'xxx-xxx-xx' from string '/oo-xx/oxox/xxx-xxx-xx'
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

  addCurrentPageToBookmarks() {
    this.checkAuthorization()
    const { jwt, userID, createSingleBookmark, articleMeta } = this.props
    const bookmarkToBeCreated = {
      host: this.getCurrentHost(),
      ...articleMeta
    }
    return createSingleBookmark(jwt, userID, bookmarkToBeCreated)
  }

  removeCurrentPageFromBookmarks() {
    this.checkAuthorization()
    const { jwt, userID, deleteSingleBookmark, articleMeta, bookmark } = this.props
    if (bookmark.slug === this.getCurrentSlug() && bookmark.host === this.getCurrentHost()) {
      return deleteSingleBookmark(jwt, userID, bookmark.id)
    } else {
      // eslint-disable-next-line no-console
      console.error(`Try to delete the bookmark of '${bookmark.slug}' at '${bookmark.host}', but the widget is for '${articleMeta.slug}' at '${articleMeta.host}'`)
    }
  }

  render() {
    const { bookmark, isMobile, svgColor } = this.props
    const isBookmarked = Boolean(bookmark) && (bookmark.slug === this.getCurrentSlug()) && (bookmark.host === this.getCurrentHost())
    return isMobile ? (
      <MobileIconContainer onClick={isBookmarked ? this.removeCurrentPageFromBookmarks : this.addCurrentPageToBookmarks}>
        <BookmarkImg show={!isBookmarked}>
          <BookmarkUnaddedIconMobile />
        </BookmarkImg>
        <BookmarkImg show={isBookmarked}>
          <BookmarkAddedIconMobile />
        </BookmarkImg>
      </MobileIconContainer>
    ) : (
      <DesktopIconContainer onClick={isBookmarked ? this.removeCurrentPageFromBookmarks : this.addCurrentPageToBookmarks} svgColor={svgColor}>
        <BookmarkImgDesktop show={!isBookmarked}>
          <BookmarkUnaddedIconDesktop />
        </BookmarkImgDesktop>
        <BookmarkImgDesktop show={isBookmarked}>
          <BookmarkAddedIconDesktop />
        </BookmarkImgDesktop>
      </DesktopIconContainer>
    )
  }
}

BookmarkWidget.defaultProps = {
  articleMeta: {},
  mobile: false,
  svgColor: ''
}

BookmarkWidget.propTypes = {
  articleMeta: predefinedPropTypes.articleMetaForBookmark.isRequired,
  isMobile: PropTypes.bool,
  svgColor: PropTypes.string,
  // Props below are provided by redux
  bookmark: predefinedPropTypes.bookmark,
  getSingleBookmark: PropTypes.func.isRequired,
  createSingleBookmark: PropTypes.func.isRequired,
  deleteSingleBookmark: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  jwt: PropTypes.string.isRequired,
  userID: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  const jwt = _.get(state, [ reduxStatePropKey.auth, 'accessToken' ])
  const userID = _.get(state, [ reduxStatePropKey.auth, 'userInfo', 'user_id' ])
  const isAuthed = _.get(state, [ reduxStatePropKey.auth, 'isAuthed' ])
  const bookmark = _.get(state, [ reduxStatePropKey.bookmarkWidget, 'bookmark' ])
  return {
    bookmark,
    isAuthed,
    jwt,
    userID
  }
}

export default connect(mapStateToProps, { getSingleBookmark, createSingleBookmark, deleteSingleBookmark })(BookmarkWidget)
