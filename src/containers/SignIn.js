import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { SignInForm, FacebookButton, GoogleButton } from 'twreporter-registration'
import styles from './SignIn.scss'

const TITLE = '登入報導者'
const REDIRECT_PATH = '/'

const SignIn = (props) => (
  <div className={styles['form-container']}>
    <SignInForm
      title={TITLE}
      historyManager={browserHistory}
      signInRedirectPath = {REDIRECT_PATH}
      account={true}
      google={true}
      facebook={true}
      defaultStyle={true}
      {...props}
    >
      <FacebookButton />
      <GoogleButton />
    </SignInForm>
  </div>
)

export default connect()(SignIn)
