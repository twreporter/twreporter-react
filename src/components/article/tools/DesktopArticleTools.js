import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import Link from 'react-router/lib/Link'
import { LINK_PREFIX } from '../../../constants/link-prefix'
import BackToTopicIcon from '../../../../static/asset/article-back-to-topic.svg'
import BookmarkAddedIcon from '../../../../static/asset/added-bookmark-desktop.svg'
import BookmarkUnaddedIcon from '../../../../static/asset/add-bookmark-desktop.svg'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import styles from './DesktopArticleTools.scss'

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
  topicSlug: PropTypes.string.isRequired,
  topicTitle: PropTypes.string.isRequired
}

class DesktopArticleTools extends React.PureComponent {
  render() {
    const { topicTitle, topicSlug, isBookmarked, toShow } = this.props
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
          <BookmarkFrame onClick={this.props.handleOnClickBookmark}>
            <BookmarkImg showUp={!isBookmarked} src={BookmarkUnaddedIcon} />
            <BookmarkImg showUp={isBookmarked} src={BookmarkAddedIcon} />
          </BookmarkFrame>
        </div>
      )}
      </CSSTransitionGroup>
    )
  }
}

DesktopArticleTools.propTypes = {
  isBookmarked: PropTypes.bool.isRequired,
  toShow: PropTypes.bool.isRequired,
  topicSlug: PropTypes.string,
  topicTitle: PropTypes.string
}

DesktopArticleTools.defaultProps = {
  topicSlug: '',
  topicTitle: ''
}

export default DesktopArticleTools
