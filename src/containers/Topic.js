'use strict'
import { TOPIC } from '../constants/index'
import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/index'
import { fetchArticlesByUuidIfNeeded } from '../actions/articles'
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
    this.state = {
      topicId: props.params.topicId
    }
  }

  componentWillMount() {
    const { fetchArticlesByUuidIfNeeded } = this.props
    let topicId = this.state.topicId
    fetchArticlesByUuidIfNeeded(topicId, TOPIC)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      topicId: nextProps.params.topicId
    })
  }

  render() {
    const { device } = this.context
    const { topicId } = this.state
    const { articlesByUuids, entities } = this.props
    let articles = denormalizeArticles(_.get(articlesByUuids, [ topicId, 'items' ], []), entities)

    return (
      <div style={{
        backgroundColor: '#FDFFFA'
      }}>
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
export default connect(mapStateToProps, { fetchArticlesByUuidIfNeeded })(Topic)
