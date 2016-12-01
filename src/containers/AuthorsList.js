'use strict'

import React from 'react'
import ShownAuthors from '../components/authors/ShownAuthors'
import VisibilitySensor from 'react-visibility-sensor'
import { connect } from 'react-redux'
import { fetchAuthorsIfNeeded } from '../actions/authors'
import get from 'lodash/get'
import map from 'lodash/map'
import styles from '../components/authors/AuthorList.scss'
import values from 'lodash/values'
import Sponsor from '../components/Sponsor'
import Footer from '../components/Footer'
import { LOAD_MORE_ARTICLES } from '../constants/index'
import classNames from 'classnames'

const _ = {
  get: get,
  map: map,
  values: values
}

class AuthorsList extends React.Component {
  static fetchData({ store }) {
    return store.dispatch(fetchAuthorsIfNeeded())
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { entities, authorsInList, isFinish, isFetching, currentPage, fetchAuthorsIfNeeded } = this.props // eslint-disable-line no-unused-vars

    //Tran entities.authors to the format: [{ id, authorName, authorImg, authorUrl },{...},...]
    const authorsEntities = entities.authors
    function iteratee(id) {
      const authorName = _.get(authorsEntities, `${id}.name`, '')
      let authorImg = _.get(authorsEntities, `${id}.image`)
      // for some authors' api data 'image' may be null
      authorImg = authorImg ? authorImg : 'http://i.imgur.com/Clyp3sKb.jpg'
      let authorItemObject = {
        id,
        authorName,
        authorImg,
        authorUrl: id ? `author/${id}` : ''
      }
      return authorItemObject
    }
    const authorsArray = _.map(authorsInList, iteratee)

    // Callback for sensor is triggered to seen
    let handleSeen = (isVisible) => {
      if (currentPage>1 && isVisible === true) {
        fetchAuthorsIfNeeded()
      }
      return
    }

    // Page bottom display options

    let loadmoreBtnDisplay = false
    let sensorDisplay = false
    let loaderDisply = false

    loadmoreBtnDisplay = (currentPage <= 1) ? true : false
    sensorDisplay = (currentPage>1 && !isFinish) ? true : false
    loaderDisply = isFetching ? true : false

    // function handleClickLoadmore() {
    //   ReactDOM.findDOMNode(this.bt)
    //   fetchAuthorsIfNeeded()
    // }
    const loadmoreBtn = <div ref={(input)=> this.bt = input} className={classNames(styles['load-more'], 'text-center')} onClick={fetchAuthorsIfNeeded}>{LOAD_MORE_ARTICLES}</div>

    return (
      <div className={styles['author-list-container']}>
        <ShownAuthors filteredAuthors={authorsArray} />
        {!loaderDisply ? null : <div className={styles['loader']}>載入更多作者中…</div>}
        {!loadmoreBtnDisplay ? null : loadmoreBtn}
        {!sensorDisplay ? null :
        <VisibilitySensor onChange={handleSeen} partialVisibility={true}>
          <div className={styles['sensor']}></div>
        </VisibilitySensor>}
      <Sponsor />
      <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    entities: state.entities || {},
    authorsInList: state.authorsList.authorsInList,
    isFinish: state.authorsList.isFinish,
    isFetching: state.authorsList.isFetching,
    currentPage: state.authorsList.currentPage
  }
}

export { AuthorsList }
export default connect(mapStateToProps, { fetchAuthorsIfNeeded })(AuthorsList)
