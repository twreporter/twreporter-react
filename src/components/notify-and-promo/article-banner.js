import React, { useState, useContext, useRef, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import localForage from 'localforage'
import * as dayjs from 'dayjs'
// contexts
import { ArticlePromoContext, CoreContext } from '../../contexts'
// components
import { DesktopBanner, MobileBanner } from './notify-banner'
// @twreporter
import {
  DesktopAndAbove,
  TabletAndBelow,
} from '@twreporter/react-components/lib/rwd'
import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'
import { TEN_YEAR_ANNIVERSARY } from '@twreporter/core/lib/constants/feature-flag'
import externalLinks from '@twreporter/core/lib/constants/external-links'

const Box = styled.div`
  visibility: ${props => (props.$show ? 'visible' : 'hidden')};
  ${props => (props.$show ? '' : 'transition: visibility 0.5s linear 0.5s;')}
`
const ArticleBanner = ({
  isExpanded = false,
  isAuthed = false,
  userRole = [],
}) => {
  const { releaseBranch } = useContext(CoreContext)
  const [isShowPromo, setIsShowPromo] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const checkPromoPriority = async () => {
    const webpushPromoStatus = await localForage.getItem('webpush-promo-status')
    return !webpushPromoStatus
  }
  const closePromo = async () => {
    setIsShowPromo(false)
    setIsOpened(false)
    await localForage.setItem(
      'article-promo',
      dayjs()
        .add(10, 'day')
        .format()
    )
  }
  const openPromo = async () => {
    const nextShowDate = await localForage.getItem('article-promo')
    if (nextShowDate && dayjs().isBefore(dayjs(nextShowDate))) {
      return
    }
    const isValid = await checkPromoPriority()
    if (!isValid) {
      return
    }
    setIsShowPromo(true)
    setIsOpened(true)
  }
  const timerId = useRef()
  useEffect(() => {
    if (timerId.current) {
      window.clearTimeout(timerId.current)
    }
    if (isOpened) {
      return
    }
    if (isAuthed) {
      if (userRole.length) {
        const { key } = userRole[0]
        if (
          MEMBER_ROLE[key] === MEMBER_ROLE.action_taker ||
          MEMBER_ROLE[key] === MEMBER_ROLE.trailblazer
        ) {
          return
        }
      }
    }
    if (!isExpanded) {
      timerId.current = window.setTimeout(openPromo, 70000)
    }
  }, [isExpanded, isAuthed, userRole, isOpened])
  const contextValue = { isShowPromo, closePromo }
  const AnniversaryDesktopBanner = (
    <DesktopBanner
      customContext={ArticlePromoContext}
      imageUrl={`https://www.twreporter.org/assets/membership-promo/${releaseBranch}/10_banner_desktop.png`}
      title="我們十歲了！"
      description={[
        '謝謝你關注《報導者》，自2015年9月，我們靠社會大眾的贊助走到了今天。',
        '邀請你點進十週年線上策展，了解我們如何和讀者一起走過這10年。',
      ]}
      buttonText="報導者的十年"
      onClickButton={() =>
        window.open(externalLinks.tenYearAnniversary, '_blank')
      }
    />
  )

  const AnniversaryMobileBanner = (
    <MobileBanner
      customContext={ArticlePromoContext}
      title="我們十歲了！"
      description={[
        '謝謝你關注《報導者》，自2015年9月，我們靠社會大眾的贊助走到了今天。邀請你點進十週年線上策展，了解我們如何和讀者一起走過這10年。',
      ]}
      buttonText="報導者的十年"
      onClickButton={() =>
        window.open(externalLinks.tenYearAnniversary, '_blank')
      }
    />
  )
  return (
    <ArticlePromoContext.Provider value={contextValue}>
      <Box $show={isShowPromo}>
        <DesktopAndAbove>
          {TEN_YEAR_ANNIVERSARY ? (
            AnniversaryDesktopBanner
          ) : (
            <DesktopBanner
              customContext={ArticlePromoContext}
              imageUrl={`https://www.twreporter.org/assets/membership-promo/${releaseBranch}/pencil.png`}
              title="有你才有報導者"
              description={[
                '這篇文章的完成有賴讀者的贊助支持，我們以非營利模式運作，',
                '邀請你加入 3 種支持方案，讓報導者能夠走更長遠的路。',
              ]}
            />
          )}
        </DesktopAndAbove>
        <TabletAndBelow>
          {TEN_YEAR_ANNIVERSARY ? (
            AnniversaryMobileBanner
          ) : (
            <MobileBanner
              customContext={ArticlePromoContext}
              title="有你才有報導者"
              description={[
                '這篇文章有賴讀者的贊助完成，我們以非營利模式運作，邀請你加入 3 種支持方案，讓我們能走更長遠的路。',
              ]}
            />
          )}
        </TabletAndBelow>
      </Box>
    </ArticlePromoContext.Provider>
  )
}

ArticleBanner.propTypes = {
  isExpanded: PropTypes.bool,
  isAuthed: PropTypes.bool,
  userRole: PropTypes.array,
}

export default ArticleBanner
