import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'
import MobileMemberRoleCard from '@twreporter/react-components/lib/mobile-member-role-card'
import { READING_TIME_UNIT } from '@twreporter/core/lib/constants/reading-time-unit'

import MobileMemberMenuList from './mobile-menu-list'

const RoleCardContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 48px;
`

const MobileMemberPage = ({
  roleKey = MEMBER_ROLE.explorer,
  releaseBranch = BRANCH.master,
  email,
  joinDate,
  name = '',
  hideInfo = false,
  articleReadCount = 0,
  articleReadingTime = 0,
  articleReadingTimeUnit = READING_TIME_UNIT.minute,
}) => {
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
      <MobileMemberMenuList releaseBranch={releaseBranch} />
    </div>
  )
}

MobileMemberPage.propTypes = {
  roleKey: PropTypes.oneOf(Object.values(MEMBER_ROLE)),
  releaseBranch: BRANCH_PROP_TYPES,
  email: PropTypes.string,
  joinDate: PropTypes.string,
  name: PropTypes.string,
  articleReadCount: PropTypes.number,
  articleReadingTimeUnit: PropTypes.oneOf(Object.values(READING_TIME_UNIT)),
  articleReadingTime: PropTypes.number,
  hideInfo: PropTypes.bool,
}

export default MobileMemberPage
