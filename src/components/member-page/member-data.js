import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import mq from '@twreporter/core/lib/utils/media-query'
import Divider from '@twreporter/react-components/lib/divider'
import { H3 } from '@twreporter/react-components/lib/text/headline'
import { P1 } from '@twreporter/react-components/lib/text/paragraph'

import { MEMBER_ROLE, MEMBER_ROLE_ZH_TW } from '../../constants/member-role'

const RowContainer = styled.div`
  display: flex;
`

const TitleContainer = styled.div`
  width: 120px;
  ${mq.tabletAndAbove`
    width: 170px;
  `}
`

const DividerContainer = styled.div`
  margin: 24px 0px;
`

const MemberData = ({
  role = MEMBER_ROLE.EXPLORER,
  email = 'user@email.com',
  joinDate = '2023/09/01',
  name = '',
}) => {
  return (
    <div>
      <H3 text={'會員資料'} />
      <DividerContainer>
        <Divider />
      </DividerContainer>
      {name && (
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
          <P1 text={'會員身分'} />
        </TitleContainer>
        <P1 text={MEMBER_ROLE_ZH_TW[role]} />
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
      <DividerContainer style={{ marginBottom: '0px' }}>
        <Divider />
      </DividerContainer>
    </div>
  )
}

MemberData.propTypes = {
  role: PropTypes.oneOf(Object.values(MEMBER_ROLE)),
  email: PropTypes.string,
  joinDate: PropTypes.string,
  name: PropTypes.string,
}

export default MemberData
