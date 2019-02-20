import { articleLayout } from '../../../themes/layout'
import { colors, typography }  from '../../../themes/common-variables'
import { LINK_PREFIX } from '../../../constants/link-prefix'
import BackToTopicIcon from '../../../../static/asset/article-back-to-topic.svg'
import BookmarkWidget from '../../../containers/BookmarkWidget'
import Link from 'react-router-dom/Link'
import predefinedPropTypes from '../../../constants/prop-types'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const toolsOffset = 20

const Container = styled.div`
  display: inline-block;
  position: fixed;
  right: 50%;
  bottom: 50%;
  color: ${colors.secondaryColor};
  font-size: ${typography.font.size.xSmall};
  z-index: 999;
  transform: translate(${(articleLayout.desktop.width.large - toolsOffset)/2 + 20}px, -50%);
  visibility: ${(props) => props.toShow ? 'visible' : 'hidden'};
  opacity: ${(props) => props.toShow ? 1 : 0};
  transition: opacity 0.5s linear;

  a, a:visited, a:link, a:active {
    color: ${colors.secondaryColor};
    font-size: ${typography.font.size.xSmall};
  }
`

const WidgetContainer = styled.div`
  box-sizing: border-box;
  margin-top: 10px;
  text-align: center;
`

const IconContainer = styled.div`
  width: 100%;
  text-align: center;
  svg {
    width: 20px;
  }
`

const BackToTopicContainer = styled.div`
  span {
    display: block;
    margin-bottom: 10px;
    font-weight: $font-weight-normal;
  }
`

const BackToTopic = (props) => (
  <Link to={`${LINK_PREFIX.TOPICS}${props.topicSlug}`} title={props.topicTitle}>
    <BackToTopicContainer>
      <span>回到專題</span>
      <IconContainer>
        <BackToTopicIcon />
      </IconContainer>
    </BackToTopicContainer>
  </Link>
)

BackToTopic.propTypes = {
  topicSlug: PropTypes.string.isRequired,
  topicTitle: PropTypes.string.isRequired
}

class DesktopArticleTools extends React.PureComponent {
  render() {
    const {
      articleMetaForBookmark,
      topicTitle,
      topicSlug,
      toShow
    } = this.props

    return (
      <Container
        toShow={toShow}
      >
        {!topicSlug ? null : <BackToTopic topicSlug={topicSlug} topicTitle={topicTitle} />}
        <WidgetContainer>
          <BookmarkWidget
            articleMeta={articleMetaForBookmark}
          />
        </WidgetContainer>
      </Container>
    )
  }
}

DesktopArticleTools.propTypes = {
  toShow: PropTypes.bool.isRequired,
  topicSlug: PropTypes.string,
  topicTitle: PropTypes.string,
  articleMetaForBookmark: predefinedPropTypes.articleMetaForBookmark,
  slug: PropTypes.string.isRequired
}

DesktopArticleTools.defaultProps = {
  topicSlug: '',
  topicTitle: ''
}

export default DesktopArticleTools
