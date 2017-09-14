import React from 'react'
import soothScroll from 'smoothscroll'
import { Link } from 'react-router'
import styles from './MobileArticleTools.scss'
import styled from 'styled-components'
import { LINK_PREFIX } from '../../../constants/link-prefix'
import BackToTopicIcon from '../../../../static/asset/article-back-to-topic-mobile.svg'
import BackToTopIcon from '../../../../static/asset/article-back-to-top-mobile.svg'
import BookmarkRedIcon from '../../../../static/asset/bookmark-red-mobile.svg'
import BookmarkGoldIcon from '../../../../static/asset/bookmark-gold-mobile.svg'
import { CSSTransitionGroup } from 'react-transition-group'

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

// const BookmarkGroup = () => (
//
// )

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
            {!topicSlug ? null : <BackToTopicBtn topicSlug={topicSlug} topicTitle={topicTitle} />}
            <SubsequentIconContainer onClick={this.handleOnClickBookmark}>
              <BookmarkImg showUp={!bookmarkListed} src={BookmarkGoldIcon} />
              <BookmarkImg showUp={bookmarkListed} src={BookmarkRedIcon} />
            </SubsequentIconContainer>
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
