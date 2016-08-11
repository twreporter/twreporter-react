/* eslint no-unused-vars:0*/
'use strict'
import { connect } from 'react-redux'
import { denormalizeArticles, getAbsPath } from '../utils/index'
import { fetchArticleIfNeeded } from '../actions/article'
import { fetchArticlesByUuidIfNeeded, fetchRelatedArticlesIfNeeded } from '../actions/articles'
import { setReadProgress, setPageType, setPageTitle, setArticleTopicList } from '../actions/header'
import { ARTICLE, SITE_NAME, TOPIC, appId } from '../constants/index'
import _ from 'lodash'
import * as ArticleComponents from '../components/article/index'
import Footer from '../components/Footer'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import commonStyles from '../components/article/Common.scss'
import DocumentTitle from 'react-document-title'
import fbIcon from '../../static/asset/fb.svg'
import lineIcon from '../../static/asset/line.svg'
import styles from './Article.scss'
import twitterIcon from '../../static/asset/twitter.svg'

let articlePostition = {
  beginY: 120,
  endY: 200,
  percent: 0
}

class Article extends Component {
  static fetchData({ params, store }) {
    return store.dispatch(fetchArticleIfNeeded(params.slug))
  }

  constructor(props) {
    super(props)

    this.state = {
      articleId: null,
      topicId: null,
      topicName: null,
      topicArr: null
    }
    this._setArticleBounding = this._setArticleBounding.bind(this)
    this._handleScroll = this._handleScroll.bind(this)
  }

  componentDidMount() {
    this.props.setPageType(ARTICLE)
    this._setArticleBounding()
    window.addEventListener('resize', this._setArticleBounding)

    // detect sroll position
    window.addEventListener('scroll', this._handleScroll)
  }

  componentDidUpdate() {
    this._setArticleBounding()

    const { fetchRelatedArticlesIfNeeded, setPageTitle, selectedArticle, entities } = this.props

    const { topicId, articleId } = this.state
    if (!selectedArticle.error && !selectedArticle.isFetching &&
        articleId !== selectedArticle.id ) {

      // set article ID
      this.setState({ articleId: selectedArticle.id })

      // set topic
      let topicName = topicId ? _.get(entities, [ 'topics', topicId, 'name' ], null) : null
      this.setState({ topicName: topicName })

      // set navbar title for this article
      setPageTitle(selectedArticle.id, _.get(entities, [ 'articles', selectedArticle.id, 'title' ], ''), topicName)
      // fetch related articles
      let relatedIds = _.get(entities, [ 'articles', selectedArticle.id, 'relateds' ], [])
      fetchRelatedArticlesIfNeeded(selectedArticle.id, relatedIds)
    }
  }

  componentWillMount() {
    const slug = this.props.params.slug
    const { fetchArticleIfNeeded, fetchArticlesByUuidIfNeeded, fetchRelatedArticlesIfNeeded,  selectedArticle, entities } = this.props
    if (selectedArticle.slug !== slug || ( selectedArticle.isFetching === false && selectedArticle.error !== null) ) {
      fetchArticleIfNeeded(slug)
    }

    // fetch other aritcles in the same topic
    let topicId = _.get(entities, [ 'articles', selectedArticle.id, 'topics' ])
    if (topicId) {
      this.setState({ topicId: topicId })
      fetchArticlesByUuidIfNeeded(topicId, TOPIC)
    }

    // fetch related articles
    let relatedIds = _.get(entities, [ 'articles', selectedArticle.id, 'relateds' ], [])
    fetchRelatedArticlesIfNeeded(selectedArticle.id, relatedIds)
  }

  componentWillReceiveProps(nextProps) {
    const slug = nextProps.params.slug
    const { fetchArticleIfNeeded, selectedArticle, entities } = nextProps
    const { setArticleTopicList } = this.props
    const { topicId, topicArr } = this.state
    if (selectedArticle.slug !== slug || ( selectedArticle.isFetching === false && selectedArticle.error !== null) ) {
      fetchArticleIfNeeded(slug)
    }

    let tArr = []
    if(topicId) {
      _.forEach(entities.articles, function (value, key) {
        if(_.get(value, 'topics') === topicId) {
          tArr.push(value)
        }
      })

      this.setState({ topicArr: tArr })
      setArticleTopicList(tArr)  // dispatch action for the navbar to display article list
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._setArticleBounding)
    window.removeEventListener('scroll', this._handleScroll)
  }

  _getCumulativeOffset(element) {
    let top = 0
    do {
      top += element.offsetTop  || 0
      element = element.offsetParent
    } while(element)

    return top
  }

  _setArticleBounding() {
    const beginEl = ReactDOM.findDOMNode(this.refs.progressBegin)
    const endEl = ReactDOM.findDOMNode(this.refs.progressEnding)
    articlePostition.beginY = beginEl.offsetTop
    articlePostition.endY = endEl.offsetTop
  }

  _handleScroll() {
    const { beginY, endY, percent } = articlePostition
    let scrollRatio = Math.abs((window.scrollY-beginY) / (endY-beginY))
    if(window.scrollY < beginY) {
      scrollRatio = 0
    } else if (scrollRatio > 1) {
      scrollRatio = 1
    }
    let curPercent = Math.round(scrollRatio*100)
    if(percent!== curPercent) {
      articlePostition.percent = curPercent
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
          let type = item.slice(0, -1)
          authors.push(_.merge({}, author, { type: type }))
        })
      }
    })
    return authors
  }

  render() {
    const { entities, selectedArticle } = this.props
    const { topicId, topicName, topicArr } = this.state
    let article = denormalizeArticles(selectedArticle.id, entities)[0]
    let authors = this._composeAuthors(article)
    let bodyData = _.get(article, [ 'content', 'apiData' ], [])
    let heroImage = _.get(article, [ 'heroImage' ], null)
    let heroImageSize = _.get(article, [ 'heroImageSize' ], 'normal')
    let introData = _.get(article, [ 'brief', 'apiData' ], [])
    let copyright = _.get(article, [ 'copyright' ], [])
    const cUrl = getAbsPath(this.context.location.pathname, this.context.location.search)

    let topicBox = topicName ? <h3 className={commonStyles['topic-box']}>{topicName}</h3> : null

    return (
      <DocumentTitle title={_.get(article, 'title', '')+SITE_NAME.SEPARATOR+SITE_NAME.SHORT}>
        <div>
          <div className={styles['article-container']}>
            <div className={classNames(styles['title-row'], commonStyles['inner-block'])}>
              <hgroup>
                {topicBox}
                <h1>{article.title}</h1>
              </hgroup>
            </div>

            <div ref="progressBegin" className={classNames(styles['article-meta'], commonStyles['inner-block'])}>
              <ArticleComponents.HeadingAuthor
                authors={authors}
                extendByline={_.get(article, 'extendByline')}
              >
                <ArticleComponents.PublishDate
                  date={article.publishedDate}
                />
              </ArticleComponents.HeadingAuthor>
              <ArticleComponents.ShareBt
                appId={appId}
                url={cUrl}
                title={article.title}
                fbIcon={fbIcon}
                twitterIcon={twitterIcon}
                lineIcon={lineIcon}
              />
            </div>

            <div className={styles['leading-img']}>
              <ArticleComponents.LeadingImage
                size={heroImageSize}
                image={_.get(heroImage, [ 'image', 'resizedTargets' ])}
                id={_.get(heroImage, 'id')}
                description={_.get(heroImage, 'description' )}
              />
            </div>

            <div className={classNames(styles.introduction, commonStyles['inner-block'])}>
              <ArticleComponents.Introduction
                data={introData}
              />
            </div>

            <ArticleComponents.Body
              data={bodyData}
            />

            <div ref="progressEnding"
                className={classNames('inner-max', 'center-block', commonStyles['components'])}>
              <div className={classNames('inner-max', commonStyles['component'])}>
                <ArticleComponents.BottomTags
                  data={article.tags}
                />
              </div>
              <ArticleComponents.BottomRelateds
                relateds={article.relateds}
                currentId={article.id}
                topicName={topicName}
                topicArr={topicArr}
              />
            </div>
          </div>
          {/*<ArticleComponents.PageNavigation
            article={ _.get(article, [ 'relateds', 0 ])}
            navigate="next"
          />
          <ArticleComponents.PageNavigation
            article={_.get(article, [ 'relateds', 1 ])}
            navigate="previous"
          />*/}
          <Footer
            copyright={copyright}/>
        </div>
      </DocumentTitle>
    )
  }
}

function mapStateToProps(state) {
  return {
    entities: state.entities,
    selectedArticle: state.selectedArticle
  }
}

Article.contextTypes = {
  device: React.PropTypes.string,
  location: React.PropTypes.object
}

export { Article }
export default connect(mapStateToProps, { fetchArticleIfNeeded, fetchRelatedArticlesIfNeeded,
  fetchArticlesByUuidIfNeeded, setReadProgress, setPageType, setPageTitle, setArticleTopicList })(Article)
