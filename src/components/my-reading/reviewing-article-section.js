import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useLocation } from 'react-router-dom'

// @twreporter
import { Title2 } from '@twreporter/react-components/lib/title-bar'
import Divider from '@twreporter/react-components/lib/divider'
import { TextButton } from '@twreporter/react-components/lib/button'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { Arrow } from '@twreporter/react-components/lib/icon'
import {
  TabletAndAbove,
  MobileOnly,
} from '@twreporter/react-components/lib/rwd'
import FetchingWrapper from '@twreporter/react-components/lib/is-fetching-wrapper'

// components
import EmptyBox from './empty-box'
import ReviewingCard from './reviewing-card'

const fakeArticle = {
  slug: 'oppose-introducing-indian-migrant-workers',
  reviewWord: '好看的喔',
  title: '暌違20年再開國門，歧視移工爭議風波如何因印度再現？',
  ogDescription:
    '週末，台灣首見「反對增加新移工國」抗議集會。當台灣人對印度的不理解、勞動階級對政府的不信任互相加乘，彷彿重返1992年場景，複製了過往對東南亞各國的偏見，也象徵台印間的合作，確實需要更多配套與交流。',
  bgImage:
    'https://www.twreporter.org/images/20231204041907-82c3b4ae9a893d08b176a96f5476dbdd-tablet.jpg',
}

const ReviewingArticleContainer = styled.div`
  width: 100%;
`

const ReviewingArticleList = styled.div`
  width: 100%;
  padding: 24px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .swiper-container {
    width: 100vw;
    margin-left: -24px;
  }
  .swiper-slide {
    width: 75vw;
    max-width: 400px;
  }
`

const DividerContainer = styled.div`
  margin: 16px 0px;
`

const MoreButton = styled(TextButton)`
  color: ${colorGrayscale.gray800};
`

const Loading = styled.div``
const LoadingMask = FetchingWrapper(Loading)

const ReviewingArticleSection = () => {
  const [showMore, setShowMore] = useState(false)
  const [reviewingArticles, setReviewingArticles] = useState([])
  const [showingReviewingArticle, setShowingReviewingArticle] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { search } = useLocation()
  const param = new URLSearchParams(search)
  const totalReviewingArticle = Number(param.get('total')) || 0

  const generateFakeData = length => {
    return Array(length).fill(fakeArticle)
  }

  const handleShowMoreClick = () => {
    setShowMore(false)
    setShowingReviewingArticle(reviewingArticles)
  }

  useEffect(() => {
    setIsLoading(true)
    const fakeData = generateFakeData(totalReviewingArticle)
    setReviewingArticles(fakeData)
    if (fakeData.length > 3) {
      setShowingReviewingArticle(fakeData.slice(0, 3))
      setShowMore(true)
    } else {
      setShowingReviewingArticle(fakeData)
    }
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  return (
    <ReviewingArticleContainer>
      <Title2 title="報導回顧" subtitle="和我們一起與議題持續對話" />
      <LoadingMask isFetching={isLoading} showSpinner={isLoading}>
        {totalReviewingArticle === 0 && (
          <EmptyBox type={EmptyBox.Type.ReviewingArticle} />
        )}
        {showingReviewingArticle.length > 0 && (
          <>
            <TabletAndAbove>
              <ReviewingArticleList>
                {showingReviewingArticle.map((article, idx) => {
                  return (
                    <div key={idx}>
                      <ReviewingCard {...article} />
                      <DividerContainer>
                        <Divider />
                      </DividerContainer>
                    </div>
                  )
                })}
                {showMore && (
                  <MoreButton
                    text="展開更多"
                    rightIconComponent={<Arrow direction="down" />}
                    onClick={handleShowMoreClick}
                  />
                )}
              </ReviewingArticleList>
            </TabletAndAbove>
            <MobileOnly>
              <ReviewingArticleList>
                <Swiper
                  slidesPerView={'auto'}
                  spaceBetween={24}
                  freeMode={true}
                  slidesOffsetBefore={24}
                  slidesOffsetAfter={24}
                >
                  {reviewingArticles.map((article, idx) => (
                    <SwiperSlide key={idx}>
                      <ReviewingCard {...article} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </ReviewingArticleList>
            </MobileOnly>
          </>
        )}
      </LoadingMask>
    </ReviewingArticleContainer>
  )
}

export default ReviewingArticleSection
