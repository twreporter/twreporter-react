import React from 'react'
import styled from 'styled-components'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { P1 } from '@twreporter/react-components/lib/text/paragraph'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import divider from '@twreporter/react-components/lib/divider'

const Header = styled.div`
  display: contents;
  .donation-date {
    grid-column: 1 / 2;
  }
  .subject {
    grid-column: 2 / 3;
  }
  .donation-number {
    grid-column: 3 / 5;
  }
  .amount {
    grid-column: 5 / 6;
  }
  .status {
    grid-column: 6 / 7;
  }
  ${mq.mobileOnly`
    display: none;
  `}
`

const P1Gray800 = styled(P1)`
  color: ${colorGrayscale.gray800};
`

const Divider = styled(divider)`
  grid-column: 1 / 7;
  margin-top: 16px;
  margin-bottom: 16px;
`

export const TableHeader = () => {
  return (
    <Header>
      <P1Gray800
        className="donation-date"
        weight={P1.Weight.BOLD}
        text={'贊助日期'}
      />
      <P1Gray800 className="type" weight={P1.Weight.BOLD} text={'項目'} />
      <P1Gray800
        className="donation-number"
        weight={P1.Weight.BOLD}
        text={'贊助編號'}
      />
      <P1Gray800 className="amount" weight={P1.Weight.BOLD} text={'金額'} />
      <P1Gray800 className="status" weight={P1.Weight.BOLD} text={'狀態'} />
      <Divider />
    </Header>
  )
}
