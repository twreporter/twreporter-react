import React, { Component } from 'react'
import { ForgetPassword, PageContainer } from '@twreporter/registration'
import { setHeaderInfo } from '../actions/header'
import { REGISTRATION, LIGHT } from '../constants/index'
import { connect, withRouter } from 'react-redux'

const TITLE = '密碼重設'
const INFO_TEXT = '請輸入你用作註冊的電子地址，我們會發送一封電郵給你，裡面附有重設密碼的超連結。'

class FP extends Component {
  componentWillMount() {
    const { setHeaderInfo } = this.props
    setHeaderInfo({
      pageTheme: LIGHT,
      pageType: REGISTRATION
    })
  }

  render() {
    return (
      <PageContainer>
        <ForgetPassword
          title={TITLE}
          infoText={INFO_TEXT}
          {...this.props}
        />
      </PageContainer>
    )
  }
}

export default withRouter(connect(null, { setHeaderInfo })(FP))
