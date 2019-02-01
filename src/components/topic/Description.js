import PropTypes from 'prop-types'
import React from 'react'
import YoutubePlayer from 'react-youtube'
import getArticleComponent from '../article/getArticleComponent'
import styled from 'styled-components'
import { lineHeight, typography, colors } from '../../themes/common-variables'
import { screen } from '../../themes/screen' 
// lodash
import get from 'lodash/get'

const mediumFontSize = 'medium'
const redLineDistance = '40px'
const smallContentSize = 'small'

const _ = {
  get
}

const StyledTopicComponent = styled.div`
  font-size: ${props => props.fontSize};   
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
  width: 38rem;
  max-width: 90%;
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
    text-align: center;
    margin: 0 auto 1.5em auto;
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
    margin: 0 auto;
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
  iframe {
    max-width: 100%;
  }
  ${screen.tabletAbove`
    margin: 0 auto;
    iframe {
      width: 560px;
      height: 315px;
    }
  `}
`

const DescTextBlock = styled.div`
  color: #808080;
  font-size: 0.88rem;
  line-height: 1.8;
  margin: 0.94rem 1.33rem 0 1.33rem;
}
`

const TopicJSX = {
  BlockQuote: (props) => {
    return (
      <BlockQuote dangerouslySetInnerHTML={{ __html: _.get(props, [ 'content', 0 ], '') }}></BlockQuote>
    )
  },
  Youtube: (props) => {
    let { description, youtubeId } = _.get(props, [ 'content', 0 ], {})
    if (!youtubeId) {
      return null
    }
    return (
      <YoutubeContainer>
        <YoutubePlayer videoId={youtubeId} />
        <DescTextBlock>
          {description}
        </DescTextBlock>
      </YoutubeContainer>
    )
  },
  Image: (props) => {
    const imgSrc = _.get(props, [ 'content', 0, 'tablet', 'url' ], '')
    return (
      <img src={imgSrc} />
    )
  }
}

const getTopicContent = (data) => {
  if (Array.isArray(data)) {
    return data.map((ele) => {
      let styles = {}
      let type = ele.type
      let Component = null
      switch(type) {
        case 'blockquote':
          Component = TopicJSX.BlockQuote
          break
        case 'youtube':
          Component = TopicJSX.Youtube
          break
        case 'image':
          Component = TopicJSX.Image
          break
        default:
          Component = getArticleComponent(type)
      }

      if (!Component) {
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
          fontSize={mediumFontSize}
          style={styles}
          size={smallContentSize}
        >
          <Component
            alignment={ele.alignment}
            content={ele.content}
            id={ele.id}
            styles={ele.styles}
          />
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
        {getTopicContent(topicDescription)}
      </TopicDescription>
      <TeamDescription>
        {getTopicContent(teamDescription)}
      </TeamDescription>
    </Container>
  )
}

Description.propTypes = {
  topicDescription: PropTypes.array.isRequired,
  teamDescription: PropTypes.array.isRequired
}

export default Description
