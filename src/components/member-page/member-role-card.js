import React, { useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// constants
import { MEMBER_ROLE_DISPLAY } from './constants'

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
  const cardKey = MEMBER_ROLE_DISPLAY[roleKey]?.cardKey || roleKey
  const imageUrl = `https://www.twreporter.org/assets/user-role-card/${releaseBranch}/${cardKey}.png`
  return <Image src={imageUrl}></Image>
}

MemberRoleCard.propTypes = {
  roleKey: PropTypes.oneOf(Object.keys(MEMBER_ROLE_DISPLAY)),
}

export default MemberRoleCard
