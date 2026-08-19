import React, { useContext } from 'react'
import styled from 'styled-components'
// contexts
import { PromoContext, CoreContext } from '../../contexts'
// components
import { DesktopBanner, MobileBanner } from './notify-banner'
// @twreporter
import {
  DesktopAndAbove,
  TabletAndBelow,
} from '@twreporter/react-components/lib/rwd'

const Box = styled.div`
  visibility: ${props => (props.$show ? 'visible' : 'hidden')};
  ${props => (props.$show ? '' : 'transition: visibility 0.5s linear 0.5s;')}
`
const Banner = () => {
  const { isShowPromo } = useContext(PromoContext)
  const { releaseBranch } = useContext(CoreContext)

  return (
    <Box $show={isShowPromo}>
      <DesktopAndAbove>
        <DesktopBanner
          customContext={PromoContext}
          imageUrl={`https://www.twreporter.org/assets/membership-promo/${releaseBranch}/banner_desktop.png`}
          title="有你才有報導者"
          description={[
            '《報導者》營運經費全由民間捐助，我們的新聞獨立性與社會影響力',
            '來自您的支持 —— 加入 3 種支持方案，與報導者同行！',
          ]}
        />
      </DesktopAndAbove>
      <TabletAndBelow>
        <MobileBanner
          customContext={PromoContext}
          title="有你才有報導者"
          description={[
            '報導者》營運經費全由民間捐助，我們的新聞獨立性與社會影響力來自您的支持 —— ',
            '加入 3 種支持方案，與報導者同行！',
          ]}
        />
      </TabletAndBelow>
    </Box>
  )
}

export default Banner
