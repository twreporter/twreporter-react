import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'

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
import { useStore } from '@twreporter/react-components/lib/hook'
import twreporterRedux from '@twreporter/redux'

// components
import EmptyBox from './empty-box'
import ReviewingCard from './reviewing-card'

// lodash
import get from 'lodash/get'

const _ = {
  get,
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

const { actions, reduxStateFields } = twreporterRedux
const { getPostReviews } = actions

const ReviewingArticleSection = () => {
  const [showMore, setShowMore] = useState(false)
  const [reviewingArticles, setReviewingArticles] = useState([])
  const [showingReviewingArticle, setShowingReviewingArticle] = useState([])
  const [totalReviewingArticle, setTotalReviewingArticle] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [state, dispatch] = useStore()

  const handleShowMoreClick = () => {
    setShowMore(false)
    setShowingReviewingArticle(reviewingArticles)
  }

  useEffect(() => {
    setIsLoading(true)
    const jwt = _.get(state, [reduxStateFields.auth, 'accessToken'])
    dispatch(getPostReviews(jwt)).then(res => {
      const reviews = _.get(res, ['payload', 'data', 'data'], [])
      const formattedReviews = reviews.map(review => {
        const { slug, reviewWord, title } = review
        const { url: bgImage } = _.get(
          review,
          ['og_image', 'resized_targets', 'mobile'],
          ''
        )
        const ogDescription = _.get(review, ['og_description'], '')
        return {
          slug,
          reviewWord,
          title,
          bgImage,
          ogDescription,
        }
      })
      setTotalReviewingArticle(formattedReviews.length)
      setReviewingArticles(formattedReviews)
      if (formattedReviews.length > 3) {
        setShowingReviewingArticle(formattedReviews.slice(0, 3))
        setShowMore(true)
      } else {
        setShowingReviewingArticle(formattedReviews)
      }
      setIsLoading(false)
    })
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
