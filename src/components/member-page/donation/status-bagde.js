import React, { memo } from 'react'
import PropTypes from 'prop-types'
// @twreporter
import {
  colorBrand,
  colorGrayscale,
  COLOR_SEMANTIC,
} from '@twreporter/core/lib/constants/color'
import Badge from '@twreporter/react-components/lib/badge'
// constants
import {
  DonationType,
  PeriodicDonationStatus,
  PrimeDonationStatus,
  OfflineDonationStatus,
} from '../../../constants/donation'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const badgePropsByStatus = {
  [DonationType.PERIODIC]: {
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
      textColor: COLOR_SEMANTIC.danger,
      backgroundColor: colorGrayscale.gray200,
    },
    [PeriodicDonationStatus.INVALID]: {
      text: '扣款失敗',
      textColor: COLOR_SEMANTIC.danger,
      backgroundColor: colorGrayscale.gray200,
    },
    [PeriodicDonationStatus.STOPPED]: {
      text: '已終止',
      textColor: colorGrayscale.gray800,
      backgroundColor: colorGrayscale.gray200,
    },
  },
  [DonationType.PRIME]: {
    [PrimeDonationStatus.PAYING]: {
      text: '進行中',
      textColor: colorBrand.heavy,
      backgroundColor: colorGrayscale.white,
    },
    [PrimeDonationStatus.PAID]: {
      text: '已完成',
      textColor: colorGrayscale.gray800,
      backgroundColor: 'transparent',
    },
    [PrimeDonationStatus.FAIL]: {
      text: '扣款失敗',
      textColor: COLOR_SEMANTIC.danger,
      backgroundColor: colorGrayscale.gray200,
    },
    [PrimeDonationStatus.REFUNDED]: {
      text: '已退款',
      textColor: colorGrayscale.gray800,
      backgroundColor: colorGrayscale.gray200,
    },
  },
  [DonationType.OFFLINE]: {
    [OfflineDonationStatus.PAYING]: {
      text: '交易中',
      textColor: colorBrand.heavy,
      backgroundColor: colorGrayscale.white,
    },
    [OfflineDonationStatus.PAID]: {
      text: '已完成',
      textColor: colorGrayscale.gray800,
      backgroundColor: 'transparent',
    },
    [OfflineDonationStatus.FAIL]: {
      text: '失敗',
      textColor: COLOR_SEMANTIC.danger,
      backgroundColor: colorGrayscale.gray200,
    },
    [OfflineDonationStatus.REFUNDED]: {
      text: '已退款',
      textColor: colorGrayscale.gray800,
      backgroundColor: colorGrayscale.gray200,
    },
  },
  default: {
    text: '進行中',
    textColor: colorGrayscale.gray800,
    backgroundColor: colorGrayscale.gray200,
  }, // Default case
}

export const StatusBadge = memo(({ status, type }) => {
  const key = `${type}.${status}`
  const { text, textColor, backgroundColor } = _.get(
    badgePropsByStatus,
    key,
    badgePropsByStatus.default
  )

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
