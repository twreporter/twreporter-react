import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { H4 } from '@twreporter/react-components/lib/text/headline'
import { P1, P2, P3 } from '@twreporter/react-components/lib/text/paragraph'
import {
  colorGrayscale,
  colorSupportive,
  colorOpacity,
} from '@twreporter/core/lib/constants/color'
import {
  DesktopAndAbove,
  MobileOnly,
  TabletAndAbove,
  TabletAndBelow,
} from '@twreporter/react-components/lib/rwd'
import Link from '@twreporter/react-components/lib/customized-link'
import entityPaths from '@twreporter/core/lib/constants/entity-path'

const TabletAndAboveFlex = styled(TabletAndAbove)`
  ${mq.tabletAndAbove`
    display: flex;
  `}
`

const CardContainer = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: row;
  text-decoration: none;
  &:hover {
    opacity: 0.7;
  }
  ${mq.mobileOnly`
    flex-direction: column;
    width: 75vw;
    max-width: 400px;
  `}
`

const Photo = styled.div`
  max-width: 400px;
  width: 100%;
  height: 100%;
  aspect-ratio: 3 / 2;
  margin-right: 32px;
  background-image: url(${props => props.$bgUrl});
  background-size: cover;
  background-repeat: no-repeat;
  ${mq.tabletOnly`
    margin-right: 24px;
  `}
  ${mq.mobileOnly`
    position: relative;
    margin-right: 0px;
    margin-bottom: 8px;
  `}
`

const AwardBadgeContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 16px 16px 32px 16px;
  background: linear-gradient(
    180deg,
    ${colorOpacity['black_0.8']} 0%,
    ${colorOpacity.white_0} 100%
  );
  background-blend-mode: multiply;
  ${mq.mobileOnly`
    padding: 8px 8px 16px 8px;
    flex-direction: row-reverse;
  `}
`

const AwardBadge = styled.div`
  display: flex;
  padding: 2px 8px;
  border-radius: 40px;
  border: 1px solid ${colorSupportive.pastel};
  box-shadow: 0px 0px 8px 0px ${colorOpacity['black_0.7']};
  color: ${colorSupportive.pastel};
  width: fit-content;
`

const Article = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.div`
  width: 100%;
  color: ${colorGrayscale.gray800};
  margin-bottom: 16px;
  ${mq.mobileOnly`
    color: ${colorGrayscale.white};
    text-shadow: 0px 0px 8px 0px ${colorOpacity['black_0.7']};
    padding: 16px 8px 8px 8px;
    background: linear-gradient(180deg, ${colorOpacity.white_0} 0%, ${
    colorOpacity['black_0.8']
  } 100%);
    background-blend-mode: multiply;
    margin-bottom: 0px;
    position: absolute;
    bottom: 0px;
  `}
`

const Description = styled.div`
  width: 100%;
  color: ${colorGrayscale.gray800};
  p {
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`

const ReviewingCard = ({ slug, reviewWord, title, ogDescription, bgImage }) => {
  const link = {
    to: `${entityPaths.article}${slug}`,
  }
  return (
    <CardContainer {...link}>
      <TabletAndAboveFlex>
        <Photo $bgUrl={bgImage}>
          <AwardBadgeContainer>
            {reviewWord && (
              <AwardBadge>
                <TabletAndBelow>
                  <P3 text={reviewWord} />
                </TabletAndBelow>
                <DesktopAndAbove>
                  <P2 text={reviewWord} />
                </DesktopAndAbove>
              </AwardBadge>
            )}
          </AwardBadgeContainer>
        </Photo>
        <Article>
          <Title>
            <H4 type={H4.Type.ARTICLE} text={title} />
          </Title>
          <Description>
            <P1 text={ogDescription} />
          </Description>
        </Article>
      </TabletAndAboveFlex>
      <MobileOnly>
        <Photo bgUrl={bgImage}>
          <AwardBadgeContainer>
            {reviewWord && (
              <AwardBadge>
                <P3 text={reviewWord} />
              </AwardBadge>
            )}
          </AwardBadgeContainer>
          <Title>
            <H4 type={H4.Type.ARTICLE} text={title} />
          </Title>
        </Photo>
        <Description>
          <P2 text={ogDescription} />
        </Description>
      </MobileOnly>
    </CardContainer>
  )
}

ReviewingCard.propTypes = {
  slug: PropTypes.string,
  reviewWord: PropTypes.string,
  title: PropTypes.string,
  ogDescription: PropTypes.string,
  bgImage: PropTypes.string,
}

export default ReviewingCard
