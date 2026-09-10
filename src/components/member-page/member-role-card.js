import React, { useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// context
import { CoreContext } from '../../contexts'

// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'

const Image = styled.img`
  width: 147px;
  ${mq.desktopAndAbove`
    width: 179px
  `}
`

const MemberRoleCard = ({ roleKey = MEMBER_ROLE.explorer }) => {
  const { releaseBranch } = useContext(CoreContext)
  const imageUrl = `https://www.twreporter.org/assets/user-role-card/${releaseBranch}/${roleKey}.png`
  return <Image src={imageUrl}></Image>
}

MemberRoleCard.propTypes = {
  roleKey: PropTypes.oneOf(Object.values(MEMBER_ROLE)),
}

export default MemberRoleCard
