'use strict'
import { TOPIC } from '../constants/index'
import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/index'
import { fetchArticlesByUuidIfNeeded } from '../actions/articles'
import { setPageType } from '../actions/header'
import _ from 'lodash'
import Footer from '../components/Footer'
import React, { Component } from 'react'
import Tags from '../components/Tags'

export default class Topic extends Component {
  static fetchData({ params, store }) {
    return store.dispatch(fetchArticlesByUuidIfNeeded(params.topicId, TOPIC))
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.setPageType(TOPIC)
  }

  componentWillMount() {
    const { fetchArticlesByUuidIfNeeded, params } = this.props
    let topicId = _.get(params, 'topicId')
    fetchArticlesByUuidIfNeeded(topicId, TOPIC)
  }

  componentWillReceiveProps(nextProps) {
    const { fetchArticlesByUuidIfNeeded, params } = nextProps
    let topicId = _.get(params, 'topicId')
    fetchArticlesByUuidIfNeeded(topicId, TOPIC)
  }

  render() {
    const { device } = this.context
    const { articlesByUuids, entities, params } = this.props
    const topicId = _.get(params, 'topicId')
    const topicName = _.get(entities, [ 'topics', topicId, 'name' ], null)
    const topicBox = topicName ? <div className="top-title-outer"><h1 className="top-title"> {topicName} </h1></div> : null

    let articles = denormalizeArticles(_.get(articlesByUuids, [ topicId, 'items' ], []), entities)

    return (
      <div style={{
        backgroundColor: '#FDFFFA'
      }}>
        <div className="container text-center">
          {topicBox}
        </div>
        <Tags
          articles={articles}
          device={device}
          hasMore={false}
        />
        {this.props.children}
        <Footer/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    articlesByUuids: state.articlesByUuids || {},
    entities: state.entities || {}
  }
}

Topic.contextTypes = {
  device: React.PropTypes.string
}

export { Topic }
export default connect(mapStateToProps, { fetchArticlesByUuidIfNeeded, setPageType })(Topic)
