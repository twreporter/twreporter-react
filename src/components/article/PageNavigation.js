'use strict'
import Link from 'react-router/lib/Link'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './PageNavigation.scss'
import { LINK_PREFIX, INTERACTIVE_ARTICLE_STYLE } from '../../constants/index'

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
    const containerHeight = get(this.container, 'clientHeight', 75)
    const thumbWidth = get(this.thumb, 'width', 0)
    const titleNode = this.title
    if (!titleNode) {
      return
    }
    const { clientWidth, clientHeight, innerText } = titleNode
    if (!innerText) {
      return
    }
    if (clientHeight > containerHeight) {
      const wordArea = Math.floor(clientHeight * clientWidth / innerText.length)
      // 0.67, which means we only want to use 2/3 area to display.
      // Otherwise, the text may overflow due to padding or margin.
      const words = Math.floor((clientWidth - thumbWidth) * (containerHeight * 0.67 ) / wordArea)
      titleNode.innerText = innerText.slice(0, words) + '...'
    }
  }

  _renderArticle(article) {
    let imgUrl = get(article, [ 'heroImage',  'resizeTargets', 'mobile', 'url' ], null)
    let title = get(article, 'title', get(article, 'og_title'))

    return (
      <article className={classNames(styles['article'], imgUrl ? '' : styles['no-thumbnail'], 'clearfix')}>
        { imgUrl ?
          <div className={styles['thumbnail']}>
            <img ref={img => {this.thumb = img}} src={ imgUrl } width={ 65 } height={ 65 } />
          </div>
          : null
        }
        <div className={styles['title']}>
          <h3 ref={h3 => {this.title = h3}} title={ title }>
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

    const style = get(article, 'style')

    let link = style === INTERACTIVE_ARTICLE_STYLE ? LINK_PREFIX.INTERACTIVE_ARTICLE + slug : LINK_PREFIX.ARTICLE + slug
    return (
      <nav ref={nav => {this.container = nav}} className={classNames(styles['aside-page-navigation'], styles[navigate])}>
        <Link to={link} target={style === INTERACTIVE_ARTICLE_STYLE ? '_blank' : undefined}>
          {this._renderArticle(article)}
          {this._renderArrow(navigate)}
        </Link>
      </nav>
    )
  }
}

PageNavigation.propTypes = {
  navigate: PropTypes.string,
  article: PropTypes.object
}

PageNavigation.defaultProps = {
  navigate: 'next',
  article: {}
}

export { PageNavigation }
