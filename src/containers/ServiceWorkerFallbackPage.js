import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import get from 'lodash/get'
import qs from 'qs'
import React, { Component } from 'react'
import styled from 'styled-components'

const _ = {
  get
}

const Container = styled.div`
  max-width: 95%;
  margin: 0 auto;
  height: 100vh;
  display: flex;
`

const CenteredBox = styled.div`
  margin: auto;
`

const P = styled.p`
  line-height: 1.8;
  a {
    color: red;
    border-bottom: 1px solid red;
  }
`

class FallbackPage extends Component {
  render() {
    const search = _.get(this.props, 'location.search')
    const query = qs.parse(search, { ignoreQueryPrefix: true })
    const redirect = _.get(query, 'redirect', '/')
    return (
      <Container>
        <CenteredBox>
          <h2>無法連線到報導者伺服器，請確認您的網路連線。</h2>
          <P>若無法連線網路，您可以嘗試報導者的離線瀏覽功能。</P>
          <P>點選左上角報導者 logo 回到首頁或是
            <Link to={redirect} >點此
            </Link>
            離線瀏覽此頁。
          </P>
          <P>離線瀏覽功能提供暫存的資料給讀者使用，若您覺得內容不足，請連上網路，看完整的內容。</P>
        </CenteredBox>
      </Container>
    )
  }
}


export default connect()(FallbackPage)
// export default FallbackPage
