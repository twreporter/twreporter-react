import React from 'react'
import { SignUpForm, PageContainer } from 'twreporter-registration'

const TITLE = '註冊'
const SIGNUP_MESSAGE = '你將於信箱收到確認信，請開啟信箱啟用帳戶'

const SignUp = (props) => (
  <PageContainer>
    <SignUpForm
      title={TITLE}
      signUpMessage={SIGNUP_MESSAGE}
      {...props}
    />
  </PageContainer>
)

export default SignUp
