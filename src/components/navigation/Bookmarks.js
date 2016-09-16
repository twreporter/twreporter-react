'use strict'
import { Link } from 'react-router'
import _ from 'lodash'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'
import styles from './Bookmarks.scss'

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
    const { bookmark, isSelected, slug } = this.props
    let classNames = {
      [styles.selected]: isSelected
    }

    return (
      <li ref="bookmarkRef" className={cx(styles.bookmark, classNames)}>
        <Link to={`/a/${slug}`}>
          <span>{ bookmark }</span>
        </Link>
      </li>
    )
  }
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
    let bookmarksNode = ReactDOM.findDOMNode(this.refs.boomarksRef)
    this.setState({
      containerWidth: bookmarksNode.offsetWidth,
      bookmarksWidth: this._calculateTotalWidth()
    })
  }

  componentDidUpdate() {
    //
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
    let bookmarksLength = _.get(this.props, [ 'bookmarks', 'length' ], 0)
    for (let i = 0; i < bookmarksLength; i++) {
      let bookmarkNode = ReactDOM.findDOMNode(this.refs[`bookmarkRef-${i}`])
      let width = _.get(bookmarkNode, 'offsetWidth', 0)
      totalWidth += width
    }
    return totalWidth
  }

  render() {
    const { bookmarks } = this.props
    const { containerWidth, bookmarksWidth } = this.state
    let _Bookmarks = _.map(bookmarks, (ele, index) => {
      return (
        <Bookmark
          ref={`bookmarkRef-${index}`}
          key={index}
          changeSelectedBookmarkOffsetLeft={this.changeSelectedBookmarkOffsetLeft}
          {...ele}
        />
      )
    })

    let classNames = {
      [styles['flex-center']]: containerWidth > bookmarksWidth
    }
    return (
      <div ref="boomarksRef" className={styles['bookmarks-container']} id="bookmarksForLongformArtilce">
        <ul className={cx(styles.bookmarks, classNames)}>
          {_Bookmarks}
        </ul>
      </div>
    )
  }
}
