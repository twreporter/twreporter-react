import screen from './screen'
import { getMediaQueryUtil } from '@twreporter/core/lib/utils/media-query'

export const breakpoint = {
  [screen.tablet]: {
    minWidth: 768,
  },
  [screen.desktop]: {
    minWidth: 1024,
  },
  [screen.hd]: {
    minWidth: 1630,
  },
}

export default getMediaQueryUtil(breakpoint)
