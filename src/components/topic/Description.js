import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { lineHeight, typography, colors } from '../../themes/common-variables'

const redLineDistance = '40px'

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
`

const TeamDescriptiton = styled.div`
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 38rem;
  max-width: 90%;
  font-size: ${typography.font.size.small};
  color: ${colors.gray.gray50};
  line-height: ${lineHeight.linHeightLarge};
  margin-top: 40px;
  p {
    white-space: pre-wrap;
  }
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
`

const Description = (props) => {
  const { topicDescription, teamDescription } = props
  return (
    <Container>
      <TopicDescription dangerouslySetInnerHTML={{ __html: topicDescription }} />
      <TeamDescriptiton  dangerouslySetInnerHTML={{ __html: teamDescription }} />
    </Container>
  )
}

Description.propTypes = {
  topicDescription: PropTypes.string.isRequired,
  teamDescription: PropTypes.string.isRequired
}

export default Description
