import MobileDetect from 'mobile-detect'

export const DETECT_DEVICE = 'DETECT_DEVICE'

function device(state = 'desktop', action) {
  switch (action.type) {
    case 'DETECT_DEVICE':
      let req = action.req
      if (req && req.headers) {
        let md = new MobileDetect(req.headers['user-agent'])
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
