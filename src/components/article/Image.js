/*eslint no-unused-vars: [2, { "args": "none" }]*/
'use strict'
import BlockAlignmentWrapper from './BlockAlignmentWrapper'
import FitwidthMixin from './mixins/FitwidthMixin'
import LazyLoad, { forceCheck } from 'react-lazyload'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import UI_SETTING from '../../constants/ui-settings'
import commonStyles from './Common.scss'
import cx from 'classnames'
import styles from './Image.scss'
import { getScreenType } from '../../utils/index'
import { replaceStorageUrlPrefix } from '../../utils/index'

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
    if (!this.context.isPhotography) {
      forceCheck()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.node) {
      this.fitToParentWidth()
    }
  }

  _renderPlaceHoderImage(imageUrl, imgStyle) {
    if (imageUrl) {
      return (
        <div className={styles['img-placeholder-outer']}
            style={ { ...imgStyle } }>
          <LazyLoad offset={UI_SETTING.image.loadingOffset.placeholder} height={imgStyle.height} once={true}>
            <img src={ replaceStorageUrlPrefix(imageUrl) } className={styles['img-placeholder']} style={imgStyle} />
          </LazyLoad>
        </div>
      )
    }
    return null
  }

  _renderFigure(imageObj, imgStyle, isLazyload=true) {
    if (get(imageObj, 'url')) {
      if (!isLazyload) {
        return (
          <figure>
            <img src={ replaceStorageUrlPrefix(imageObj.url) }
              style={ { ...imgStyle } }
              className={styles['img-absolute']}
            />
          </figure>
        )
      }
      return (
        <figure>
          <LazyLoad offset={UI_SETTING.image.loadingOffset.image} height={imgStyle.height} once={true}>
            <img src={ replaceStorageUrlPrefix(imageObj.url) }
              style={ { ...imgStyle } }
              className={styles['img-absolute']}
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
    const imageByDevice = get(this.props, [ 'content', 0 ], {})
    if (imageByDevice===null) {
      return null
    }
    const { desktop, tiny } = imageByDevice
    const { isMounted, screenType, width } = this.state
    const { isToShowDescription, outerWidth, outerHeight } = this.props
    const maxWidth = get(desktop, 'width', DEFAULT_WIDTH)
    const contentWidth = outerWidth || width
    const boxWidth = (contentWidth > maxWidth) ? maxWidth : contentWidth
    const boxHeight = outerHeight || this._getHeight(boxWidth, desktop, DEFAULT_WIDTH, DEFAULT_HEIGHT)
    const imageDescription = get(imageByDevice, 'description', null)

    let renderedPlaceHoderImage = null
    let renderedFigure = null
    let descriptionBox = null

    const outerStyle = {
      width: boxWidth,
      minHeight: boxHeight
    }
    const imgStyle = {
      ...outerStyle,
      height: boxHeight
    }

    const imgUrl = replaceStorageUrlPrefix(get(desktop, 'url', ''))

    const microData = (
      <div itemProp="image" itemScope itemType="http://schema.org/ImageObject">
        <meta itemProp="url" content={imgUrl} />
        <meta itemProp="description" content={imageDescription} />
        <meta itemProp="height" content={get(desktop, 'height')} />
        <meta itemProp="width" content={get(desktop, 'width')} />
      </div>
    )

    if (imageDescription && isToShowDescription) {
      descriptionBox =
        <div
          className={cx(commonStyles['desc-text-block'], 'text-justify')}
          style={{ marginTop: '16px' }}
        >
          {imageDescription}
        </div>
    }

    const { isPhotography } = this.context
    if (isPhotography) {
      renderedFigure = this._renderByDevice(screenType, imageByDevice, imgStyle, false)
      return (
        <div ref={div => {this.node = div}} className={cx(styles['image-box'], styles['photoExclu'])}>
          <div className="hidden-print" style={outerStyle}>
            {renderedPlaceHoderImage}
            {renderedFigure}
          </div>
          {descriptionBox}
          {microData}
          <div className="visible-print">
            <img src={imgUrl} alt={imageDescription} style={{ width: '100%' }}/>
          </div>
        </div>
      )
    }
    // if the Image is being mounted, select image to render
    // according to the device of the client
    if (isMounted) {
      renderedPlaceHoderImage = this._renderPlaceHoderImage(get(tiny, [ 'url' ]), imgStyle)
      renderedFigure = this._renderByDevice(screenType, imageByDevice, imgStyle)
    }

    return (
      <div ref={div => {this.node = div}} className={cx(styles['image-box'], isPhotography ? styles['photoExclu'] : null)}>
        <div className="hidden-print" style={outerStyle}>
          {renderedPlaceHoderImage}
          {renderedFigure}
          <noscript dangerouslySetInnerHTML={this._getNoscript(imgUrl, imageDescription)} />
        </div>
        {descriptionBox}
        {microData}
        <div className="visible-print">
          <img src={imgUrl} alt={imageDescription} style={{ width: '100%' }} />
        </div>
      </div>
    )
  }
}

Image.contextTypes = {
  isPhotography: PropTypes.bool
}

Image.propTypes = {
  content: PropTypes.array,
  customeStyles: PropTypes.array,
  isToShowDescription: PropTypes.bool,
  outerHeight: PropTypes.number,
  outerWidth: PropTypes.number
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
