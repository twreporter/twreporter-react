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
import { TEN_YEAR_ANNIVERSARY } from '@twreporter/core/lib/constants/feature-flag'
import externalLinks from '@twreporter/core/lib/constants/external-links'

const Box = styled.div`
  visibility: ${props => (props.$show ? 'visible' : 'hidden')};
  ${props => (props.$show ? '' : 'transition: visibility 0.5s linear 0.5s;')}
`
const Banner = () => {
  const { isShowPromo } = useContext(PromoContext)
  const { releaseBranch } = useContext(CoreContext)

  const AnniversaryDesktopBanner = (
    <DesktopBanner
      customContext={PromoContext}
      imageUrl={`https://www.twreporter.org/assets/membership-promo/${releaseBranch}/10_banner_desktop.png`}
      title="我們十歲了！"
      description={[
        '謝謝你關注《報導者》，自2015年9月，我們靠社會大眾的贊助走到了今天。',
        '邀請你點進十週年網站，了解我們如何和讀者一起走過這10年。',
      ]}
      buttonText="報導者的十年"
      onClickButton={() =>
        window.open(externalLinks.tenYearAnniversary, '_blank')
      }
    />
  )

  const AnniversaryMobileBanner = (
    <MobileBanner
      customContext={PromoContext}
      title="我們十歲了！"
      description={[
        '謝謝你關注《報導者》，自2015年9月，我們靠社會大眾的贊助走到了今天。',
        '邀請你點進十週年網站，了解我們如何和讀者一起走過這10年。',
      ]}
      buttonText="報導者的十年"
      onClickButton={() =>
        window.open(externalLinks.tenYearAnniversary, '_blank')
      }
    />
  )

  return (
    <Box $show={isShowPromo}>
      <DesktopAndAbove>
        {TEN_YEAR_ANNIVERSARY ? (
          AnniversaryDesktopBanner
        ) : (
          <DesktopBanner
            customContext={PromoContext}
            imageUrl={`https://www.twreporter.org/assets/membership-promo/${releaseBranch}/banner_desktop.png`}
            title="有你才有報導者"
            description={[
              '《報導者》營運經費全由民間捐助，我們的新聞獨立性與社會影響力',
              '來自您的支持 —— 加入 3 種支持方案，與報導者同行！',
            ]}
          />
        )}
      </DesktopAndAbove>
      <TabletAndBelow>
        {TEN_YEAR_ANNIVERSARY ? (
          AnniversaryMobileBanner
        ) : (
          <MobileBanner
            customContext={PromoContext}
            title="有你才有報導者"
            description={[
              '報導者》營運經費全由民間捐助，我們的新聞獨立性與社會影響力來自您的支持 —— ',
              '加入 3 種支持方案，與報導者同行！',
            ]}
          />
        )}
      </TabletAndBelow>
    </Box>
  )
}

export default Banner
