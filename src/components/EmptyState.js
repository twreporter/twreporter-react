import React, { useContext } from 'react'
import styled from 'styled-components'
// context
import { CoreContext } from '../contexts'
// @twreporter
import Empty from '@twreporter/react-components/lib/empty-state'
import origins from '@twreporter/core/lib/constants/request-origins'

const EmptyBox = styled.div`
  margin-top: 72px;
  margin-bottom: 120px;
`

const EmptyState = () => {
  const { referrerPath, releaseBranch } = useContext(CoreContext)
  const url = referrerPath || origins.forClientSideRendering[releaseBranch].main

  return (
    <EmptyBox>
      <Empty
        releaseBranch={releaseBranch}
        style={Empty.Style.PENCIL}
        title="很抱歉，目前還沒有文章"
        showGuide={true}
        guide="我們正在編輯新的文章，歡迎你先看其他感興趣的主題！"
        showButton={true}
        buttonText="返回上一頁"
        buttonUrl={url}
      />
    </EmptyBox>
  )
}

export default EmptyState
