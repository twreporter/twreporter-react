import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
// contexts
import { PromoContext, CoreContext } from '../../contexts'
// components
import MoreButton from './more'
// @twreporter
import { IconButton } from '@twreporter/react-components/lib/button'
import { Cross } from '@twreporter/react-components/lib/icon'
import {
  DesktopAndAbove,
  TabletAndBelow,
} from '@twreporter/react-components/lib/rwd'
import {
  colorGrayscale,
  colorOpacity,
} from '@twreporter/core/lib/constants/color'
import zIndexConst from '@twreporter/core/lib/constants/z-index'
import requestOrigins from '@twreporter/core/lib/constants/request-origins'
import { DONATION_LINK_ANCHOR } from '@twreporter/core/lib/constants/donation-link-anchor'

// desktop popup component
const boxCss = css`
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  box-shadow: 0px 0px 24px 0px ${colorOpacity['black_0.1']};
  background-color: ${colorGrayscale.white};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const boxPadding = 48
const DesktopPopupBox = styled.div`
  ${boxCss}
  padding: 24px 24px ${boxPadding}px ${boxPadding}px;
  width: 600px;
`
const FlexGroup = styled.div`
  display: flex;
  flex-direction: column;
`
const CloseButton = styled(IconButton)`
  justify-content: flex-end;
`
const textWidth = 284
const TextImg = styled.img`
  width: ${textWidth}px;
  margin-bottom: 16px;
`
const hiveFiveLeft = textWidth + boxPadding + 16
const HighFiveImg = styled.img`
  width: 321px;
  position: absolute;
  left: ${hiveFiveLeft}px;
  top: 50%;
  transform: translateY(-50%);
`
const DesktopMore = styled(MoreButton)`
  width: 240px;
  margin: 0 24px;
`
const DesktopPopup = () => {
  const { closePromo } = useContext(PromoContext)
  const { releaseBranch } = useContext(CoreContext)
  const textUrl = `https://www.twreporter.org/assets/membership-promo/${releaseBranch}/popup_text_desktop.png`
  const imageUrl = `https://www.twreporter.org/assets/membership-promo/${releaseBranch}/popup_desktop.png`
  const moreAction = () => {
    const membershipPromoLink = `${requestOrigins.forClientSideRendering[releaseBranch].support}#${DONATION_LINK_ANCHOR.impact}`
    window.open(membershipPromoLink, '_blank')
    closePromo()
  }

  return (
    <DesktopPopupBox>
      <CloseButton
        iconComponent={<Cross releaseBranch={releaseBranch} />}
        theme={IconButton.THEME.normal}
        onClick={closePromo}
      />
      <FlexGroup>
        <TextImg
          src={textUrl}
          alt="報導者支持方案上線，用你的方式支持報導者！"
        />
        <DesktopMore onClickButton={moreAction} text="瞭解更多" />
      </FlexGroup>
      <HighFiveImg src={imageUrl} alt="開創組織永續經營之路" />
    </DesktopPopupBox>
  )
}

// mobile popup component
const MobilePopupBox = styled.div`
  ${boxCss}
  width: 300px;
  padding: 24px;
`
const MobileImg = styled.img`
  width: 267px;
  align-self: center;
`
const MobileMore = styled(MoreButton)`
  width: 100%;
  margin-top: 24px;
`
const MobilePopup = () => {
  const { closePromo } = useContext(PromoContext)
  const { releaseBranch } = useContext(CoreContext)
  const imgUrl = `https://www.twreporter.org/assets/membership-promo/${releaseBranch}/popup_mobile.png`
  const moreAction = () => {
    const membershipPromoLink = `${requestOrigins.forClientSideRendering[releaseBranch].support}#${DONATION_LINK_ANCHOR.impact}`
    window.open(membershipPromoLink, '_blank')
    closePromo()
  }

  return (
    <MobilePopupBox>
      <CloseButton
        iconComponent={<Cross releaseBranch={releaseBranch} />}
        theme={IconButton.THEME.normal}
        onClick={closePromo}
      />
      <MobileImg
        src={imgUrl}
        alt="報導者支持方案上線，用你的方式支持報導者！"
      />
      <MobileMore onClickButton={moreAction} text="瞭解更多" />
    </MobilePopupBox>
  )
}

// popup component
const PopupContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colorOpacity['black_0.2']};
  z-index: ${zIndexConst.popup};
  position: fixed;
  left: 0;
  top: 0;
  visibility: ${props => (props.$show ? 'visible' : 'hidden')};
`
const Box = styled.div``
const Popup = () => {
  const { isShowPromo, closePromo } = useContext(PromoContext)
  const preventClosePromo = e => e.stopPropagation()

  return (
    <PopupContainer $show={isShowPromo} onClick={closePromo}>
      <Box onClick={preventClosePromo}>
        <DesktopAndAbove>
          <DesktopPopup />
        </DesktopAndAbove>
        <TabletAndBelow>
          <MobilePopup />
        </TabletAndBelow>
      </Box>
    </PopupContainer>
  )
}

export default Popup
