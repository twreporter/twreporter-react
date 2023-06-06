import React, { createContext } from 'react'
import styled from 'styled-components'

// @twreporter
import { H3 } from '@twreporter/react-components/lib/text/headline'
import {
  SnackBar,
  useSnackBar,
} from '@twreporter/react-components/lib/snack-bar'
import mq from '@twreporter/core/lib/utils/media-query'

import SubscriptionOptions from './subscription-options'

const EmailSubscriptionContainer = styled.div`
  width: 100%;
`

const Block = styled.div`
  height: 32px;
`

const SnackBarContainer = styled.div`
  z-index: 1;
  position: fixed;
  transition: opacity 100ms;
  opacity: ${props => (props.showSnackBar ? 1 : 0)};
  max-width: 440px;
  width: 100%;
  left: 50%;
  ${mq.desktopAndAbove`
    top: calc(100vh - 24px);
    transform: translate(-50%, -50%);
  `}
  ${mq.tabletAndBelow`
    bottom: calc(env(safe-area-inset-bottom, 0) + 60px + 8px);
    transform: translateX(-50%);
    padding: 0 16px;
  `}
`

const SnackBarDiv = styled.div`
  display: flex;
  justify-content: center;
`

export const EmailSubscriptionContext = createContext()

const EmailSubscription = () => {
  const { showSnackBar, snackBarText, toastr } = useSnackBar()
  const contextValue = { toastr }

  return (
    <EmailSubscriptionContext.Provider value={contextValue}>
      <EmailSubscriptionContainer>
        <H3 text="電子報設定" />
        <Block />
        <SubscriptionOptions />
        <SnackBarContainer showSnackBar={showSnackBar}>
          <SnackBarDiv>
            <SnackBar text={snackBarText} />
          </SnackBarDiv>
        </SnackBarContainer>
      </EmailSubscriptionContainer>
    </EmailSubscriptionContext.Provider>
  )
}

export default EmailSubscription
