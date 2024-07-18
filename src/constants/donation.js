export const DonationType = Object.freeze({
  PRIME: 'prime',
  PERIODIC: 'periodic',
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
