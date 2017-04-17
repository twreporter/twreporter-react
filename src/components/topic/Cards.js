'use strict'

import { CHARACTERS_LIMIT, INTERACTIVE_ARTICLE_STYLE, LINK_PREFIX, TOPIC_ITEMS_LIMIT, TOPIC_LOAD_MORE_ARTICLES } from '../../constants/index'
import React, { PropTypes, PureComponent } from 'react'
import { date2yyyymmdd, replaceStorageUrlPrefix, shortenString } from '../../utils/'

import Card from './Card'
import { addStylesToPropsDecorator } from '../shared/ComponentDecorators'
import classNames from 'classnames'
import commonStyles from '../article/Common.scss'
import get from 'lodash/get'
import map from 'lodash/map'
import stylesInColumn from './CardsInColumn.scss'
import stylesInRows from './CardsInRows.scss'

const _ = {
  get,
  map
}

class Cards extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isExpanded: false
    }
    this._handleLoadmoreClicked = this._handleLoadmoreClicked.bind(this)
  }

  _handleLoadmoreClicked() {
    return this.setState({ isExpanded: true })
  }

  render() {
    const { items, styles } = this.props
    const { isExpanded } = this.state
    
    const _itemToCardJsx =  (item, index) => {
      const imageUrl = replaceStorageUrlPrefix(get(item, 'heroImage.image.resizedTargets.mobile.url', '/asset/review.png')),
        slug = get(item, 'slug', ''),
        title = get(item, 'title', ''),
        publishedDate = date2yyyymmdd(get(item, 'publishedDate', ''), '.'),
        style = _.get(item, 'style'),
        description = shortenString(get(item, 'ogDescription', ''), CHARACTERS_LIMIT.BOTTOM_RELATED_DESC)
      const itemDisplayClass = (index >= TOPIC_ITEMS_LIMIT && !isExpanded)? commonStyles['hide'] : null
      let prefix = LINK_PREFIX.ARTICLE
      let target = undefined
      if (style === INTERACTIVE_ARTICLE_STYLE) {
        prefix = LINK_PREFIX.INTERACTIVE_ARTICLE
        target = '_blank'
      }
      return ( 
        <Card
          key={index}
          linkTo={prefix + slug}
          linkTarget={target}
          imageUrl={imageUrl}
          title={title}
          description={description}
          publishedDate={publishedDate}
          styles={styles}
          itemDisplayClass={itemDisplayClass}
        />  
      )
    }
    const cardsJsx = _.map(items, _itemToCardJsx)
    const loadMoreBtn = isExpanded || (items.length <= TOPIC_ITEMS_LIMIT) ? null : (
      <div className={classNames(styles['loadmore-btn'], 'text-center')} onClick={this._handleLoadmoreClicked}>
        <div>{TOPIC_LOAD_MORE_ARTICLES}</div>
      </div>
    )
    return (
      <div className={styles['cards-container']}>
        <div className={styles['cards-flex-container']}>
          {cardsJsx}
        </div>
        {loadMoreBtn}
      </div>
    )
  }
}

Cards.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    heroImage: PropTypes.object,
    slug: PropTypes.string,
    style: PropTypes.string,
    publishedDate: PropTypes.string,
    ogDescription: PropTypes.string
  })).isRequired,
  styles: PropTypes.object.isRequired
}

export default class CardsFactory {
  constructor() {
    this.InRowsCards = addStylesToPropsDecorator(Cards, stylesInRows)
    this.InColumnCards = addStylesToPropsDecorator(Cards, stylesInColumn)
  }
  buildWithTheme(themeName) {
    switch (themeName) {
      case 'in-rows':
        return this.InRowsCards
      case 'in-column':
        return this.InColumnCards
      default:
        return this.InRowsCards
    }
  }
}
