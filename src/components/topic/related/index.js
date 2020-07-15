import { formatPostLinkTarget, formatPostLinkTo } from '../../../utils/url'
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
    format: PropTypes.oneOf([ formatConsts.row, formatConsts.column ]),
    hasMore: PropTypes.bool,
    isFetching: PropTypes.bool,
    loadMore: PropTypes.func.isRequired,
  }

  static defaultProps = {
    background: '#d8d8d8',
    items: [],
    format: formatConsts.row,
    hasMore: false,
    isFetching: false,
  }

  constructor(props) {
    super(props)
    this.renderItem = this._renderItem.bind(this)
  }

  _renderItem(item, index) {
    const charLimit = 120
    const components = selectComponentsByFormat(this.props.format)
    const image = replaceGCSUrlOrigin(_.get(item, 'hero_image.resized_targets.mobile', defaultPostImage))
    const id = _.get(item, 'id', `item-${index}`)
    const slug = _.get(item, 'slug', '')
    const title = _.get(item, 'title', '')
    const publishedDate = date2yyyymmdd(_.get(item, 'published_date'), '.')
    const style = _.get(item, 'style')
    const description = shortenString(_.get(item, 'og_description', ''), charLimit)
    return (
      <components.Item
        key={id}
        linkTo={formatPostLinkTo(slug, style)}
        linkTarget={formatPostLinkTarget(style)}
        image={image}
        title={title}
        description={description}
        publishedDate={publishedDate}
      />
    )
  }

  render() {
    const {
      background,
      format,
      hasMore,
      isFetching,
      items,
      loadMore,
    } = this.props
    const components = selectComponentsByFormat(format)
    return (
      <base.Background background={background}>
        <components.ItemsContainer>
          {_.map(items, this.renderItem)}
        </components.ItemsContainer>
        {isFetching || !hasMore ? null : (
          <base.ShowAllButton onClick={loadMore}>
            <div>載入更多</div>
          </base.ShowAllButton>
        )}
      </base.Background>
    )
  }
}
