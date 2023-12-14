import React, { useState, useContext, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import localForage from 'localforage'
import * as dayjs from 'dayjs'
// contexts
import { ArticlePromoContext, CoreContext } from '../../contexts'
// components
import MoreButton from './more'
// @twreporter
import { IconButton } from '@twreporter/react-components/lib/button'
import { Cross } from '@twreporter/react-components/lib/icon'
import {
  DesktopAndAbove,
  TabletAndBelow,
} from '@twreporter/react-components/lib/rwd'
import { H4 } from '@twreporter/react-components/lib/text/headline'
import { P2 } from '@twreporter/react-components/lib/text/paragraph'
import {
  colorGrayscale,
  colorOpacity,
} from '@twreporter/core/lib/constants/color'
import mq from '@twreporter/core/lib/utils/media-query'
import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'
import zIndexConst from '@twreporter/core/lib/constants/z-index'

const boxCss = css`
  display: flex;
  flex-direction: column;
  width: 100vw;
  position: fixed;
  z-index: ${zIndexConst.buttomBanner};
  background-color: ${colorGrayscale.white};
  box-shadow: 0px 0px 24px 0px ${colorOpacity['black_0.1']};
  transform: translateY(${props => (props.show ? 0 : '100%')});
  transition: transform 0.5s ease-in-out;
`

const DesktopBox = styled.div`
  ${boxCss}
  align-items: center;
  justify-content: center;
  bottom: 0;
  padding: 24px;
`
const PencilImg = styled.img`
  width: 222px;
  margin-right: 48px;
`
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`
const Title = styled(H4)`
  color: ${colorGrayscale.gray800};
  @media (min-width: 600px) and (max-width: 1023px) {
    margin: auto;
  }
`
const Description = styled(P2)`
  color: ${colorGrayscale.gray600};
  margin-top: 4px;
  ${mq.tabletAndBelow`
    margin-top: 0;
  `}
`
const DesktopMore = styled(MoreButton)`
  width: 180px;
  align-self: flex-end;
  margin-left: 48px;
`
const CloseButton = styled(IconButton)`
  align-self: end;
`
const FlexRow = styled.div`
  display: flex;
  width: 950px;
`
const DesktopBanner = () => {
  const { isShowPromo, closePromo } = useContext(ArticlePromoContext)
  const { releaseBranch } = useContext(CoreContext)
  const imageUrl = `https://www.twreporter.org/assets/membership-promo/${releaseBranch}/pencil.png`

  return (
    <DesktopBox show={isShowPromo}>
      <CloseButton
        iconComponent={<Cross releaseBranch={releaseBranch} />}
        theme={IconButton.THEME.normal}
        onClick={closePromo}
      />
      <FlexRow>
        <PencilImg src={imageUrl} alt="有你才有報導者" />
        <TextBox>
          <Title text="有你才有報導者" />
          <Description text="這篇文章的完成有賴讀者的贊助支持，我們以非營利模式運作，" />
          <Description text="邀請你加入 3 種支持方案，讓報導者能夠走更長遠的路。" />
        </TextBox>
        <DesktopMore isArticlePage={true} />
      </FlexRow>
    </DesktopBox>
  )
}

// mobile banner
const MobileBox = styled.div`
  ${boxCss}
  bottom: 0px;
  padding: 24px 16px;
`
const FlexGroup = styled.div`
  display: flex;
  justify-content: space-between;
`
const DescriptionBox = styled.div`
  margin: 8px 0;
  @media (min-width: 600px) and (max-width: 1023px) {
    align-self: center;
    margin: 16px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 360px;
    text-align: center;
  }
`
const MobileMore = styled(MoreButton)`
  width: 96px;
  align-self: flex-end;
  @media (min-width: 600px) and (max-width: 1023px) {
    align-self: center;
  }
`
const MobileBanner = () => {
  const { isShowPromo, closePromo } = useContext(ArticlePromoContext)
  const { releaseBranch } = useContext(CoreContext)

  return (
    <MobileBox show={isShowPromo}>
      <FlexGroup>
        <Title text="有你才有報導者" />
        <CloseButton
          iconComponent={<Cross releaseBranch={releaseBranch} />}
          theme={IconButton.THEME.normal}
          onClick={closePromo}
        />
      </FlexGroup>
      <DescriptionBox>
        <Description text="這篇文章有賴讀者的贊助完成，我們以非營利模式運作，邀請你加入 3 種支持方案，讓我們能走更長遠的路。" />
      </DescriptionBox>
      <MobileMore isArticlePage={true} />
    </MobileBox>
  )
}

const Box = styled.div`
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  ${props => (props.show ? '' : 'transition: visibility 0.5s linear 0.5s;')}
`
const ArticleBanner = ({
  isExpanded = false,
  isAuthed = false,
  userRole = [],
}) => {
  const [isShowPromo, setIsShowPromo] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
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
  return (
    <ArticlePromoContext.Provider value={contextValue}>
      <Box show={isShowPromo}>
        <DesktopAndAbove>
          <DesktopBanner />
        </DesktopAndAbove>
        <TabletAndBelow>
          <MobileBanner />
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
