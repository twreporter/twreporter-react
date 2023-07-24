import React from 'react'
import styled from 'styled-components'
// @twreporter
import requestOrigins from '@twreporter/core/lib/constants/request-origins'
import Link from '@twreporter/react-components/lib/customized-link'
import { PillButton } from '@twreporter/react-components/lib/button'
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'

const StretchPillButton = styled(PillButton)`
  width: auto;
  display: flex;
  justify-content: center;
`
const MoreButton = ({ releaseBranch = BRANCH.master, ...props }) => (
  <Link
    to={`${requestOrigins.forClientSideRendering[releaseBranch].support}#plan`}
    {...props}
  >
    <StretchPillButton
      type={PillButton.Type.PRIMARY}
      size={PillButton.Size.S}
      style={PillButton.Style.BRAND}
      theme={PillButton.THEME.normal}
      text="瞭解更多"
    />
  </Link>
)
MoreButton.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
}

export default MoreButton
