import React from 'react'
import soothScroll from 'smoothscroll'
import { Link } from 'react-router'
import styles from './MobileArticleTools.scss'
import { LINK_PREFIX } from '../../../constants/link-prefix'
import BackToTopicIcon from '../../../../static/asset/article-back-to-topic-mobile.svg'
import BackToTopIcon from '../../../../static/asset/article-back-to-top-mobile.svg'
import { CSSTransitionGroup } from 'react-transition-group'

const BackToTopBtn = () => (
  <div className={styles['back-to-top-btn']} onClick={() => soothScroll(0)}>
    <img src={BackToTopIcon} />
  </div>
)

const BackToTopicBtn = (props) => (
  <Link to={`${LINK_PREFIX.TOPICS}${props.topicSlug}`} title={props.topicTitle}>
    <div className={styles['back-to-topic-btn']}>
      <img src={BackToTopicIcon} />
    </div>
  </Link>
)

BackToTopicBtn.propTypes = {
  topicSlug: React.PropTypes.string.isRequired,
  topicTitle: React.PropTypes.string.isRequired
}

class MobileArticleTools extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      toShow: props.toShow
    }

    this.showTools = this._updateToShowState.bind(this, true)
    this.hideTools = this._updateToShowState.bind(this, false)
  }

  _updateToShowState(toShow) {
    this.setState({
      toShow
    })
  }

  render() {
    const { topicTitle, topicSlug } = this.props
    const { toShow } = this.state
    return (
      <CSSTransitionGroup
        transitionName={{
          enter: styles['effect-enter'],
          enterActive: styles['effect-enter-active'],
          leave: styles['effect-leave'],
          leaveActive: styles['effect-leave-active']
        }}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {!toShow ? null : (
          <div className={styles['article-tools-container']}>
            {!topicSlug ? null : <BackToTopicBtn topicSlug={topicSlug} topicTitle={topicTitle} />}
            <BackToTopBtn />
          </div>
        )}
      </CSSTransitionGroup>
    )
  }
}

MobileArticleTools.propTypes = {
  topicTitle: React.PropTypes.string,
  topicSlug: React.PropTypes.string,
  toShow: React.PropTypes.bool.isRequired
}

MobileArticleTools.defaultProps = {
  topicTitle: '',
  topicSlug: ''
}

export default MobileArticleTools
