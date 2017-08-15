import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { SignInForm } from 'twreporter-registration'
import styles from './SignIn.scss'

const TITLE = '登入報導者'
const REDIRECT_PATH = '/'
const LOCATION = 'http://testtest.twreporter.org:3000'
const DOMAIN = 'twreporter.org'

const SignIn = (props) => (
  <div className={styles['form-container']}>
    <SignInForm
      title={TITLE}
      historyManager={browserHistory}
      signInRedirectPath = {REDIRECT_PATH}
      location={LOCATION}
      domain={DOMAIN}
      account={true}
      google={true}
      facebook={true}
      defaultStyle={true}
      {...props}
    />
  </div>
)

export default connect()(SignIn)
