'use strict'
import { INTERACTIVE_ARTICLE_STYLE } from '../../constants/index'
import classNames from 'classnames'
import styles from './PageNavigation.scss'
import { Link } from 'react-router'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// lodash
import get from 'lodash/get'

class PageNavigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      article: props.article
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      article: nextProps.article
    })
  }

  componentDidMount() {
    this._handleTitleTextOverflow()
  }

  componentWillUpdate() {
    this._handleTitleTextOverflow()
  }

  _handleTitleTextOverflow() {
    let containerHeight = get(ReactDOM.findDOMNode(this.refs.container), 'clientHeight', 75)
    let thumbWidth = get(ReactDOM.findDOMNode(this.refs.thumb), 'width', 0)
    let titleNode = ReactDOM.findDOMNode(this.refs.title)
    if (!titleNode) {
      return
    }
    let { clientWidth, clientHeight, innerText } = titleNode
    if (!innerText) {
      return
    }
    if (clientHeight > containerHeight) {
      let wordArea = Math.floor(clientHeight * clientWidth / innerText.length)
      // 0.67, which means we only want to use 2/3 area to display.
      // Otherwise, the text may overflow due to padding or margin.
      let words = Math.floor((clientWidth - thumbWidth) * (containerHeight * 0.67 ) / wordArea)
      titleNode.innerText = innerText.slice(0, words) + '...'
    }
  }

  _renderArticle(article) {
    let imgUrl = get(article, [ 'heroImage', 'image', 'resizeTargets', 'mobile', 'url' ], null)
    let title = get(article, 'title', get(article, 'og_title'))

    return (
      <article className={classNames(styles['article'], imgUrl ? '' : styles['no-thumbnail'], 'clearfix')}>
        { imgUrl ?
          <div className={styles['thumbnail']}>
            <img ref="thumb" src={ imgUrl } width={ 65 } height={ 65 } />
          </div>
          : null
        }
        <div className={styles['title']}>
          <h3 ref="title" title={ title }>
            {title}
          </h3>
        </div>
      </article>
    )
  }

  _renderArrow(navigate) {
    let direction = navigate === 'next' ? 'arrow-right' : 'arrow-left'
    return (
      <div className={ classNames(styles['arrow'], styles[direction]) } />
    )
  }

  render() {
    const { navigate } = this.props
    const { article } = this.state
    let slug = get(article, 'slug')
    if (!slug) {
      return null
    }

    let link = '/a/' + get(article, 'slug', '')

    return (
      <nav ref="container" className={classNames(styles['aside-page-navigation'], styles[navigate])}>
        <Link to={link} target={get(article, 'style') === INTERACTIVE_ARTICLE_STYLE ? '_self' : undefined}>
          {this._renderArticle(article)}
          {this._renderArrow(navigate)}
        </Link>
      </nav>
    )
  }
}

PageNavigation.propTypes = {
  navigate: React.PropTypes.string,
  article: React.PropTypes.object
}

PageNavigation.defaultProps = {
  navigate: 'next',
  article: {}
}

export { PageNavigation }
