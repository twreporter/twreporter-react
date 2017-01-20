'use strict'
import { BRIGHT, SITE_META, SITE_NAME, TOPIC, TOPIC_TEXT } from '../constants/index'
import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/index'
import { fetchArticlesByUuidIfNeeded } from '../actions/articles'
import { setHeaderInfo } from '../actions/header'
import Footer from '../components/Footer'
import Helmet from 'react-helmet'
import React, { Component } from 'react'
import SystemError from '../components/SystemError'
import ArticleList from '../components/ArticleList'

// lodash
import get from 'lodash/get'

const _  = {
  get
}

class Topic extends Component {
  static fetchData({ params, store }) {
    return store.dispatch(fetchArticlesByUuidIfNeeded(params.topicId, TOPIC))
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { fetchArticlesByUuidIfNeeded, params } = this.props
    let topicId = _.get(params, 'topicId')

    this._sendPageLevelAction()
    fetchArticlesByUuidIfNeeded(topicId, TOPIC)
  }

  componentWillReceiveProps(nextProps) {
    const { fetchArticlesByUuidIfNeeded, params } = nextProps
    let topicId = _.get(params, 'topicId')
    fetchArticlesByUuidIfNeeded(topicId, TOPIC)
    this.setState({
      topicId: nextProps.params.topicId
    })
    this._sendPageLevelAction()
  }

  _sendPageLevelAction() {
    const { entities, setHeaderInfo, params } = this.props
    const topicId = _.get(params, 'topicId')
    const topicName = _.get(entities, [ 'topics', topicId, 'name' ], null)

    setHeaderInfo({
      pageTitle: topicName,
      pageTopic: TOPIC_TEXT,
      pageTheme: BRIGHT,
      pageType: TOPIC,
      readPercent: 0
    })
  }

  render() {
    const { device } = this.context
    const { articlesByUuids, entities, params } = this.props
    const topicId = _.get(params, 'topicId')
    const error = _.get(articlesByUuids, [ topicId, 'error' ], null)

    if (error !== null) {
      return (
        <div>
          <SystemError error={error} />
          <Footer />
        </div>
      )
    }

    const topicName = _.get(entities, [ 'topics', topicId, 'name' ], null)
    const topicBox = topicName ? <div className="top-title-outer"><h1 className="top-title"> {topicName} </h1></div> : null
    let articles = denormalizeArticles(_.get(articlesByUuids, [ topicId, 'items' ], []), entities)

    const canonical = `${SITE_META.URL}tag/${topicId}`
    const title = topicName + SITE_NAME.SEPARATOR + SITE_NAME.FULL
    return (
      <div style={{
        backgroundColor: '#FDFFFA'
      }}>
        <Helmet
          title={title}
          link={[
            { rel: 'canonical', href: canonical }
          ]}
          meta={[
            { name: 'description', content: SITE_META.DESC },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: SITE_META.DESC },
            { property: 'og:title', content: title },
            { property: 'og:description', content: SITE_META.DESC },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: canonical }
          ]}
        />
        <div className="container text-center">
          {topicBox}
        </div>
        <ArticleList
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
export default connect(mapStateToProps, { fetchArticlesByUuidIfNeeded, setHeaderInfo })(Topic)
