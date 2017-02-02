'use strict'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import React, { Component, PropTypes } from 'react' // eslint-disable-next-line
import { Link } from 'react-router'
import cx from 'classnames'
import Card from './Card'
import style from './Topic.scss'
import { LINK_PREFIX, INTERACTIVE_ARTICLE_STYLE } from '../../constants/index'
import { replaceStorageUrlPrefix } from '../../utils/'

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
      let description = _.get(item, 'brief.apiData.0.content.0', '')
      if(description.trim().length === 0) {
        description = _.get(item, 'ogDescription', '')
      }
      const imgSrc = replaceStorageUrlPrefix(_.get(item, 'heroImage.image.resizedTargets.mobile.url'))
      const title = _.get(item, 'title')
      const slug = _.get(item, 'slug')
      const style = _.get(item, 'style')
      let prefix = LINK_PREFIX.ARTICLE
      let target = undefined
      if (style === INTERACTIVE_ARTICLE_STYLE) {
        prefix = LINK_PREFIX.INTERACTIVE_ARTICLE
        target = '_blank'
      }

      cardsJsx.push(
        <Link
          key={index}
          to={prefix + slug}
          target={target}
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
