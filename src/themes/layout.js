import screen from '../constants/screen'

export const articleLayout = {
  mobile: {
    width: '100%'
  },
  tablet: {
    width: {
      large: screen.tablet.minWidth,
      medium: 672,
      small: 556
    }
  },
  desktop: {
    width: {
      large: screen.desktop.minWidth,
      medium: 833,
      small: 664
    }
  },
  hd: {
    width: {
      large: screen.hd.minWidth,
      medium: 880,
      small: 700
    }
  }
}

export default {
  article: articleLayout
}
