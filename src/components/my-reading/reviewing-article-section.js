import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'

// @twreporter
import { Title2 } from '@twreporter/react-components/lib/title-bar'
import Divider from '@twreporter/react-components/lib/divider'
import { TextButton } from '@twreporter/react-components/lib/button'
import {
  colorBrand,
  colorGrayscale,
} from '@twreporter/core/lib/constants/color'
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
  slug: '318-movement-10th-anniversary-10-keywords',
  reviewWord: '好看的喔',
  title: '太陽花10年後──10個值得被記住的關鍵字',
  ogDescription:
    '10年過去，當318運動逐漸成為下一世代眼中的歷史名詞，甚至僅是高中教科書的一小章節，它還有哪些訴求與影響值得被反覆提起？在如今「反黑箱還是反服貿」的爭論下，一起來重探它複雜的運動內涵。',
  bgImage:
    'https://www.twreporter.org/images/20240312105602-6b8b658d6dd37519c5f5d099c227fe05-tablet.jpg',
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
    width: 100%;
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

const FakeDataButton = styled.button`
  margin-left: 2px;
  ${props => (props.isActive ? `color: ${colorBrand.heavy};` : ``)}
`

const ReviewingArticleSection = () => {
  const [totalReviewingArticle, setTotalReviewingArticle] = useState(0)
  const [showMore, setShowMore] = useState(false)
  const [reviewingArticles, setReviewingArticles] = useState([])
  const [showingReviewingArticle, setShowingReviewingArticle] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const generateFakeData = length => {
    return Array(length).fill(fakeArticle)
  }

  const handleShowMoreClick = () => {
    setShowMore(false)
    setShowingReviewingArticle(reviewingArticles)
  }

  const testDataButton = () => {
    const handleClick = e => {
      setTotalReviewingArticle(Number(e.target.value || 0))
    }
    return (
      <div>
        <FakeDataButton
          isActive={totalReviewingArticle === 0}
          value={0}
          onClick={handleClick}
        >
          0
        </FakeDataButton>
        <FakeDataButton
          isActive={totalReviewingArticle === 2}
          value={2}
          onClick={handleClick}
        >
          2
        </FakeDataButton>
        <FakeDataButton
          isActive={totalReviewingArticle === 8}
          value={8}
          onClick={handleClick}
        >
          8
        </FakeDataButton>
      </div>
    )
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
  }, [totalReviewingArticle])

  return (
    <ReviewingArticleContainer>
      <Title2
        title="報導回顧"
        subtitle="和報導者編輯台一起，與議題持續對話"
        renderButton={testDataButton()}
      />
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
