import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'
import MobileMemberRoleCard from '@twreporter/react-components/lib/mobile-member-role-card'

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
        />
      </RoleCardContainer>
      <MobileMemberMenuList />
    </div>
  )
}

MobileMemberPage.propTypes = {
  roleKey: PropTypes.oneOf(Object.values(MEMBER_ROLE)),
  releaseBranch: BRANCH_PROP_TYPES,
  email: PropTypes.string,
  joinDate: PropTypes.string,
  name: PropTypes.string,
}

export default MobileMemberPage
