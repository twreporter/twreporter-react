/* eslint no-unused-vars:0 */
'use strict'
import PropTypes from 'prop-types'
import React from 'react' // eslint-disable-line
import classNames from 'classnames'
import commonStyles from './Common.scss'
import cx from 'classnames'
import styles from './LeadingImage.scss'
import { TITLE_POSITION_UPON_LEFT } from '../../constants/page-themes'
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
    const { size, image, id, description, children, titlePosition } = this.props
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

    const defaultImgUrl = replaceStorageUrlPrefix(_.get(image, 'mobile.url'))

    const imgJsx = this.state.isMount ? (
      <img src={defaultImgUrl} alt={description} srcSet={getImageSrcSet(image)} />
    ) : (
      <img src={defaultImgUrl} alt={description} className={styles['img-placeholder']} />
    )

    const containerClass = titlePosition === TITLE_POSITION_UPON_LEFT ? cx(styles[leadingImgClass], styles['title-upon-left']) : styles[leadingImgClass]

    return (
      <div className={containerClass}>
        {imgJsx}
        { description ? <div className={commonStyles['desc-text-block']}>{description}</div> : null }
        {children}
      </div>
    )
  }
}

LeadingImage.propTypes = {
  size: PropTypes.string,
  image: PropTypes.object,
  description: PropTypes.string,
  id: PropTypes.string
}

LeadingImage.defaultProps = {
  size: 'normal',
  image: null,
  description: '',
  id: ''
}

export { LeadingImage }
