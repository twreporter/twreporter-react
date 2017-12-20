import React, { Component } from 'react'
import withLayout from '../helpers/with-layout'
import withRouter from 'react-router/lib/withRouter'
import { ACTIVATE_PAGE_PATH } from '../routes'
import { SignInForm, FacebookButton, GoogleButton, PageContainer } from '@twreporter/registration'

import  get from 'lodash/get'

const _ = {
  get
}

const TITLE = '登入報導者'
const REDIRECT_PATH = 'confirm'

class SignIn extends Component {
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

export default withRouter(withLayout(SignIn))
