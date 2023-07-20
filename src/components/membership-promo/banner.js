import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
// contexts
import { PromoContext } from '../../contexts'
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

const boxCss = css`
  display: flex;
  flex-direction: column;
  width: 100vw;
  position: fixed;
  z-index: 10;
  background-color: ${colorGrayscale.white};
  box-shadow: 0px 0px 24px 0px ${colorOpacity['black_0.1']};
`

const DesktopBox = styled.div`
  ${boxCss}
  align-items: center;
  justify-content: center;
  bottom: 0;
  padding: 24px;
  opacity: ${props => (props.show ? '1' : '0')};
  transition: opacity 0.5s linear;
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
`
const Description = styled(P2)`
  color: ${colorGrayscale.gray600};
  margin-top: 4px;
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
  width: 900px;
`
const DesktopBanner = () => {
  const { isShowPromo, closePromo, releaseBranch } = useContext(PromoContext)
  const imageUrl = `https://www.twreporter.org/assets/membership-promo/${releaseBranch}/banner_desktop.png`

  return (
    <DesktopBox show={isShowPromo}>
      <CloseButton
        iconComponent={<Cross releaseBranch={releaseBranch} />}
        theme={IconButton.THEME.normal}
        onClick={closePromo}
      />
      <FlexRow>
        <HighFiveImg src={imageUrl} />
        <TextBox>
          <Title text="用你的方式支持報導者" />
          <Description text="《報導者》營運經費全由民間捐助，我們的新聞獨立性與社會影響力來自您的支持 —— 加入 3 種支持方案，與報導者同行！" />
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
  transform: translateY(${props => (props.show ? 0 : '100%')});
  transition: transform 0.5s linear;
`
const FlexGroup = styled.div`
  display: flex;
  justify-content: space-between;
`
const MobileMore = styled(MoreButton)`
  width: 96px;
  align-self: flex-end;
  margin-top: 4px;
`
const MobileBanner = () => {
  const { isShowPromo, closePromo, releaseBranch } = useContext(PromoContext)

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
      <Description text="《報導者》營運經費全由民間捐助，我們的新聞獨立性與社會影響力來自您的支持 —— 加入 3 種支持方案，與報導者同行！" />
      <MobileMore />
    </MobileBox>
  )
}

const Box = styled.div``
const Banner = () => (
  <Box>
    <DesktopAndAbove>
      <DesktopBanner />
    </DesktopAndAbove>
    <TabletAndBelow>
      <MobileBanner />
    </TabletAndBelow>
  </Box>
)

export default Banner
