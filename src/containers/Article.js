/* eslint no-unused-vars:0*/
'use strict'
import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/index'
import { fetchArticleIfNeeded } from '../actions/article'
import { setReadProgress } from '../actions/header'
import * as ArticleComponents from '../components/article/index'
import _ from 'lodash'
import classNames from 'classnames'
import styles from './Article.scss'
import Footer from '../components/Footer'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Article extends Component {
  static fetchData({ params, store }) {
    return store.dispatch(fetchArticleIfNeeded(params.slug))
  }

  constructor(props) {
    super(props)
    this.state = {
      topY: 100,
      bottomY: 200,
      percent: 0
    }

    this._setArticleBounding = this._setArticleBounding.bind(this)
    this._handleScroll = this._handleScroll.bind(this)
  }

  componentDidMount() {
    this._setArticleBounding()
    window.addEventListener('resize', this._setArticleBounding)

    // detect sroll position
    window.addEventListener('scroll', this._handleScroll)
  }

  componentDidUpdate() {
    this._setArticleBounding()
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

  shouldComponentUpdate(nextProps, nextState) { // eslint-disable-line
    if (this.props.selectedArticle.slug === nextProps.selectedArticle.slug) {
      return false
    }
    return true
  }

  _setArticleBounding() {
    const top = ReactDOM.findDOMNode(this.refs.progressBegin).offsetTop
    const bottom = ReactDOM.findDOMNode(this.refs.progressEnding).offsetTop
    if(this.state.topY !== top || this.state.bottomY !== bottom) {
      this.setState({
        topY: top,
        bottomY: bottom
      })
    }
  }

  _handleScroll() {
    const { bottomY, topY, percent } = this.state
    let scrollRatio = Math.abs((window.scrollY-topY) / (bottomY-topY))
    if(window.scrollY < topY) {
      scrollRatio = 0
    } else if (scrollRatio > 1) {
      scrollRatio = 1
    }
    let curPercent = Math.round(scrollRatio*100)
    if(percent!== curPercent) {
      this.setState({ percent: curPercent })
      // update the header progress bar
      this.props.setReadProgress(curPercent)
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

  render() {
    const { selectedArticle, entities } = this.props
    let article = denormalizeArticles(selectedArticle.slug, entities)[0]
    let authors = this._composeAuthors(article)
    let bodyData = _.get(article, [ 'content', 'extended', 'apiData' ], [])
    let deduppedAuthors = _.uniq(authors, 'id')
    let heroImage = _.get(article, [ 'heroImage' ], null)
    let heroImageSize = _.get(article, [ 'heroImageSize' ], 'normal')
    let introData = _.get(article, [ 'content', 'brief', 'apiData' ], [])
    let copyright = _.get(article, [ 'copyright' ], [])
    return (
      <div className={styles.article}>
        <div ref="articleContainer">
          <div className={classNames('row', styles.titleRow, 'outer-max', 'center-block')}>
            <div className="col-md-12 text-center">
              <hgroup>
                <h1>{article.title}</h1>
              </hgroup>
            </div>
          </div>

          <div className="row outer-max center-block">
            <div className="col-md-10 text-left">
              <ArticleComponents.HeadingAuthor
                authors={authors}
              />
            </div>
            <div className="col-md-2 text-right">
              <ArticleComponents.PublishDate
                date={article.publishedDate}
              />
            </div>
            <div ref="progressBegin" className="col-md-12">
              <ArticleComponents.Introduction
                data={introData}
              />
            </div>
          </div>

          <div className="row centrer-block">
            <div className="col-md-12">
              <ArticleComponents.LeadingImage
                size={heroImageSize}
                image={_.get(heroImage, [ 'image', 'resizedTargets' ])}
                id={heroImage.id}
                description={heroImage.description}
              />
            </div>
          </div>

          <div className="row outer-max center-block">
            <div className="col-md-12">
              <ArticleComponents.Body
                data={bodyData}
              />
            </div>
          </div>

          <div className="inner-max center-block">
            <div className="row">
              <div className="col-md-12">
                <ArticleComponents.BottomTags
                  data={article.tags}
                />
              </div>
            </div>
            <ArticleComponents.BottomAuthor
              authors={deduppedAuthors}
            />
          </div>
        </div>

        <Footer
          ref="progressEnding"
          copyright={copyright}/>
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
export default connect(mapStateToProps, { fetchArticleIfNeeded, setReadProgress })(Article)
