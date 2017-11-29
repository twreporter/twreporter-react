import React from 'react'
import { ChangePassword, PageContainer } from '@twreporter/registration'

const TITLE = '更改密碼'
const TEXT_AFTER_CHANGE = '密碼更改成功'

const CP = (props) => (
  <PageContainer>
    <ChangePassword
      title={TITLE}
      text={TEXT_AFTER_CHANGE}
      {...props}
    />
  </PageContainer>
)

export default CP
