import React, { useContext } from 'react'
// context
import { CoreContext } from '../../../contexts'
// @twreporter
import EmptyState from '@twreporter/react-components/lib/empty-state'
import requestOrigins from '@twreporter/core/lib/constants/request-origins'

export const EmptyDonation = () => {
  const { releaseBranch } = useContext(CoreContext)

  const onButtonClick = e => {
    e.stopPropagation()
    e.preventDefault()
    window.open(
      `${requestOrigins.forClientSideRendering[releaseBranch].support}`,
      '_blank'
    )
  }

  return (
    <EmptyState
      style={EmptyState.Style.DEFAULT}
      title="你還沒有贊助紀錄"
      guide="很抱歉，目前沒有你線上贊助的資料"
      showButton={true}
      buttonText={'前往贊助'}
      buttonOnclick={onButtonClick}
      releaseBranch={releaseBranch}
    />
  )
}
