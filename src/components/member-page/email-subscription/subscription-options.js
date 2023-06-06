import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// @twreporter
import {
  colorBrand,
  colorGrayscale,
} from '@twreporter/core/lib/constants/color'
import mq from '@twreporter/core/lib/utils/media-query'
import Divider from '@twreporter/react-components/lib/divider'
import { P1 } from '@twreporter/react-components/lib/text/paragraph'
import { Weight } from '@twreporter/react-components/lib/text/enums'
import { Badge } from '@twreporter/react-components/lib/badge'
import { ToggleButton } from '@twreporter/react-components/lib/button'
import twreporterRedux from '@twreporter/redux'
import colors from '../../../constants/colors'
import optionKeys from '../../../constants/email-subscription-options'

// useContext
import { EmailSubscriptionContext } from './email-subscription'

// lodash
import get from 'lodash/get'
import indexOf from 'lodash/indexOf'
import remove from 'lodash/remove'

const _ = {
  get,
  indexOf,
  remove,
}

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
    key: optionKeys.featured,
    text: '報導者精選',
    desc:
      '由《報導者》編輯台精選近兩週的最新報導，和我們一起看見世界上正在發生的、重要的事。',
    label: '雙週',
  },
  {
    key: optionKeys.behindTheScenes,
    text: '採訪幕後故事',
    desc:
      '總是好奇記者們如何深入現場，採訪過程中又有哪些不為人知的故事嗎？我們會不定期分享給你。',
    label: '不定期',
  },
  {
    key: optionKeys.operationalJournal,
    text: '報導者營運手記',
    desc:
      '一路走來，各個決策有什麼背後故事，團隊又是過著怎樣的工作日常？一起來開箱報導者團隊！',
    label: '雙週',
  },
]

const { actions, reduxStateFields } = twreporterRedux
const { setUserData } = actions

const SubscriptionOptions = ({ jwt, userID, setUserData }) => {
  // TODO: get from state
  const [newsletterSubscriptions, setNewsletterSubscriptions] = useState([])

  const [isToggleBtnDisabled, setIsToggleBtnDisabled] = useState(false)
  const { toastr } = useContext(EmailSubscriptionContext)

  const onClickNewsletterSubscriptions = key => {
    const subscriptions = [...newsletterSubscriptions]
    let action = _.indexOf(subscriptions, key) !== -1 ? 'unsub' : 'sub'
    let snackBarText
    if (action === 'unsub') {
      snackBarText = '已取消訂閱'
      _.remove(subscriptions, n => n === key)
    } else {
      snackBarText = '已訂閱'
      subscriptions.push(key)
    }
    setNewsletterSubscriptions(subscriptions)
    setIsToggleBtnDisabled(true)
    // TODO: get read_preference
    setUserData(jwt, userID, [], subscriptions)
      .then(() => {
        setIsToggleBtnDisabled(false)
        toastr({ text: snackBarText, timeout: 1000000000 })
      })
      .catch(error => {
        console.error('error: ', error)
        if (action === 'sub') {
          _.remove(subscriptions, n => n === key)
        } else {
          subscriptions.push(key)
        }
        setIsToggleBtnDisabled(false)
        setNewsletterSubscriptions(subscriptions)
        toastr({ text: '出了點小問題，請再試一次' })
      })
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
                backgroundColor={colors.white}
              />
            </OptionTitle>
            <P1Gray800 text={option.desc} />
          </OptionContent>
          <ToggleButtonContainer>
            <ToggleButton
              value={_.indexOf(newsletterSubscriptions, option.key) !== -1}
              labelOn="已訂閱"
              labelOff="未訂閱"
              onChange={() => onClickNewsletterSubscriptions(option.key)}
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
function mapStateToProps(state) {
  const jwt = _.get(state, [reduxStateFields.auth, 'accessToken'])
  const userID = _.get(state, [reduxStateFields.auth, 'userInfo', 'user_id'])
  return {
    jwt,
    userID,
  }
}

SubscriptionOptions.propTypes = {
  jwt: PropTypes.string,
  userID: PropTypes.number,
  setUserData: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  { setUserData }
)(SubscriptionOptions)
