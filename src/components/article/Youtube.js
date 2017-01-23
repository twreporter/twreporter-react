'use strict'
import BlockAlignmentWrapper from './BlockAlignmentWrapper'
import React from 'react' // eslint-disable-next-line
import YoutubePlayer from 'react-youtube'
import cx from 'classnames'
import commonStyles from './Common.scss'
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
  content: React.PropTypes.array.isRequired,
  device: React.PropTypes.string,
  styles: React.PropTypes.object
}

Youtube.defaultProps = {
  content: [],
  device: '',
  styles: {}
}

export const AlignedYoutube = BlockAlignmentWrapper(Youtube)
