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
    // Turn the entities.authors in to props [{id:..., authorName:...,...},...]
    let entities = this.props.entities
    function iteratee(id) {
      let authorItemObject = {
        id: id,
        authorName: get(entities, 'authors.'+id+'.name'),
        authorImg: get(entities, 'authors.'+id+'.image', 'http://i.imgur.com/Clyp3sKb.jpg'),
        authorUrl: get(entities, 'authors.'+id+'.links.self.href')
      }
      return authorItemObject
    }
    const authorsArray = _.map(this.props.authorsInList, iteratee)

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
