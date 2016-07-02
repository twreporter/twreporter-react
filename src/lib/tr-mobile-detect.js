import MobileDetect from 'mobile-detect'

export const DEFAULT_DEVICE = 'desktop'

export const getDevice = (userAgent) => {
  const md = new MobileDetect(userAgent)  
  let device = DEFAULT_DEVICE
  if (md.tablet()) {
    device = 'tablet'
  } else if (md.mobile()) {
    device = 'mobile'
  }
  return device
}
