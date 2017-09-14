import React from 'react'
import BackToTopicIcon from '../../../../static/asset/article-back-to-topic.svg'
import styles from './DesktopArticleTools.scss'
import styled from 'styled-components'
import BookmarkRedIcon from '../../../../static/asset/bookmark-red.svg'
import BookmarkGoldIcon from '../../../../static/asset/bookmark-gold.svg'
import { CSSTransitionGroup } from 'react-transition-group'
import { LINK_PREFIX } from '../../../constants/link-prefix'
import { Link } from 'react-router'

const ToolFrame = styled.div`
  box-sizing: border-box;
  margin-top: 10px;
`

const BookmarkFrame = ToolFrame.extend`
  cursor: pointer;
  position: relative;
`

const BookmarkImg = styled.img`
  opacity: ${props => (props.showUp ? 1 : 0 )};
  transition: opacity 200ms linear;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
`

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
      toShow: props.toShow
    }
    this.showTools = this._updateToShowState.bind(this, true)
    this.hideTools = this._updateToShowState.bind(this, false)
    this.handleOnClickBookmark = this._handleOnClickBookmark.bind(this)
  }

  _updateToShowState(toShow) {
    this.setState({
      toShow
    })
  }

  _handleOnClickBookmark() {
    this.props.onClickBookmark()
  }

  render() {
    const { topicTitle, topicSlug, bookmarkListed } = this.props
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
          <BookmarkFrame onClick={this.handleOnClickBookmark}>
            <BookmarkImg showUp={!bookmarkListed} src={BookmarkGoldIcon} />
            <BookmarkImg showUp={bookmarkListed} src={BookmarkRedIcon} />
          </BookmarkFrame>
        </div>
      )}
      </CSSTransitionGroup>
    )
  }
}
DesktopArticleTools.propTypes = {
  topicTitle: React.PropTypes.string,
  topicSlug: React.PropTypes.string,
  toShow: React.PropTypes.bool.isRequired,
  onClickBookmark: React.PropTypes.func.isRequired,
  bookmarkListed: React.PropTypes.bool.isRequired
}

DesktopArticleTools.defaultProps = {
  topicTitle: '',
  topicSlug: ''
}

export default DesktopArticleTools
