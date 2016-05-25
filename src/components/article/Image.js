'use strict'
import _ from 'lodash'
import classNames from 'classnames'
import { getScreenType } from '../../lib/screen-type'
import BlockAlignmentWrapper from './BlockAlignmentWrapper'
import React, { Component } from 'react'

class Image extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mounted: false,
      screenType: 'MOBILE'
    }
  }

  componentDidMount() {
    this.setState({
      mounted: true,
      screenType: getScreenType(window.innerWidth)
    })
  }

  _renderFigure(imageObj) {
    if (imageObj) {
      return (
        <figure>
          <img src={ imageObj.url } className={classNames('img-responsive', 'center-block')} style={{ paddingBottom: '1.5rem' }}
          />
          { imageObj.description ? <figcaption className="image-caption" style={{ paddingTop: '1rem' }}>{ imageObj.description }</figcaption> : null}
        </figure>
      )
    }
    return null
  }

  render() {
    let imageByDevice = _.get(this.props, [ 'content', 0 ], {})
    let { mobile, tablet, desktop } = imageByDevice
    let { mounted, screenType } = this.state
    let renderedFigure = null
    if (mounted) {
      switch(screenType) {
        case 'MOBILE':
          renderedFigure = this._renderFigure(mobile)
          break
        case 'TABLET':
          renderedFigure = this._renderFigure(tablet)
          break
        case 'DESKTOP':
          renderedFigure = this._renderFigure(desktop)
          break
        default:
          renderedFigure = this._renderFigure(mobile)
      }
    }

    return (
      <div>
        {renderedFigure}
      </div>
    )
  }
}

const AlignedImage = BlockAlignmentWrapper(Image)

export { AlignedImage, Image }
