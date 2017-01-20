'use strict'
import { connect } from 'react-redux'
import { googleSearchId } from '../conf/service'
import Footer from '../components/Footer'
import React, { Component } from 'react'
import styles from './Search.scss'

class Search extends Component {
  static fetchData() {
    return new Promise((resolve) => {
      resolve()
    })
  }

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
        <Footer/>
      </div>
    )
  }
}

export { Search }
export default connect()(Search)
