import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { SignUpForm } from 'twreporter-registration'

const Container = styled.div`
  margin: 20px 0;
  display:flex;
  justify-content: center;
`

const TITLE = '申請帳號'
const SIGNUP_MESSAGE = '你將於信箱收到確認信，請開啟信箱啟用帳戶'

const SignUp = (props) => (
  <Container>
    <SignUpForm
      title={TITLE}
      signUpMessage={SIGNUP_MESSAGE}
      {...props}
    />
  </Container>
)


export default connect()(SignUp)
