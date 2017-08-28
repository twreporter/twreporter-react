import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { SignInForm, FacebookButton, GoogleButton } from 'twreporter-registration'

const Container = styled.div`
  margin: 20px 0;
  display:flex;
  justify-content: center;
`

const TITLE = '登入報導者'
const REDIRECT_PATH = '/'

const SignIn = (props) => (
  <Container>
    <SignInForm
      title={TITLE}
      signInRedirectPath={REDIRECT_PATH}
      defaultStyle={true}
      {...props}
    >
      <FacebookButton />
      <GoogleButton />
    </SignInForm>
  </Container>
)

export default connect()(SignIn)
