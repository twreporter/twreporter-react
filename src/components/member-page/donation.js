import React, { useContext } from 'react'
import styled from 'styled-components'

// context
import { CoreContext } from '../../contexts'

// @twreporter
import EmptyState from '@twreporter/react-components/lib/empty-state'
import { H3 } from '@twreporter/react-components/lib/text/headline'
import { P2 } from '@twreporter/react-components/lib/text/paragraph'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'

const StyledH3 = styled(H3)`
  color: ${colorGrayscale.gray800};
`

const Block = styled.div`
  height: 72px;
`

const StyledP2 = styled(P2)`
  justify-content: center;
`

const MemberDonationPage = () => {
  const { releaseBranch } = useContext(CoreContext)

  return (
    <div>
      <StyledH3 text="贊助紀錄" />
      <Block />
      <EmptyState
        style={EmptyState.Style.UNDER_CONSTRUCTION}
        title="功能即將推出！"
        guide={
          <div>
            <P2 text="我們正在開發這個頁面的功能，" />
            <StyledP2 text="敬請期待！" />
          </div>
        }
        showButton={false}
        releaseBranch={releaseBranch}
      />
    </div>
  )
}

export default MemberDonationPage
