'use strict'
import FbIcon from '../../../static/asset/fb.svg'
import LineIcon from '../../../static/asset/line.svg'
import React from 'react' // eslint-disable-next-line
import TwitterIcon from '../../../static/asset/twitter.svg'
import styled from 'styled-components'
import { FacebookButton, TwitterButton } from 'react-social'

const Container = styled.div`
  display: inline-block;
  margin-right: 15px;
  >button {
    cursor: pointer;
    border: none;
    outline: none;
    width: 24px;
    border: none;
    background: none;
    padding: 0;
    margin-right: 15px;
    display: inline-block;
    img {
      width: 100%;
      height: auto;
    }
  }
`

class ShareBt extends React.PureComponent {
  render() {
    const { appId, url, title } = this.props
    const lineUrl = `http://line.naver.jp/R/msg/text/?${encodeURI(title + ' ' + url)}`
    return (
      <Container>
        <FacebookButton url={url} appId={appId}>
          <FbIcon />
        </FacebookButton>
        <TwitterButton message={title} url={url}>
          <TwitterIcon />
        </TwitterButton>
        <a href={lineUrl} style={{ border: 'none' }}>
          <LineIcon />
        </a>
      </Container>
    )
  }
}

export { ShareBt }
