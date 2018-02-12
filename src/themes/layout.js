import sz from '../constants/screen-size'

export const articleLayout = {
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
    },
    offset: {
      sidebar: 50,
      tools: 20
    }
  },
  hd: {
    width: {
      large: sz.xlargeScreenMinWidth,
      medium: 880,
      small: 700
    },
    offset: {
      sidebar: 50,
      tools: 20
    }
  }
}
