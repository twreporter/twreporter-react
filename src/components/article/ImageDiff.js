/*eslint no-unused-vars:0*/
'use strict'
import _ from 'lodash'
import BlockAlignmentWrapper from './BlockAlignmentWrapper'
import classNames from 'classnames'
import MediaQuery from 'react-responsive'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import screenSize from '../../constants/screen-size'
import styles from './ImageDiff.scss'

class ImageDiff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 200
    }
    this.fitToParentWidth = this.fitToParentWidth.bind(this)
  }

  componentDidMount() {
    // set state for the width of the images and listen to window resize event
    this.fitToParentWidth()
    window.addEventListener('resize', this.fitToParentWidth)
  }

  fitToParentWidth() {
    const elem = ReactDOM.findDOMNode(this.refs.imgDiff).parentNode
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
    const imgStyle = {
      width: this.state.width
    }

    console.log('ImageDiff', this.props)
    return (
      <div ref="imgDiff">
        <figure className={styles.wrapper}>
          <div className={styles.imgContainer}>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/photoshop-face-before.jpg" style={imgStyle}/>
          </div>
          <div>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/photoshop-face-before.jpg"/>
          </div>
        </figure>
        <input type="range" min="0" max="100" value="50"/>
      </div>
    )
  }
}

const AlignedImageDiff = BlockAlignmentWrapper(ImageDiff)

export { AlignedImageDiff, ImageDiff }
