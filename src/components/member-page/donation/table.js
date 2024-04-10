import React, { memo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { P1 } from '@twreporter/react-components/lib/text/paragraph'
import Divider from '@twreporter/react-components/lib/divider'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
// constants
import { DonationType, DonationTypeLabel } from '../../../constants/donation'
// components
import { StatusBadge } from './status-bagde'

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
  /* phase 2 */
  /* cursor: pointer; */
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
    display: flex;
    align-items: center;
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

const P1Gray800 = styled(P1)`
  color: ${colorGrayscale.gray800};
`

const P1Gray600 = styled(P1)`
  color: ${colorGrayscale.gray600};
`

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
        <div className="status">
          <StatusBadge status={status} type={type} />
        </div>
      </TableContent>
      <MobileTableContent>
        <P1Gray800 text={donationDate} />
        <div className="row">
          <P1Gray800 weight={P1.Weight.BOLD} text={DonationTypeLabel[type]} />
          <StatusBadge status={status} type={type} />
          <P1Gray800
            className="amount"
            text={`${amount.toLocaleString('en-US')}${amountSuffix}`}
          />
        </div>
        <P1Gray600 className="donation-number" text={orderNumber} />
      </MobileTableContent>
      <DividerContainer>
        <Divider />
      </DividerContainer>
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
      </React.Fragment>
    ))}
  </TableContainer>
)

Table.propTypes = {
  records: PropTypes.arrayOf(PropTypes.object).isRequired,
}
