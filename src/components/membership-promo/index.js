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
// lodash
import get from 'lodash/get'
const _ = {
  get,
}

const MembershipPromo = ({ pathname, isAuthed, showHamburger }) => {
  const { isShowPromo, closePromo, promoType, PromoType } = usePromo(
    pathname,
    isAuthed,
    showHamburger
  )

  if (isAuthed) {
    return null
  }

  const contextValue = { isShowPromo, closePromo }
  const Promo = promoType === PromoType.POPUP ? Popup : Banner
  return (
    <div>
      <PromoContext.Provider value={contextValue}>
        <Promo />
      </PromoContext.Provider>
    </div>
  )
}
MembershipPromo.propTypes = {
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
