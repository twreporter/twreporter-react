import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import Link from 'react-router/lib/Link'
import { LINK_PREFIX } from '../../../constants/link-prefix'
import BackToTopicIcon from '../../../../static/asset/article-back-to-topic-mobile.svg'
import BackToTopIcon from '../../../../static/asset/article-back-to-top-mobile.svg'
import PropTypes from 'prop-types'
import React from 'react'
import soothScroll from 'smoothscroll'
import styled from 'styled-components'
import styles from './MobileArticleTools.scss'
import { BookmarkWidget } from '@twreporter/registration'

const buttonWidth = 52
const buttonHeight = 52

const IconContainer = styled.div`
  position: relative;
  border-radius: 50%;
  width: ${buttonWidth}px;
  height: ${buttonHeight}px;
  display: block;
  background-color: rgba(255, 255, 255, .8);
  overflow: hidden;
  cursor: pointer;
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const SubsequentIconContainer = IconContainer.extend`
  margin-bottom: 20px;
`

const BackToTopBtn = () => (
  <IconContainer onClick={() => soothScroll(0)}>
    <BackToTopIcon />
  </IconContainer>
)

const BackToTopicBtn = (props) => (
  <Link to={`${LINK_PREFIX.TOPICS}${props.topicSlug}`} title={props.topicTitle}>
    <SubsequentIconContainer>
      <BackToTopicIcon />
    </SubsequentIconContainer>
  </Link>
)

BackToTopicBtn.propTypes = {
  topicSlug: PropTypes.string.isRequired,
  topicTitle: PropTypes.string.isRequired
}

class MobileArticleTools extends React.PureComponent {
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
            {!topicSlug ? null : <BackToTopicBtn topicSlug={topicSlug} topicTitle={topicTitle} />}
            <BookmarkWidget
              bookmarkData={bookmarkData}
              slug={slug}
              mobile
            />
            <BackToTopBtn />
          </div>
        )}
      </CSSTransitionGroup>
    )
  }
}

MobileArticleTools.propTypes = {
  toShow: PropTypes.bool.isRequired,
  topicTitle: PropTypes.string,
  topicSlug: PropTypes.string,
  bookmarkData: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired
}

MobileArticleTools.defaultProps = {
  topicTitle: '',
  topicSlug: ''
}

export default MobileArticleTools
