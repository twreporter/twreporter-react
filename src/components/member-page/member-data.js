import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Divider from '@twreporter/react-components/lib/divider'
import { H1, H3 } from '@twreporter/react-components/lib/text/headline'
import { P1, P2 } from '@twreporter/react-components/lib/text/paragraph'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'
import {
  READING_TIME_UNIT,
  READING_TIME_UNIT_PAGE_TEXT,
} from '@twreporter/core/lib/constants/reading-time-unit'
// lodash
import map from 'lodash/map'
const _ = {
  map,
}

const MemberDataContainer = styled.div`
  color: ${colorGrayscale.gray800};
`

const RowContainer = styled.div`
  display: flex;
  overflow-wrap: anywhere;
`

const ReadingStatisticsContainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px 48px;
`

const ReadingStatistics = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
  gap: 8px;
`

const TitleContainer = styled.div`
  width: 120px;
  flex: none;
`

const DividerContainer = styled.div`
  margin: 24px 0px;
`

const BottomDividerContainer = styled.div`
  margin-top: 24px;
`

const Promotion = styled.div`
  ${props => (props.$hide ? 'display: none;' : '')}
  margin-top: 24px;
  & {
    color: ${colorGrayscale.gray600};
  }
  a,
  a:active,
  a:visited {
    color: ${colorGrayscale.gray600};
  }
  a {
    text-underline-offset: 4px;
    text-decoration-line: underline !important;
  }
`

const promotion = {
  [MEMBER_ROLE.trailblazer]: [
    <P2 key="promotion-trailblazer-1">
      ・申請成為國家兩廳院「廳院人」會員（
      <a
        target="_blank"
        href="https://docs.google.com/forms/d/108kjczL7_zva7p0sQMWoHFPqWGIfvMavgik5HYX8mM4/edit"
        rel="noopener noreferrer"
      >
        會籍申請／展延
      </a>
      ｜
      <a
        target="_blank"
        href="https://npac-ntch.org/members"
        rel="noopener noreferrer"
      >
        查詢會籍
      </a>
      ）
    </P2>,
    <P2 key="promotion-trailblazer-2">
      ・報導者出版品與周邊 85 折（請至
      <a
        target="_blank"
        href="https://twreporter.waca.ec/"
        rel="noopener noreferrer"
      >
        報導者 Books & Goods
      </a>
      使用折扣碼：KU8R6aY9Mx36）
    </P2>,
    <P2 key="promotion-trailblazer-3">
      ・讀墨 Readmoo 報導者電子書 85 折（請至
      <a
        target="_blank"
        href="https://readmoo.pse.is/79gkpv"
        rel="noopener noreferrer"
      >
        讀墨平台
      </a>
      使用折扣碼：thereporter-15off）
    </P2>,
  ],
  [MEMBER_ROLE.action_taker]: [
    <P2 key="promotion-action-taker-1">
      ・報導者出版品與周邊 9 折（請至
      <a
        target="_blank"
        href="https://twreporter.waca.ec/"
        rel="noopener noreferrer"
      >
        報導者 Books & Goods
      </a>
      使用折扣碼：LLsWj66BFr3v）
    </P2>,
    <P2 key="promotion-action-taker-2">
      ・讀墨 Readmoo 報導者電子書 9 折（請至
      <a
        target="_blank"
        href="https://readmoo.pse.is/79gkpv"
        rel="noopener noreferrer"
      >
        讀墨平台
      </a>
      使用折扣碼：thereporter-10off）
    </P2>,
  ],
}

const MemberData = ({
  role = { key: MEMBER_ROLE.explorer, name: '' },
  email = 'user@email.com',
  joinDate = '2023/9/1',
  name = '',
  articleReadCount = 0,
  articleReadingTimeUnit = READING_TIME_UNIT.minute,
  articleReadingTime = 0,
  hideInfo = false,
}) => {
  return (
    <MemberDataContainer>
      <H3 text={'個人資料'} />
      {!hideInfo && (
        <ReadingStatisticsContainer>
          <ReadingStatistics>
            <P1 text={'閱讀篇數'} />
            <H1 text={articleReadCount.toLocaleString('en-US')} />
            <P1 text={'篇'} />
          </ReadingStatistics>
          <ReadingStatistics>
            <P1 text={'閱讀時間'} />
            <H1
              text={
                articleReadingTime > 99999
                  ? '99,999+'
                  : articleReadingTime.toLocaleString('en-US')
              }
            />
            <P1 text={READING_TIME_UNIT_PAGE_TEXT[articleReadingTimeUnit]} />
          </ReadingStatistics>
        </ReadingStatisticsContainer>
      )}
      <DividerContainer>
        <Divider />
      </DividerContainer>
      {role.key !== MEMBER_ROLE.explorer && (
        <div>
          <RowContainer>
            <TitleContainer>
              <P1 text={'姓名'} />
            </TitleContainer>
            <P1 text={name} />
          </RowContainer>
          <DividerContainer>
            <Divider />
          </DividerContainer>
        </div>
      )}
      <RowContainer>
        <TitleContainer>
          <P1 text={'方案身分'} />
        </TitleContainer>
        <P1 text={role.name} />
      </RowContainer>
      <DividerContainer>
        <Divider />
      </DividerContainer>
      <RowContainer>
        <TitleContainer>
          <P1 text={'電子信箱'} />
        </TitleContainer>
        <P1 text={email} />
      </RowContainer>
      <DividerContainer>
        <Divider />
      </DividerContainer>
      <RowContainer>
        <TitleContainer>
          <P1 text={'加入日期'} />
        </TitleContainer>
        <P1 text={joinDate} />
      </RowContainer>
      <BottomDividerContainer>
        <Divider />
      </BottomDividerContainer>
      <Promotion $hide={role.key === MEMBER_ROLE.explorer}>
        <P2 text={`${role.name}回饋`} weight={P2.Weight.BOLD} />
        {_.map(promotion[role.key], jsx => jsx)}
      </Promotion>
    </MemberDataContainer>
  )
}

MemberData.propTypes = {
  role: PropTypes.shape({
    id: PropTypes.string,
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    name_en: PropTypes.string,
  }),
  email: PropTypes.string,
  joinDate: PropTypes.string,
  name: PropTypes.string,
  articleReadCount: PropTypes.number,
  articleReadingTimeUnit: PropTypes.oneOf(Object.values(READING_TIME_UNIT)),
  articleReadingTime: PropTypes.number,
  hideInfo: PropTypes.bool,
}

export default MemberData
