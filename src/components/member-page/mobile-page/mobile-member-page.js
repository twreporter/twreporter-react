import React, { useContext } from 'react'
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

const RoleCardContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 48px;
`

const OnlyForGTM = styled.div``

const MobileMemberPage = ({
  roleKey = MEMBER_ROLE.explorer,
  email,
  joinDate,
  name = '',
  hideInfo = false,
  articleReadCount = 0,
  articleReadingTime = 0,
  articleReadingTimeUnit = READING_TIME_UNIT.minute,
}) => {
  const { releaseBranch } = useContext(CoreContext)

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
      <OnlyForGTM name="merchandise-promo-code" />
      <MobileMemberMenuList roleKey={roleKey} />
    </div>
  )
}

MobileMemberPage.propTypes = {
  roleKey: PropTypes.oneOf(Object.values(MEMBER_ROLE)),
  email: PropTypes.string,
  joinDate: PropTypes.string,
  name: PropTypes.string,
  articleReadCount: PropTypes.number,
  articleReadingTimeUnit: PropTypes.oneOf(Object.values(READING_TIME_UNIT)),
  articleReadingTime: PropTypes.number,
  hideInfo: PropTypes.bool,
}

export default MobileMemberPage
