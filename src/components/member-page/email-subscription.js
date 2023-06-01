import React, { useState } from 'react'
import styled from 'styled-components'

// @twreporter
import {
  colorBrand,
  colorGrayscale,
} from '@twreporter/core/lib/constants/color'
import mq from '@twreporter/core/lib/utils/media-query'
import Divider from '@twreporter/react-components/lib/divider'
import { H3 } from '@twreporter/react-components/lib/text/headline'
import { P1 } from '@twreporter/react-components/lib/text/paragraph'
import { Weight } from '@twreporter/react-components/lib/text/enums'
import { Badge } from '@twreporter/react-components/lib/badge'
import { ToggleButton } from '@twreporter/react-components/lib/button'

const EmailSubscriptionContainer = styled.div`
  width: 100%;
`

const Block = styled.div`
  height: 32px;
`

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

const OptionContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const OptionTitle = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 4px;
`

const P1Gray800 = styled(P1)`
  color: ${colorGrayscale.gray800};
`

const BadgeComponent = styled(Badge)`
  margin-left: 8px;
`

const DividerContainer = styled.div`
  margin: 24px 0px;
`

const ToggleButtonContainer = styled.div`
  display: flex;
  margin-left: 24px;
  margin-right: 24px;
  ${mq.mobileOnly`
    margin-left: 24px;
    margin-right: 0px;
  `}
`

const options = [
  {
    text: '報導者精選',
    desc:
      '由《報導者》編輯台精選近兩週的最新報導，和我們一起看見世界上正在發生的、重要的事。',
    label: '雙週',
  },
  {
    text: '採訪幕後故事',
    desc:
      '總是好奇記者們如何深入現場，採訪過程中又有哪些不為人知的故事嗎？我們會不定期分享給你。',
    label: '不定期',
  },
  {
    text: '報導者營運手記',
    desc:
      '一路走來，各個決策有什麼背後故事，團隊又是過著怎樣的工作日常？一起來開箱報導者團隊！',
    label: '雙週',
  },
]

const OptionsContainer = () => {
  const [newsletterSubscriptions, setNewsletterSubscriptions] = useState(
    new Array(options.length).fill(false)
  )

  const [isToggleBtnDisabled, setIsToggleBtnDisabled] = useState(false)

  const onClickNewsletterSubscriptions = index => {
    const subscriptions = [...newsletterSubscriptions]
    subscriptions[index] = !subscriptions[index]
    // TODO: call api
    setNewsletterSubscriptions(subscriptions)
    setIsToggleBtnDisabled(true)
    setTimeout(() => {
      setIsToggleBtnDisabled(false)
    }, 3000)
  }

  return options.map((option, index) => {
    return (
      <div key={`option-${index}`}>
        <OptionContainer>
          <OptionContent>
            <OptionTitle>
              <P1Gray800 text={option.text} weight={Weight.BOLD} />
              <BadgeComponent
                text={option.label}
                textColor={colorBrand.heavy}
                backgroundColor={'white'}
              />
            </OptionTitle>
            <P1Gray800 text={option.desc} />
          </OptionContent>
          <ToggleButtonContainer>
            <ToggleButton
              value={newsletterSubscriptions[index]}
              labelOn="已訂閱"
              labelOff="未訂閱"
              onChange={() => onClickNewsletterSubscriptions(index)}
              disabled={isToggleBtnDisabled}
            />
          </ToggleButtonContainer>
        </OptionContainer>
        {index !== options.length - 1 && (
          <DividerContainer>
            <Divider />
          </DividerContainer>
        )}
      </div>
    )
  })
}

const EmailSubscription = () => {
  return (
    <EmailSubscriptionContainer>
      <H3 text="電子報設定" />
      <Block />
      <OptionsContainer />
    </EmailSubscriptionContainer>
  )
}

export default EmailSubscription
