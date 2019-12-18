import { CHARACTERS_LIMIT, INTERACTIVE_ARTICLE_STYLE } from '../../../constants/index'
import { shortenString } from '../../../utils/string'
import BarComponents from './related-as-bars'
import base from './base'
import CardComponents from './related-as-cards'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
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

const firstShowedLimit = 12

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
    background: PropTypes.string,
    items: PropTypes.array,
    format: PropTypes.oneOf([ formatConsts.row, formatConsts.column ]).isRequired
  }

  static defaultProps = {
    background: '#d8d8d8',
    items: []
  }

  constructor(props) {
    super(props)
    this.state = {
      showAll: false
    }
    this.renderItem = this._renderItem.bind(this)
    this.showAll = this._showAll.bind(this)
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
    const prefix = style === INTERACTIVE_ARTICLE_STYLE ? '/i/' : '/a/'
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
        hide={!this.state.showAll && index > firstShowedLimit - 1}
      />
    )
  }

  _showAll() {
    this.setState({
      showAll: true
    })
  }

  render() {
    const { background, format, items } = this.props
    const components = selectComponentsByFormat(format)
    return (
      <base.Background background={background}>
        <components.ItemsContainer>
          {_.map(items, this.renderItem)}
        </components.ItemsContainer>
        {_.get(items, 'length', 0) < firstShowedLimit || this.state.showAll ? null : (
          <base.ShowAllButton onClick={this.showAll}>
            <div>載入更多</div>
          </base.ShowAllButton>
        )}
      </base.Background>
    )
  }
}
