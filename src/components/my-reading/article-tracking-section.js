import React, { useState, useRef, useEffect, useContext } from 'react'
import { styled } from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useLocation } from 'react-router-dom'

// @twreporter
import { Title2 } from '@twreporter/react-components/lib/title-bar'
import {
  DesktopAndAbove,
  TabletAndBelow,
} from '@twreporter/react-components/lib/rwd'
import { Arrow } from '@twreporter/react-components/lib/icon'
import { IconButton } from '@twreporter/react-components/lib/button'
import mq from '@twreporter/core/lib/utils/media-query'

// components
import { ArticleTrackingCard } from './article-tracking-card'

// context
import { CoreContext } from '../../contexts'

// lodash
import throttle from 'lodash/throttle'

const _ = {
  throttle,
}

const ArticleTrackingContainer = styled.div`
  width: 100%;
`

const TrackingCardList = styled.div`
  /* icon width = 24px, gap = 16px */
  /*
  |
  | <left icon 24px> | <gap 16px> | <cards...> | <gap 16px> | <right icon 24px> |
  |
  */
  width: calc((16px + 24px) + 100% + (16px + 24px));
  margin-left: -40px;
  margin-top: 24px;
  display: grid;
  grid-template-columns: 24px 1fr 24px;
  grid-column-gap: 16px;
  align-items: center;
  .swiper-container {
    width: 100%;
  }
  .swiper-slide {
    height: auto;
  }
`

const TabletAndBelowTrackingCardList = styled.div`
  width: 100vw;
  height: fit-content;
  margin-left: -24px;
  margin-top: 24px;
  ${mq.tabletOnly`
    margin-left: -${props => props.$marginLeft}px;
  `}
  .swiper-container {
    width: 100%;
  }
  .swiper-slide {
    width: 280px;
  }
`

const ArrowButton = styled(IconButton)`
  visibility: ${props => (props.$hidden ? 'hidden' : '')};
`

const LoadingCardContainer = styled.div`
  width: 100%;
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 16px;
`

const fakeData = {
  publishDate: '2024-05-16',
  trackingTitle: '大法官宣告《原住民身分法》違憲大法官宣告《原住民身分法》違憲',
  trackingContent:
    '原保地專題發揮影響力！9月17日最高法院民事大法庭裁定統一見解，直指「非原住民以借名登記、簽訂買賣契約、設定地上權及所有權轉移的行為，違反禁止規定，應屬',
  trackingArticleTitle:
    '掠奪原保地：玩法賣地，你不知道的露營和溫泉區亂象掠奪原保地：玩法賣地，你不知道的露營和溫泉區亂象',
}

export const ArticleTrackingSection = () => {
  const [swiper, setSwiper] = useState(null)
  const [trackingArticles, setTrackingArticles] = useState([])
  const [isSlideBeginning, setIsSlideBeginning] = useState(true)
  const [isSlideEnd, setIsSlideEnd] = useState(false)
  const containerRef = useRef(null)
  const [marginLeft, setMarginLeft] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { releaseBranch } = useContext(CoreContext)

  const cardPerRow = 3

  // for UI test
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const total = Number(params.get('total')) || 1

  useEffect(() => {
    setTrackingArticles(Array(total).fill(fakeData))
    setTimeout(() => setIsLoading(false), 1000)
  }, [total])

  const handleArrowClick = direction => {
    if (direction === Arrow.Direction.LEFT) {
      swiper.slidePrev()
    } else {
      swiper.slideNext()
    }
  }

  const trackingCardsJSX = (forDesktop = true, cardPerRow = 3) => {
    let cardsArr = []
    if (forDesktop && trackingArticles.length % cardPerRow !== 0) {
      // fill groups with insufficient number of slides
      cardsArr = [
        ...trackingArticles,
        ...Array(cardPerRow - (trackingArticles.length % cardPerRow)).fill(
          'blank'
        ),
      ]
    } else {
      cardsArr = trackingArticles
    }
    return cardsArr.map((data, idx) => {
      if (data === 'blank') {
        return <SwiperSlide key={idx} />
      } else {
        return (
          <SwiperSlide key={idx}>
            <ArticleTrackingCard {...data} isLoading={false} />
          </SwiperSlide>
        )
      }
    })
  }

  const onSwiperSlideChange = swiper => {
    if (swiper.isEnd) {
      setIsSlideEnd(true)
      setIsSlideBeginning(false)
    } else if (swiper.isBeginning) {
      setIsSlideEnd(false)
      setIsSlideBeginning(true)
    } else {
      setIsSlideEnd(false)
      setIsSlideBeginning(false)
    }
  }

  const onSwiperInit = swiper => {
    if (swiper.isEnd && swiper.isBeginning) {
      setIsSlideBeginning(true)
      setIsSlideEnd(true)
    }
  }

  useEffect(() => {
    const handleResize = _.throttle(() => {
      setMarginLeft(containerRef.current.offsetLeft)
    }, 150)
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <ArticleTrackingContainer ref={containerRef}>
      <Title2 title="報導後續追蹤" />
      {isLoading && (
        <LoadingCardContainer>
          {Array(cardPerRow)
            .fill(0)
            .map((_v, idx) => {
              return <ArticleTrackingCard key={idx} isLoading={true} />
            })}
        </LoadingCardContainer>
      )}
      {!isLoading && trackingArticles.length > 0 && (
        <>
          <DesktopAndAbove>
            <TrackingCardList>
              <ArrowButton
                $hidden={isSlideBeginning}
                iconComponent={
                  <Arrow
                    direction={Arrow.Direction.LEFT}
                    releaseBranch={releaseBranch}
                  />
                }
                onClick={() => handleArrowClick(Arrow.Direction.LEFT)}
              ></ArrowButton>
              <Swiper
                slidesPerView={cardPerRow}
                slidesPerGroup={cardPerRow}
                spaceBetween={16}
                onSwiper={swiper => setSwiper(swiper)}
                onSlideChange={onSwiperSlideChange}
                onAfterInit={onSwiperInit}
              >
                {trackingCardsJSX(true, cardPerRow)}
              </Swiper>
              <ArrowButton
                $hidden={isSlideEnd}
                iconComponent={
                  <Arrow
                    direction={Arrow.Direction.RIGHT}
                    releaseBranch={releaseBranch}
                  />
                }
                onClick={() => handleArrowClick(Arrow.Direction.RIGHT)}
              ></ArrowButton>
            </TrackingCardList>
          </DesktopAndAbove>
          <TabletAndBelow>
            <TabletAndBelowTrackingCardList $marginLeft={marginLeft}>
              {marginLeft > 0 && (
                <Swiper
                  slidesPerView={'auto'}
                  spaceBetween={16}
                  freeMode={true}
                  slidesOffsetBefore={marginLeft}
                  slidesOffsetAfter={marginLeft}
                >
                  {trackingCardsJSX(false)}
                </Swiper>
              )}
            </TabletAndBelowTrackingCardList>
          </TabletAndBelow>
        </>
      )}
    </ArticleTrackingContainer>
  )
}
