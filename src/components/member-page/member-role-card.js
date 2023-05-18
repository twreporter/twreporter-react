import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import mq from '@twreporter/core/lib/utils/media-query'
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'
import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'


const Image = styled.img`
  width: 147px;
  ${mq.desktopAndAbove`
    width: 179px
  `}
`

const MemberRoleCard = ({
  releaseBranch = BRANCH.master,
  role = MEMBER_ROLE.EXPLORER,
}) => {
  const imageUrl = `https://www.twreporter.org/assets/user-role-card/${releaseBranch}/${role}.png`
  return <Image src={imageUrl}></Image>
}

MemberRoleCard.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
  role: PropTypes.oneOf(Object.values(MEMBER_ROLE)),
}

export default MemberRoleCard
