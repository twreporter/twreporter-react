'use strict'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'
import leftNav from '../../../static/asset/disabled-left-arrow.svg'
import rightNav from '../../../static/asset/disabled-right-arrow.svg'
import styles from './Bookmarks.scss'

// lodash
import get from 'lodash/get'
import map from 'lodash/map'

import { Link } from 'react-router'
import { LINK_PREFIX, INTERACTIVE_ARTICLE_STYLE } from '../../constants/index'

const RIGHT = 'right'
const LEFT = 'left'
const DISTANCE_PER_SCROLL = 50

class Bookmark extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { changeSelectedBookmarkOffsetLeft, isSelected } = this.props
    let bookmarkNode = ReactDOM.findDOMNode(this.refs.bookmarkRef)
    if (isSelected) {
      changeSelectedBookmarkOffsetLeft(bookmarkNode.offsetLeft)
    }
  }

  render() {
    const { bookmark, isSelected, slug, style } = this.props
    const path = style === INTERACTIVE_ARTICLE_STYLE ? LINK_PREFIX.INTERACTIVE_ARTICLE + slug : LINK_PREFIX.ARTICLE + slug
    let classNames = {
      [styles.selected]: isSelected
    }

    return (
      <li ref="bookmarkRef" className={cx(styles.bookmark, classNames)}>
        <Link to={path} target={style === INTERACTIVE_ARTICLE_STYLE ? '_blank' : undefined}>
          <span>{bookmark}</span>
        </Link>
      </li>
    )
  }
}

Bookmark.propTypes = {
  bookmark: React.PropTypes.string.isRequired,
  isSelected: React.PropTypes.bool,
  slug: React.PropTypes.string.isRequired
}

Bookmark.defaultProps = {
  isSelected: false
}

export default class Bookmarks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookmarksWidth : 0,
      containerWidth: 0,
      selectedBookmarkOffsetLeft: 0
    }
    this.changeSelectedBookmarkOffsetLeft = this._changeSelectedBookmarkOffsetLeft.bind(this)
  }

  componentDidMount() {
    let bookmarksNode = ReactDOM.findDOMNode(this.refs.bookmarksRef)
    this.setState({
      containerWidth: bookmarksNode.offsetWidth,
      bookmarksWidth: this._calculateTotalWidth()
    })
  }

  componentDidUpdate() {
    let node = document.getElementById('bookmarksForLongformArtilce')
    node.scrollLeft = this._calculateScrollLeft()
  }

  _changeSelectedBookmarkOffsetLeft(offsetLeft) {
    this.setState({
      selectedBookmarkOffsetLeft: offsetLeft
    })
  }

  _calculateScrollLeft() {
    const { containerWidth, selectedBookmarkOffsetLeft } = this.state
    if (selectedBookmarkOffsetLeft > (containerWidth / 2)) {
      return  selectedBookmarkOffsetLeft - (containerWidth / 2)
    }
    return 0
  }

  _calculateTotalWidth() {
    let totalWidth = 0
    let bookmarksLength = get(this.props, [ 'bookmarks', 'length' ], 0)
    for (let i = 0; i < bookmarksLength; i++) {
      let bookmarkNode = ReactDOM.findDOMNode(this.refs[`bookmarkRef-${i}`])
      let width = get(bookmarkNode, 'offsetWidth', 0)
      totalWidth += width
    }
    return totalWidth
  }

  _handleNavClick(direction, event) { //eslint-disable-line
    let node = document.getElementById('bookmarksForLongformArtilce')
    let scrollLeft = node.scrollLeft
    if (direction === LEFT) {
      if (scrollLeft !== 0) {
        let scrollDelta = scrollLeft - DISTANCE_PER_SCROLL
        node.scrollLeft = scrollDelta < 0 ? 0 : scrollDelta
      }
    } else if (direction === RIGHT) {
      node.scrollLeft = scrollLeft + DISTANCE_PER_SCROLL
    }
  }

  render() {
    const { bookmarks } = this.props
    let _Bookmarks = map(bookmarks, (ele, index) => {
      const { ...rest } = ele
      return (
        <Bookmark
          ref={`bookmarkRef-${index}`}
          key={index}
          changeSelectedBookmarkOffsetLeft={this.changeSelectedBookmarkOffsetLeft}
          {...rest}
        />
      )
    })

    // this is used for caculating the offsetLeft of the current bookmark
    let style = {
      position: 'relative'
    }

    return (
      <div className={styles['bookmarks-container']}>
        <img
          className={cx(styles['left-nav'], 'hidden-sm', 'hidden-xs')}
          onClick={this._handleNavClick.bind(this, LEFT)}
          src={leftNav}
        />
        <ul ref="bookmarksRef" className={cx(styles.bookmarks)} id="bookmarksForLongformArtilce" style={style}>
          {_Bookmarks}
        </ul>
        <img
          className={cx(styles['right-nav'], 'hidden-sm', 'hidden-xs')}
          onClick={this._handleNavClick.bind(this, RIGHT)}
          src={rightNav}
        />
      </div>
    )
  }
}

Bookmarks.propTypes = {
  bookmarks: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      bookmark: React.PropTypes.string.isRequired,
      bookmarkOrder: React.PropTypes.number,
      publishedDate: React.PropTypes.string,
      isSelected: React.PropTypes.bool,
      slug: React.PropTypes.string.isRequired,
      style: React.PropTypes.string.isRequired
    })
  ).isRequired
}
