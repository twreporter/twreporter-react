import React from 'react'
import { SignUpForm, PageContainer } from '@twreporter/registration'
import { withRouter } from 'react-router'

const TITLE = '註冊'
const redirectPath = 'confirm'

const SignUp = (props) => (
  <PageContainer>
    <SignUpForm
      title={TITLE}
      redirectPath={redirectPath}
      {...props}
    />
  </PageContainer>
)

export default withRouter(SignUp)
