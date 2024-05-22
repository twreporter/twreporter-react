import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
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

const Box = styled.div`
  ${props => (props.$show ? '' : 'display: none;')}
`

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
  return (
    <PromoContext.Provider value={contextValue}>
      <Box $show={promoType === PromoType.POPUP}>
        <Popup />
      </Box>
      <Box $show={promoType === PromoType.BANNER}>
        <Banner />
      </Box>
    </PromoContext.Provider>
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
