import Link from 'react-router-dom/Link'
import BackToTopIcon from '../../../../static/asset/article-back-to-top-mobile.svg'
import BackToTopicIcon from '../../../../static/asset/article-back-to-topic-mobile.svg'
import PropTypes from 'prop-types'
import React from 'react'
import soothScroll from 'smoothscroll'
import styled from 'styled-components'
// TODO Add Bookmark widget back with refined modules
// import { BookmarkWidget } from '@twreporter/registration'
import { LINK_PREFIX } from '../../../constants/link-prefix'

const buttonWidth = 52
const buttonHeight = 52

const Container = styled.div`
  display: inline-block;
  position: fixed;
  right: 5%;
  bottom: 3%;
  z-index: 999;
  visibility: ${(props) => props.toShow ? 'visible' : 'hidden'};
  opacity: ${(props) => props.toShow ? 1 : 0};
  transition: opacity 0.5s linear;
`

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

const SubsequentIconContainer = styled(IconContainer)`
  margin-bottom: 20px;
`

const WidgetWrapper = styled.div`
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
    const {
      topicTitle,
      topicSlug,
      toShow
      //bookmarkData,
      //slug
    } = this.props
    return (
      <Container
        toShow={toShow}
      >
        {!topicSlug ? null : <BackToTopicBtn topicSlug={topicSlug} topicTitle={topicTitle} />}
        <WidgetWrapper key="bookmark_widget">
          {/*<BookmarkWidget
            bookmarkData={bookmarkData}
            slug={slug}
            mobile
          />*/}
        </WidgetWrapper>
        <BackToTopBtn key="back_to_top" />
      </Container>
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
