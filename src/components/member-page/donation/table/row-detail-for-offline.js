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
  ${props => (props.$isMobile ? 'margin-top: 8px; margin-bottom: 8px;' : '')};
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 32px;
  width: 100%;
  ${mq.mobileOnly`
    padding: 24px 16px;
  `}
`

const RowDetail = styled.div`
  grid-column: 1 / 7;
  background-color: ${colorGrayscale.white};
  margin-top: 16px;
`

const ReceiptInfoBox = styled.div`
  width: 100%;
  .receipt-action-button {
    display: flex;
    flex-direction: row;
    :nth-child(even) {
      margin-left: 8px;
    }
  }
  .receipt-info-title {
    display: flex;
    flex-direction: row;
    gap: 8px;
    justify-content: space-between;
  }
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

const sponsorshipResourceDictionary = {
  line: 'LINE 公益平台',
  jkopay: '街口支付',
  atm: 'ATM',
  benevity: 'Benevity',
  bright_funds: 'Bright Funds',
  global_giving: 'Global Giving',
  credit_card_periodic: '信用卡捐款單（定期定額）',
  credit_card_prime: '信用卡捐款單（單筆）',
  web: '官網',
  backme: '貝殼集器',
  seven11ibon: '711ibon',
  seven11op: '711op',
}

const sendReceiptKey = {
  no: 'no_receipt',
  digital: 'digital_receipt',
  paperback: 'paperback_receipt',
}

const sendReceiptDictionary = {
  [sendReceiptKey.no]: '不需要收據',
  [sendReceiptKey.digital]: '需要，請開立電子收據',
  [sendReceiptKey.paperback]: '需要，請開立紙本收據',
}

export const TableRowDetailForOffline = memo(({ record, email = '' }) => {
  const {
    send_receipt: sendReceipt,
    receipt_header: receiptHeader,
    sponsorship_resource: sponsorshipResource,
  } = record
  const receiptAddress = `${record.receipt_address_zip_code ||
    ''}${record.receipt_address_state || ''}${record.receipt_address_city ||
    ''}${record.receipt_address_detail || ''}`

  const sendReceiptTo =
    sendReceipt === sendReceiptKey.digital ? email : receiptAddress

  return (
    <RowDetail>
      <Container>
        <ReceiptInfoBox>
          <div className="receipt-info-title">
            <P1Gray800 weight={P1.Weight.BOLD} text="收據資料" />
          </div>
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
                text={sendReceiptTo}
              />
            </div>
          </TabletAndAbove>
          <MobileOnly>
            <Divider $isMobile />
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
              <P1Gray800 text={sendReceiptTo} />
            </div>
          </MobileOnly>
        </ReceiptInfoBox>
        <PaymentInfoBox>
          <P1Gray800 weight={P1.Weight.BOLD} text="贊助管道" />
          <Divider />
          <P1Gray800
            text={sponsorshipResourceDictionary[sponsorshipResource]}
          />
        </PaymentInfoBox>
      </Container>
    </RowDetail>
  )
})

TableRowDetailForOffline.propTypes = {
  record: PropTypes.object.isRequired,
  email: PropTypes.string,
}

TableRowDetailForOffline.displayName = 'TableRowDetailForOffline'
