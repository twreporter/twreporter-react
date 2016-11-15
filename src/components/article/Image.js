/*eslint no-unused-vars: [2, { "args": "none" }]*/
'use strict'
import { replaceStorageUrlPrefix } from '../../utils/index'
import classNames from 'classnames'
import commonStyles from './Common.scss'
import FitwidthMixin from './mixins/FitwidthMixin'
import { getScreenType } from '../../utils/index'
import BlockAlignmentWrapper from './BlockAlignmentWrapper'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import LazyLoad from 'react-lazyload'
import styles from './Image.scss'
import UI_SETTING from '../../constants/ui-settings'

// lodash
import get from 'lodash/get'

const DEFAULT_WIDTH = 200
const DEFAULT_HEIGHT = 200

class Image extends FitwidthMixin(Component) {
  constructor(props) {
    super(props)

    this.state = {
      isMounted: false,
      screenType: 'MOBILE',
      width: DEFAULT_WIDTH
    }

    this.fitToParentWidth = this.fitToParentWidth.bind(this)
  }

  componentDidMount() {
    this.setState({
      isMounted: true,
      screenType: getScreenType(window.innerWidth)
    })

    if (super.componentDidMount) super.componentDidMount()
  }

  componentWillReceiveProps(nextProps) {
    if (ReactDOM.findDOMNode(this)) {
      this.fitToParentWidth()
    }
  }

  _renderPlaceHoderImage(imageUrl, imgStyle) {
    if (imageUrl) {
      return (
        <div className={styles['img-placeholder-outer']}
            style={ { ...imgStyle } }>
          <LazyLoad offset={UI_SETTING.image.loadingOffset.placeholder} height={imgStyle.height} once={true}>
            <img src={ replaceStorageUrlPrefix(imageUrl) } className={classNames(styles['img-placeholder'])} style={imgStyle} />
          </LazyLoad>
        </div>
      )
    }
    return null
  }

  _renderFigure(imageObj, imgStyle) {
    if (get(imageObj, 'url')) {
      return (
        <figure>
          <LazyLoad offset={UI_SETTING.image.loadingOffset.image} height={imgStyle.height} once={true}>
            <img src={ replaceStorageUrlPrefix(imageObj.url) }
              style={ { ...imgStyle } }
              className={classNames(styles['img-absolute'])}
            />
          </LazyLoad>
        </figure>
      )
    }
    return null
  }

  _getNoscript(imgUrl, imgDes) {
    // generate image tag for search engines
    return {
      __html: '<img src="'+imgUrl+'" alt="'+imgDes+'">'
    }
  }

  render() {
    let imageByDevice = get(this.props, [ 'content', 0 ], {})
    if (imageByDevice===null) {
      return null
    }
    let { desktop, tiny } = imageByDevice
    let { isMounted, screenType, width } = this.state
    let { isToShowDescription, outerWidth, outerHeight } = this.props
    let boxWidth = outerWidth || width
    let maxWidth = get(desktop, 'width', DEFAULT_WIDTH)
    if(maxWidth < boxWidth) {
      boxWidth = maxWidth
    }
    let boxHeight = outerHeight || this._getHeight(boxWidth, desktop, DEFAULT_WIDTH, DEFAULT_HEIGHT)
    let renderedPlaceHoderImage = null
    let renderedFigure = null
    let imageDescription = get(imageByDevice, 'description', null)
    let descriptionBox

    let outerStyle = {
      width: boxWidth,
      minHeight: boxHeight
    }
    let imgStyle = {
      ...outerStyle,
      height: boxHeight
    }

    // if the Image is being mounted, select image to render
    // according to the device of the client
    if (isMounted) {
      renderedPlaceHoderImage = this._renderPlaceHoderImage(get(tiny, [ 'url' ]), imgStyle)
      renderedFigure = this._renderByDevice(screenType, imageByDevice, imgStyle)
    }

    if(imageDescription && isToShowDescription) {
      descriptionBox =
        <div
          className={classNames(commonStyles['desc-text-block'], 'text-justify')}
          style={{ marginTop: '16px' }}
        >
          {imageDescription}
        </div>
    }

    let imgUrl = replaceStorageUrlPrefix(get(desktop, 'url', ''))

    let microData = (
      <div itemProp="image" itemScope itemType="http://schema.org/ImageObject">
        <meta itemProp="url" content={imgUrl} />
        <meta itemProp="description" content={imageDescription} />
        <meta itemProp="height" content={get(desktop, 'height')} />
        <meta itemProp="width" content={get(desktop, 'width')} />
      </div>
    )

    return (
      <div ref="imageBox" className={styles['image-box']}>
        <div style={outerStyle}>
          {renderedPlaceHoderImage}
          {renderedFigure}
          <noscript dangerouslySetInnerHTML={this._getNoscript(imgUrl, imageDescription)} />
        </div>
        {descriptionBox}
        {microData}
      </div>
    )
  }
}

Image.propTypes = {
  content: React.PropTypes.array,
  customeStyles: React.PropTypes.array,
  isToShowDescription: React.PropTypes.bool,
  outerHeight: React.PropTypes.number,
  outerWidth: React.PropTypes.number
}

Image.defaultProps = {
  content: [],
  customeStyles: [],
  isToShowDescription: true,
  outerHeight: 0,
  outerWidth: 0
}

const AlignedImage = BlockAlignmentWrapper(Image)

export { AlignedImage, Image }
