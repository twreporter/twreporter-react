import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { SignInForm, FacebookButton, GoogleButton } from 'twreporter-registration'
import { setHeaderInfo } from '../actions/header'
import { REGISTRATION, LIGHT } from '../constants/index'

const Container = styled.div`
  margin: 20px 0;
  display:flex;
  justify-content: center;
`

const TITLE = '登入報導者'
const REDIRECT_PATH = '/'

class SignIn extends Component {
  componentWillMount() {
    const { setHeaderInfo } = this.props
    setHeaderInfo({
      pageTheme: LIGHT,
      pageType: REGISTRATION
    })
  }

  render() {
    const { params } = this.props
    const redirectPath = params.slug && params.type ? `/${params.type}/${params.slug}` : REDIRECT_PATH
    return (
      <Container>
        <SignInForm
          title={TITLE}
          signInRedirectPath={redirectPath}
          defaultStyle={true}
          {...this.props}
        >
          <FacebookButton />
          <GoogleButton />
        </SignInForm>
      </Container>
    )
  }
}


export default connect(null, { setHeaderInfo })(SignIn)
