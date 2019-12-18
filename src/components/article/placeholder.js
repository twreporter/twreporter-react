import { articleLayout as layout } from '../../themes/layout'
import LogoIcon from '../../../static/asset/icon-placeholder.svg'
import mq from '../../utils/media-query'
import React from 'react'
import styled, { css } from 'styled-components'

const mockStyle = css`
  background-color: rgba(191, 191, 191, .5);
  box-shadow: 0px 0px 3px rgba(#666666, 0.05);
  opacity: 0.9;
`

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;

  ${mq.tabletOnly`
    max-width: 768px;
  `}

  ${mq.desktopOnly`
    max-width: 992px;
  `}

  ${mq.hdOnly`
    max-width: 1200px;
  `}
`

const IntroductionContainer = styled.div`
  margin: 0 auto 80px auto;
  ${mq.mobileOnly`
    margin: 0 24px 80px 24px;
  `};
  ${mq.tabletOnly`
    width: ${layout.tablet.width.small}px;
  `};
  ${mq.desktopAndAbove`
    width: ${layout.desktop.width.small}px;
  `};
`

const TitleSection = styled.div`
  margin: 0 auto;
  ${mq.mobileOnly`
    margin: 0 24px;
  `};
  ${mq.tabletOnly`
    width: ${layout.tablet.width.small}px;
  `};
  ${mq.desktopAndAbove`
    width: ${layout.desktop.width.small}px;
  `};
`

const Title1 = styled.div`
  ${mockStyle}
  height: 1.8rem;
  margin-top: 0.5rem;
  margin-bottom: 0.7rem;
`

const Title2 = styled.div`
  ${mockStyle}
  height: 1.8rem;
  width: 60%;
  margin-bottom: 1.5rem;
`

const MockAuthor = styled.div`
  ${mockStyle}
  height: 1rem;
  width: 38%;
`

const LeadingImage = styled.div`
  width: 80%;
  height: 370px;
  margin: 1.5rem auto;
  ${mockStyle}
  display: flex;
  justify-content: center;
  align-items: center;
`

const MockTextLine = styled.div`
  ${mockStyle}
  height: 1rem;
  width: 100%;
  margin-bottom: 1rem;
  &:last-of-type {
    width: 70%;
  }
`

export default function ArticlePlaceholder() {
  return (
    <Container>
      <TitleSection>
        <Title1 />
        <Title2 />
        <MockAuthor />
      </TitleSection>
      <LeadingImage>
        <LogoIcon />
      </LeadingImage>
      <IntroductionContainer>
        <MockTextLine />
        <MockTextLine />
        <MockTextLine />
      </IntroductionContainer>
    </Container>
  )
}
