import sz from '../constants/screen-size'

export const articleLayout = {
  mobile: {
    width: '100%'
  },
  tablet: {
    width: {
      large: sz.mediumScreenMinWidth,
      medium: 672,
      small: 556
    }
  },
  desktop: {
    width: {
      large: sz.largeScreenMinWidth,
      medium: 833,
      small: 664
    }
  },
  hd: {
    width: {
      large: sz.xlargeScreenMinWidth,
      medium: 880,
      small: 700
    }
  }
}

export default {
  article: articleLayout
}
