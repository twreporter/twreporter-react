import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
// @twreporter
import { P3, P4 } from '@twreporter/react-components/lib/text/paragraph'
import {
  colorGrayscale,
  colorOpacity,
} from '@twreporter/core/lib/constants/color'
import twreporterRedux from '@twreporter/redux'
import FetchingWrapper from '@twreporter/react-components/lib/is-fetching-wrapper'
// components
import { formattedDate } from './table/row'
import { PayMethodType } from '../../../constants/donation'
import { cardTypeDictionary } from './table/row-detail'
import { Logo } from './download-page-logo'

// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const Container = styled.div`
  width: 800px;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 16px;
  @media print {
    * {
      -webkit-print-color-adjust: exact !important;
    }
  }
`

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const P3Gray800 = styled(P3)`
  color: ${colorGrayscale.gray800};
`

const P4Gray600 = styled(P4)`
  color: ${colorGrayscale.gray600};
`

const ReceiptBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const ReceiptHeader = styled(P3Gray800)`
  width: 100%;
  height: 32px;
  border-bottom: 1px solid ${colorGrayscale.gray200};
  display: flex;
  align-items: center;
`

const ReceiptContent = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const ReceiptContentHeader = styled(P3Gray800)`
  width: 120px;
`

const RecordBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const RecordBoxHeader = styled.div`
  width: 100%;
  height: 32px;
  gap: 16px;
  border-bottom: 1px solid ${colorGrayscale.gray200};
  display: flex;
  align-items: center;
  .date {
    width: 20%;
  }
  .order-number {
    width: 40%;
  }
  .amount {
    width: 20%;
  }
  .status {
    width: 20%;
  }
`

const RecordBoxContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media print {
    * {
      break-inside: avoid;
    }
  }
`

const RecordBoxContentRow = styled.div`
  width: 100%;
  height: 32px;
  gap: 16px;
  display: flex;
  align-items: center;
  &:nth-child(even) {
    background-color: ${colorOpacity['black_0.05']};
  }
  .date {
    width: 20%;
  }
  .order-number {
    width: 40%;
  }
  .amount {
    width: 20%;
  }
  .status {
    width: 20%;
  }
`

const DotGroup = styled.div`
  display: flex;
  gap: 4px;
`

const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${colorGrayscale.black};
`

const Loading = styled.div``

const LoadingMask = FetchingWrapper(Loading)

const DotGroups = () =>
  Array.from({ length: 3 }, (_, i) => (
    <DotGroup key={i}>
      <Dot />
      <Dot />
      <Dot />
      <Dot />
    </DotGroup>
  ))

const { reduxStateFields } = twreporterRedux

const statusDictionary = {
  paying: '進行中',
  paid: '已完成',
  fail: '扣款失敗',
  refunded: '已退款',
}

const DonwloadPage = () => {
  const { orderNumber } = useParams()
  const [history, setHistory] = useState()
  const [receiptHeader, setReceiptHeader] = useState('')
  const [receiptAddress, setReceiptAddress] = useState('')
  const [receiptPayMethod, setReceiptPayMethod] = useState('')
  const [cardLastFour, setCardLastFour] = useState('')
  const [cardType, setCardType] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const jwt = useSelector(state =>
    _.get(state, [reduxStateFields.auth, 'accessToken'])
  )
  const apiOrigin = useSelector(state =>
    _.get(state, [reduxStateFields.origins, 'api'])
  )

  const getReceiptData = async () => {
    try {
      const { data: orderResponseData } = await axios.get(
        `${apiOrigin}/v1/periodic-donations/orders/${orderNumber}`,
        {
          timeout: 8000,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          withCredentials: true,
        }
      )
      const {
        card_info: cardInfo,
        receipt,
        pay_method: payMethod,
      } = orderResponseData.data
      const address = `${receipt.address_state || ''}${receipt.address_city ||
        ''}${receipt.address_detail || ''}`
      setReceiptHeader(receipt.header)
      setReceiptAddress(address)
      setReceiptPayMethod(payMethod)
      setCardLastFour(cardInfo.last_four)
      setCardType(cardInfo.type)
    } catch (e) {
      setHasError(e)
    }
  }
  const getPaymentHistory = async () => {
    try {
      // set limit to -1 to get all records
      const { data: historyResponseData } = await axios.get(
        `${apiOrigin}/v1/periodic-donations/orders/${orderNumber}/payments?limit=-1`,
        {
          timeout: 8000,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          withCredentials: true,
        }
      )
      const { records } = historyResponseData
      setHistory(records)
    } catch (e) {
      setHasError(e)
    }
  }

  useEffect(() => {
    getReceiptData()
      .then(() => getPaymentHistory())
      .finally(() => setIsLoading(false))
    window.print()
  }, [])

  if (hasError) {
    window.alert('發生一些問題，請重新下載')
    window.close()
  }

  return (
    <LoadingMask isFetching={isLoading} showSpinner={isLoading}>
      <Container>
        <Header>
          <Logo />
          <P4Gray600 text={`贊助編號: ${orderNumber}`} />
        </Header>
        <ReceiptBox>
          <ReceiptHeader weight={P3.Weight.BOLD} text="收據資料" />
          <ReceiptContent>
            <ReceiptContentHeader text="收據抬頭" />
            <P3Gray800 text={receiptHeader} />
          </ReceiptContent>
          <ReceiptContent>
            <ReceiptContentHeader text="收據寄送地址" />
            <P3Gray800 text={receiptAddress} />
          </ReceiptContent>
          <ReceiptContent>
            <ReceiptContentHeader text="付款方式" />
            {receiptPayMethod === PayMethodType.LINE ? (
              <P3Gray800 text="LINE Pay" />
            ) : (
              <>
                <P3Gray800 text={cardTypeDictionary[cardType]} />
                <DotGroups />
                <P3Gray800 text={cardLastFour} />
              </>
            )}
          </ReceiptContent>
        </ReceiptBox>
        <RecordBox>
          <RecordBoxHeader>
            <P3Gray800
              className="date"
              weight={P3.Weight.BOLD}
              text="扣款日期"
            />
            <P3Gray800
              className="order-number"
              weight={P3.Weight.BOLD}
              text="扣款編號"
            />
            <P3Gray800 className="amount" weight={P3.Weight.BOLD} text="金額" />
            <P3Gray800 className="status" weight={P3.Weight.BOLD} text="狀態" />
          </RecordBoxHeader>
          <RecordBoxContent>
            {history &&
              history.map((record, idx) => (
                <RecordBoxContentRow key={idx}>
                  <P3Gray800
                    className="date"
                    text={formattedDate(new Date(record.created_at))}
                  />
                  <P3Gray800
                    className="order-number"
                    text={record.order_number}
                  />
                  <P3Gray800
                    className="amount"
                    text={`${record.amount.toLocaleString('en-US')}元`}
                  />
                  <P3Gray800
                    className="status"
                    text={statusDictionary[record.status]}
                  />
                </RecordBoxContentRow>
              ))}
          </RecordBoxContent>
        </RecordBox>
      </Container>
    </LoadingMask>
  )
}

export default DonwloadPage
