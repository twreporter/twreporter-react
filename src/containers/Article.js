/* eslint  no-unused-vars:1 */
'use strict'
import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/index'
import { fetchArticleIfNeeded } from '../actions/article'
import * as ArticleComponents from '../components/article/index'
import _ from 'lodash'
import React, { Component } from 'react'
import styles from './Article.scss'

export default class Article extends Component {
  static fetchData({ params, store }) {
    return store.dispatch(fetchArticleIfNeeded(params.slug))
  }
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const slug = this.props.params.slug
    const { fetchArticleIfNeeded, article } = this.props
    if (article.slug !== slug || ( article.isFetching === false && article.error !== null) ) {
      fetchArticleIfNeeded(slug)
    }
  }

  componentWillReceiveProps(nextProps) {
    const slug = nextProps.params.slug
    const { fetchArticleIfNeeded, article } = nextProps
    if (article.slug !== slug || ( article.isFetching === false && article.error !== null) ) {
      fetchArticleIfNeeded(slug)
    }
  }

  _composeAuthors(article) {
    article = article || {}
    let authors = []
    const list = [ 'writters', 'photographers', 'designers', 'engineers' ]
    list.forEach((item) => {
      if (Array.isArray(article[item])) {
        article[item].forEach((author) => {
          // remove 's'. writters -> writter
          author.type = item.slice(0, -1)
          authors.push(author)
        })
      }
    })
    return authors
  }

  _dedup(arr) {
  }

  render() {
    const { article, entities } = this.props
    const { device } = this.context
    let authors = this._composeAuthors(denormalizeArticles(article.slug, entities)[0])
    let deduppedAuthors = _.uniq(authors, 'id')
    return (
      <div className={styles.article}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">.col-md-4</div>
            <div className="col-md-4">.col-md-4</div>
            <div className="col-md-4">.col-md-4</div>
          </div>
        </div>

        <ArticleComponents.HeadingAuthor
          authors={authors}
        />
        <ArticleComponents.Author
          authors={deduppedAuthors}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    article: state.selectedArticle,
    entities: state.entities
  }
}

Article.contextTypes = {
  device: React.PropTypes.string
}

export { Article }
export default connect(mapStateToProps, { fetchArticleIfNeeded })(Article)
