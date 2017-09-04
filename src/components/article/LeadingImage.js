/* eslint no-unused-vars:0 */
'use strict'
import React from 'react' // eslint-disable-line
import classNames from 'classnames'
import styles from './LeadingImage.scss'
import commonStyles from './Common.scss'
import { getImageSrcSet, replaceStorageUrlPrefix } from '../../utils/'

// lodash
import get from 'lodash/get'

const _ = {
  get
}

class LeadingImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMount: false
    }
  }

  componentDidMount() {
    this.setState({
      isMount: true
    })
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

    const defaultImgUrl = replaceStorageUrlPrefix(_.get(image, 'tiny.url'))

    const imgJsx = this.state.isMount ? (
      <img src={defaultImgUrl} alt={description} srcSet={getImageSrcSet(image)} />
    ) : (
      <img src={defaultImgUrl} alt={description} className={styles['img-placeholder']} />
    )

    return (
      <div className={styles[leadingImgClass]}>
        {imgJsx}
        { description ? <div className={commonStyles['desc-text-block']}>{description}</div> : null }
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
