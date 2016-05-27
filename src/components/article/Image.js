'use strict'
import _ from 'lodash'
import classNames from 'classnames'
import { getScreenType } from '../../lib/screen-type'
import BlockAlignmentWrapper from './BlockAlignmentWrapper'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import LazyLoad from 'react-lazy-load'
import styles from './Image.scss'

class Image extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mounted: false,
      screenType: 'MOBILE',
      width: 200,
      placeHolderOpacity: 0,
      imageOpacity: 0
    }

    this.fitToParentWidth = this.fitToParentWidth.bind(this)
  }

  componentDidMount() {
    this.setState({
      mounted: true,
      screenType: getScreenType(window.innerWidth)
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

  _renderPlaceHoderImage(imageUrl, imgStyle) {
    if (imageUrl) {
      return (
        <LazyLoad offsetTop={200}
          onContentVisible={() => this.setState({ placeHolderOpacity: 1 })}
          className={styles.imgPlaceHolderOuter}
          style={ { ...imgStyle, opacity: this.state.placeHolderOpacity } }>
          <img src={ imageUrl } className={classNames('center-block', styles.imgPlaceHolder)} style={imgStyle} />
        </LazyLoad>
      )
    }
    return null
  }

  _renderFigure(imageObj, imgStyle) {
    if (imageObj) {
      return (
        <figure>
          <LazyLoad offsetTop={20} onContentVisible={() => this.setState({ imageOpacity: 1 })}>
            <img src={ imageObj.url }
              style={ { ...imgStyle, opacity: this.state.imageOpacity } }
              className={classNames('center-block', styles.imgAbsolute)}
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
    let renderedPlaceHoderImage = null
    let renderedFigure = null
    const height = this._getHeight(width, original)
    let outerStyle = {
      width: width,
      minHeight: height
    }
    let imgStyle = {
      ...outerStyle,
      height: height
    }

    // if the Image is being mounted, select image to render
    // according to the device of the client
    if (mounted) {
      // TODO: replace the image with TINY image obtained from Keystone
      renderedPlaceHoderImage = this._renderPlaceHoderImage('https://cdn-images-2.medium.com/freeze/max/30/1*HKrv5OV9P63vz5sa8-Cceg.png?q=20', imgStyle)

      switch(screenType) {
        case 'MOBILE':
          renderedFigure = this._renderFigure(mobile, imgStyle)
          break
        case 'TABLET':
          renderedFigure = this._renderFigure(tablet, imgStyle)
          break
        case 'DESKTOP':
          renderedFigure = this._renderFigure(desktop, imgStyle)
          break
        default:
          renderedFigure = this._renderFigure(mobile, imgStyle)
      }
    }

    return (
      <div ref="imageBox" style={outerStyle} className={styles.imageBox} offsetTop={100}>
        {renderedPlaceHoderImage}
        {renderedFigure}
        <noscript dangerouslySetInnerHTML={this._getNoscript(_.get(desktop, 'url', ''), _.get(imageByDevice, 'description', ''))} />
      </div>
    )
  }
}

const AlignedImage = BlockAlignmentWrapper(Image)

export { AlignedImage, Image }
