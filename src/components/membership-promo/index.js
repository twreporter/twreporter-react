import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
// hooks
import { usePromo } from '../../hooks'
// contexts
import { PromoContext } from '../../contexts'
// components
import Popup from './popup'
import Banner from './banner'
// @twreporter
import twreporterRedux from '@twreporter/redux'
import { BRANCH_PROP_TYPES } from '@twreporter/core/lib/constants/release-branch'
// lodash
import get from 'lodash/get'
const _ = {
  get,
}

const MembershipPromo = ({
  releaseBranch,
  pathname,
  isAuthed,
  showHamburger,
}) => {
  const { isShowPromo, closePromo, promoType, PromoType } = usePromo(
    pathname,
    isAuthed,
    showHamburger
  )

  if (isAuthed) {
    return null
  }

  const contextValue = { isShowPromo, closePromo, releaseBranch }
  const Promo = promoType === PromoType.POPUP ? Popup : Banner
  return (
    <PromoContext.Provider value={contextValue}>
      <Promo />
    </PromoContext.Provider>
  )
}
MembershipPromo.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
  pathname: PropTypes.string.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  showHamburger: PropTypes.bool.isRequired,
}
const { reduxStateFields } = twreporterRedux
const mapStateToProps = state => {
  const isAuthed = _.get(state, [reduxStateFields.auth, 'isAuthed'], false)
  return { isAuthed }
}

export default connect(mapStateToProps)(MembershipPromo)
