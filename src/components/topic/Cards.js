'use strict'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import React, { Component, PropTypes } from 'react' // eslint-disable-next-line
import { Link } from 'react-router'
import cx from 'classnames'
import Card from './Card'
import style from './Topic.scss'
import { INTERACTIVE_ARTICLE_STYLE } from '../../constants/index'

// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'

const _ = {
  forEach,
  get
}

export default class Cards extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    const { items } = this.props
    let cardsJsx = []
    _.forEach(items, (item, index) => {
      let description = _.get(item, 'brief.apiData.0.content.0', _.get(item, 'ogDescription'))
      let imgSrc = _.get(item, 'heroImage.image.resizedTargets.mobile.url')
      let title = _.get(item, 'title')
      let slug = _.get(item, 'slug')
      let style = _.get(item, 'style')
      cardsJsx.push(
        <Link
          key={index}
          to={ style === INTERACTIVE_ARTICLE_STYLE ? `https://www.twreporter.org/infographics/${slug}` : `/a/${slug}` }
          target={ style === INTERACTIVE_ARTICLE_STYLE ? '_blank' : undefined }
        >
          <Card
            description={description}
            imgSrc={imgSrc}
            title={title}
          />
        </Link>
      )
    })
    return (
      <div className={cx(style.cards)}>
        {cardsJsx}
      </div>
    )
  }
}

Cards.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    brief: PropTypes.object,
    title: PropTypes.string,
    heroImage: PropTypes.object,
    slug: PropTypes.string,
    style: PropTypes.string
  })).isRequired
}
