import BackToTopicIcon from '../../../../static/asset/article-back-to-topic.svg'
import Link from 'react-router/lib/Link'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { BookmarkWidget } from '@twreporter/registration'
import { LINK_PREFIX } from '../../../constants/link-prefix'
import { colors, typography }  from '../../../themes/common-variables'
import { screen } from '../../../themes/screen'

const Container = styled.div`
  display: inline-block;
  position: fixed;
  left: 50%;
  top: 30%;
  color: ${colors.articleToolsText};
  font-size: ${typography.font.size.xSmall};
  z-index: 999;
  transform: translate(-487px, -50%);
  visibility: ${(props) => props.toShow ? 'visible' : 'hidden'};
  opacity: ${(props) => props.toShow ? 1 : 0};
  transition: opacity 0.5s linear;

  a, a:visited, a:link, a:active {
    color: ${colors.articleToolsText};
    font-size: ${typography.font.size.xSmall};
  }

  ${screen.overDesktop`
    transform: translate(-522px, -50%);
  `}
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
    const { topicTitle, topicSlug, toShow, bookmarkData, slug } = this.props
    return (
      <Container
        toShow={toShow}
      >
        {!topicSlug ? null : <BackToTopic topicSlug={topicSlug} topicTitle={topicTitle} />}
        <WidgetContainer>
          <BookmarkWidget
            bookmarkData={bookmarkData}
            slug={slug}
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
  bookmarkData: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired
}

DesktopArticleTools.defaultProps = {
  topicSlug: '',
  topicTitle: ''
}

export default DesktopArticleTools
