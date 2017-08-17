import React from 'react'
import { Link } from 'react-router'
import styles from './DesktopArticleTools.scss'
import BackToTopicIcon from '../../../../static/asset/article-back-to-topic.svg'
import { CSSTransitionGroup } from 'react-transition-group'
import { LINK_PREFIX } from '../../../constants/link-prefix'

const IconContainer = (props) => (
  <div className={styles['icon-container']}>
    {props.children}
  </div>
)

const BackToTopic = (props) => (
  <Link to={`${LINK_PREFIX.TOPICS}${props.topicSlug}`} title={props.topicTitle}>
    <div className={styles['back-to-topic']}>
      <span>回到專題</span>
      <IconContainer>
        <img src={BackToTopicIcon} />
      </IconContainer>
    </div>
  </Link>
)

BackToTopic.propTypes = {
  topicSlug: React.PropTypes.string.isRequired,
  topicTitle: React.PropTypes.string.isRequired
}


class DesktopArticleTools extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      toShow: props.isDesktopToolsDisplayed
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
          {!topicSlug ? null : <BackToTopic topicSlug={topicSlug} topicTitle={topicTitle} />}
        </div>
      )}
      </CSSTransitionGroup>
    )
  }
}

DesktopArticleTools.propTypes = {
  topicTitle: React.PropTypes.string,
  topicSlug: React.PropTypes.string,
  isDesktopToolsDisplayed: React.PropTypes.bool.isRequired
}

DesktopArticleTools.defaultProps = {
  topicTitle: '',
  topicSlug: ''
}

export default DesktopArticleTools
