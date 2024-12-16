import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import querystring from 'querystring'
import { useLocation } from 'react-router-dom'
import dayjs from 'dayjs'
// @twreporter
import { H3 } from '@twreporter/react-components/lib/text/headline'
import { P2 } from '@twreporter/react-components/lib/text/paragraph'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import {
  InheritLinkButton,
  PillButton,
} from '@twreporter/react-components/lib/button'
import mq from '@twreporter/core/lib/utils/media-query'
import FetchingWrapper from '@twreporter/react-components/lib/is-fetching-wrapper'
import twreporterRedux from '@twreporter/redux'
import { useLazyGetYearlyReceiptQuery } from '@twreporter/redux/lib/actions/receipt'
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
`

const DownloadYearlyReceiptButton = styled(PillButton)`
  height: 122px;
  height: 29px;
`

const Loading = styled.div``
const LoadingMask = FetchingWrapper(Loading)

const { reduxStateFields, actions } = twreporterRedux
const { getUserDonationHistory } = actions

const MemberDonationPage = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  // redux state
  const authState = state => _.get(state, reduxStateFields.auth, {})
  const donationHistoryState = state =>
    _.get(state, reduxStateFields.donationHistory)

  const userInfoSelectoy = createSelector(
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
  const { userID, email, jwt } = useSelector(userInfoSelectoy)
  const { totalDonationHistory } = useSelector(totalDonationSelector)

  const [records, setRecords] = useState([])
  const [showEmptyState, setShowEmptyState] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isYearlyReceiptDownloading, setIsYearlyReceiptDownloading] = useState(
    false
  )
  const [yearlyDownloadTextYear, setYearlyDownloadTextYear] = useState(0)

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
    const { records } = _.get(payload, 'data', [])
    if (records.length === 0) {
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

  useEffect(() => {
    // get donations
    setIsLoading(true)
    getDonationHistory(currentPage)

    // check yearly receipt download state
    const now = dayjs()
    const currentYear = now.year()
    if (currentYear >= 2024) {
      // if current time is before 1/10, show previous year
      const downloadYear =
        now.month() === 0 && now.date() < 10 ? currentYear - 1 : currentYear
      setYearlyDownloadTextYear(downloadYear)
    }
  }, [currentPage])

  if (showEmptyState) {
    return (
      <DonationPageContainer>
        <StyledH3 text="贊助紀錄" />
        <LoadingMask isFetching={isLoading} showSpinner={isLoading}>
          <EmptyDonationContainer>
            <EmptyDonation />
          </EmptyDonationContainer>
        </LoadingMask>
      </DonationPageContainer>
    )
  }

  return (
    <DonationPageContainer>
      <TitleContainer>
        <StyledH3 text="贊助紀錄" />
        {yearlyDownloadTextYear > 0 ? (
          <DownloadYearlyReceiptButton
            text={`${yearlyDownloadTextYear}年度收據`}
            style={PillButton.Style.DARK}
            type={PillButton.Type.PRIMARY}
            size={PillButton.Size.S}
            loading={isYearlyReceiptDownloading}
            disabled={isYearlyReceiptDownloading}
            onClick={handleYearlyReceiptDownload}
          />
        ) : null}
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
          因系統限制，本頁面僅顯示透過《報導者》網站進行贊助的資料。若您是透過其他方式贊助，且需要相關贊助紀錄，請透過客服信箱聯繫我們：
          <InheritLinkButton
            text="events@twreporter.org"
            link={{
              isExternal: true,
              to: 'mailto:events@twreporter.org',
              target: '_blank',
            }}
            type={InheritLinkButton.Type.UNDERLINE}
          />
        </DescWithLink>
      </Info>
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
