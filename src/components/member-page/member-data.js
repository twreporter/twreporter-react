import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Divider from '@twreporter/react-components/lib/divider'
import { H1, H3 } from '@twreporter/react-components/lib/text/headline'
import { P1 } from '@twreporter/react-components/lib/text/paragraph'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'
import {
  READING_TIME_UNIT,
  READING_TIME_UNIT_PAGE_TEXT,
} from '@twreporter/core/lib/constants/reading-time-unit'

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

const OnlyForGTM = styled.div``

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
      <OnlyForGTM name="merchandise-promo-code" />
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
