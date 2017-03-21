'use strict'
import React, { PropTypes } from 'react'
import classNames from 'classnames'
import get from 'lodash/get'
import map from 'lodash/map'
import { replaceStorageUrlPrefix, shortenString, date2yyyymmdd, partialApply, addStylesToProps } from '../../utils/index'
import { CHARACTERS_LIMIT, LINK_PREFIX, INTERACTIVE_ARTICLE_STYLE, TOPIC_LOAD_MORE_ARTICLES, TOPIC_ITEMS_LIMIT } from '../../constants/index'
import stylesInColumn from './CardsInColumn.scss'
import stylesInRows from './CardsInRows.scss'
import Card from './Card'
import commonStyles from '../article/Common.scss'

const _ = {
  get,
  map
}

class CardJSXBuilderFactory {
  getBuilder(cardType, data={}) {
    switch(cardType) {
      case 'with-loadmore':
        return function _makeCardJsxWithLoadmore(articleData, index) {
          const imageUrl = replaceStorageUrlPrefix(get(articleData, 'heroImage.image.resizedTargets.mobile.url', '/asset/review.png')),
            slug = get(articleData, 'slug', ''),
            title = get(articleData, 'title', ''),
            publishedDate = date2yyyymmdd(get(articleData, 'publishedDate', ''), '.'),
            style = _.get(articleData, 'style'),
            description = shortenString(get(articleData, 'ogDescription', ''), CHARACTERS_LIMIT.BOTTOM_RELATED_DESC)

          const itemDisplayClass = (index >= TOPIC_ITEMS_LIMIT && !data.isOpened)? commonStyles['hide'] : null
          
          let prefix = LINK_PREFIX.ARTICLE
          let target = undefined
          if (style === INTERACTIVE_ARTICLE_STYLE) {
            prefix = LINK_PREFIX.INTERACTIVE_ARTICLE
            target = '_blank'
          }
          
          return ( 
            <Card
              key={index++}
              linkTo={prefix + slug}
              linkTarget={target}
              imageUrl={imageUrl}
              title={title}
              description={description}
              publishedDate={publishedDate}
              styles={data.styles}
              itemDisplayClass={itemDisplayClass}
            />  
          )
        }
      default:
        return function _makeDefaultCardJsx(articleData, index) {
          const imageUrl = replaceStorageUrlPrefix(get(articleData, 'heroImage.image.resizedTargets.mobile.url', '/asset/review.png')),
            slug = get(articleData, 'slug', ''),
            title = get(articleData, 'title', ''),
            publishedDate = date2yyyymmdd(get(articleData, 'publishedDate', ''), '.'),
            style = _.get(articleData, 'style'),
            description = shortenString(get(articleData, 'ogDescription', ''), CHARACTERS_LIMIT.BOTTOM_RELATED_DESC)

          let prefix = LINK_PREFIX.ARTICLE
          let target = undefined
          if (style === INTERACTIVE_ARTICLE_STYLE) {
            prefix = LINK_PREFIX.INTERACTIVE_ARTICLE
            target = '_blank'
          }
          return ( 
            <Card
              key={index++}
              linkTo={prefix + slug}
              linkTarget={target}
              imageUrl={imageUrl}
              title={title}
              description={description}
              publishedDate={publishedDate}
              styles={data.styles} 
            />  
          )
        }
    }
  }
}

export class Cards extends React.Component {
  constructor(props) {
    super(props)
    this.cardJSXBuilderFactory = new CardJSXBuilderFactory(this.props.styles)
  }
  render() {
    const props = this.props
    const items = _.get(props, 'items', [])
    const styles = _.get(props, 'styles', {})
    const cardJSXBuilder = this.cardJSXBuilderFactory.getBuilder('default', { styles })
    const cardsJSX = _.map(items, cardJSXBuilder)
    return (
      <div className={styles['cards-container']}>
        <div className={styles['cards-flex-container']}>
          {cardsJSX}
        </div>
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
  styles: PropTypes.object.isRequired
}

export class CardsWithLoadmore extends Cards {
  constructor(props) {
    super(props)
    this.state = {
      isOpened: false
    }
    this._handleLoadmoreClicked = this._handleLoadmoreClicked.bind(this)
  }
  _handleLoadmoreClicked() {
    return this.setState({ isOpened: true })
  }
  render() {
    const props = this.props
    const items = _.get(props, 'items', [])
    const styles = _.get(props, 'styles', {})
    const isOpened = _.get(this, 'state.isOpened', false)
    const cardJSXBuilder = this.cardJSXBuilderFactory.getBuilder('with-loadmore', { styles, isOpened })
    const cardsJSX = _.map(items, cardJSXBuilder)
    const loadMoreBtn = isOpened || (items.length <= TOPIC_ITEMS_LIMIT) ? null : (
      <div className={classNames(styles['loadmore-btn'], 'text-center')} onClick={this._handleLoadmoreClicked}>
        <div>{TOPIC_LOAD_MORE_ARTICLES}</div>
      </div>
    )
    return (
      <div className={styles['cards-container']}>
        <div className={styles['cards-flex-container']}>
          {cardsJSX}
        </div>
        {loadMoreBtn}
      </div>
    )
  }
}

CardsWithLoadmore.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    publishedDate: PropTypes.string.isRequired,
    ogDescription: PropTypes.string.isRequired,
    heroImage: PropTypes.object.isRequired
  }))
}


export default class CardsFactory {
  constructor(CardsComponents) {
    this.CardsComponents = CardsComponents
  }
  buildCardsWithTheme(themeName) {
    const addStylesToCards = partialApply(addStylesToProps, this.CardsComponents)
    switch (themeName) {
      case 'in-rows':
        return addStylesToCards(stylesInRows)
      case 'in-column':
        return addStylesToCards(stylesInColumn)
      default:
        return addStylesToCards(stylesInRows)
    }
  }
}

