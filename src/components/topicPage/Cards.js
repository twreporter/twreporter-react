'use strict'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import get from 'lodash/get'
import map from 'lodash/map'
import partial from 'lodash/partial'
import { addClassNameWithThemePostfix, replaceStorageUrlPrefix, shortenString, date2yyyymmdd } from '../../utils/index'
import { CHARACTERS_LIMIT, LINK_PREFIX, INTERACTIVE_ARTICLE_STYLE, TOPIC_LOAD_MORE_ARTICLES, TOPIC_ITEMS_LIMIT } from '../../constants/index'
import styles from './Cards.scss'
import commonStyles from '../article/Common.scss'

const _ = {
  get,
  map,
  partial
}


class Cards extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isCollapse: false
    }
  }
  render() {
    const { items, cardsTheme, containerBgColor } = this.props
    const { isCollapse } = this.state

    /* _cn - className */
    const _addCnCardsthemepostfix = _.partial(addClassNameWithThemePostfix, styles, cardsTheme)
    const _cnCardsContainer = _addCnCardsthemepostfix('cards-container')
    const _cnCardsFlexContainer = _addCnCardsthemepostfix('cards-flex-container')
    const _cnCard = _addCnCardsthemepostfix('card')
    const _cnImageCard = _addCnCardsthemepostfix('image-card')
    const _cnTextCard = _addCnCardsthemepostfix('text-card')
    // const _cnCardTitle = _addCnCardsthemepostfix('card-title')
    // const _cnCardDescription = _addCnCardsthemepostfix('card-description')
    // const _cnCardDate = _addCnCardsthemepostfix('card-date')

    const relatedArticlesJSX = _.map(items, (article, index) => {
      const imageUrl = replaceStorageUrlPrefix(get(article, 'heroImage.image.resizedTargets.mobile.url', '/asset/review.png'))
      const slug = get(article, 'slug', '')
      const title = get(article, 'title', '')
      const publishedDate = date2yyyymmdd(get(article, 'publishedDate', ''), '.')
      const description = shortenString(get(article, 'ogDescription', ''), CHARACTERS_LIMIT.BOTTOM_RELATED_DESC)
      const itemDisplayClass = (index >= TOPIC_ITEMS_LIMIT && !isCollapse)? commonStyles['hide'] : null

      const style = _.get(article, 'style')
      let prefix = LINK_PREFIX.ARTICLE
      let target = undefined
      if (style === INTERACTIVE_ARTICLE_STYLE) {
        prefix = LINK_PREFIX.INTERACTIVE_ARTICLE
        target = '_blank'
      }
      
      return (
        <div key={index++} className={classNames(_cnCard, itemDisplayClass)}>
          <Link to={prefix + slug} target={target}>
            <div className={_cnImageCard} >
              <div className={styles['card-img-border']} />
              <img src={imageUrl} />
            </div>
            <div className={_cnTextCard} >
              <div className={styles['card-title']} ><h2>{title}</h2></div>
              <div className={styles['card-description']} >{description}</div>
              <p className={styles['card-date']} >{publishedDate}</p>
            </div>
          </Link>
        </div>
      )
    })

    const loadMoreBtn = isCollapse || (items.length <= TOPIC_ITEMS_LIMIT) ? null : <div className={classNames(styles['loadmore-btn'], 'text-center')} onClick={()=>{this.setState({ isCollapse: true })}}>
              <div>{TOPIC_LOAD_MORE_ARTICLES}</div>
            </div>

    return (
      <div className={_cnCardsContainer} style={{ backgroundColor: containerBgColor }} >
        <div className={_cnCardsFlexContainer}>
          {relatedArticlesJSX}
        </div>
        {loadMoreBtn}
      </div>
    )
  }
}

Cards.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    publishedDate: PropTypes.string.isRequired,
    ogDescription: PropTypes.string.isRequired,
    heroImage: PropTypes.object.isRequired
  })),
  cardsTheme: PropTypes.string.isRequired,
  containerBgColor: PropTypes.string.isRequired
}

export default Cards
