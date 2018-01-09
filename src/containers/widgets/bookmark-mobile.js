import { BookmarkWidget } from '@twreporter/registration'
import get from 'lodash/get'
import React from 'react'
import WidgetPrototype from './prototype'

const _ = {
  get
}


class BookmarkIframe extends WidgetPrototype {
  render() {
    const { postMessage } = this.state
    return (
      <BookmarkWidget
        slug={_.get(postMessage, 'bookmarkData.slug', '')}
        bookmarkData={_.get(postMessage, 'bookmarkData', {})}
        svgColor={_.get(postMessage, 'svgColor', '')}
        external
        mobile
      />
    )
  }
}

export default BookmarkIframe
