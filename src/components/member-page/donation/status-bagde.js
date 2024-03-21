import React, { memo } from 'react'
import PropTypes from 'prop-types'
// @twreporter
import {
  colorBrand,
  colorGrayscale,
} from '@twreporter/core/lib/constants/color'
import Badge from '@twreporter/react-components/lib/badge'
// constants
import {
  DonationType,
  PeriodicDonationStatus,
  PrimeDonationStatus,
} from '../../../constants/donation'

const badgePropsByStatus = {
  [PeriodicDonationStatus.TO_PAY]: {
    text: '進行中',
    textColor: colorBrand.heavy,
    backgroundColor: colorGrayscale.white,
  },
  [PeriodicDonationStatus.PAYING]: {
    text: '進行中',
    textColor: colorBrand.heavy,
    backgroundColor: colorGrayscale.white,
  },
  [PeriodicDonationStatus.PAID]: {
    text: '進行中',
    textColor: colorBrand.heavy,
    backgroundColor: colorGrayscale.white,
  },
  [PeriodicDonationStatus.FAIL]: {
    text: '扣款失敗',
    textColor: colorGrayscale.gray800,
    backgroundColor: colorGrayscale.gray200,
  },
  [PeriodicDonationStatus.STOPPED]: {
    text: '扣款失敗',
    textColor: colorGrayscale.gray800,
    backgroundColor: colorGrayscale.gray200,
  },
  [PeriodicDonationStatus.INVALID]: {
    text: '扣款失敗',
    textColor: colorGrayscale.gray800,
    backgroundColor: colorGrayscale.gray200,
  },
  [PrimeDonationStatus.PAYING]: {
    text: '進行中',
    textColor: colorBrand.heavy,
    backgroundColor: colorGrayscale.white,
  },
  [PrimeDonationStatus.FAIL]: {
    text: '扣款失敗',
    textColor: colorGrayscale.gray800,
    backgroundColor: colorGrayscale.gray200,
  },
  [PrimeDonationStatus.PAID]: {
    text: '已完成',
    textColor: colorGrayscale.gray800,
    backgroundColor: 'transparent',
  },
  [PrimeDonationStatus.REFUNDED]: {
    text: '已退款',
    textColor: colorGrayscale.gray800,
    backgroundColor: colorGrayscale.gray200,
  },
  default: {
    text: '進行中',
    textColor: colorGrayscale.gray800,
    backgroundColor: colorGrayscale.gray200,
  }, // Default case
}

export const StatusBadge = memo(({ status, type }) => {
  // Determine key based on type and status
  const key =
    type === DonationType.PERIODIC && status in badgePropsByStatus
      ? status
      : type === DonationType.PRIME && status in badgePropsByStatus
      ? status
      : 'default'

  const { text, textColor, backgroundColor } = badgePropsByStatus[key]

  return (
    <Badge
      text={text}
      textColor={textColor}
      backgroundColor={backgroundColor}
    />
  )
})

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(DonationType)).isRequired,
}
StatusBadge.displayName = 'StatusBadge'
