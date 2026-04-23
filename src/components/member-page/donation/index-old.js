import React, { useEffect, useRef, useState, useContext } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import querystring from 'querystring'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
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
import { EmptyDonation } from './empty-donation-old'
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
  const apiOrigin = useSelector(state =>
    _.get(state, [reduxStateFields.origins, 'api'])
  )

  const [records, setRecords] = useState([])
  const [showEmptyState, setShowEmptyState] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isYearlyReceiptDownloading, setIsYearlyReceiptDownloading] = useState(
    false
  )
  const [isYearlyReceiptGenerating, setIsYearlyReceiptGenerating] = useState(
    false
  )
  const [yearlyDownloadTextYear, setYearlyDownloadTextYear] = useState(0)
  const yearlyReceiptGeneratingTimerRef = useRef(null)

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
    if (isYearlyReceiptDownloading || isYearlyReceiptGenerating) {
      return
    }
    setIsYearlyReceiptDownloading(true)

    try {
      const result = await downloadYearlyReceiptTrigger({
        year: yearlyDownloadTextYear,
        email,
        jwt,
      }).unwrap()

      if (yearlyReceiptGeneratingTimerRef.current) {
        clearTimeout(yearlyReceiptGeneratingTimerRef.current)
        yearlyReceiptGeneratingTimerRef.current = null
      }
      setIsYearlyReceiptGenerating(false)

      const url = window.URL.createObjectURL(result)
      const link = document.createElement('a')
      link.href = url
      link.download = `《報導者》${yearlyDownloadTextYear}年度贊助收據.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(link.href)
    } catch (err) {
      // If the receipt file doesn't exist yet (404), trigger on-demand generation.
      // The generation is async on the server side; notify the user to retry in a moment.
      if (err && err.status === 404) {
        if (!apiOrigin) {
          console.error('yearly receipt generation: API origin not configured')
          toastr({
            text:
              '收據下載失敗，請稍後再試，或來信 contact@twreporter.org 由專人協助',
          })
        } else {
          try {
            await axios.post(
              `${apiOrigin}/v1/donations/receipt/${yearlyDownloadTextYear}`,
              null,
              {
                withCredentials: true,
                headers: { Authorization: `Bearer ${jwt}` },
                timeout: 8000,
              }
            )
            // axios resolves only on 2xx; reaching here means receipt generation started
            setIsYearlyReceiptGenerating(true)
            toastr({ text: '收據製作中，請 1 分鐘後再次點擊' })
            if (yearlyReceiptGeneratingTimerRef.current) {
              clearTimeout(yearlyReceiptGeneratingTimerRef.current)
            }
            yearlyReceiptGeneratingTimerRef.current = setTimeout(() => {
              setIsYearlyReceiptGenerating(false)
              yearlyReceiptGeneratingTimerRef.current = null
            }, 60 * 1000)
          } catch (postErr) {
            if (postErr?.response?.status === 404) {
              // go-api proxies 404 from member-cms: no donations for this year,
              // so a receipt can never be generated.
              toastr({
                text: `${yearlyDownloadTextYear} 年度無贊助紀錄，無法產生收據`,
              })
            } else {
              console.error(
                'failed to trigger yearly receipt generation:',
                postErr
              )
              toastr({
                text:
                  '收據下載失敗，請稍後再試，或來信 contact@twreporter.org 由專人協助',
              })
            }
          }
        }
      } else {
        console.error('download receipt failed. err:', err)
        toastr({
          text:
            '收據下載失敗，請稍後再試，或來信 contact@twreporter.org 由專人協助',
        })
      }
    } finally {
      setIsYearlyReceiptDownloading(false)
    }
  }

  useEffect(() => {
    return () => {
      if (yearlyReceiptGeneratingTimerRef.current) {
        clearTimeout(yearlyReceiptGeneratingTimerRef.current)
        yearlyReceiptGeneratingTimerRef.current = null
      }
    }
  }, [])

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
          <PillButton
            text={
              isYearlyReceiptGenerating
                ? '收據製作中...'
                : `${yearlyDownloadTextYear}年度收據`
            }
            style={PillButton.Style.DARK}
            type={PillButton.Type.PRIMARY}
            size={PillButton.Size.S}
            loading={isYearlyReceiptDownloading}
            disabled={isYearlyReceiptDownloading || isYearlyReceiptGenerating}
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
