import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import Link from 'react-router/lib/Link'
import { LINK_PREFIX } from '../../../constants/link-prefix'
import BackToTopicIcon from '../../../../static/asset/article-back-to-topic-mobile.svg'
import BackToTopIcon from '../../../../static/asset/article-back-to-top-mobile.svg'
import BookmarkAddedIcon from '../../../../static/asset/added-bookmark-mobile.svg'
import BookmarkUnaddedIcon from '../../../../static/asset/add-bookmark-mobile.svg'
import PropTypes from 'prop-types'
import React from 'react'
import soothScroll from 'smoothscroll'
import styled from 'styled-components'
import styles from './MobileArticleTools.scss'

const buttonWidth = 52
const buttonHeight = 52

const IconContainer = styled.div`
  position: relative;
  border-radius: 50%;
  width: ${buttonWidth}px;
  height: ${buttonHeight}px;
  background-color: rgba(255, 255, 255, .8);
  overflow: hidden;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  cursor: pointer;
`

const SubsequentIconContainer = IconContainer.extend`
  margin-bottom: 20px;
`

const BookmarkImg = styled.img`
  opacity: ${props => (props.showUp ? 1 : 0 )};
  transition: opacity 200ms linear;
`

const BackToTopBtn = () => (
  <IconContainer onClick={() => soothScroll(0)}>
    <img src={BackToTopIcon} />
  </IconContainer>
)

const BackToTopicBtn = (props) => (
  <Link to={`${LINK_PREFIX.TOPICS}${props.topicSlug}`} title={props.topicTitle}>
    <SubsequentIconContainer>
      <img src={BackToTopicIcon} />
    </SubsequentIconContainer>
  </Link>
)

BackToTopicBtn.propTypes = {
  topicSlug: React.PropTypes.string.isRequired,
  topicTitle: React.PropTypes.string.isRequired
}

class MobileArticleTools extends React.PureComponent {
  render() {
    const { topicTitle, topicSlug, toShow, isBookmarked } = this.props
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
            <SubsequentIconContainer onClick={this.props.handleOnClickBookmark}>
              <BookmarkImg showUp={!isBookmarked} src={BookmarkUnaddedIcon} />
              <BookmarkImg showUp={isBookmarked} src={BookmarkAddedIcon} />
            </SubsequentIconContainer>
            <BackToTopBtn />
          </div>
        )}
      </CSSTransitionGroup>
    )
  }
}

MobileArticleTools.propTypes = {
  isBookmarked: PropTypes.bool.isRequired,
  toShow: PropTypes.bool.isRequired,
  topicTitle: PropTypes.string,
  topicSlug: PropTypes.string
}

MobileArticleTools.defaultProps = {
  topicTitle: '',
  topicSlug: ''
}

export default MobileArticleTools
