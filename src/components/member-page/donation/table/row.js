import React, { memo, useState, useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { P1 } from '@twreporter/react-components/lib/text/paragraph'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { Arrow } from '@twreporter/react-components/lib/icon'
import divider from '@twreporter/react-components/lib/divider'
import twreporterRedux from '@twreporter/redux'
import { IconButton } from '@twreporter/react-components/lib/button'
import { useLazyGetPrimeReceiptQuery } from '@twreporter/redux/lib/actions/receipt'
// constants
import {
  DonationType,
  DonationTypeLabel,
  PrimeDonationStatus,
  PeriodicDonationStatus,
} from '../../../../constants/donation'
// components
import { StatusBadge } from '../status-bagde'
import { TableRowDetail } from './row-detail'
// context
import { CoreContext } from '../../../../contexts'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const { actions, reduxStateFields } = twreporterRedux
const { getUserPeriodicDonationHistory } = actions

const TableContent = styled.div`
  display: contents;
  cursor: pointer;
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
    justify-content: space-between;
  }
  ${mq.mobileOnly`
    display: none;
  `}
`

const P1Gray800 = styled(P1)`
  color: ${colorGrayscale.gray800};
`

const P1Gray600 = styled(P1)`
  color: ${colorGrayscale.gray600};
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

const ArrowIcon = styled(Arrow)`
  transform: rotate(${props => props.$rotate});
  transition: all 300ms;
`

const Divider = styled(divider)`
  width: 100%;
  grid-column: 1 / 7;
  margin-top: 16px;
  margin-bottom: 16px;
`

export const formattedDate = date =>
  `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`

const getShowEditDonationInfo = status => {
  switch (status) {
    case PrimeDonationStatus.PAYING:
    case PrimeDonationStatus.PAID:
    case PeriodicDonationStatus.TO_PAY:
    case PeriodicDonationStatus.PAYING:
    case PeriodicDonationStatus.PAID:
    case PeriodicDonationStatus.STOPPED:
      return true
    default:
      return false
  }
}

export const TableRow = memo(({ record }) => {
  const {
    type,
    created_at: createdAt,
    amount,
    status,
    order_number: orderNumber,
  } = record
  const donationDate = formattedDate(new Date(createdAt))
  const amountSuffix = type === DonationType.PRIME ? '元' : '元/月'
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isReceiptDownloading, setIsReceiptDownloading] = useState(false)
  const [periodicHistory, setPeriodicHistory] = useState([])
  const { releaseBranch } = useContext(CoreContext)

  const dispatch = useDispatch()

  const detail = useSelector(state =>
    _.get(state, [
      reduxStateFields.donationHistory,
      'periodicDonationHistory',
      'records',
      orderNumber,
    ])
  )
  const jwt = useSelector(state =>
    _.get(state, [reduxStateFields.auth, 'accessToken'])
  )
  const email = useSelector(state =>
    _.get(state, [reduxStateFields.auth, 'userInfo', 'email'])
  )
  const getPeriodicDonationHistory = () => {
    if (detail) {
      setPeriodicHistory(detail)
    } else {
      dispatch(getUserPeriodicDonationHistory(jwt, orderNumber, 0, 18)).then(
        res => {
          const { meta, records } = _.get(res, 'payload.data')
          const { limit, offset, total } = meta
          setPeriodicHistory({ limit, offset, total, records })
        }
      )
    }
  }

  const showEditDonationInfo = getShowEditDonationInfo(record.status)
  const showDownloadReceipt =
    type === DonationType.PRIME &&
    record.send_receipt !== 'no_receipt' &&
    record.status === PrimeDonationStatus.PAID &&
    new Date(createdAt) >= new Date(2024, 8, 1)
  const [downloadReceiptTrigger, ,] = useLazyGetPrimeReceiptQuery()
  const { toastr } = useContext(CoreContext)
  const downloadReceipt = async e => {
    e.stopPropagation()
    e.preventDefault()
    if (isReceiptDownloading) {
      return
    }
    toastr({ text: '收據開立中，開立完成會自動下載' })
    setIsReceiptDownloading(true)
    try {
      const result = await downloadReceiptTrigger({
        orderNumber: record.order_number,
        jwt,
      }).unwrap()

      // Create a link element to trigger the download
      const url = window.URL.createObjectURL(result)
      const link = document.createElement('a')
      link.href = url

      // Set the filename as `<order number>.pdf`
      const filename = `${record.order_number}.pdf`
      link.download = filename.replace(/['"]/g, '') // Remove any quotes from filename

      // Append the link, click it to start download, and remove it afterward
      document.body.appendChild(link)
      link.click()
      link.remove()

      // Release the blob URL to free up memory
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('download receipt failed. err:', err)
    } finally {
      setIsReceiptDownloading(false)
    }
  }

  const handleRowClick = async () => {
    setIsLoading(true)
    if (!isOpen) {
      if (type === DonationType.PERIODIC) {
        getPeriodicDonationHistory()
      }
    }
    setTimeout(() => setIsLoading(false), 1000)
    setIsOpen(!isOpen)
  }
  return (
    <React.Fragment>
      <TableContent onClick={handleRowClick}>
        <P1Gray800 className="donation-date" text={donationDate} />
        <P1Gray800 className="type" text={DonationTypeLabel[type]} />
        <P1Gray800 className="donation-number" text={orderNumber} />
        <P1Gray800
          className="amount"
          text={`${amount.toLocaleString('en-US')}${amountSuffix}`}
        />
        <div className="status">
          <StatusBadge status={status} type={type} />
          <IconButton
            iconComponent={
              <ArrowIcon
                direction={Arrow.Direction.DOWN}
                $rotate={isOpen ? '-180deg' : '0'}
                releaseBranch={releaseBranch}
              />
            }
            theme={IconButton.THEME.normal}
            type={IconButton.Type.PRIMARY}
            active={false}
          />
        </div>
      </TableContent>
      <MobileTableContent onClick={handleRowClick}>
        <P1Gray800 text={donationDate} />
        <div className="row">
          <P1Gray800 weight={P1.Weight.BOLD} text={DonationTypeLabel[type]} />
          <StatusBadge status={status} type={type} />
          <P1Gray800
            className="amount"
            text={`${amount.toLocaleString('en-US')}${amountSuffix}`}
          />
          <IconButton
            iconComponent={
              <ArrowIcon
                direction={Arrow.Direction.DOWN}
                $rotate={isOpen ? '-180deg' : '0'}
                releaseBranch={releaseBranch}
              />
            }
            theme={IconButton.THEME.normal}
            type={IconButton.Type.PRIMARY}
            active={false}
          />
        </div>
        <P1Gray600 className="donation-number" text={orderNumber} />
      </MobileTableContent>
      {isOpen && (
        <TableRowDetail
          record={record}
          periodicHistory={periodicHistory}
          isLoading={isLoading}
          showDownloadReceipt={showDownloadReceipt}
          downloadReceipt={downloadReceipt}
          isDownloading={isReceiptDownloading}
          showEditDonationInfo={showEditDonationInfo}
          email={email}
        />
      )}
      <Divider />
    </React.Fragment>
  )
})

TableRow.propTypes = {
  record: PropTypes.object.isRequired,
}

TableRow.displayName = 'TableRow'
