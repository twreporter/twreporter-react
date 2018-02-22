/*eslint no-unused-vars: [2, { "args": "none" }]*/
'use strict'
import BlockAlignmentWrapper from './BlockAlignmentWrapper'
import SharedImage from '../shared/Image'
import PropTypes from 'prop-types'
import React from 'react'
import { articleLayout as layout } from '../../themes/layout'

// lodash
import get from 'lodash/get'

const _ = {
  get
}

class Image extends React.PureComponent {
  render() {
    const { toShowCaption } = this.props
    const { description, desktop, mobile, original, tablet, tiny } = _.get(this.props, 'content.0', {})

    return (
      <SharedImage
        alt={description}
        imgSet={{
          desktop,
          mobile,
          original,
          tablet,
          tiny
        }}
        imgSizes={{
          tablet: layout.tablet.width.medium + 'px',
          desktop: layout.desktop.width.medium + 'px',
          hd: layout.hd.width.medium + 'px'
        }}
        toShowCaption={toShowCaption}
      />
    )
  }
}

Image.propTypes = {
  content: PropTypes.array,
  customeStyles: PropTypes.array,
  toShowCaption: PropTypes.bool
}

Image.defaultProps = {
  content: [],
  customeStyles: [],
  toShowCaption: true
}

const AlignedImage = BlockAlignmentWrapper(Image)

export { AlignedImage, Image }
export default Image
