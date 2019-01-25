import React from 'react'
import YoutubePlayer from 'react-youtube'
import constStyledComponents from '../../constants/styled-components'
import getArticleComponent from '../article/getArticleComponent'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { lineHeight, typography, colors } from '../../themes/common-variables'
// lodash
import get from 'lodash/get'

const fontSize = 'medium'
const redLineDistance = '40px'
const contentSize = 'small'

const _ = {
  get
}

const StyledTopicComponent = constStyledComponents.ResponsiveContainerForAritclePage.extend`
  font-size: ${(props) => {
    let fontSize = typography.font.size.base
    switch(props.fontSize) {
      case 'small':
        fontSize = typography.font.size.xSmall
        break
      case 'large':
        fontSize = typography.font.size.larger
        break
      default:
        break
    }
    return fontSize
  }};

  margin-bottom: 40px;
`

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 72px;
  padding-bottom: 40px;
`

const TopicDescription = styled.div`
  position: relative;
  padding-bottom: ${redLineDistance};
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  font-size: ${typography.font.size.base};
  white-space: pre-wrap;
  line-height: ${lineHeight.linHeightLarge};
  color: ${colors.gray.gray15};

  p {
    margin-bottom: 1.5em;
  }

  a {
      border-bottom: 1px ${colors.primaryColor} solid;
      cursor: pointer;
      transition: 0.5s color ease;
      position: relative;
      color: ${colors.gray.gray15};
      &:hover {
        color: ${colors.primaryColor};
      }
  }

  iframe {
    max-width: 100%;
  }

  /* horizontal rule */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 200px;
    margin: auto;
    border-top: 2px solid ${colors.red.rustyRed};
  }
  /* Since the component corresponding to unstyled type uses a className to address text-align as justify.
   * Boost the specificity of the override style by && instead of & here.
   */
  && * {
    font-size: ${typography.font.size.base};
    line-height: ${lineHeight.lineHeightLarge};
    margin-bottom: 1.5em;
    text-align: center;
  }
`

const TeamDescription = styled.div`
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 38rem;
  max-width: 90%;
  font-size: ${typography.font.size.small};
  color: ${colors.gray.gray50};
  line-height: ${lineHeight.linHeightLarge};
  margin-top: 40px;
  a {
    border-bottom: 1px ${colors.primaryColor} solid;
    cursor: pointer;
    transition: 0.5s color ease;
    position: relative;
    color: ${colors.gray.gray50};
    &:hover {
      color: ${colors.primaryColor};
    }
  }
  /* Since the component corresponding to unstyled type uses a className to address text-align as justify.
   * Boost the specificity of the override style by && instead of & here.
   */
  && * {
    font-size: ${typography.font.size.small};
    color: ${colors.gray.gray50};
    line-height: ${lineHeight.lineHeightLarge};
    text-align: center;
    margin-bottom: 0;
  }
`

const BlockQuote = styled.blockquote`
  font-style: italic;
  padding-left: 1rem;
  line-height: 1.85;
  font-size: 1rem;
  font-weight: 300;
  white-space: pre-wrap;
  margin: 0 1.33rem 0 1.33rem;
`

const YoutubeContainer = styled.div`
  width: 100%;
  &&& * {
    margin-bottom: 0;
  }
`

const YoutubeIframeContainer = styled.div`
  max-width: 100%;
  margin-bottom: 0;
  iframe,object,embed {
    width: 560px;
    height: 315px;
  }
`

const DescTextBlock = styled.div`
  color: #808080;
  font-size: 0.88rem;
  line-height: 1.8;
  margin: 0.94rem 1.33rem 0 1.33rem;
}
`

const TopicDescriptionJSX = {
  BlockQuote: (content) => {
    return (
      <BlockQuote dangerouslySetInnerHTML={{ __html: _.get(content, [ 0 ], '') }}></BlockQuote>
    )
  },
  Youtube: (content) => {
    let { description, youtubeId } = _.get(content, [ 0 ], {})
    if (!youtubeId) {
      return null
    }
    return (
      <YoutubeContainer>
        <YoutubeIframeContainer>
          <YoutubePlayer videoId={youtubeId} />
        </YoutubeIframeContainer>
        <DescTextBlock>
          {description}
        </DescTextBlock>
      </YoutubeContainer>
    )
  }
}

const TopicTeamJSX = {
  Image: (content) => {
    const imgSrc = _.get(content, [ 0, 'tablet', 'url' ], '')
    return (
      <img src={imgSrc} />
    )
  }
}

const getTopicContent = (data, contentType) => {
  if (Array.isArray(data)) {
    return data.map((ele) => {
      let styles = {}
      let type = ele.type
      let ArticleComponent = null
      let TopicComponent = null
      if (contentType === 'description') {
        switch(type) {
          case 'blockquote':
            TopicComponent = TopicDescriptionJSX.BlockQuote
            break
          case 'youtube':
            TopicComponent = TopicDescriptionJSX.Youtube
            break
          default:
            ArticleComponent = getArticleComponent(type)
        }
      } else if (contentType === 'team') {
        switch(type) {
          case 'image':
            TopicComponent = TopicTeamJSX.Image
            break
          default:
            ArticleComponent = getArticleComponent(type)
        }
      }

      if (!ArticleComponent && !TopicComponent) {
        return null
      }

      if (type === 'embeddedcode') {
        let embeddedContent = _.get(ele, [ 'content', 0 ], {})
        let width = _.get(embeddedContent, 'width')
        let height = _.get(embeddedContent, 'height')
        if (width) {
          styles.width = width
        }
        if (height) {
          styles.minHeight = height
        }
      }
      return (
        <StyledTopicComponent
          key={ele.id}
          fontSize={fontSize}
          style={styles}
          headerOneText={type === 'header-one' ? _.get(ele, 'content.0') : ''}
          size={contentSize}
        >
          {
            ArticleComponent ?
              <ArticleComponent
                alignment={ele.alignment}
                content={ele.content}
                id={ele.id}
                styles={ele.styles}
              />:TopicComponent(_.get(ele, 'content', []))
          }
        </StyledTopicComponent>
      )
    })
  }
}

const Description = (props) => {
  const { topicDescription, teamDescription } = props
  return (
    <Container>
      <TopicDescription>
        {getTopicContent(topicDescription, 'description')}
      </TopicDescription>
      <TeamDescription>
        {getTopicContent(teamDescription, 'team')}
      </TeamDescription>
    </Container>
  )
}

Description.propTypes = {
  topicDescription: PropTypes.array.isRequired,
  teamDescription: PropTypes.array.isRequired
}

export default Description
