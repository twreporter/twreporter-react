import React, { useContext } from 'react'
import styled from 'styled-components'
// contexts
import { PromoContext } from '../../contexts'
// @twreporter
import requestOrigins from '@twreporter/core/lib/constants/request-origins'
import Link from '@twreporter/react-components/lib/customized-link'
import { PillButton } from '@twreporter/react-components/lib/button'

const StretchPillButton = styled(PillButton)`
  width: auto;
  display: flex;
  justify-content: center;
`
const MoreButton = ({ ...props }) => {
  const { closePromo, releaseBranch } = useContext(PromoContext)

  return (
    <Link
      to={`${requestOrigins.forClientSideRendering[releaseBranch].support}#plan`}
      isExternal={true}
      target="_blank"
      onClick={closePromo}
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
}

export default MoreButton
