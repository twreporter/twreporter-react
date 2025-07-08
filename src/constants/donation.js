export const DonationType = Object.freeze({
  PRIME: 'prime',
  PERIODIC: 'periodic',
  OFFLINE: 'offline',
})

export const DonationTypeLabel = {
  [DonationType.PRIME]: '單筆贊助',
  [DonationType.PERIODIC]: '定期定額',
}

export const PeriodicDonationStatus = Object.freeze({
  TO_PAY: 'to_pay',
  PAYING: 'paying',
  PAID: 'paid',
  FAIL: 'fail',
  STOPPED: 'stopped',
  INVALID: 'invalid',
})

export const PrimeDonationStatus = Object.freeze({
  PAYING: 'paying',
  PAID: 'paid',
  FAIL: 'fail',
  REFUNDED: 'refunded',
})

export const PayMethodType = Object.freeze({
  CREDIT_CARD: 'credit_card',
  LINE: 'line',
  APPLE: 'apple',
  GOOGLE: 'google',
  SAMSUNG: 'samsung',
})

export const OfflineDonationAttribute = Object.freeze({
  PRIME: 'prime',
  PERIODIC: 'periodic',
  ANGEL: 'angel',
  COOPERATION: 'cooperation',
  OTHER: 'other',
})

export const OfflineDonationAttributeLabel = Object.freeze({
  [OfflineDonationAttribute.PRIME]: '非官網-單筆',
  [OfflineDonationAttribute.PERIODIC]: '非官網-定期定額',
  [OfflineDonationAttribute.ANGEL]: '天使計畫',
  [OfflineDonationAttribute.COOPERATION]: '合作收入',
  [OfflineDonationAttribute.OTHER]: '其他收入',
})

export const OfflineDonationStatus = Object.freeze({
  PAYING: 'paying',
  PAID: 'paid',
  FAIL: 'fail',
  REFUNDED: 'refunded',
})
