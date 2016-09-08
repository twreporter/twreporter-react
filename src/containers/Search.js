'use strict'
import { connect } from 'react-redux'
import { SITE_META, SITE_NAME, SEARCH_RESULTS_TEXT } from '../constants/index'
import { googleSearchId } from '../conf/service'
import DocumentMeta from 'react-document-meta'
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
    const meta = {
      title: SEARCH_RESULTS_TEXT + SITE_NAME.SEPARATOR + SITE_NAME.FULL,
      description: SITE_META.DESC,
      canonical: `${SITE_META.URL}search/`,
      meta: { property: {} },
      auto: { ograph: true }
    }

    return (
      <DocumentMeta {...meta}>
        <div className={styles['container']}>
          <div className="container">
            <div className="top-title-outer text-center">
              <h1 className="top-title">
                { SEARCH_RESULTS_TEXT }
              </h1>
            </div>
            <div dangerouslySetInnerHTML={{ __html: '<gcse:searchbox-only></gcse:searchbox-only>' }} />
            <div dangerouslySetInnerHTML={{ __html: '<gcse:searchresults-only></gcse:searchresults-only>' }} />
          </div>
        </div>
        <Footer/>
      </DocumentMeta>
    )
  }
}

export { Search }
export default connect()(Search)
