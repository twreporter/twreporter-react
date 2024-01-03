import React, { useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// context
import { CoreContext } from '../../../contexts'

// @twreporter
import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'
import MobileMemberRoleCard from '@twreporter/react-components/lib/mobile-member-role-card'

// components
import MobileMemberMenuList from './mobile-menu-list'

const RoleCardContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 48px;
`

const MobileMemberPage = ({
  roleKey = MEMBER_ROLE.explorer,
  email,
  joinDate,
  name = '',
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
        />
      </RoleCardContainer>
      <MobileMemberMenuList />
    </div>
  )
}

MobileMemberPage.propTypes = {
  roleKey: PropTypes.oneOf(Object.values(MEMBER_ROLE)),
  email: PropTypes.string,
  joinDate: PropTypes.string,
  name: PropTypes.string,
}

export default MobileMemberPage
