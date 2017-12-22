'use strict'
import BlockAlignmentWrapper from './BlockAlignmentWrapper'
import PropTypes from 'prop-types'
import React from 'react' // eslint-disable-next-line
import YoutubePlayer from 'react-youtube'
import commonStyles from './Common.scss'
import cx from 'classnames'
import styles from './Youtube.scss'

// lodash
import get from 'lodash/get'

class Youtube extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { content } = this.props

    let { description, youtubeId } = get(content, [ 0 ], {})

    if (!youtubeId) {
      return null
    }

    return (
      <div className={cx(styles['youtube-container'], 'hidden-print')}>
        <div className={styles['youtube-iframe-container']}>
          <YoutubePlayer videoId={youtubeId} />
        </div>
        <div className={cx(commonStyles['desc-text-block'], 'text-justify')}>{description}</div>
      </div>
    )
  }
}

Youtube.propTypes = {
  content: PropTypes.array.isRequired,
  device: PropTypes.string,
  styles: PropTypes.object
}

Youtube.defaultProps = {
  content: [],
  device: '',
  styles: {}
}

export const AlignedYoutube = BlockAlignmentWrapper(Youtube)
