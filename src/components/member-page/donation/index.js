import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
// @twreporter
import { H3 } from '@twreporter/react-components/lib/text/headline'
import { P2 } from '@twreporter/react-components/lib/text/paragraph'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { InheritLinkButton } from '@twreporter/react-components/lib/button'
import mq from '@twreporter/core/lib/utils/media-query'
// components
import { EmptyDonation } from './empty-donation'
import { Table } from './table'
import Pagination from '../../Pagination'
// fake data
import { generateFakeData } from './fake-data'

const DonationPageContainer = styled.div`
  width: 100%;
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
  .no-margin {
    margin: 0px;
  }
`

const P2Gray600 = styled(P2)`
  color: ${colorGrayscale.gray600};
`

const Info = styled.div`
  width: 100%;
  ${mq.tabletAndAbove`
    margin-top: ${props => (props.isPaginationShow ? '120px' : '80px')};
  `}
  ${mq.mobileOnly`
    margin-top: ${props => (props.isPaginationShow ? '64px' : '80px')};
  `}
  margin-bottom: 64px;
`

const DescWithLink = styled(P2Gray600)`
  display: unset;
`

const MemberDonationPage = () => {
  // TODO: remove after get data from api
  // ?total=100page=5
  const { search } = useLocation()
  const param = new URLSearchParams(search)
  const total = Number(param.get('total'))
  const page = Number(param.get('page'))
  const limitPerPage = 10
  const totalPages = Math.ceil(total / limitPerPage)
  const [fakeData, setFakeData] = useState([])
  const [records, setRecords] = useState([])

  useEffect(() => {
    setFakeData(generateFakeData(total))
  }, [total])

  useEffect(() => {
    setRecords(fakeData.slice((page - 1) * limitPerPage, page * limitPerPage))
  }, [page, fakeData])

  if (total === 0) {
    return (
      <DonationPageContainer>
        <StyledH3 text="贊助紀錄" />
        <EmptyDonationContainer>
          <EmptyDonation />
        </EmptyDonationContainer>
      </DonationPageContainer>
    )
  }

  return (
    <DonationPageContainer>
      <StyledH3 text="贊助紀錄" />
      <Table totalPages={totalPages} page={page} records={records} />
      {totalPages > 1 && (
        <PaginationContainer>
          <Pagination
            className={'no-margin'}
            currentPage={page}
            totalPages={totalPages}
          />
        </PaginationContainer>
      )}
      <Info isPaginationShow={totalPages > 1}>
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
          。」
        </DescWithLink>
      </Info>
    </DonationPageContainer>
  )
}

export default MemberDonationPage
