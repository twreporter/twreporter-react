import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import querystring from 'querystring'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
// @twreporter
import { H3 } from '@twreporter/react-components/lib/text/headline'
import { P2 } from '@twreporter/react-components/lib/text/paragraph'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { InheritLinkButton } from '@twreporter/react-components/lib/button'
import mq from '@twreporter/core/lib/utils/media-query'
import FetchingWrapper from '@twreporter/react-components/lib/is-fetching-wrapper'
import twreporterRedux from '@twreporter/redux'
// components
import { EmptyDonation } from './empty-donation'
import { Table } from './table'
import Pagination from '../../Pagination'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const DONATION_HISTORY_PER_PAGE = 10

const _ = {
  get,
  map,
}

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
const Loading = styled.div``
const LoadingMask = FetchingWrapper(Loading)

const MemberDonationPage = ({
  jwt,
  userID,
  getUserDonationHistory,
  page,
  totalPages,
}) => {
  const [records, setRecords] = useState([])
  const [showEmptyState, setShowEmptyState] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const getDonationHistory = async page => {
    const { payload } = await getUserDonationHistory(
      jwt,
      userID,
      (page - 1) * DONATION_HISTORY_PER_PAGE,
      DONATION_HISTORY_PER_PAGE
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

  useEffect(() => {
    setIsLoading(true)
    getDonationHistory(page)
  }, [page])

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
      <StyledH3 text="贊助紀錄" />
      <LoadingMask isFetching={isLoading} showSpinner={isLoading}>
        <Table records={records} />
        {totalPages > 1 && (
          <PaginationContainer>
            <NoMarginPagination currentPage={page} totalPages={totalPages} />
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

MemberDonationPage.propTypes = {
  jwt: PropTypes.string.isRequired,
  userID: PropTypes.number.isRequired,
  getUserDonationHistory: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
}

const { reduxStateFields, actions } = twreporterRedux
const { getUserDonationHistory } = actions

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

const mapStateToProps = (state, props) => {
  const jwt = _.get(state, [reduxStateFields.auth, 'accessToken'])
  const userID = _.get(state, [reduxStateFields.auth, 'userInfo', 'user_id'])
  const totalDonationHistory = _.get(
    state,
    [reduxStateFields.donationHistory, 'total'],
    0
  )

  const location = _.get(props, 'location')
  let currentPage = pageProp(location)
  const totalPages = Math.ceil(totalDonationHistory / 10)
  if (currentPage > totalPages) {
    currentPage = Math.max(totalPages, 1)
  }
  return {
    jwt,
    userID,
    page: currentPage,
    totalPages,
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    { getUserDonationHistory }
  )(MemberDonationPage)
)
