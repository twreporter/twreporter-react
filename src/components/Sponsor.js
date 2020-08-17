import { sourceHanSansTC as fontWeight } from '@twreporter/core/lib/constants/font-weight'
import DonationLink from '@twreporter/react-components/lib/donation-link-with-utm'
import mq from '../utils/media-query'
import React from 'react'
import Sizing from './sizing'
import styled from 'styled-components'

const Container = styled(Sizing)`
  width: 100%;
  height: auto;
  padding: 24px 0;
  background-color: #ffffff;
  position: relative;
  margin: 48px auto 72px auto;
`

const Title = styled.div`
  font-size: 20px;
  font-weight: ${fontWeight.bold};
  text-align: center;
  color: #262626;
`

const Desc = styled.div`
  margin: 24px auto;
  width: 84%;
  text-align: left;
  font-size: 14px;
  line-height: 1.4;
  letter-spacing: 0.1px;
  color: #262626;
  > p {
    margin-bottom: 1em;
  }
  > p:last-child {
    margin-bottom: 0;
  }
`

const SponsorButton = styled(DonationLink)`
  width: 100%;
  height: 48px;
  border: 0;
  box-sizing: border-box;
  background-color: #c71b0a;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  letter-spacing: 0.1px;
  transition: transform 0.2s ease;
  &:active {
    transform: translate(2px, 4px);
  }
  ${mq.tabletAndAbove`
    width: 320px;
    border-radius: 4px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    &:active {
      transform: translate(calc(-50% + 2px), calc(50% + 4px));
    }
  `}
`

class Sponsor extends React.Component {
  render() {
    return (
      <Container size="small">
        <Title>深度調查報導，需要您的支持！</Title>
        <Desc>
          <p>
            深度調查報導必須投入優秀記者、足夠時間與大量資源⋯⋯我們需要細水長流的小額贊助，才能走更長遠的路。
          </p>
          <p>竭誠歡迎認同《報導者》理念的朋友贊助支持我們！</p>
        </Desc>
        <SponsorButton utmMedium="author">贊助我們</SponsorButton>
      </Container>
    )
  }
}

export default Sponsor
