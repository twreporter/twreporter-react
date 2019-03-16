'use strict'
import React, { Component } from 'react'
import styles from './Search.scss'
import { googleSearchId } from '../conf/service'

class Search extends Component {
  componentDidMount() {
    // display search results
    let cx = googleSearchId
    let gcse = document.createElement('script')
    gcse.type = 'text/javascript'
    gcse.async = true
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx
    let s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(gcse, s)
  }

  render() {
    return (
      <div>
        <div className={styles['container']}>
          <div className="container">
            <div dangerouslySetInnerHTML={{ __html: '<gcse:searchbox-only></gcse:searchbox-only>' }} />
            <div dangerouslySetInnerHTML={{ __html: '<gcse:searchresults-only></gcse:searchresults-only>' }} />
          </div>
        </div>
      </div>
    )
  }
}

export { Search }
export default Search
