import React, { useContext } from 'react'
import styled from 'styled-components'

// @twreporter
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { H3 } from '@twreporter/react-components/lib/text/headline'
import mq from '@twreporter/core/lib/utils/media-query'
import { Title2 } from '@twreporter/react-components/lib/title-bar'
import {
  PillButton,
  InheritLinkButton,
} from '@twreporter/react-components/lib/button'
import { P2 } from '@twreporter/react-components/lib/text/paragraph'

// context
import { CoreContext } from '../../../contexts'

import Card, { DescriptionType } from './Card'

const EmailSubscriptionContainer = styled.div`
  width: 100%;
`

const StyledH3 = styled(H3)`
  color: ${colorGrayscale.gray800};
`

const Block = styled.div`
  height: 32px;
  ${mq.mobileOnly`
    height: 24px;
  `}
`

const DescWithLink = styled(P2)`
  display: unset;
  line-height: 175%;
  color: ${colorGrayscale.gray700};
`

const CardListContainer = styled.div`
  margin-top: 24px;
  margin-bottom: 64px;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  ${mq.hdOnly`
    grid-template-columns: repeat(3, 1fr);
  `}
  ${mq.mobileOnly`
    grid-template-columns: repeat(1, 1fr);
  `}
`

const ReportersCards = [
  {
    title: '報導者精選',
    badgeText: '雙週',
    descriptionType: DescriptionType.PLAIN_TEXT,
    description:
      '由《報導者》編輯台精選近兩週的最新報導，和我們一起看見世界上正在發生的、重要的事。',
    linkText: '預覽',
    link: 'https://mailchi.mp/twreporter/20230923newsletter-8006311',
  },
  {
    title: '採訪幕後故事',
    badgeText: '不定期',
    descriptionType: DescriptionType.PLAIN_TEXT,
    description:
      '總是好奇記者們如何深入現場，採訪過程中又有哪些不為人知的故事嗎？我們會不定期分享給你。',
    linkText: '預覽',
    link:
      'https://us14.campaign-archive.com/?u=4da5a7d3b98dbc9fdad009e7e&id=695bd13c6f',
  },
  {
    title: '報導者營運手記',
    badgeText: '雙週',
    descriptionType: DescriptionType.PLAIN_TEXT,
    description:
      '一路走來，各個決策有什麼背後故事，團隊又是過著怎樣的工作日常？一起來開箱報導者團隊！',
    linkText: '預覽',
    link: 'https://mailchi.mp/twreporter/34m5sk8yvt-8006335?e=11a679e1d1',
  },
]

const KidReporterCards = [
  {
    title: '報導仔新聞聯絡簿',
    badgeText: '每月',
    descriptionType: DescriptionType.JSX,
    description: (
      <DescWithLink>
        兒少新聞平台
        <InheritLinkButton
          text="《少年報導者》"
          link={{
            isExternal: true,
            to: 'https://kids.twreporter.org',
            target: '_blank',
          }}
          type={InheritLinkButton.Type.UNDERLINE}
        />
        的最新專題和活動消息，就讓可愛的報導仔來告訴你！
      </DescWithLink>
    ),
    linkText: '預覽',
    link:
      'https://us14.campaign-archive.com/?u=4da5a7d3b98dbc9fdad009e7e&id=83fc470a1b',
  },
]

const EmailSubscription = () => {
  const { releaseBranch } = useContext(CoreContext)

  const reporterSubLinkBtn = () => {
    return (
      <PillButton
        text="前往訂閱"
        size={PillButton.Size.S}
        releaseBranch={releaseBranch}
        style={PillButton.Style.DARK}
        onClick={() => window.open('http://eepurl.com/djVwF9', '_blank')}
      />
    )
  }

  const kidReporterSubLinkBtn = () => {
    return (
      <PillButton
        text="前往訂閱"
        size={PillButton.Size.S}
        releaseBranch={releaseBranch}
        style={PillButton.Style.DARK}
        onClick={() =>
          window.open(
            'https://twreporter.us14.list-manage.com/subscribe?u=4da5a7d3b98dbc9fdad009e7e&amp;id=2154ac40c3',
            '_blank'
          )
        }
      />
    )
  }

  return (
    <EmailSubscriptionContainer>
      <StyledH3 text="訂閱電子報" />
      <Block />
      <Title2 title={'報導者'} renderButton={reporterSubLinkBtn()} />
      <CardListContainer>
        {ReportersCards.map((card, idx) => {
          return <Card key={idx} {...card} />
        })}
      </CardListContainer>
      <Title2 title={'少年報導者'} renderButton={kidReporterSubLinkBtn()} />
      <CardListContainer>
        {KidReporterCards.map((card, idx) => {
          return <Card key={idx} {...card} />
        })}
      </CardListContainer>
    </EmailSubscriptionContainer>
  )
}

export default EmailSubscription
