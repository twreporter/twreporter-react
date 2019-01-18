import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Body } from '../article/Body'
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
  padding-bottom: ${redLineDistance};
  margin-left: auto;
  margin-right: auto;
  color: ${colors.gray.gray15};

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
  margin-left: auto;
  margin-right: auto;
  width: 38rem;
  max-width: 90%;
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

const Description = (props) => {
  const { topicDescription, teamDescription } = props
  return (
    <Container>
      <TopicDescription>
        <Body data={topicDescription} />
      </TopicDescription>
      <TeamDescription>
        <Body data={teamDescription} />
      </TeamDescription>
    </Container>
  ) 
}

Description.propTypes = {
  topicDescription: PropTypes.array.isRequired,
  teamDescription: PropTypes.array.isRequired
}

export default Description
