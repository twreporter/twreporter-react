import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SignInForm, FacebookButton, GoogleButton, PageContainer } from 'twreporter-registration'
import { setHeaderInfo } from '../actions/header'
import { REGISTRATION, LIGHT } from '../constants/index'

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
      <PageContainer>
        <SignInForm
          title={TITLE}
          signInRedirectPath={redirectPath}
          {...this.props}
        >
          <FacebookButton />
          <GoogleButton />
        </SignInForm>
      </PageContainer>
    )
  }
}


export default connect(null, { setHeaderInfo })(SignIn)
