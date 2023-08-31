import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Divider from '@twreporter/react-components/lib/divider'
import { H3 } from '@twreporter/react-components/lib/text/headline'
import { P1 } from '@twreporter/react-components/lib/text/paragraph'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'

const MemberDataContainer = styled.div`
  color: ${colorGrayscale.gray800};
`

const RowContainer = styled.div`
  display: flex;
  overflow-wrap: anywhere;
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

const MemberData = ({
  role = { key: MEMBER_ROLE.explorer, name: '' },
  email = 'user@email.com',
  joinDate = '2023/09/01',
  name = '',
}) => {
  return (
    <MemberDataContainer>
      <H3 text={'個人資料'} />
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
}

export default MemberData
