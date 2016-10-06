import MobileDetect from 'mobile-detect'

export const DETECT_DEVICE = 'DETECT_DEVICE'

function device(state = 'desktop', action) {
  switch (action.type) {
    case 'DETECT_DEVICE':
      let userAgent = action.userAgent
      if (userAgent) {
        let md = new MobileDetect(userAgent)
        if (md.tablet()) {
          return 'tablet'
        } else if (md.mobile()) {
          return 'mobile'
        }
      }
      return state
    default:
      return state
  }
}

export default device
