import { ACTIVATE_PAGE_PATH } from '../routes'
import { connect } from 'react-redux'
import { REGISTRATION, LIGHT } from '../constants/index'
import { setHeaderInfo } from '../actions/header'
import { SignInForm, FacebookButton, GoogleButton, PageContainer } from '@twreporter/registration'
import { withRouter } from 'react-router'
import React, { Component } from 'react'

import  get from 'lodash/get'

const _ = {
  get
}

const TITLE = '登入報導者'
const REDIRECT_PATH = 'confirm'

class SignIn extends Component {
  componentWillMount() {
    const { setHeaderInfo } = this.props
    setHeaderInfo({
      pageTheme: LIGHT,
      pageType: REGISTRATION
    })
  }

  render() {
    const { location } = this.props
    const path = _.get(location, 'query.path', '')
    return (
      <PageContainer>
        <SignInForm
          title={TITLE}
          signInRedirectPath={REDIRECT_PATH}
          destinationPath={path}
          {...this.props}
        >
          <FacebookButton
            activatePagePath={ACTIVATE_PAGE_PATH}
          />
          <GoogleButton
            activatePagePath={ACTIVATE_PAGE_PATH}
          />
        </SignInForm>
      </PageContainer>
    )
  }
}

export default connect(null, { setHeaderInfo })(withRouter(SignIn))
