import { colors, typography } from '../../themes/common-variables'
import { donatePath } from '../../constants/index'
import { screen } from '../../themes/screen'
import React, { PureComponent } from 'react'
import ReactGA from 'react-ga'
import styled from 'styled-components'

const TITLE = '用行動支持報導者'
const TEXT = '優質深度報導必須投入優秀記者、足夠時間與大量資源⋯⋯我們需要細水長流的小額贊助，才能走更長遠的路。 竭誠歡迎認同《報導者》理念的朋友贊助支持我們！ '
const DONATEBUTTONTEXT = '贊助我們'

const Container = styled.div`
  margin: 60px auto 40px auto;
  padding: 40px 30px 30px 30px;
  width: 502px;
  min-height: 284px;
  background: ${colors.white};
  border-left: solid 1px ${colors.secondaryColor};
  ${screen.mobile`
    margin: 40px auto;
    width: 320px;
    min-height: 335px;
  `}
`

const Title = styled.p`
  display: inline-block;
  background: #c9af8e;
  padding-right: 2px;
  box-shadow: 5px 15px 0 ${colors.white} inset;
  font-size: ${typography.font.size.larger};
  font-weight: ${typography.font.weight.bold};
  color: ${colors.black};
  margin-bottom: 15px;
  ${screen.mobile`
    margin-bottom: 18px;
  `}
`

const Text = styled.p`
  font-size: ${typography.font.size.medium};
  line-height: 1.75;
  color: ${colors.black};  
`

const Donate = styled.div`
  width: 100%;
  height: 55px;
  margin-top: 50px;
  ${screen.mobile`
    margin-top: 40px;
  `}
  a{
    width: 140px;
    height: 55px;
    background: ${colors.black};
    display: table;
    float: right;
    cursor: pointer;
    p{
      display: table-cell;
      text-align: center;
      vertical-align: middle;
      font-size: ${typography.font.size.xSmall};
      color: ${colors.white};
      font-weight: 500;
      letter-spacing: 1.3px;
    }
    &:hover{
      background: ${colors.secondaryColor};
    }
  }
`

export default class DonationBox extends PureComponent {
  render() {
    let url = null
    if (typeof window !== 'undefined') {
      url = window.location.href
    }
    return (
      <Container>
        <Title>
          {TITLE}
        </Title>
        <Text>
          {TEXT}
        </Text>
        <Donate>
          <ReactGA.OutboundLink
            eventLabel={`[article_donation_button_click]: ${url}`}
            to={donatePath}
            target="_blank">
            <p>{DONATEBUTTONTEXT}</p>
          </ReactGA.OutboundLink>
        </Donate>
      </Container>
    )
  }
}
