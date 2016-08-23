'use strict'
import { connect } from 'react-redux'
import { SITE_META, SITE_NAME, SEARCH_RESULTS_TEXT } from '../constants/index'
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
  render() {
    const meta = {
      title: SITE_NAME.SEPARATOR + SITE_NAME.FUL,
      description: SITE_META.DESC,
      canonical: `${SITE_META.URL}search/`,
      meta: { property: {} },
      auto: { ograph: true }
    }

    return (
      <DocumentMeta {...meta}>
        <div className={styles['container']}>
          <div className="container text-center">
            <div className="top-title-outer">
              <h1 className="top-title">
                { SEARCH_RESULTS_TEXT }
              </h1>
            </div>
          </div>
        </div>
        <Footer/>
      </DocumentMeta>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

export { Search }
export default connect(mapStateToProps, { })(Search)
