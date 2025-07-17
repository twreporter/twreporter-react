import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import querystring from 'querystring'
import { useLocation } from 'react-router-dom'
import dayjs from 'dayjs'
// @twreporter
import { H3, H4 } from '@twreporter/react-components/lib/text/headline'
import { P2, P1 } from '@twreporter/react-components/lib/text/paragraph'
import {
  colorGrayscale,
  colorOpacity,
} from '@twreporter/core/lib/constants/color'
import {
  InheritLinkButton,
  PillButton,
  TextButton,
} from '@twreporter/react-components/lib/button'
import mq from '@twreporter/core/lib/utils/media-query'
import FetchingWrapper from '@twreporter/react-components/lib/is-fetching-wrapper'
import twreporterRedux from '@twreporter/redux'
import { useLazyGetYearlyReceiptQuery } from '@twreporter/redux/lib/actions/receipt'
import { Download } from '@twreporter/react-components/lib/icon'
import zIndexConst from '@twreporter/core/lib/constants/z-index'
// components
import { EmptyDonation } from './empty-donation'
import { Table } from './table'
import Pagination from '../../Pagination'
// context
import { CoreContext } from '../../../contexts'
// lodash
import get from 'lodash/get'
const _ = {
  get,
}

const DONATION_HISTORY_PER_PAGE = 10

const DonationPageContainer = styled.div`
  width: 100%;
  margin-bottom: -136px; // target padding-bottom is 64px, but parent container has padding-bottom 200px
`

const StyledH3 = styled(H3)`
  color: ${colorGrayscale.gray800};
`

const EmptyDonationContainer = styled.div`
  width: 100%;
  padding-top: 72px;
  display: flex;
  justify-content: center;
`

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const NoMarginPagination = styled(Pagination)`
  margin: 0px;
`

const P2Gray600 = styled(P2)`
  color: ${colorGrayscale.gray600};
`

const Info = styled.div`
  width: 100%;
  ${mq.tabletAndAbove`
    margin-top: ${props => (props.$isPaginationShow ? '120px' : '80px')};
  `}
  ${mq.mobileOnly`
    margin-top: ${props => (props.$isPaginationShow ? '64px' : '80px')};
  `}
`

const DescWithLink = styled(P2Gray600)`
  display: unset;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mq.mobileOnly`
    flex-direction: column;
    gap: 16px;
    align-items: start;
  `}
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
  height: 29px;
`

const ImportOfflineDonationButton = styled(PillButton)``

const DownloadYearlyReceiptButton = styled(PillButton)``

const PopupContainer = styled.div`
  visibility: ${props => (props.$show ? 'visible' : 'hidden')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${colorOpacity['black_0.7']};
  z-index: ${zIndexConst.popup};
  display: flex;
  justify-content: center;
  align-items: center;
`

const Popup = styled.div`
  padding: 40px;
  width: 400px;
  background-color: ${colorGrayscale.white};
  display: flex;
  flex-direction: column;
  gap: 30px;
  ${mq.mobileOnly`
    width: 100%;
    margin: 0 12px;
  `}
`

const PopupTitle = styled(H4)`
  color: ${colorGrayscale.black};
`

const PopupDesc = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colorGrayscale.black};
`

const PopupButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const PopupConfirmButton = styled(PillButton)`
  width: 96px;
  justify-content: center;
`

const Loading = styled.div``
const LoadingMask = FetchingWrapper(Loading)

const { reduxStateFields, actions } = twreporterRedux
const { getUserDonationHistory } = actions

// TODO: properties will change after connect to api
const fakeOfflineDonation = [
  {
    type: 'offline',
    attribute: 'periodic',
    order_number: 'twreporter-174349312872931487200',
    created_at: new Date('2025/5/25'),
    amount: 1000,
    status: 'paid',
    send_receipt: 'no_receipt',
    receipt_header: '王小明',
    sponsorship_resource: 'line',
  },
  {
    type: 'offline',
    attribute: 'prime',
    order_number: 'twreporter-174349312872931487211',
    created_at: new Date('2025/5/26'),
    amount: 3000,
    status: 'paid',
    send_receipt: 'paperback_receipt',
    receipt_header: '王小明',
    receipt_address_zip_code: '104',
    receipt_address_state: '台北市',
    receipt_address_city: '中山區',
    receipt_address_detail: '南京東路一段31巷6號6樓',
    sponsorship_resource: 'credit_card_prime',
  },
]

const MemberDonationPage = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  // redux state
  const authState = state => _.get(state, reduxStateFields.auth, {})
  const donationHistoryState = state =>
    _.get(state, reduxStateFields.donationHistory)

  const userInfoSelector = createSelector(
    authState,
    auth => ({
      userID: _.get(auth, ['userInfo', 'user_id']),
      email: _.get(auth, ['userInfo', 'email']),
      jwt: _.get(auth, 'accessToken'),
    })
  )
  const totalDonationSelector = createSelector(
    donationHistoryState,
    donationHistory => ({
      totalDonationHistory: _.get(donationHistory, 'total', 0),
    })
  )
  const { userID, email, jwt } = useSelector(userInfoSelector)
  const { totalDonationHistory } = useSelector(totalDonationSelector)

  const [records, setRecords] = useState([])
  const [showEmptyState, setShowEmptyState] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isYearlyReceiptDownloading, setIsYearlyReceiptDownloading] = useState(
    false
  )
  const [yearlyDownloadTextYear, setYearlyDownloadTextYear] = useState(0)
  // for testing, need to remove after connect to api
  const [hasOfflineDonation, setHasOfflineDonation] = useState(true)
  const [showOfflineDonationPopup, setShowOfflineDonationPopup] = useState(
    false
  )

  const [downloadYearlyReceiptTrigger, ,] = useLazyGetYearlyReceiptQuery()

  const { toastr } = useContext(CoreContext)

  let currentPage = pageProp(location)
  const totalPages = Math.ceil(totalDonationHistory / 10)
  if (currentPage > totalPages) {
    currentPage = Math.max(totalPages, 1)
  }

  const getDonationHistory = async page => {
    const { payload } = await dispatch(
      getUserDonationHistory(
        jwt,
        userID,
        (page - 1) * DONATION_HISTORY_PER_PAGE,
        DONATION_HISTORY_PER_PAGE
      )
    )
    const { records } = _.get(payload, 'data', {})
    if (!records || records.length === 0) {
      setShowEmptyState(true)
    } else {
      setShowEmptyState(false)
      setRecords(records)
    }
    setIsLoading(false)
  }

  const handleYearlyReceiptDownload = async () => {
    if (isYearlyReceiptDownloading) {
      return
    }
    setIsYearlyReceiptDownloading(true)
    toastr({ text: '收據開立中，開立完成會自動下載' })

    try {
      const result = await downloadYearlyReceiptTrigger({
        year: yearlyDownloadTextYear,
        email,
        jwt,
      }).unwrap()

      const url = window.URL.createObjectURL(result)
      const link = document.createElement('a')
      link.href = url
      link.download = `《報導者》${yearlyDownloadTextYear}年度贊助收據.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(link.href)
    } catch (err) {
      console.error('download receipt failed. err:', err)
    } finally {
      setIsYearlyReceiptDownloading(false)
    }
  }

  const handleImportOfflineDonation = () => {
    // TODO: call api
    toastr({ text: '匯入中...' })
    setHasOfflineDonation(false)
    setRecords(prev => [...fakeOfflineDonation, ...prev])
    setShowEmptyState(false)
    setShowOfflineDonationPopup(false)
  }

  useEffect(() => {
    // get donations
    setIsLoading(true)
    getDonationHistory(currentPage)

    // check yearly receipt download state
    const now = dayjs()
    const currentYear = now.year()
    // previous year reveipt could be download after 1/10
    // if current time is before 1/10, show -2 year
    const downloadYear =
      now.month() === 0 && now.date() < 10 ? currentYear - 2 : currentYear - 1
    if (downloadYear >= 2024) {
      setYearlyDownloadTextYear(downloadYear)
    }
  }, [currentPage])

  if (showEmptyState) {
    return (
      <DonationPageContainer>
        <StyledH3 text="贊助紀錄" />
        <LoadingMask isFetching={isLoading} showSpinner={isLoading}>
          <EmptyDonationContainer>
            <EmptyDonation
              handleImportOfflineDonation={handleImportOfflineDonation}
            />
          </EmptyDonationContainer>
        </LoadingMask>
      </DonationPageContainer>
    )
  }

  return (
    <DonationPageContainer>
      <TitleContainer>
        <StyledH3 text="贊助紀錄" />
        <ButtonsContainer>
          {hasOfflineDonation ? (
            <ImportOfflineDonationButton
              text="匯入非官網贊助紀錄"
              style={PillButton.Style.DARK}
              type={PillButton.Type.SECONDARY}
              size={PillButton.Size.S}
              onClick={() => setShowOfflineDonationPopup(true)}
            />
          ) : null}
          {yearlyDownloadTextYear > 0 ? (
            <DownloadYearlyReceiptButton
              text={`${yearlyDownloadTextYear}收據`}
              style={PillButton.Style.DARK}
              type={PillButton.Type.PRIMARY}
              size={PillButton.Size.S}
              loading={isYearlyReceiptDownloading}
              disabled={isYearlyReceiptDownloading}
              onClick={handleYearlyReceiptDownload}
              rightIconComponent={<Download />}
            />
          ) : null}
        </ButtonsContainer>
      </TitleContainer>
      <LoadingMask isFetching={isLoading} showSpinner={isLoading}>
        <Table records={records} />
        {totalPages > 1 && (
          <PaginationContainer>
            <NoMarginPagination
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </PaginationContainer>
        )}
      </LoadingMask>
      <Info $isPaginationShow={totalPages > 1}>
        <DescWithLink>
          ・因系統限制，本頁面僅顯示透過《報導者》網站進行贊助的資料。若您是透過其他方式贊助，且需要相關贊助紀錄，請透過客服信箱聯繫我們：
          <InheritLinkButton
            text="events@twreporter.org"
            link={{
              isExternal: true,
              to: 'mailto:events@twreporter.org',
              target: '_blank',
            }}
            type={InheritLinkButton.Type.UNDERLINE}
          />
          <P2Gray600 text="・因應贊助者年度報稅所需，可下載前一年度贊助收據。" />
        </DescWithLink>
      </Info>
      <PopupContainer $show={showOfflineDonationPopup}>
        <Popup>
          <PopupTitle text="請確認是否同意《報導者》為您匯入非官網贊助紀錄" />
          <PopupDesc>
            <P1 text="按下同意後，將匯入此帳號自2024年1月起，於任何管道所進行贊助的紀錄。自即日起，非透過《報導者》網站贊助的紀錄，將於贊助日期的次月底匯入。" />
            <P1 text={`帳號：${email}`} />
          </PopupDesc>
          <PopupButtonsContainer>
            <TextButton
              text="取消"
              style={TextButton.Style.LIGHT}
              onClick={() => setShowOfflineDonationPopup(false)}
            />
            <PopupConfirmButton
              text="同意"
              style={PillButton.Style.DARK}
              type={PillButton.Type.PRIMARY}
              size={PillButton.Size.S}
              onClick={handleImportOfflineDonation}
            />
          </PopupButtonsContainer>
        </Popup>
      </PopupContainer>
    </DonationPageContainer>
  )
}

function pageProp(location = {}) {
  const defaultPage = 1
  const search = _.get(location, 'search', '')
  const searchWithoutPrefix =
    typeof search === 'string' ? search.replace(/^\?/, '') : search
  const pageStr = _.get(querystring.parse(searchWithoutPrefix), 'page', '1')
  let page = parseInt(Array.isArray(pageStr) ? pageStr[0] : pageStr, 10)

  if (isNaN(page) || page < defaultPage) {
    page = defaultPage
  }

  return page
}

export default MemberDonationPage
