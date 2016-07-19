/* eslint no-unused-vars:0 */
'use strict'
import _ from 'lodash'
import classNames from 'classnames'
import styles from './LeadingImage.scss'
import { Image } from './Image'
import React from 'react' // eslint-disable-line

class LeadingImage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { size, image, id, description } = this.props
    let leadingImgClass
    if (!image) {
      return null
    }
    switch (size) {
      case 'normal':
        leadingImgClass = 'leading-img'
        break
      case 'extend':
        leadingImgClass = 'extended-leading-img'
        break
      case 'small':
        leadingImgClass = 'small-leading-img'
        break
      default:
        leadingImgClass = 'leading-img'
        break
    }

    return (
      <div className={styles[leadingImgClass]}>
        <Image
          content={ [ _.assign({}, image, { id: id, description: description }) ] }
          isToShowDescription={false}
        />
      </div>
    )
  }
}

LeadingImage.propTypes = {
  size: React.PropTypes.string,
  image: React.PropTypes.object,
  description: React.PropTypes.string,
  id: React.PropTypes.string
}

LeadingImage.defaultProps = {
  size: 'normal',
  image: null,
  description: '',
  id: ''
}

export { LeadingImage }
