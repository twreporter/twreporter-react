import React from 'react'
import { connect } from 'react-redux'
import { SignUpForm } from 'twreporter-registration'
import styles from './SignUp.scss'

const TITLE = '申請帳號'
const SIGNUP_MESSAGE = '你將於信箱收到確認信，請開啟信箱啟用帳戶'

const SignUp = (props) => (
  <div className={styles['form-container']}>
    <SignUpForm
      title={TITLE}
      signUpMessage={SIGNUP_MESSAGE}
      {...props}
    />
  </div>
)


export default connect()(SignUp)
