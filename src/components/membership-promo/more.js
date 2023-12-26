import React, { useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// contexts
import { CoreContext, PromoContext, ArticlePromoContext } from '../../contexts'
// @twreporter
import requestOrigins from '@twreporter/core/lib/constants/request-origins'
import Link from '@twreporter/react-components/lib/customized-link'
import { PillButton } from '@twreporter/react-components/lib/button'
import { DONATION_LINK_ANCHOR } from '@twreporter/core/lib/constants/donation-link-anchor'

const StretchPillButton = styled(PillButton)`
  width: auto;
  display: flex;
  justify-content: center;
`
const MoreButton = ({ ...props }) => {
  const context = props.isArticlePage ? ArticlePromoContext : PromoContext
  const { closePromo } = useContext(context)
  const { releaseBranch } = useContext(CoreContext)

  return (
    <Link
      to={`${requestOrigins.forClientSideRendering[releaseBranch].support}#${DONATION_LINK_ANCHOR.impact}`}
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

MoreButton.propTypes = {
  isArticlePage: PropTypes.bool,
}

MoreButton.defaultProps = {
  isArticlePage: false,
}

export default MoreButton
