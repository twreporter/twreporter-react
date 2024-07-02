import React, { useContext } from 'react'
import { styled } from 'styled-components'
import PropTypes from 'prop-types'
// @twreporter
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import mq from '@twreporter/core/lib/utils/media-query'
import { P1, P2, P3 } from '@twreporter/react-components/lib/text/paragraph'
import { H5 } from '@twreporter/react-components/lib/text/headline'
import { date2yyyymmdd } from '@twreporter/core/lib/utils/date'
import origins from '@twreporter/core/lib/constants/request-origins'
// components
import { Rectangle, MarginBottomType } from '../skeleton'
// context
import { CoreContext } from '../../contexts'

const TrackingCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 24px;
  border: 1px solid ${colorGrayscale.gray300};
  border-radius: 8px;
  gap: 48px;
  justify-content: space-between;
  cursor: pointer;
  ${mq.tabletAndBelow`
    width: 280px;
    height: 317px;
    gap: 0px;
  `}
`

const TrackingContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const TrackingArticleTitleContainer = styled.div`
  width: 100%;
  border-top: 1px solid ${colorGrayscale.gray300};
  padding-top: 16px;
`

const PublishDate = styled(P3)`
  color: ${colorGrayscale.gray600};
`

const TrackingTitle = styled(H5)`
  color: ${colorGrayscale.gray800};
  margin-bottom: 16px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const TrackingContent = styled.div`
  color: ${colorGrayscale.gray700};
  p {
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`

const TrackingArticleTitle = styled.div`
  color: ${colorGrayscale.gray600};
  p {
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`

const LoadingCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 24px;
  border: 1px solid ${colorGrayscale.gray300};
  border-radius: 8px;
  gap: 16px;
  cursor: wait;
  ${mq.tabletAndBelow`
    width: 280px;
    height: 317px;
  `}
  .spacing {
    height: 16px;
  }
`

const LoadingCard = () => {
  return (
    <LoadingCardContainer>
      <div>
        <Rectangle $width={'48px'} $height={'12px'} />
      </div>
      <div>
        <Rectangle
          $width={'100%'}
          $height={'16px'}
          $marginBottom={MarginBottomType.WIDE}
        />
        <Rectangle
          $width={'50%'}
          $height={'16px'}
          $marginBottom={MarginBottomType.WIDE}
        />
      </div>
      <div>
        <Rectangle
          $width={'100%'}
          $height={'12px'}
          $marginBottom={MarginBottomType.WIDE}
        />
        <Rectangle
          $width={'100%'}
          $height={'12px'}
          $marginBottom={MarginBottomType.WIDE}
        />
        <Rectangle
          $width={'100%'}
          $height={'12px'}
          $marginBottom={MarginBottomType.WIDE}
        />
        <Rectangle
          $width={'75%'}
          $height={'12px'}
          $marginBottom={MarginBottomType.WIDE}
        />
      </div>
      <div className="spacing" />
      <div>
        <Rectangle
          $width={'100%'}
          $height={'12px'}
          $marginBottom={MarginBottomType.WIDE}
        />
        <Rectangle
          $width={'100%'}
          $height={'12px'}
          $marginBottom={MarginBottomType.WIDE}
        />
        <Rectangle
          $width={'75%'}
          $height={'12px'}
          $marginBottom={MarginBottomType.WIDE}
        />
      </div>
    </LoadingCardContainer>
  )
}

export const ArticleTrackingCard = ({
  isLoading = true,
  publishDate,
  trackingTitle,
  trackingContent,
  trackingArticleTitle,
  trackingArticleSlug,
}) => {
  const { releaseBranch } = useContext(CoreContext)
  const handleCardOnClick = () => {
    const originsForClient = origins.forClientSideRendering[releaseBranch].main
    window.open(`${originsForClient}/a/${trackingArticleSlug}`, '_blank')
  }

  if (isLoading) {
    return <LoadingCard />
  }
  return (
    <TrackingCardContainer onClick={handleCardOnClick}>
      <TrackingContentContainer>
        <PublishDate text={date2yyyymmdd(publishDate, '/')} />
        <TrackingTitle text={trackingTitle} />
        <TrackingContent>
          <P1 text={trackingContent}></P1>
        </TrackingContent>
      </TrackingContentContainer>
      <TrackingArticleTitleContainer>
        <TrackingArticleTitle>
          <P2 text={trackingArticleTitle} />
        </TrackingArticleTitle>
      </TrackingArticleTitleContainer>
    </TrackingCardContainer>
  )
}

ArticleTrackingCard.propTypes = {
  isLoading: PropTypes.bool,
  publishDate: PropTypes.string.isRequired,
  trackingTitle: PropTypes.string.isRequired,
  trackingContent: PropTypes.string.isRequired,
  trackingArticleTitle: PropTypes.string.isRequired,
  trackingArticleSlug: PropTypes.string.isRequired,
}
