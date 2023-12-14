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
import { H4 } from '@twreporter/react-components/lib/text/headline'
import { P2 } from '@twreporter/react-components/lib/text/paragraph'
import {
  colorGrayscale,
  colorOpacity,
} from '@twreporter/core/lib/constants/color'
import mq from '@twreporter/core/lib/utils/media-query'
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
const HighFiveImg = styled.img`
  width: 240px;
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
  const { isShowPromo, closePromo } = useContext(PromoContext)
  const { releaseBranch } = useContext(CoreContext)
  const imageUrl = `https://www.twreporter.org/assets/membership-promo/${releaseBranch}/banner_desktop.png`

  return (
    <DesktopBox show={isShowPromo}>
      <CloseButton
        iconComponent={<Cross releaseBranch={releaseBranch} />}
        theme={IconButton.THEME.normal}
        onClick={closePromo}
      />
      <FlexRow>
        <HighFiveImg src={imageUrl} alt="開創組織永續經營之路" />
        <TextBox>
          <Title text="用你的方式支持報導者" />
          <Description text="《報導者》營運經費全由民間捐助，我們的新聞獨立性與社會影響力" />
          <Description text="來自您的支持 —— 加入 3 種支持方案，與報導者同行！" />
        </TextBox>
        <DesktopMore />
      </FlexRow>
    </DesktopBox>
  )
}

// mobile banner
const MobileBox = styled.div`
  ${boxCss}
  bottom: 60px;
  padding: 16px;
  @media (min-width: 600px) and (max-width: 1023px) {
    padding: 24px;
  }
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
  const { isShowPromo, closePromo } = useContext(PromoContext)
  const { releaseBranch } = useContext(CoreContext)

  return (
    <MobileBox show={isShowPromo}>
      <FlexGroup>
        <Title text="用你的方式支持報導者" />
        <CloseButton
          iconComponent={<Cross releaseBranch={releaseBranch} />}
          theme={IconButton.THEME.normal}
          onClick={closePromo}
        />
      </FlexGroup>
      <DescriptionBox>
        <Description text="《報導者》營運經費全由民間捐助，我們的新聞獨立性與社會影響力來自您的支持 —— " />
        <Description text="加入 3 種支持方案，與報導者同行！" />
      </DescriptionBox>
      <MobileMore />
    </MobileBox>
  )
}

const Box = styled.div`
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  ${props => (props.show ? '' : 'transition: visibility 0.5s linear 0.5s;')}
`
const Banner = () => {
  const { isShowPromo } = useContext(PromoContext)

  return (
    <Box show={isShowPromo}>
      <DesktopAndAbove>
        <DesktopBanner />
      </DesktopAndAbove>
      <TabletAndBelow>
        <MobileBanner />
      </TabletAndBelow>
    </Box>
  )
}

export default Banner
