'use strict'
import _ from 'lodash'
import classNames from 'classnames'
import { getScreenType } from '../../lib/screen-type'
import BlockAlignmentWrapper from './BlockAlignmentWrapper'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import LazyLoad from 'react-lazy-load'

class Image extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mounted: false,
      screenType: 'MOBILE'
    }

    this.fitToParentWidth = this.fitToParentWidth.bind(this)
  }

  componentDidMount() {
    this.setState({
      mounted: true,
      screenType: getScreenType(window.innerWidth),
      width: 200
    })
    // set state for the width of the images and listen to window resize event
    this.fitToParentWidth()
    window.addEventListener('resize', this.fitToParentWidth)
  }

  fitToParentWidth() {
    const elem = ReactDOM.findDOMNode(this.refs.imageBox).parentNode
    const width = elem.clientWidth
    if (width !== this.state.width) {
      this.setState({
        width: width
      })
    }
  }

  _renderFigure(imageObj) {
    if (imageObj) {
      return (
        <figure>
          <LazyLoad>
            <img src={ imageObj.url } className={classNames('img-responsive', 'center-block')} style={{ paddingBottom: '1.5rem' }}
            />
          </LazyLoad>
          { imageObj.description ? <figcaption className="image-caption" style={{ paddingTop: '1rem' }}>{ imageObj.description }</figcaption> : null}
        </figure>
      )
    }
    return null
  }

  _getHeight(width, original) {
    if (original) {
      const oriWidth = _.get(original, 'width', width)
      const oriHeight = _.get(original, 'height', width)
      return width * oriHeight / oriWidth
    }
    return width
  }

  _getNoscript(imgUrl, imgDes) {
    // generate image tag for search engines
    return {
      __html: '<img src="'+imgUrl+'" alt="'+imgDes+'">'
    }
  }

  render() {
    let imageByDevice = _.get(this.props, [ 'content', 0 ], {})
    let { mobile, tablet, desktop, original } = imageByDevice
    let { mounted, screenType, width } = this.state
    let renderedFigure = null
    let outerStyle = {
      width: width,
      height: this._getHeight(width, original)
    }
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
      <div ref="imageBox" style={outerStyle} offsetTop={100}>
        {renderedFigure}
        <noscript dangerouslySetInnerHTML={this._getNoscript(_.get(desktop, 'url', ''), _.get(imageByDevice, 'description', ''))} />
      </div>
    )
  }
}

const AlignedImage = BlockAlignmentWrapper(Image)

export { AlignedImage, Image }
