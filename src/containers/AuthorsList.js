'use strict'

import LoadMore from '../components/authors/LoadMore'
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

    // Callback for sensor is triggered
    let handleSeen = (isVisible) => {
      if (this.props.currentPage>1 && isVisible === true) {
        this.props.fetchAuthorsIfNeeded()
      }
      return
    }

    // Page bottom display options
    let bottomDisplay = () => {
      let options = { loadmore: false, sensor: false }
      if (this.props.currentPage <= 1) {
        options.loadmore = true
      }
      if (this.props.currentPage>1 && !this.props.isFinish) {
        options.sensor = true
      }
      return options
    }
    let bottomDisplayOptions = bottomDisplay()
    let isLoading = this.props.isFetching
    return (
      <div className={styles['author-list-container']}>
        <ShownAuthors filteredAuthors={authorsArray} />
        {!bottomDisplayOptions.loadmore ? null:
        <LoadMore isFinish={this.props.isFinish} fetchAuthorsIfNeeded={this.props.fetchAuthorsIfNeeded} />}
        {!isLoading ? null : <div>載入更多作者中…</div>}
        {!bottomDisplayOptions.sensor ? null:
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
