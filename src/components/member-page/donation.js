import React from 'react'
import styled from 'styled-components'

import EmptyState from '@twreporter/react-components/lib/empty-state'
import { H3 } from '@twreporter/react-components/lib/text/headline'
import { P2 } from '@twreporter/react-components/lib/text/paragraph'
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'

const Block = styled.div`
  height: 72px;
`

const MemberDonationPage = ({ releaseBranch = BRANCH.master }) => {
  return (
    <div>
      <H3 text={'贊助紀錄'} />
      <Block />
      <EmptyState
        style={EmptyState.Style.UNDER_CONSTRUCTION}
        title={'功能即將推出！'}
        guide={
          <div>
            <P2 text="我們正在開發這個頁面的功能，" />
            <P2 style={{ justifyContent: 'center' }} text="敬請期待！" />
          </div>
        }
        showButton={false}
        releaseBranch={releaseBranch}
      />
    </div>
  )
}

MemberDonationPage.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export default MemberDonationPage
