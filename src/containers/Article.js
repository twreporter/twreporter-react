/* eslint  no-unused-vars:1 */
'use strict'
import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/index'
import { fetchArticleIfNeeded } from '../actions/article'
import * as ArticleComponents from '../components/article/index'
import _ from 'lodash'
import Footer from '../components/Footer'
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
    const { fetchArticleIfNeeded, selectedArticle } = this.props
    if (selectedArticle.slug !== slug || ( selectedArticle.isFetching === false && selectedArticle.error !== null) ) {
      fetchArticleIfNeeded(slug)
    }
  }

  componentWillReceiveProps(nextProps) {
    const slug = nextProps.params.slug
    const { fetchArticleIfNeeded, selectedArticle } = nextProps
    if (selectedArticle.slug !== slug || ( selectedArticle.isFetching === false && selectedArticle.error !== null) ) {
      fetchArticleIfNeeded(slug)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.selectedArticle.slug === nextProps.selectedArticle.slug) {
      return false
    }
    return true
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

  render() {
    const { selectedArticle, entities } = this.props
    const { device } = this.context
    let article = denormalizeArticles(selectedArticle.slug, entities)[0]
    let authors = this._composeAuthors(article)
    let deduppedAuthors = _.uniq(authors, 'id')
    return (
      <div className={styles.article}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <ArticleComponents.HeadingAuthor
                authors={authors}
                publishedDate={new Date(article.publishedDate)}
              />
            </div>
          </div>

          <ArticleComponents.BottomAuthor
            authors={deduppedAuthors}
          />
        </div>

        <Footer/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedArticle: state.selectedArticle,
    entities: state.entities
  }
}

Article.contextTypes = {
  device: React.PropTypes.string
}

export { Article }
export default connect(mapStateToProps, { fetchArticleIfNeeded })(Article)
