import React from 'react'
import withLayout from '../helpers/with-layout'
import withRouter from 'react-router/lib/withRouter'
import { SignUpForm, PageContainer } from '@twreporter/registration'

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

export default withRouter(withLayout(SignUp))
