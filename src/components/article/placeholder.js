import LogoIcon from '../../../static/asset/icon-placeholder.svg'
import mq from '../../utils/media-query'
import React from 'react'
import styled, { css } from 'styled-components'

const mockStyle = css`
  background-color: rgba(191, 191, 191, 0.5);
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
    max-width: 1024px;
  `}

  ${mq.hdOnly`
    max-width: 1440px;
  `}
`

const IntroductionContainer = styled.div`
  margin: 0 auto 80px auto;
  ${mq.mobileOnly`
    margin: 0 24px 80px 24px;
  `};
  ${mq.tabletOnly`
    width: 556px;
  `};
  ${mq.desktopAndAbove`
    width: 664px;
  `};
`

const TitleSection = styled.div`
  margin: 0 auto;
  ${mq.mobileOnly`
    margin: 0 24px;
  `};
  ${mq.tabletOnly`
    width: 556px;
  `};
  ${mq.desktopAndAbove`
    width: 665px;
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
