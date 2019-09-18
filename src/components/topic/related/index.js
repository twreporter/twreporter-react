import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { CHARACTERS_LIMIT, INTERACTIVE_ARTICLE_STYLE, LINK_PREFIX } from '../../../constants/index'
import { shortenString } from '../../../utils/string'
import BarComponents from './related-as-bars'
import CardComponents from './related-as-cards'
// @twreporter
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import { date2yyyymmdd } from '@twreporter/core/lib/utils/date'

// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map
}

const formatConsts = {
  row: 'in-row',
  column: 'in-column'
}

function selectComponentsByFormat(format) {
  switch (format) {
    case formatConsts.row:
      return CardComponents
    case formatConsts.column:
      return BarComponents
    default:
      return BarComponents
  }
}

const defaultPostImage = {
  width: 681,
  height: 431,
  url: '/asset/review.png'
}

export default class RelatedItems extends PureComponent {
  static propTypes = {
    backgorund: PropTypes.string,
    items: PropTypes.array,
    format: PropTypes.oneOf([ formatConsts.row, formatConsts.column ]).isRequired
  }

  static defaultProps = {
    backgorund: '#d8d8d8',
    items: []
  }

  constructor(props) {
    super(props)
    this.renderItem = this._renderItem.bind(this)
  }

  _renderItem(item, index) {
    const components = selectComponentsByFormat(this.props.format)
    const image = replaceGCSUrlOrigin(_.get(item, 'hero_image.resized_targets.mobile', defaultPostImage))
    const id = _.get(item, 'id', `item-${index}`)
    const slug = _.get(item, 'slug', '')
    const title = _.get(item, 'title', '')
    const publishedDate = date2yyyymmdd(_.get(item, 'published_date'), '.')
    const style = _.get(item, 'style')
    const description = shortenString(_.get(item, 'og_description', ''), CHARACTERS_LIMIT.BOTTOM_RELATED_DESC)
    const prefix = style === INTERACTIVE_ARTICLE_STYLE ? LINK_PREFIX.INTERACTIVE_ARTICLE : LINK_PREFIX.ARTICLE
    const target = style === INTERACTIVE_ARTICLE_STYLE ? '_blank' : '_self'
    return (
      <components.Item
        key={id}
        linkTo={prefix + slug}
        linkTarget={target}
        image={image}
        title={title}
        description={description}
        publishedDate={publishedDate}
      />
    )
  }

  render() {
    const { backgorund, format, items } = this.props
    const components = selectComponentsByFormat(format)
    return (
      <components.ItemsContainer backgorund={backgorund}>
        {_.map(items, this.renderItem)}
      </components.ItemsContainer>
    )
  }
}
