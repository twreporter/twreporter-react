'use strict'
import _ from 'lodash'
import classNames from 'classnames'
import screenSize from '../../constants/screen-size'
import BlockAlignmentWrapper from './BlockAlignmentWrapper'
import MediaQuery from 'react-responsive'
import React, { Component } from 'react'

class ImageBlock extends Component {
  constructor(props) {
    super(props)
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
    return (
      <div>
        <MediaQuery maxWidth={screenSize.smallScreenMaxWidth}>
          {
            this._renderFigure(mobile)
          }
        </MediaQuery>
        <MediaQuery minWidth={screenSize.mediumScreenMinWidth} maxWidth={screenSize.mediumScreenMaxWidth}>
          {
            this._renderFigure(tablet)
          }
        </MediaQuery>
        <MediaQuery minWidth={screenSize.largeScreenMinWidth}>
          {
            this._renderFigure(desktop)
          }
        </MediaQuery>
      </div>
    )
  }
}

const Image = BlockAlignmentWrapper(ImageBlock)

export { Image }
