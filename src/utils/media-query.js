import { getMediaQueryUtil } from '@twreporter/core/lib/utils/media-query'

const screen = {
  tablet: {
    minWidth: 768,
  },
  desktop: {
    minWidth: 992,
  },
  hd: {
    minWidth: 1200,
  },
}

export default getMediaQueryUtil(screen)
