import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import renderTopicContent, { Paragraph } from './render-content'
import {
  colorGrayscale,
  colorBrand,
} from '@twreporter/core/lib/constants/color'

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 72px;
  padding-bottom: 40px;
`

const Section = styled.div`
  position: relative;
  font-size: 18px;
  width: 38em;
  max-width: 90%;
  a {
    cursor: pointer;
    border-bottom: 1px ${colorBrand.heavy} solid;
    transition: 100ms color ease;
    position: relative;
    color: ${colorGrayscale.gray900};
    &:hover {
      color: ${colorBrand.heavy};
    }
  }
`

const TopicDescription = styled(Section)`
  margin: 0 auto;
  padding-bottom: 40px; /* distacne to red line */
  /* horizontal red line */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 200px;
    margin: auto;
    border-top: 2px solid ${colorBrand.heavy};
  }
`

const TeamDescription = styled(Section)`
  margin: 40px auto 0 auto;
  font-size: 15px;
  /* overwrite paragraph styles */
  ${Paragraph} {
    font-size: 15px;
    color: ${colorGrayscale.gray600};
    margin: 0 auto;
  }
`

const Description = props => {
  const { topicDescription, teamDescription } = props
  const topicDescElements = renderTopicContent(topicDescription)
  const teamDescElements = renderTopicContent(teamDescription)
  if (topicDescElements.length > 0 || teamDescElements.length > 0) {
    return (
      <Container>
        {topicDescElements.length > 0 ? (
          <TopicDescription>{topicDescElements}</TopicDescription>
        ) : null}
        {teamDescElements.length > 0 ? (
          <TeamDescription>{teamDescElements}</TeamDescription>
        ) : null}
      </Container>
    )
  }
  return null
}

Description.propTypes = {
  topicDescription: PropTypes.array,
  teamDescription: PropTypes.array,
}

Description.defaultProps = {
  topicDescription: [],
  teamDescription: [],
}

export default Description
