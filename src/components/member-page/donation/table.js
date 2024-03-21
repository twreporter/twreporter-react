import React, { memo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { P1 } from '@twreporter/react-components/lib/text/paragraph'
import Divider from '@twreporter/react-components/lib/divider'
import {
  colorBrand,
  colorGrayscale,
} from '@twreporter/core/lib/constants/color'
import Badge from '@twreporter/react-components/lib/badge'

const DonationType = Object.freeze({
  PRIME: 'prime',
  PERIODIC: 'periodic',
})

const DonationTypeLabel = {
  [DonationType.PRIME]: '單筆贊助',
  [DonationType.PERIODIC]: '定期定額',
}

const PeriodicDonationStatus = Object.freeze({
  TO_PAY: 'to_pay',
  PAYING: 'paying',
  PAID: 'paid',
  FAIL: 'fail',
  STOPPED: 'stopped',
  INVALID: 'invalid',
})

const PrimeDonationStatus = Object.freeze({
  PAYING: 'paying',
  PAID: 'paid',
  FAIL: 'fail',
  REFUNDED: 'refunded',
})

const TableContainer = styled.div`
  width: 100%;
  ${mq.mobileOnly`
    padding: 24px 0px 64px;
  `}
  ${mq.tabletAndAbove`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 8px;
    padding: 32px 0px 120px;
  `}
`

const TableHeader = styled.div`
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

const DividerContainer = styled.div`
  width: 100%;
  grid-column: 1 / 7;
  margin-top: 16px;
  margin-bottom: 16px;
`

const TableContent = styled.div`
  display: contents;
  .donation-date {
    grid-column: 1 / 2;
  }
  .type {
    grid-column: 2 / 3;
  }
  .donation-number {
    grid-column: 3 / 5;
    width: 100%;
    display: block;
    word-break: break-all;
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

const MobileTableContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  .row {
    width: 100%;
    display: flex;
    gap: 8px;
    .amount {
      display: flex;
      flex-grow: 1;
      justify-content: end;
    }
  }
  .donation-number {
    width: 100%;
    display: block;
    word-break: break-all;
  }
  ${mq.tabletAndAbove`
    display: none;
  `}
`

const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
`

const P1Gray800 = styled(P1)`
  color: ${colorGrayscale.gray800};
`

const P1Gray600 = styled(P1)`
  color: ${colorGrayscale.gray600};
`

const badgePropsByStatus = {
  [PeriodicDonationStatus.TO_PAY]: {
    text: '進行中',
    textColor: colorBrand.heavy,
    backgroundColor: colorGrayscale.white,
  },
  [PeriodicDonationStatus.PAYING]: {
    text: '進行中',
    textColor: colorBrand.heavy,
    backgroundColor: colorGrayscale.white,
  },
  [PeriodicDonationStatus.PAID]: {
    text: '進行中',
    textColor: colorBrand.heavy,
    backgroundColor: colorGrayscale.white,
  },
  [PeriodicDonationStatus.FAIL]: {
    text: '扣款失敗',
    textColor: colorGrayscale.gray800,
    backgroundColor: colorGrayscale.gray200,
  },
  [PeriodicDonationStatus.STOPPED]: {
    text: '扣款失敗',
    textColor: colorGrayscale.gray800,
    backgroundColor: colorGrayscale.gray200,
  },
  [PeriodicDonationStatus.INVALID]: {
    text: '扣款失敗',
    textColor: colorGrayscale.gray800,
    backgroundColor: colorGrayscale.gray200,
  },
  [PrimeDonationStatus.PAYING]: {
    text: '進行中',
    textColor: colorBrand.heavy,
    backgroundColor: colorGrayscale.white,
  },
  [PrimeDonationStatus.FAIL]: {
    text: '扣款失敗',
    textColor: colorGrayscale.gray800,
    backgroundColor: colorGrayscale.gray200,
  },
  [PrimeDonationStatus.PAID]: {
    text: '已完成',
    textColor: colorGrayscale.gray800,
    backgroundColor: 'transparent',
  },
  [PrimeDonationStatus.REFUNDED]: {
    text: '已退款',
    textColor: colorGrayscale.gray800,
    backgroundColor: colorGrayscale.gray200,
  },
  default: {
    text: '進行中',
    textColor: colorGrayscale.gray800,
    backgroundColor: colorGrayscale.gray200,
  }, // Default case
}

const BadgeComponent = memo(({ status, type }) => {
  // Determine key based on type and status
  const key =
    type === DonationType.PERIODIC && status in badgePropsByStatus
      ? status
      : type === DonationType.PRIME && status in badgePropsByStatus
      ? status
      : 'default'

  const { text, textColor, backgroundColor } = badgePropsByStatus[key]

  return (
    <BadgeContainer>
      <Badge
        text={text}
        textColor={textColor}
        backgroundColor={backgroundColor}
      />
    </BadgeContainer>
  )
})

BadgeComponent.propTypes = {
  status: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(DonationType)).isRequired,
}
BadgeComponent.displayName = 'BadgeComponent'

const formattedDate = date =>
  `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`

const TableRow = memo(({ record }) => {
  const {
    type,
    created_at: createdAt,
    amount,
    status,
    order_number: orderNumber,
  } = record
  const donationDate = formattedDate(new Date(createdAt))
  const amountSuffix = type === DonationType.PRIME ? '元' : '元/月'

  return (
    <React.Fragment>
      <TableContent>
        <P1Gray800 className="donation-date" text={donationDate} />
        <P1Gray800 className="type" text={DonationTypeLabel[type]} />
        <P1Gray800 className="donation-number" text={orderNumber} />
        <P1Gray800
          className="amount"
          text={`${amount.toLocaleString('en-US')}${amountSuffix}`}
        />
        <BadgeComponent className="status" status={status} type={type} />
      </TableContent>
      <MobileTableContent>
        <P1Gray800 text={donationDate} />
        <div className="row">
          <P1Gray800 weight={P1.Weight.BOLD} text={DonationTypeLabel[type]} />
          <BadgeComponent status={status} type={type} />
          <P1Gray800
            className="amount"
            text={`${amount.toLocaleString('en-US')}${amountSuffix}`}
          />
        </div>
        <P1Gray600 className="donation-number" text={orderNumber} />
      </MobileTableContent>
    </React.Fragment>
  )
})

TableRow.propTypes = {
  record: PropTypes.object.isRequired,
}

TableRow.displayName = 'TableRow'

export const Table = ({ records }) => (
  <TableContainer>
    <TableHeader>
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
      <DividerContainer>
        <Divider />
      </DividerContainer>
    </TableHeader>
    {records.map(record => (
      <React.Fragment key={record.order_number}>
        <TableRow record={record} />
        <DividerContainer>
          <Divider />
        </DividerContainer>
      </React.Fragment>
    ))}
  </TableContainer>
)

Table.propTypes = {
  records: PropTypes.arrayOf(PropTypes.object).isRequired,
}
