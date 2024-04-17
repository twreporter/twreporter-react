import React, { memo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { P1, P2 } from '@twreporter/react-components/lib/text/paragraph'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import {
  MobileOnly,
  TabletAndAbove,
} from '@twreporter/react-components/lib/rwd'
import divider from '@twreporter/react-components/lib/divider'
import FetchingWrapper from '@twreporter/react-components/lib/is-fetching-wrapper'
// components
import { StatusBadge } from '../status-bagde'
import { formattedDate } from './row'
import { DonationType } from '../../../../constants/donation'

const P1Gray800 = styled(P1)`
  color: ${colorGrayscale.gray800};
`

const P2Gray600 = styled(P2)`
  color: ${colorGrayscale.gray600};
`

const Divider = styled(divider)`
  width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
  ${props => (props.isMobile ? 'margin-top: 8px; margin-bottom: 8px;' : '')};
`

const RowDetail = styled.div`
  grid-column: 1 / 7;
  background-color: ${colorGrayscale.white};
  margin-top: 16px;
`

const ReceiptInfoBox = styled.div`
  width: 100%;
  .receipt-table {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 8px;
    .receipt-table-header {
      grid-column: 1 / 2;
    }
    .receipt-table-content {
      grid-column: 2 / 6;
    }
  }
  ${mq.mobileOnly`
    display: flex;
    flex-direction: column;
    .row {
      margin-bottom: 16px;
      &:last-child {
        margin-bottom: 0px;
      }
    }
  `}
`

const PaymentInfoBox = styled.div`
  width: 100%;
  .card-number {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`

const DotGroup = styled.div`
  display: flex;
  gap: 4px;
`

const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${colorGrayscale.black};
`

const PaymentRecordBox = styled.div`
  width: 100%;
  .payment-record-table {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 8px;
    .payment-date {
      grid-column: 1 / 2;
    }
    .payment-number {
      grid-column: 2 / 4;
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .payment-amount {
      grid-column: 4 / 5;
    }
    .payment-status {
      grid-column: 5 / 6;
      display: flex;
      justify-content: end;
      padding-right: 8px;
    }
    ${mq.mobileOnly`
      grid-template-columns: repeat(4, 1fr);
      grid-row-gap: 8px;
      .grid-row {
        grid-column: 1 / 5;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 9px;
      }
      .payment-date {
        grid-column: 1 / 3;
      }
      .payment-number {
        grid-column: 1 / 3;
        width: 100%;
        display: block;
        word-break: break-all;
        white-space: normal;
      }
      .payment-amount {
        grid-column: 3 / 4;
        display: flex;
        justify-content: end;
      }
      .payment-status {
        grid-column: 4 / 5;
        display: flex;
        justify-content: end;
        padding-right: 0px;
      }
    `}
  }
`

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 32px;
  width: 100%;
`
const LoadingMask = FetchingWrapper(Loading)

const CardTypeDictionary = {
  '-1': 'Unknown',
  '1': 'VISA',
  '2': 'MasterCard',
  '3': 'JCB',
  '4': 'Union Pay',
  '5': 'AMEX',
}

const sendReceiptDictionary = {
  no_receipt: '不需要收據',
  paperback_receipt_by_year: '需要收據',
}

export const TableRowDetail = memo(({ record, periodicHistory, isLoading }) => {
  const {
    card_last_four: cardLastFour,
    card_type: cardType,
    send_receipt: sendReceipt,
    receipt_header: receiptHeader,
  } = record
  const receiptAddress = `${record.address_state || ''}${record.address_city ||
    ''}${record.address_detail || ''}`

  const DotGroups = () =>
    Array.from({ length: 3 }, (_, i) => (
      <DotGroup key={i}>
        <Dot />
        <Dot />
        <Dot />
        <Dot />
      </DotGroup>
    ))
  return (
    <RowDetail>
      <LoadingMask isFetching={isLoading} showSpinner={isLoading}>
        <ReceiptInfoBox>
          <P1Gray800 weight={P1.Weight.BOLD} text="收據資料" />
          <TabletAndAbove>
            <Divider />
            <div className="receipt-table">
              <P1Gray800 className="receipt-table-header" text="收據抬頭" />
              <P1Gray800
                className="receipt-table-content"
                text={receiptHeader}
              />
              <P1Gray800 className="receipt-table-header" text="收據開立方式" />
              <P1Gray800
                className="receipt-table-content"
                text={sendReceiptDictionary[sendReceipt]}
              />
              <P1Gray800 className="receipt-table-header" text="收據寄送地址" />
              <P1Gray800
                className="receipt-table-content"
                text={receiptAddress}
              />
              <P1Gray800 className="receipt-table-header" text="其他" />
              <P1Gray800
                className="receipt-table-content"
                text="我願意將全名公開在《報導者》的捐款徵信名冊"
              />
            </div>
          </TabletAndAbove>
          <MobileOnly>
            <Divider isMobile />
            <div className="row">
              <P2Gray600 text="收據抬頭" />
              <P1Gray800 text={receiptHeader} />
            </div>
            <div className="row">
              <P2Gray600 text="收據開立方式" />
              <P1Gray800 text={sendReceiptDictionary[sendReceipt]} />
            </div>
            <div className="row">
              <P2Gray600 text="收據寄送地址" />
              <P1Gray800 text={receiptAddress} />
            </div>
            <div className="row">
              <P2Gray600 text="其他" />
              <P1Gray800 text="我願意將全名公開在《報導者》的捐款徵信名冊" />
            </div>
          </MobileOnly>
        </ReceiptInfoBox>
        <PaymentInfoBox>
          <P1Gray800 weight={P1.Weight.BOLD} text="扣款方式" />
          <Divider />
          <div className="card-number">
            <P1Gray800 text={CardTypeDictionary[cardType]} />
            <DotGroups />
            <P1Gray800 text={cardLastFour} />
          </div>
        </PaymentInfoBox>
        <PaymentRecordBox>
          <P1Gray800 weight={P1.Weight.BOLD} text="扣款紀錄" />
          <Divider />
          <TabletAndAbove>
            <div className="payment-record-table">
              {periodicHistory.map((history, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <P1Gray800
                      className="payment-date"
                      text={formattedDate(new Date(history.created_at))}
                    />
                    <P1Gray800
                      className="payment-number"
                      text={history.order_number}
                    />
                    <P1Gray800
                      className="payment-amount"
                      text={history.amount}
                    />
                    <div className="payment-status">
                      <StatusBadge
                        status={history.status}
                        type={DonationType.PERIODIC}
                      />
                    </div>
                  </React.Fragment>
                )
              })}
            </div>
          </TabletAndAbove>
          <MobileOnly>
            <div className="payment-record-table">
              {periodicHistory.map((history, idx) => {
                return (
                  <div className="grid-row" key={idx}>
                    <P1Gray800
                      className="payment-date"
                      text={formattedDate(new Date(history.created_at))}
                    />
                    <P1Gray800
                      className="payment-amount"
                      text={history.amount}
                    />
                    <div className="payment-status">
                      <StatusBadge
                        status={history.status}
                        type={DonationType.PERIODIC}
                      />
                    </div>
                    <P1Gray800
                      className="payment-number"
                      text={history.order_number}
                    />
                  </div>
                )
              })}
            </div>
          </MobileOnly>
        </PaymentRecordBox>
      </LoadingMask>
    </RowDetail>
  )
})

TableRowDetail.propTypes = {
  record: PropTypes.object.isRequired,
  periodicHistory: PropTypes.array,
  isLoading: PropTypes.bool,
}

TableRowDetail.displayName = 'TableRowDetail'
