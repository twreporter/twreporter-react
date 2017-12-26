import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import Link from 'react-router/lib/Link'
import { LINK_PREFIX } from '../../../constants/link-prefix'
import BackToTopicIcon from '../../../../static/asset/article-back-to-topic.svg'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './DesktopArticleTools.scss'
import { BookmarkWidget } from '@twreporter/registration'
import styled from 'styled-components'

const WidgetContainer = styled.div`
  box-sizing: border-box;
  margin-top: 10px;
  text-align: center;
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
        <BackToTopicIcon />
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
    const { topicTitle, topicSlug, toShow, bookmarkData, slug } = this.props
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
          <WidgetContainer>
            <BookmarkWidget
              bookmarkData={bookmarkData}
              slug={slug}
            />
          </WidgetContainer>
        </div>
      )}
      </CSSTransitionGroup>
    )
  }
}

DesktopArticleTools.propTypes = {
  toShow: PropTypes.bool.isRequired,
  topicSlug: PropTypes.string,
  topicTitle: PropTypes.string,
  bookmarkData: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired
}

DesktopArticleTools.defaultProps = {
  topicSlug: '',
  topicTitle: ''
}

export default DesktopArticleTools
