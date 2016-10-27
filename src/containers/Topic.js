'use strict'
import {  SITE_META, SITE_NAME, TOPIC, TOPIC_TEXT } from '../constants/index'
import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/index'
import { fetchArticlesByUuidIfNeeded } from '../actions/articles'
import { setPageType, setPageTitle } from '../actions/header'
import DocumentMeta from 'react-document-meta'
import Footer from '../components/Footer'
import React, { Component } from 'react'
import Tags from '../components/Tags'

// lodash
import get from 'lodash/get'

class Topic extends Component {
  static fetchData({ params, store }) {
    return store.dispatch(fetchArticlesByUuidIfNeeded(params.topicId, TOPIC))
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.setPageType(TOPIC)
    this._sendPageLevelAction()
  }

  componentDidUpdate() {
    this._sendPageLevelAction()
  }

  componentWillMount() {
    const { fetchArticlesByUuidIfNeeded, params } = this.props
    let topicId = get(params, 'topicId')
    fetchArticlesByUuidIfNeeded(topicId, TOPIC)
  }

  componentWillReceiveProps(nextProps) {
    const { fetchArticlesByUuidIfNeeded, params } = nextProps
    let topicId = get(params, 'topicId')
    fetchArticlesByUuidIfNeeded(topicId, TOPIC)
    this.setState({
      topicId: nextProps.params.topicId
    })
    this._sendPageLevelAction()
  }

  _sendPageLevelAction() {
    const { entities, setPageTitle, params } = this.props
    const topicId = get(params, 'topicId')
    const topicName = get(entities, [ 'topics', topicId, 'name' ], null)

    // set navbar title for this topic
    setPageTitle(null, topicName, TOPIC_TEXT)
  }

  render() {
    const { device } = this.context
    const { articlesByUuids, entities, params } = this.props
    const topicId = get(params, 'topicId')
    const topicName = get(entities, [ 'topics', topicId, 'name' ], null)
    const topicBox = topicName ? <div className="top-title-outer"><h1 className="top-title"> {topicName} </h1></div> : null
    let articles = denormalizeArticles(get(articlesByUuids, [ topicId, 'items' ], []), entities)

    const meta = {
      title: topicName ? topicName + SITE_NAME.SEPARATOR + SITE_NAME.FULL : SITE_NAME.FULL,
      description: SITE_META.DESC,
      canonical: `${SITE_META.URL}topic/${topicId}`,
      meta: { property: {} },
      auto: { ograph: true }
    }

    return (
      <DocumentMeta {...meta}>
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
      </DocumentMeta>
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
export default connect(mapStateToProps, { fetchArticlesByUuidIfNeeded, setPageType, setPageTitle })(Topic)
