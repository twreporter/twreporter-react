import { getMediaQueryUtil } from '@twreporter/core/lib/utils/media-query'

export const screen = {
  tablet: {
    minWidth: 768
  },
  desktop: {
    minWidth: 1024
  },
  hd: {
    minWidth: 1630
  }
}

export default getMediaQueryUtil(screen)
