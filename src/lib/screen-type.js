import screenSize from '../constants/screen-size'

export const getScreenType = (width) => {
  if(width <= screenSize.smallScreenMaxWidth) {
    return 'MOBILE'
  } else if (width >= screenSize.mediumScreenMinWidth  && width <= screenSize.mediumScreenMaxWidth) {
    return 'TABLET'
  } else {
    return 'DESKTOP'
  }
}
