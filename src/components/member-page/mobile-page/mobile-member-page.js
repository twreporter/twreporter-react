import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// context
import { CoreContext } from '../../../contexts'
// @twreporter
import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'
import MobileMemberRoleCard from '@twreporter/react-components/lib/mobile-member-role-card'
import { READING_TIME_UNIT } from '@twreporter/core/lib/constants/reading-time-unit'
// components
import MobileMemberMenuList from './mobile-menu-list'
import Promotion from '../promotion'

const RoleCardContainer = styled.div`
  display: flex;
  justify-content: center;
`
const StyledPromotion = styled(Promotion)`
  margin: 24px auto 48px auto;
`

const MobileMemberPage = ({
  role = { key: MEMBER_ROLE.explorer, name: '探索者' },
  email,
  joinDate,
  name = '',
  hideInfo = false,
  articleReadCount = 0,
  articleReadingTime = 0,
  articleReadingTimeUnit = READING_TIME_UNIT.minute,
}) => {
  const { releaseBranch } = useContext(CoreContext)
  const roleKey = useMemo(() => role.key, [role])

  return (
    <div>
      <RoleCardContainer>
        <MobileMemberRoleCard
          role={roleKey}
          releaseBranch={releaseBranch}
          email={email}
          joinDate={joinDate}
          name={name}
          hideInfo={hideInfo}
          articleReadCount={articleReadCount}
          articleReadingTime={articleReadingTime}
          articleReadingTimeUnit={articleReadingTimeUnit}
        />
      </RoleCardContainer>
      <StyledPromotion role={role} type={Promotion.Type.P3} />
      <MobileMemberMenuList roleKey={roleKey} />
    </div>
  )
}

MobileMemberPage.propTypes = {
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

export default MobileMemberPage
