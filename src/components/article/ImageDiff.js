/*eslint no-unused-vars:0*/
'use strict'
import { replaceStorageUrlPrefix } from '../../utils/index'
import _ from 'lodash'
import BlockAlignmentWrapper from './BlockAlignmentWrapper'
import classNames from 'classnames'
import FitwidthMixin from './mixins/FitwidthMixin'
import { getScreenType } from '../../utils/index'
import MediaQuery from 'react-responsive'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Slider from 'rc-slider'
import commonStyles from './Common.scss'
import screenSize from '../../constants/screen-size'
import styles from './ImageDiff.scss'

const DEFAULT_WIDTH = 200
const DEFAULT_HEIGHT = 200

class ImageDiff extends FitwidthMixin(Component) {
  constructor(props) {
    super(props)
    this.state = {
      isMounted: false,
      onhovered: false,
      screenType: 'MOBILE',
      width: 200,
      placeholderOpacity: 0,
      imageOpacity: 0,
      percentage: 50
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

  _renderFigure(imageObj, imgStyle) {
    if (_.get(imageObj, 'url')) {
      return (
        <img
          src={ replaceStorageUrlPrefix(imageObj.url) }
          style={ imgStyle }
          className={classNames('center-block', styles.imgAbsolute)}
        />
      )
    }
    return null
  }

  render() {
    let imageByDevice0 = _.get(this.props, [ 'content', 0 ], {})
    let imageByDevice1 = _.get(this.props, [ 'content', 1 ], {})
    let { desktop } = imageByDevice0
    let { isMounted, screenType, width, percentage, onhovered } = this.state
    let { outerWidth, outerHeight } = this.props
    let boxWidth = outerWidth || width
    let boxHeight = outerHeight || this._getHeight(boxWidth, desktop, DEFAULT_WIDTH, DEFAULT_HEIGHT)
    let buttonClass = null
    let renderedFigure0 = null
    let renderedFigure1 = null
    let imageDescription = _.get(imageByDevice0, 'description', null)
    let descriptionBox

    let outerStyle = {
      width: boxWidth,
      minHeight: boxHeight
    }
    let imgStyle = {
      ...outerStyle,
      height: boxHeight
    }
    let rangeStyle = {
      width: boxWidth,
      height: boxHeight*0.7
    }

    if(onhovered) {
      buttonClass = styles.hovered
    }

    // if the Image is being mounted, select image to render
    // according to the device of the client
    if (isMounted) {
      renderedFigure0 = this._renderByDevice(screenType, imageByDevice0, imgStyle)
      renderedFigure1 = this._renderByDevice(screenType, imageByDevice1, imgStyle)
    }

    if(imageDescription) {
      descriptionBox =
        <div className={classNames(commonStyles['desc-text-block'])}>
          {imageDescription}
        </div>
    }

    return (
      <div ref="imgDiff" className={styles.diffContainer}>
        <div style={outerStyle}>
          <figure className={styles.wrapper}>
            <div className={styles.imgContainer}>
              {renderedFigure0}
            </div>
            <div className={styles.overlayContainer} style={{ width: percentage+'%' }}>
              {renderedFigure1}
            </div>
            <img src="/asset/slider-button.svg"
              className={classNames(styles.sliderButton, buttonClass)} style={{ left: percentage+'%' }} />
            <div style={rangeStyle}>
              <Slider
                className={styles.rangeInput}
                onChange={ (value)=>{
                  this.setState({ percentage: parseInt(value) })} }
                  onMouseOver={()=>{this.setState({ onhovered: true })}}
                  onMouseOut={()=>{this.setState({ onhovered: false })}
                }
                value={50}
                min={0}
                max={100} 
                tipFormatter={null}
                />
            </div>
          </figure>
        </div>
        {descriptionBox}
      </div>
    )
  }
}

ImageDiff.propTypes = {
  content: React.PropTypes.array,
  customeStyles: React.PropTypes.array,
  id: React.PropTypes.string
}

ImageDiff.defaultProps = {
  content: [],
  customeStyles: [],
  id: ''
}

const AlignedImageDiff = BlockAlignmentWrapper(ImageDiff)

export { AlignedImageDiff, ImageDiff }
