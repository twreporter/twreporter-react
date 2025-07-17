import React, { useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// context
import { CoreContext } from '../../../contexts'
// @twreporter
import { EmptyStateV2 } from '@twreporter/react-components/lib/empty-state'
import requestOrigins from '@twreporter/core/lib/constants/request-origins'
import { PillButton } from '@twreporter/react-components/lib/button'

const DonateButton = styled(PillButton)`
  width: 280px;
  justify-content: center;
`

const ImportButton = styled(PillButton)`
  width: 280px;
  justify-content: center;
`

export const EmptyDonation = ({ handleImportOfflineDonation }) => {
  const { releaseBranch } = useContext(CoreContext)

  const onDonateButtonClick = e => {
    e.stopPropagation()
    e.preventDefault()
    window.open(
      `${requestOrigins.forClientSideRendering[releaseBranch].support}`,
      '_blank'
    )
  }

  return (
    <EmptyStateV2
      releaseBranch={releaseBranch}
      style={EmptyStateV2.Style.DEFAULT}
      title="你還沒有贊助紀錄"
      guide="很抱歉，目前沒有你贊助的紀錄"
      maxWidth="280px"
      buttonComponents={[
        <DonateButton
          key="donate"
          text="前往贊助"
          onClick={onDonateButtonClick}
        />,
        <ImportButton
          key="import"
          text="匯入非官網贊助紀錄"
          type={PillButton.Type.SECONDARY}
          onClick={handleImportOfflineDonation}
        />,
      ]}
    />
  )
}

EmptyDonation.propTypes = {
  handleImportOfflineDonation: PropTypes.func.isRequired,
}
